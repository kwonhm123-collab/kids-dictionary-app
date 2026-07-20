# GitHub Actions로 APK 만들기

로컬 PC에 Android Studio, JDK, Gradle이 없어도 GitHub에서 APK를 빌드할 수 있습니다.

## 자동 빌드 조건

아래 파일이 GitHub에 올라가면 APK 빌드가 자동 실행됩니다.

- `android-webview-shell/**`
- `outputs/kids-dictionary-release/**`
- `.github/workflows/build-android-apk.yml`

## 수동 빌드 방법

1. GitHub 저장소 접속
2. `Actions` 탭 클릭
3. `Build Android APK` 선택
4. `Run workflow` 클릭
5. 빌드 완료 대기
6. 완료된 실행 화면 아래 `Artifacts`에서 `uniuni-dictionary-debug-apk` 다운로드
7. 압축을 풀면 `app-debug.apk`가 나옵니다.

## 갤럭시폰 설치

1. `app-debug.apk`를 갤럭시폰으로 전송
2. 파일 앱에서 APK 실행
3. 설치 허용
4. 설치 완료 후 `유니유니 영어사전` 실행

## Family Link 설정

부모폰 Family Link에서:

```text
자녀 선택 > 스크린 타임 > 앱 제한 > 유니유니 영어사전 > 무제한 허용
```

이 앱은 Chrome PWA가 아니라 Android WebView APK입니다. Chrome이 일시중지되어도 앱 자체는 별도 앱으로 관리됩니다.

## 사전 업데이트 방식

기본 실행은 GitHub Pages 최신 사전입니다.

```text
https://kwonhm123-collab.github.io/kids-dictionary-app/
```

따라서 일반적인 단어, 뜻, 예문, 발음기호, 화면 수정은 기존처럼 GitHub Pages에 업로드하면 앱 실행 시 최신 내용이 반영됩니다.

APK를 다시 받아 설치해야 하는 경우는 다음과 같습니다.

- 앱 이름, 아이콘, 패키지명 변경
- WebView 설정 변경
- 권한 변경
- 오프라인 fallback 내장 사전 파일을 최신화해서 APK에 포함하고 싶은 경우
