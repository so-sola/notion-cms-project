"use client"

import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "이름을 2자 이상 입력해주세요." }),
  email: z.string().email({ message: "올바른 이메일 주소를 입력해주세요." }),
  topic: z.string().min(1, { message: "문의 유형을 선택해주세요." }),
  message: z.string().min(10, { message: "메시지를 10자 이상 입력해주세요." }),
  agree: z.boolean().refine((value) => value === true, {
    message: "개인정보 수집 및 이용에 동의해야 합니다.",
  }),
})

type ContactFormValues = z.infer<typeof contactFormSchema>

function ContactForm() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      topic: "",
      message: "",
      agree: false,
    },
  })

  function onSubmit(values: ContactFormValues) {
    toast.success("문의가 접수되었습니다.", {
      description: `${values.name}님, 빠르게 답변드리겠습니다.`,
    })
    form.reset()
  }

  const { errors } = form.formState

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="contact-name">이름</FieldLabel>
          <Input
            id="contact-name"
            placeholder="홍길동"
            aria-invalid={!!errors.name}
            {...form.register("name")}
          />
          <FieldError errors={errors.name ? [errors.name] : undefined} />
        </Field>

        <Field>
          <FieldLabel htmlFor="contact-email">이메일</FieldLabel>
          <Input
            id="contact-email"
            type="email"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            {...form.register("email")}
          />
          <FieldError errors={errors.email ? [errors.email] : undefined} />
        </Field>

        <Field>
          <FieldLabel htmlFor="contact-topic">문의 유형</FieldLabel>
          <Controller
            control={form.control}
            name="topic"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="contact-topic" className="w-full" aria-invalid={!!errors.topic}>
                  <SelectValue placeholder="문의 유형을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">일반 문의</SelectItem>
                  <SelectItem value="billing">결제 문의</SelectItem>
                  <SelectItem value="bug">버그 신고</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          <FieldError errors={errors.topic ? [errors.topic] : undefined} />
        </Field>

        <Field>
          <FieldLabel htmlFor="contact-message">메시지</FieldLabel>
          <Textarea
            id="contact-message"
            placeholder="문의 내용을 입력해주세요."
            aria-invalid={!!errors.message}
            {...form.register("message")}
          />
          <FieldError errors={errors.message ? [errors.message] : undefined} />
        </Field>

        <Field orientation="horizontal">
          <Controller
            control={form.control}
            name="agree"
            render={({ field }) => (
              <Checkbox
                id="contact-agree"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <FieldLabel htmlFor="contact-agree" className="font-normal">
            개인정보 수집 및 이용에 동의합니다.
          </FieldLabel>
        </Field>
        <FieldError errors={errors.agree ? [errors.agree] : undefined} />
        <FieldDescription>
          제출한 정보는 문의 응대 목적 외에는 사용되지 않습니다.
        </FieldDescription>

        <Button type="submit" disabled={form.formState.isSubmitting}>
          문의 보내기
        </Button>
      </FieldGroup>
    </form>
  )
}

export { ContactForm }
