import { ExternalLink, ImageOff } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProjectById } from "@/lib/notion";

// 목록 페이지와 동일한 근거: Notion 서명 URL이 1시간 후 만료되므로 그보다 충분히 짧은 주기로 재검증
export const revalidate = 600;

export async function generateMetadata({
  params,
}: PageProps<"/projects/[id]">): Promise<Metadata> {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) return {};

  const title = `${project.title} | 프로젝트 쇼케이스`;

  return {
    title,
    description: project.description,
    openGraph: {
      title,
      description: project.description,
      type: "article",
    },
  };
}

export default async function ProjectDetailPage(
  props: PageProps<"/projects/[id]">
) {
  const { id } = await props.params;
  const project = await getProjectById(id);

  if (!project) notFound();

  return (
    <Container className="max-w-3xl py-16 sm:py-24">
      <div className="flex flex-col gap-6">
        {project.thumbnailUrl ? (
          <div className="relative aspect-video w-full overflow-hidden rounded-xl">
            <Image
              src={project.thumbnailUrl}
              alt={project.title}
              fill
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        ) : (
          <div className="flex aspect-video w-full items-center justify-center rounded-xl bg-muted text-muted-foreground">
            <ImageOff className="size-8" />
          </div>
        )}

        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {project.title}
          </h1>
          <p className="text-muted-foreground">{project.description}</p>
          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          {(project.period || project.role || project.team) && (
            <dl className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
              {project.period && (
                <div className="flex items-center gap-1.5">
                  <dt className="font-medium text-foreground">기간</dt>
                  <dd>{project.period}</dd>
                </div>
              )}
              {project.role && (
                <div className="flex items-center gap-1.5">
                  <dt className="font-medium text-foreground">역할</dt>
                  <dd>{project.role}</dd>
                </div>
              )}
              {project.team && (
                <div className="flex items-center gap-1.5">
                  <dt className="font-medium text-foreground">팀 구성</dt>
                  <dd>{project.team}</dd>
                </div>
              )}
            </dl>
          )}
        </div>

        {project.link && (
          <Button
            render={
              <a href={project.link} target="_blank" rel="noopener noreferrer" />
            }
            className="w-fit"
          >
            <ExternalLink />
            외부 링크로 이동
          </Button>
        )}

        <div className="flex flex-col gap-10 border-t border-border pt-10">
          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold tracking-tight">문제 정의</h2>
            <p className="whitespace-pre-wrap text-muted-foreground">
              {project.problemDefinition}
            </p>
          </section>
          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold tracking-tight">목표</h2>
            <p className="whitespace-pre-wrap text-muted-foreground">
              {project.goal}
            </p>
          </section>
          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold tracking-tight">과정</h2>
            <p className="whitespace-pre-wrap text-muted-foreground">
              {project.process}
            </p>
          </section>
          <section className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold tracking-tight">결과</h2>
            <p className="whitespace-pre-wrap text-muted-foreground">
              {project.result}
            </p>
          </section>
        </div>
      </div>
    </Container>
  );
}
