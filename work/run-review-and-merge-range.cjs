const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = process.cwd();
const BATCH_DIR = path.join(ROOT, "outputs", "naver-manual-review-all-batches");
const REVIEW_SCRIPT = path.join(ROOT, "work", "naver-internal-review-batch.cjs");
const MERGE_SCRIPT = path.join(ROOT, "work", "merge-naver-review-results.cjs");

function parseArgs(argv) {
  const options = {
    startSequence: 0,
    total: 1000,
    batchSize: 25,
    maxLevel: 4,
    concurrency: 3,
    pauseMs: 0,
  };

  for (const arg of argv) {
    const [key, rawValue] = arg.split("=");
    const value = rawValue ?? "";

    if (key === "--start-sequence") options.startSequence = Number(value || 0);
    else if (key === "--total") options.total = Number(value || 1000);
    else if (key === "--batch-size") options.batchSize = Number(value || 25);
    else if (key === "--max-level") options.maxLevel = Number(value || 4);
    else if (key === "--concurrency") options.concurrency = Number(value || 3);
    else if (key === "--pause-ms") options.pauseMs = Number(value || 0);
  }

  if (!Number.isFinite(options.startSequence) || options.startSequence < 0) {
    throw new Error("--start-sequence must be zero or a positive number");
  }
  if (!Number.isFinite(options.total) || options.total < 1) {
    throw new Error("--total must be a positive number");
  }
  if (!Number.isFinite(options.batchSize) || options.batchSize < 1) {
    throw new Error("--batch-size must be a positive number");
  }
  if (!Number.isFinite(options.maxLevel) || options.maxLevel < 1) {
    throw new Error("--max-level must be a positive number");
  }
  if (!Number.isFinite(options.concurrency) || options.concurrency < 1) {
    throw new Error("--concurrency must be a positive number");
  }
  if (!Number.isFinite(options.pauseMs) || options.pauseMs < 0) {
    throw new Error("--pause-ms must be zero or a positive number");
  }

  return options;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function runNodeScript(script, args) {
  return execFileSync(process.execPath, [script, ...args], {
    cwd: ROOT,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const startedAt = Date.now();
  const batches = [];
  let processed = 0;
  let nextSequence = options.startSequence;

  while (processed < options.total) {
    const limit = Math.min(options.batchSize, options.total - processed);
    const outputFile = path.join(
      BATCH_DIR,
      `naver-manual-review-level${options.maxLevel}-internal-seq-${String(nextSequence).padStart(4, "0")}-pack${String(
        limit
      ).padStart(3, "0")}.json`
    );

    const reviewStdout = runNodeScript(REVIEW_SCRIPT, [
      `--max-level=${options.maxLevel}`,
      `--start-sequence=${nextSequence}`,
      `--limit=${limit}`,
      `--concurrency=${options.concurrency}`,
      `--output=${path.relative(ROOT, outputFile)}`,
    ]);

    const reviewResult = JSON.parse(reviewStdout.trim());
    const payload = JSON.parse(fs.readFileSync(outputFile, "utf8"));

    runNodeScript(MERGE_SCRIPT, [path.relative(ROOT, outputFile)]);

    const batchRows = Array.isArray(payload.rows) ? payload.rows : [];
    if (!batchRows.length) {
      throw new Error(`No rows returned for ${outputFile}`);
    }

    const batchSummary = {
      file: outputFile,
      count: batchRows.length,
      firstSequence: batchRows[0].sequence,
      lastSequence: batchRows[batchRows.length - 1].sequence,
      byDecision: payload.summary?.byDecision || {},
      elapsedMs: payload.summary?.elapsedMs || 0,
    };

    batches.push(batchSummary);
    processed += batchRows.length;
    nextSequence = Number(batchRows[batchRows.length - 1].sequence || nextSequence) + 1;

    console.error(
      `[batch ${batches.length}] ${batchSummary.firstSequence}-${batchSummary.lastSequence} | count=${batchSummary.count} | processed=${processed}/${options.total}`
    );

    if (options.pauseMs > 0 && processed < options.total) {
      await sleep(options.pauseMs);
    }
  }

  const totals = batches.reduce(
    (acc, batch) => {
      acc.count += batch.count;
      acc.elapsedMs += batch.elapsedMs;
      for (const [decision, value] of Object.entries(batch.byDecision || {})) {
        acc.byDecision[decision] = (acc.byDecision[decision] || 0) + Number(value || 0);
      }
      return acc;
    },
    { count: 0, elapsedMs: 0, byDecision: {} }
  );

  const result = {
    generatedAt: new Date().toISOString(),
    options,
    summary: {
      batchCount: batches.length,
      count: totals.count,
      elapsedMs: Date.now() - startedAt,
      reviewElapsedMs: totals.elapsedMs,
      byDecision: totals.byDecision,
      lastSequence: nextSequence - 1,
    },
    batches,
  };

  console.log(JSON.stringify(result, null, 2));
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
