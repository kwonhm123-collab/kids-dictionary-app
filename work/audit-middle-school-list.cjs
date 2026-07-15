const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = process.cwd();
const DEFAULT_INPUT = path.join("C:", "Users", "kwonh", "Downloads", "middle_school_english_verified_1500.txt");
const OUTPUT_DIR = path.join(ROOT, "outputs", "middle-school-1500-audit");

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

function createAppContext() {
  const elements = new Map();

  function getElement(selector) {
    if (!elements.has(selector)) {
      elements.set(selector, makeElement());
    }
    return elements.get(selector);
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
    "vocab-bank.js",
    "top1000-supplement.js",
    "top2000-supplement.js",
    "top2200-supplement.js",
    "ministry3000-supplement.js",
    "verified-bank-supplement.js",
    "verified-meaning-overrides.js",
    "manual-meaning-overrides.js",
    "manual-extra-overrides.js",
    "manual-middle-school-additions.js",
    "manual-excluded-words.js",
    "app.js",
  ];

  for (const script of scripts) {
    const fullPath = path.join(ROOT, "outputs", "kids-dictionary", script);
    if (!fs.existsSync(fullPath)) continue;
    vm.runInContext(fs.readFileSync(fullPath, "utf8"), context);
  }

  return context;
}

function parseWordList(filePath) {
  const text = fs.readFileSync(filePath, "utf8");
  return text
    .split(/\r?\n/)
    .map((line) => {
      const match = line.match(/^\s*\d+\.\s+(.+?)\s*$/);
      return match ? match[1].trim() : null;
    })
    .filter(Boolean);
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function writeLines(filePath, lines) {
  fs.writeFileSync(filePath, `${lines.join("\n")}\n`, "utf8");
}

function main() {
  const inputPath = process.argv[2] ? path.resolve(process.argv[2]) : DEFAULT_INPUT;
  if (!fs.existsSync(inputPath)) {
    throw new Error(`Input file not found: ${inputPath}`);
  }

  ensureDir(OUTPUT_DIR);

  const context = createAppContext();
  const words = parseWordList(inputPath);
  const bankWords = Array.isArray(context.window.studentVocabularyBank) ? context.window.studentVocabularyBank : [];
  const bankSet = new Set(bankWords.map((word) => String(word).toLowerCase()));

  const results = words.map((word, index) => {
    const lookup = context.findWord(word);
    const actualWord = lookup ? String(lookup.word) : null;
    const exact = Boolean(actualWord && actualWord.toLowerCase() === word.toLowerCase());
    return {
      no: index + 1,
      word,
      status: exact ? "exact" : lookup ? "wrong_match" : "missing",
      actual: actualWord,
      korean: lookup ? lookup.korean : null,
      category: lookup ? lookup.category : null,
      level: lookup ? lookup.level : null,
      inBankList: bankSet.has(word.toLowerCase()),
    };
  });

  const exactMatches = results.filter((item) => item.status === "exact");
  const wrongMatches = results.filter((item) => item.status === "wrong_match");
  const missing = results.filter((item) => item.status === "missing");
  const missingInBank = missing.filter((item) => item.inBankList);
  const missingNotInBank = missing.filter((item) => !item.inBankList);

  const summary = {
    sourceFile: inputPath,
    checkedAt: new Date().toISOString(),
    totalWords: results.length,
    exactMatchCount: exactMatches.length,
    wrongMatchCount: wrongMatches.length,
    missingCount: missing.length,
    exactMatchRate: Number(((exactMatches.length / results.length) * 100).toFixed(2)),
    wrongMatchRate: Number(((wrongMatches.length / results.length) * 100).toFixed(2)),
    missingRate: Number(((missing.length / results.length) * 100).toFixed(2)),
    missingInBankListCount: missingInBank.length,
    missingNotInBankListCount: missingNotInBank.length,
    wrongMatchSamples: wrongMatches.slice(0, 30),
    missingSamples: missing.slice(0, 30).map((item) => item.word),
  };

  writeJson(path.join(OUTPUT_DIR, "summary.json"), summary);
  writeJson(path.join(OUTPUT_DIR, "full-results.json"), results);
  writeJson(path.join(OUTPUT_DIR, "wrong-matches.json"), wrongMatches);
  writeJson(path.join(OUTPUT_DIR, "missing.json"), missing);
  writeLines(path.join(OUTPUT_DIR, "missing-words.txt"), missing.map((item) => item.word));
  writeLines(
    path.join(OUTPUT_DIR, "wrong-match-words.txt"),
    wrongMatches.map((item) => `${item.word} -> ${item.actual}`)
  );

  console.log(JSON.stringify(summary, null, 2));
}

main();
