const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const INPUT_CSV = path.join(ROOT, "outputs", "naver-manual-review-all.csv");
const FIX_CANDIDATES_JSON = path.join(ROOT, "outputs", "naver-bulk-fix-candidates.json");
const OUTPUT_FILE = path.join(ROOT, "outputs", "kids-dictionary", "manual-extra-overrides.js");
const OUTPUT_REPORT = path.join(ROOT, "outputs", "manual-extra-overrides-report.json");
const MANUAL_FALLBACK_OVERRIDES = {
  citizens: "시민들",
  verzeichnis: "목록, 디렉터리",
  developers: "개발자들",
  mysql: "MySQL 데이터베이스",
  puerto: "푸에르토",
  textbooks: "교과서들",
  researchers: "연구자들",
  pounds: "파운드, 영국 화폐",
  epson: "엡손",
  oldest: "가장 오래된, 최고령의",
  launched: "출시한, 시작한, 발사한",
  farmers: "농부들",
  trans: "횡단의, 반대편의, 트랜스",
  troops: "군대, 병력",
  physicians: "의사들, 내과 의사들",
  regards: "안부, 관심, 관련",
  sur: "남쪽의, 남부의",
  dropped: "떨어진, 낮아진, 중단한",
  fonts: "글꼴들, 폰트들",
  britney: "브리트니",
  cited: "인용된, 언급된",
  gamecube: "게임큐브",
  jelsoft: "젤소프트",
  submissions: "제출물들, 제출",
  espn: "ESPN 스포츠 방송망",
  algorithms: "알고리즘들",
  expansys: "익스팬시스",
  screenshots: "스크린샷들",
  colleagues: "동료들",
  equations: "방정식들",
  refused: "거절한, 거부한",
  thomson: "톰슨",
  sys: "시스템",
  investigations: "조사들, 수사들",
  medications: "약물들, 의약품들",
  stockings: "스타킹, 긴 양말",
  gamespot: "게임스팟",
  wordpress: "워드프레스",
  monroe: "먼로",
  modifications: "수정들, 변경사항들",
  routers: "라우터들",
  hughes: "휴즈",
  photographers: "사진작가들",
  watson: "왓슨",
  enrolled: "등록된, 입학한",
  swingers: "스윙하는 사람들",
  headers: "머리글들, 헤더들",
  klein: "클라인",
  illustrations: "삽화들, 도해들",
  assumptions: "가정들, 추정들",
  shareholders: "주주들",
  webshots: "웹샷",
  bookmarks: "책갈피들, 즐겨찾기들",
  novels: "소설들",
  tablets: "태블릿들, 정제들",
  minolta: "미놀타",
  republicans: "공화당원들, 공화주의자들",
  benz: "벤츠",
  hotmail: "핫메일",
  armstrong: "암스트롱",
};
const DICTIONARY_SOURCE_FILES = [
  "outputs/kids-dictionary/vocab-bank.js",
  "outputs/kids-dictionary/top1000-supplement.js",
  "outputs/kids-dictionary/top2000-supplement.js",
  "outputs/kids-dictionary/top2200-supplement.js",
  "outputs/kids-dictionary/ministry3000-supplement.js",
  "outputs/kids-dictionary/verified-bank-supplement.js",
  "outputs/kids-dictionary/verified-meaning-overrides.js",
  "outputs/kids-dictionary/manual-meaning-overrides.js",
  "outputs/kids-dictionary/manual-middle-school-additions.js",
  "outputs/kids-dictionary/manual-excluded-words.js",
  "outputs/kids-dictionary/app.js",
].map((file) => path.join(ROOT, file));

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    const next = text[i + 1];

    if (ch === '"') {
      if (inQuotes && next === '"') {
        cell += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (!inQuotes && ch === ",") {
      row.push(cell);
      cell = "";
      continue;
    }

    if (!inQuotes && (ch === "\n" || ch === "\r")) {
      if (ch === "\r" && next === "\n") {
        i += 1;
      }
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
      continue;
    }

    cell += ch;
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

function normalizeSpaces(text) {
  return String(text || "").replace(/\s+/g, " ").trim();
}

function attachRo(word) {
  const normalized = String(word || "").trim();
  if (!normalized) return "";
  const lastChar = normalized[normalized.length - 1];
  const code = lastChar.charCodeAt(0) - 0xac00;
  if (code >= 0 && code <= 11171) {
    const jong = code % 28;
    return `${normalized}${jong !== 0 && jong !== 8 ? "으로" : "로"}`;
  }
  return `${normalized}으로`;
}

function expandInlineVariants(text) {
  return String(text || "")
    .replace(/([가-힣A-Za-z]+)\[([^\]]+)\]로/g, (_, left, inner) => `${left}·${attachRo(inner)}`)
    .replace(/([가-힣A-Za-z]+)\[([^\]]+)\](하는|한|할|하게|하여|해서)/g, "$1·$2$3")
    .replace(/([가-힣A-Za-z])\(([가-힣]{1,2})\)([가-힣A-Za-z])/g, "$1$2$3")
    .replace(/([가-힣A-Za-z]+)\[([^\]]+)\]/g, "$1, $2")
    .replace(/\[([^\]]+)\]/g, "$1");
}

