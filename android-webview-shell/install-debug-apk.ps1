$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$apk = Join-Path $projectRoot "app\build\outputs\apk\debug\app-debug.apk"

if (!(Test-Path $apk)) {
    Write-Host "APK 파일이 없습니다. 먼저 build-debug-apk.ps1을 실행하세요." -ForegroundColor Yellow
    exit 1
}

$adb = Get-Command adb -ErrorAction SilentlyContinue
if (!$adb) {
    Write-Host "adb 명령을 찾을 수 없습니다." -ForegroundColor Yellow
    Write-Host "Android Studio 설치 후 Android SDK Platform-Tools를 PATH에 추가하거나,"
    Write-Host "Android Studio > Device Manager 또는 파일 복사 방식으로 APK를 설치하세요."
    Write-Host ""
    Write-Host "APK 위치:"
    Write-Host $apk
    exit 1
}

Write-Host "연결된 Android 기기 목록:"
& adb devices

Write-Host ""
Write-Host "APK를 설치합니다."
& adb install -r $apk
