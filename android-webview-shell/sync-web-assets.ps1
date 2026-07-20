$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$repoRoot = Split-Path -Parent $projectRoot
$source = Join-Path $repoRoot "outputs\kids-dictionary-release"
$target = Join-Path $projectRoot "app\src\main\assets\www"

if (!(Test-Path $source)) {
    throw "Release source not found: $source"
}

New-Item -ItemType Directory -Force $target | Out-Null
Copy-Item (Join-Path $source "*") $target -Recurse -Force

Write-Host "Synced dictionary release files to Android assets:"
Write-Host $target
