const fs = require("fs");
const path = require("path");
const https = require("https");

const ROOT = process.cwd();
const MASTER_CSV = path.join(ROOT, "outputs", "naver-manual-review-all.csv");
const OUTPUT_DIR = path.join(ROOT, "outputs", "naver-manual-review-all-batches");
let activeRequestTimeoutMs = 15000;
let activeRequestRetries = 4;

function parseArgs(argv) {
  const options = {
    input: "",
    limit: 100,
    maxLevel: 4,
    startSequence: 0,
    concurrency: 5,
    output: "",
    decision: "",
    continueOnError: true,
    requestTimeoutMs: 15000,
    requestRetries: 4,
  };

  for (const arg of argv) {
    const [key, rawValue] = arg.split("=");
    const value = rawValue ?? "";

    if (key === "--limit") options.limit = Number(value || 100);
    else if (key === "--input") options.input = value;
    else if (key === "--max-level") options.maxLevel = Number(value || 4);
    else if (key === "--start-sequence") options.startSequence = Number(value || 0);
    else if (key === "--concurrency") options.concurrency = Number(value || 5);
    else if (key === "--output") options.output = value;
    else if (key === "--decision") options.decision = value;
    else if (key === "--continue-on-error") options.continueOnError = value !== "false";
    else if (key === "--request-timeout-ms") options.requestTimeoutMs = Number(value || 15000);
    else if (key === "--request-retries") options.requestRetries = Number(value || 4);
  }

  if (!Number.isFinite(options.limit) || options.limit < 1) {
    throw new Error("--limit must be a positive number");
  }
  if (!Number.isFinite(options.maxLevel) || options.maxLevel < 1) {
    throw new Error("--max-level must be a positive number");
  }
  if (!Number.isFinite(options.startSequence) || options.startSequence < 0) {
    throw new Error("--start-sequence must be zero or a positive number");
  }
  if (!Number.isFinite(options.concurrency) || options.concurrency < 1) {
    throw new Error("--concurrency must be a positive number");
  }
  if (!Number.isFinite(options.requestTimeoutMs) || options.requestTimeoutMs < 1000) {
    throw new Error("--request-timeout-ms must be at least 1000");
  }
  if (!Number.isFinite(options.requestRetries) || options.requestRetries < 0) {
    throw new Error("--request-retries must be zero or a positive number");
  }

  return options;
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        cell += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (!inQuotes && char === ",") {
      row.push(cell);
      cell = "";
      continue;
    }

    if (!inQuotes && (char === "\n" || char === "\r")) {
      if (char === "\r" && next === "\n") {
        index += 1;
      }
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
      continue;
    }

    cell += char;
  }

  if (cell.length || row.length) {
    row.push(cell);
    rows.push(row);
  }

  const [header, ...body] = rows;
  return body
    .filter((line) => line.length && line.some((value) => value !== ""))
    .map((line) => Object.fromEntries(header.map((name, index) => [name, line[index] ?? ""])));
}

