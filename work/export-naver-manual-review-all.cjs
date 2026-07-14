const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TARGETS_JSON = path.join(ROOT, "outputs", "external-validation-targets.json");
const LEVEL4_JSON = path.join(ROOT, "outputs", "level4-external-validation.json");
const MINISTRY_JSON = path.join(ROOT, "outputs", "ministry-highschool-3000-validation.json");
const OUTPUT_CSV = path.join(ROOT, "outputs", "naver-manual-review-all.csv");
const OUTPUT_JSON = path.join(ROOT, "outputs", "naver-manual-review-all.json");
const OUTPUT_MD = path.join(ROOT, "outputs", "naver-manual-review-all-report.md");
const BATCH_DIR = path.join(ROOT, "outputs", "naver-manual-review-all-batches");
const BATCH_SIZE = 500;

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function csvEscape(value) {
  const text = String(value ?? "");
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function readJson(file, fallback) {
  if (!fs.existsSync(file)) return fallback;
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function writeCsv(file, columns, rows) {
  const csv = [
    columns.join(","),
    ...rows.map((row) =>
      columns
        .map((column) => csvEscape(Array.isArray(row[column]) ? row[column].join("|") : row[column]))
        .join(",")
    ),
  ].join("\n");
  fs.writeFileSync(file, csv, "utf8");
}

function buildPriorityRank(row) {
  if (row.educationPriority <= 3000) return row.educationPriority;
  if (row.audience === "business") return 3000 + row.index;
  if (row.audience === "middle-high-candidate") return 5000 + row.index;
  if (row.audience === "advanced-or-bank") return 7000 + row.index;
  return 9000 + row.index;
}

const targets = readJson(TARGETS_JSON, { rows: [] });
const level4 = readJson(LEVEL4_JSON, { rows: [] });
const ministry = readJson(MINISTRY_JSON, { rows: [] });

const level4ByWord = new Map(level4.rows.map((row) => [String(row.word).toLowerCase(), row]));
const ministryByWord = new Map(ministry.rows.map((row) => [String(row.word).toLowerCase(), row]));

const rows = targets.rows
  .map((entry) => {
    const key = String(entry.word).toLowerCase();
    const level4Row = level4ByWord.get(key);
    const ministryRow = ministryByWord.get(key);
    const educationPriority = ministryRow?.targetOrder ?? 999999;
    const priorityRank = buildPriorityRank({
      educationPriority,
      audience: entry.audience,
      index: entry.index,
    });

    return {
      sequence: 0,
      priorityRank,
      educationPriority,
      appIndex: entry.index,
      word: entry.word,
      appKorean: entry.korean,
      appPart: entry.part,
      appCategory: entry.category,
      appLevel: entry.level,
      appAudience: entry.audience,
      hasSenses: Boolean(entry.hasSenses),
      hasInflections: Boolean(entry.hasInflections),
      hasStructure: Boolean(entry.hasStructure),
      exampleCount: Number(entry.exampleCount ?? 0),
      definition: entry.definition ?? "",
      keywords: Array.isArray(entry.keywords) ? entry.keywords : [],
      autoValidationStatus: level4Row?.validationStatus ?? ministryRow?.sourceStatus ?? "not-checked",
      dictionaryApiExists: level4Row?.dictionaryApiExists ?? ministryRow?.dictionaryApiExists ?? false,
      oxfordLevels: level4Row?.oxfordLevels ?? ministryRow?.oxfordLevels ?? [],
      naverUrl: `https://en.dict.naver.com/#/search?query=${encodeURIComponent(entry.word)}`,
      naverManualStatus: "대기",
      naverManualMeaning: "",
      naverDecision: "",
      reviewerMemo: "",
    };
  })
  .sort((left, right) => {
    return (
      left.priorityRank - right.priorityRank ||
      left.appLevel - right.appLevel ||
      left.word.localeCompare(right.word)
    );
  })
  .map((row, index) => ({
    ...row,
    sequence: index + 1,
  }));

const columns = [
  "sequence",
  "educationPriority",
  "appIndex",
  "word",
  "appKorean",
  "appPart",
  "appCategory",
  "appLevel",
  "appAudience",
  "hasSenses",
  "hasInflections",
  "hasStructure",
  "exampleCount",
  "autoValidationStatus",
  "dictionaryApiExists",
  "oxfordLevels",
  "naverUrl",
  "naverManualStatus",
  "naverManualMeaning",
  "naverDecision",
  "reviewerMemo",
  "definition",
  "keywords",
];

writeCsv(OUTPUT_CSV, columns, rows);

ensureDir(BATCH_DIR);
for (const existing of fs.readdirSync(BATCH_DIR)) {
  fs.unlinkSync(path.join(BATCH_DIR, existing));
}

const batchFiles = [];
for (let start = 0; start < rows.length; start += BATCH_SIZE) {
  const batchRows = rows.slice(start, start + BATCH_SIZE);
  const batchNo = Math.floor(start / BATCH_SIZE) + 1;
  const fileName = `naver-manual-review-all-batch-${String(batchNo).padStart(2, "0")}.csv`;
  const filePath = path.join(BATCH_DIR, fileName);
  writeCsv(filePath, columns, batchRows);
  batchFiles.push({
    batchNo,
    fileName,
    from: batchRows[0]?.sequence ?? 0,
    to: batchRows[batchRows.length - 1]?.sequence ?? 0,
    count: batchRows.length,
  });
}

const summary = {
  generatedAt: new Date().toISOString(),
  total: rows.length,
  educationTop3000: rows.filter((row) => row.educationPriority <= 3000).length,
  businessWords: rows.filter((row) => row.appAudience === "business").length,
  middleHighCandidates: rows.filter((row) => row.appAudience === "middle-high-candidate").length,
  advancedOrBank: rows.filter((row) => row.appAudience === "advanced-or-bank").length,
  autoPass: rows.filter((row) => row.autoValidationStatus === "auto-pass").length,
  sourceFound: rows.filter((row) => row.autoValidationStatus === "source-found").length,
  manualReview: rows.filter((row) => row.autoValidationStatus === "manual-review").length,
  notChecked: rows.filter((row) => row.autoValidationStatus === "not-checked").length,
  batchSize: BATCH_SIZE,
  batchCount: batchFiles.length,
};

fs.writeFileSync(
  OUTPUT_JSON,
  JSON.stringify(
    {
      summary,
      batchFiles,
      rows,
    },
    null,
    2
  ),
  "utf8"
);

const batchLines = batchFiles
  .map((file) => `| ${file.batchNo} | ${file.from} | ${file.to} | ${file.count} | ${file.fileName} |`)
  .join("\n");

const sampleLines = rows
  .slice(0, 40)
  .map(
    (row) =>
      `| ${row.sequence} | ${row.word} | ${row.appKorean} | ${row.appPart} | ${row.appLevel} | ${row.appAudience} | ${row.autoValidationStatus} |`
  )
  .join("\n");

const md = `# 네이버 사전 수동 검수표 생성 결과
생성 시각: ${new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}

## 요약

| 항목 | 개수 |
|---|---:|
| 전체 검수 대상 | ${summary.total} |
| 교육부 우선 3000개 | ${summary.educationTop3000} |
| 업무 영어 | ${summary.businessWords} |
| 중고등 후보 | ${summary.middleHighCandidates} |
| 고급/어휘 뱅크 | ${summary.advancedOrBank} |
| 기존 자동 통과 | ${summary.autoPass} |
| 기존 출처 확인 | ${summary.sourceFound} |
| 기존 수동 확인 필요 | ${summary.manualReview} |
| 기존 미검증 | ${summary.notChecked} |
| 분할 검수표 수 | ${summary.batchCount} |

## 분할 검수표

| 배치 | 시작 | 끝 | 개수 | 파일 |
|---:|---:|---:|---:|---|
${batchLines}

## 검수 시작 샘플

| 순서 | 단어 | 앱 뜻 | 품사 | 레벨 | 대상 | 기존 상태 |
|---:|---|---|---|---:|---|---|
${sampleLines}

## 산출물
- 전체 마스터 CSV: \`outputs/naver-manual-review-all.csv\`
- 전체 JSON: \`outputs/naver-manual-review-all.json\`
- 배치 폴더: \`outputs/naver-manual-review-all-batches/\`
`;

fs.writeFileSync(OUTPUT_MD, md, "utf8");

console.log(
  JSON.stringify(
    {
      summary,
      outputs: {
        csv: OUTPUT_CSV,
        json: OUTPUT_JSON,
        report: OUTPUT_MD,
        batches: BATCH_DIR,
      },
    },
    null,
    2
  )
);
