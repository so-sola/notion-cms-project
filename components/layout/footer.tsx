import Link from "next/link"

import { Container } from "@/components/layout/container"

const PORTFOLIO_OWNER_NAME = "choisola"
const CONTACT_URL = "https://github.com/choisola"

function Footer() {
  return (
    <footer className="border-t border-border">
      <Container className="flex h-16 flex-col items-center justify-center gap-1 text-center text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {PORTFOLIO_OWNER_NAME}. All rights
          reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="transition-colors hover:text-foreground"
          >
            연락처
          </Link>
          <a
            href={CONTACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            GitHub
          </a>
        </div>
      </Container>
    </footer>
  )
}

export { Footer }
