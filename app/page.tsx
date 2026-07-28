import { Rocket, Palette, ShieldCheck, ExternalLink, Info } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ContactForm } from "@/components/contact-form";
import { DangerZoneDemo } from "@/components/danger-zone-demo";

const features = [
  {
    icon: Rocket,
    title: "빠른 시작",
    description:
      "Next.js 16 App Router와 Turbopack이 기본 설정되어 있어 바로 개발을 시작할 수 있습니다.",
  },
  {
    icon: Palette,
    title: "일관된 디자인 시스템",
    description:
      "shadcn/ui 토큰 기반 테마와 다크모드가 미리 구성되어 있어 디자인 고민을 줄여줍니다.",
  },
  {
    icon: ShieldCheck,
    title: "검증된 폼 처리",
    description:
      "react-hook-form과 zod로 폼 검증을 직접 구현하지 않고 표준화된 방식으로 처리합니다.",
  },
];

const faqs = [
  {
    question: "이 스타터킷은 어떤 스택으로 구성되어 있나요?",
    answer:
      "Next.js 16(App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui(base-nova, @base-ui/react) · lucide-react로 구성되어 있습니다.",
  },
  {
    question: "다크모드는 어떻게 동작하나요?",
    answer:
      "next-themes로 라이트/다크/시스템 테마를 전환하며, 헤더의 테마 토글 버튼에서 바로 변경할 수 있습니다.",
  },
  {
    question: "새 shadcn 컴포넌트는 어떻게 추가하나요?",
    answer:
      "npx shadcn add <컴포넌트명> 명령으로 이 프로젝트의 레지스트리(base-nova) 스타일에 맞춰 자동 생성됩니다.",
  },
];

export default function Home() {
  return (
    <>
      <section className="border-b border-border py-20 sm:py-28">
        <Container className="flex flex-col items-center gap-6 text-center">
          <Badge variant="secondary">Next.js 16 · shadcn/ui</Badge>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            바로 시작하는 모던 웹 스타터킷
          </h1>
          <p className="max-w-xl text-balance text-muted-foreground">
            레이아웃, 다크모드, 폼 검증까지 미리 갖춰진 컴포넌트 세트로
            아이디어 구현에만 집중하세요.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button size="lg">시작하기</Button>
            <Button size="lg" variant="outline">
              <ExternalLink />
              GitHub
            </Button>
            <Button size="lg" variant="ghost">
              문서 보기
            </Button>
          </div>
        </Container>
      </section>

      <section id="features" className="py-16 sm:py-24">
        <Container>
          <div className="mb-10 flex flex-col items-center gap-2 text-center">
            <h2 className="text-2xl font-semibold tracking-tight">주요 기능</h2>
            <p className="text-muted-foreground">
              이 스타터킷에 이미 포함되어 있는 것들
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <Card key={title}>
                <CardHeader>
                  <div className="mb-2 flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <CardTitle>{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <Separator />

      <section id="faq" className="py-16 sm:py-24">
        <Container className="max-w-2xl">
          <div className="mb-8 flex flex-col items-center gap-2 text-center">
            <h2 className="text-2xl font-semibold tracking-tight">
              자주 묻는 질문
            </h2>
          </div>
          <Accordion>
            {faqs.map(({ question, answer }) => (
              <AccordionItem key={question} value={question}>
                <AccordionTrigger>{question}</AccordionTrigger>
                <AccordionContent>{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </section>

      <Separator />

      <section className="py-16 sm:py-24">
        <Container className="max-w-2xl">
          <div className="mb-2 flex items-center gap-2">
            <h2 className="text-2xl font-semibold tracking-tight">
              위험 구역 예시
            </h2>
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label="위험 구역 설명"
                  />
                }
              >
                <Info />
              </TooltipTrigger>
              <TooltipContent>Alert + Alert Dialog 조합 예시입니다</TooltipContent>
            </Tooltip>
          </div>
          <DangerZoneDemo />
        </Container>
      </section>

      <Separator />

      <section id="contact" className="py-16 sm:py-24">
        <Container className="max-w-xl">
          <div className="mb-8 flex flex-col items-center gap-2 text-center">
            <h2 className="text-2xl font-semibold tracking-tight">문의하기</h2>
            <p className="text-muted-foreground">
              react-hook-form + zod로 검증되는 폼 예시입니다.
            </p>
          </div>
          <ContactForm />
        </Container>
      </section>
    </>
  );
}
