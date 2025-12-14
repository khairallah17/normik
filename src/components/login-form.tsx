'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useTranslations } from 'next-intl'

import { Card } from "@/components/ui/card"

import { useRouter } from "next/navigation"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const t = useTranslations('login');

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submit');
    router.push('/dashboard');
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <div className="flex flex-col items-center gap-1 text-center bg-primary text-primary-foreground p-2 py-4">
          <h3 className="text-2xl font-bold uppercase">
            normik
          </h3>
        </div>
        <FieldGroup className="p-6">
          <Field>
            <FieldLabel htmlFor="email">{t('email')}</FieldLabel>
            <Input id="email" type="email" placeholder={t('email_placeholder')} required />
          </Field>
          <Field>
            <div className="flex items-center">
              <FieldLabel htmlFor="password">{t('password')}</FieldLabel>
              <a
                href="#"
                className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                {t('forgot_password')}
              </a>
            </div>
            <Input id="password" type="password" required />
          </Field>
          <Field>
            <Button type="submit">{t('login_button')}</Button>
          </Field>
        </FieldGroup>
      </Card>
    </form>
  )
}
