const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = process.cwd();
const FILES = [
  "outputs/kids-dictionary/vocab-bank.js",
  "outputs/kids-dictionary/top1000-supplement.js",
  "outputs/kids-dictionary/top2000-supplement.js",
  "outputs/kids-dictionary/top2200-supplement.js",
  "outputs/kids-dictionary/ministry3000-supplement.js",
  "outputs/kids-dictionary/verified-bank-supplement.js",
  "outputs/kids-dictionary/verified-meaning-overrides.js",
  "outputs/kids-dictionary/manual-meaning-overrides.js",
  "outputs/kids-dictionary/manual-extra-overrides.js",
  "outputs/kids-dictionary/manual-middle-school-additions.js",
  "outputs/kids-dictionary/manual-excluded-words.js",
  "outputs/kids-dictionary/app.js",
].map((file) => path.join(ROOT, file));

function createContext() {
  return {
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
      speechSynthesis: { cancel() {}, speak() {}, getVoices() { return []; } },
      addEventListener() {},
    },
    document: {
      querySelector() {
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
        };
      },
      querySelectorAll() {
        return [];
      },
    },
  };
}

function main() {
  const context = createContext();
  vm.createContext(context);

  for (const file of FILES) {
    if (fs.existsSync(file)) {
      vm.runInContext(fs.readFileSync(file, "utf8"), context);
    }
  }

  const dictionary = vm.runInContext("dictionary", context);
  const placeholderEntries = dictionary.filter((entry) => String(entry.korean || "").includes("관련 추가 영어 어휘"));
  const awkwardEntries = dictionary.filter(
    (entry) =>
      entry.category === "어휘 뱅크 자동 보강" &&
      /하는 중|의들$|한들$|있다들$|하다들$/.test(String(entry.korean || ""))
  );

  const sampleWords = ["mask", "relative", "comfortable", "processor", "offline", "citizens", "developers", "begin"];
  const sample = sampleWords.map((word) => {
    const entry = dictionary.find((item) => item.word.toLowerCase() === word.toLowerCase());
    return {
      word,
      korean: entry?.korean ?? null,
      category: entry?.category ?? null,
      definition: entry?.definition ?? null,
    };
  });

  const output = {
    generatedAt: new Date().toISOString(),
    dictionaryCount: dictionary.length,
    placeholderCount: placeholderEntries.length,
    placeholderWords: placeholderEntries.map((entry) => entry.word),
    awkwardAutoMeaningCount: awkwardEntries.length,
    placeholderSamples: placeholderEntries.slice(0, 30).map((entry) => entry.word),
    awkwardSamples: awkwardEntries.slice(0, 30).map((entry) => ({ word: entry.word, korean: entry.korean })),
    sample,
  };

  console.log(JSON.stringify(output, null, 2));
}

main();