function decodeEntities(text) {
  return String(text || "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function stripTags(text) {
  return decodeEntities(text).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function normalizeAscii(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/<[^>]+>/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function normalizeKor(text) {
  return String(text || "")
    .replace(/\([^)]*\)/g, " ")
    .replace(/[[\]{}]/g, " ")
    .replace(/[\u00B7\u2022]/g, " ")
    .replace(/[;,/]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function hasKorean(text) {
  return /[\uAC00-\uD7A3]/.test(String(text || ""));
}

function buildVariants(token) {
  const source = String(token || "").trim();
  const results = new Set();
  if (!source) return [];

  results.add(source);
  const suffixes = [
    "\uD654\uD558\uB2E4",
    "\uD558\uB2E4",
    "\uB418\uB2E4",
    "\uC801\uC778",
    "\uC801",
    "\uC758",
  ];
  for (const suffix of suffixes) {
    if (source.endsWith(suffix) && source.length > suffix.length + 1) {
      results.add(source.slice(0, -suffix.length));
    }
  }
  return Array.from(results).filter(Boolean);
}

function appTokensForCompare(text) {
  const base = normalizeKor(text)
    .split(/\s+/)
    .filter(Boolean);
  const expanded = new Set();

  for (const token of base) {
    for (const variant of buildVariants(token)) {
      expanded.add(variant);
    }
  }

  return Array.from(expanded);
}

function decideFromMeanings(appKorean, meanings) {
  if (!meanings || !meanings.length) {
    return {
      decision: "\uBCF4\uB958",
      matchCount: 0,
      tokenCount: 0,
      matchedTokens: [],
    };
  }

  const joined = normalizeKor(meanings.join(" / "));
  const tokens = appTokensForCompare(appKorean);
  const matchedTokens = tokens.filter((token) => joined.includes(token));

  return {
    decision: matchedTokens.length > 0 ? "\uD655\uC778" : "\uC218\uC815",
    matchCount: matchedTokens.length,
    tokenCount: tokens.length,
    matchedTokens,
  };
}

function requestJson(url, referer, retries = 2) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      url,
      {
        method: "GET",
        agent: false,
        timeout: activeRequestTimeoutMs,
        headers: {
          Accept: "application/json, text/plain, */*",
          Referer: referer,
          "X-Requested-With": "XMLHttpRequest",
          Origin: "https://en.dict.naver.com",
          "User-Agent": "Mozilla/5.0",
          Connection: "close",
        },
      },
      (res) => {
        let body = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => {
          body += chunk;
        });
        res.on("end", async () => {
          if (res.statusCode !== 200) {
            if (retries > 0) {
              try {
                resolve(await requestJson(url, referer, retries - 1));
              } catch (error) {
                reject(error);
              }
              return;
            }
            reject(new Error(`HTTP ${res.statusCode}: ${url}`));
            return;
          }
          try {
            resolve(JSON.parse(body));
          } catch (error) {
            if (retries > 0) {
              try {
                resolve(await requestJson(url, referer, retries - 1));
              } catch (retryError) {
                reject(retryError);
              }
              return;
            }
            reject(
              new Error(`JSON parse failed for ${url}: ${error.message}\n${body.slice(0, 300)}`)
            );
          }
        });
      }
    );
    req.on("error", async (error) => {
      if (retries > 0) {
        try {
          resolve(await requestJson(url, referer, retries - 1));
        } catch (retryError) {
          reject(retryError);
        }
        return;
      }
      reject(error);
    });
    req.setTimeout(activeRequestTimeoutMs, () => {
      req.destroy(new Error(`Request timeout: ${url}`));
    });
    req.end();
  });
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function requestJsonWithRetry(url, referer, retries = activeRequestRetries) {
  let lastError = null;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      return await requestJson(url, referer, 0);
    } catch (error) {
      lastError = error;
      if (attempt >= retries) break;
      await sleep(250 * (attempt + 1));
    }
  }

  throw lastError;
}

function buildWordSearchUrl(word) {
  return (
    `https://en.dict.naver.com/api3/enko/search?query=${encodeURIComponent(word)}` +
    "&m=pc&range=word&page=1&shouldSearchOpen=true"
  );
}

function buildMeaningSearchUrl(word) {
  return (
    `https://en.dict.naver.com/api3/enko/search?query=${encodeURIComponent(word)}` +
    "&m=pc&range=meaning&page=1"
  );
}

function buildEntryUrl(entryId) {
  return (
    "https://en.dict.naver.com/api/v2/platform/enko/entry?" +
    `entryId=${encodeURIComponent(entryId)}&isConjsShowTTS=true&searchResult=false`
  );
}

function selectBestWordItem(items, word) {
  const target = normalizeAscii(word);
  if (!Array.isArray(items) || !items.length) return null;

  const scored = items
    .map((item) => {
      const expEntry = stripTags(item.expEntry);
      const expNorm = normalizeAscii(expEntry);
      const source = stripTags(item.sourceDictnameKO);
      let score = 0;

      if (expNorm === target) score += 240;
      else if (expNorm.startsWith(target)) score += 30;

      if (item.matchType === "exact:entry") score += 120;
      else if (String(item.matchType || "").startsWith("exact:")) score += 60;

      if (source.includes("옥스퍼드")) score += 35;
      if (source.includes("동아")) score += 15;
      if (!expEntry.includes(" ")) score += 10;

      return { item, score, expEntry, source };
    })
    .sort((left, right) => right.score - left.score);

  return scored[0]?.item || null;
}

