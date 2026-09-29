'use client'

import { TriangleAlert } from 'lucide-react'
import { useTranslations } from 'next-intl'

// Bandeau d'avertissement anti-imitation (exigence client).
// Sera déplacé dans la page Contact à la Phase D, conformément au brief.
export default function AlertBanner() {
  const t = useTranslations()

  return (
    <div role="alert" className="bg-ink px-4 py-2 text-center text-sm text-gold-light">
      <p className="mx-auto flex max-w-4xl items-center justify-center gap-2">
        <TriangleAlert className="size-4 shrink-0 text-gold" aria-hidden="true" />
        <span>{t('alert.message')}</span>
      </p>
    </div>
  )
}
