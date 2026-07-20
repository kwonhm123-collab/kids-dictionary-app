# Windows에서 APK 빌드하기

현재 Codex 작업 환경에는 Android Studio, JDK, Gradle, adb가 설치되어 있지 않습니다. 그래서 이 PC에서 바로 APK 파일까지 생성하려면 Android Studio 설치가 먼저 필요합니다.

## 1. Android Studio 설치

1. Android Studio 설치
2. 설치 중 Android SDK, Android SDK Platform-Tools, Android SDK Build-Tools 포함
3. 설치 완료 후 Android Studio 실행

## 2. 프로젝트 열기

Android Studio에서 아래 폴더를 엽니다.

```text
C:\Users\kwonh\Documents\Codex\2026-07-12\ch\android-webview-shell
```

처음 열면 Gradle Sync가 실행됩니다. 필요한 Android Gradle Plugin과 Gradle wrapper가 준비될 때까지 기다립니다.

## 3. APK 빌드

Android Studio 메뉴에서:

```text
Build > Build Bundle(s) / APK(s) > Build APK(s)
```

또는 PowerShell에서:

```powershell
.\build-debug-apk.ps1
```

빌드 결과 위치:

```text
android-webview-shell\app\build\outputs\apk\debug\app-debug.apk
```

## 4. 갤럭시폰 설치

방법 A: 파일 복사 설치

1. `app-debug.apk`를 카카오톡, USB, 구글드라이브 등으로 갤럭시폰에 복사
2. 휴대폰에서 APK 실행
3. 출처를 알 수 없는 앱 설치 허용
4. 설치

방법 B: USB 디버깅 설치

1. 갤럭시폰 개발자 옵션 켜기
2. USB 디버깅 켜기
3. PC와 USB 연결
4. PowerShell에서 실행

```powershell
.\install-debug-apk.ps1
```

## 5. Family Link 설정

부모폰 Family Link에서:

```text
자녀 선택 > 스크린 타임 > 앱 제한 > 유니유니 영어사전 > 무제한 허용
```

Chrome은 계속 제한해도 됩니다. 이 APK는 Chrome 바로가기 방식이 아니라 Android WebView 앱입니다.

## 6. 업데이트 운영

일반 사전 업데이트:

1. Codex에서 사전 수정
2. GitHub 업로드
3. 휴대폰에서 앱 실행
4. 앱이 GitHub Pages 최신 사전을 로드

APK 재빌드가 필요한 경우:

- 앱 이름/아이콘 변경
- WebView 설정 변경
- 권한 변경
- 오프라인 내장 사전 파일 갱신

오프라인 내장 사전 파일만 최신화하려면:

```powershell
.\sync-web-assets.ps1
.\build-debug-apk.ps1
```
