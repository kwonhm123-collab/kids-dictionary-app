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
const verifiedBankSupplementCode = fs.existsSync("./outputs/kids-dictionary/verified-bank-supplement.js")
  ? fs.readFileSync("./outputs/kids-dictionary/verified-bank-supplement.js", "utf8")
  : "window.verifiedBankSupplement = {};";
const verifiedMeaningOverridesCode = fs.existsSync("./outputs/kids-dictionary/verified-meaning-overrides.js")
  ? fs.readFileSync("./outputs/kids-dictionary/verified-meaning-overrides.js", "utf8")
  : "window.verifiedMeaningOverrides = {};";
const manualMeaningOverridesCode = fs.existsSync("./outputs/kids-dictionary/manual-meaning-overrides.js")
  ? fs.readFileSync("./outputs/kids-dictionary/manual-meaning-overrides.js", "utf8")
  : "";
const manualExtraOverridesCode = fs.existsSync("./outputs/kids-dictionary/manual-extra-overrides.js")
  ? fs.readFileSync("./outputs/kids-dictionary/manual-extra-overrides.js", "utf8")
  : "";
const manualMiddleSchoolAdditionsCode = fs.existsSync("./outputs/kids-dictionary/manual-middle-school-additions.js")
  ? fs.readFileSync("./outputs/kids-dictionary/manual-middle-school-additions.js", "utf8")
  : "window.manualDictionaryAdditions = [];";
