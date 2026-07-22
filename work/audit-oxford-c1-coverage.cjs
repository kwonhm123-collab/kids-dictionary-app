const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { pathToFileURL } = require("url");

const ROOT = process.cwd();
const PDF_PATH = path.join(ROOT, "work", "oxford-5000-cefr.pdf");
const OXFORD_HTML_PATH = path.join(ROOT, "outputs", "external-sources", "oxford-3000-5000.html");
const DICTIONARY_DIR = path.join(ROOT, "outputs", "kids-dictionary");
const PDFJS_PATH = path.join(
  process.env.USERPROFILE || "",
  ".cache",
  "codex-runtimes",
  "codex-primary-runtime",
  "dependencies",
  "node",
  "node_modules",
  "pdfjs-dist",
  "legacy",
  "build",
  "pdf.mjs"
);

const DATA_FILES = [
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
  "manual-middle-school-core-additions.js",
  "manual-middle-school-depth-additions.js",
  "manual-high-school-depth-additions.js",
  "manual-phrase-additions.js",
  "manual-excluded-words.js",
  "manual-proper-noun-overrides.js",
  "naver-pronunciation-overrides.js",
  "manual-high-school-pronunciation-overrides.js",
  "manual-pronunciation-overrides.js",
];

function parseArgs(argv) {
  const options = { output: "", targets: "" };
  argv.forEach((arg) => {
    const [key, ...valueParts] = arg.split("=");
    const value = valueParts.join("=");
    if (key === "--output") options.output = value;
    if (key === "--targets") options.targets = value;
  });
  return options;
}

function escapeCsv(value) {
  const text = String(value ?? "");
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function normalizeHeadword(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\d+$/, "")
    .trim()
    .toLowerCase();
}

function decodeHtml(value) {
  return String(value || "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
}

function extractOxfordHtmlEntries() {
  const html = fs.readFileSync(OXFORD_HTML_PATH, "utf8");
  const entries = [];
  const itemPattern = /<li\b([^>]*)>([\s\S]*?)<\/li>/g;
  let match;
  while ((match = itemPattern.exec(html))) {
    const attrs = match[1];
    const body = match[2];
    const wordMatch = attrs.match(/\bdata-hw="([^"]+)"/);
    const partMatch = body.match(/<span class="pos">([\s\S]*?)<\/span>/);
    if (!wordMatch || !partMatch) continue;

    const levels = [
      ...[...attrs.matchAll(/\bdata-ox(?:3000|5000)="([^"]+)"/g)].map((item) => item[1]),
      ...[...body.matchAll(/<span class="belong-to">([^<]+)<\/span>/g)].map((item) => item[1]),
    ].map((level) => level.toUpperCase());
    const word = normalizeHeadword(decodeHtml(wordMatch[1]).replace(/[\u2018\u2019]/g, "'"));
    const part = decodeHtml(partMatch[1]).replace(/<[^>]+>/g, "").trim();
    [...new Set(levels)]
      .filter((level) => level === "B2" || level === "C1")
      .forEach((level) => entries.push({ word, part, parts: [part], level, page: null }));
  }

  const merged = new Map();
  entries.forEach((entry) => {
    const key = `${entry.level}:${entry.word}`;
    const existing = merged.get(key);
    if (!existing) {
      merged.set(key, entry);
      return;
    }
    if (!existing.parts.includes(entry.part)) existing.parts.push(entry.part);
  });
  return [...merged.values()];
}

async function extractOxfordPdfEntries() {
  if (!fs.existsSync(PDF_PATH)) {
    throw new Error(`Oxford PDF not found: ${PDF_PATH}`);
  }
  if (!fs.existsSync(PDFJS_PATH)) {
    throw new Error(`pdfjs-dist not found: ${PDFJS_PATH}`);
  }

  global.DOMMatrix = global.DOMMatrix || class DOMMatrix {};
  global.ImageData = global.ImageData || class ImageData {};
  global.Path2D = global.Path2D || class Path2D {};

  const pdfjs = await import(pathToFileURL(PDFJS_PATH).href);
  const pdf = await pdfjs.getDocument({ data: new Uint8Array(fs.readFileSync(PDF_PATH)) }).promise;
  const partPattern = /^(?:n|v|adj|adv|prep|conj|pron)\.(?:(?:,|\/)\s*(?:n|v|adj|adv|prep|conj|pron)\.)*$/;
  const entries = [];
  let level = "";

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    const tokens = content.items.map((item) => item.str.trim()).filter(Boolean);

    for (let index = 0; index < tokens.length; index += 1) {
      const token = tokens[index];
      if (token === "B2" || token === "C1") {
        level = token;
        continue;
      }
      if (!level || !partPattern.test(token)) {
        continue;
      }

      let wordIndex = index - 1;
      while (wordIndex >= 0 && /^(?:\d+|\(.*\))$/.test(tokens[wordIndex])) {
        wordIndex -= 1;
      }
      const word = normalizeHeadword(tokens[wordIndex]);
      if (!/^[a-z][a-z '-]*$/.test(word)) {
        continue;
      }
      entries.push({ word, part: token, level, page: pageNumber });
    }
  }

  const merged = new Map();
  entries.forEach((entry) => {
    const key = `${entry.level}:${entry.word}`;
    const existing = merged.get(key);
    if (!existing) {
      merged.set(key, { ...entry, parts: [entry.part] });
      return;
    }
    if (!existing.parts.includes(entry.part)) {
      existing.parts.push(entry.part);
    }
  });
  return [...merged.values()];
}

