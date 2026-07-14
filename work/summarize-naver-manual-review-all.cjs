const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const INPUT_CSV = path.join(ROOT, "outputs", "naver-manual-review-all.csv");
const OUTPUT_JSON = path.join(ROOT, "outputs", "naver-manual-review-all-progress.json");
const OUTPUT_MD = path.join(ROOT, "outputs", "naver-manual-review-all-progress.md");

const DECISION_APPROVED = "\uD655\uC778";
const DECISION_REVISED = "\uC218\uC815";
const DECISION_HOLD = "\uBCF4\uB958";
const DECISION_EMPTY = "\uBBF8\uC785\uB825";

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

function normalizeDecision(value) {
  const text = String(value || "").trim();
  if (!text) return DECISION_EMPTY;
  if (text === "?뺤씤") return DECISION_APPROVED;
  if (text === "?섏젙") return DECISION_REVISED;
  if (text === "蹂대쪟") return DECISION_HOLD;
  return text;
}

if (!fs.existsSync(INPUT_CSV)) {
  throw new Error(`Missing ${INPUT_CSV}. Run work/export-naver-manual-review-all.cjs first.`);
}

const rows = parseCsv(fs.readFileSync(INPUT_CSV, "utf8"));
const reviewed = rows.filter((row) => normalizeDecision(row.naverDecision) !== DECISION_EMPTY);
const approved = rows.filter((row) => normalizeDecision(row.naverDecision) === DECISION_APPROVED);
const revised = rows.filter((row) => normalizeDecision(row.naverDecision) === DECISION_REVISED);
const hold = rows.filter((row) => normalizeDecision(row.naverDecision) === DECISION_HOLD);
const pending = rows.length - reviewed.length;

const byDecision = rows.reduce((counts, row) => {
  const key = normalizeDecision(row.naverDecision);
  counts[key] = (counts[key] ?? 0) + 1;
  return counts;
}, {});

const byAudience = rows.reduce((counts, row) => {
  const key = row.appAudience || "unknown";
  counts[key] = (counts[key] ?? 0) + 1;
  return counts;
}, {});

const summary = {
  generatedAt: new Date().toISOString(),
  total: rows.length,
  reviewed: reviewed.length,
  pending,
  progressPercent: rows.length ? Number(((reviewed.length / rows.length) * 100).toFixed(2)) : 0,
  approved: approved.length,
  revised: revised.length,
  hold: hold.length,
  byDecision,
  byAudience,
};

fs.writeFileSync(OUTPUT_JSON, JSON.stringify({ summary }, null, 2), "utf8");

const decisionLines = Object.entries(byDecision)
  .sort((left, right) => right[1] - left[1])
  .map(([name, count]) => `| ${name} | ${count} |`)
  .join("\n");

const audienceLines = Object.entries(byAudience)
  .sort((left, right) => right[1] - left[1])
  .map(([name, count]) => `| ${name} | ${count} |`)
  .join("\n");

const reviewSamples = rows
  .filter((row) => normalizeDecision(row.naverDecision) !== DECISION_EMPTY)
  .slice(0, 40)
  .map(
    (row) =>
      `| ${row.sequence} | ${row.word} | ${row.appKorean} | ${row.naverManualMeaning} | ${normalizeDecision(row.naverDecision)} |`
  )
  .join("\n");

const md = `# 네이버 사전 수동 검수 진행률
생성 시각: ${new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}

## 요약

| 항목 | 값 |
|---|---:|
| 전체 대상 | ${summary.total} |
| 검수 완료 | ${summary.reviewed} |
| 검수 대기 | ${summary.pending} |
| 진행률 | ${summary.progressPercent}% |
| 확인 | ${summary.approved} |
| 수정 | ${summary.revised} |
| 보류 | ${summary.hold} |

## 결정별 집계

| 결정 | 개수 |
|---|---:|
${decisionLines}

## 대상 분포

| 분류 | 개수 |
|---|---:|
${audienceLines}

## 검수 완료 샘플

| 순서 | 단어 | 앱 뜻 | 네이버 기준 뜻 | 결정 |
|---:|---|---|---|---|
${reviewSamples || "| - | - | - | - | - |"}
`;

fs.writeFileSync(OUTPUT_MD, md, "utf8");

console.log(JSON.stringify({ summary, outputs: { json: OUTPUT_JSON, report: OUTPUT_MD } }, null, 2));
