import { ImageOff } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Project } from "@/types/project"

const MAX_VISIBLE_TAGS = 3

interface ProjectCardProps {
  project: Project
}

function ProjectCard({ project }: ProjectCardProps) {
  const visibleTags = project.tags.slice(0, MAX_VISIBLE_TAGS)
  const overflowCount = project.tags.length - visibleTags.length

  const cardBody = (
    <Card>
      {project.thumbnailUrl ? (
        <img
          src={project.thumbnailUrl}
          alt={project.title}
          className="aspect-video w-full object-cover"
        />
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

  if (!project.link) {
    return cardBody
  }

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-xl transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {cardBody}
    </a>
  )
}

export { ProjectCard }
