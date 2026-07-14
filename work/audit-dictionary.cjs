const fs = require("fs");
const vm = require("vm");

function makeElement() {
  return {
    dataset: {},
    value: "",
    innerHTML: "",
    textContent: "",
    classList: { add() {}, remove() {}, toggle() {} },
    addEventListener() {},
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

const englishSample = context.window.studentVocabularyBank.slice(0, 200);
const koreanSample = [
  ["학교", "school"],
  ["책", "book"],
  ["친구", "friend"],
  ["사람", "person"],
  ["사람들", "people"],
  ["가족", "family"],
  ["물", "water"],
  ["해", "sun"],
  ["태양", "sun"],
  ["고양이", "cat"],
  ["개", "dog"],
  ["강아지", "dog"],
  ["먹다", "eat"],
  ["달리다", "run"],
  ["걷다", "walk"],
  ["쓰다", "write"],
  ["읽다", "read"],
  ["듣다", "listen"],
  ["말하다", "say"],
  ["보다", "see"],
  ["가다", "go"],
  ["오다", "come"],
  ["만들다", "make"],
  ["알다", "know"],
  ["생각하다", "think"],
  ["주다", "give"],
  ["받다", "receive"],
  ["찾다", "find"],
  ["사용하다", "use"],
  ["필요하다", "need"],
  ["원하다", "want"],
  ["좋아하다", "like"],
  ["일하다", "work"],
  ["놀다", "play"],
  ["공부하다", "study"],
  ["배우다", "learn"],
  ["가르치다", "teach"],
  ["돕다", "help"],
  ["시작하다", "start"],
  ["끝나다", "end"],
  ["열다", "open"],
  ["닫다", "close"],
  ["큰", "big"],
  ["작은", "small"],
  ["좋은", "good"],
  ["나쁜", "bad"],
  ["새로운", "new"],
  ["오래된", "old"],
  ["빠른", "fast"],
  ["느린", "slow"],
  ["긴", "long"],
  ["짧은", "short"],
  ["높은", "high"],
  ["낮은", "low"],
  ["중요한", "important"],
  ["어려운", "difficult"],
  ["쉬운", "easy"],
  ["행복한", "happy"],
  ["슬픈", "sad"],
  ["친절한", "kind"],
  ["용감한", "brave"],
  ["빨간색", "red"],
  ["파란색", "blue"],
  ["초록색", "green"],
  ["노란색", "yellow"],
  ["검은색", "black"],
  ["하얀색", "white"],
  ["금", "gold"],
  ["금색", "gold"],
  ["황금", "gold"],
  ["금빛", "golden"],
  ["황금빛", "golden"],
  ["황금색", "golden"],
  ["시간", "time"],
  ["연도", "year"],
  ["년", "year"],
  ["날", "day"],
  ["하루", "day"],
  ["아침", "morning"],
  ["밤", "night"],
  ["집", "home"],
  ["방", "room"],
  ["문", "door"],
  ["창문", "window"],
  ["탁자", "table"],
  ["책상", "desk"],
  ["의자", "chair"],
  ["연필", "pencil"],
  ["신발", "shoe"],
  ["손", "hand"],
  ["머리", "head"],
  ["눈", "eye"],
  ["이름", "name"],
  ["단어", "word"],
  ["문장", "sentence"],
  ["문제", "problem"],
  ["질문", "question"],
  ["답", "answer"],
  ["세계", "world"],
  ["세상", "world"],
  ["지구", "world"],
  ["나라", "country"],
  ["도시", "city"],
  ["장소", "place"],
  ["곳", "place"],
  ["경우", "case"],
  ["정부", "government"],
  ["회사", "company"],
  ["사업", "business"],
  ["업무", "work"],
  ["일", "work"],
  ["컴퓨터", "computer"],
  ["회의", "meeting"],
  ["회의 안건", "agenda"],
  ["회의록", "minutes"],
  ["일정", "schedule"],
  ["마감일", "deadline"],
  ["마감", "deadline"],
  ["산출물", "deliverable"],
  ["계약", "contract"],
  ["계약서", "contract"],
  ["청구서", "invoice"],
  ["영수증", "receipt"],
  ["예산", "budget"],
  ["매출", "revenue"],
  ["고객", "customer"],
  ["보안", "security"],
  ["권한", "permission"],
  ["인증", "authentication"],
  ["자동화", "automation"],
  ["데이터베이스", "database"],
  ["서버", "server"],
  ["네트워크", "network"],
  ["배포하다", "deploy"],
  ["해결하다", "resolve"],
  ["확인하다", "confirm"],
  ["취소하다", "cancel"],
  ["협업하다", "collaborate"],
  ["채용하다", "recruit"],
  ["면접", "interview"],
  ["휴가", "leave"],
  ["본사", "headquarters"],
  ["전략", "strategy"],
  ["갈등", "conflict"],
  ["저작권", "copyright"],
  ["견적서", "quotation"],
  ["자산", "asset"],
  ["조항", "clause"],
  ["공급업체", "vendor"],
  ["배송", "shipment"],
  ["대시보드", "dashboard"],
  ["지표", "metric"],
  ["성과", "performance"],
  ["우선순위", "priority"],
  ["위험", "risk"],
  ["접근", "access"],
  ["나타나다", "appear"],
  ["사라지다", "disappear"],
  ["발견하다", "discover"],
  ["환경", "environment"],
  ["기술", "technology"],
  ["책임 있는", "responsible"],
  ["추천", "recommendation"],
  ["인프라", "infrastructure"],
  ["승인", "approval"],
  ["승인하다", "approve"],
  ["보고", "briefing"],
  ["로드맵", "roadmap"],
  ["업무 흐름", "workflow"],
  ["인수인계", "handover"],
  ["이해관계자", "stakeholder"],
  ["책임", "ownership"],
  ["계획", "initiative"],
  ["수신자", "recipient"],
  ["발신자", "sender"],
  ["초안", "draft"],
  ["문서", "document"],
  ["수정하다", "revise"],
  ["요약", "summary"],
  ["제안서", "proposal"],
  ["결제", "payment"],
  ["비용", "expense"],
  ["이익", "profit"],
  ["부채", "liability"],
  ["감사", "audit"],
  ["정책", "policy"],
  ["절차", "procedure"],
  ["협상하다", "negotiate"],
  ["갱신", "renewal"],
  ["기밀", "confidential"],
  ["공급자", "supplier"],
  ["구매", "purchase"],
  ["재고", "inventory"],
  ["물류", "logistics"],
  ["창고", "warehouse"],
  ["잠재 고객", "prospect"],
  ["전환", "conversion"],
  ["캠페인", "campaign"],
  ["대상", "target"],
  ["청중", "audience"],
].slice(0, 200);

function inspectEnglish(query) {
  const entry = context.findWord(query);
  const issue =
    !entry ? "missing" :
    entry.category === "학생 3000+" || entry.korean === "어휘 뱅크 단어" ? "placeholder" :
    entry.word !== query ? "wrong-match" :
    null;
  return { query, actual: entry?.word ?? null, korean: entry?.korean ?? null, category: entry?.category ?? null, issue };
}

function inspectKorean([query, expected]) {
  const entry = context.findWord(query);
  const issue =
    !entry ? "missing" :
    entry.category === "학생 3000+" || entry.korean === "어휘 뱅크 단어" ? "placeholder" :
    entry.word !== expected ? "wrong-match" :
    null;
  return { query, expected, actual: entry?.word ?? null, korean: entry?.korean ?? null, category: entry?.category ?? null, issue };
}

const englishResults = englishSample.map(inspectEnglish);
const koreanResults = koreanSample.map(inspectKorean);

const summary = {
  english: {
    total: englishResults.length,
    failed: englishResults.filter((result) => result.issue).length,
    byIssue: englishResults.reduce((counts, result) => {
      if (result.issue) counts[result.issue] = (counts[result.issue] ?? 0) + 1;
      return counts;
    }, {}),
    failures: englishResults.filter((result) => result.issue).slice(0, 80),
  },
  korean: {
    total: koreanResults.length,
    failed: koreanResults.filter((result) => result.issue).length,
    byIssue: koreanResults.reduce((counts, result) => {
      if (result.issue) counts[result.issue] = (counts[result.issue] ?? 0) + 1;
      return counts;
    }, {}),
    failures: koreanResults.filter((result) => result.issue).slice(0, 80),
  },
};

console.log(JSON.stringify(summary, null, 2));
if (summary.english.failed > 0 || summary.korean.failed > 0) {
  process.exitCode = 1;
}
