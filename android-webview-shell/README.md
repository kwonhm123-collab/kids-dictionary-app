# 유니유니 영어사전 Android APK 셸

이 프로젝트는 갤럭시 안드로이드폰에서 Family Link 앱 제한을 우회하지 않고 정상적으로 관리하기 위한 독립 APK 셸입니다.

## 동작 방식

- 앱 이름: 유니유니 영어사전
- 패키지명: `com.unidictionary.kids`
- 기본 실행 주소: `https://kwonhm123-collab.github.io/kids-dictionary-app/`
- 인터넷 연결이 되면 GitHub Pages의 최신 사전이 열립니다.
- 인터넷 연결 또는 GitHub 접속이 실패하면 APK 안에 포함된 `assets/www/index.html` 사전으로 자동 전환됩니다.

## 업데이트 방식

일반적인 단어, 뜻, 예문, 발음기호, CSS, 화면 수정은 기존처럼 GitHub Pages에 반영하면 됩니다.

1. Codex에서 사전 수정
2. GitHub에 업로드
3. 휴대폰에서 유니유니 영어사전 앱 실행
4. 앱이 GitHub Pages 최신 버전을 로드

APK 자체를 다시 설치해야 하는 경우는 Android 앱 껍데기 자체가 바뀔 때입니다.

- 앱 이름 변경
- 패키지명 변경
- WebView 설정 변경
- 권한 변경
- 아이콘 변경
- 오프라인 내장 사전 파일을 최신으로 다시 포함하고 싶을 때

## APK 빌드 방법

PC에 Android Studio가 필요합니다.

1. Android Studio 설치
2. `android-webview-shell` 폴더 열기
3. Gradle Sync 실행
4. `Build > Build Bundle(s) / APK(s) > Build APK(s)` 선택
5. 생성된 APK를 갤럭시폰에 설치

## Family Link 설정

1. 부모폰에서 Family Link 실행
2. 자녀 선택
3. `스크린 타임 > 앱 제한`
4. `유니유니 영어사전` 선택
5. `무제한 허용` 설정

이 앱은 Chrome 바로가기/PWA가 아니라 Android WebView 기반 독립 앱이므로 Chrome 앱이 일시중지되어도 실행되도록 구성되어 있습니다.
