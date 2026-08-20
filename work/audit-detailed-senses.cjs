const fs = require("fs");
const path = require("path");
const vm = require("vm");
const {
  MANUAL_SENSES,
  loadDictionary,
  hasTrustedEntry,
  meaningsAlign,
  normalizeWord,
  parseCsv,
  trustedEntryCanStandAlone,
} = require("./build-detailed-sense-overrides.cjs");

const ROOT = process.cwd();
const REVIEW_CSV = path.join(ROOT, "outputs", "naver-manual-review-all.csv");
const OUTPUT_JSON = path.join(ROOT, "outputs", "detailed-sense-validation.json");
const OVERRIDES_FILE = path.join(ROOT, "outputs", "kids-dictionary", "detailed-sense-overrides.js");
const LIVE_CACHE_FILE = path.join(ROOT, "outputs", "kids-dictionary", "live-detailed-sense-cache.json");
const SAMPLE_SIZE = 1000;

function compact(value) {
  return String(value || "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, "")
    .toLowerCase();
}

function buildSpreadSample(items, size) {
  if (items.length <= size) return [...items];
  const sample = [];
  for (let index = 0; index < size; index += 1) {
    sample.push(items[Math.floor((index * items.length) / size)]);
  }
  return sample;
}

function main() {
  const dictionary = loadDictionary(true);
  const senseContext = { window: {} };
  vm.createContext(senseContext);
  vm.runInContext(fs.readFileSync(OVERRIDES_FILE, "utf8"), senseContext);
  const detailedOverrides = senseContext.window.detailedSenseOverrides || {};
  const liveCache = fs.existsSync(LIVE_CACHE_FILE)
    ? JSON.parse(fs.readFileSync(LIVE_CACHE_FILE, "utf8")).entries || {}
    : {};
  const reviewRows = parseCsv(fs.readFileSync(REVIEW_CSV, "utf8"));
  const reviewByWord = new Map(reviewRows.map((row) => [normalizeWord(row.word), row]));
  const structuralFailures = [];
  const duplicateSenseFailures = [];
  const placeholderFailures = [];
  const sourceCounts = {};
  const senseCountDistribution = {};

  for (const entry of dictionary) {
    const word = normalizeWord(entry.word);
    const senses = Array.isArray(entry.senses) ? entry.senses : [];
    sourceCounts[entry.senseSource || "missing"] = (sourceCounts[entry.senseSource || "missing"] || 0) + 1;
    senseCountDistribution[senses.length] = (senseCountDistribution[senses.length] || 0) + 1;

    if (!senses.length || senses.some((sense) => !String(sense.part || "").trim() || !String(sense.meaning || "").trim())) {
      structuralFailures.push({ word, senses });
    }
    const meanings = senses.map((sense) => compact(sense.meaning));
    if (new Set(meanings).size !== meanings.length) {
      duplicateSenseFailures.push({ word, meanings: senses.map((sense) => sense.meaning) });
    }
    if (senses.some((sense) => /관련 추가 영어 어휘|어휘 뱅크 단어|온라인 사전 확장 데이터/.test(sense.meaning))) {
      placeholderFailures.push({ word, meanings: senses.map((sense) => sense.meaning) });
    }
  }

  const reviewedEntries = dictionary
    .filter((entry) => entry.senseSource === "naver-verified")
    .sort((left, right) => normalizeWord(left.word).localeCompare(normalizeWord(right.word)));
  const sampleEntries = buildSpreadSample(reviewedEntries, SAMPLE_SIZE);
  const sampleFailures = [];

  for (const entry of sampleEntries) {
    const word = normalizeWord(entry.word);
    if (MANUAL_SENSES[word]) continue;
    const row = reviewByWord.get(word);
    const reviewedText = compact(row?.naverManualMeaning);
    const liveText = (liveCache[word]?.senses || []).map((sense) => compact(sense[1])).join(" ");
    const generatedMeanings = (detailedOverrides[word] || []).map((sense) => sense[1]);
    const missingMeanings = generatedMeanings
      .filter((meaning) => !reviewedText.includes(compact(meaning)) && !liveText.includes(compact(meaning)));
    const sourceIsValid =
      (Boolean(liveCache[word]) && meaningsAlign(entry.korean, generatedMeanings)) ||
      (row?.naverManualStatus === "검수완료" &&
        (meaningsAlign(entry.korean, generatedMeanings) ||
          (hasTrustedEntry(row, word) && trustedEntryCanStandAlone(entry, word))));
    if (!sourceIsValid || missingMeanings.length) {
      sampleFailures.push({ word, missingMeanings, status: row?.naverManualStatus || (liveCache[word] ? "live" : "missing") });
    }
  }

  const sequence = dictionary.find((entry) => normalizeWord(entry.word) === "sequence");
  const sequenceExpected = MANUAL_SENSES.sequence.map(([part, meaning]) => ({ part, meaning }));
  const sequencePass =
    JSON.stringify(sequence?.senses) === JSON.stringify(sequenceExpected) &&
    sequence?.senseSource === "naver-verified";
  const safetyExpected = {
    go: { includes: "가다", excludes: /harm|damage|injury|손해/ },
    lions: { includes: "사자", excludes: /리옹만|Golfe du Lion/i },
    preventing: { includes: "예방", excludes: /약어\s*P/ },
    interaction: { includes: "상호작용", excludes: /삼호/ },
  };
  const safetySentinels = Object.entries(safetyExpected).map(([word, expected]) => {
    const entry = dictionary.find((item) => normalizeWord(item.word) === word);
    const text = [entry?.korean, ...(entry?.senses || []).map((sense) => sense.meaning)].join(" / ");
    return {
      word,
      pass: text.includes(expected.includes) && !expected.excludes.test(text),
      text,
    };
  });
  const safetySentinelPass = safetySentinels.every((item) => item.pass);

  const result = {
    generatedAt: new Date().toISOString(),
    totalEntries: dictionary.length,
    uniqueWords: new Set(dictionary.map((entry) => normalizeWord(entry.word))).size,
    sourceCounts,
    senseCountDistribution,
    structuralFailures,
    duplicateSenseFailures,
    placeholderFailures,
    naverSample: {
      requested: SAMPLE_SIZE,
      checked: sampleEntries.length,
      failed: sampleFailures.length,
      failures: sampleFailures,
    },
    sequence: {
      pass: sequencePass,
      senses: sequence?.senses || [],
    },
    safetySentinels,
  };

  fs.writeFileSync(OUTPUT_JSON, `${JSON.stringify(result, null, 2)}\n`, "utf8");
  console.log(JSON.stringify({
    output: OUTPUT_JSON,
    totalEntries: result.totalEntries,
    uniqueWords: result.uniqueWords,
    sourceCounts,
    senseCountDistribution,
    structuralFailed: structuralFailures.length,
    duplicateSenseFailed: duplicateSenseFailures.length,
    placeholderFailed: placeholderFailures.length,
    naverSampleChecked: result.naverSample.checked,
    naverSampleFailed: result.naverSample.failed,
    sequencePass,
    safetySentinelPass,
  }, null, 2));

  if (
    structuralFailures.length ||
    duplicateSenseFailures.length ||
    placeholderFailures.length ||
    sampleFailures.length ||
    !sequencePass ||
    !safetySentinelPass
  ) {
    process.exitCode = 1;
  }
}

main();
