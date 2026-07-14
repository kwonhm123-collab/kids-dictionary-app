const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const INPUT_CSV = path.join(ROOT, "outputs", "naver-manual-review-all.csv");
const OUT_SUMMARY_JSON = path.join(ROOT, "outputs", "naver-review-issue-patterns.json");
const OUT_SUMMARY_MD = path.join(ROOT, "outputs", "naver-review-issue-patterns.md");
const OUT_FIX_JSON = path.join(ROOT, "outputs", "naver-bulk-fix-candidates.json");
const OUT_FIX_CSV = path.join(ROOT, "outputs", "naver-bulk-fix-candidates.csv");
const OUT_FIX_SAFE_JSON = path.join(ROOT, "outputs", "naver-bulk-fix-safe-candidates.json");
const OUT_FIX_SAFE_CSV = path.join(ROOT, "outputs", "naver-bulk-fix-safe-candidates.csv");
const OUT_HOLD_JSON = path.join(ROOT, "outputs", "naver-hold-priority.json");
const OUT_HOLD_CSV = path.join(ROOT, "outputs", "naver-hold-priority.csv");

const DECISION_REVISED = "\uC218\uC815";
const DECISION_HOLD = "\uBCF4\uB958";
const DECISION_APPROVED = "\uD655\uC778";
const DECISION_EMPTY = "";

const PART_PROPER_NOUN = "\uACE0\uC720\uBA85\uC0AC";
const PHRASE_EXTRA_VOCAB = "\uAD00\uB828 \uCD94\uAC00 \uC601\uC5B4 \uC5B4\uD718";
const PHRASE_PROGRESSIVE = "\uD558\uB294 \uC911";
const PHRASE_INFINITIVE = "\uD558\uAE30";
const PHRASE_PLURAL = "\uBCF5\uC218";
const PHRASE_PAST = "\uACFC\uAC70\uD615";
const PHRASE_PAST_PARTICIPLE = "\uACFC\uAC70\uBD84\uC0AC";
const PHRASE_PRESENT_PARTICIPLE = "\uD604\uC7AC\uBD84\uC0AC";
const PHRASE_THIRD_PERSON = "3\uC778\uCE6D";
const PHRASE_PERSON = "\uC0AC\uB78C";
const PHRASE_THING = "\uAC83";
const PHRASE_PEOPLE = "\uB4E4";

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
  return body
    .filter((line) => line.length && line.some((value) => value !== ""))
    .map((line) => Object.fromEntries(header.map((name, index) => [name, line[index] ?? ""])));
}

function writeCsv(file, columns, rows) {
  const csv = [
    columns.join(","),
    ...rows.map((row) => columns.map((column) => csvEscape(row[column])).join(",")),
  ].join("\n");
  fs.writeFileSync(file, csv, "utf8");
}

