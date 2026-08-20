const fs = require("fs");
const path = require("path");
const https = require("https");
const vm = require("vm");
const {
  loadDictionary,
  meaningsAlign,
  normalizeWord,
} = require("./build-detailed-sense-overrides.cjs");

const ROOT = process.cwd();
const APP_DIR = path.join(ROOT, "outputs", "kids-dictionary");
const OVERRIDES_FILE = path.join(APP_DIR, "detailed-sense-overrides.js");
const CACHE_FILE = path.join(APP_DIR, "live-detailed-sense-cache.json");
const CONCURRENCY = Math.max(1, Number(process.argv.find((arg) => arg.startsWith("--concurrency="))?.split("=")[1] || 6));
const LIMIT = Math.max(0, Number(process.argv.find((arg) => arg.startsWith("--limit="))?.split("=")[1] || 0));

const IRREGULAR_BASES = {
  children: "child",
  feet: "foot",
  geese: "goose",
  men: "man",
  mice: "mouse",
  people: "person",
  teeth: "tooth",
  women: "woman",
  wrote: "write",
  written: "write",
  ran: "run",
  gone: "go",
  went: "go",
  saw: "see",
  seen: "see",
  took: "take",
  taken: "take",
  made: "make",
};

function decodeEntities(value) {
  return String(value || "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function stripTags(value) {
  return decodeEntities(value).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function normalizeEnglish(value) {
  return stripTags(value)
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[^a-z0-9']+/g, " ")
    .trim();
}

function normalizePart(value) {
  const text = stripTags(value);
  const labels = ["동사", "명사", "형용사", "부사", "대명사", "전치사", "접속사", "감탄사", "관사", "조동사", "수사", "고유명사", "약어", "숙어"];
  return labels.find((label) => text.includes(label)) || text || "명사";
}

function requestJson(url, referer, retries = 3) {
  return new Promise((resolve, reject) => {
    const request = https.request(
      url,
      {
        method: "GET",
        agent: false,
        timeout: 15000,
        headers: {
          Accept: "application/json, text/plain, */*",
          Referer: referer,
          "X-Requested-With": "XMLHttpRequest",
          Origin: "https://en.dict.naver.com",
          "User-Agent": "Mozilla/5.0",
        },
      },
      (response) => {
        let body = "";
        response.setEncoding("utf8");
        response.on("data", (chunk) => { body += chunk; });
        response.on("end", () => {
          if (response.statusCode !== 200) {
            reject(new Error(`HTTP ${response.statusCode}`));
            return;
          }
          try {
            resolve(JSON.parse(body));
          } catch (error) {
            reject(error);
          }
        });
      }
    );
    request.on("error", reject);
    request.setTimeout(15000, () => request.destroy(new Error("request timeout")));
    request.end();
  }).catch(async (error) => {
    if (retries <= 0) throw error;
    await new Promise((resolve) => setTimeout(resolve, (4 - retries) * 300));
    return requestJson(url, referer, retries - 1);
  });
}

function loadOverrides() {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(OVERRIDES_FILE, "utf8"), context);
  return context.window.detailedSenseOverrides || {};
}

function loadCache() {
  if (!fs.existsSync(CACHE_FILE)) {
    return { version: 1, generatedAt: "", entries: {}, attempted: {} };
  }
  const parsed = JSON.parse(fs.readFileSync(CACHE_FILE, "utf8"));
  return {
    version: 1,
    generatedAt: parsed.generatedAt || "",
    entries: parsed.entries || {},
    attempted: parsed.attempted || {},
  };
}

function writeCache(cache) {
  cache.generatedAt = new Date().toISOString();
  const temporary = `${CACHE_FILE}.tmp`;
  fs.writeFileSync(temporary, `${JSON.stringify(cache, null, 2)}\n`, "utf8");
  fs.renameSync(temporary, CACHE_FILE);
}

function candidateQueries(word) {
  const normalized = normalizeWord(word);
  if (!/^[a-z]+$/.test(normalized)) return [normalized];
  const candidates = new Set([normalized]);
  if (IRREGULAR_BASES[normalized]) candidates.add(IRREGULAR_BASES[normalized]);

  if (normalized.endsWith("ies") && normalized.length > 4) candidates.add(`${normalized.slice(0, -3)}y`);
  if (normalized.endsWith("ves") && normalized.length > 4) {
    candidates.add(`${normalized.slice(0, -3)}f`);
    candidates.add(`${normalized.slice(0, -3)}fe`);
  }
  if (normalized.endsWith("ing") && normalized.length > 5) {
    const stem = normalized.slice(0, -3);
    candidates.add(stem);
    candidates.add(`${stem}e`);
    if (stem.length > 2 && stem.at(-1) === stem.at(-2)) candidates.add(stem.slice(0, -1));
  }
  if (normalized.endsWith("ed") && normalized.length > 4) {
    const stem = normalized.slice(0, -2);
    candidates.add(stem);
    candidates.add(`${stem}e`);
    if (stem.endsWith("i")) candidates.add(`${stem.slice(0, -1)}y`);
    if (stem.length > 2 && stem.at(-1) === stem.at(-2)) candidates.add(stem.slice(0, -1));
  }
  if (normalized.endsWith("es") && normalized.length > 4) {
    candidates.add(normalized.slice(0, -2));
    candidates.add(normalized.slice(0, -1));
  } else if (normalized.endsWith("s") && normalized.length > 3) {
    candidates.add(normalized.slice(0, -1));
  }
  return [...candidates].filter(Boolean);
}

function collectSenses(item) {
  const groups = [];
  for (const group of item?.meansCollector || []) {
    const part = normalizePart(group?.partOfSpeech);
    const senses = [];
    for (const mean of group?.means || []) {
      const meaning = stripTags(mean?.value);
      if (!meaning || !/[가-힣]/.test(meaning) || meaning.length > 180) continue;
      if (!senses.some((sense) => sense[1].replace(/\s+/g, "") === meaning.replace(/\s+/g, ""))) {
        senses.push([part, meaning, ""]);
      }
    }
    if (senses.length) groups.push(senses);
  }

  const selected = [];
  for (const group of groups) {
    for (const sense of group) {
      if (selected.length >= 3) break;
      if (!selected.some((item) => item[1].replace(/\s+/g, "") === sense[1].replace(/\s+/g, ""))) selected.push(sense);
    }
    if (selected.length >= 3) break;
  }
  const representedParts = new Set(selected.map((sense) => sense[0]));
  for (const group of groups) {
    const candidate = group.find((sense) => !representedParts.has(sense[0]));
    if (!candidate || selected.length >= 5) continue;
    selected.push(candidate);
    representedParts.add(candidate[0]);
  }
  return selected.slice(0, 5);
}

async function fetchAlignedEntry(entry) {
  for (const query of candidateQueries(entry.word)) {
    const encoded = encodeURIComponent(query);
    const referer = `https://en.dict.naver.com/#/search?query=${encoded}`;
    const url = `https://en.dict.naver.com/api3/enko/search?query=${encoded}&m=pc&range=word&page=1&shouldSearchOpen=true`;
    const result = await requestJson(url, referer);
    const items = result?.searchResultMap?.searchResultListMap?.WORD?.items || [];
    const exactItems = items.filter((item) =>
      normalizeEnglish(item?.expEntry) === normalizeEnglish(query) &&
      String(item?.matchType || "").startsWith("exact:")
    );

    const candidates = exactItems
      .map((item) => ({
        item,
        senses: collectSenses(item),
        source: stripTags(item?.sourceDictnameKO),
      }))
      .filter((candidate) => candidate.senses.length)
      .filter((candidate) => meaningsAlign(entry.korean, candidate.senses.map((sense) => sense[1])))
      .sort((left, right) => Number(right.source.includes("옥스퍼드")) - Number(left.source.includes("옥스퍼드")));

    const best = candidates[0];
    if (best) {
      return {
        senses: best.senses,
        query,
        entryId: String(best.item.entryId || ""),
        source: best.source,
      };
    }
  }
  return null;
}

async function mapWithConcurrency(items, concurrency, mapper) {
  let cursor = 0;
  let completed = 0;
  const results = new Array(items.length);

  async function worker() {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await mapper(items[index], index);
      completed += 1;
      if (completed % 25 === 0 || completed === items.length) {
        console.error(`progress ${completed}/${items.length}`);
      }
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, () => worker()));
  return results;
}

async function main() {
  const dictionary = loadDictionary(false);
  const overrides = loadOverrides();
  const cache = loadCache();
  for (const [word, attempt] of Object.entries(cache.attempted)) {
    if (attempt?.status === "error") delete cache.attempted[word];
  }
  const uniqueEntries = [...new Map(dictionary.map((entry) => [normalizeWord(entry.word), entry])).values()];
  let targets = uniqueEntries.filter((entry) => {
    const word = normalizeWord(entry.word);
    return (
      entry.senseSource !== "manual-curated" &&
      !overrides[word] &&
      !cache.entries[word] &&
      cache.attempted[word]?.status !== "no-aligned-result"
    );
  }).sort((left, right) => {
    const candidateDifference = candidateQueries(left.word).length - candidateQueries(right.word).length;
    return candidateDifference || normalizeWord(left.word).localeCompare(normalizeWord(right.word));
  });
  if (LIMIT) targets = targets.slice(0, LIMIT);

  let added = 0;
  let missed = 0;
  let errors = 0;
  const errorSamples = [];
  await mapWithConcurrency(targets, CONCURRENCY, async (entry) => {
    const word = normalizeWord(entry.word);
    try {
      const result = await fetchAlignedEntry(entry);
      if (result) {
        cache.entries[word] = result;
        added += 1;
      } else {
        cache.attempted[word] = { status: "no-aligned-result" };
        missed += 1;
      }
    } catch (error) {
      delete cache.attempted[word];
      errors += 1;
      if (errorSamples.length < 10) errorSamples.push({ word, message: String(error?.message || error) });
    }
    if ((added + missed + errors) % 25 === 0) writeCache(cache);
  });
  writeCache(cache);

  console.log(JSON.stringify({
    targetCount: targets.length,
    added,
    missed,
    errors,
    errorSamples,
    cachedEntries: Object.keys(cache.entries).length,
    attemptedWithoutMatch: Object.keys(cache.attempted).length,
    cacheFile: CACHE_FILE,
  }, null, 2));
}

main().catch((error) => {
  console.error(error.stack || error.message || String(error));
  process.exit(1);
});