async function extractOxfordEntries() {
  if (fs.existsSync(OXFORD_HTML_PATH)) {
    return extractOxfordHtmlEntries();
  }
  return extractOxfordPdfEntries();
}

function loadDictionary() {
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
    localStorage: { getItem: () => null, setItem() {} },
    window: {
      studentVocabularyBank: [],
      speechSynthesis: { cancel() {}, speak() {}, getVoices: () => [] },
      addEventListener() {},
    },
    document: {
      querySelector: getElement,
      querySelectorAll: () => [],
    },
  };

  vm.createContext(context);
  DATA_FILES.forEach((file) => {
    const filePath = path.join(DICTIONARY_DIR, file);
    if (fs.existsSync(filePath)) {
      vm.runInContext(fs.readFileSync(filePath, "utf8"), context, { filename: filePath });
    }
  });
  const appPath = path.join(DICTIONARY_DIR, "app.js");
  vm.runInContext(fs.readFileSync(appPath, "utf8"), context, { filename: appPath });
  return vm.runInContext(
    "dictionary.map(({ word, korean, part, category, level }) => ({ word, korean, part, category, level }))",
    context
  );
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const oxfordEntries = await extractOxfordEntries();
  const c1Entries = oxfordEntries.filter((entry) => entry.level === "C1");
  const dictionary = loadDictionary();
  const dictionaryByWord = new Map(dictionary.map((entry) => [normalizeHeadword(entry.word), entry]));
  const missing = c1Entries.filter((entry) => !dictionaryByWord.has(entry.word));
  const present = c1Entries.filter((entry) => dictionaryByWord.has(entry.word));
  const weakMeaningPattern = /\uAD00\uB828 \uCD94\uAC00 \uC601\uC5B4 \uC5B4\uD718|additional english vocabulary|\uC790\uB3D9 \uBCF4\uAC15/i;
  const weakMeanings = present
    .map((entry) => ({ ...entry, dictionary: dictionaryByWord.get(entry.word) }))
    .filter((entry) => weakMeaningPattern.test(`${entry.dictionary.korean} ${entry.dictionary.category}`));

  const result = {
    generatedAt: new Date().toISOString(),
    source: "Oxford 5000 by CEFR level (American English)",
    extracted: {
      total: oxfordEntries.length,
      b2: oxfordEntries.filter((entry) => entry.level === "B2").length,
      c1: c1Entries.length,
    },
    dictionaryTotal: dictionary.length,
    c1Present: present.length,
    c1Missing: missing.length,
    c1WeakMeaning: weakMeanings.length,
    missing,
    weakMeanings,
  };

  if (options.output) {
    const outputPath = path.resolve(ROOT, options.output);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
  }

  if (options.targets) {
    const targetPath = path.resolve(ROOT, options.targets);
    const header = [
      "sequence",
      "word",
      "appKorean",
      "appPart",
      "appCategory",
      "appLevel",
      "naverManualStatus",
      "naverManualMeaning",
      "naverDecision",
    ];
    const rows = missing.map((entry, index) => [
      index + 1,
      entry.word,
      "",
      entry.parts.join(" / "),
      "Oxford 5000 C1 \uACE0\uB4F1 \uC2EC\uD654",
      4,
      "\uB300\uAE30",
      "",
      "",
    ]);
    const csv = [header, ...rows].map((row) => row.map(escapeCsv).join(",")).join("\n");
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.writeFileSync(targetPath, `\uFEFF${csv}\n`, "utf8");
  }

  process.stdout.write(
    `${JSON.stringify(
      {
        extracted: result.extracted,
        dictionaryTotal: result.dictionaryTotal,
        c1Present: result.c1Present,
        c1Missing: result.c1Missing,
        c1WeakMeaning: result.c1WeakMeaning,
        output: options.output || null,
        targets: options.targets || null,
      },
      null,
      2
    )}\n`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