function refineMeaningText(text) {
  return normalizeSpaces(
    String(text || "")
      .replace(/\s+([,.;:])/g, "$1")
      .replace(/([가-힣A-Za-z0-9·~.-]+)\s+의/g, "$1의")
      .replace(/([가-힣A-Za-z0-9·~.-]+)\s+에/g, "$1에")
      .replace(/관련 성/g, "관련성")
      .replace(/관계 관련성/g, "관계, 관련성")
      .replace(/편 안한/g, "편안한")
      .replace(/편 한/g, "편한")
      .replace(/사고 재해/g, "사고, 재해")
      .replace(/피의자 피고/g, "피의자, 피고")
      .replace(/수정 조정/g, "수정, 조정")
      .replace(/조절 조정 가능한/g, "조절, 조정 가능한")
      .replace(/지지 옹호/g, "지지, 옹호")
      .replace(/컴퓨터 인터넷 로/g, "컴퓨터·인터넷으로")
      .replace(/컴퓨터 인터넷으로/g, "컴퓨터·인터넷으로")
      .replace(/처리 하는/g, "처리하는")
      .replace(/출판 할/g, "출판할")
      .replace(/인쇄 출판할/g, "인쇄·출판할")
      .replace(/출판 할/g, "출판할")
  )
    .replace(/\s+,/g, ",")
    .replace(/,\s*,/g, ", ")
    .replace(/,+/g, ",")
    .replace(/,\s*$/g, "");
}

function stripReferenceParens(text) {
  return String(text || "")
    .replace(/\(\s*→[^)]*\)/g, "")
    .replace(/\(\s*= [^)]*\)/g, "")
    .replace(/\(\s*↔[^)]*\)/g, "")
    .replace(/\(\([^)]*\)\)/g, "")
    .replace(/\([^)]*속어[^)]*\)/g, "")
    .replace(/\([^)]*미국[^)]*\)/g, (match) => (match.length <= 12 ? match : ""))
    .replace(/\([^)]*영국[^)]*\)/g, (match) => (match.length <= 12 ? match : ""));
}

function finalizeMeaningText(text) {
  return normalizeSpaces(
    String(text || "")
      .replace(/situation comedy/gi, "상황 코미디")
      .replace(/\s*[一-龯]+\s*/g, " ")
      .replace(/([A-Za-z]+)주 의/g, "$1주의")
      .replace(/사고,\s*재해\s*사고재해/g, "사고, 재해")
      .replace(/인쇄 출판할/g, "인쇄·출판할")
      .replace(/컴퓨터 인터넷으로/g, "컴퓨터·인터넷으로")
      .replace(/컴퓨터 인터넷 로/g, "컴퓨터·인터넷으로")
  )
    .replace(/\s+,/g, ",")
    .replace(/,\s*,/g, ", ")
    .replace(/,+/g, ",")
    .replace(/,\s*$/g, "");
}

function cleanSense(text) {
  return refineMeaningText(
    stripReferenceParens(expandInlineVariants(text))
      .replace(/[()[\]]/g, " ")
      .replace(/\b(especially|often|usually)\b/gi, " ")
      .replace(/[,;]\s*$/g, "")
  );
}

function dedupeTokens(tokens) {
  const seen = new Set();
  const out = [];

  for (const token of tokens) {
    const normalized = token.replace(/\s+/g, " ").trim();
    if (!normalized) continue;
    const key = normalized.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(normalized);
  }

  return out;
}

