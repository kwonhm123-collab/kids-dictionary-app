const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = process.cwd();
const APP_DIR = path.join(ROOT, "outputs", "kids-dictionary");
const REVIEW_CSV = path.join(ROOT, "outputs", "naver-manual-review-all.csv");
const OUTPUT_FILE = path.join(APP_DIR, "detailed-sense-overrides.js");
const LIVE_CACHE_FILE = path.join(APP_DIR, "live-detailed-sense-cache.json");

const SOURCE_FILES = [
  "vocab-bank.js",
  "top1000-supplement.js",
  "top2000-supplement.js",
  "top2200-supplement.js",
  "ministry3000-supplement.js",
  "verified-bank-supplement.js",
  "verified-meaning-overrides.js",
  "manual-meaning-overrides.js",
  "manual-extra-overrides.js",
  "manual-middle-school-additions.js",
  "manual-middle-school-core-additions.js",
  "manual-middle-school-depth-additions.js",
  "manual-high-school-depth-additions.js",
  "manual-oxford-pdf-additions.js",
  "manual-phrase-additions.js",
  "manual-excluded-words.js",
  "manual-proper-noun-overrides.js",
  "manual-negative-prefix-additions.js",
  "app.js",
];

const MANUAL_SENSES = {
  sequence: [
    ["명사", "(일련의) 연속적인 사건들[행동들/숫자들 등]"],
    ["명사", "(사건·행동 등의) 순서[차례]"],
    ["동사", "차례로 배열하다"],
  ],
};

const KNOWN_FUNCTION_PARTS = Object.fromEntries([
  [["a", "an", "the"], "관사"],
  [["and", "although", "as", "because", "but", "if", "nor", "once", "or", "since", "so", "than", "though", "unless", "until", "when", "whereas", "whether", "while", "yet"], "접속사"],
  [["about", "above", "across", "after", "against", "along", "among", "around", "at", "before", "behind", "below", "beneath", "beside", "between", "beyond", "by", "despite", "during", "except", "for", "from", "in", "inside", "into", "near", "of", "off", "on", "onto", "outside", "over", "past", "through", "throughout", "to", "toward", "towards", "under", "underneath", "up", "upon", "with", "within", "without"], "전치사"],
  [["he", "her", "hers", "herself", "him", "himself", "i", "it", "itself", "me", "mine", "myself", "one", "oneself", "ours", "ourselves", "she", "someone", "somebody", "something", "that", "their", "theirs", "them", "themselves", "these", "they", "this", "those", "us", "we", "what", "whatever", "which", "who", "whoever", "whom", "whose", "you", "yours", "yourself", "yourselves"], "대명사"],
].flatMap(([words, part]) => words.map((word) => [word, part])));

function makeElement() {
  return {
    dataset: {},
    value: "",
    innerHTML: "",
    textContent: "",
    hidden: false,
    classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
    addEventListener() {},
    removeEventListener() {},
    setAttribute() {},
    removeAttribute() {},
    appendChild() {},
    focus() {},
    scrollIntoView() {},
    querySelector() { return null; },
    querySelectorAll() { return []; },
    style: {},
  };
}

function loadDictionary(includeDetailedSenses = false) {
  const context = {
    console,
    alert() {},
    Audio: function Audio() { return { play: async () => {} }; },
    SpeechSynthesisUtterance: function SpeechSynthesisUtterance() {},
    fetch: async () => ({ ok: false, status: 404 }),
    localStorage: { getItem() { return null; }, setItem() {}, removeItem() {} },
    navigator: { serviceWorker: {} },
    window: {
      addEventListener() {},
      speechSynthesis: { cancel() {}, speak() {}, getVoices: () => [] },
      detailedSenseOverrides: {},
    },
    document: {
      querySelector() { return makeElement(); },
      querySelectorAll() { return []; },
      getElementById() { return makeElement(); },
      createElement() { return makeElement(); },
      body: makeElement(),
      addEventListener() {},
      removeEventListener() {},
    },
    setTimeout,
    clearTimeout,
    location: {},
  };

  vm.createContext(context);
  const sourceFiles = [...SOURCE_FILES];
  if (includeDetailedSenses) {
    sourceFiles.splice(sourceFiles.indexOf("app.js"), 0, "detailed-sense-overrides.js");
  }
  for (const file of sourceFiles) {
    vm.runInContext(fs.readFileSync(path.join(APP_DIR, file), "utf8"), context, { filename: file });
  }

  return JSON.parse(
    vm.runInContext(
      "JSON.stringify(dictionary.map(({ word, korean, part, senses, senseSource }) => ({ word, korean, part, senses, senseSource })))",
      context
    )
  );
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
    } else if (!inQuotes && char === ",") {
      row.push(cell);
      cell = "";
    } else if (!inQuotes && (char === "\n" || char === "\r")) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(cell);
      if (row.some((value) => value !== "")) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }

  if (cell.length || row.length) {
    row.push(cell);
    rows.push(row);
  }

  const [rawHeader, ...body] = rows;
  const header = rawHeader.map((name) => name.replace(/^\uFEFF/, ""));
  return body.map((values) =>
    Object.fromEntries(header.map((name, index) => [name, values[index] ?? ""]))
  );
}

