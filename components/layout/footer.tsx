import { Container } from "@/components/layout/container"

function Footer() {
  return (
    <footer className="border-t border-border">
      <Container className="flex h-16 flex-col items-center justify-center gap-1 text-center text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <p>&copy; {new Date().getFullYear()} 스타터킷. All rights reserved.</p>
        <a
          href="https://nextjs.org/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-foreground"
        >
          Next.js 문서
        </a>
      </Container>
    </footer>
  )
}

export { Footer }
