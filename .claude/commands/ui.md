---
description: shadcn/ui 컴포넌트를 추가하고 이 프로젝트 규약에 맞는 사용법을 요약합니다
argument-hint: [component-name...]
allowed-tools: Bash, Read
---

이 프로젝트는 표준 shadcn/ui(Radix 기반)가 아니라 `base-nova` 스타일 + `@base-ui/react` 프리미티브를 사용합니다(`components.json` 참고). 학습 데이터에 있는 통상적인 shadcn API를 그대로 가정하지 마세요.

아래 컴포넌트를 이 프로젝트의 레지스트리에 맞춰 설치하세요:

!`npx shadcn@latest add $ARGUMENTS -y`

만약 `form`을 요청받았다면 이 레지스트리엔 존재하지 않으니, 대신 `field`(`FieldSet`/`Field`/`FieldLabel`/`FieldError`) 컴포넌트를 설치하고 그 이유를 설명하세요.

설치된 `components/ui/*.tsx` 파일을 읽고 다음을 요약해서 알려주세요:

1. 어떤 `@base-ui/react/...` 프리미티브를 기반으로 하는지
2. 이 프로젝트의 기존 컴포넌트(`button.tsx`, `dropdown-menu.tsx`, `sheet.tsx` 등)와 비교했을 때 특이한 API가 있는지(예: `render` prop으로 다른 엘리먼트에 합성하는 패턴, `data-slot`, cva variant 등)
3. `react-hook-form`과 결합할 때 `register()`로 충분한 네이티브 입력인지, 아니면 커스텀 컴포넌트라 `Controller`가 필요한지(`value`/`onValueChange` 또는 `checked`/`onCheckedChange` 형태인지)
4. 짧은 사용 예시 코드 스니펫
