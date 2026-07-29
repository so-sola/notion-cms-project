# Development Guidelines

이 문서는 AI Agent가 이 저장소에서 코드를 작성/수정할 때 지켜야 할 **프로젝트 고유 규칙**만 다룬다. React/Next.js/TypeScript 일반 지식은 다루지 않는다.

## 1. 프로젝트 현재 상태 (반드시 먼저 인지할 것)

- 이 저장소는 `package.json` 상 `claude-nextjs-starters`라는 **스타터킷 스캐폴드**이며, 목표는 `docs/PRD.md` + `docs/ROADMAP.md`에 정의된 "Notion 포트폴리오 쇼케이스"를 만드는 것이다.
- **현재 Notion 연동 코드는 전혀 존재하지 않는다.** `lib/notion.ts`, `types/project.ts`, `ProjectCard`, `TagFilter`, `hooks/` 디렉토리 모두 없음. `app/page.tsx`는 아직 스타터킷 데모 콘텐츠(기능 카드, FAQ, 위험구역 데모, 문의 폼)를 렌더링 중이다.
- 작업 시작 전 `docs/ROADMAP.md`의 단계 구분(1: 골격 → 2: 공통 모듈 → 3: 핵심 기능 → 4: 추가 기능 → 5: 최적화/배포)을 확인하고, **현재 몇 단계가 완료되어 있는지 코드에서 직접 확인**한 뒤 다음 단계 작업만 진행한다. 완료되지 않은 단계를 건너뛰어 4~5단계 작업(캐싱 전략, SEO 메타데이터 등)을 먼저 하지 않는다.
- MVP 범위 밖(`docs/PRD.md` Out of Scope): 프로젝트 상세 페이지, 검색, 페이지네이션/무한스크롤, 방문자 분석, 다국어 지원. 사용자가 명시적으로 요청하지 않는 한 이 5가지를 구현하지 않는다.

## 2. Next.js 16 문서 검증 규칙 (중요: 기존 지시와 실제 상태가 다름)

- `AGENTS.md`와 `.claude/agents/nextjs16-api-guard.md`는 "`node_modules/next/dist/docs/`에서 breaking change 문서를 확인하라"고 지시하지만, **이 경로는 실제로 존재하지 않는다** (확인됨: `ls` 결과 `No such file or directory`).
- 따라서 Next.js 16 API(라우팅, `params`/`searchParams`, 서버 액션, 캐싱 등)를 확인해야 할 때는:
  - **하지 말 것**: `node_modules/next/dist/docs/`를 찾으려 시도하고 없으면 그냥 학습 데이터 기억으로 추측해서 작성하는 것.
  - **할 것**: `context7` MCP(`mcp__context7__resolve-library-id`, `mcp__context7__query-docs`)로 Next.js 16 최신 공식 문서를 조회한 뒤 작성한다. `.mcp.json`에 이미 `context7` 서버가 등록되어 있다.
- 알려진 고정 규칙 (`.claude/commands/new-page.md` 기준, 이미 검증됨):
  - `params`/`searchParams`는 항상 `Promise`이며 동기 접근 불가. `await params`로 값을 꺼낸다.
  - 페이지 props 타입은 직접 정의하지 않고 Next가 자동 생성하는 전역 헬퍼 `PageProps<'/경로'>`를 사용한다 (import 불필요).
  - 병렬 라우트 슬롯(`@slot`)을 추가하면 `default.tsx`도 함께 만들어야 빌드가 통과한다.

## 3. shadcn/ui · Base UI 사용 규칙

- 이 프로젝트는 표준 shadcn/ui(Radix 기반)가 **아니다**. `components.json`의 `style: "base-nova"` + `@base-ui/react` 프리미티브 기반이다. 학습 데이터의 일반적인 shadcn API(예: `asChild` prop)를 그대로 가정하지 말 것.
- Trigger류 컴포넌트는 `asChild`가 아니라 `render` prop으로 실제 엘리먼트를 합성한다.
  - 예 (`components/layout/header.tsx`): `<SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" />}>`
