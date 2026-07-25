const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TARGET_CSV = path.join(ROOT, "outputs", "oxford-pdf-missing-targets.csv");
const OUTPUT_JS = path.join(ROOT, "outputs", "kids-dictionary", "manual-oxford-pdf-additions.js");
const HELD_JSON = path.join(ROOT, "outputs", "oxford-pdf-held-additions.json");
const BATCH_PATTERN = /^oxford-pdf-missing-naver-batch-\d{3}\.json$/;

const MANUAL_FALLBACKS = {
  ideology: {
    korean: "이념, 관념 체계",
    memo: "manual fallback after Naver automatic lookup returned no usable meaning",
  },
};

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
      if (char === "\r" && next === "\n") index += 1;
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
    .map((line) => Object.fromEntries(header.map((name, index) => [name.replace(/^\uFEFF/, ""), line[index] ?? ""])));
}

function cleanMeaning(value) {
  return String(value || "")
    .replace(/\s*\/\s*/g, ", ")
    .replace(/\s+/g, " ")
    .replace(/\s+,/g, ",")
    .trim();
}

function readNaverRows() {
  const outputDir = path.join(ROOT, "outputs");
  const rows = [];
  for (const file of fs.readdirSync(outputDir)) {
    if (!BATCH_PATTERN.test(file)) continue;
    const payload = JSON.parse(fs.readFileSync(path.join(outputDir, file), "utf8"));
    rows.push(...(payload.rows || []));
  }
  return rows;
}

function main() {
  const targets = parseCsv(fs.readFileSync(TARGET_CSV, "utf8").replace(/^\uFEFF/, ""));
  const targetBySequence = new Map(targets.map((row) => [Number(row.sequence), row]));
  const naverBySequence = new Map(readNaverRows().map((row) => [Number(row.sequence), row]));
  const additions = [];
  const held = [];

  for (const target of targets) {
    const sequence = Number(target.sequence);
    const word = String(target.word || "").trim().toLowerCase();
    const naver = naverBySequence.get(sequence);
    const fallback = MANUAL_FALLBACKS[word];
    const korean = cleanMeaning(naver?.naverManualMeaning || fallback?.korean || "");
    if (!word || !korean) {
      held.push({ ...target, reason: "no usable Korean meaning from Naver automatic lookup" });
      continue;
    }

    additions.push({
      sequence,
      word,
      korean,
      part: target.part || "단어",
      category: target.category || `Oxford ${target.level || ""} 보강`,
      level: Number(target.appLevel || 4),
      source: target.source,
      cefr: target.level,
      naverEntry: naver?.matchedEntry || "",
      memo: fallback?.memo || "Naver automatic lookup",
    });
  }

  const additionArray = additions.map((entry) => [
    entry.word,
    entry.korean,
    entry.part,
    entry.category,
    entry.level,
  ]);

  const js = [
    "window.manualDictionaryAdditions = [",
    "  ...(window.manualDictionaryAdditions || []),",
    ...additionArray.map((entry) => `  ${JSON.stringify(entry)},`),
    "];",
    "",
    "window.oxfordPdfAdditionMeta = {",
    `  generatedAt: ${JSON.stringify(new Date().toISOString())},`,
    `  source: "American Oxford 3000/5000 by CEFR level PDFs",`,
    `  added: ${additions.length},`,
    `  held: ${held.length},`,
    "};",
    "",
  ].join("\n");

  fs.writeFileSync(OUTPUT_JS, js, "utf8");
  fs.writeFileSync(
    HELD_JSON,
    `${JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        totalTargets: targets.length,
        added: additions.length,
        held: held.length,
        heldWords: held,
        targetSequencesMissingFromNaver: targets
          .filter((row) => !naverBySequence.has(Number(row.sequence)) && !MANUAL_FALLBACKS[String(row.word || "").toLowerCase()])
          .map((row) => Number(row.sequence)),
        targetBySequenceCount: targetBySequence.size,
      },
      null,
      2
    )}\n`,
    "utf8"
  );

  console.log(
    JSON.stringify(
      {
        output: path.relative(ROOT, OUTPUT_JS),
        heldOutput: path.relative(ROOT, HELD_JSON),
        targets: targets.length,
        added: additions.length,
        held: held.length,
      },
      null,
      2
    )
  );
}

main();
