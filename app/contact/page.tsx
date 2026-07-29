import type { Metadata } from "next"

import { Container } from "@/components/layout/container"
import { ContactForm } from "@/components/contact-form"

export const metadata: Metadata = {
  title: "연락처",
  description: "문의나 협업 제안은 아래 폼을 통해 남겨주세요.",
}

export default function ContactPage() {
  return (
    <Container className="max-w-xl py-16 sm:py-24">
      <div className="mb-8 space-y-2 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">연락처</h1>
        <p className="text-muted-foreground">
          문의나 협업 제안은 아래 폼을 통해 남겨주세요.
        </p>
      </div>
      <ContactForm />
    </Container>
  )
}
