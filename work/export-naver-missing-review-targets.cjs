const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = process.cwd();
const REVIEW_CSV = path.join(ROOT, "outputs", "naver-manual-review-all.csv");
const OUTPUT_CSV = path.join(ROOT, "outputs", "naver-missing-review-targets.csv");
const OUTPUT_JSON = path.join(ROOT, "outputs", "naver-missing-review-targets.json");
const OUTPUT_MD = path.join(ROOT, "outputs", "naver-missing-review-targets-report.md");
const OUTPUT_BATCH_DIR = path.join(ROOT, "outputs", "naver-missing-review-targets-batches");
const BATCH_SIZE = 200;

function makeElement() {
  return {
    dataset: {},
    value: "",
    innerHTML: "",
    textContent: "",
    hidden: true,
    classList: { add() {}, remove() {}, toggle() {} },
    addEventListener() {},
    focus() {},
    querySelector() {
      return null;
    },
    querySelectorAll() {
      return [];
    },
  };
}

function loadDictionary() {
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
    navigator: { serviceWorker: {} },
    window: {
      studentVocabularyBank: [],
      speechSynthesis: { cancel() {}, speak() {}, getVoices: () => [] },
      addEventListener() {},
      excludedDictionaryWords: [],
      verifiedMeaningOverrides: {},
      manualDictionaryAdditions: [],
    },
    document: {
      querySelector() {
        return makeElement();
      },
      querySelectorAll() {
        return [];
      },
      addEventListener() {},
    },
  };

  vm.createContext(context);

  const sourceFiles = [
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
    "manual-excluded-words.js",
    "app.js",
  ];

  for (const fileName of sourceFiles) {
    const file = path.join(ROOT, "outputs", "kids-dictionary", fileName);
    vm.runInContext(fs.readFileSync(file, "utf8"), context);
  }

  return vm.runInContext("dictionary", context);
}

function csvEscape(value) {
  const text = String(value ?? "");
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function writeCsv(file, columns, rows) {
  const csv = [
    columns.join(","),
    ...rows.map((row) =>
      columns
        .map((column) => csvEscape(Array.isArray(row[column]) ? row[column].join("|") : row[column]))
        .join(",")
    ),
  ].join("\n");
  fs.writeFileSync(file, csv, "utf8");
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

function classifyAudience(entry) {
  if (String(entry.category || "").includes("업무")) {
    return "business";
  }
  if (Number(entry.level || 0) <= 2 || String(entry.category || "").includes("기본")) {
    return "elementary-candidate";
  }
  if (Number(entry.level || 0) === 3) {
    return "middle-high-candidate";
  }
  return "advanced-or-bank";
}

function ensureCleanDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const target = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      fs.rmSync(target, { recursive: true, force: true });
    } else {
      fs.unlinkSync(target);
    }
  }
}

if (!fs.existsSync(REVIEW_CSV)) {
  throw new Error(`Missing ${REVIEW_CSV}`);
}

const dictionary = loadDictionary();
const reviewedRows = parseCsv(fs.readFileSync(REVIEW_CSV, "utf8").replace(/^\uFEFF/, ""));
const reviewedWords = new Set(reviewedRows.map((row) => String(row.word || "").trim().toLowerCase()).filter(Boolean));

const missingRows = dictionary
  .filter((entry) => !reviewedWords.has(String(entry.word || "").trim().toLowerCase()))
  .map((entry, index) => ({
    sequence: index + 1,
    educationPriority: 999999,
    appIndex: dictionary.findIndex((item) => item.word === entry.word) + 1,
    word: entry.word,
    appKorean: entry.korean,
    appPart: entry.part,
    appCategory: entry.category,
    appLevel: entry.level,
    appAudience: classifyAudience(entry),
    hasSenses: Boolean(entry.senses?.length),
    hasInflections: Boolean(entry.inflections),
    hasStructure: Boolean(entry.structure),
    exampleCount: Array.isArray(entry.examples) ? entry.examples.length : 0,
    autoValidationStatus: "missing-from-master-review",
    dictionaryApiExists: false,
    oxfordLevels: "",
    naverUrl: `https://en.dict.naver.com/#/search?query=${encodeURIComponent(entry.word)}`,
    naverManualStatus: "대기",
    naverManualMeaning: "",
    naverDecision: "",
    reviewerMemo: "기존 네이버 검수 마스터 CSV 누락 항목",
    definition: entry.definition ?? "",
    keywords: Array.isArray(entry.keywords) ? entry.keywords : [],
  }));

