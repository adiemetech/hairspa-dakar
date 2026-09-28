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

function ensureLink(rel, href, extra = {}) {
  const selector = `link[rel="${rel}"]${extra.hreflang ? `[hreflang="${extra.hreflang}"]` : ''}`
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    if (extra.hreflang) el.setAttribute('hreflang', extra.hreflang)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

// Métadonnées SEO dynamiques : title, description, Open Graph, canonical et
// alternates hreflang (/fr/, /en/, x-default) suivent la langue active
export default function useSEO() {
  const { t, i18n } = useTranslation()
  const lang = i18n.resolvedLanguage?.startsWith('en') ? 'en' : 'fr'

  useEffect(() => {
    const origin = window.location.origin
    const canonical = `${origin}/${lang}/`
    document.title = t('seo.title')
    ensureMeta('name', 'description', t('seo.description'))
    ensureMeta('property', 'og:title', t('seo.title'))
    ensureMeta('property', 'og:description', t('seo.description'))
    ensureMeta('property', 'og:image', `${origin}/images/logo/logo-hairspa.png`)
    ensureMeta('property', 'og:url', canonical)
    ensureMeta('property', 'og:locale', lang === 'en' ? 'en_GB' : 'fr_FR')
    ensureLink('canonical', canonical)
    ensureLink('alternate', `${origin}/fr/`, { hreflang: 'fr' })
    ensureLink('alternate', `${origin}/en/`, { hreflang: 'en' })
    ensureLink('alternate', `${origin}/`, { hreflang: 'x-default' })
  }, [t, lang])
}
