"use client"

import { useEffect } from "react"

import { Container } from "@/components/layout/container"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
  unstable_retry: () => void
}

export default function Error({ error, unstable_retry }: ErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Container className="py-16 sm:py-24">
      <div className="flex min-h-[240px] flex-col items-center justify-center gap-4">
        <Alert variant="destructive" className="max-w-md text-center">
          <AlertTitle>프로젝트 목록을 불러오지 못했습니다</AlertTitle>
          <AlertDescription>
            일시적인 오류일 수 있습니다. 잠시 후 다시 시도해주세요.
          </AlertDescription>
        </Alert>
        <Button variant="outline" onClick={() => unstable_retry()}>
          다시 시도
        </Button>
        {error.digest && (
          <p className="text-xs text-muted-foreground">오류 코드: {error.digest}</p>
        )}
      </div>
    </Container>
  )
}