function collectWordMeanings(item, limit = 3) {
  const results = [];
  const seen = new Set();

  for (const group of item?.meansCollector || []) {
    for (const mean of group?.means || []) {
      const text = stripTags(mean?.value);
      if (!text || !hasKorean(text)) continue;
      if (seen.has(text)) continue;
      seen.add(text);
      results.push(text);
      if (results.length >= limit) return results;
    }
  }

  return results;
}

function collectRawMeanings(item, limit = 5) {
  const results = [];
  const seen = new Set();

  for (const group of item?.meansCollector || []) {
    for (const mean of group?.means || []) {
      const text = stripTags(mean?.value);
      if (!text || seen.has(text)) continue;
      seen.add(text);
      results.push(text);
      if (results.length >= limit) return results;
    }
  }

  return results;
}

function extractAsciiAliases(bestWordItem, word) {
  const aliases = new Set();
  const baseWord = normalizeAscii(word);
  if (baseWord) aliases.add(baseWord);

  const entryWord = normalizeAscii(bestWordItem?.expEntry);
  if (entryWord) aliases.add(entryWord);

  for (const meaning of collectRawMeanings(bestWordItem, 8)) {
    const matches = meaning.match(/[A-Za-z][A-Za-z -]{1,40}/g) || [];
    for (const match of matches) {
      const normalized = normalizeAscii(match);
      if (normalized) aliases.add(normalized);
    }
  }

  return Array.from(aliases).filter(Boolean);
}

function isMeaningCandidateUsable(text) {
  const value = stripTags(text);
  if (!value || !hasKorean(value)) return false;
  if (value.length > 36) return false;
  if ((value.match(/[A-Za-z]/g) || []).length > 8) return false;
  if (/[.?!]/.test(value) && value.length > 20) return false;
  return true;
}

async function collectAliasWordFallback(word, aliases, referer) {
  const baseWord = normalizeAscii(word);
  for (const alias of aliases || []) {
    const aliasWord = normalizeAscii(alias);
    if (!aliasWord || aliasWord === baseWord) continue;
    const aliasResult = await requestJsonWithRetry(buildWordSearchUrl(aliasWord), referer);
    const aliasItems = aliasResult?.searchResultMap?.searchResultListMap?.WORD?.items || [];
    const bestAliasItem = selectBestWordItem(aliasItems, aliasWord);
    const aliasMeanings = collectWordMeanings(bestAliasItem, 3);
    if (aliasMeanings.length) {
      return aliasMeanings;
    }
  }
  return [];
}

function collectMeaningSearchFallback(meaningItems, aliases, limit = 3) {
  const normalizedAliases = Array.from(new Set((aliases || []).map((item) => normalizeAscii(item)).filter(Boolean)));
  if (!normalizedAliases.length) return [];

  const scored = [];

  for (const item of meaningItems || []) {
    const expEntry = stripTags(item?.expEntry);
    const expEntryAscii = normalizeAscii(expEntry);
    const rawMeans = collectRawMeanings(item, 5);
    const meansJoinedAscii = normalizeAscii(rawMeans.join(" "));
    const expEntryHasKorean = hasKorean(expEntry);

    let score = 0;
    for (const alias of normalizedAliases) {
      if (!alias) continue;
      if (expEntryAscii === alias) score += 220;
      else if (expEntryAscii.includes(alias)) score += 80;
      if (meansJoinedAscii.includes(alias)) score += 150;
    }

    if (!score) continue;

    let koreanCandidate = "";
    if (expEntryHasKorean) {
      koreanCandidate = expEntry;
      if (expEntry.length <= 8) score += 30;
    } else {
      const firstMeaning = rawMeans.find((text) => hasKorean(text));
      if (firstMeaning) koreanCandidate = firstMeaning;
    }

    koreanCandidate = stripTags(koreanCandidate);
    if (!isMeaningCandidateUsable(koreanCandidate)) continue;

    scored.push({ score, koreanCandidate });
  }

  const seen = new Set();
  return scored
    .sort((left, right) => right.score - left.score)
    .map((item) => item.koreanCandidate)
    .filter((item) => {
      if (!item || seen.has(item)) return false;
      seen.add(item);
      return true;
    })
    .slice(0, limit);
}

