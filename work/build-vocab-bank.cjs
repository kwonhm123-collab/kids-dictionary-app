const fs = require("fs");
const sourcePath = "./work/google-10000-english-no-swears.txt";
const outPath = "./outputs/kids-dictionary/vocab-bank.js";
const words = fs.readFileSync(sourcePath, "utf8")
  .split(/\r?\n/)
  .map((word) => word.trim().toLowerCase())
  .filter((word) => /^[a-z]+$/.test(word))
  .filter((word, index, array) => array.indexOf(word) === index)
  .slice(0, 8000);
fs.writeFileSync(outPath, `window.studentVocabularyBank = ${JSON.stringify(words, null, 2)};\n`, "utf8");
console.log(`wrote ${words.length} words to ${outPath}`);
