import { useTranslation } from 'react-i18next'

const LANGUAGES = [
  { code: 'fr', short: 'FR', native: 'Français' },
  { code: 'en', short: 'EN', native: 'English' },
]

// Sélecteur FR/EN sans drapeaux — la langue active est mise en évidence
export default function LanguageSwitcher({ className = '' }) {
  const { i18n, t } = useTranslation()
  const current = i18n.resolvedLanguage?.startsWith('en') ? 'en' : 'fr'

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
          onClick={() => i18n.changeLanguage(code)}
          aria-pressed={current === code}
          aria-label={native}
          title={native}
          className={`rounded-btn px-3 py-1 text-sm font-semibold transition-colors ${
            current === code
              ? 'bg-ink text-cream'
              : 'text-ink/60 hover:text-ink'
          }`}
        >
          {short}
        </button>
      ))}
    </div>
  )
}
