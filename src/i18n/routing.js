import { defineRouting } from 'next-intl/routing'

// Deux langues, préfixe toujours présent dans l'URL (/fr/… et /en/…)
export const routing = defineRouting({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  localePrefix: 'always',
})