function normalizeWord(value) {
  return String(value || "").trim().toLowerCase().replace(/\s+/g, " ");
}

function stripMarkup(value) {
  return String(value || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function splitReviewedMeanings(value) {
  const text = stripMarkup(value);
  const results = [];
  let buffer = "";
  let roundDepth = 0;
  let squareDepth = 0;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if (char === "(") roundDepth += 1;
    else if (char === ")") roundDepth = Math.max(0, roundDepth - 1);
    else if (char === "[") squareDepth += 1;
    else if (char === "]") squareDepth = Math.max(0, squareDepth - 1);

    const isSeparator =
      char === "/" &&
      roundDepth === 0 &&
      squareDepth === 0 &&
      /\s/.test(text[index - 1] || "") &&
      /\s/.test(text[index + 1] || "");
    if (isSeparator) {
      if (buffer.trim()) results.push(buffer.trim());
      buffer = "";
      continue;
    }
    buffer += char;
  }
  if (buffer.trim()) results.push(buffer.trim());
  return [...new Set(results)].slice(0, 3);
}

function normalizePart(part) {
  const value = String(part || "");
  const labels = ["동사", "명사", "형용사", "부사", "대명사", "전치사", "접속사", "감탄사", "관사", "조동사", "수사", "고유명사", "약어", "숙어"];
  const trimmed = value.trim();
  if (labels.includes(trimmed)) return trimmed;
  const matches = labels
    .map((label) => ({ label, index: value.indexOf(label) }))
    .filter((item) => item.index >= 0)
    .sort((left, right) => left.index - right.index);
  if (matches.length === 1) return matches[0].label;
  if (matches.some((item) => item.label === "명사")) return "명사";
  if (matches.length) return matches[0].label;
  return value.trim() || "단어";
}

function inferPart(meaning, entryPart, word = "") {
  const knownPart = KNOWN_FUNCTION_PARTS[normalizeWord(word)];
  if (knownPart) return knownPart;
  const text = String(meaning || "")
    .trim()
    .replace(/[)\].,;:]+$/g, "")
    .trim();
  const normalizedPart = normalizePart(entryPart);
  if (["부사", "대명사", "전치사", "접속사", "감탄사", "관사", "조동사", "수사", "고유명사", "약어", "숙어"].includes(normalizedPart)) {
    return normalizedPart;
  }
  const koreanChunks = text.match(/[가-힣]+/g) || [];
  const last = koreanChunks.at(-1) || "";
  if (/(?:적으로|하게|히|도록|씩|마다|에서|으로|로서|로써)$/.test(last) || ["따로", "그대로"].includes(last)) {
    return "부사";
  }
  if (
    /(?:한|하는|적인|있는|없는|가능한|좋은|나쁜|큰|작은|높은|낮은|빠른|느린|가벼운|무거운|밝은|어두운|새로운|오래된|로운|스러운|받은|같은|끼치는|따르는|붉은|검은|흰|파란|빨간|노란|하얀|푸른|멋진|어린|추운|더운|차가운|기쁜|슬픈|의)$/.test(last)
  ) {
    return "형용사";
  }
  if (/다$/.test(last)) {
    return "동사";
  }
  return "명사";
}

function extractReference(meaning) {
  const match = String(meaning || "").match(/\s*\(\s*→\s*([^)]*?)\s*\)\s*$/);
  if (!match) return { meaning: String(meaning || "").trim(), reference: "" };
  return {
    meaning: String(meaning || "").slice(0, match.index).trim(),
    reference: match[1].trim(),
  };
}

