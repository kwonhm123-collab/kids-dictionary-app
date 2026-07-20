$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$gradlew = Join-Path $projectRoot "gradlew.bat"
$gradleCommand = Get-Command gradle -ErrorAction SilentlyContinue
$androidStudio = "C:\Program Files\Android\Android Studio"
$androidStudioJava = Join-Path $androidStudio "jbr\bin\java.exe"
$apk = Join-Path $projectRoot "app\build\outputs\apk\debug\app-debug.apk"

function Fail-WithGuide($message) {
    Write-Host ""
    Write-Host $message -ForegroundColor Yellow
    Write-Host ""
    Write-Host "필요 조건:"
    Write-Host "1. Android Studio 설치"
    Write-Host "2. Android Studio에서 android-webview-shell 폴더를 한 번 열어 Gradle Sync 완료"
    Write-Host "3. 그 후 이 스크립트를 다시 실행"
    Write-Host ""
    Write-Host "자세한 설명: BUILD_APK_ON_WINDOWS.md"
    exit 1
}

if (!(Test-Path $gradlew) -and !$gradleCommand) {
    Fail-WithGuide "gradlew.bat 또는 gradle 명령을 찾을 수 없습니다. Android Studio에서 프로젝트를 열어 빌드하거나 Gradle을 설치하세요."
}

if (!$env:JAVA_HOME -and (Test-Path $androidStudioJava)) {
    $env:JAVA_HOME = Join-Path $androidStudio "jbr"
}

if (!$env:JAVA_HOME) {
    Fail-WithGuide "JAVA_HOME이 설정되어 있지 않습니다. Android Studio 설치가 필요합니다."
}

Write-Host "사전 웹 파일을 APK 내장 fallback assets로 동기화합니다."
& (Join-Path $projectRoot "sync-web-assets.ps1")

Write-Host ""
Write-Host "Debug APK를 빌드합니다."
Push-Location $projectRoot
try {
    if (Test-Path $gradlew) {
        & $gradlew ":app:assembleDebug"
    } else {
        & gradle ":app:assembleDebug"
    }
} finally {
    Pop-Location
}

if (!(Test-Path $apk)) {
    throw "APK build finished, but APK file was not found: $apk"
}

Write-Host ""
Write-Host "APK 생성 완료:"
Write-Host $apk -ForegroundColor Green
