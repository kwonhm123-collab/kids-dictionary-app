const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const FILE = path.join(ROOT, "outputs", "naver-missing-review-targets.csv");

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    const next = text[i + 1];

    if (ch === '"') {
      if (inQuotes && next === '"') {
        cell += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (!inQuotes && ch === ",") {
      row.push(cell);
      cell = "";
      continue;
    }

    if (!inQuotes && (ch === "\n" || ch === "\r")) {
      if (ch === "\r" && next === "\n") {
        i += 1;
      }
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
      continue;
    }

    cell += ch;
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

function csvEscape(value) {
  const text = String(value ?? "");
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

const updates = new Map([
  [
    "comforting",
    {
      naverManualStatus: "\uAC80\uC218\uC644\uB8CC",
      naverManualMeaning: "\uC704\uB85C\uAC00 \uB418\uB294",
      naverDecision: "\uC218\uC815",
      reviewerMemo:
        "\uC7AC\uAC80\uC0AC \uC644\uB8CC | \uB124\uC774\uBC84 \uB0B4\uBD80 API \uC7AC\uC870\uD68C exact:entry | entryId=81fca9e371aa42119fb2c5813ab7e1e7 | \uC758\uBBF8 \uD655\uC778: \uC704\uB85C\uAC00 \uB418\uB294",
    },
  ],
  [
    "acquaintance",
    {
      naverManualStatus: "\uAC80\uC218\uC644\uB8CC",
      naverManualMeaning: "\uC544\uB294 \uC0AC\uB78C, \uC9C0\uC778",
      naverDecision: "\uD655\uC778",
      reviewerMemo:
        "\uC7AC\uAC80\uC0AC \uC644\uB8CC | \uB124\uC774\uBC84 \uB0B4\uBD80 API \uC7AC\uC870\uD68C exact:entry | entryId=b365d819f535437399da4e5bf0c3de1d",
    },
  ],
  [
    "textbook",
    {
      naverManualStatus: "\uAC80\uC218\uC644\uB8CC",
      naverManualMeaning: "\uAD50\uACFC\uC11C",
      naverDecision: "\uD655\uC778",
      reviewerMemo:
        "\uC7AC\uAC80\uC0AC \uC644\uB8CC | \uB124\uC774\uBC84 \uB0B4\uBD80 API \uC7AC\uC870\uD68C exact:entry | entryId=3413a1956c0d4f5e91cd651188a99655",
    },
  ],
  [
    "amnesiac",
    {
      naverManualStatus: "\uAC80\uC218\uC644\uB8CC",
      naverManualMeaning: "\uAE30\uC5B5\uC0C1\uC2E4\uC99D \uD658\uC790",
      naverDecision: "\uBCF4\uB958",
      reviewerMemo:
        "\uC7AC\uAC80\uC0AC \uBCF4\uB958 \uC720\uC9C0 | exact:entry \uD56D\uBAA9\uC740 \uC788\uC73C\uB098 \uAC80\uC0C9 \uC751\uB2F5\uC5D0 \uB73B \uBCF8\uBB38 \uB300\uC2E0 \uC608\uBB38 \uBC88\uC5ED\uB9CC \uB178\uCD9C\uB418\uC5B4 \uC218\uB3D9 \uD655\uC815 \uD544\uC694 | entryId=fba868cde0ef408e9a8ef9ad0f7e2d70",
    },
  ],
  [
    "anabasises",
    {
      naverManualStatus: "\uAC80\uC218\uC644\uB8CC",
      naverManualMeaning: "",
      naverDecision: "\uBCF4\uB958",
      reviewerMemo:
        "\uC7AC\uAC80\uC0AC \uBCF4\uB958 \uC720\uC9C0 | \uB124\uC774\uBC84 \uB0B4\uBD80 API \uC7AC\uC870\uD68C \uACB0\uACFC \uAC80\uC0C9 \uD56D\uBAA9 \uC5C6\uC74C",
    },
  ],
  [
    "anaglyption",
    {
      naverManualStatus: "\uAC80\uC218\uC644\uB8CC",
      naverManualMeaning: "",
      naverDecision: "\uBCF4\uB958",
      reviewerMemo:
        "\uC7AC\uAC80\uC0AC \uBCF4\uB958 \uC720\uC9C0 | \uB124\uC774\uBC84 \uB0B4\uBD80 API \uC7AC\uC870\uD68C \uACB0\uACFC \uAC80\uC0C9 \uD56D\uBAA9 \uC5C6\uC74C",
    },
  ],
  [
    "anagoges",
    {
      naverManualStatus: "\uAC80\uC218\uC644\uB8CC",
      naverManualMeaning: "",
      naverDecision: "\uBCF4\uB958",
      reviewerMemo:
        "\uC7AC\uAC80\uC0AC \uBCF4\uB958 \uC720\uC9C0 | \uB124\uC774\uBC84 \uB0B4\uBD80 API \uC7AC\uC870\uD68C \uACB0\uACFC \uAC80\uC0C9 \uD56D\uBAA9 \uC5C6\uC74C",
    },
  ],
  [
    "anagogy",
    {
      naverManualStatus: "\uAC80\uC218\uC644\uB8CC",
      naverManualMeaning: "\uC2E0\uBE44\uC801 \uD574\uC11D, \uC601\uC801 \uD574\uC11D",
      naverDecision: "\uC218\uC815",
      reviewerMemo:
        "\uC7AC\uAC80\uC0AC \uC644\uB8CC | \uB124\uC774\uBC84 \uB0B4\uBD80 API \uC7AC\uC870\uD68C exact:subEntry | entryId=bd47ff8ace1c463081998cc5c6959707 | \uC758\uBBF8 \uD655\uC778: \uC2E0\uBE44\uC801[\uC601\uC801] \uD574\uC11D",
    },
  ],
  [
    "ashray",
    {
      naverManualStatus: "\uAC80\uC218\uC644\uB8CC",
      naverManualMeaning: "",
      naverDecision: "\uBCF4\uB958",
      reviewerMemo:
        "\uC7AC\uAC80\uC0AC \uBCF4\uB958 \uC720\uC9C0 | \uB124\uC774\uBC84 \uB0B4\uBD80 API \uC7AC\uC870\uD68C \uACB0\uACFC \uAC80\uC0C9 \uD56D\uBAA9 \uC5C6\uC74C",
    },
  ],
  [
    "assize",
    {
      naverManualStatus: "\uAC80\uC218\uC644\uB8CC",
      naverManualMeaning: "\uC21C\uD68C \uBC95\uC815",
      naverDecision: "\uBCF4\uB958",
      reviewerMemo:
        "\uC7AC\uAC80\uC0AC \uBCF4\uB958 \uC720\uC9C0 | exact:entry \uD56D\uBAA9\uC740 \uC788\uC73C\uB098 \uAC80\uC0C9 \uC751\uB2F5\uC5D0 \uB73B \uBCF8\uBB38 \uB300\uC2E0 \uC608\uBB38 \uBC88\uC5ED \uC704\uC8FC\uB85C \uB178\uCD9C\uB418\uC5B4 \uC218\uB3D9 \uD655\uC815 \uD544\uC694 | entryId=f2f73c8d01774dada4fba1ce9f7632ca",
    },
  ],
]);

const parsed = parseCsv(fs.readFileSync(FILE, "utf8").replace(/^\uFEFF/, ""));
let changed = 0;

for (const row of parsed.rows) {
  const word = String(row.word || "").trim().toLowerCase();
  const update = updates.get(word);
  if (!update) continue;
  Object.assign(row, update);
  changed += 1;
}

const csv = [
  parsed.header.join(","),
  ...parsed.rows.map((row) => parsed.header.map((column) => csvEscape(row[column])).join(",")),
].join("\n");

fs.writeFileSync(FILE, csv, "utf8");

console.log(
  JSON.stringify(
    {
      file: FILE,
      changed,
      updatedWords: [...updates.keys()],
    },
    null,
    2
  )
);
