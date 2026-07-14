const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = process.cwd();
const RELEASE_SCRIPT = path.join(ROOT, "work", "build-kids-dictionary-release.cjs");
const RELEASE_DIR = path.join(ROOT, "outputs", "kids-dictionary-release");
const DOCS_DIR = path.join(ROOT, "docs");

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

function copyDirContents(sourceDir, targetDir) {
  ensureDir(targetDir);

  for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
    const source = path.join(sourceDir, entry.name);
    const target = path.join(targetDir, entry.name);

    if (entry.isDirectory()) {
      copyDirContents(source, target);
    } else {
      fs.copyFileSync(source, target);
    }
  }
}

function main() {
  execFileSync(process.execPath, [RELEASE_SCRIPT], {
    cwd: ROOT,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });

  clearDir(DOCS_DIR);
  copyDirContents(RELEASE_DIR, DOCS_DIR);
  fs.writeFileSync(path.join(DOCS_DIR, ".nojekyll"), "", "utf8");

  const guide = [
    "GitHub Pages 배포 순서",
    "=====================",
    "",
    "1. docs 폴더 전체를 GitHub 저장소에 커밋합니다.",
    "2. GitHub 저장소 Settings > Pages 로 이동합니다.",
    "3. Build and deployment에서 Deploy from a branch 를 선택합니다.",
    "4. Branch는 main(또는 배포 브랜치), 폴더는 /docs 를 선택합니다.",
    "5. 저장 후 생성된 HTTPS 주소를 갤럭시 Chrome에서 열고 앱 설치를 진행합니다.",
    "",
    "업데이트 방법",
    "-------------",
    "1. Codex가 outputs/kids-dictionary 를 수정합니다.",
    "2. node work/build-kids-dictionary-github-pages.cjs 를 실행합니다.",
    "3. 바뀐 docs 폴더를 GitHub에 push 합니다.",
    "4. 같은 주소의 GitHub Pages가 갱신되고, 갤럭시 앱에 새 버전이 반영됩니다.",
    "",
  ].join("\n");

  fs.writeFileSync(path.join(ROOT, "docs", "github-pages-guide.txt"), guide, "utf8");

  console.log(
    JSON.stringify(
      {
        docsDir: DOCS_DIR,
        sourceReleaseDir: RELEASE_DIR,
        files: fs.readdirSync(DOCS_DIR).sort(),
      },
      null,
      2
    )
  );
}

main();
