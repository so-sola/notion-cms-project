"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface TagFilterProps {
  tags: string[]
  selected: string[]
  onChange: (tags: string[]) => void
  tagCounts?: Record<string, number>
  totalCount?: number
  className?: string
}

function TagFilter({
  tags,
  selected,
  onChange,
  tagCounts,
  totalCount,
  className,
}: TagFilterProps) {
  const toggleTag = (tag: string) => {
    onChange(
      selected.includes(tag)
        ? selected.filter((t) => t !== tag)
        : [...selected, tag]
    )
  }

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <Badge
        variant={selected.length === 0 ? "default" : "outline"}
        render={
          <button
            type="button"
            aria-pressed={selected.length === 0}
            onClick={() => onChange([])}
          />
        }
      >
        전체
        {totalCount !== undefined && (
          <span className="opacity-70">{totalCount}</span>
        )}
      </Badge>
      {tags.map((tag) => {
        const isSelected = selected.includes(tag)
        return (
          <Badge
            key={tag}
            variant={isSelected ? "default" : "outline"}
            render={
              <button
                type="button"
                aria-pressed={isSelected}
                onClick={() => toggleTag(tag)}
              />
            }
          >
            {tag}
            {tagCounts?.[tag] !== undefined && (
              <span className="opacity-70">{tagCounts[tag]}</span>
            )}
          </Badge>
        )
      })}
    </div>
  )
}

export { TagFilter }
