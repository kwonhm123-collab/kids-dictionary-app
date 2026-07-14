const fs = require("fs");
const vm = require("vm");

const elements = new Map();

function makeElement() {
  return {
    dataset: {},
    value: "",
    innerHTML: "",
    textContent: "",
    classList: { add() {}, remove() {}, toggle() {} },
    addEventListener() {},
  };
}

function getElement(selector) {
  if (!elements.has(selector)) {
    elements.set(selector, makeElement());
  }
  return elements.get(selector);
}

const vocabCode = fs.existsSync("./outputs/kids-dictionary/vocab-bank.js")
  ? fs.readFileSync("./outputs/kids-dictionary/vocab-bank.js", "utf8")
  : "window.studentVocabularyBank = [];";
const supplementCode = fs.existsSync("./outputs/kids-dictionary/top1000-supplement.js")
  ? fs.readFileSync("./outputs/kids-dictionary/top1000-supplement.js", "utf8")
  : "window.top1000SupplementMeanings = {};";
const supplement2000Code = fs.existsSync("./outputs/kids-dictionary/top2000-supplement.js")
  ? fs.readFileSync("./outputs/kids-dictionary/top2000-supplement.js", "utf8")
  : "";
const supplement2200Code = fs.existsSync("./outputs/kids-dictionary/top2200-supplement.js")
  ? fs.readFileSync("./outputs/kids-dictionary/top2200-supplement.js", "utf8")
  : "";
const ministry3000SupplementCode = fs.existsSync("./outputs/kids-dictionary/ministry3000-supplement.js")
  ? fs.readFileSync("./outputs/kids-dictionary/ministry3000-supplement.js", "utf8")
  : "";

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
    speechSynthesis: { cancel() {}, speak() {}, getVoices: () => [] },
    addEventListener() {},
  },
  document: {
    querySelector(selector) {
      return getElement(selector);
    },
    querySelectorAll() {
      return [];
    },
  },
};

vm.createContext(context);
vm.runInContext(vocabCode, context);
vm.runInContext(supplementCode, context);
vm.runInContext(supplement2000Code, context);
vm.runInContext(supplement2200Code, context);
vm.runInContext(ministry3000SupplementCode, context);
vm.runInContext(fs.readFileSync("./outputs/kids-dictionary/app.js", "utf8"), context);

