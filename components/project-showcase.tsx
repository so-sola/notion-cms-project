"use client"

import { useCallback, useMemo } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectCard } from "@/components/project-card"
import { TagFilter } from "@/components/tag-filter"
import type { Project } from "@/types/project"

const FEATURED_COUNT = 3

interface ProjectShowcaseProps {
  projects: Project[]
}

function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)))
  const selected = useMemo(
    () => searchParams.get("tags")?.split(",").filter(Boolean) ?? [],
    [searchParams]
  )
  const mode = searchParams.get("mode") === "and" ? "AND" : "OR"

  const featuredIds = useMemo(
    () =>
      new Set(
        projects
          .filter((p) => p.order !== null)
          .slice(0, FEATURED_COUNT)
          .map((p) => p.id)
      ),
    [projects]
  )

  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const project of projects) {
      for (const tag of project.tags) {
        counts[tag] = (counts[tag] ?? 0) + 1
      }
    }
    return counts
  }, [projects])

  const updateQuery = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString())
      for (const [key, value] of Object.entries(updates)) {
        if (value === null) params.delete(key)
        else params.set(key, value)
      }
      const query = params.toString()
      router.replace(`${pathname}${query ? `?${query}` : ""}`, {
        scroll: false,
      })
    },
    [pathname, router, searchParams]
  )

  const handleTagsChange = useCallback(
    (tags: string[]) => {
      updateQuery({ tags: tags.length > 0 ? tags.join(",") : null })
    },
    [updateQuery]
  )

  const handleModeChange = useCallback(
    (value: string) => {
      updateQuery({ mode: value === "AND" ? "and" : null })
    },
    [updateQuery]
  )

  const filtered =
    selected.length === 0
      ? projects
      : mode === "AND"
        ? projects.filter((p) => selected.every((tag) => p.tags.includes(tag)))
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
      <div className="flex flex-wrap items-center justify-between gap-4">
        <TagFilter
          tags={allTags}
          selected={selected}
          onChange={handleTagsChange}
          tagCounts={tagCounts}
          totalCount={projects.length}
        />
        {selected.length > 1 && (
          <Tabs value={mode} onValueChange={handleModeChange}>
            <TabsList>
              <TabsTrigger value="OR">태그 일부 포함</TabsTrigger>
              <TabsTrigger value="AND">태그 모두 포함</TabsTrigger>
            </TabsList>
          </Tabs>
        )}
      </div>
      {filtered.length === 0 ? (
        <div className="flex min-h-[240px] flex-col items-center justify-center gap-4">
          <Alert className="max-w-md text-center">
            <AlertTitle>선택한 태그에 해당하는 프로젝트가 없습니다</AlertTitle>
            <AlertDescription>
              다른 태그를 선택하거나 전체 보기로 돌아가세요.
            </AlertDescription>
          </Alert>
          <Button variant="outline" onClick={() => handleTagsChange([])}>
            전체 보기
          </Button>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              featured={featuredIds.has(project.id)}
            />
          ))}
        </div>
      )}
    </>
  )
}

export { ProjectShowcase }
