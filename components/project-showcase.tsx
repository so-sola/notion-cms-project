"use client"

import { useState } from "react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/project-card"
import { TagFilter } from "@/components/tag-filter"
import type { Project } from "@/types/project"

interface ProjectShowcaseProps {
  projects: Project[]
}

function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)))
  const [selected, setSelected] = useState<string[]>([])

  const filtered =
    selected.length === 0
      ? projects
      : projects.filter((p) => p.tags.some((tag) => selected.includes(tag)))

  if (projects.length === 0) {
    return (
      <div className="flex min-h-[240px] items-center justify-center">
        <Alert className="max-w-md text-center">
          <AlertTitle>아직 공개된 프로젝트가 없습니다</AlertTitle>
          <AlertDescription>곧 새로운 프로젝트로 찾아뵙겠습니다.</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <>
      <TagFilter tags={allTags} selected={selected} onChange={setSelected} />
      {filtered.length === 0 ? (
        <div className="flex min-h-[240px] flex-col items-center justify-center gap-4">
          <Alert className="max-w-md text-center">
            <AlertTitle>선택한 태그에 해당하는 프로젝트가 없습니다</AlertTitle>
            <AlertDescription>
              다른 태그를 선택하거나 전체 보기로 돌아가세요.
            </AlertDescription>
          </Alert>
          <Button variant="outline" onClick={() => setSelected([])}>
            전체 보기
          </Button>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </>
  )
}

export { ProjectShowcase }
