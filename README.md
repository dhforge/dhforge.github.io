# EvergreenToolbox

GitHub Pages에 올릴 수 있는 정적 무료 도구 사이트입니다. 서버, 데이터베이스, 회원가입, 결제, 파일 업로드 저장 기능 없이 동작하도록 구성했습니다.

## 포함된 페이지

- `/` 한국어 홈
- `/en/` 영어 홈
- `/about.html`, `/en/about.html` 사이트 소개
- `/paper/` Printable Paper Lab 영어 서브사이트
- `/paper/ko/` Printable Paper Lab 한국어 서브사이트
- `/paper/about.html`, `/paper/ko/about.html` Printable Paper Lab 소개
- `/paper/ko/guides/` 한국어 인쇄용 종이 가이드
- `/kids/` Kids Practice Lab 한국어 서브사이트
- `/kids/en/` Kids Practice Lab 영어 서브사이트
- `/kids/about.html`, `/kids/en/about.html` Kids Practice Lab 소개
- `/study/` Study Card & Planner Lab 설치형 학습 웹앱
- `/char-counter/` 글자 수 계산기
- `/date-calculator/` 날짜 계산기
- `/unit-converter/` 단위 변환기
- `/random-picker/` 랜덤 추첨기
- `/qr-generator/` QR 코드 생성기
- `/text-cleaner/` 텍스트 정리 도구
- `/color-tool/` 색상 변환기
- `/timer/` 타이머와 스톱워치
- `/ratio-calculator/` 화면 비율 계산기
- `/image-resizer/` 이미지 리사이즈

영어판은 같은 경로 앞에 `/en/`을 붙인 구조입니다. 예: `/en/char-counter/`, `/en/date-calculator/`.
`sitemap.xml`에는 한국어/영어 URL과 `hreflang` 대체 링크가 함께 들어 있습니다. `sitemap-index.xml`은 루트, Paper, Kids 전용 사이트맵을 한 번에 묶습니다.

Printable Paper Lab은 `/paper/` 아래에 독립 사이트처럼 구성되어 있습니다. 영어판은 `/paper/`, 한국어판은 `/paper/ko/` 구조이며, 전용 사이트맵 `/paper/sitemap.xml`에는 두 언어 URL과 `hreflang` 대체 링크가 함께 들어 있습니다. 종이 템플릿은 방향과 선 두께 옵션을 지원하고, 한국어 가이드 페이지는 도구 페이지와 블로그 안내에서 내부 링크로 연결합니다.

Kids Practice Lab은 `/kids/` 아래에 구성되어 있으며 한국어와 영어 홈/도구 페이지를 제공합니다. 전용 사이트맵은 `/kids/sitemap.xml`입니다.

## 검증

로컬 서버를 띄운 뒤 다음 스크립트로 주요 페이지, 사이트맵, 404, 핵심 에셋 응답을 확인할 수 있습니다.

```powershell
powershell -ExecutionPolicy Bypass -File tools\Verify-Site.ps1
```

배포 전에는 `SEO_DEPLOY_CHECKLIST.md`를 보고 Search Console, 사이트맵, manifest, OG 이미지, 언어 대체 링크를 확인합니다.

## 배포

1. 이 폴더의 파일을 GitHub 저장소 루트에 올립니다.
2. GitHub 저장소 Settings > Pages에서 배포 브랜치를 선택합니다.
3. 기본 문의 이메일은 `dhforge@gmail.com`으로 설정되어 있습니다. 필요하면 `contact.html`과 `privacy.html`에서 교체합니다.
4. AdSense 승인 후 `ads.txt.example`의 게시자 ID를 교체하고 파일명을 `ads.txt`로 바꿉니다.
5. AdSense 승인 후 Google이 제공하는 광고 코드를 정책에 맞는 위치에 추가합니다.
6. 실제 배포 주소가 정해지면 Search Console에 등록하고 `sitemap.xml`을 제출합니다.

## AdSense 전 확인

- 실제 연락처로 교체
- 개인정보처리방침의 사이트 주소와 광고 설정 확인
- 광고가 콘텐츠와 도구 사용을 방해하지 않도록 배치
- 복제 콘텐츠, 자동 생성 저가치 페이지, 과도한 광고 배치 금지

## 운영 리스크를 낮추는 설계

- 법률, 세금, 금융, 의료, 투자처럼 규칙이 자주 바뀌는 주제 제외
- 텍스트와 파일은 브라우저 내부에서 처리
- 외부 폰트, 외부 이미지, 외부 CDN 없이 동작
- 서버 저장, 회원가입, 댓글, 결제 기능 없음