function summarizeEntry(entryResult) {
  const entry = entryResult?.entry;
  const member = entry?.members?.[0];
  return {
    entryId: entry?.entry_id || "",
    dictCid: entry?.dict_cid || "",
    entryName: stripTags(member?.entry_name),
    prons: (member?.prons || []).slice(0, 3).map((pron) => stripTags(pron.show_pron_symbol)),
  };
}

async function reviewRow(row, options) {
  const word = String(row.word || "").trim();
  const referer = `https://en.dict.naver.com/#/search?query=${encodeURIComponent(word)}`;

  const wordResult = await requestJsonWithRetry(buildWordSearchUrl(word), referer);
  const meaningResult = await requestJsonWithRetry(buildMeaningSearchUrl(word), referer);

  const wordItems = wordResult?.searchResultMap?.searchResultListMap?.WORD?.items || [];
  const meaningItems = meaningResult?.searchResultMap?.searchResultListMap?.MEANING?.items || [];
  const bestWordItem = selectBestWordItem(wordItems, word);

  let entrySummary = null;
  let meanings = [];

  if (bestWordItem) {
    meanings = collectWordMeanings(bestWordItem, 3);
    if (bestWordItem.entryId) {
      try {
        const entryResult = await requestJsonWithRetry(buildEntryUrl(bestWordItem.entryId), referer);
        entrySummary = summarizeEntry(entryResult);
      } catch (error) {
        if (!String(error?.message || "").includes("HTTP 404")) {
          throw error;
        }
      }
    }
  }

  if (!meanings.length) {
    const aliases = extractAsciiAliases(bestWordItem, word);
    meanings = await collectAliasWordFallback(word, aliases, referer);
  }

  if (!meanings.length) {
    const aliases = extractAsciiAliases(bestWordItem, word);
    meanings = collectMeaningSearchFallback(meaningItems, aliases, 3);
  }

  const decisionInfo = decideFromMeanings(row.appKorean, meanings);
  const reviewerMemoParts = [
    `\uB124\uC774\uBC84 \uB0B4\uBD80 API \uAE30\uC900 level${options.maxLevel} \uC790\uB3D9 \uAC80\uC218`,
    `wordItems=${wordItems.length}`,
    `meaningItems=${meaningItems.length}`,
    `match=${decisionInfo.matchCount}/${decisionInfo.tokenCount}`,
  ];

  if (entrySummary?.entryId) {
    reviewerMemoParts.push(`entry=${entrySummary.entryId}`);
  }

  return {
    sequence: Number(row.sequence),
    word,
    appKorean: row.appKorean,
    appPart: row.appPart,
    appCategory: row.appCategory,
    naverManualStatus: "\uAC80\uC218\uC644\uB8CC",
    naverManualMeaning: meanings.join(" / "),
    naverDecision: bestWordItem ? decisionInfo.decision : "\uBCF4\uB958",
    reviewerMemo: reviewerMemoParts.join(" | "),
    entryId: entrySummary?.entryId || "",
    dictCid: entrySummary?.dictCid || "",
    entryName: entrySummary?.entryName || "",
    matchedEntry: stripTags(bestWordItem?.expEntry),
    matchType: String(bestWordItem?.matchType || ""),
    proneticSymbols: (entrySummary?.prons || []).join(" / "),
  };
}