function buildMeaningFromNaver(naverManualMeaning) {
  const parts = String(naverManualMeaning || "")
    .split(" / ")
    .map((part) => cleanSense(part))
    .filter(Boolean);

  if (!parts.length) {
    return "";
  }

  const tokenized = [];
  for (const part of parts.slice(0, 3)) {
    const subparts = part
      .split(/, /)
      .map((token) => normalizeSpaces(token))
      .filter(Boolean);
    tokenized.push(...subparts);
  }

  const deduped = dedupeTokens(tokenized).slice(0, 4);
  return refineMeaningText(deduped.join(", "));
}

function cleanSuggestedKorean(text) {
  return refineMeaningText(
    String(text || "")
      .replace(/([가-힣A-Za-z]+)\[([^\]]+)\](하는|한|할|하게|하여|해서)/g, "$1·$2$3")
      .replace(/([가-힣A-Za-z])\(([가-힣]{1,2})\)([가-힣A-Za-z])/g, "$1$2$3")
      .replace(/\[[^\]]+\]/g, " ")
      .replace(/[()]/g, " ")
      .replace(/\b(미국|영국|속어|해부|식물|화학|기상)\b/g, " ")
      .replace(/\s*,\s*/g, ", ")
  )
}

function looksLikeAcronymWord(word) {
  return /^[a-z0-9.-]{1,4}$/i.test(String(word || "").trim());
}

function hasKorean(text) {
  return /[가-힣]/.test(String(text || ""));
}

function shouldRejectMeaning(word, meaning) {
  const normalized = normalizeSpaces(String(meaning || ""));
  if (!normalized) return true;

  if (/^약어(?:\s|$)/.test(normalized) && !looksLikeAcronymWord(word)) {
    return true;
  }

  if (/^(미 우편|영 Merchant|national debt|magnetic north|shore patrol)(?:\s|,|$)/i.test(normalized) && !looksLikeAcronymWord(word)) {
    return true;
  }

  if (!hasKorean(normalized)) {
    return true;
  }

  return false;
}

function scoreMeaningCandidate(word, source, meaning) {
  if (shouldRejectMeaning(word, meaning)) {
    return Number.NEGATIVE_INFINITY;
  }

  const normalized = normalizeSpaces(String(meaning || ""));
  const koreanCharCount = (normalized.match(/[\uAC00-\uD7A3]/g) || []).length;
  const segments = normalized.split(/\s*,\s*/).filter(Boolean).length;

  let score = 0;

  if (source === "manualFallback") {
    score += 1000;
  } else if (source === "naver") {
    score += 200;
  } else if (source === "suggested") {
    score += 100;
  }

  score += Math.min(40, koreanCharCount);
  score += Math.min(20, segments * 4);

  if (/[()[\]]/.test(normalized)) {
    score -= 25;
  }

  return score;
}

function chooseBestMeaning(word, candidates) {
  const ranked = candidates
    .map((candidate) => {
      const meaning = finalizeMeaningText(refineMeaningText(candidate.meaning || ""));
      return {
        ...candidate,
        meaning,
        score: scoreMeaningCandidate(word, candidate.source, meaning),
      };
    })
    .filter((candidate) => Number.isFinite(candidate.score))
    .sort((a, b) => b.score - a.score);

  return ranked[0]?.meaning || "";
}

function isPlaceholderRow(row) {
  const word = String(row.word || "").trim();
  const appKorean = String(row.appKorean || "").trim();
  const definition = String(row.definition || "").trim();

  return (
    (word && appKorean === `${word} 관련 추가 영어 어휘`) ||
    definition.includes("어휘 뱅크의 추가 단어를 자동 보강한 항목이에요")
  );
}

function shouldUseRow(row) {
  return (
    isPlaceholderRow(row) &&
    String(row.naverManualStatus || "").trim() === "검수완료" &&
    String(row.naverDecision || "").trim() !== "보류" &&
    String(row.naverManualMeaning || "").trim()
  );
}

function buildSuggestedMap() {
  if (!fs.existsSync(FIX_CANDIDATES_JSON)) {
    return new Map();
  }

  const parsed = JSON.parse(fs.readFileSync(FIX_CANDIDATES_JSON, "utf8"));
  const rows = Array.isArray(parsed.rows) ? parsed.rows : [];
  const map = new Map();

  for (const row of rows) {
    const word = String(row.word || "").trim().toLowerCase();
    const suggestion = cleanSuggestedKorean(row.suggestedKorean || "");
    if (!word || !suggestion || !row.autoFixEligible) continue;
    map.set(word, suggestion);
  }

  return map;
}

