const fs = require("fs");
const vm = require("vm");

const OUTPUT_JSON = "./outputs/remaining-bank-completion-validation.json";
const OUTPUT_MD = "./outputs/remaining-bank-completion-validation-report.md";

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

function loadScript(fileName, context) {
  vm.runInContext(fs.readFileSync(`./outputs/kids-dictionary/${fileName}`, "utf8"), context);
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
for (const fileName of [
  "vocab-bank.js",
  "top1000-supplement.js",
  "top2000-supplement.js",
  "top2200-supplement.js",
  "ministry3000-supplement.js",
  "app.js",
]) {
  loadScript(fileName, context);
}

const rows = vm.runInContext(
  `dictionary.map((entry, index) => ({
    index: index + 1,
    word: entry.word,
    korean: entry.korean,
    part: entry.part,
    category: entry.category,
    level: entry.level,
    definition: entry.definition,
    exampleCount: Array.isArray(entry.examples) ? entry.examples.length : 0
  }))`,
  context
);

const autoBankRows = rows.filter((entry) => entry.category === "어휘 뱅크 자동 보강");
const placeholderRows = rows.filter((entry) => entry.korean === "어휘 뱅크 단어");
const searchResults = autoBankRows.map((entry) => {
  const found = vm.runInContext(`findWord(${JSON.stringify(entry.word)})`, context);
  return {
    word: entry.word,
    korean: entry.korean,
    part: entry.part,
    actual: found?.word ?? "",
    pass: found?.word === entry.word,
  };
});
const failed = searchResults.filter((entry) => !entry.pass);
const dental = searchResults.find((entry) => entry.word === "dental");
const sampleWords = ["dental", "arms", "tea", "trees", "improved", "subscription", "dealer", "happen", "sky"];
const samples = sampleWords.map((word) => {
  const found = vm.runInContext(`findWord(${JSON.stringify(word)})`, context);
  return {
    query: word,
    word: found?.word ?? "",
    korean: found?.korean ?? "",
    part: found?.part ?? "",
    category: found?.category ?? "",
  };
});

const summary = {
  generatedAt: new Date().toISOString(),
  totalWords: rows.length,
  autoBankSupplemented: autoBankRows.length,
  placeholderMeanings: placeholderRows.length,
  autoBankExactSearchFailures: failed.length,
  dentalPass: dental?.pass === true && dental.korean.includes("치"),
  pass: autoBankRows.length === 4918 && placeholderRows.length === 0 && failed.length === 0,
};

fs.writeFileSync(OUTPUT_JSON, JSON.stringify({ summary, samples, failed }, null, 2));

const sampleRows = samples
  .map((entry) => `| ${entry.query} | ${entry.word} | ${entry.korean} | ${entry.part} | ${entry.category} |`)
  .join("\n");

const md = `# 남은 어휘 뱅크 4918개 사용 가능 검증

생성 시각: ${new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}

## 요약

| 항목 | 결과 |
|---|---:|
| 전체 앱 단어 | ${summary.totalWords} |
| 어휘 뱅크 자동 보강 | ${summary.autoBankSupplemented} |
| 남은 "어휘 뱅크 단어" 임시 뜻 | ${summary.placeholderMeanings} |
| 자동 보강 4918개 정확 검색 실패 | ${summary.autoBankExactSearchFailures} |
| dental 검색/뜻 확인 | ${summary.dentalPass ? "통과" : "미통과"} |
| 전체 판정 | ${summary.pass ? "통과" : "미통과"} |

## 대표 검색 확인

| 검색어 | 결과 단어 | 뜻 | 품사 | 카테고리 |
|---|---|---|---|---|
${sampleRows}

## 참고

- 자동 보강 항목은 앱에서 더 이상 "어휘 뱅크 단어"로 표시되지 않습니다.
- 일부 뒤쪽 어휘는 자동 파생/기본 보강 뜻이며, 네이버 영어사전 기준의 정밀 수동 검수는 별도 후속 작업으로 남습니다.
`;

fs.writeFileSync(OUTPUT_MD, md);
console.log(JSON.stringify(summary, null, 2));
