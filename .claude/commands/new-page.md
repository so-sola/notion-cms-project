---
description: Next.js 16 App Router 컨벤션에 맞는 새 라우트를 스캐폴딩합니다
argument-hint: [route-path] (예: about, blog/[slug])
allowed-tools: Read, Write, Edit, Bash
---

`app/$1/page.tsx`를 생성하세요. 이 프로젝트는 Next.js 16이므로 아래 사항을 반드시 지키세요(자세한 내용은 `node_modules/next/dist/docs` 참고, 학습 데이터의 통상적인 Next.js 규약과 다를 수 있습니다):

- `params`/`searchParams`는 항상 `Promise`이며 동기 접근을 지원하지 않습니다. 동적 라우트라면 `params: Promise<{ ... }>`로 타입을 잡고 `await params`로 값을 꺼내세요.
- 타입을 직접 만들지 말고 Next가 자동 생성하는 전역 헬퍼 타입 `PageProps<'/$1'>`을 사용하세요(별도 import 불필요).
- 페이지는 서버 컴포넌트로 유지하고, 인터랙션이 필요한 부분만 별도 `"use client"` 컴포넌트로 분리하세요.
- `@/components/layout/container`의 `Container`로 콘텐츠를 감싸 기존 페이지들과 여백을 맞추세요. `Header`/`Footer`는 이미 `app/layout.tsx`에서 전역으로 감싸고 있으니 페이지 안에서 다시 넣지 마세요.
- 필요하면 `export const metadata: Metadata = { title: "...", description: "..." }`를 추가하세요.
- 라우트 세그먼트에 괄호 없는 병렬 라우트 슬롯(`@slot`)이 있다면 `default.tsx`도 함께 만들어야 빌드가 통과합니다.

생성 후 `npm run build`로 타입/빌드 오류가 없는지 확인하세요.
