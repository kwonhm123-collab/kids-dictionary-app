const https = require("https");

function requestJson(url, referer) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      url,
      {
        method: "GET",
        headers: {
          Accept: "application/json, text/plain, */*",
          Referer: referer,
          "X-Requested-With": "XMLHttpRequest",
          Origin: "https://en.dict.naver.com",
          "User-Agent": "Mozilla/5.0",
        },
      },
      (res) => {
        let body = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => {
          body += chunk;
        });
        res.on("end", () => {
          if (res.statusCode !== 200) {
            reject(new Error(`HTTP ${res.statusCode}: ${url}`));
            return;
          }
          try {
            resolve(JSON.parse(body));
          } catch (error) {
            reject(
              new Error(`JSON parse failed for ${url}: ${error.message}\n${body.slice(0, 300)}`)
            );
          }
        });
      }
    );
    req.on("error", reject);
    req.end();
  });
}

function toText(value) {
  return String(value || "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

async function main() {
  const word = process.argv[2];
  if (!word) {
    throw new Error("Usage: node work/naver-internal-api-probe.cjs <word>");
  }

  const encoded = encodeURIComponent(word);
  const referer = `https://en.dict.naver.com/#/search?query=${encoded}`;
  const wordUrl =
    `https://en.dict.naver.com/api3/enko/search?query=${encoded}` +
    `&m=pc&range=word&page=1&shouldSearchOpen=true`;
  const meaningUrl =
    `https://en.dict.naver.com/api3/enko/search?query=${encoded}` +
    `&m=pc&range=meaning&page=1`;

  const wordResult = await requestJson(wordUrl, referer);
  const meaningResult = await requestJson(meaningUrl, referer);

  const wordItems = wordResult?.searchResultMap?.searchResultListMap?.WORD?.items || [];
  const firstWord = wordItems[0] || null;

  let entryResult = null;
  if (firstWord?.entryId) {
    const entryUrl =
      `https://en.dict.naver.com/api/v2/platform/enko/entry?entryId=${firstWord.entryId}` +
      `&isConjsShowTTS=true&searchResult=false`;
    entryResult = await requestJson(entryUrl, referer);
  }

  const summary = {
    word,
    wordItemCount: wordItems.length,
    firstWord: firstWord
      ? {
          entryId: firstWord.entryId,
          expEntry: toText(firstWord.expEntry),
          matchType: firstWord.matchType,
          sourceDictnameKO: toText(firstWord.sourceDictnameKO),
          phonetics: (firstWord.searchPhoneticSymbolList || []).map((item) =>
            toText(item.symbolValue)
          ),
          meanings: (firstWord.meansCollector || []).flatMap((group) =>
            (group.means || []).map((mean) => ({
              partOfSpeech: toText(group.partOfSpeech),
              value: toText(mean.value),
            }))
          ),
        }
      : null,
    meaningItemCount:
      meaningResult?.searchResultMap?.searchResultListMap?.MEANING?.items?.length || 0,
    entryPreview: entryResult?.entry
      ? {
          entry_id: entryResult.entry.entry_id,
          dict_cid: entryResult.entry.dict_cid,
          members: (entryResult.entry.members || []).slice(0, 1).map((member) => ({
            entry_name: toText(member.entry_name),
            prons: (member.prons || []).slice(0, 3).map((pron) => ({
              symbol: toText(pron.show_pron_symbol),
              type: toText(pron.pron_type),
            })),
          })),
        }
      : null,
  };

  console.log(JSON.stringify(summary, null, 2));
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
