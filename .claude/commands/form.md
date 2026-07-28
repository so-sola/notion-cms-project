---
description: react-hook-form + zod + Field 프리미티브 패턴을 따르는 폼 컴포넌트를 생성합니다
argument-hint: [component-name] [field:type, field:type, ...]
allowed-tools: Read, Write, Edit, Bash
---

@components/contact-form.tsx 를 참고 패턴으로 삼아 `components/$1.tsx`를 만드세요.

필드 명세: $2

요구사항:

- 파일 최상단에 `"use client"`.
- `react-hook-form`의 `useForm` + `Controller`, `@hookform/resolvers/zod`의 `zodResolver`, `zod`로 스키마를 정의하세요. 필드 명세를 바탕으로 적절한 zod 검증(필수 여부, 타입, 메시지는 한국어)을 구성하세요.
- 이 프로젝트 shadcn 레지스트리엔 통상적인 `Form`/`FormField` 컴포넌트가 없습니다. 대신 `@/components/ui/field`의 `Field`, `FieldGroup`, `FieldLabel`, `FieldError`, `FieldDescription`을 사용하세요.
- 텍스트 계열 입력(`Input`, `Textarea`)은 `register()`로 연결하고, 커스텀 컴포넌트(`Select`, `Checkbox`, `Switch` 등)는 `Controller`로 감싸 `value`/`onValueChange` 또는 `checked`/`onCheckedChange`로 연결하세요.
- 필드에 필요한 `components/ui/*` 컴포넌트가 아직 없다면 먼저 `npx shadcn@latest add <name> -y`로 설치하세요.
- 제출 성공 시 `sonner`의 `toast.success(...)`를 호출하고 `form.reset()`하세요.

완성되면 새로 설치한 컴포넌트가 있는지와 파일 경로를 알려주세요.