const cases = [
  ["학교", "school", "한영 기본어"],
  ["책", "book", "한영 기본어"],
  ["사람", "person", "한영 기본어"],
  ["사람들", "people", "한영 기본어"],
  ["직원", "employee", "한영 업무어"],
  ["회의", "meeting", "한영 업무어"],
  ["회의 안건", "agenda", "한영 업무어"],
  ["회의록", "minutes", "한영 업무어"],
  ["마감일", "deadline", "한영 업무어"],
  ["산출물", "deliverable", "한영 업무어"],
  ["계약", "contract", "한영 업무어"],
  ["청구서", "invoice", "한영 업무어"],
  ["매출", "revenue", "한영 업무어"],
  ["고객", "customer", "한영 업무어"],
  ["보안", "security", "한영 업무어"],
  ["채용하다", "recruit", "한영 업무어"],
  ["접근", "access", "한영 고등어"],
  ["나타나다", "appear", "한영 고등어"],
  ["세계", "world", "한영 기본어"],
  ["시간", "time", "한영 기본어"],
  ["회사", "company", "한영 기본어"],
  ["컴퓨터", "computer", "한영 기본어"],
  ["금", "gold", "한영 기본어"],
  ["금색", "gold", "한영 기본어"],
  ["황금", "gold", "한영 기본어"],
  ["금빛", "golden", "한영 기본어"],
  ["황금빛", "golden", "한영 기본어"],
  ["황금색", "golden", "한영 기본어"],
  ["apple", "apple", "영한 기본어"],
  ["school", "school", "영한 기본어"],
  ["person", "person", "영한 기본어"],
  ["run", "run", "영한 다의어"],
  ["world", "world", "영한 기본어"],
  ["time", "time", "영한 기본어"],
  ["year", "year", "영한 기본어"],
  ["day", "day", "영한 기본어"],
  ["work", "work", "영한 기본어"],
  ["company", "company", "영한 기본어"],
  ["business", "business", "영한 기본어"],
  ["life", "life", "영한 기본어"],
  ["place", "place", "영한 기본어"],
  ["case", "case", "영한 기본어"],
  ["government", "government", "영한 기본어"],
  ["gold", "gold", "영한 기본어"],
  ["golden", "golden", "영한 기본어"],
  ["appear", "appear", "영한 고등어"],
  ["disappear", "disappear", "영한 구조어"],
  ["deadline", "deadline", "영한 업무어"],
  ["invoice", "invoice", "영한 업무어"],
  ["analytics", "analytics", "영한 업무어"],
  ["computer", "computer", "영한 기본어"],
  ["neighbor", "neighbor", "영한 기본어"],
  ["neighbors", "neighbors", "영한 기본어"],
  ["neighbour", "neighbour", "영한 영국식 철자"],
  ["neighborhood", "neighborhood", "영한 기본어"],
  ["\uc774\uc6c3", "neighbor", "한영 기본어"],
  ["\ub3d9\ub124", "neighborhood", "한영 기본어"],
  [" SCHOOL ", "school", "영한 공백/대소문자"],
  ["Apple", "apple", "영한 공백/대소문자"],
  ["책상", "desk", "한영 기본어"],
  ["선생님", "teacher", "한영 기본어"],
  ["친구", "friend", "한영 기본어"],
  ["가족", "family", "한영 기본어"],
  ["달리다", "run", "한영 기본어"],
  ["먹다", "eat", "한영 기본어"],
  ["빨간색", "red", "한영 기본어"],
  ["파란색", "blue", "한영 기본어"],
  ["마감", "deadline", "한영 부분 검색"],
  ["견적서", "quotation", "한영 업무어"],
  ["영수증", "receipt", "한영 업무어"],
  ["예산", "budget", "한영 업무어"],
  ["자산", "asset", "한영 업무어"],
  ["계약서", "contract", "한영 업무어"],
  ["조항", "clause", "한영 업무어"],
  ["공급업체", "vendor", "한영 업무어"],
  ["배송", "shipment", "한영 업무어"],
  ["대시보드", "dashboard", "한영 업무어"],
  ["지표", "metric", "한영 업무어"],
  ["성과", "performance", "한영 업무어"],
  ["우선순위", "priority", "한영 업무어"],
  ["문제", "problem", "한영 기본어"],
  ["위험", "risk", "한영 업무어"],
  ["협업하다", "collaborate", "한영 업무어"],
  ["일정", "schedule", "한영 업무어"],
  ["취소하다", "cancel", "한영 업무어"],
  ["확인하다", "confirm", "한영 업무어"],
  ["해결하다", "resolve", "한영 업무어"],
  ["배포하다", "deploy", "한영 업무어"],
  ["데이터베이스", "database", "한영 업무어"],
  ["권한", "permission", "한영 업무어"],
  ["인증", "authentication", "한영 업무어"],
  ["자동화", "automation", "한영 업무어"],
  ["면접", "interview", "한영 업무어"],
  ["휴가", "leave", "한영 업무어"],
  ["본사", "headquarters", "한영 업무어"],
  ["전략", "strategy", "한영 업무어"],
  ["갈등", "conflict", "한영 업무어"],
  ["저작권", "copyright", "한영 업무어"],
  ["settlement", "settlement", "영한 업무어"],
  ["authorization", "authorization", "영한 업무어"],
  ["infrastructure", "infrastructure", "영한 업무어"],
  ["recommendation", "recommendation", "영한 업무어"],
  ["technology", "technology", "영한 고등어"],
  ["environment", "environment", "영한 고등어"],
  ["responsible", "responsible", "영한 업무어"],
];

const results = cases.map(([query, expected, group]) => {
  const actual = context.findWord(query)?.word ?? null;
  return { group, query, expected, actual, pass: actual === expected };
});

