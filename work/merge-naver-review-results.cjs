const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const MASTER_CSV = path.join(ROOT, "outputs", "naver-manual-review-all.csv");
const BATCH_DIR = path.join(ROOT, "outputs", "naver-manual-review-all-batches");
const BATCH_SIZE = 500;
const STATUS_PENDING = "\uB300\uAE30";

function csvEscape(value) {
  const text = String(value ?? "");
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

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
  return {
    header,
    rows: body
      .filter((line) => line.length && line.some((value) => value !== ""))
      .map((line) => Object.fromEntries(header.map((name, index) => [name, line[index] ?? ""]))),
  };
}

function writeCsv(file, columns, rows) {
  const csv = [
    columns.join(","),
    ...rows.map((row) => columns.map((column) => csvEscape(row[column])).join(",")),
  ].join("\n");
  fs.writeFileSync(file, csv, "utf8");
}

function normalizeStatus(value) {
  const text = String(value || "").trim();
  if (!text || text === "??疫?" || text === STATUS_PENDING) {
    return STATUS_PENDING;
  }
  return text;
}

function loadUpdates(file) {
  const payload = JSON.parse(fs.readFileSync(file, "utf8").replace(/^\uFEFF/, ""));
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.rows)) return payload.rows;
  throw new Error("Update JSON must be an array or an object with rows.");
}

if (!fs.existsSync(MASTER_CSV)) {
  throw new Error(`Missing ${MASTER_CSV}`);
}

const updateFile = process.argv[2];
if (!updateFile) {
  throw new Error("Usage: node work/merge-naver-review-results.cjs <updates.json>");
}

const updatesPath = path.resolve(ROOT, updateFile);
if (!fs.existsSync(updatesPath)) {
  throw new Error(`Missing ${updatesPath}`);
}

const parsed = parseCsv(fs.readFileSync(MASTER_CSV, "utf8"));
const updates = loadUpdates(updatesPath);
const updateBySequence = new Map(
  updates
    .filter((item) => item && item.sequence != null)
    .map((item) => [String(item.sequence), item])
);

let changed = 0;
for (const row of parsed.rows) {
  row.naverManualStatus = normalizeStatus(row.naverManualStatus);
  const update = updateBySequence.get(String(row.sequence));
  if (!update) continue;
  row.naverManualStatus = update.naverManualStatus ?? row.naverManualStatus ?? STATUS_PENDING;
  row.naverManualMeaning = update.naverManualMeaning ?? row.naverManualMeaning ?? "";
  row.naverDecision = update.naverDecision ?? row.naverDecision ?? "";
  row.reviewerMemo = update.reviewerMemo ?? row.reviewerMemo ?? "";
  changed += 1;
}

writeCsv(MASTER_CSV, parsed.header, parsed.rows);

for (let start = 0; start < parsed.rows.length; start += BATCH_SIZE) {
  const batchRows = parsed.rows.slice(start, start + BATCH_SIZE);
  const batchNo = Math.floor(start / BATCH_SIZE) + 1;
  const batchFile = path.join(
    BATCH_DIR,
    `naver-manual-review-all-batch-${String(batchNo).padStart(2, "0")}.csv`
  );
  writeCsv(batchFile, parsed.header, batchRows);
}

console.log(
  JSON.stringify(
    {
      updatedRows: changed,
      masterCsv: MASTER_CSV,
      batchDir: BATCH_DIR,
      updateFile: updatesPath,
    },
    null,
    2
  )
);