function canonicalKoreanToken(value) {
  const token = String(value || "").trim();
  if (/^(?:빨강|빨간|붉|적색)/.test(token)) return "색상빨강";
  if (/^(?:초록|녹색)/.test(token)) return "색상초록";
  if (/^(?:파랑|파란|푸른|청색)/.test(token)) return "색상파랑";
  if (/^(?:노랑|노란|황색)/.test(token)) return "색상노랑";
  if (/^(?:하양|하얀|흰|백색)/.test(token)) return "색상하양";
  if (/^(?:검정|검은|까만|흑색)/.test(token)) return "색상검정";
  if (/^춤/.test(token)) return "춤";
  if (/^(?:왜냐하면|때문|이유)/.test(token)) return "이유";
  if (/^(?:배송|운송|배달)/.test(token)) return "운송";
  if (/^(?:계정|계좌)/.test(token)) return "계정";
  if (/^(?:설명|서술|기술|묘사)/.test(token)) return "설명";
  if (/^(?:주요|주된|중요)/.test(token)) return "주요";
  if (/^(?:형식|양식|방식|형태)/.test(token)) return "형식";
  if (/^(?:도구|기구)/.test(token)) return "도구";
  if (/^(?:일자리|직장|직업)/.test(token)) return "일자리";
  return token;
}

function koreanTokens(value) {
  const tokens = String(value || "").match(/[가-힣]+/g) || [];
  const results = new Set();
  const suffixes = [
    "화하다", "시키다", "스럽다", "하다", "되다", "이다", "적인", "으로", "에서",
    "에게", "처럼", "하게", "도록", "마다", "로서", "로써", "색", "의",
  ];

  for (const rawToken of tokens) {
    const variants = new Set([rawToken]);
    for (const suffix of suffixes) {
      if (rawToken.endsWith(suffix) && rawToken.length > suffix.length) {
        variants.add(rawToken.slice(0, -suffix.length));
      }
    }
    for (const variant of variants) {
      const canonical = canonicalKoreanToken(variant);
      if (canonical && !["관련", "추가", "영어", "어휘", "단어", "뜻"].includes(canonical)) {
        results.add(canonical);
      }
    }
  }
  return [...results];
}

function meaningsAlign(appKorean, reviewedMeanings) {
  const appTokens = koreanTokens(appKorean);
  const reviewedTokens = koreanTokens(reviewedMeanings.join(" "));
  return appTokens.some((appToken) =>
    reviewedTokens.some((reviewedToken) => {
      if (appToken === reviewedToken) return true;
      if (appToken.length < 2 || reviewedToken.length < 2) return false;
      return appToken.includes(reviewedToken) || reviewedToken.includes(appToken);
    })
  );
}

function hasTrustedEntry(row, word) {
  const memo = String(row?.reviewerMemo || "");
  const hasEntryId = /(?:^|\s|\|)entry=[0-9a-f]{16,}(?:\s|\||$)/i.test(memo);
  const explicitlyHeld = /보류|오류/.test(memo);
  const entryNameMatch = !row?.matchedEntry || normalizeWord(row.matchedEntry) === normalizeWord(word);
  return hasEntryId && !explicitlyHeld && entryNameMatch;
}

function trustedEntryCanStandAlone(entry, word) {
  const normalized = normalizeWord(word);
  const compactWord = normalized.replace(/[^a-z0-9]/g, "");
  const looksInflected = /(?:ies|ves|ses|xes|zes|ches|shes|ed|ing|s)$/.test(compactWord);
  const isProperNoun = normalizePart(entry?.part) === "고유명사";
  return compactWord.length > 3 && !looksInflected && !isProperNoun;
}

function isUsableMeaning(meaning) {
  const text = String(meaning || "").trim();
  return (
    text.length > 0 &&
    text.length <= 180 &&
    /[가-힣]/.test(text) &&
    !/관련 추가 영어 어휘|어휘 뱅크 단어|온라인 사전 확장 데이터/.test(text)
  );
}

function correctKnownMeaningTypo(meaning) {
  const corrections = {
    "삼호 작용": "상호 작용",
  };
  const text = String(meaning || "").trim();
  return corrections[text] ?? text;
}

