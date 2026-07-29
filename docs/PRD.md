# PRD: Notion 포트폴리오 쇼케이스

## 프로젝트 개요
- 프로젝트명: Notion 포트폴리오 쇼케이스
- 목적: Notion을 CMS로 활용해 개인 프로젝트/작업물을 카드형 갤러리로 노출하는 포트폴리오 웹사이트 구축
- CMS 선택 이유: Notion API를 활용하여 비개발자도 콘텐츠 관리 가능 (재배포 없이 Notion에서 프로젝트 추가·수정·태그 변경 가능)

## 주요 기능
1. 프로젝트 카드 그리드 조회 — Notion DB에서 공개 상태인 프로젝트만 가져와 카드형 그리드로 표시
2. 태그 기반 필터링 — 기술 스택/카테고리 태그로 프로젝트를 필터링
3. 외부 링크 연결 — 카드 클릭 시 GitHub/데모 등 외부 링크로 새 탭 이동 (MVP에는 별도 상세 페이지 없음)

## 기술 스택
- Frontend: Next.js 16, TypeScript
- CMS: Notion API (`@notionhq/client`)
- Styling: Tailwind CSS, shadcn/ui
- Icons: Lucide React

## Notion 데이터베이스 구조
- 제목 (Title): 프로젝트명
- 설명 (Text): 한 줄 소개
- 썸네일 (Files & media): 카드 대표 이미지
- 태그 (Multi-select): 기술 스택/카테고리
- 링크 (URL): GitHub 저장소 또는 데모 링크
- 공개여부 (Checkbox): 웹사이트 노출 여부 (true인 항목만 조회)
- 정렬순서 (Number): 카드 노출 순서 (선택, 오름차순)
- 문제 정의 (Rich Text): 케이스 스터디 상세 페이지 "문제 정의" 섹션 본문 (V2)
- 목표 (Rich Text): 케이스 스터디 상세 페이지 "목표" 섹션 본문 (V2)
- 과정 (Rich Text): 케이스 스터디 상세 페이지 "과정" 섹션 본문 (V2)
- 결과 (Rich Text): 케이스 스터디 상세 페이지 "결과" 섹션 본문 (V2)

## 화면 구성
- 포트폴리오 목록 페이지 (`/`): 상단 소개 텍스트 + 태그 필터 바 + 프로젝트 카드 그리드
- 빈 상태 화면: 공개된 프로젝트가 없거나 필터 결과가 없을 때 안내 문구

## MVP 범위 (V1)
- 포함: Notion DB 연동, 카드 그리드 렌더링, 태그 필터링, 외부 링크 연결, 반응형 레이아웃
- 제외 (Out of Scope): 프로젝트 상세 페이지, 검색, 페이지네이션/무한스크롤, 방문자 분석, 다국어 지원
- ※ "프로젝트 상세 페이지"는 V1 기준 제외 항목이었으나 V2에서 범위에 포함됨 (`docs/roadmap.md` 1단계 참고)

## 구현 단계
1. Notion Integration 생성 및 데이터베이스 스키마 구성 (위 필드 기준)
2. `@notionhq/client` 설치 및 Notion API 연동 레이어 구현 (DB 조회 함수, 타입 정의)
3. UI 컴포넌트 구현 (ProjectCard, TagFilter, 그리드 레이아웃 — shadcn/ui 기반)
4. 환경 변수 설정(`NOTION_API_KEY`, `NOTION_DATABASE_ID`) 및 배포
