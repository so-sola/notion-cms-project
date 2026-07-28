# Notion 포트폴리오 쇼케이스

Notion을 CMS로 활용한 포트폴리오 웹 프로젝트입니다. Notion 데이터베이스에 프로젝트를 등록하면 웹사이트에 카드형 그리드로 자동 노출되어, 재배포 없이 콘텐츠를 관리할 수 있습니다.

- 프로젝트 카드 그리드 조회 및 태그 기반 필터링
- Notion API(`@notionhq/client`) 연동
- Next.js 16, TypeScript, Tailwind CSS, shadcn/ui 기반

자세한 기획 내용은 [`docs/PRD.md`](./docs/PRD.md)를 참고하세요.

이 프로젝트는 [Next.js](https://nextjs.org)로 만들어졌으며 [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app)으로 부트스트랩되었습니다.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
