const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const INPUT_JSON = path.join(ROOT, "outputs", "naver-bulk-fix-safe-candidates.json");
const OUTPUT_JS = path.join(ROOT, "outputs", "kids-dictionary", "verified-bank-supplement.js");

if (!fs.existsSync(INPUT_JSON)) {
  throw new Error(`Missing ${INPUT_JSON}. Run work/classify-naver-review-issues.cjs first.`);
}

const payload = JSON.parse(fs.readFileSync(INPUT_JSON, "utf8"));
const rows = Array.isArray(payload.rows) ? payload.rows : [];
const supplement = {};

for (const row of rows) {
  const word = String(row.word || "").trim().toLowerCase();
  const korean = String(row.suggestedKorean || "").trim();
  const part = String(row.appPart || row.part || "\uB2E8\uC5B4").trim() || "\uB2E8\uC5B4";
  if (!word || !korean) continue;
  if (!Array.isArray(supplement[word])) {
    supplement[word] = [korean, part];
  }
}

const sortedEntries = Object.fromEntries(
  Object.entries(supplement).sort((left, right) => left[0].localeCompare(right[0]))
);

const fileText = [
  "window.verifiedBankSupplement = Object.assign(",
  "  window.verifiedBankSupplement || {},",
  `  ${JSON.stringify(sortedEntries, null, 2)}`,
  ");",
  "",
].join("\n");

fs.writeFileSync(OUTPUT_JS, fileText, "utf8");

console.log(
  JSON.stringify(
    {
      count: Object.keys(sortedEntries).length,
      output: OUTPUT_JS,
    },
    null,
    2
  )
);