- **표준 `Form`/`FormField` 컴포넌트가 이 레지스트리에 없다.** 폼을 만들 때 `Form`을 import하지 말고 `@/components/ui/field`의 `Field`, `FieldGroup`, `FieldLabel`, `FieldError`, `FieldDescription`을 사용한다.
- 새 shadcn 컴포넌트가 필요하면 반드시 CLI로 추가한다: `npx shadcn@latest add <name> -y`. 손으로 Radix 기반 컴포넌트를 새로 작성하지 않는다.
- `form`을 요청받으면 이 레지스트리엔 존재하지 않으므로 `field`(`FieldSet`/`Field`/`FieldLabel`/`FieldError`)를 대신 설치한다.

## 4. 컴포넌트 작성 컨벤션 (기존 코드 전수 확인, 예외 없음)

- `components/**/*.tsx`는 다음 패턴을 따른다: 화살표 함수/`export default` 대신 **named function 선언 후 파일 하단에서 named export**.
  ```tsx
  function Foo({ ...props }: FooProps) {
    // ...
  }

  export { Foo }
  ```
  실제 예: `components/theme-toggle.tsx`, `components/layout/header.tsx`, `components/layout/footer.tsx`, `components/layout/container.tsx`, `components/contact-form.tsx`, `components/danger-zone-demo.tsx` 전부 이 패턴.
- **예외**: `app/**/page.tsx`, `app/layout.tsx`는 Next.js App Router 규약상 `export default function ...`를 유지한다 (파일 하단 named export로 바꾸지 말 것).
- `"use client"`는 실제로 인터랙션(상태, 이벤트 핸들러, 브라우저 API)이 필요한 컴포넌트에만 최상단에 선언한다. 서버 컴포넌트로 둘 수 있는 페이지(`app/*/page.tsx`)를 이유 없이 클라이언트 컴포넌트로 만들지 않는다 — 인터랙션이 필요한 부분만 별도 `"use client"` 하위 컴포넌트로 분리한다 (`.claude/commands/new-page.md` 지침).
- 클래스명 조합/조건부 클래스는 항상 `@/lib/utils`의 `cn()`을 사용한다. `clsx`/`twMerge`를 직접 개별 import하지 않는다.
- 새 라우트 페이지는 `@/components/layout/container`의 `Container`로 콘텐츠를 감싼다. `Header`/`Footer`는 `app/layout.tsx`에서 이미 전역으로 렌더링되므로 페이지 안에서 다시 추가하지 않는다.

## 5. Notion CMS 데이터 계층 표준 (ROADMAP 2~3단계 구현 시 적용)

- Notion 연동 레이어를 만들 때 파일 위치를 다음과 같이 고정한다:
  - `lib/notion.ts`: `@notionhq/client` 초기화 + `getPublishedProjects()` 등 DB 조회 함수 + Notion 응답 → 프로젝트 타입 매핑 파서
  - `types/project.ts`: 프로젝트 타입 정의 (PRD 필드와 1:1 매핑)
- `docs/PRD.md`의 Notion DB 필드는 다음과 같이 고정 매핑한다. 필드명을 임의로 바꾸거나 새 필드를 추가로 상정하지 않는다 (단, V2 1단계에서 사용자가 확정한 케이스 스터디 4개 Rich Text 속성은 예외).

  | Notion 필드 | 타입 | 매핑 |
  |---|---|---|
  | 제목 | Title | 프로젝트명 |
  | 설명 | Text | 한 줄 소개 |
  | 썸네일 | Files & media | 카드 대표 이미지 |
  | 태그 | Multi-select | 기술 스택/카테고리 |
  | 링크 | URL | GitHub/데모 링크 |
  | 공개여부 | Checkbox | `true`인 항목만 조회 |
  | 정렬순서 | Number | 오름차순 정렬 (선택 필드) |
  | 문제 정의 | Rich Text | 상세 페이지 케이스 스터디 "문제 정의" 섹션 (V2) |
  | 목표 | Rich Text | 상세 페이지 케이스 스터디 "목표" 섹션 (V2) |
  | 과정 | Rich Text | 상세 페이지 케이스 스터디 "과정" 섹션 (V2) |
  | 결과 | Rich Text | 상세 페이지 케이스 스터디 "결과" 섹션 (V2) |
  | 기간 | Rich Text | 상세 페이지 진행 기간 자유 텍스트, 예 "2024.01 - 2024.03" (V2) |
  | 역할 | Rich Text | 상세 페이지 담당 역할 (V2) |
  | 팀 구성 | Rich Text | 상세 페이지 팀 규모/구성 (V2) |