async function reviewRowSafe(row, options) {
  try {
    return await reviewRow(row, options);
  } catch (error) {
    if (!options.continueOnError) {
      throw error;
    }

    return {
      sequence: Number(row.sequence),
      word: String(row.word || "").trim(),
      appKorean: row.appKorean,
      appPart: row.appPart,
      appCategory: row.appCategory,
      naverManualStatus: "\uAC80\uC218\uC644\uB8CC",
      naverManualMeaning: "",
      naverDecision: "\uBCF4\uB958",
      reviewerMemo: `\uB124\uC774\uBC84 \uB0B4\uBD80 API \uC790\uB3D9 \uAC80\uC218 \uC624\uB958 | ${String(error?.message || error)}`,
      entryId: "",
      dictCid: "",
      entryName: "",
      matchedEntry: "",
      matchType: "",
      proneticSymbols: "",
    };
  }
}

async function mapWithConcurrency(items, limit, mapper) {
  const results = new Array(items.length);
  let nextIndex = 0;
  let completed = 0;

  async function worker() {
    while (true) {
      const currentIndex = nextIndex;
      if (currentIndex >= items.length) return;
      nextIndex += 1;

      results[currentIndex] = await mapper(items[currentIndex], currentIndex);
      completed += 1;

      if (completed % 25 === 0 || completed === items.length) {
        console.error(`progress ${completed}/${items.length}`);
      }
    }
  }

  const workers = Array.from({ length: Math.min(limit, items.length) }, () => worker());
  await Promise.all(workers);
  return results;
}

function buildDefaultOutputPath(rows, maxLevel) {
  const first = rows[0]?.sequence ?? 0;
  const last = rows[rows.length - 1]?.sequence ?? 0;
  return path.join(
    OUTPUT_DIR,
    `naver-manual-review-level${maxLevel}-internal-seq-${String(first).padStart(4, "0")}-${String(
      last
    ).padStart(4, "0")}.json`
  );
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  activeRequestTimeoutMs = options.requestTimeoutMs;
  activeRequestRetries = options.requestRetries;
  const inputCsv = options.input ? path.resolve(ROOT, options.input) : MASTER_CSV;

  if (!fs.existsSync(inputCsv)) {
    throw new Error(`Missing ${inputCsv}`);
  }

  const rows = parseCsv(fs.readFileSync(inputCsv, "utf8").replace(/^\uFEFF/, ""));
  const targets = rows
    .filter((row) => Number(row.appLevel || 0) <= options.maxLevel)
    .filter((row) => Number(row.sequence || 0) >= options.startSequence)
    .filter((row) =>
      options.decision
        ? String(row.naverDecision || "").trim() === options.decision
        : String(row.naverDecision || "").trim() === ""
    )
    .slice(0, options.limit);

  if (!targets.length) {
    throw new Error("No pending rows matched the requested filters.");
  }

  const startedAt = Date.now();
  const reviewedRows = await mapWithConcurrency(targets, options.concurrency, (row) =>
    reviewRowSafe(row, options)
  );
  const elapsedMs = Date.now() - startedAt;

  const byDecision = reviewedRows.reduce((counts, row) => {
    const key = row.naverDecision || "\uBBF8\uC785\uB825";
    counts[key] = (counts[key] ?? 0) + 1;
    return counts;
  }, {});

  const payload = {
    generatedAt: new Date().toISOString(),
    mode: "naver-internal-api",
    options,
    summary: {
      count: reviewedRows.length,
      elapsedMs,
      averageMs: Math.round(elapsedMs / reviewedRows.length),
      byDecision,
    },
    rows: reviewedRows,
  };

  const outputPath = options.output
    ? path.resolve(ROOT, options.output)
    : buildDefaultOutputPath(reviewedRows, options.maxLevel);

  fs.writeFileSync(outputPath, JSON.stringify(payload, null, 2), "utf8");

  console.log(
    JSON.stringify(
      {
        outputPath,
        summary: payload.summary,
        sequences: {
          first: reviewedRows[0]?.sequence ?? null,
          last: reviewedRows[reviewedRows.length - 1]?.sequence ?? null,
        },
      },
      null,
      2
    )
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
