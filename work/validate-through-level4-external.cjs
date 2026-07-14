const fs = require("fs");
const path = require("path");
const https = require("https");

const ROOT = process.cwd();
const TARGETS_JSON = path.join(ROOT, "outputs", "external-validation-targets.json");
const OXFORD_HTML = path.join(ROOT, "outputs", "external-sources", "oxford-3000-5000.html");
const API_CACHE_DIR = path.join(ROOT, "outputs", "external-sources", "dictionaryapi-cache");
const OUTPUT_JSON = path.join(ROOT, "outputs", "level4-external-validation.json");
const OUTPUT_CSV = path.join(ROOT, "outputs", "level4-external-validation.csv");
const NAVER_CSV = path.join(ROOT, "outputs", "naver-manual-review-level4.csv");
const OUTPUT_MD = path.join(ROOT, "outputs", "level4-external-validation-report.md");

const skipApi = process.argv.includes("--skip-api");
const apiModeArg = process.argv.find((arg) => arg.startsWith("--api-mode="));
const apiMode = apiModeArg ? apiModeArg.split("=")[1] : "priority";
const delayArg = process.argv.find((arg) => arg.startsWith("--delay-ms="));
const delayMs = Number(delayArg ? delayArg.split("=")[1] : 700);

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function csvEscape(value) {
  const text = String(value ?? "");
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function decodeHtml(value) {
  return String(value ?? "")
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
}

function normalizeWord(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[’']/g, "'");
}

function loadOxfordEntries() {
  const html = fs.readFileSync(OXFORD_HTML, "utf8");
  const entries = new Map();
  const itemRegex = /<li\b([^>]*)>([\s\S]*?)<\/li>/g;
  let match;

  while ((match = itemRegex.exec(html))) {
    const attrs = match[1];
    const body = match[2];
    const wordMatch = attrs.match(/\bdata-hw="([^"]+)"/);
    const posMatch = body.match(/<span class="pos">([\s\S]*?)<\/span>/);
    if (!wordMatch || !posMatch) continue;

    const word = normalizeWord(decodeHtml(wordMatch[1]));
    const part = decodeHtml(posMatch[1]).replace(/<[^>]+>/g, "").trim();
    const levels = [...attrs.matchAll(/\bdata-ox(?:3000|5000)="([^"]+)"/g)].map((item) => item[1]);
    const belongLevels = [...body.matchAll(/<span class="belong-to">([^<]+)<\/span>/g)].map((item) => item[1]);
    const allLevels = [...new Set([...levels, ...belongLevels].map((level) => level.toLowerCase()))].sort();
    const hrefMatch = body.match(/<a href="([^"]+)"/);
    const href = hrefMatch ? `https://www.oxfordlearnersdictionaries.com${decodeHtml(hrefMatch[1])}` : "";

    if (!entries.has(word)) entries.set(word, []);
    entries.get(word).push({ part, levels: allLevels, href });
  }

  return entries;
}

function mapKoreanPartToEnglish(part) {
  const text = String(part ?? "");
  const mapped = [];
  if (text.includes("명사")) mapped.push("noun");
  if (text.includes("동사")) mapped.push("verb");
  if (text.includes("형용사")) mapped.push("adjective");
  if (text.includes("부사")) mapped.push("adverb");
  if (text.includes("전치사")) mapped.push("preposition");
  if (text.includes("접속사")) mapped.push("conjunction");
  if (text.includes("대명사")) mapped.push("pronoun");
  if (text.includes("감탄사")) mapped.push("exclamation");
  if (text.includes("관사")) mapped.push("indefinite article", "definite article");
  if (text.includes("조동사")) mapped.push("modal verb");
  if (text.includes("수사")) mapped.push("number");
  if (text.includes("명사") || text.includes("紐낆궗")) mapped.push("noun");
  if (text.includes("동사") || text.includes("?숈궗")) mapped.push("verb");
  if (text.includes("형용사") || text.includes("?뺤슜")) mapped.push("adjective");
  if (text.includes("부사") || text.includes("遺")) mapped.push("adverb");
  if (text.includes("전치사") || text.includes("?꾩튂")) mapped.push("preposition");
  if (text.includes("접속사") || text.includes("?묒냽")) mapped.push("conjunction");
  if (text.includes("대명사") || text.includes("?紐낆궗")) mapped.push("pronoun");
  if (text.includes("감탄사") || text.includes("媛먰깂")) mapped.push("exclamation");
  if (text.includes("관사") || text.includes("愿")) mapped.push("indefinite article", "definite article");
  if (text.includes("조동사") || text.includes("議곕룞")) mapped.push("modal verb");
  if (text.includes("수사") || text.includes("number")) mapped.push("number");
  return mapped;
}