- **공개여부 필터링과 정렬순서 정렬은 반드시 서버(`lib/notion.ts`의 조회 함수 내부, Notion 쿼리 단계)에서 처리한다.** 비공개 프로젝트 데이터를 클라이언트로 내려보낸 뒤 클라이언트에서 필터링하지 않는다.
- 환경 변수는 `NOTION_API_KEY`, `NOTION_DATABASE_ID` 두 개로 고정한다 (`docs/PRD.md`, `docs/ROADMAP.md` 명시). 이 레이어를 처음 구현할 때 `.env.example`을 함께 생성하고, `.env.local`은 절대 커밋하지 않는다 (`.gitignore`에 이미 `.env*` 포함되어 있음 — 유지할 것).
- Notion API 캐싱/재검증(ISR 등) 전략은 ROADMAP 5단계(최적화/배포) 작업이다. 3~4단계 작업 중에 캐싱 전략을 임의로 먼저 설계하지 않는다.

## 6. 폼 구현 표준

- 새 폼은 `components/contact-form.tsx`를 참고 패턴으로 삼는다: `react-hook-form`의 `useForm`/`Controller` + `@hookform/resolvers/zod`의 `zodResolver` + `zod` 스키마.
- 텍스트 계열 입력(`Input`, `Textarea`)은 `register()`로 연결. 커스텀 컴포넌트(`Select`, `Checkbox` 등 값이 `value`/`onValueChange` 또는 `checked`/`onCheckedChange` 형태인 것)는 `Controller`로 감싼다.
- zod 검증 메시지는 한국어로 작성한다 (예: `"이름을 2자 이상 입력해주세요."`).
- 제출 성공 시 `sonner`의 `toast.success(...)`를 호출하고 `form.reset()`한다.

## 7. 핵심 파일 동시 수정 규칙

| 변경 대상 | 함께 확인/수정해야 할 파일 |
|---|---|
| `docs/PRD.md`의 Notion DB 필드 스키마 | `types/project.ts`, `lib/notion.ts` 파서, `docs/ROADMAP.md` 완료 기준 체크리스트 |
| `app/page.tsx`를 Notion 프로젝트 그리드로 교체 | `docs/ROADMAP.md` 3단계 완료 기준 대조 (공개여부 필터, 정렬순서, 태그 필터, 외부 링크 4가지 동작 확인) |
| `docs/PRD.md` 또는 `docs/ROADMAP.md` 파일명/경로 변경 | `CLAUDE.md`의 `@docs/PRD.md`, `@docs/ROADMAP.md` 참조 갱신 |
| 새 shadcn 컴포넌트 추가 | `.claude/commands/ui.md`에 설명된 절차(CLI 설치 후 `@base-ui/react` 프리미티브·API 특이사항 요약)를 따를 것 |
| `NOTION_API_KEY`/`NOTION_DATABASE_ID` 최초 도입 | `.env.example` 신규 생성 (실제 값은 `.env.local`에만, 커밋 금지) |

## 8. 금지 사항

- **금지**: `node_modules/next/dist/docs/`가 존재한다고 가정하고 그 경로를 근거로 코드를 작성하는 것. 존재하지 않으므로 `context7` MCP를 사용한다 (2절 참고).
- **금지**: 표준 shadcn/ui(Radix, `asChild`) API를 이 프로젝트에 그대로 가정하는 것. 이 프로젝트는 `base-nova` + `@base-ui/react`이다 (3절 참고).
- **금지**: MVP 범위 밖 기능(상세 페이지, 검색, 페이지네이션/무한스크롤, 방문자 분석, 다국어)을 사용자 요청 없이 먼저 구현하는 것.
- **금지**: `test-runner` 에이전트 지침대로, 테스트 프레임워크(jest/vitest/playwright)가 설정되어 있지 않은 상태에서 임의로 설치하거나 테스트 명령을 추측 실행하는 것. 없으면 "테스트 프레임워크 미설정"이라고 보고하고 종료한다.
- **금지**: 클라이언트 컴포넌트에서 비공개(`공개여부=false`) Notion 프로젝트 데이터를 필터링하는 것 (반드시 서버 조회 단계에서 필터링, 5절 참고).
- **금지**: `.claude/settings.local.json`을 공유 프로젝트 설정처럼 다루는 것 — 이 파일은 `.gitignore`에 등록된 개인 로컬 오버라이드다.
