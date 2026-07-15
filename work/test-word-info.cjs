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
    querySelector() {
      return null;
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
  fetch: async () => ({
    ok: true,
    json: async () => [
      {
        phonetics: [{ text: "/əˈpɪr/", audio: "https://example.com/appear.mp3" }],
        meanings: [
          {
            synonyms: ["emerge"],
            definitions: [{ synonyms: ["show up", "seem"] }],
          },
        ],
      },
    ],
  }),
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
if (fs.existsSync("./outputs/kids-dictionary/verified-bank-supplement.js")) {
  vm.runInContext(fs.readFileSync("./outputs/kids-dictionary/verified-bank-supplement.js", "utf8"), context);
}
if (fs.existsSync("./outputs/kids-dictionary/verified-meaning-overrides.js")) {
  vm.runInContext(fs.readFileSync("./outputs/kids-dictionary/verified-meaning-overrides.js", "utf8"), context);
}
if (fs.existsSync("./outputs/kids-dictionary/manual-meaning-overrides.js")) {
  vm.runInContext(fs.readFileSync("./outputs/kids-dictionary/manual-meaning-overrides.js", "utf8"), context);
}
vm.runInContext(fs.readFileSync("./outputs/kids-dictionary/app.js", "utf8"), context);

(async () => {
  const info = await context.getExternalWordInfo("appear");
  const runInfo = await context.getExternalWordInfo("run");
  const worldInfo = await context.getExternalWordInfo("world");
  const goldInfo = await context.getExternalWordInfo("gold");
  const goldenInfo = await context.getExternalWordInfo("golden");
  const pass =
    info.audioUrl === "https://example.com/appear.mp3" &&
    info.phonetics.includes("əˈpɪr") &&
    info.synonyms.includes("emerge") &&
    info.synonyms.includes("show up") &&
    info.synonyms.includes("seem") &&
    runInfo.pronunciationDisplay === "미국∙영국 [rʌn]" &&
    context.formatPronunciationText("run", runInfo.phonetics, runInfo.pronunciationDisplay) === "미국∙영국 [rʌn]" &&
    worldInfo.pronunciationDisplay === "미국 [wɝld] · 영국 [wɜːld]" &&
    context.formatPronunciationText("world", worldInfo.phonetics, worldInfo.pronunciationDisplay) === "미국 [wɝld] · 영국 [wɜːld]" &&
    goldInfo.pronunciationDisplay === "미국 [goʊld] · 영국 [gəʊld]" &&
    context.formatPronunciationText("gold", goldInfo.phonetics, goldInfo.pronunciationDisplay) === "미국 [goʊld] · 영국 [gəʊld]" &&
    goldenInfo.pronunciationDisplay === "미국 [ˈgoʊldən] · 영국 [ˈgəʊldən]" &&
    context.formatPronunciationText("golden", goldenInfo.phonetics, goldenInfo.pronunciationDisplay) === "미국 [ˈgoʊldən] · 영국 [ˈgəʊldən]";

  console.log(JSON.stringify({ pass, info, runInfo, worldInfo, goldInfo, goldenInfo }, null, 2));
  if (!pass) {
    process.exitCode = 1;
  }
})();
