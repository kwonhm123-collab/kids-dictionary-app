const fs = require("fs");
const vm = require("vm");

const SAMPLE_SIZE = 2000;
const OUTPUT_JSON = "./outputs/dictionary-audit-2000-results.json";
const OUTPUT_MD = "./outputs/dictionary-audit-2000-report.md";

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

function isPlaceholder(entry) {
  return !entry || entry.category === "학생 3000+" || entry.korean === "어휘 뱅크 단어";
}

function splitKoreanMeanings(text) {
  return String(text)
    .split(/,|·|\/|;|\(|\)|\[|\]|~|->|:|\s{2,}/)
    .map((item) => item.trim())
    .filter((item) => /[가-힣]/.test(item))
    .filter((item) => item.length >= 2)
    .filter((item) => item !== "어휘 뱅크 단어");
}

function inspectEnglish(query) {
  const entry = context.findWord(query);
  const issue =
    !entry ? "missing" :
    isPlaceholder(entry) ? "placeholder" :
    entry.word !== query ? "wrong-match" :
    null;

  return {
    query,
    expected: query,
    actual: entry?.word ?? null,
    korean: entry?.korean ?? null,
    category: entry?.category ?? null,
    issue,
  };
}

function inspectKorean({ query, expected }) {
  const entry = context.findWord(query);
  const relatedActuals =
    entry && typeof context.getRelatedEntries === "function"
      ? context.getRelatedEntries(query, entry, 10).map((item) => item.word)
      : [];
  const candidateResolved = Boolean(entry && entry.word !== expected && relatedActuals.includes(expected));
  const issue =
    !entry ? "missing" :
    isPlaceholder(entry) ? "placeholder" :
    entry.word !== expected && !candidateResolved ? "wrong-match" :
    null;

  return {
    query,
    expected,
    actual: entry?.word ?? null,
    relatedActuals,
    candidateResolved,
    korean: entry?.korean ?? null,
    category: entry?.category ?? null,
    issue,
  };
}

function summarize(results) {
  return {
    total: results.length,
    failed: results.filter((result) => result.issue).length,
    byIssue: results.reduce((counts, result) => {
      if (result.issue) {
        counts[result.issue] = (counts[result.issue] ?? 0) + 1;
      }
      return counts;
    }, {}),
    candidateResolved: results.filter((result) => result.candidateResolved).length,
    failures: results.filter((result) => result.issue),
  };
}

function buildKoreanSample(size) {
  const seen = new Set();
  const pairs = [];
  const entries = dictionarySnapshot.filter((entry) => !isPlaceholder(entry));

  for (const entry of entries) {
    const candidates = [...entry.keywords, ...splitKoreanMeanings(entry.korean)];
    for (const query of candidates) {
      const key = query.replace(/\s+/g, " ").trim();
      if (!key || seen.has(key)) {
        continue;
      }
      seen.add(key);
      pairs.push({ query: key, expected: entry.word });
      if (pairs.length >= size) {
        return pairs;
      }
    }
  }

  return pairs;
}

const englishSample = context.window.studentVocabularyBank.slice(0, SAMPLE_SIZE);
const koreanSample = buildKoreanSample(SAMPLE_SIZE);
const englishResults = englishSample.map(inspectEnglish);
const koreanResults = koreanSample.map(inspectKorean);

const summary = {
  generatedAt: new Date().toISOString(),
  english: summarize(englishResults),
  korean: summarize(koreanResults),
};

fs.writeFileSync(
  OUTPUT_JSON,
  JSON.stringify(
    {
      ...summary,
      english: { ...summary.english, results: englishResults },
      korean: { ...summary.korean, sampleSize: koreanSample.length, results: koreanResults },
    },
    null,
    2
  )
);

const englishTopFailures = summary.english.failures.slice(0, 30);
const koreanTopFailures = summary.korean.failures.slice(0, 30);
const md = `# 2000개 확장 사전 품질 검사
검사일: ${new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}

## 범위

- 영한: vocab-bank 상위 ${SAMPLE_SIZE}개 영어 단어
- 한영: 현재 앱 사전의 한국어 키워드에서 자동 추출한 ${SAMPLE_SIZE}개 쿼리
- 검사 기준:
  - 검색 결과 없음: 실패
  - "어휘 뱅크 단어" 임시 뜻: 실패
  - 기대 단어와 다른 단어 반환: 실패
  - 단, 한영 검색에서 기대 단어가 관련 후보에 있으면 통과로 집계

## 요약

| 구분 | 검사 수 | 실패 수 | 실패율 |
|---|---:|---:|---:|
| 영한 | ${summary.english.total} | ${summary.english.failed} | ${((summary.english.failed / summary.english.total) * 100).toFixed(1)}% |
| 한영 | ${summary.korean.total} | ${summary.korean.failed} | ${((summary.korean.failed / summary.korean.total) * 100).toFixed(1)}% |

한영 관련 후보로 해결된 항목: ${summary.korean.candidateResolved}개

## 실패 유형

### 영한

\`\`\`json
${JSON.stringify(summary.english.byIssue, null, 2)}
\`\`\`

### 한영

\`\`\`json
${JSON.stringify(summary.korean.byIssue, null, 2)}
\`\`\`

## 영한 대표 실패 30개

| 입력 | 실제 결과 | 실제 뜻 | 유형 |
|---|---|---|---|
${englishTopFailures.map((item) => `| ${item.query} | ${item.actual ?? "-"} | ${item.korean ?? "-"} | ${item.issue} |`).join("\n")}

## 한영 대표 실패 30개

| 입력 | 기대 | 실제 결과 | 실제 뜻 | 유형 |
|---|---|---|---|---|
${koreanTopFailures.map((item) => `| ${item.query} | ${item.expected} | ${item.actual ?? "-"} | ${item.korean ?? "-"} | ${item.issue} |`).join("\n")}

## 전체 결과 파일

- JSON: \`outputs/dictionary-audit-2000-results.json\`
`;

fs.writeFileSync(OUTPUT_MD, md);

console.log(
  JSON.stringify(
    {
      english: {
        total: summary.english.total,
        failed: summary.english.failed,
        byIssue: summary.english.byIssue,
        topFailures: englishTopFailures,
      },
      korean: {
        total: summary.korean.total,
        failed: summary.korean.failed,
        byIssue: summary.korean.byIssue,
        candidateResolved: summary.korean.candidateResolved,
        topFailures: koreanTopFailures,
      },
      output: {
        json: OUTPUT_JSON,
        report: OUTPUT_MD,
      },
    },
    null,
    2
  )
);

if (summary.english.failed > 0 || summary.korean.failed > 0) {
  process.exitCode = 1;
}
