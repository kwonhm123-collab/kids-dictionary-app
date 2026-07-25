const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { pathToFileURL } = require("url");

const ROOT = process.cwd();
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

const DEFAULT_PDFS = [
  path.join(process.env.USERPROFILE || "", "Downloads", "American_Oxford_3000_by_CEFR_level.pdf"),
  path.join(process.env.USERPROFILE || "", "Downloads", "American_Oxford_5000_by_CEFR_level.pdf"),
];

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
  "manual-oxford-pdf-additions.js",
  "manual-phrase-additions.js",
  "manual-excluded-words.js",
  "manual-proper-noun-overrides.js",
  "naver-pronunciation-overrides.js",
  "manual-high-school-pronunciation-overrides.js",
  "manual-pronunciation-overrides.js",
];

function parseArgs(argv) {
  const options = {
    output: path.join("outputs", "oxford-pdf-coverage-audit.json"),
    targets: path.join("outputs", "oxford-pdf-missing-targets.csv"),
    pdfs: DEFAULT_PDFS,
  };
  argv.forEach((arg) => {
    const [key, ...valueParts] = arg.split("=");
    const value = valueParts.join("=");
    if (key === "--output") options.output = value;
    if (key === "--targets") options.targets = value;
    if (key === "--pdf") options.pdfs.push(path.resolve(value));
    if (key === "--pdfs") options.pdfs = value.split(";").map((item) => path.resolve(item.trim())).filter(Boolean);
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
    .replace(/[’‘]/g, "'")
    .trim()
    .toLowerCase();
}

function normalizePart(value) {
  const normalized = String(value || "").toLowerCase().replace(/\s+/g, "");
  const parts = [];
  if (normalized.includes("n.")) parts.push("명사");
  if (normalized.includes("v.")) parts.push("동사");
  if (normalized.includes("adj.")) parts.push("형용사");
  if (normalized.includes("adv.")) parts.push("부사");
  if (normalized.includes("prep.")) parts.push("전치사");
  if (normalized.includes("conj.")) parts.push("접속사");
  if (normalized.includes("pron.")) parts.push("대명사");
  if (normalized.includes("det.")) parts.push("한정사");
  return parts.length ? [...new Set(parts)].join(", ") : value;
}

function cefrToLevel(level) {
  return { A1: 1, A2: 1, B1: 2, B2: 3, C1: 4 }[level] || 4;
}

function sourceToCategory(source, level) {
  const listName = /3000/i.test(source) ? "Oxford 3000" : "Oxford 5000";
  return `${listName} ${level} 보강`;
}

async function extractPdfEntries(pdfPath) {
  if (!fs.existsSync(pdfPath)) {
    throw new Error(`PDF not found: ${pdfPath}`);
  }
  if (!fs.existsSync(PDFJS_PATH)) {
    throw new Error(`pdfjs-dist not found: ${PDFJS_PATH}`);
  }

  global.DOMMatrix = global.DOMMatrix || class DOMMatrix {};
  global.ImageData = global.ImageData || class ImageData {};
  global.Path2D = global.Path2D || class Path2D {};

  const pdfjs = await import(pathToFileURL(PDFJS_PATH).href);
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const pdf = await pdfjs.getDocument({ data }).promise;
  const partPattern = /^(?:n|v|adj|adv|prep|conj|pron|det)\.(?:(?:,|\/)\s*(?:n|v|adj|adv|prep|conj|pron|det)\.)*$/i;
  const levelPattern = /^(?:A1|A2|B1|B2|C1)$/;
  const entries = [];
  let level = "";

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    const tokens = content.items.map((item) => item.str.trim()).filter(Boolean);

    for (let index = 0; index < tokens.length; index += 1) {
      const token = tokens[index];
      if (levelPattern.test(token)) {
        level = token;
        continue;
      }
      if (!level || !partPattern.test(token)) continue;

      let wordIndex = index - 1;
      while (wordIndex >= 0 && /^(?:\d+|\(.*\)|\/.*\/)$/.test(tokens[wordIndex])) {
        wordIndex -= 1;
      }
      const word = normalizeHeadword(tokens[wordIndex]);
      if (!/^[a-z][a-z '-]*$/.test(word)) continue;
      entries.push({
        word,
        part: token,
        parts: [token],
        partKorean: normalizePart(token),
        level,
        appLevel: cefrToLevel(level),
        category: sourceToCategory(path.basename(pdfPath), level),
        source: path.basename(pdfPath),
        page: pageNumber,
      });
    }
  }

  return entries;
}

function mergeEntries(entries) {
  const merged = new Map();
  entries.forEach((entry) => {
    const key = `${entry.word}:${entry.level}`;
    const existing = merged.get(key);
    if (!existing) {
      merged.set(key, { ...entry, parts: [...entry.parts] });
      return;
    }
    entry.parts.forEach((part) => {
      if (!existing.parts.includes(part)) existing.parts.push(part);
    });
    existing.part = existing.parts.join(" / ");
    existing.partKorean = normalizePart(existing.part);
  });
  return [...merged.values()].sort((a, b) => a.word.localeCompare(b.word) || a.level.localeCompare(b.level));
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
  vm.runInContext(fs.readFileSync(path.join(DICTIONARY_DIR, "app.js"), "utf8"), context, {
    filename: path.join(DICTIONARY_DIR, "app.js"),
  });
  return vm.runInContext(
    "dictionary.map(({ word, korean, part, category, level }) => ({ word, korean, part, category, level }))",
    context
  );
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const extracted = mergeEntries((await Promise.all(options.pdfs.map(extractPdfEntries))).flat());
  const byWord = new Map();
  extracted.forEach((entry) => {
    const existing = byWord.get(entry.word);
    if (!existing || cefrToLevel(entry.level) > cefrToLevel(existing.level)) byWord.set(entry.word, entry);
  });
  const uniqueWords = [...byWord.values()].sort((a, b) => a.word.localeCompare(b.word));
  const dictionary = loadDictionary();
  const dictionaryWords = new Set(dictionary.map((entry) => normalizeHeadword(entry.word)));
  const missing = uniqueWords.filter((entry) => !dictionaryWords.has(entry.word));
  const present = uniqueWords.filter((entry) => dictionaryWords.has(entry.word));
  const byLevel = {};
  uniqueWords.forEach((entry) => {
    byLevel[entry.level] = byLevel[entry.level] || { total: 0, present: 0, missing: 0 };
    byLevel[entry.level].total += 1;
    byLevel[entry.level][dictionaryWords.has(entry.word) ? "present" : "missing"] += 1;
  });

  const result = {
    generatedAt: new Date().toISOString(),
    sources: options.pdfs,
    extractedRows: extracted.length,
    uniqueWords: uniqueWords.length,
    dictionaryTotal: dictionary.length,
    present: present.length,
    missing: missing.length,
    byLevel,
    missingWords: missing,
  };

  if (options.output) {
    const outputPath = path.resolve(ROOT, options.output);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
  }
  if (options.targets) {
    const targetPath = path.resolve(ROOT, options.targets);
    const header = ["sequence", "word", "part", "level", "appLevel", "category", "source", "page"];
    const rows = missing.map((entry, index) => [
      index + 1,
      entry.word,
      entry.partKorean,
      entry.level,
      entry.appLevel,
      entry.category,
      entry.source,
      entry.page,
    ]);
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.writeFileSync(
      targetPath,
      `\uFEFF${[header, ...rows].map((row) => row.map(escapeCsv).join(",")).join("\n")}\n`,
      "utf8"
    );
  }

  process.stdout.write(
    `${JSON.stringify(
      {
        uniqueWords: result.uniqueWords,
        dictionaryTotal: result.dictionaryTotal,
        present: result.present,
        missing: result.missing,
        byLevel: result.byLevel,
        output: options.output,
        targets: options.targets,
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
