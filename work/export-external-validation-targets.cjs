const fs = require("fs");
const vm = require("vm");

const OUTPUT_JSON = "./outputs/external-validation-targets.json";
const OUTPUT_CSV = "./outputs/external-validation-targets.csv";
const OUTPUT_MD = "./outputs/external-validation-targets-report.md";

function makeElement() {
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
    querySelectorAll() {
      return [];
    },
  };
}

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
    top1000SupplementMeanings: {},
    speechSynthesis: { cancel() {}, speak() {}, getVoices: () => [] },
    addEventListener() {},
  },
  document: {
    querySelector() {
      return makeElement();
    },
    querySelectorAll() {
      return [];
    },
  },
};

function loadScript(fileName) {
  const path = `./outputs/kids-dictionary/${fileName}`;
  if (fs.existsSync(path)) {
    vm.runInContext(fs.readFileSync(path, "utf8"), context);
  }
}

function csvEscape(value) {
  const text = String(value ?? "");
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function classifyAudience(entry) {
  if (entry.category.includes("업무")) {
    return "business";
  }
  if (entry.level <= 2 || entry.category.includes("기본")) {
    return "elementary-candidate";
  }
  if (entry.level === 3) {
    return "middle-high-candidate";
  }
  return "advanced-or-bank";
}

function needsExternalValidation(entry) {
  if (entry.korean === "어휘 뱅크 단어") {
    return true;
  }
  if (entry.korean === "고빈도 영어 보강어") {
    return true;
  }
  if (entry.category.includes("보강")) {
    return true;
  }
  return true;
}

vm.createContext(context);
loadScript("vocab-bank.js");
loadScript("top1000-supplement.js");
loadScript("top2000-supplement.js");
loadScript("top2200-supplement.js");
loadScript("ministry3000-supplement.js");
loadScript("app.js");

const rows = vm.runInContext(
  `dictionary.map((entry, index) => ({
    index: index + 1,
    word: entry.word,
    korean: entry.korean,
    part: entry.part,
    category: entry.category,
    level: entry.level,
    definition: entry.definition,
    keywords: entry.keywords ?? [],
    hasSenses: Array.isArray(entry.senses) && entry.senses.length > 0,
    hasInflections: Boolean(entry.inflections),
    hasStructure: Boolean(entry.structure),
    exampleCount: Array.isArray(entry.examples) ? entry.examples.length : 0
  }))`,
  context
).map((entry) => ({
  ...entry,
  audience: classifyAudience(entry),
  needsExternalValidation: needsExternalValidation(entry),
  placeholder: entry.korean === "어휘 뱅크 단어" || entry.korean === "고빈도 영어 보강어",
}));

const summary = {
  generatedAt: new Date().toISOString(),
  total: rows.length,
  needsExternalValidation: rows.filter((entry) => entry.needsExternalValidation).length,
  placeholders: rows.filter((entry) => entry.placeholder).length,
  byAudience: rows.reduce((counts, entry) => {
    counts[entry.audience] = (counts[entry.audience] ?? 0) + 1;
    return counts;
  }, {}),
  byCategory: rows.reduce((counts, entry) => {
    counts[entry.category] = (counts[entry.category] ?? 0) + 1;
    return counts;
  }, {}),
};

fs.writeFileSync(OUTPUT_JSON, JSON.stringify({ summary, rows }, null, 2));

const csvHeader = [
  "index",
  "word",
  "korean",
  "part",
  "category",
  "level",
  "audience",
  "placeholder",
  "needsExternalValidation",
  "hasSenses",
  "hasInflections",
  "hasStructure",
  "exampleCount",
  "definition",
  "keywords",
];

const csv = [
  csvHeader.join(","),
  ...rows.map((entry) =>
    csvHeader
      .map((key) => csvEscape(Array.isArray(entry[key]) ? entry[key].join("|") : entry[key]))
      .join(",")
  ),
].join("\n");

fs.writeFileSync(OUTPUT_CSV, csv);

const audienceRows = Object.entries(summary.byAudience)
  .sort((left, right) => right[1] - left[1])
  .map(([name, count]) => `| ${name} | ${count} |`)
  .join("\n");

const categoryRows = Object.entries(summary.byCategory)
  .sort((left, right) => right[1] - left[1])
  .slice(0, 30)
  .map(([name, count]) => `| ${name} | ${count} |`)
  .join("\n");

const firstRows = rows
  .filter((entry) => entry.needsExternalValidation)
  .slice(0, 100)
  .map((entry) => `| ${entry.index} | ${entry.word} | ${entry.korean} | ${entry.part} | ${entry.category} | ${entry.audience} |`)
  .join("\n");

const md = `# 외부 사전 검증 대상 목록
생성일: ${new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}

## 요약

| 항목 | 값 |
|---|---:|
| 전체 앱 단어 수 | ${summary.total} |
| 외부 검증 필요 단어 수 | ${summary.needsExternalValidation} |
| 임시 뜻 항목 수 | ${summary.placeholders} |

## 대상 사용자 후보별 분류

| 분류 | 개수 |
|---|---:|
${audienceRows}

## 카테고리 상위 30개

| 카테고리 | 개수 |
|---|---:|
${categoryRows}

## 우선 검증 대상 100개

| 번호 | 단어 | 앱 뜻 | 품사 | 카테고리 | 대상 후보 |
|---:|---|---|---|---|---|
${firstRows}

## 산출물

- JSON: \`outputs/external-validation-targets.json\`
- CSV: \`outputs/external-validation-targets.csv\`
`;

fs.writeFileSync(OUTPUT_MD, md);

console.log(
  JSON.stringify(
    {
      summary,
      outputs: {
        json: OUTPUT_JSON,
        csv: OUTPUT_CSV,
        report: OUTPUT_MD,
      },
    },
    null,
    2
  )
);