function partMatches(appPart, oxfordParts, apiParts) {
  const expected = mapKoreanPartToEnglish(appPart);
  if (!expected.length) return "manual-review";
  const candidates = new Set([...oxfordParts, ...apiParts].map((item) => item.toLowerCase()));
  if (expected.some((item) => candidates.has(item))) return "pass";
  if (expected.includes("modal verb") && candidates.has("verb")) return "pass";
  if (expected.includes("adjective") && candidates.has("determiner")) return "pass";
  return "review";
}

function readJsonIfExists(file) {
  if (!fs.existsSync(file)) return null;
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return null;
  }
}

function requestJson(url) {
  return new Promise((resolve) => {
    const req = https.get(
      url,
      {
        headers: {
          "User-Agent": "kids-dictionary-validation/1.0",
          Accept: "application/json",
        },
      },
      (res) => {
        let data = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          if (res.statusCode < 200 || res.statusCode >= 300) {
            resolve({ ok: false, status: res.statusCode, error: data.slice(0, 300) });
            return;
          }
          try {
            resolve({ ok: true, status: res.statusCode, data: JSON.parse(data) });
          } catch (error) {
            resolve({ ok: false, status: res.statusCode, error: error.message });
          }
        });
      }
    );
    req.on("error", (error) => resolve({ ok: false, status: 0, error: error.message }));
    req.setTimeout(15000, () => {
      req.destroy(new Error("request timeout"));
    });
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function loadDictionaryApi(word) {
  ensureDir(API_CACHE_DIR);
  const safeWord = word.replace(/[^a-z0-9'-]+/gi, "_");
  const cacheFile = path.join(API_CACHE_DIR, `${safeWord}.json`);
  const cached = readJsonIfExists(cacheFile);
  if (cached && cached.status !== 429) return { ...cached, fromCache: true };
  if (skipApi) return { ok: false, skipped: true, status: 0, data: null, error: "API skipped" };

  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`;
  let result = await requestJson(url);
  if (result.status === 429 || String(result.error ?? "").includes("1015")) {
    await sleep(5000);
    result = await requestJson(url);
  }
  if (result.status !== 429 && !String(result.error ?? "").includes("1015")) {
    fs.writeFileSync(cacheFile, JSON.stringify(result, null, 2));
  }
  await sleep(delayMs);
  return result;
}

function summarizeApi(result) {
  if (!result?.ok || !Array.isArray(result.data)) {
    return {
      checked: !result?.skipped,
      exists: false,
      parts: [],
      phonetics: [],
      audioCount: 0,
      sourceUrls: [],
      error: result?.skipped ? "skipped" : result?.error ?? "",
    };
  }

  const parts = [];
  const phonetics = [];
  const sourceUrls = [];
  let audioCount = 0;

  for (const entry of result.data) {
    for (const meaning of entry.meanings ?? []) {
      if (meaning.partOfSpeech) parts.push(meaning.partOfSpeech);
    }
    for (const phonetic of entry.phonetics ?? []) {
      if (phonetic.text) phonetics.push(phonetic.text);
      if (phonetic.audio) audioCount += 1;
    }
    for (const sourceUrl of entry.sourceUrls ?? []) {
      sourceUrls.push(sourceUrl);
    }
  }

  return {
    checked: true,
    exists: true,
    parts: [...new Set(parts)],
    phonetics: [...new Set(phonetics)],
    audioCount,
    sourceUrls: [...new Set(sourceUrls)],
    error: "",
  };
}

function naverUrl(word) {
  return `https://en.dict.naver.com/#/search?query=${encodeURIComponent(word)}`;
}

function hasMiddleLevel(levels) {
  return levels.some((level) => ["a1", "a2", "b1", "b2"].includes(level));
}

function statusFromChecks({ oxfordMatch, oxfordLevels, apiExists, partStatus }) {
  if (!oxfordMatch && !apiExists) return "manual-review";
  if (partStatus === "review") return "manual-review";
  if (oxfordMatch && hasMiddleLevel(oxfordLevels)) return "auto-pass";
  if (oxfordMatch || apiExists) return "source-found";
  return "manual-review";
}

function shouldCheckApiFirstPass({ oxfordMatch, oxfordLevels, partStatus }) {
  if (apiMode === "all") return true;
  if (apiMode === "none") return false;
  if (!oxfordMatch) return true;
  if (partStatus !== "pass") return true;
  return !hasMiddleLevel(oxfordLevels);
}

async function main() {
  if (!fs.existsSync(TARGETS_JSON)) {
    throw new Error(`Missing ${TARGETS_JSON}. Run work/export-external-validation-targets.cjs first.`);
  }

  const targets = JSON.parse(fs.readFileSync(TARGETS_JSON, "utf8"));
  const targetRows = targets.rows.filter((entry) => Number(entry.level) <= 4);
  const oxfordEntries = loadOxfordEntries();
  const rows = [];
  let apiChecked = 0;

  for (let index = 0; index < targetRows.length; index += 1) {
    const entry = targetRows[index];
    const word = normalizeWord(entry.word);
    const oxford = oxfordEntries.get(word) ?? [];
    const oxfordParts = [...new Set(oxford.map((item) => item.part))];
    const oxfordLevels = [...new Set(oxford.flatMap((item) => item.levels))].sort();
    let api = summarizeApi({ skipped: true });
    let partStatus = partMatches(entry.part, oxfordParts, []);

    if (shouldCheckApiFirstPass({ oxfordMatch: oxford.length > 0, oxfordLevels, partStatus })) {
      api = summarizeApi(await loadDictionaryApi(word));
      apiChecked += api.checked ? 1 : 0;
      partStatus = partMatches(entry.part, oxfordParts, api.parts);
    }

    const validationStatus = statusFromChecks({
      oxfordMatch: oxford.length > 0,
      oxfordLevels,
      apiExists: api.exists,
      partStatus,
    });

    rows.push({
      sequence: index + 1,
      appIndex: entry.index,
      word: entry.word,
      appKorean: entry.korean,
      appPart: entry.part,
      appCategory: entry.category,
      appLevel: entry.level,
      appAudience: entry.audience,
      appDefinition: entry.definition,
      oxfordMatch: oxford.length > 0,
      oxfordLevels,
      oxfordParts,
      oxfordUrls: [...new Set(oxford.map((item) => item.href).filter(Boolean))],
      dictionaryApiChecked: api.checked,
      dictionaryApiExists: api.exists,
      dictionaryApiParts: api.parts,
      dictionaryApiPhonetics: api.phonetics,
      dictionaryApiAudioCount: api.audioCount,
      dictionaryApiSources: api.sourceUrls,
      dictionaryApiError: api.error,
      partStatus,
      validationStatus,
      naverUrl: naverUrl(entry.word),
      naverManualStatus: "대기",
      naverManualMeaning: "",
      reviewerMemo: "",
    });
  }

  const summary = {
    generatedAt: new Date().toISOString(),
    scope: "through-level4-candidate",
    apiMode,
    total: rows.length,
    elementaryCandidates: rows.filter((entry) => entry.appAudience === "elementary-candidate").length,
    middleCandidates: rows.filter((entry) => entry.appAudience === "middle-high-candidate").length,
    level4Candidates: rows.filter((entry) => Number(entry.appLevel) === 4).length,
    oxfordMatches: rows.filter((entry) => entry.oxfordMatch).length,
    oxfordA1A2B1B2Matches: rows.filter((entry) => hasMiddleLevel(entry.oxfordLevels)).length,
    dictionaryApiChecked: rows.filter((entry) => entry.dictionaryApiChecked).length,
    dictionaryApiExists: rows.filter((entry) => entry.dictionaryApiExists).length,
    apiSkipped: rows.filter((entry) => entry.dictionaryApiError === "skipped").length,
    apiRateLimited: rows.filter((entry) => entry.dictionaryApiError.includes("1015") || entry.dictionaryApiError.includes("429")).length,
    autoPass: rows.filter((entry) => entry.validationStatus === "auto-pass").length,
    sourceFound: rows.filter((entry) => entry.validationStatus === "source-found").length,
    manualReview: rows.filter((entry) => entry.validationStatus === "manual-review").length,
    partReview: rows.filter((entry) => entry.partStatus === "review").length,
  };

  fs.writeFileSync(OUTPUT_JSON, JSON.stringify({ summary, rows }, null, 2));

  const csvColumns = [
    "sequence",
    "appIndex",
    "word",
    "appKorean",
    "appPart",
    "appCategory",
    "appLevel",
    "appAudience",
    "oxfordMatch",
    "oxfordLevels",
    "oxfordParts",
    "dictionaryApiChecked",
    "dictionaryApiExists",
    "dictionaryApiParts",
    "dictionaryApiPhonetics",
    "dictionaryApiAudioCount",
    "partStatus",
    "validationStatus",
    "naverUrl",
    "naverManualStatus",
    "naverManualMeaning",
    "reviewerMemo",
    "appDefinition",
  ];

  const csv = [
    csvColumns.join(","),
    ...rows.map((entry) =>
      csvColumns
        .map((key) => csvEscape(Array.isArray(entry[key]) ? entry[key].join("|") : entry[key]))
        .join(",")
    ),
  ].join("\n");
  fs.writeFileSync(OUTPUT_CSV, csv);

  const naverColumns = [
    "sequence",
    "word",
    "appKorean",
    "appPart",
    "appLevel",
    "validationStatus",
    "oxfordLevels",
    "dictionaryApiChecked",
    "dictionaryApiExists",
    "naverUrl",
    "naverManualMeaning",
    "naverDecision",
    "reviewerMemo",
  ];
  const naverCsv = [
    naverColumns.join(","),
    ...rows
      .filter((entry) => entry.validationStatus === "manual-review")
      .map((entry) =>
        naverColumns
          .map((key) => csvEscape(Array.isArray(entry[key]) ? entry[key].join("|") : entry[key]))
          .join(",")
      ),
  ].join("\n");
  fs.writeFileSync(NAVER_CSV, naverCsv);

  const reviewRows = rows
    .filter((entry) => entry.validationStatus === "manual-review")
    .slice(0, 120)
    .map(
      (entry) =>
        `| ${entry.sequence} | ${entry.word} | ${entry.appKorean} | ${entry.appPart} | ${entry.appLevel} | ${entry.oxfordMatch ? entry.oxfordLevels.join(", ") : "없음"} | ${entry.dictionaryApiExists ? "있음" : "없음"} | ${entry.partStatus} |`
    )
    .join("\n");

  const md = `# Level 4까지 외부 기준 검증 결과

생성 시각: ${new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}

## 기준

- 검증 범위: 앱 내부 레벨 1~4 전체, 총 ${summary.total}개
- 한국어 뜻 최종 기준: 네이버 영어사전 수동 검수
- 자동 기준 1: Oxford 3000 and 5000 등재 여부, CEFR A1/A2/B1/B2 우선 확인
- 자동 기준 2: Free Dictionary API 응답 여부, 품사, 발음기호/오디오 존재 여부
- API 모드: ${summary.apiMode}

## 요약

| 항목 | 개수 |
|---|---:|
| 검증 대상 | ${summary.total} |
| 초등 후보 | ${summary.elementaryCandidates} |
| 중등 후보 | ${summary.middleCandidates} |
| Level 4 후보 | ${summary.level4Candidates} |
| Oxford 등재 | ${summary.oxfordMatches} |
| Oxford A1/A2/B1/B2 등재 | ${summary.oxfordA1A2B1B2Matches} |
| Dictionary API 확인 | ${summary.dictionaryApiChecked} |
| Dictionary API 응답 있음 | ${summary.dictionaryApiExists} |
| Dictionary API 제한 | ${summary.apiRateLimited} |
| 자동 통과 | ${summary.autoPass} |
| 출처 확인됨 | ${summary.sourceFound} |
| 수동 확인 필요 | ${summary.manualReview} |
| 품사 재확인 필요 | ${summary.partReview} |

## 수동 확인 우선 목록

| 번호 | 단어 | 앱 뜻 | 앱 품사 | 앱 레벨 | Oxford 레벨 | API | 품사 상태 |
|---:|---|---|---|---:|---|---|---|
${reviewRows || "| - | - | - | - | - | - | - | - |"}

## 산출물

- 전체 자동검증 JSON: \`outputs/level4-external-validation.json\`
- 전체 자동검증 CSV: \`outputs/level4-external-validation.csv\`
- 네이버 수동 검수표: \`outputs/naver-manual-review-level4.csv\`

## 참고 출처

- Oxford 3000 and 5000: https://www.oxfordlearnersdictionaries.com/wordlists/oxford3000-5000
- Free Dictionary API: https://api.dictionaryapi.dev/api/v2/entries/en/example
- 네이버 영어사전: https://en.dict.naver.com/
`;

  fs.writeFileSync(OUTPUT_MD, md);
  console.log(JSON.stringify(summary, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
