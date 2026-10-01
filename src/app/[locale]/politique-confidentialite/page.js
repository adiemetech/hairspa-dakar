import { getTranslations, setRequestLocale } from 'next-intl/server'
import Breadcrumbs from '@/components/Breadcrumbs'
import LegalPage from '@/components/LegalPage'
import { SITE_URL } from '@/constants'
import { routing } from '@/i18n/routing'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'seo.pages.privacy' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${SITE_URL}/${locale}/politique-confidentialite/`,
      languages: {
        fr: `${SITE_URL}/fr/politique-confidentialite/`,
        en: `${SITE_URL}/en/politique-confidentialite/`,
        'x-default': `${SITE_URL}/fr/politique-confidentialite/`,
      },
    },
    robots: { index: false, follow: true },
  }
}

export default async function PolitiqueConfidentialitePage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)
  const legal = await getTranslations({ locale, namespace: 'legal' })

  return (
    <main id="contenu">
      <Breadcrumbs
        locale={locale}
        items={[{ href: '/politique-confidentialite', label: legal('privacyTitle') }]}
      />
      <LegalPage titleKey="privacyTitle" />
    </main>
  )
}
