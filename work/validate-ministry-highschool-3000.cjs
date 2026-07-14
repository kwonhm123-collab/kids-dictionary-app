const fs = require("fs");
const vm = require("vm");

const TARGET_COUNT = 3000;
const OUTPUT_JSON = "./outputs/ministry-highschool-3000-validation.json";
const OUTPUT_CSV = "./outputs/ministry-highschool-3000-validation.csv";
const OUTPUT_MD = "./outputs/ministry-highschool-3000-validation-report.md";

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

function csvEscape(value) {
  const text = String(value ?? "");
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function loadScript(fileName, context) {
  const file = `./outputs/kids-dictionary/${fileName}`;
  if (fs.existsSync(file)) {
    vm.runInContext(fs.readFileSync(file, "utf8"), context);
  }
}

function isPlaceholder(entry) {
  return entry.korean === "어휘 뱅크 단어" || entry.korean === "고빈도 영어 보강어";
}

function isBusiness(entry) {
  return String(entry.category ?? "").includes("업무 영어");
}

const element = makeElement();
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
      return element;
    },
    querySelectorAll() {
      return [];
    },
  },
};

vm.createContext(context);
loadScript("vocab-bank.js", context);
loadScript("top1000-supplement.js", context);
loadScript("top2000-supplement.js", context);
loadScript("top2200-supplement.js", context);
loadScript("ministry3000-supplement.js", context);
loadScript("app.js", context);

const dictionary = vm.runInContext(
  `dictionary.map((entry, index) => ({
    appOrder: index + 1,
    word: entry.word,
    korean: entry.korean,
    part: entry.part,
    category: entry.category,
    level: entry.level,
    definition: entry.definition,
    hasSenses: Array.isArray(entry.senses) && entry.senses.length > 0,
    hasInflections: Boolean(entry.inflections),
    hasStructure: Boolean(entry.structure),
    exampleCount: Array.isArray(entry.examples) ? entry.examples.length : 0
  }))`,
  context
);

const level4Validation = fs.existsSync("./outputs/level4-external-validation.json")
  ? JSON.parse(fs.readFileSync("./outputs/level4-external-validation.json", "utf8"))
  : { rows: [] };
const externalByWord = new Map(level4Validation.rows.map((entry) => [entry.word.toLowerCase(), entry]));

const educationRows = dictionary
  .filter((entry) => Number(entry.level) <= 4 && !isBusiness(entry))
  .map((entry) => {
    const external = externalByWord.get(entry.word.toLowerCase());
    const found = vm.runInContext(`findWord(${JSON.stringify(entry.word)})`, context);
    const exactSearchPass = found?.word === entry.word;
    const placeholder = isPlaceholder(entry);
    const sourceStatus = external?.validationStatus ?? "not-checked";

    return {
      ...entry,
      placeholder,
      usableKoreanMeaning: !placeholder,
      exactSearchPass,
      exactSearchActual: found?.word ?? "",
      sourceStatus,
      oxfordLevels: external?.oxfordLevels ?? [],
      dictionaryApiExists: Boolean(external?.dictionaryApiExists),
      naverUrl: `https://en.dict.naver.com/#/search?query=${encodeURIComponent(entry.word)}`,
    };
  });

const first3000 = educationRows.slice(0, TARGET_COUNT);
const rows = first3000.map((entry, index) => ({
  targetOrder: index + 1,
  ...entry,
}));

const allUsableCount = educationRows.filter((entry) => entry.usableKoreanMeaning).length;
const summary = {
  generatedAt: new Date().toISOString(),
  targetLabel: "교육부 권장 고등학생까지 사용 가능 수준 3000개 기준",
  targetCount: TARGET_COUNT,
  totalEducationCandidates: educationRows.length,
  totalUsableKoreanMeaning: allUsableCount,
  shortageTo3000: Math.max(0, TARGET_COUNT - allUsableCount),
  first3000ExactSearchFailures: rows.filter((entry) => !entry.exactSearchPass).length,
  first3000UsableKoreanMeaning: rows.filter((entry) => entry.usableKoreanMeaning).length,
  first3000Placeholders: rows.filter((entry) => entry.placeholder).length,
  first3000SourceConfirmed: rows.filter((entry) => entry.sourceStatus === "auto-pass" || entry.sourceStatus === "source-found").length,
  first3000AutoPass: rows.filter((entry) => entry.sourceStatus === "auto-pass").length,
  first3000SourceFound: rows.filter((entry) => entry.sourceStatus === "source-found").length,
  first3000ManualReview: rows.filter((entry) => entry.sourceStatus === "manual-review").length,
  first3000NotChecked: rows.filter((entry) => entry.sourceStatus === "not-checked").length,
  pass3000UsableMeaning: allUsableCount >= TARGET_COUNT,
  passFirst3000ExactSearch: rows.every((entry) => entry.exactSearchPass),
};

