import { Card, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const SKELETON_CARD_COUNT = 6

function ProjectShowcaseSkeleton() {
  return (
    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: SKELETON_CARD_COUNT }).map((_, index) => (
        <Card key={index}>
          <Skeleton className="aspect-video w-full rounded-none" />
          <CardHeader>
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <div className="mt-2 flex flex-wrap gap-1.5">
              <Skeleton className="h-5 w-14 rounded-full" />
              <Skeleton className="h-5 w-14 rounded-full" />
              <Skeleton className="h-5 w-10 rounded-full" />
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}

export { ProjectShowcaseSkeleton }
