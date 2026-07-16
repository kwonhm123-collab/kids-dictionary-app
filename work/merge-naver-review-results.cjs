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

const extraArgs = process.argv.slice(2);
const updateFile = extraArgs.find((arg) => !arg.startsWith("--"));
if (!updateFile) {
  throw new Error("Usage: node work/merge-naver-review-results.cjs <updates.json> [--master=...] [--batch-dir=...] [--batch-size=...]");
}

const masterArg = extraArgs.find((arg) => arg.startsWith("--master="));
const batchDirArg = extraArgs.find((arg) => arg.startsWith("--batch-dir="));
const batchSizeArg = extraArgs.find((arg) => arg.startsWith("--batch-size="));

const masterCsv = masterArg ? path.resolve(ROOT, masterArg.slice("--master=".length)) : MASTER_CSV;
const batchDir = batchDirArg ? path.resolve(ROOT, batchDirArg.slice("--batch-dir=".length)) : BATCH_DIR;
const batchSize = batchSizeArg ? Number(batchSizeArg.slice("--batch-size=".length)) : BATCH_SIZE;

if (!fs.existsSync(masterCsv)) {
  throw new Error(`Missing ${masterCsv}`);
}
if (!Number.isFinite(batchSize) || batchSize < 1) {
  throw new Error(`Invalid batch size: ${batchSizeArg}`);
}

const updatesPath = path.resolve(ROOT, updateFile);
if (!fs.existsSync(updatesPath)) {
  throw new Error(`Missing ${updatesPath}`);
}

const parsed = parseCsv(fs.readFileSync(masterCsv, "utf8"));
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

writeCsv(masterCsv, parsed.header, parsed.rows);

fs.mkdirSync(batchDir, { recursive: true });

for (let start = 0; start < parsed.rows.length; start += batchSize) {
  const batchRows = parsed.rows.slice(start, start + batchSize);
  const batchNo = Math.floor(start / batchSize) + 1;
  const batchFile = path.join(
    batchDir,
    `naver-manual-review-all-batch-${String(batchNo).padStart(2, "0")}.csv`
  );
  writeCsv(batchFile, parsed.header, batchRows);
}

console.log(
  JSON.stringify(
    {
      updatedRows: changed,
      masterCsv,
      batchDir,
      updateFile: updatesPath,
    },
    null,
    2
  )
);
