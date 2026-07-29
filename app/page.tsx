import { Suspense } from "react";

import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { ProjectShowcaseSection } from "@/components/project-showcase-section";
import { ProjectShowcaseSkeleton } from "@/components/project-showcase-skeleton";

export default function Home() {
  return (
    <>
      <section className="border-b border-border py-20 sm:py-28">
        <Container className="flex flex-col items-center gap-6 text-center">
          <Badge variant="secondary">Portfolio</Badge>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            프로젝트 쇼케이스
          </h1>
          <p className="max-w-xl text-balance text-muted-foreground">
            직접 만든 프로젝트들을 모아둔 공간입니다. 태그로 필터링해 관심 있는
            작업을 살펴보세요.
          </p>
        </Container>
      </section>

      <section id="projects" className="py-16 sm:py-24">
        <Container>
          <Suspense fallback={<ProjectShowcaseSkeleton />}>
            <ProjectShowcaseSection />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
