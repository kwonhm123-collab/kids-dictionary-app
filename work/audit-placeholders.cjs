const fs = require("fs");
const vm = require("vm");

const OUTPUT_JSON = "./outputs/dictionary-placeholder-audit-results.json";
const OUTPUT_MD = "./outputs/dictionary-placeholder-audit-report.md";

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

vm.createContext(context);
vm.runInContext(fs.readFileSync("./outputs/kids-dictionary/vocab-bank.js", "utf8"), context);
vm.runInContext(fs.readFileSync("./outputs/kids-dictionary/top1000-supplement.js", "utf8"), context);
vm.runInContext(fs.readFileSync("./outputs/kids-dictionary/top2000-supplement.js", "utf8"), context);
vm.runInContext(fs.readFileSync("./outputs/kids-dictionary/top2200-supplement.js", "utf8"), context);
vm.runInContext(fs.readFileSync("./outputs/kids-dictionary/ministry3000-supplement.js", "utf8"), context);
vm.runInContext(fs.readFileSync("./outputs/kids-dictionary/app.js", "utf8"), context);

const dictionarySnapshot = vm.runInContext(
  `dictionary.map((entry) => ({
    word: entry.word,
    korean: entry.korean,
    part: entry.part,
    category: entry.category,
    keywords: entry.keywords ?? []
  }))`,
  context
);

const knownWords = new Set(dictionarySnapshot.map((entry) => entry.word));
const bankRank = new Map(context.window.studentVocabularyBank.map((word, index) => [word, index + 1]));

function hasWord(word) {
  return knownWords.has(word);
}

function classifyWord(word) {
  if (/^\d+$/.test(word)) {
    return "number";
  }
  if (word.length <= 3) {
    return "short-or-abbreviation";
  }
  if (word.endsWith("ies") && hasWord(`${word.slice(0, -3)}y`)) {
    return "plural";
  }
  if (word.endsWith("s") && hasWord(word.slice(0, -1))) {
    return "plural";
  }
  if (word.endsWith("ing") && (hasWord(word.slice(0, -3)) || hasWord(`${word.slice(0, -3)}e`))) {
    return "verb-ing";
  }
  if (word.endsWith("ed") && (hasWord(word.slice(0, -2)) || hasWord(`${word.slice(0, -1)}`))) {
    return "verb-ed";
  }
  if (word.endsWith("ly")) {
    return "adverb-like";
  }
  if (word.endsWith("er") && hasWord(word.slice(0, -2))) {
    return "comparative-or-agent";
  }
  if (word.endsWith("est") && hasWord(word.slice(0, -3))) {
    return "superlative";
  }
  if (word.endsWith("tion") || word.endsWith("sion") || word.endsWith("ment") || word.endsWith("ness")) {
    return "noun-suffix";
  }
  if (word.endsWith("al") || word.endsWith("ive") || word.endsWith("ous") || word.endsWith("ic")) {
    return "adjective-suffix";
  }
  return "base-or-uncategorized";
}

function inspectPlaceholder(entry) {
  const result = context.findWord(entry.word);
  return {
    rank: bankRank.get(entry.word) ?? null,
    word: entry.word,
    searchActual: result?.word ?? null,
    exactSearchPass: result?.word === entry.word,
    korean: entry.korean,
    category: entry.category,
    class: classifyWord(entry.word),
    issue: "placeholder-meaning",
  };
}

const placeholders = dictionarySnapshot
  .filter((entry) => entry.category === "학생 3000+" && entry.korean === "어휘 뱅크 단어")
  .map(inspectPlaceholder)
  .sort((left, right) => (left.rank ?? 999999) - (right.rank ?? 999999));

const exactSearchFailures = placeholders.filter((entry) => !entry.exactSearchPass);
const byClass = placeholders.reduce((counts, entry) => {
  counts[entry.class] = (counts[entry.class] ?? 0) + 1;
  return counts;
}, {});

const summary = {
  generatedAt: new Date().toISOString(),
  totalPlaceholders: placeholders.length,
  exactSearchFailures: exactSearchFailures.length,
  byClass,
  firstRank: placeholders[0]?.rank ?? null,
  lastRank: placeholders.at(-1)?.rank ?? null,
};

fs.writeFileSync(
  OUTPUT_JSON,
  JSON.stringify(
    {
      summary,
      samples: {
        first100: placeholders.slice(0, 100),
        exactSearchFailures: exactSearchFailures.slice(0, 100),
      },
      placeholders,
    },
    null,
    2
  )
);

const classRows = Object.entries(byClass)
  .sort((left, right) => right[1] - left[1])
  .map(([name, count]) => `| ${name} | ${count} |`)
  .join("\n");

const firstRows = placeholders
  .slice(0, 100)
  .map((item) => `| ${item.rank ?? "-"} | ${item.word} | ${item.class} | ${item.searchActual ?? "-"} | ${item.exactSearchPass ? "통과" : "실패"} |`)
  .join("\n");

const searchFailureRows = exactSearchFailures
  .slice(0, 100)
  .map((item) => `| ${item.rank ?? "-"} | ${item.word} | ${item.searchActual ?? "-"} | ${item.class} |`)
  .join("\n");

const md = `# 임시 항목 5683개 품질 검증
검사일: ${new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}

## 기준

- 대상: category가 \`학생 3000+\`이고 뜻이 \`어휘 뱅크 단어\`인 항목
- 품질 판정: 임시 뜻이므로 모두 개별 뜻 보강 필요
- 별도 확인: 영어 단어를 그대로 검색했을 때 같은 단어가 반환되는지 검사

## 요약

| 항목 | 값 |
|---|---:|
| 임시 뜻 항목 수 | ${summary.totalPlaceholders} |
| 영어 정확 검색 실패 | ${summary.exactSearchFailures} |
| 첫 임시 항목 vocab-bank 순위 | ${summary.firstRank ?? "-"} |
| 마지막 임시 항목 vocab-bank 순위 | ${summary.lastRank ?? "-"} |

## 형태별 분류

| 분류 | 개수 |
|---|---:|
${classRows}

## 우선 보강 대상 100개

| 순위 | 단어 | 분류 | 검색 결과 | 정확 검색 |
|---:|---|---|---|---|
${firstRows}

## 영어 정확 검색 실패 목록

| 순위 | 단어 | 검색 결과 | 분류 |
|---:|---|---|---|
${searchFailureRows || "| - | 없음 | - | - |"}

## 전체 결과 파일

- JSON: \`outputs/dictionary-placeholder-audit-results.json\`
`;

fs.writeFileSync(OUTPUT_MD, md);

console.log(
  JSON.stringify(
    {
      summary,
      outputs: {
        json: OUTPUT_JSON,
        report: OUTPUT_MD,
      },
    },
    null,
    2
  )
);
