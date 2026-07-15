const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const SOURCE_DIR = path.join(ROOT, "outputs", "kids-dictionary");
const RELEASE_DIR = path.join(ROOT, "outputs", "kids-dictionary-release");
const RELEASE_INFO = path.join(RELEASE_DIR, "release-info.json");
const RELEASE_GUIDE = path.join(RELEASE_DIR, "android-install-update-guide.txt");

const FILES = [
  "index.html",
  "styles.css",
  "app.js",
  "vocab-bank.js",
  "top1000-supplement.js",
  "top2000-supplement.js",
  "top2200-supplement.js",
  "ministry3000-supplement.js",
  "verified-bank-supplement.js",
  "verified-meaning-overrides.js",
  "manual-meaning-overrides.js",
  "manual-excluded-words.js",
  "manifest.json",
  "service-worker.js",
  "icon.svg",
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function clearDir(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const target = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      fs.rmSync(target, { recursive: true, force: true });
    } else {
      fs.unlinkSync(target);
    }
  }
}

function main() {
  ensureDir(RELEASE_DIR);
  clearDir(RELEASE_DIR);

  for (const file of FILES) {
    const source = path.join(SOURCE_DIR, file);
    if (!fs.existsSync(source)) {
      throw new Error(`Missing source file: ${source}`);
    }
    fs.copyFileSync(source, path.join(RELEASE_DIR, file));
  }

  const releaseInfo = {
    generatedAt: new Date().toISOString(),
    sourceDir: SOURCE_DIR,
    releaseDir: RELEASE_DIR,
    files: FILES,
  };

  const guide = [
    "갤럭시 안드로이드 설치/업데이트 가이드",
    "===================================",
    "",
    "1. 이 폴더 안의 파일 전체를 같은 HTTPS 주소에 업로드합니다.",
    "2. 휴대폰 Chrome에서 그 주소를 엽니다.",
    "3. 메뉴 > 앱 설치 또는 홈 화면에 추가를 누릅니다.",
    "4. 이후 Codex로 수정한 뒤 이 릴리스 폴더를 다시 같은 주소에 덮어쓰면 됩니다.",
    "5. 휴대폰에서는 앱을 다시 열면 최신 내용이 반영됩니다.",
    "",
    "중요:",
    "- 주소를 바꾸지 말고 같은 주소를 계속 사용하세요.",
    "- index.html만 올리는 것이 아니라 폴더 전체를 같이 올려야 합니다.",
    "- service-worker.js가 바뀌면 앱이 자동으로 새 버전을 받도록 구성되어 있습니다.",
    "",
  ].join("\n");

  fs.writeFileSync(RELEASE_INFO, JSON.stringify(releaseInfo, null, 2), "utf8");
  fs.writeFileSync(RELEASE_GUIDE, guide, "utf8");

  console.log(
    JSON.stringify(
      {
        releaseDir: RELEASE_DIR,
        fileCount: FILES.length,
        files: FILES,
      },
      null,
      2
    )
  );
}

main();
