import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

function ensureMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

// Métadonnées SEO dynamiques : title, description et Open Graph suivent la langue active
export default function useSEO() {
  const { t, i18n } = useTranslation()
  const lang = i18n.resolvedLanguage?.startsWith('en') ? 'en' : 'fr'

  useEffect(() => {
    document.title = t('seo.title')
    ensureMeta('name', 'description', t('seo.description'))
    ensureMeta('property', 'og:title', t('seo.title'))
    ensureMeta('property', 'og:description', t('seo.description'))
    ensureMeta('property', 'og:image', `${window.location.origin}/images/logo/logo-hairspa.png`)
    ensureMeta('property', 'og:locale', lang === 'en' ? 'en_GB' : 'fr_FR')
  }, [t, lang])
}