function buildSenseRows(entry, meanings) {
  return meanings
    .map((meaning) => extractReference(correctKnownMeaningTypo(meaning)))
    .filter(({ meaning }) => isUsableMeaning(meaning))
    .map(({ meaning, reference }) => [inferPart(meaning, entry.part, entry.word), meaning, reference])
    .filter((sense, index, senses) =>
      senses.findIndex((item) => item[1].replace(/\s+/g, "") === sense[1].replace(/\s+/g, "")) === index
    )
    .slice(0, 3);
}

function loadLiveCache() {
  if (!fs.existsSync(LIVE_CACHE_FILE)) return {};
  const parsed = JSON.parse(fs.readFileSync(LIVE_CACHE_FILE, "utf8"));
  return parsed?.entries && typeof parsed.entries === "object" ? parsed.entries : {};
}

function main() {
  const dictionary = loadDictionary();
  const entryByWord = new Map(dictionary.map((entry) => [normalizeWord(entry.word), entry]));
  const reviewRows = parseCsv(fs.readFileSync(REVIEW_CSV, "utf8"));
  const reviewByWord = new Map(reviewRows.map((row) => [normalizeWord(row.word), row]));
  const liveEntries = loadLiveCache();
  const overrides = {};
  const stats = {
    dictionaryWords: dictionary.length,
    reviewRows: reviewRows.length,
    trustedEntryRows: 0,
    semanticallyAlignedRows: 0,
    manual: 0,
    liveApiRows: 0,
    skippedExistingCurated: 0,
    rejectedMismatch: 0,
  };

  for (const [word, entry] of entryByWord) {
    if (entry.senseSource === "manual-curated" && Array.isArray(entry.senses) && entry.senses.length) {
      stats.skippedExistingCurated += 1;
      continue;
    }
    if (MANUAL_SENSES[word]) {
      overrides[word] = MANUAL_SENSES[word].map(([part, meaning]) => [part, meaning, ""]);
      stats.manual += 1;
      continue;
    }

    const liveEntry = liveEntries[word];
    const liveSenses = Array.isArray(liveEntry?.senses)
      ? liveEntry.senses
          .map(([part, meaning, reference = ""]) => [KNOWN_FUNCTION_PARTS[word] || normalizePart(part), correctKnownMeaningTypo(meaning), String(reference || "").trim()])
          .filter(([, meaning]) => isUsableMeaning(meaning))
          .filter((sense, index, senses) =>
            senses.findIndex((item) => item[1].replace(/\s+/g, "") === sense[1].replace(/\s+/g, "")) === index
          )
          .slice(0, 5)
      : [];
    if (liveSenses.length && meaningsAlign(entry.korean, liveSenses.map((sense) => sense[1]))) {
      overrides[word] = liveSenses;
      stats.liveApiRows += 1;
      continue;
    }

    const review = reviewByWord.get(word);
    const meanings = splitReviewedMeanings(review?.naverManualMeaning);
    const isReviewed = review?.naverManualStatus === "검수완료";
    const isTrustedEntry =
      isReviewed &&
      hasTrustedEntry(review, word) &&
      trustedEntryCanStandAlone(entry, word);
    const isSemanticallyAligned = isReviewed && meaningsAlign(entry.korean, meanings);

    if (!isTrustedEntry && !isSemanticallyAligned) {
      if (meanings.length) stats.rejectedMismatch += 1;
      continue;
    }

    const senses = buildSenseRows(entry, meanings);
    if (!senses.length) continue;
    overrides[word] = senses;
    if (isTrustedEntry) stats.trustedEntryRows += 1;
    else stats.semanticallyAlignedRows += 1;
  }

  stats.overrideWords = Object.keys(overrides).length;
  stats.fallbackWords = dictionary.length - stats.overrideWords - stats.skippedExistingCurated;
  const output = [
    "(() => {",
    `  window.detailedSenseOverrides = ${JSON.stringify(overrides)};`,
    `  window.detailedSenseStats = ${JSON.stringify(stats)};`,
    "})();",
    "",
  ].join("\n");
  fs.writeFileSync(OUTPUT_FILE, output, "utf8");
  console.log(JSON.stringify({ output: OUTPUT_FILE, ...stats }, null, 2));
}

if (require.main === module) {
  main();
}

module.exports = {
  MANUAL_SENSES,
  KNOWN_FUNCTION_PARTS,
  loadDictionary,
  normalizeWord,
  parseCsv,
  splitReviewedMeanings,
  meaningsAlign,
  hasTrustedEntry,
  trustedEntryCanStandAlone,
};
