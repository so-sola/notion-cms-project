import { Container } from "@/components/layout/container"

// TODO: 실제 포트폴리오 소유자 이름과 연락 수단(GitHub/LinkedIn 등) 링크로 교체
const PORTFOLIO_OWNER_NAME = "포트폴리오"
const CONTACT_URL = "https://github.com"

function Footer() {
  return (
    <footer className="border-t border-border">
      <Container className="flex h-16 flex-col items-center justify-center gap-1 text-center text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {PORTFOLIO_OWNER_NAME}. All rights
          reserved.
        </p>
        <a
          href={CONTACT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-foreground"
        >
          GitHub
        </a>
      </Container>
    </footer>
  )
}

export { Footer }
