import { getTranslations, setRequestLocale } from 'next-intl/server'
import Breadcrumbs from '@/components/Breadcrumbs'
import Gallery from '@/components/Gallery'
import Realisations from '@/components/Realisations'
import Reveal from '@/components/Reveal'
import { SITE_URL } from '@/constants'
import { routing } from '@/i18n/routing'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'seo.pages.realisations' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${SITE_URL}/${locale}/realisations/`,
      languages: {
        fr: `${SITE_URL}/fr/realisations/`,
        en: `${SITE_URL}/en/realisations/`,
        'x-default': `${SITE_URL}/fr/realisations/`,
      },
    },
    openGraph: { title: t('title'), description: t('description'), url: `${SITE_URL}/${locale}/realisations/` },
  }
}

export default async function RealisationsPage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)
  const nav = await getTranslations({ locale, namespace: 'nav' })

  return (
    <main id="contenu">
      <Breadcrumbs locale={locale} items={[{ href: '/realisations', label: nav('realisations') }]} />
      <Reveal>
        <Gallery />
      </Reveal>
      <Reveal>
        <Realisations />
      </Reveal>
    </main>
  )
}
