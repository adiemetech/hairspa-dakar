'use client'

import { ArrowLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

// Pages légales minimalistes (contenu rédactionnel à fournir par le client).
export default function LegalPage({ titleKey }) {
  const t = useTranslations('legal')

  return (
    <div className="mx-auto min-h-[60vh] max-w-3xl px-4 py-16">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-semibold text-secondary-dark hover:underline"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        {t('back')}
      </Link>
      <h1 className="mt-6 font-serif text-3xl font-semibold text-ink sm:text-4xl">{t(titleKey)}</h1>
      <p className="mt-6 leading-relaxed text-ink/75">{t('placeholder')}</p>
    </div>
  )
}
