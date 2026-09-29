'use client'

import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'

const LANGUAGES = [
  { code: 'fr', short: 'FR', native: 'Français' },
  { code: 'en', short: 'EN', native: 'English' },
]

// Sélecteur FR/EN sans drapeaux — la langue active est mise en évidence.
// La langue vit dans l'URL (/fr/… ou /en/…) : on navigue vers la même route dans l'autre locale.
export default function LanguageSwitcher({ className = '' }) {
  const t = useTranslations()
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  const switchTo = (code) => {
    if (code === locale) return
    router.replace(pathname, { locale: code })
  }

  return (
    <div
      role="group"
      aria-label={t('nav.languageAria')}
      className={`flex items-center gap-1 rounded-btn bg-primary-light p-1 ${className}`}
    >
      {LANGUAGES.map(({ code, short, native }) => (
        <button
          key={code}
          type="button"
          onClick={() => switchTo(code)}
          aria-pressed={locale === code}
          aria-label={native}
          title={native}
          className={`rounded-btn px-3 py-1 text-sm font-semibold transition-colors ${
            locale === code ? 'bg-ink text-cream' : 'text-ink/60 hover:text-ink'
          }`}
        >
          {short}
        </button>
      ))}
    </div>
  )
}