function normalizeText(value) {
  return String(value || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\([^)]*\)/g, " ")
    .replace(/[;:[\]{}<>]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenizeKorean(value) {
  return normalizeText(value)
    .split(/[,\s/|]+/)
    .map((token) =>
      token
        .replace(/^[~\-]+|[~\-]+$/g, "")
        .replace(/(이다|하다|되다|적인|적인지|적인가|의|에|들|형|분사)$/g, "")
        .trim()
    )
    .filter((token) => token.length >= 1);
}

function firstGloss(naverMeaning) {
  const normalized = String(naverMeaning || "")
    .split(" / ")[0]
    .split(";")[0]
    .trim();
  return normalizeText(normalized)
    .replace(/[,.]$/g, "")
    .trim();
}

function detectInflection(text) {
  return (
    text.includes(PHRASE_PLURAL) ||
    text.includes(PHRASE_PAST) ||
    text.includes(PHRASE_PAST_PARTICIPLE) ||
    text.includes(PHRASE_PRESENT_PARTICIPLE) ||
    text.includes(PHRASE_THIRD_PERSON)
  );
}

function isShortToken(word) {
  return /^[a-z0-9.-]{1,3}$/i.test(word);
}

function isLikelyProperNoun(row) {
  return String(row.appPart || "").includes(PART_PROPER_NOUN);
}

function senseCount(naverMeaning) {
  return String(naverMeaning || "")
    .split(" / ")
    .map((item) => item.trim())
    .filter(Boolean).length;
}

function overlapStats(appKorean, naverMeaning) {
  const appTokens = Array.from(new Set(tokenizeKorean(appKorean)));
  const naverTokens = Array.from(new Set(tokenizeKorean(naverMeaning)));
  const matched = appTokens.filter((token) => naverTokens.some((naverToken) => naverToken.includes(token) || token.includes(naverToken)));
  return {
    appTokens,
    naverTokens,
    matched,
    overlapCount: matched.length,
  };
}

function buildSuggestion(row, primaryCategory) {
  const gloss = firstGloss(row.naverManualMeaning);
  if (!gloss) return "";

  if (
    primaryCategory === "placeholder_extra_vocab" ||
    primaryCategory === "generated_verb_noise" ||
    primaryCategory === "zero_overlap_rewrite" ||
    primaryCategory === "plural_gloss_noise" ||
    primaryCategory === "inflection_descriptor"
  ) {
    return gloss;
  }

  if (primaryCategory === "short_token_or_abbrev" && gloss.length <= 30) {
    return gloss;
  }

  return "";
}

function isSuggestionSafe(text) {
  const value = normalizeText(text);
  if (!value) return false;
  if (value.length > 40) return false;
  if (value.split(/\s+/).length > 6) return false;
  return true;
}

function classifyRow(row) {
  const decision = String(row.naverDecision || "").trim();
  const appKorean = String(row.appKorean || "").trim();
  const naverMeaning = String(row.naverManualMeaning || "").trim();
  const word = String(row.word || "").trim();
  const lowerWord = word.toLowerCase();
  const stats = overlapStats(appKorean, naverMeaning);
  const tags = [];

  if (appKorean.includes(PHRASE_EXTRA_VOCAB)) tags.push("placeholder_extra_vocab");
  if (appKorean.includes(PHRASE_PROGRESSIVE) || appKorean.includes(PHRASE_INFINITIVE)) {
    tags.push("generated_verb_noise");
  }
  if (detectInflection(appKorean) || detectInflection(naverMeaning)) {
    tags.push("inflection_descriptor");
  }
  if (lowerWord.endsWith("s") && (appKorean.includes(PHRASE_PEOPLE) || naverMeaning.includes(PHRASE_PLURAL))) {
    tags.push("plural_gloss_noise");
  }
  if (isShortToken(word)) tags.push("short_token_or_abbrev");
  if (isLikelyProperNoun(row)) tags.push("proper_noun");
  if (!naverMeaning) tags.push("empty_naver_meaning");
  if (stats.overlapCount === 0 && naverMeaning) tags.push("zero_overlap_rewrite");
  if (senseCount(naverMeaning) >= 3) tags.push("multi_sense");
  if (appKorean.includes(PHRASE_PERSON) || appKorean.includes(PHRASE_THING)) tags.push("generated_agentive_or_nominal");

  let primaryCategory = "manual_review_misc";
  const priority = [
    "placeholder_extra_vocab",
    "generated_verb_noise",
    "inflection_descriptor",
    "plural_gloss_noise",
    "empty_naver_meaning",
    "short_token_or_abbrev",
    "proper_noun",
    "zero_overlap_rewrite",
    "generated_agentive_or_nominal",
    "multi_sense",
  ];

  for (const candidate of priority) {
    if (tags.includes(candidate)) {
      primaryCategory = candidate;
      break;
    }
  }

  if (decision === DECISION_HOLD && primaryCategory === "manual_review_misc") {
    primaryCategory = "hold_manual_review";
  }

  const suggestedKorean = buildSuggestion(row, primaryCategory);

  const autoFixEligibleCategories = new Set([
    "placeholder_extra_vocab",
    "generated_verb_noise",
    "inflection_descriptor",
    "plural_gloss_noise",
    "zero_overlap_rewrite",
    "generated_agentive_or_nominal",
  ]);

  let confidence = "low";
  if (primaryCategory === "placeholder_extra_vocab" || primaryCategory === "generated_verb_noise") {
    confidence = "high";
  } else if (
    primaryCategory === "inflection_descriptor" ||
    primaryCategory === "plural_gloss_noise" ||
    primaryCategory === "zero_overlap_rewrite"
  ) {
    confidence = "medium";
  }

  const autoFixEligible =
    decision === DECISION_REVISED &&
    autoFixEligibleCategories.has(primaryCategory) &&
    Boolean(suggestedKorean);

  let bulkFixTier = "manual";
  if (autoFixEligible) {
    if (
      (primaryCategory === "placeholder_extra_vocab" || primaryCategory === "inflection_descriptor") &&
      isSuggestionSafe(suggestedKorean)
    ) {
      bulkFixTier = "safe";
    } else if (
      (primaryCategory === "generated_verb_noise" ||
        primaryCategory === "plural_gloss_noise" ||
        primaryCategory === "zero_overlap_rewrite") &&
      isSuggestionSafe(suggestedKorean)
    ) {
      bulkFixTier = "review";
    }
  }

  let holdPriorityScore = 0;
  if (decision === DECISION_HOLD) {
    holdPriorityScore += 50;
    if (primaryCategory === "empty_naver_meaning") holdPriorityScore += 50;
    if (primaryCategory === "short_token_or_abbrev") holdPriorityScore += 30;
    if (primaryCategory === "proper_noun") holdPriorityScore += 25;
    if (tags.includes("multi_sense")) holdPriorityScore += 15;
    if (tags.includes("zero_overlap_rewrite")) holdPriorityScore += 10;
  }

  return {
    sequence: Number(row.sequence),
    word,
    decision,
    appKorean,
    naverManualMeaning: naverMeaning,
    primaryCategory,
    tags,
    confidence,
    suggestedKorean,
    autoFixEligible,
    bulkFixTier,
    holdPriorityScore,
    overlapCount: stats.overlapCount,
    appTokenCount: stats.appTokens.length,
    naverTokenCount: stats.naverTokens.length,
    appPart: row.appPart || "",
    appCategory: row.appCategory || "",
    appLevel: Number(row.appLevel || 0),
    audience: row.appAudience || "",
  };
}

function formatCategoryName(name) {
  return {
    placeholder_extra_vocab: "\uCD94\uAC00 \uC5B4\uD718 \uC790\uB3D9 \uBB38\uAD6C",
    generated_verb_noise: "\uC790\uB3D9 \uC0DD\uC131 \uB3D9\uC0AC \uBB38\uAD6C",
    inflection_descriptor: "\uD65C\uC6A9\uD615 \uC124\uBA85\uD615 \uD45C\uD604",
    plural_gloss_noise: "\uBCF5\uC218\uD615 \uB73B\uD480\uC774 \uB178\uC774\uC988",
    short_token_or_abbrev: "\uC57D\uC5B4/\uC9E7\uC740 \uD1A0\uD070",
    proper_noun: "\uACE0\uC720\uBA85\uC0AC",
    empty_naver_meaning: "\uB124\uC774\uBC84 \uB73B \uBE48\uCE78",
    zero_overlap_rewrite: "\uC571 \uB73B-\uB124\uC774\uBC84 \uB73B \uBB34\uAD00 \uD45C\uD604",
    generated_agentive_or_nominal: "\uC790\uB3D9 \uC0DD\uC131 \uBA85\uC0AC/\uC0AC\uB78C \uD45C\uD604",
    multi_sense: "\uB2E4\uC758\uC5B4 \uD56D\uBAA9",
    hold_manual_review: "\uBCF4\uB958 \uC218\uB3D9 \uAC80\uD1A0",
    manual_review_misc: "\uAE30\uD0C0 \uC218\uB3D9 \uAC80\uD1A0",
  }[name] || name;
}

if (!fs.existsSync(INPUT_CSV)) {
  throw new Error(`Missing ${INPUT_CSV}`);
}

const rows = parseCsv(fs.readFileSync(INPUT_CSV, "utf8"));
const issueRows = rows.filter((row) => {
  const decision = String(row.naverDecision || "").trim();
  return decision === DECISION_REVISED || decision === DECISION_HOLD;
});

const classified = issueRows.map(classifyRow);
const byPrimaryCategory = classified.reduce((acc, item) => {
  acc[item.primaryCategory] = (acc[item.primaryCategory] || 0) + 1;
  return acc;
}, {});

const categoryEntries = Object.entries(byPrimaryCategory)
  .sort((left, right) => right[1] - left[1])
  .map(([key, count]) => ({
    category: key,
    categoryLabel: formatCategoryName(key),
    count,
    revised: classified.filter((item) => item.primaryCategory === key && item.decision === DECISION_REVISED).length,
    hold: classified.filter((item) => item.primaryCategory === key && item.decision === DECISION_HOLD).length,
    autoFixEligible: classified.filter((item) => item.primaryCategory === key && item.autoFixEligible).length,
    sampleWords: classified
      .filter((item) => item.primaryCategory === key)
      .slice(0, 5)
      .map((item) => item.word),
  }));

const autoFixCandidates = classified
  .filter((item) => item.autoFixEligible)
  .sort((left, right) => {
    const confidenceWeight = { high: 3, medium: 2, low: 1 };
    return (
      (confidenceWeight[right.confidence] || 0) - (confidenceWeight[left.confidence] || 0) ||
      left.sequence - right.sequence
    );
  });

const safeAutoFixCandidates = autoFixCandidates.filter((item) => item.bulkFixTier === "safe");

const holdPriority = classified
  .filter((item) => item.decision === DECISION_HOLD)
  .sort((left, right) => right.holdPriorityScore - left.holdPriorityScore || left.sequence - right.sequence);

const summary = {
  generatedAt: new Date().toISOString(),
  totalIssues: classified.length,
  revised: classified.filter((item) => item.decision === DECISION_REVISED).length,
  hold: classified.filter((item) => item.decision === DECISION_HOLD).length,
  autoFixEligible: autoFixCandidates.length,
  safeAutoFixEligible: safeAutoFixCandidates.length,
  topCategories: categoryEntries,
  topHoldPriority: holdPriority.slice(0, 30),
};

fs.writeFileSync(
  OUT_SUMMARY_JSON,
  JSON.stringify(
    {
      summary,
      categoryEntries,
    },
    null,
    2
  ),
  "utf8"
);

fs.writeFileSync(
  OUT_FIX_JSON,
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      count: autoFixCandidates.length,
      rows: autoFixCandidates,
    },
    null,
    2
  ),
  "utf8"
);

