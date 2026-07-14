const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const INPUT_JSON = path.join(ROOT, "outputs", "naver-bulk-fix-safe-candidates.json");
const OUTPUT_JS = path.join(ROOT, "outputs", "kids-dictionary", "verified-meaning-overrides.js");

if (!fs.existsSync(INPUT_JSON)) {
  throw new Error(`Missing ${INPUT_JSON}. Run work/classify-naver-review-issues.cjs first.`);
}

const payload = JSON.parse(fs.readFileSync(INPUT_JSON, "utf8"));
const rows = Array.isArray(payload.rows) ? payload.rows : [];
const overrides = {};

for (const row of rows) {
  const word = String(row.word || "").trim().toLowerCase();
  const suggested = String(row.suggestedKorean || "").trim();
  if (!word || !suggested) continue;
  if (!overrides[word]) {
    overrides[word] = suggested;
  }
}

const sortedEntries = Object.fromEntries(
  Object.entries(overrides).sort((left, right) => left[0].localeCompare(right[0]))
);

const fileText = [
  "window.verifiedMeaningOverrides = Object.assign(",
  "  window.verifiedMeaningOverrides || {},",
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