fs.writeFileSync(OUTPUT_JSON, JSON.stringify({ summary, rows }, null, 2));

const csvColumns = [
  "targetOrder",
  "appOrder",
  "word",
  "korean",
  "part",
  "category",
  "level",
  "placeholder",
  "usableKoreanMeaning",
  "exactSearchPass",
  "exactSearchActual",
  "sourceStatus",
  "oxfordLevels",
  "dictionaryApiExists",
  "hasStructure",
  "exampleCount",
  "naverUrl",
  "definition",
];

const csv = [
  csvColumns.join(","),
  ...rows.map((entry) =>
    csvColumns
      .map((column) => csvEscape(Array.isArray(entry[column]) ? entry[column].join("|") : entry[column]))
      .join(",")
  ),
].join("\n");
fs.writeFileSync(OUTPUT_CSV, csv);

const placeholderSamples = rows
  .filter((entry) => entry.placeholder)
  .slice(0, 80)
  .map((entry) => `| ${entry.targetOrder} | ${entry.word} | ${entry.category} | ${entry.level} | ${entry.sourceStatus} |`)
  .join("\n");

const md = `# 교육부 권장 고등학생까지 3000개 기준 검증

생성 시각: ${new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}

## 판정 기준

- 대상: 앱 내부 레벨 1~4 중 업무용 단어를 제외한 교육용 후보
- 목표: 고등학생까지 사용할 최소 3000개 수준
- 통과 조건 1: 3000개 이상이 정확 검색 가능
- 통과 조건 2: 3000개 이상이 "어휘 뱅크 단어" 임시 설명이 아니라 실제 한국어 뜻을 가져야 함
- 외부 기준: 기존 Level 4 검증표의 Oxford 3000/5000 및 Free Dictionary API 결과
- 한국어 뜻 최종 기준: 네이버 영어사전 수동 검수

## 요약

| 항목 | 결과 |
|---|---:|
| 교육용 후보 전체 | ${summary.totalEducationCandidates} |
| 실제 한국어 뜻 보유 | ${summary.totalUsableKoreanMeaning} |
| 3000개 기준 부족분 | ${summary.shortageTo3000} |
| 3000개 사용 가능 뜻 기준 통과 | ${summary.pass3000UsableMeaning ? "통과" : "미통과"} |
| 첫 3000개 정확 검색 실패 | ${summary.first3000ExactSearchFailures} |
| 첫 3000개 정확 검색 기준 통과 | ${summary.passFirst3000ExactSearch ? "통과" : "미통과"} |
| 첫 3000개 중 실제 한국어 뜻 | ${summary.first3000UsableKoreanMeaning} |
| 첫 3000개 중 임시 뜻 | ${summary.first3000Placeholders} |
| 첫 3000개 중 외부 출처 확인 | ${summary.first3000SourceConfirmed} |
| 첫 3000개 중 자동 통과 | ${summary.first3000AutoPass} |
| 첫 3000개 중 출처 확인됨 | ${summary.first3000SourceFound} |
| 첫 3000개 중 수동 확인 필요 | ${summary.first3000ManualReview} |

## 결론

- 검색 기능 기준으로는 첫 3000개 정확 검색 실패가 ${summary.first3000ExactSearchFailures}개이므로 ${summary.passFirst3000ExactSearch ? "통과" : "미통과"}입니다.
- 사전 품질 기준으로는 실제 한국어 뜻 보유 단어가 ${summary.totalUsableKoreanMeaning}개라서 3000개 기준에 ${summary.shortageTo3000}개 부족합니다.
- 따라서 현재 버전은 "검색 가능 단어 수"는 충분하지만, "교육부 권장 고등학생까지 사전답게 사용할 3000개" 기준은 아직 미완료입니다.

## 첫 3000개 내 임시 뜻 샘플

| 순번 | 단어 | 카테고리 | 레벨 | 외부 검증 상태 |
|---:|---|---|---:|---|
${placeholderSamples || "| - | - | - | - | - |"}

## 산출물

- JSON: \`outputs/ministry-highschool-3000-validation.json\`
- CSV: \`outputs/ministry-highschool-3000-validation.csv\`
`;

fs.writeFileSync(OUTPUT_MD, md);
console.log(JSON.stringify(summary, null, 2));