fs.writeFileSync(
  OUT_FIX_SAFE_JSON,
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      count: safeAutoFixCandidates.length,
      rows: safeAutoFixCandidates,
    },
    null,
    2
  ),
  "utf8"
);

fs.writeFileSync(
  OUT_HOLD_JSON,
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      count: holdPriority.length,
      rows: holdPriority,
    },
    null,
    2
  ),
  "utf8"
);

writeCsv(
  OUT_FIX_CSV,
  [
    "sequence",
    "word",
    "decision",
    "primaryCategory",
    "confidence",
    "bulkFixTier",
    "currentAppKorean",
    "suggestedKorean",
    "naverManualMeaning",
    "overlapCount",
  ],
  autoFixCandidates.map((item) => ({
    sequence: item.sequence,
    word: item.word,
    decision: item.decision,
    primaryCategory: item.primaryCategory,
    confidence: item.confidence,
    bulkFixTier: item.bulkFixTier,
    currentAppKorean: item.appKorean,
    suggestedKorean: item.suggestedKorean,
    naverManualMeaning: item.naverManualMeaning,
    overlapCount: item.overlapCount,
  }))
);

writeCsv(
  OUT_FIX_SAFE_CSV,
  [
    "sequence",
    "word",
    "primaryCategory",
    "currentAppKorean",
    "suggestedKorean",
    "naverManualMeaning",
  ],
  safeAutoFixCandidates.map((item) => ({
    sequence: item.sequence,
    word: item.word,
    primaryCategory: item.primaryCategory,
    currentAppKorean: item.appKorean,
    suggestedKorean: item.suggestedKorean,
    naverManualMeaning: item.naverManualMeaning,
  }))
);