const columns = [
  "sequence",
  "educationPriority",
  "appIndex",
  "word",
  "appKorean",
  "appPart",
  "appCategory",
  "appLevel",
  "appAudience",
  "hasSenses",
  "hasInflections",
  "hasStructure",
  "exampleCount",
  "autoValidationStatus",
  "dictionaryApiExists",
  "oxfordLevels",
  "naverUrl",
  "naverManualStatus",
  "naverManualMeaning",
  "naverDecision",
  "reviewerMemo",
  "definition",
  "keywords",
];

writeCsv(OUTPUT_CSV, columns, missingRows);

ensureCleanDir(OUTPUT_BATCH_DIR);
const batchFiles = [];
for (let start = 0; start < missingRows.length; start += BATCH_SIZE) {
  const batchRows = missingRows.slice(start, start + BATCH_SIZE);
  const batchNo = Math.floor(start / BATCH_SIZE) + 1;
  const fileName = `naver-missing-review-batch-${String(batchNo).padStart(2, "0")}.csv`;
  writeCsv(path.join(OUTPUT_BATCH_DIR, fileName), columns, batchRows);
  batchFiles.push({
    batchNo,
    from: batchRows[0]?.sequence ?? 0,
    to: batchRows[batchRows.length - 1]?.sequence ?? 0,
    count: batchRows.length,
    fileName,
  });
}

const summary = {
  generatedAt: new Date().toISOString(),
  dictionaryTotal: dictionary.length,
  masterReviewRows: reviewedRows.length,
  uniqueReviewedWords: reviewedWords.size,
  missingCount: missingRows.length,
  duplicateGap: reviewedRows.length - reviewedWords.size,
  byLevel: missingRows.reduce((counts, row) => {
    counts[row.appLevel] = (counts[row.appLevel] ?? 0) + 1;
    return counts;
  }, {}),
  byAudience: missingRows.reduce((counts, row) => {
    counts[row.appAudience] = (counts[row.appAudience] ?? 0) + 1;
    return counts;
  }, {}),
  batchCount: batchFiles.length,
};

fs.writeFileSync(
  OUTPUT_JSON,
  JSON.stringify(
    {
      summary,
      batchFiles,
      rows: missingRows,
    },
    null,
    2
  ),
  "utf8"
);

const sampleLines = missingRows
  .slice(0, 40)
  .map(
    (row) =>
      `| ${row.sequence} | ${row.word} | ${row.appKorean} | ${row.appPart} | ${row.appLevel} | ${row.appCategory} |`
  )
  .join("\n");

const batchLines = batchFiles
  .map((batch) => `| ${batch.batchNo} | ${batch.from} | ${batch.to} | ${batch.count} | ${batch.fileName} |`)
  .join("\n");

const md = `# 네이버 미검수 누락 단어 목록
생성 시각: ${new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}

## 요약

| 항목 | 값 |
|---|---:|
| 현재 앱 단어 수 | ${summary.dictionaryTotal} |
| 기존 검수표 행 수 | ${summary.masterReviewRows} |
| 기존 검수표 고유 단어 수 | ${summary.uniqueReviewedWords} |
| 기존 검수표 중복 차이 | ${summary.duplicateGap} |
| 검수표 누락 단어 수 | ${summary.missingCount} |
| 분할 배치 수 | ${summary.batchCount} |

## 분할 배치

| 배치 | 시작 | 끝 | 개수 | 파일 |
|---:|---:|---:|---:|---|
${batchLines}

## 누락 샘플

| 순서 | 단어 | 앱 뜻 | 품사 | 레벨 | 카테고리 |
|---:|---|---|---|---:|---|
${sampleLines}
`;

fs.writeFileSync(OUTPUT_MD, md, "utf8");

console.log(
  JSON.stringify(
    {
      summary,
      outputs: {
        csv: OUTPUT_CSV,
        json: OUTPUT_JSON,
        report: OUTPUT_MD,
        batchDir: OUTPUT_BATCH_DIR,
      },
    },
    null,
    2
  )
);
