const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = process.cwd();
const SOURCE_FILE = path.join(ROOT, "outputs", "kids-dictionary", "manual-extra-overrides.js");
const TARGET_FILES = [
  SOURCE_FILE,
  path.join(ROOT, "docs", "manual-extra-overrides.js"),
  path.join(ROOT, "outputs", "kids-dictionary-release", "manual-extra-overrides.js"),
];

const WORD_OVERRIDES = {
  accountability: "책임, 책무, 설명 책임",
  accompanied: "동반한, 함께한",
  accused: "피의자, 피고인",
  ace: "에이스, 명수, 고수, 아주 뛰어난 사람",
  acids: "산, 산성의 것, 신맛이 나는 것",
  activation: "활성화, 작동 개시, 부대 신설",
  actively: "활발하게, 적극적으로",
  administered: "관리된, 시행된, 투여된",
  admitted: "인정된, 허가된",
  advised: "숙고한, 신중한",
  aimed: "겨냥한, 목표로 한",
  alleged: "주장된, 혐의를 받는",
  amenities: "편의시설, 생활 편의",
  anybody: "누구든지, 아무나, 중요한 인물",
  anymore: "이제는, 더 이상",
  app: "앱, 응용 프로그램",
  approx: "대략의, 근사치의",
  approximate: "대략의, 거의 정확한, 근사치의",
  architectural: "건축의, 건축학의",
  argued: "주장했다, 논쟁했다",
  arrive: "도착하다, 이르다",
  arch: "아치형 구조물, 아치형 장식, 둥글게 구부리다",
  athletes: "운동선수, 육상 선수",
  attraction: "매력, 끌림, 명소",
  bahamas: "바하마",
  barry: "방패 문양을 같은 폭의 가로줄로 나눈",
  bestsellers: "베스트셀러들",
  bio: "약력, 소개",
  bm: "의학사, 음악학사, 기초 대사량, 기준점",
  bp: "혈압, 영국 석유 회사 BP",
  ebook: "전자책",
  ebooks: "전자책들",
  ecommerce: "전자상거래",
  endif: "조건문 끝, endif",
  fotos: "사진들",
  goto: "바로 가기, 이동",
  howto: "방법 안내, 사용법",
  latinas: "라틴계 여성들",
  meetup: "모임",
  plugin: "플러그인, 추가 기능",
  plugins: "플러그인들, 추가 기능들",
  slideshow: "슬라이드쇼",
  starring: "주연으로 출연하는",
  struct: "구조체",
  trackbacks: "트랙백",
  tri: "세 부분으로 된, 셋의",
  utils: "유틸리티",
  vii: "로마 숫자 7",
  wifi: "와이파이",
};

const TEXT_REPLACEMENTS = [
  [/카드의에이스/g, "카드의 에이스"],
  [/피고 인/g, "피고인"],
  [/산성 의/g, "산성의"],
  [/신청 서/g, "신청서"],
  [/매력 적인/g, "매력적인"],
  [/건축학, 술의/g, "건축의, 건축학의"],
  [/활동적으로 하기/g, "활성화"],
  [/불일듯이/g, "활발하게"],
  [/적극 참여하다/g, "적극적으로 활동하다"],
  [/단수 취급 /g, ""],
  [/복수 취급 /g, ""],
  [/the ~, /g, ""],
  [/= BAHAMA ISLANDS/g, "바하마 제도"],
  [/약어 approx/g, "근사치의"],
  [/약어 arr\./g, ""],
  [/숙고한, 신중한 deliberate/g, "숙고한, 신중한"],
  [/카드의 에이스, 명수, 고수, 아주 좋은/g, "에이스, 명수, 고수, 아주 뛰어난 사람"],
  [/사람을 끄는 명소, 명물/g, "사람을 끄는 명소"],
  [/매력 적인 요소/g, "매력적인 요소"],
  [/오락시설/g, "편의시설"],
  [/아무 부정문과의문문에서 if\/whether 뒤에서 또는 prevent, forbid, avoid와 같은 동사 뒤에서 someone 대신 쓰임/g, "아무나, 누구든지"],
  [/아치형 장식 이 붙어 있는/g, "아치형 장식이 붙어 있는"],
  [/몸을, 이 동그랗게 구부리다/g, "몸이나 등을 동그랗게 구부리다"],
  [/운동 선수, 육상 경기 선수, 운동을 잘 하는 사람, 운동선수/g, "운동선수, 육상 선수"],
  [/비리의혹/g, "비리 의혹"],
  [/공인된/g, "인정된"],
  [/지배적/g, "관리된, 시행된"],
  [/목적, 목표, 겨냥, 조준/g, "겨냥한, 목표로 한"],
  [/지원, 신청서, 적용, 응용/g, "앱, 응용 프로그램"],
  [/성격·양·자질 등이 비슷하다, 가깝다/g, "대략의, 거의 정확한, 근사치의"],
  [/언쟁을 하다, 다투다, 논거를 들어 주장하다, 논증하다/g, "주장했다, 논쟁했다"],
  [/특히 여정 끝에 도착하다, 배달되다, 도착하다, 도래하다/g, "도착하다, 이르다"],
];

function loadOverrides(filePath) {
  const context = { window: { verifiedMeaningOverrides: {} } };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(filePath, "utf8"), context);
  return context.window.verifiedMeaningOverrides || {};
}

function polishMeaning(word, meaning) {
  if (WORD_OVERRIDES[word]) {
    return WORD_OVERRIDES[word];
  }

  let polished = String(meaning || "");
  for (const [pattern, replacement] of TEXT_REPLACEMENTS) {
    polished = polished.replace(pattern, replacement);
  }

  return polished
    .replace(/\s+,/g, ",")
    .replace(/,\s*,/g, ", ")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([,.])/g, "$1")
    .replace(/,\s*$/g, "")
    .trim();
}

function writeOverrides(filePath, overrides) {
  const body = [
    "window.verifiedMeaningOverrides = Object.assign(",
    "  window.verifiedMeaningOverrides || {},",
    "  {",
    ...Object.entries(overrides)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([word, meaning]) => `    ${JSON.stringify(word)}: ${JSON.stringify(meaning)},`),
    "  }",
    ");",
    "",
  ].join("\n");

  fs.writeFileSync(filePath, body, "utf8");
}

function main() {
  if (!fs.existsSync(SOURCE_FILE)) {
    throw new Error(`Missing source file: ${SOURCE_FILE}`);
  }

  const overrides = loadOverrides(SOURCE_FILE);
  const changed = [];

  for (const [word, meaning] of Object.entries(overrides)) {
    const polished = polishMeaning(word, meaning);
    if (polished && polished !== meaning) {
      overrides[word] = polished;
      changed.push({ word, before: meaning, after: polished });
    }
  }

  for (const file of TARGET_FILES) {
    const dir = path.dirname(file);
    if (fs.existsSync(dir)) {
      writeOverrides(file, overrides);
    }
  }

  console.log(
    JSON.stringify(
      {
        changedCount: changed.length,
        sample: changed.slice(0, 20),
      },
      null,
      2
    )
  );
}

main();