const manualExcludedWordsCode = fs.existsSync("./outputs/kids-dictionary/manual-excluded-words.js")
  ? fs.readFileSync("./outputs/kids-dictionary/manual-excluded-words.js", "utf8")
  : "window.excludedDictionaryWords = [];";

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
vm.runInContext(verifiedBankSupplementCode, context);
vm.runInContext(verifiedMeaningOverridesCode, context);
vm.runInContext(manualMeaningOverridesCode, context);
vm.runInContext(manualExtraOverridesCode, context);
vm.runInContext(manualMiddleSchoolAdditionsCode, context);
vm.runInContext(manualExcludedWordsCode, context);
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
  ["terrible", "terrible", "영한 고등어"],
  ["acquaintance", "acquaintance", "영한 중등 1500 보강"],
  ["alphabet", "alphabet", "영한 중등 1500 보강"],
  ["ambulance", "ambulance", "영한 중등 1500 보강"],
  ["amnesia", "amnesia", "영한 중등 1500 보강"],
  ["ankle", "ankle", "영한 중등 1500 보강"],
  ["applause", "applause", "영한 중등 1500 보강"],
  ["appoint", "appoint", "영한 중등 1500 보강"],
  ["apprentice", "apprentice", "영한 중등 1500 보강"],
  ["astronaut", "astronaut", "영한 중등 1500 보강"],
  ["awful", "awful", "영한 중등 1500 보강"],
  ["bacon", "bacon", "영한 중등 1500 보강"],
  ["clever", "clever", "영한 중등 1500 보강"],
  ["daisy", "daisy", "영한 중등 1500 보강"],
  ["dolphin", "dolphin", "영한 중등 1500 보강"],
  ["refrigerator", "refrigerator", "영한 중등 1500 보강"],
  ["watermelon", "watermelon", "영한 중등 1500 보강"],
  ["yogurt", "yogurt", "영한 중등 1500 보강"],
  ["zebra", "zebra", "영한 중등 1500 보강"],
  ["appear", "appear", "영한 고등어"],
  ["disappear", "disappear", "영한 구조어"],
  ["deadline", "deadline", "영한 업무어"],
  ["invoice", "invoice", "영한 업무어"],
  ["analytics", "analytics", "영한 업무어"],
  ["textbook", "textbook", "영한 보강어"],
  ["computer", "computer", "영한 기본어"],
  ["neighbor", "neighbor", "영한 기본어"],
  ["neighbors", "neighbors", "영한 기본어"],
  ["neighbour", "neighbour", "영한 영국식 철자"],
  ["neighborhood", "neighborhood", "영한 기본어"],
  ["\uc774\uc6c3", "neighbor", "한영 기본어"],
  ["\ub3d9\ub124", "neighborhood", "한영 기본어"],
  ["\uc0b0\ucd9c\ubb3c", "deliverable", "한영 수동 보정어"],
  ["\ucca8\ubd80", "attachment", "한영 수동 보정어"],
  ["\uc218\uc2e0\uc790", "recipient", "한영 수동 보정어"],
  ["\ubc1c\uc2e0\uc790", "sender", "한영 수동 보정어"],
  ["\ub85c\ub4dc\ub9f5", "roadmap", "한영 수동 보정어"],
  ["\uc628\ubcf4\ub529", "onboarding", "한영 수동 보정어"],
  ["\ud1f4\uc0ac \uc808\ucc28", "offboarding", "한영 수동 보정어"],
  ["\ub054\ucc0d\ud55c", "terrible", "한영 수동 보정어"],
  ["\uc544\ub294 \uc0ac\ub78c", "acquaintance", "한영 중등 1500 보강"],
  ["\uc54c\ud30c\ubcb3", "alphabet", "한영 중등 1500 보강"],
  ["\uad6c\uae09\ucc28", "ambulance", "한영 중등 1500 보강"],
  ["\ubc1c\ubaa9", "ankle", "한영 중등 1500 보강"],
  ["\ubc15\uc218", "applause", "한영 중등 1500 보강"],
  ["\uc6b0\uc8fc\ube44\ud589\uc0ac", "astronaut", "한영 중등 1500 보강"],
  ["\ubca0\uc774\ucee8", "bacon", "한영 중등 1500 보강"],
  ["\uc601\ub9ac\ud55c", "clever", "한영 중등 1500 보강"],
  ["\ub9c8\ub298", "garlic", "한영 중등 1500 보강"],
  ["\ucf54\ub07c\ub9ac", "elephant", "한영 중등 1500 보강"],
  ["\ub0c9\uc7a5\uace0", "refrigerator", "한영 중등 1500 보강"],
  ["\uc218\ubc15", "watermelon", "한영 중등 1500 보강"],
  ["\uc694\uad6c\ub974\ud2b8", "yogurt", "한영 중등 1500 보강"],
  ["\uc5bc\ub8e9\ub9d0", "zebra", "한영 중등 1500 보강"],
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
const excludedWords = ["anabasises", "anaglyption", "anagoges", "ashray", "cialis", "href", "findlaw", "disclaimers"];
const excludedResults = excludedWords.map((word) => {
  const actual = context.findWord(word)?.word ?? null;
  return { word, actual, pass: actual === null };
});
const excludedAutocompleteWords = context.getAutocompleteWords("ci").map((entry) => entry.word);
const excludedAutocompleteResult = {
  word: "cialis-autocomplete",
  actual: excludedAutocompleteWords.includes("cialis") ? "cialis" : null,
  pass: !excludedAutocompleteWords.includes("cialis"),
};
const excludedFailed = [...excludedResults.filter((result) => !result.pass), ...(excludedAutocompleteResult.pass ? [] : [excludedAutocompleteResult])];
const falsePositiveWords = ["zzqxword", "notarealword", "imaginaryentry", "donutshopx", "watermelonzz", "zebraword"];
const falsePositiveResults = falsePositiveWords.map((word) => {
  const actual = context.findWord(word)?.word ?? null;
  return { word, actual, pass: actual === null };
});
const falsePositiveFailed = falsePositiveResults.filter((result) => !result.pass);
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
const derivedQualityChecks = [
  ["trees", "나무"],
  ["positions", "위치"],
  ["outdoors", "야외"],
  ["runs", "달리다"],
  ["adding", "더하기"],
  ["seeing", "보기"],
  ["booking", "예약"],
  ["remaining", "남아 있기"],
];
const derivedQualityResults = derivedQualityChecks.map(([word, expected]) => {
  const entry = context.findWord(word);
  const korean = entry?.korean ?? null;
  return {
    word,
    expected,
    actual: korean,
    pass:
      typeof korean === "string" &&
      korean.includes(expected) &&
      !korean.includes("하는 중") &&
      !korean.endsWith("들"),
  };
});
const derivedQualityFailed = derivedQualityResults.filter((result) => !result.pass);
const meaningChecks = [
  ["deliverable", "산출물"],
  ["attachment", "첨부 파일"],
  ["timeline", "일정표"],
  ["roadmap", "로드맵"],
  ["onboarding", "온보딩"],
  ["offboarding", "오프보딩"],
  ["reimbursement", "비용 환급"],
  ["viewer", "시청자"],
  ["appearance", "외모"],
  ["dental", "치과의"],
  ["textbook", "교과서"],
  ["terrible", "\ub054\ucc0d\ud55c"],
  ["acquaintance", "\uc544\ub294 \uc0ac\ub78c"],
  ["ambulance", "\uad6c\uae09\ucc28"],
  ["ankle", "\ubc1c\ubaa9"],
  ["appoint", "\uc9c0\uba85\ud558\ub2e4"],
  ["apprentice", "\uacac\uc2b5\uc0dd"],
  ["astronaut", "\uc6b0\uc8fc\ube44\ud589\uc0ac"],
  ["awful", "\ub054\ucc0d\ud55c"],
  ["garlic", "\ub9c8\ub298"],
  ["refrigerator", "\ub0c9\uc7a5\uace0"],
  ["watermelon", "\uc218\ubc15"],
];
const meaningResults = meaningChecks.map(([word, expected]) => {
  const entry = context.findWord(word);
  return {
    word,
    expected,
    actual: entry?.korean ?? null,
    pass: typeof entry?.korean === "string" && entry.korean.includes(expected),
  };
});
const meaningFailed = meaningResults.filter((result) => !result.pass);
context.renderResult(context.findWord("world"));
const worldHtml = elements.get("#resultPanel")?.innerHTML ?? "";
context.renderResult(context.findWord("gold"));
const goldHtml = elements.get("#resultPanel")?.innerHTML ?? "";
context.renderResult(context.findWord("golden"));
const goldenHtml = elements.get("#resultPanel")?.innerHTML ?? "";
context.renderResult(context.findWord("begin"));
const beginHtml = elements.get("#resultPanel")?.innerHTML ?? "";
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
  {
    name: "begin 예문 따옴표 escape",
    pass:
      beginHtml.includes('I searched for &quot;begin&quot; in the dictionary.') &&
      beginHtml.includes('data-speak="I searched for &quot;begin&quot; in the dictionary."'),
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
      excluded: { total: excludedResults.length + 1, failed: excludedFailed.length, results: [...excludedResults, excludedAutocompleteResult] },
      falsePositives: { total: falsePositiveResults.length, failed: falsePositiveFailed.length, results: falsePositiveResults },
      senses: { total: senseChecks.length, failed: senseFailed.length, results: senseChecks },
      quality: { total: qualityResults.length, failed: qualityFailed.length, results: qualityResults },
      derivedQuality: { total: derivedQualityResults.length, failed: derivedQualityFailed.length, results: derivedQualityResults },
      meanings: { total: meaningResults.length, failed: meaningFailed.length, results: meaningResults },
      render: { total: renderChecks.length, failed: renderFailed.length, results: renderChecks },
      related: { total: relatedResults.length, failed: relatedFailed.length, results: relatedResults },
    },
    null,
    2
  )
);
if (
  failed.length > 0 ||
  autocompleteFailed.length > 0 ||
  excludedFailed.length > 0 ||
  senseFailed.length > 0 ||
  qualityFailed.length > 0 ||
  derivedQualityFailed.length > 0 ||
  meaningFailed.length > 0 ||
  renderFailed.length > 0 ||
  relatedFailed.length > 0
) {
  process.exitCode = 1;
}
