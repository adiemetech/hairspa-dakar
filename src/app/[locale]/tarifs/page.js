import { getTranslations, setRequestLocale } from 'next-intl/server'
import Breadcrumbs from '@/components/Breadcrumbs'
import Pricing from '@/components/Pricing'
import Reveal from '@/components/Reveal'
import { SITE_URL } from '@/constants'
import { routing } from '@/i18n/routing'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'seo.pages.tarifs' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${SITE_URL}/${locale}/tarifs/`,
      languages: {
        fr: `${SITE_URL}/fr/tarifs/`,
        en: `${SITE_URL}/en/tarifs/`,
        'x-default': `${SITE_URL}/fr/tarifs/`,
      },
    },
    openGraph: { title: t('title'), description: t('description'), url: `${SITE_URL}/${locale}/tarifs/` },
  }
}

export default async function TarifsPage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)
  const nav = await getTranslations({ locale, namespace: 'nav' })

  return (
    <main id="contenu">
      <Breadcrumbs locale={locale} items={[{ href: '/tarifs', label: nav('pricing') }]} />
      <Reveal>
        <Pricing />
      </Reveal>
    </main>
  )
}
