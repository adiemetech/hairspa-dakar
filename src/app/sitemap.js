import { CONSEILS_SLUGS, SITE_URL } from '@/constants'
import { routing } from '@/i18n/routing'

// Pages internes (hors accueil, géré séparément) communes aux deux locales.
const PATHS = [
  '/a-propos',
  '/services',
  '/realisations',
  '/tarifs',
  '/conseils',
  '/contact',
  '/rendez-vous',
  '/mentions-legales',
  '/politique-confidentialite',
]

export default function sitemap() {
  const now = new Date()

  const entries = []
  for (const locale of routing.locales) {
    // Accueil
    entries.push({
      url: `${SITE_URL}/${locale}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: {
          fr: `${SITE_URL}/fr/`,
          en: `${SITE_URL}/en/`,
        },
      },
    })

    for (const path of PATHS) {
      const isLegal = path.startsWith('/mentions') || path.startsWith('/politique')
      entries.push({
        url: `${SITE_URL}/${locale}${path}/`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: isLegal ? 0.2 : 0.7,
        alternates: {
          languages: {
            fr: `${SITE_URL}/fr${path}/`,
            en: `${SITE_URL}/en${path}/`,
          },
        },
      })
    }

    // Articles de conseils
    for (const slug of CONSEILS_SLUGS) {
      entries.push({
        url: `${SITE_URL}/${locale}/conseils/${slug}/`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: {
          languages: {
            fr: `${SITE_URL}/fr/conseils/${slug}/`,
            en: `${SITE_URL}/en/conseils/${slug}/`,
          },
        },
      })
    }
  }

  return entries
}
