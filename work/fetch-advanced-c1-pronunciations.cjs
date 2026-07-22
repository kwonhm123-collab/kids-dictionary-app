const fs = require("fs");
const path = require("path");
const https = require("https");
const vm = require("vm");

const ROOT = process.cwd();
const ADDITIONS_FILE = path.join(ROOT, "outputs", "kids-dictionary", "manual-high-school-depth-additions.js");
const OUTPUT_JSON = path.join(ROOT, "outputs", "advanced-c1-pronunciation-validation.json");
const OUTPUT_JS = path.join(ROOT, "outputs", "kids-dictionary", "manual-high-school-pronunciation-overrides.js");
const MANUAL_FALLBACKS = {
  competent: ["\u02C8k\u0251\u02D0mp\u026At\u0259nt", "\u02C8k\u0252mp\u026At\u0259nt"],
  compromise: ["\u02C8k\u0251\u02D0mpr\u0259ma\u026Az", "\u02C8k\u0252mpr\u0259ma\u026Az"],
  conceal: ["k\u0259n\u02C8si\u02D0l"],
  concede: ["k\u0259n\u02C8si\u02D0d"],
  confront: ["k\u0259n\u02C8fr\u028Cnt"],
};

function loadWords() {
  const context = { window: { manualDictionaryAdditions: [] } };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(ADDITIONS_FILE, "utf8"), context, { filename: ADDITIONS_FILE });
  return context.window.manualDictionaryAdditions.map(([word]) => String(word).trim().toLowerCase()).filter(Boolean);
}

function requestJson(url) {
  return new Promise((resolve) => {
    const request = https.get(
      url,
      {
        headers: {
          Accept: "application/json",
          "User-Agent": "uniuni-dictionary-validation/1.0",
        },
      },
      (response) => {
        let body = "";
        response.setEncoding("utf8");
        response.on("data", (chunk) => {
          body += chunk;
        });
        response.on("end", () => {
          if (response.statusCode < 200 || response.statusCode >= 300) {
            resolve({ ok: false, status: response.statusCode, error: body.slice(0, 200) });
            return;
          }
          try {
            resolve({ ok: true, status: response.statusCode, data: JSON.parse(body) });
          } catch (error) {
            resolve({ ok: false, status: response.statusCode, error: error.message });
          }
        });
      }
    );
    request.on("error", (error) => resolve({ ok: false, status: 0, error: error.message }));
    request.setTimeout(10000, () => request.destroy(new Error("request timeout")));
  });
}

function cleanIpa(value) {
  return String(value || "")
    .trim()
    .replace(/^[\[/]/, "")
    .replace(/[\]/]$/, "");
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function summarize(word, response) {
  if (!response.ok || !Array.isArray(response.data)) {
    return { word, ok: false, status: response.status, phonetics: [], audioUrl: "", error: response.error || "not found" };
  }

  const phonetics = [];
  const audioUrls = [];
  const parts = [];
  response.data.forEach((entry) => {
    if (entry.phonetic) phonetics.push(cleanIpa(entry.phonetic));
    (entry.phonetics || []).forEach((item) => {
      if (item.text) phonetics.push(cleanIpa(item.text));
      if (item.audio) audioUrls.push(item.audio);
    });
    (entry.meanings || []).forEach((meaning) => {
      if (meaning.partOfSpeech) parts.push(meaning.partOfSpeech);
    });
  });

  return {
    word,
    ok: true,
    status: response.status,
    phonetics: unique(phonetics),
    audioUrl: unique(audioUrls)[0] || "",
    parts: unique(parts),
  };
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function buildJavascript(rows) {
  const entries = rows
    .filter((row) => row.ok && row.phonetics.length)
    .map((row) => {
      const primary = row.phonetics[0];
      const value = {
        display: `\uBBF8\uAD6D\u00B7\uC601\uAD6D [${primary}]`,
        phonetics: row.phonetics,
      };
      if (row.audioUrl) value.audioUrl = row.audioUrl;
      return `    ${JSON.stringify(row.word)}: ${JSON.stringify(value)},`;
    });

  return [
    "window.pronunciationDisplayOverrides = Object.assign(",
    "  window.pronunciationDisplayOverrides || {},",
    "  {",
    ...entries,
    "  }",
    ");",
    "",
  ].join("\n");
}

async function main() {
  const words = loadWords();
  const previous = fs.existsSync(OUTPUT_JSON) ? JSON.parse(fs.readFileSync(OUTPUT_JSON, "utf8")) : null;
  const cachedByWord = new Map(
    (previous?.rows || [])
      .filter((row) => row.ok && Array.isArray(row.phonetics) && row.phonetics.length)
      .map((row) => [row.word, { ...row, phonetics: unique(row.phonetics.map(cleanIpa)) }])
  );
  const rows = [];
  for (let index = 0; index < words.length; index += 1) {
    const word = words[index];
    if (cachedByWord.has(word)) {
      rows.push(cachedByWord.get(word));
    } else {
      const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`;
      const result = summarize(word, await requestJson(url));
      if ((!result.ok || !result.phonetics.length) && MANUAL_FALLBACKS[word]) {
        rows.push({
          word,
          ok: true,
          status: result.status,
          phonetics: MANUAL_FALLBACKS[word],
          audioUrl: "",
          parts: [],
          source: "manual Oxford-style IPA fallback",
        });
      } else {
        rows.push(result);
      }
    }
    console.error(`progress ${index + 1}/${words.length}`);
    await sleep(250);
  }

  const result = {
    generatedAt: new Date().toISOString(),
    source: "Free Dictionary API",
    total: rows.length,
    verified: rows.filter((row) => row.ok && row.phonetics.length).length,
    unresolved: rows.filter((row) => !row.ok || !row.phonetics.length).length,
    rows,
  };
  fs.writeFileSync(OUTPUT_JSON, `${JSON.stringify(result, null, 2)}\n`, "utf8");
  fs.writeFileSync(OUTPUT_JS, buildJavascript(rows), "utf8");
  console.log(JSON.stringify({ outputJson: OUTPUT_JSON, outputJs: OUTPUT_JS, total: result.total, verified: result.verified, unresolved: result.unresolved }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
