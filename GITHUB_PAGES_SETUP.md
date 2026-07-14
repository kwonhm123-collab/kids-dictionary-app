# GitHub Pages Setup

## 1. Build docs

```powershell
node .\work\build-kids-dictionary-github-pages.cjs
```

This updates:

- `outputs/kids-dictionary-release`
- `docs`

## 2. Create GitHub repository

Create a new GitHub repository and connect this folder to it.

Example:

```powershell
git remote add origin <YOUR_GITHUB_REPO_URL>
```

## 3. First push

```powershell
git add .
git commit -m "Initial GitHub Pages setup"
git branch -M main
git push -u origin main
```

## 4. Enable GitHub Pages

In GitHub:

1. Open the repository
2. Go to `Settings > Pages`
3. Set `Deploy from a branch`
4. Select branch `main`
5. Select folder `/docs`
6. Save

## 5. Install on Galaxy Android

1. Open the GitHub Pages HTTPS URL in Chrome
2. Tap menu
3. Tap `앱 설치` or `홈 화면에 추가`

## 6. Update flow

Whenever Codex updates the app:

```powershell
node .\work\build-kids-dictionary-github-pages.cjs
git add .
git commit -m "Update dictionary app"
git push
```

Keep the same GitHub Pages URL so the phone app keeps updating in place.