const failed = results.filter((result) => !result.pass);
const autocompleteCases = [
  ["a", "apple"],
  ["ap", "apple"],
  ["app", "apple"],
  ["appe", "appear"],
  ["dea", "deadline"],
  ["inv", "invoice"],
  ["sch", "school"],
];
const autocompleteResults = autocompleteCases.map(([query, expected]) => {
  const words = context.getAutocompleteWords(query).map((entry) => entry.word);
  return { query, expected, words: words.slice(0, 5), pass: words.includes(expected) };
});
const autocompleteFailed = autocompleteResults.filter((result) => !result.pass);
const runEntry = context.findWord("run");
const senseChecks = [
  {
    name: "run 뜻 목록 5개",
    pass: Array.isArray(runEntry?.senses) && runEntry.senses.length === 5,
  },
  {
    name: "run 품사별 뜻 포함",
    pass:
      runEntry?.senses?.some((sense) => sense.part === "동사" && sense.meaning.includes("달리다")) &&
      runEntry?.senses?.some((sense) => sense.part === "명사" && sense.meaning.includes("운행")),
  },
  {
    name: "run 동사 변화형",
    pass:
      JSON.stringify(runEntry?.inflections?.items) ===
      JSON.stringify([
        ["3인칭 단수 현재", "runs"],
        ["과거형", "ran"],
        ["과거 분사", "run"],
        ["현재 분사", "running"],
      ]),
  },
];
const senseFailed = senseChecks.filter((result) => !result.pass);
const qualityWords = ["world", "time", "year", "day", "work", "company", "business", "life", "place", "case", "government", "computer", "gold", "golden"];
const qualityResults = qualityWords.map((word) => {
  const entry = context.findWord(word);
  const hasRealMeaning =
    entry &&
    entry.category !== "학생 3000+" &&
    entry.korean !== "어휘 뱅크 단어" &&
    !entry.definition.includes("정확한 한국어 뜻은 온라인 사전 확장 데이터");
  return {
    word,
    korean: entry?.korean ?? null,
    part: entry?.part ?? null,
    category: entry?.category ?? null,
    pass: Boolean(hasRealMeaning),
  };
});
const qualityFailed = qualityResults.filter((result) => !result.pass);
context.renderResult(context.findWord("world"));
const worldHtml = elements.get("#resultPanel")?.innerHTML ?? "";
context.renderResult(context.findWord("gold"));
const goldHtml = elements.get("#resultPanel")?.innerHTML ?? "";
context.renderResult(context.findWord("golden"));
const goldenHtml = elements.get("#resultPanel")?.innerHTML ?? "";
const renderChecks = [
  {
    name: "world 화면 뜻 표시",
    pass: worldHtml.includes("세계, 세상, 지구") && worldHtml.includes("뜻") && worldHtml.includes("지구"),
  },
  {
    name: "gold 화면 뜻 표시",
    pass: goldHtml.includes("금, 금색, 황금") && goldHtml.includes("귀금속") && goldHtml.includes("금반지"),
  },
  {
    name: "golden 화면 뜻 표시",
    pass: goldenHtml.includes("금빛의, 황금색의, 귀중한") && goldenHtml.includes("golden opportunity") && goldenHtml.includes("금빛"),
  },
];
const renderFailed = renderChecks.filter((result) => !result.pass);
const relatedCases = [
  { query: "\ub208", expectedFirst: "eye", expectedRelated: "snow" },
  { query: "\ubb38\uc81c", expectedFirst: "problem", expectedRelated: "issue" },
];
const relatedResults = relatedCases.map(({ query, expectedFirst, expectedRelated }) => {
  const firstEntry = context.findWord(query);
  const relatedWords = firstEntry ? context.getRelatedEntries(query, firstEntry, 10).map((entry) => entry.word) : [];
  return {
    query,
    expectedFirst,
    actualFirst: firstEntry?.word ?? null,
    expectedRelated,
    relatedWords,
    pass: firstEntry?.word === expectedFirst && relatedWords.includes(expectedRelated),
  };
});
const relatedFailed = relatedResults.filter((result) => !result.pass);

console.log(
  JSON.stringify(
    {
      search: { total: results.length, failed: failed.length, results },
      autocomplete: { total: autocompleteResults.length, failed: autocompleteFailed.length, results: autocompleteResults },
      senses: { total: senseChecks.length, failed: senseFailed.length, results: senseChecks },
      quality: { total: qualityResults.length, failed: qualityFailed.length, results: qualityResults },
      render: { total: renderChecks.length, failed: renderFailed.length, results: renderChecks },
      related: { total: relatedResults.length, failed: relatedFailed.length, results: relatedResults },
    },
    null,
    2
  )
);
if (failed.length > 0 || autocompleteFailed.length > 0 || senseFailed.length > 0 || qualityFailed.length > 0 || renderFailed.length > 0 || relatedFailed.length > 0) {
  process.exitCode = 1;
}