function getCurrentPlaceholderWords() {
  const vm = require("vm");
  const context = {
    console,
    alert() {},
    Audio: function Audio() {
      return { play: async () => {} };
    },
    SpeechSynthesisUtterance: function SpeechSynthesisUtterance() {},
    fetch: async () => ({ ok: false }),
    localStorage: {
      getItem() {
        return null;
      },
      setItem() {},
    },
    window: {
      studentVocabularyBank: [],
      speechSynthesis: { cancel() {}, speak() {}, getVoices() { return []; } },
      addEventListener() {},
    },
    document: {
      querySelector() {
        return {
          dataset: {},
          value: "",
          innerHTML: "",
          textContent: "",
          classList: { add() {}, remove() {}, toggle() {} },
          addEventListener() {},
          querySelector() {
            return null;
          },
        };
      },
      querySelectorAll() {
        return [];
      },
    },
  };

  vm.createContext(context);
  for (const file of DICTIONARY_SOURCE_FILES) {
    if (fs.existsSync(file)) {
      vm.runInContext(fs.readFileSync(file, "utf8"), context);
    }
  }

  const dictionary = vm.runInContext("dictionary", context);
  return new Set(
    dictionary
      .filter((entry) => String(entry.korean || "").includes("관련 추가 영어 어휘"))
      .map((entry) => String(entry.word || "").trim().toLowerCase())
      .filter(Boolean)
  );
}

function main() {
  if (!fs.existsSync(INPUT_CSV)) {
    throw new Error(`Missing input CSV: ${INPUT_CSV}`);
  }

  const rows = parseCsv(fs.readFileSync(INPUT_CSV, "utf8").replace(/^\uFEFF/, ""));
  const suggestedMap = buildSuggestedMap();
  const currentPlaceholderWords = getCurrentPlaceholderWords();
  const selectedRows = rows.filter((row) => currentPlaceholderWords.has(String(row.word || "").trim().toLowerCase()) && shouldUseRow(row));

  const overrides = {};
  const samples = [];

  for (const row of selectedRows) {
    const word = String(row.word || "").trim().toLowerCase();
    const manualFallback = MANUAL_FALLBACK_OVERRIDES[word] || "";
    const fromSuggested = cleanSuggestedKorean(suggestedMap.get(word) || "");
    const fromNaver = buildMeaningFromNaver(row.naverManualMeaning);
    const finalMeaning = chooseBestMeaning(word, [
      { source: "manualFallback", meaning: manualFallback },
      { source: "naver", meaning: fromNaver },
      { source: "suggested", meaning: fromSuggested },
    ]);

    if (!word || !finalMeaning) continue;

    overrides[word] = finalMeaning;
    if (samples.length < 30) {
      samples.push({
        word,
        finalMeaning,
        decision: row.naverDecision,
        naverManualMeaning: row.naverManualMeaning,
      });
    }
  }

  const sortedEntries = Object.entries(overrides).sort(([a], [b]) => a.localeCompare(b));
  const fileBody = [
    "window.verifiedMeaningOverrides = Object.assign(",
    "  window.verifiedMeaningOverrides || {},",
    "  {",
    ...sortedEntries.map(([word, meaning]) => `    ${JSON.stringify(word)}: ${JSON.stringify(meaning)},`),
    "  }",
    ");",
    "",
  ].join("\n");

  fs.writeFileSync(OUTPUT_FILE, fileBody, "utf8");
  fs.writeFileSync(
    OUTPUT_REPORT,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        inputCsv: INPUT_CSV,
        outputFile: OUTPUT_FILE,
        currentPlaceholderWordCount: currentPlaceholderWords.size,
        selectedRowCount: selectedRows.length,
        overrideCount: sortedEntries.length,
        sample: samples,
      },
      null,
      2
    ),
    "utf8"
  );

  console.log(
    JSON.stringify(
      {
        outputFile: OUTPUT_FILE,
        currentPlaceholderWordCount: currentPlaceholderWords.size,
        selectedRowCount: selectedRows.length,
        overrideCount: sortedEntries.length,
        sample: samples.slice(0, 10),
      },
      null,
      2
    )
  );
}

main();
