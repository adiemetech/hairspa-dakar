import { TriangleAlert } from 'lucide-react'
import { useTranslation } from 'react-i18next'

// Bandeau d'avertissement anti-imitation — visible en haut de toutes les pages
export default function AlertBanner() {
  const { t } = useTranslation()

  return (
    <div role="alert" className="bg-ink px-4 py-2 text-center text-sm text-gold-light">
      <p className="mx-auto flex max-w-4xl items-center justify-center gap-2">
        <TriangleAlert className="size-4 shrink-0 text-gold" aria-hidden="true" />
        <span>{t('alert.message')}</span>
      </p>
    </div>
  )
}
