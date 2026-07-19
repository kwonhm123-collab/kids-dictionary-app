const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = process.cwd();
const APP_DIR = path.join(ROOT, "outputs", "kids-dictionary");
const OXFORD_HTML = path.join(ROOT, "outputs", "external-sources", "oxford-3000-5000.html");
const OUT_DIR = path.join(ROOT, "outputs", "middle-school-depth-audit");

function readIfExists(file, fallback = "") {
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : fallback;
}

function decodeHtml(value) {
  return String(value ?? "")
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
}

function normalizeWord(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[’‘]/g, "'");
}

function loadOxfordTargets() {
  const html = fs.readFileSync(OXFORD_HTML, "utf8");
  const byWord = new Map();
  const itemRegex = /<li\b([^>]*)>([\s\S]*?)<\/li>/g;
  let match;

  while ((match = itemRegex.exec(html))) {
    const attrs = match[1];
    const body = match[2];
    const wordMatch = attrs.match(/\bdata-hw="([^"]+)"/);
    if (!wordMatch) continue;

    const word = normalizeWord(decodeHtml(wordMatch[1]));
    const attrLevels = [...attrs.matchAll(/\bdata-ox(?:3000|5000)="([^"]+)"/g)].map((item) => item[1]);
    const bodyLevels = [...body.matchAll(/<span class="belong-to">([^<]+)<\/span>/g)].map((item) => item[1]);
    const levels = [...new Set([...attrLevels, ...bodyLevels].map((level) => level.toLowerCase()))].sort();
    if (!levels.some((level) => ["a1", "a2", "b1", "b2"].includes(level))) continue;

    const posMatch = body.match(/<span class="pos">([\s\S]*?)<\/span>/);
    const part = posMatch ? decodeHtml(posMatch[1]).replace(/<[^>]+>/g, "").trim() : "";

    if (!byWord.has(word)) byWord.set(word, { word, levels: new Set(), parts: new Set() });
    const target = byWord.get(word);
    levels.forEach((level) => target.levels.add(level));
    if (part) target.parts.add(part);
  }

  return [...byWord.values()]
    .map((entry) => ({
      word: entry.word,
      levels: [...entry.levels].sort(),
      parts: [...entry.parts].sort(),
    }))
    .sort((a, b) => a.word.localeCompare(b.word));
}

function createAppContext() {
  const elements = new Map();
  const makeElement = () => ({
    dataset: {},
    value: "",
    innerHTML: "",
    textContent: "",
    classList: { add() {}, remove() {}, toggle() {} },
    addEventListener() {},
  });
  const getElement = (selector) => {
    if (!elements.has(selector)) elements.set(selector, makeElement());
    return elements.get(selector);
  };

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
  const scripts = [
    ["vocab-bank.js", "window.studentVocabularyBank = [];"],
    ["top1000-supplement.js", "window.top1000SupplementMeanings = {};"],
    ["top2000-supplement.js", ""],
    ["top2200-supplement.js", ""],
    ["ministry3000-supplement.js", ""],
    ["verified-bank-supplement.js", "window.verifiedBankSupplement = {};"],
    ["verified-meaning-overrides.js", "window.verifiedMeaningOverrides = {};"],
    ["manual-meaning-overrides.js", ""],
    ["manual-extra-overrides.js", ""],
    ["manual-middle-school-additions.js", "window.manualDictionaryAdditions = [];"],
    ["manual-middle-school-core-additions.js", ""],
    ["manual-middle-school-depth-additions.js", ""],
    ["manual-excluded-words.js", "window.excludedDictionaryWords = [];"],
    ["manual-proper-noun-overrides.js", "window.properNounOverrides = {};"],
    ["naver-pronunciation-overrides.js", "window.pronunciationDisplayOverrides = {};"],
    ["manual-pronunciation-overrides.js", "window.pronunciationDisplayOverrides = window.pronunciationDisplayOverrides || {};"],
    ["app.js", ""],
  ];

  scripts.forEach(([name, fallback]) => {
    vm.runInContext(readIfExists(path.join(APP_DIR, name), fallback), context, { filename: name });
  });

  return context;
}

fs.mkdirSync(OUT_DIR, { recursive: true });

const targets = loadOxfordTargets();
const context = createAppContext();
const results = targets.map((target) => {
  const found = context.findWord(target.word);
  const exact = normalizeWord(found?.word) === target.word;
  return {
    ...target,
    status: exact ? "exact" : "missing",
    foundWord: found?.word ?? null,
    appKorean: found?.korean ?? null,
    appPart: found?.part ?? null,
    appCategory: found?.category ?? null,
    appLevel: found?.level ?? null,
  };
});

const missing = results.filter((entry) => entry.status !== "exact");
const middleCoreMissing = missing.filter((entry) => entry.levels.some((level) => ["a1", "a2", "b1"].includes(level)));
const middleDepthMissing = missing.filter((entry) => entry.levels.includes("b2"));
const sampleWords = ["swallow", "accent", "accountant", "anxious", "withdraw", "wound"];
const summary = {
  appVersion: vm.runInContext("APP_RELEASE_VERSION", context),
  appDictionaryWords: vm.runInContext("dictionary.length", context),
  targetTotal: targets.length,
  exactCount: results.length - missing.length,
  missingCount: missing.length,
  middleCoreMissing: middleCoreMissing.length,
  middleDepthMissing: middleDepthMissing.length,
  samples: sampleWords.map((word) => {
    const result = results.find((entry) => entry.word === word);
    const found = context.findWord(word);
    return {
      word,
      status: result?.status ?? "not-in-target",
      levels: result?.levels ?? [],
      found: found?.word ?? null,
      korean: found?.korean ?? null,
      category: found?.category ?? null,
      level: found?.level ?? null,
    };
  }),
};

fs.writeFileSync(path.join(OUT_DIR, "full-results-after-depth-additions.json"), JSON.stringify(results, null, 2), "utf8");
fs.writeFileSync(path.join(OUT_DIR, "missing-after-depth-additions.json"), JSON.stringify(missing, null, 2), "utf8");
fs.writeFileSync(path.join(OUT_DIR, "missing-after-depth-additions.txt"), missing.map((entry) => entry.word).join("\n"), "utf8");
fs.writeFileSync(path.join(OUT_DIR, "summary-after-depth-additions.json"), JSON.stringify(summary, null, 2), "utf8");

console.log(JSON.stringify(summary, null, 2));
if (missing.length > 0) process.exitCode = 1;