writeCsv(
  OUT_HOLD_CSV,
  [
    "sequence",
    "word",
    "primaryCategory",
    "holdPriorityScore",
    "currentAppKorean",
    "naverManualMeaning",
    "appPart",
    "appCategory",
  ],
  holdPriority.map((item) => ({
    sequence: item.sequence,
    word: item.word,
    primaryCategory: item.primaryCategory,
    holdPriorityScore: item.holdPriorityScore,
    currentAppKorean: item.appKorean,
    naverManualMeaning: item.naverManualMeaning,
    appPart: item.appPart,
    appCategory: item.appCategory,
  }))
);

const categoryLines = categoryEntries
  .map(
    (item) =>
      `| ${item.categoryLabel} | ${item.count} | ${item.revised} | ${item.hold} | ${item.autoFixEligible} | ${item.sampleWords.join(", ")} |`
  )
  .join("\n");

const holdLines = holdPriority
  .slice(0, 20)
  .map(
    (item) =>
      `| ${item.sequence} | ${item.word} | ${formatCategoryName(item.primaryCategory)} | ${item.holdPriorityScore} | ${item.appKorean} | ${item.naverManualMeaning} |`
  )
  .join("\n");

const md = `# \uC218\uC815/\uBCF4\uB958 \uD56D\uBAA9 \uD328\uD134 \uBD84\uC11D
\uC0DD\uC131 \uC2DC\uAC01: ${new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}

## \uC694\uC57D

| \uD56D\uBAA9 | \uAC12 |
|---|---:|
| \uC804\uCCB4 \uBB38\uC81C \uD56D\uBAA9 | ${summary.totalIssues} |
| \uC218\uC815 | ${summary.revised} |
| \uBCF4\uB958 | ${summary.hold} |
| \uADDC\uCE59\uD615 \uC77C\uAD04 \uBCF4\uC815 \uD6C4\uBCF4 | ${summary.autoFixEligible} |
| \uBC14\uB85C \uC801\uC6A9 \uAC00\uB2A5 \uC548\uC804 \uD6C4\uBCF4 | ${summary.safeAutoFixEligible} |

## \uC8FC\uC694 \uD328\uD134

| \uD328\uD134 | \uAC1C\uC218 | \uC218\uC815 | \uBCF4\uB958 | \uC77C\uAD04 \uBCF4\uC815 \uD6C4\uBCF4 | \uC608\uC2DC |
|---|---:|---:|---:|---:|---|
${categoryLines}

## \uBCF4\uB958 \uC218\uB3D9 \uAC80\uD1A0 \uC6B0\uC120 \uD56D\uBAA9

| \uC21C\uBC88 | \uB2E8\uC5B4 | \uD328\uD134 | \uC810\uC218 | \uD604\uC7AC \uB73B | \uB124\uC774\uBC84 \uAE30\uC900 \uB73B |
|---:|---|---|---:|---|---|
${holdLines || "| - | - | - | - | - | - |"}

## \uC0DD\uC131 \uD30C\uC77C

- JSON: \`outputs/naver-review-issue-patterns.json\`
- Markdown: \`outputs/naver-review-issue-patterns.md\`
- \uC77C\uAD04 \uBCF4\uC815 \uD6C4\uBCF4 CSV: \`outputs/naver-bulk-fix-candidates.csv\`
- \uC548\uC804 \uBCF4\uC815 \uD6C4\uBCF4 CSV: \`outputs/naver-bulk-fix-safe-candidates.csv\`
- \uBCF4\uB958 \uC6B0\uC120 \uAC80\uD1A0 CSV: \`outputs/naver-hold-priority.csv\`
`;

fs.writeFileSync(OUT_SUMMARY_MD, md, "utf8");

console.log(
  JSON.stringify(
    {
      summary,
      outputs: {
        summaryJson: OUT_SUMMARY_JSON,
        summaryMd: OUT_SUMMARY_MD,
        bulkFixJson: OUT_FIX_JSON,
        bulkFixCsv: OUT_FIX_CSV,
        bulkFixSafeJson: OUT_FIX_SAFE_JSON,
        bulkFixSafeCsv: OUT_FIX_SAFE_CSV,
        holdJson: OUT_HOLD_JSON,
        holdCsv: OUT_HOLD_CSV,
      },
    },
    null,
    2
  )
);
