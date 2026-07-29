import { ImageOff } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Project } from "@/types/project"

const MAX_VISIBLE_TAGS = 3

interface ProjectCardProps {
  project: Project
  featured?: boolean
}

function ProjectCard({ project, featured }: ProjectCardProps) {
  const visibleTags = project.tags.slice(0, MAX_VISIBLE_TAGS)
  const overflowCount = project.tags.length - visibleTags.length

  const cardBody = (
    // Image를 div로 감싸면 Card의 `img:first-child` 기반 셀렉터가 매치되지 않으므로
    // 썸네일이 있을 때는 pt-0을 직접 지정해 이미지를 카드 상단에 밀착시킨다
    <Card className={cn(project.thumbnailUrl && "pt-0", featured && "relative")}>
      {featured && (
        <Badge className="absolute left-2 top-2 z-10">Featured</Badge>
      )}
      {project.thumbnailUrl ? (
        <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
          <Image
            src={project.thumbnailUrl}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="flex aspect-video w-full items-center justify-center bg-muted text-muted-foreground">
          <ImageOff className="size-6" />
        </div>
      )}
      <CardHeader>
        <CardTitle className="line-clamp-1">{project.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {project.description}
        </CardDescription>
        {project.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {visibleTags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
            {overflowCount > 0 && (
              <Badge variant="outline">+{overflowCount}</Badge>
            )}
          </div>
        )}
      </CardHeader>
    </Card>
  )

  return (
    <Link
      href={`/projects/${project.id}`}
      className="block rounded-xl transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {cardBody}
    </Link>
  )
}

export { ProjectCard }
