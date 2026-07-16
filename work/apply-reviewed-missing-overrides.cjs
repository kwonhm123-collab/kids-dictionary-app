const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = process.cwd();
const INPUT_CSV = path.join(ROOT, "outputs", "naver-missing-review-targets.csv");
const OVERRIDES_JS = path.join(ROOT, "outputs", "kids-dictionary", "verified-meaning-overrides.js");
const SUPPLEMENT_JS = path.join(ROOT, "outputs", "kids-dictionary", "verified-bank-supplement.js");

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        cell += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (!inQuotes && char === ",") {
      row.push(cell);
      cell = "";
      continue;
    }

    if (!inQuotes && (char === "\n" || char === "\r")) {
      if (char === "\r" && next === "\n") {
        index += 1;
      }
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
      continue;
    }

    cell += char;
  }

  if (cell.length || row.length) {
    row.push(cell);
    rows.push(row);
  }

  const [header, ...body] = rows;
  return body
    .filter((line) => line.length && line.some((value) => value !== ""))
    .map((line) => Object.fromEntries(header.map((name, index) => [name, line[index] ?? ""])));
}

function loadWindowObject(file, key) {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(file, "utf8"), context);
  return context.window[key] || {};
}

function cleanMeaningText(text) {
  return String(text || "")
    .replace(/\(→[^)]*\)/g, " ")
    .replace(/\([^)]*미사[^)]*\)/g, " ")
    .replace(/\([^)]*영화[^)]*\)/g, " ")
    .replace(/\s*\/\s*/g, ", ")
    .replace(/\s*;\s*/g, ", ")
    .replace(/\s+/g, " ")
    .replace(/\s+,/g, ",")
    .trim()
    .replace(/[,.]$/g, "")
    .trim();
}

function normalizePart(part) {
  const text = String(part || "").trim();
  return text || "단어";
}

function chooseOverride(row) {
  const decision = String(row.naverDecision || "").trim();
  const appKorean = String(row.appKorean || "").trim();
  const naverMeaning = cleanMeaningText(row.naverManualMeaning);

  if (decision === "보류") {
    return "";
  }
  if (decision === "확인") {
    return appKorean || naverMeaning;
  }
  if (decision === "수정") {
    return naverMeaning || appKorean;
  }
  return "";
}

function sortObjectEntries(object) {
  return Object.fromEntries(Object.entries(object).sort((left, right) => left[0].localeCompare(right[0])));
}

function writeOverrides(file, object) {
  const fileText = [
    "window.verifiedMeaningOverrides = Object.assign(",
    "  window.verifiedMeaningOverrides || {},",
    `  ${JSON.stringify(sortObjectEntries(object), null, 2)}`,
    ");",
    "",
  ].join("\n");
  fs.writeFileSync(file, fileText, "utf8");
}

function writeSupplement(file, object) {
  const fileText = [
    "window.verifiedBankSupplement = Object.assign(",
    "  window.verifiedBankSupplement || {},",
    `  ${JSON.stringify(sortObjectEntries(object), null, 2)}`,
    ");",
    "",
  ].join("\n");
  fs.writeFileSync(file, fileText, "utf8");
}

if (!fs.existsSync(INPUT_CSV)) {
  throw new Error(`Missing ${INPUT_CSV}`);
}
if (!fs.existsSync(OVERRIDES_JS)) {
  throw new Error(`Missing ${OVERRIDES_JS}`);
}
if (!fs.existsSync(SUPPLEMENT_JS)) {
  throw new Error(`Missing ${SUPPLEMENT_JS}`);
}

const rows = parseCsv(fs.readFileSync(INPUT_CSV, "utf8").replace(/^\uFEFF/, ""));
const currentOverrides = loadWindowObject(OVERRIDES_JS, "verifiedMeaningOverrides");
const currentSupplement = loadWindowObject(SUPPLEMENT_JS, "verifiedBankSupplement");

let addedOverrides = 0;
let updatedOverrides = 0;
let addedSupplement = 0;
let updatedSupplement = 0;
let skippedHold = 0;

for (const row of rows) {
  const word = String(row.word || "").trim().toLowerCase();
  if (!word) continue;

  const override = chooseOverride(row);
  if (!override) {
    skippedHold += 1;
    continue;
  }

  if (currentOverrides[word] !== override) {
    if (Object.prototype.hasOwnProperty.call(currentOverrides, word)) {
      updatedOverrides += 1;
    } else {
      addedOverrides += 1;
    }
    currentOverrides[word] = override;
  }

  const nextSupplement = [override, normalizePart(row.appPart)];
  const existingSupplement = currentSupplement[word];
  const sameSupplement =
    Array.isArray(existingSupplement) &&
    existingSupplement.length >= 2 &&
    existingSupplement[0] === nextSupplement[0] &&
    existingSupplement[1] === nextSupplement[1];

  if (!sameSupplement) {
    if (Array.isArray(existingSupplement)) {
      updatedSupplement += 1;
    } else {
      addedSupplement += 1;
    }
    currentSupplement[word] = nextSupplement;
  }
}

writeOverrides(OVERRIDES_JS, currentOverrides);
writeSupplement(SUPPLEMENT_JS, currentSupplement);

console.log(
  JSON.stringify(
    {
      reviewedRows: rows.length,
      skippedHold,
      overrides: {
        total: Object.keys(currentOverrides).length,
        added: addedOverrides,
        updated: updatedOverrides,
      },
      supplement: {
        total: Object.keys(currentSupplement).length,
        added: addedSupplement,
        updated: updatedSupplement,
      },
      files: {
        overrides: OVERRIDES_JS,
        supplement: SUPPLEMENT_JS,
      },
    },
    null,
    2
  )
);
