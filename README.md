# 💒 모바일 청첩장 템플릿

SvelteKit 기반의 반응형 웹 청첩장 템플릿 - WebP 최적화로 빠른 로딩 속도 보장! 🎉

## 🌐 라이브 데모

| 언어           | 링크                                                                           | 설명    |
| ------------ | ---------------------------------------------------------------------------- | ----- |
| 🇰🇷 한국어     | [wedding.woongheelee.com](https://wedding.woongheelee.com)                   | 기본 버전 |
| 🇺🇸 English | [wedding.woongheelee.com/?lang=en](https://wedding.woongheelee.com/?lang=en) | 영문 버전 |

> 💡 **QR코드로 모바일에서 확인해보세요!**
> 📱 아래 QR 코드를 스캔하여 모바일에서 청첩장을 확인하세요!
>
> <img src="qr_code.png" alt="Wedding Invitation QR Code" width="165" height="225">


## 📋 목차

- [💒 모바일 청첩장 템플릿](#-모바일-청첩장-템플릿)
  - [🌐 라이브 데모](#-라이브-데모)
  - [📋 목차](#-목차)
  - [✨ 주요 특징](#-주요-특징)
  - [🚀 빠른 시작](#-빠른-시작)
  - [📋 필수 수정 사항](#-필수-수정-사항)
    - [1. 기본 정보 설정](#1-기본-정보-설정)
    - [2. 청첩장 메인 사진 교체](#2-청첩장-메인-사진-교체)
    - [3. 갤러리 사진 교체](#3-갤러리-사진-교체)
    - [4. 예식장 정보 수정](#4-예식장-정보-수정)
    - [5. 계좌 정보 수정](#5-계좌-정보-수정)
    - [6. 결혼식 날짜 및 달력 수정](#6-결혼식-날짜-및-달력-수정)
    - [7. 편지 내용 수정](#7-편지-내용-수정)
  - [🎨 추가 꾸미기](#-추가-꾸미기)
    - [색상 테마 변경](#색상-테마-변경)
    - [하단 장식 이미지 교체](#하단-장식-이미지-교체)
    - [서명(Signature) 수정 또는 제거](#서명signature-수정-또는-제거)
  - [🚀 배포하기](#-배포하기)
    - [GitHub Pages 배포 (무료)](#github-pages-배포-무료)
    - [Vercel 배포 (권장)](#vercel-배포-권장)
    - [Netlify 배포](#netlify-배포)
  - [💡 팁](#-팁)
    - [🔥 사진 최적화 (중요!)](#-사진-최적화-중요)
    - [갤러리 랜덤 셔플](#갤러리-랜덤-셔플)
    - [언어 전환](#언어-전환)
  - [🛠 개발 환경 설정](#-개발-환경-설정)
  - [📱 테스트](#-테스트)
  - [⚠️ 주의사항](#️-주의사항)
  - [🙏 감사의 말](#-감사의-말)

## ✨ 주요 특징

- 📱 **완전 반응형** - 모바일 최적화
- 🌍 **다국어 지원** - 한국어/영어 자동 전환
- ⚡ **초고속 로딩** - WebP 최적화로 98% 용량 감소
- 🎨 **아름다운 디자인** - 모던하고 세련된 UI
- 📸 **포토 갤러리** - PhotoSwipe 라이트박스
- 🗓️ **달력 표시** - 결혼식 날짜 하이라이트
- 🗺️ **지도 연동** - Google Maps API
- 🎊 **축하 애니메이션** - 인터랙티브 효과

## 🚀 빠른 시작

```bash
# 1. 저장소 클론
git clone https://github.com/your-username/wedding-invitation.git
cd wedding-invitation

# 2. 의존성 설치
npm install

# 3. 개발 서버 실행
npm run dev

# 4. 브라우저에서 확인
# http://localhost:5173
```

## 📋 필수 수정 사항

### 1. 기본 정보 설정
**파일**: `src/locales/kr.json`, `src/locales/en.json`

```json
{
  "meta": {
    "title": "신랑이름과 신부이름의 결혼식에 여러분을 초대합니다."
  },
  "cover": {
    "date": "2025년 9월 13일 (토) 4시 30분",
    "place": "예식장 이름과 주소",
    "groom_name": "신랑이름",
    "bride_name": "신부이름"
  }
}
```

### 2. 청첩장 메인 사진 교체
**파일**: `src/lib/assets/cover.webp`
- **WebP 포맷** 사용 (JPEG 대비 30% 작은 용량)
- 세로 비율 권장 (9:16 또는 3:4)
- 해상도: 1600px 이상 권장
- 품질: 80% (최적 균형점)

### 3. 갤러리 사진 교체
**폴더**: `src/lib/assets/gallery/`

1. 기존 사진들을 모두 삭제
2. 새 사진들을 업로드 (권장: 20-30장)
3. **WebP 포맷**으로 변환 후 업로드
4. 파일명을 `01_photo.webp`, `02_photo.webp` 형식으로 변경
5. `src/components/gallery.svelte` 파일에서 import 경로 수정:

```javascript
import photo1 from '$lib/assets/gallery/01_photo.webp';
import photo2 from '$lib/assets/gallery/02_photo.webp';
// ... 추가 사진들

const originalPhotos = [
  {
    src: photo1,
    width: 1200,  // 실제 이미지 가로 크기
    height: 1800  // 실제 이미지 세로 크기
  },
  // ... 각 사진의 실제 크기 입력
];
```

**⚡ 이미지 최적화 가이드:**
- **WebP 포맷 사용** (현대 브라우저 100% 지원)
- 메인 이미지: 1600px, 품질 80%
- 갤러리 이미지: 1200px, 품질 75%
- [Squoosh](https://squoosh.app) 또는 Sharp를 사용한 자동 최적화 권장

### 4. 예식장 정보 수정
**파일**: `src/locales/kr.json`, `src/locales/en.json`

```json
{
  "location": {
    "venue_name": "예식장 이름 (홀 이름)",
    "venue_address": "예식장 주소",
    "venue_phone": "예식장 전화번호",
    "directions_title": "오시는 길"
  }
}
```

**지도 API 키 설정**:
1. `.env` 파일 생성
2. Google Maps API 키 추가:
```
PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

**지도 좌표 수정**:
`src/components/location.svelte`에서 venue 좌표 변경:
```javascript
const venue = {
  lat: 35.208140,  // 예식장 위도
  lng: 126.821766  // 예식장 경도
};
```

### 5. 계좌 정보 수정
**파일**: `src/locales/kr.json`, `src/locales/en.json`

```json
{
  "account": {
    "groom_title": "신랑 이름",
    "groom_bank": "은행명",
    "groom_account": "계좌번호",
    "bride_title": "신부 이름",
    "bride_bank": "은행명",
    "bride_account": "계좌번호"
  }
}
```

### 6. 결혼식 날짜 및 달력 수정
**파일**: `src/components/calendar.svelte`

```javascript
const year = 2025;
const month = 9; // 결혼식 월
const weddingDay = 13; // 결혼식 날짜
```

### 7. 편지 내용 수정
**파일**: `src/locales/kr.json`, `src/locales/en.json`

```json
{
  "letter": {
    "letter_content": "여러분께 드리는 편지 내용을 여기에 작성하세요."
  }
}
```

**가족 정보 수정** (한국어만):
`src/components/letter.svelte`에서:
```html
<p>
  아버지이름<span class="name-divider">{@html nameDivider}</span> 어머니이름
  <span class="son">{$_('letter.son_of')}</span>{$_('letter.groom_name')}
</p>
<p>
  신부아버지이름<span class="name-divider">{@html nameDivider}</span> 신부어머니이름<span class="daughter">의 딸</span>{$_('letter.bride_name')}
</p>
```

## 🎨 추가 꾸미기

### 색상 테마 변경
**파일**: `src/styles/_variables.scss`

```scss
$primary-color: #b99493; // 메인 색상
$bg-color-1: #f8f5f1;   // 배경색
$font-color-default: #6b6b6b; // 기본 폰트색
```

### 하단 장식 이미지 교체
**파일**: `src/lib/assets/letter-bottom.webp`
- **WebP 포맷** 사용
- 가로 비율 권장 (1200px, 품질 80%)
- 투명 배경이 필요한 경우 PNG 사용

### 서명(Signature) 수정 또는 제거
**파일**: `src/components/signature.svelte`

현재 하단에 "Customized with ♡ by Woonghee Lee & Tahmina Aslanova" 가 표시됩니다.

**수정하려면:**
```html
<p class="signature en">
  Customized with ♡ by 
  <a href="your-github-url" target="_blank" class="name-link">Your Name</a> 
  & 
  <a href="your-partner-url" target="_blank" class="name-link">Partner Name</a>
</p>
```

**완전히 제거하려면:**
- `src/components/signature.svelte` 파일 삭제
- `src/routes/+page.svelte`에서 `<Signature />` 컴포넌트 import 및 사용 제거

## 🚀 배포하기

### GitHub Pages 배포 (무료)
1. GitHub에 코드 업로드
2. Repository Settings → Pages
3. Source를 "GitHub Actions" 선택
4. `.github/workflows/deploy.yml` 파일 생성:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: 'main'

jobs:
  build_site:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Install Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: npm

      - name: Install dependencies
        run: npm install

      - name: Build
        env:
          BASE_PATH: '/${{ github.event.repository.name }}'
          PUBLIC_GOOGLE_MAPS_API_KEY: ${{ secrets.GOOGLE_MAPS_API_KEY }}
        run: npm run build

      - name: Upload Artifacts
        uses: actions/upload-pages-artifact@v3
        with:
          path: 'build/'

  deploy:
    needs: build_site
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy
        id: deployment
        uses: actions/deploy-pages@v4
```

5. `svelte.config.js`에서 GitHub Pages 설정:
```javascript
import adapter from '@sveltejs/adapter-static';

const config = {
  kit: {
    adapter: adapter(),
    paths: {
      base: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',
    }
  }
};

export default config;
```

6. Repository Secrets에 `GOOGLE_MAPS_API_KEY` 추가

### Vercel 배포 (권장)
1. GitHub에 코드 업로드
2. [Vercel](https://vercel.com)에서 GitHub 연결
3. 프로젝트 선택 후 배포
4. 환경변수에 `PUBLIC_GOOGLE_MAPS_API_KEY` 추가

### Netlify 배포
1. GitHub에 코드 업로드
2. [Netlify](https://netlify.com)에서 GitHub 연결
3. Build command: `npm run build`
4. Publish directory: `build`

## 💡 팁

### 🔥 사진 최적화 (중요!)
이 템플릿은 **WebP 포맷**을 사용하여 로딩 속도를 최적화했습니다.

**자동 최적화 스크립트:**
1. 원본 이미지를 `src/lib/assets/` 폴더에 넣고
2. 아래 스크립트를 실행하면 자동으로 WebP 변환:

```javascript
// optimize.js
import sharp from 'sharp';

// 커버 이미지 최적화
await sharp('cover-original.jpg')
  .resize({ width: 1600 })
  .webp({ quality: 80 })
  .toFile('cover.webp');

// 갤러리 이미지 최적화
await sharp('gallery-original.jpg')
  .resize({ width: 1200, height: 900, fit: 'inside' })
  .webp({ quality: 75 })
  .toFile('gallery.webp');
```

**수동 최적화:**
- [Squoosh](https://squoosh.app) - 구글의 무료 이미지 최적화 도구
- [TinyPNG](https://tinypng.com) - WebP 지원
- 갤러리 사진은 1200x1800 또는 1800x1200 비율 권장

**성능 향상 결과:**
- 기존: 200MB+ → 최적화 후: 3-4MB (98% 감소!)
- 모바일에서도 빠른 로딩 속도 보장

### 갤러리 랜덤 셔플
- 새로고침할 때마다 사진 순서가 랜덤하게 바뀝니다
- 개발 중에만 보고 싶다면 `src/components/gallery.svelte`에서:
```javascript
// Photos will be shuffled in onMount to avoid hydration mismatch
let photos = originalPhotos; // 이 줄을 주석해제하고 아래를 주석처리
// let photos = originalPhotos;
```

### 언어 전환
템플릿은 한국어/영어 2개 언어를 지원합니다:

**접속 방법:**
- 한국어: `your-domain.com/?lang=kr`
- 영어: `your-domain.com/?lang=en`
- 기본값 (한국어): `your-domain.com/`

**실제 예시 (GitHub Pages):**
- 한국어: `https://username.github.io/wedding-invitation/?lang=kr`
- 영어: `https://username.github.io/wedding-invitation/?lang=en`

**활용 팁:**
- 청첩장을 공유할 때 언어별 링크를 따로 보내세요
- QR코드를 만들 때도 언어별로 다르게 생성 가능
- 카톡, 문자 등에서 한국어는 `?lang=kr`, 이메일이나 외국인 지인에게는 `?lang=en` 링크 사용

## 🛠 개발 환경 설정

```bash
# 종속성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 빌드 미리보기
npm run preview
```

## 📱 테스트

모바일에서 테스트하려면:
1. 같은 네트워크에서 `npm run dev -- --host` 실행
2. 터미널에 표시된 Network URL로 모바일에서 접속

## ⚠️ 주의사항

1. **사진 저작권**: 사용하는 모든 사진에 대한 저작권을 확인하세요
2. **개인정보**: 계좌번호 등 민감한 정보는 신중히 공개하세요
3. **API 키**: `.env` 파일은 Git에 커밋하지 마세요

## 🙏 감사의 말

이 템플릿은 [anthopark](https://github.com/anthopark)님의 [our-wedding-invitation](https://github.com/anthopark/our-wedding-invitation) 프로젝트를 기반으로 제작되었습니다. 

원작자님께 깊은 감사를 드리며, 아름다운 청첩장을 만들 수 있는 기반을 제공해주셔서 정말 고맙습니다. 💕

---

**행복한 결혼식이 되시길 바랍니다! 🎊**
