import { getTranslations, setRequestLocale } from 'next-intl/server'
import Breadcrumbs from '@/components/Breadcrumbs'
import GiftCards from '@/components/GiftCards'
import Reveal from '@/components/Reveal'
import Services from '@/components/Services'
import { SITE_URL } from '@/constants'
import { routing } from '@/i18n/routing'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'seo.pages.services' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${SITE_URL}/${locale}/services/`,
      languages: {
        fr: `${SITE_URL}/fr/services/`,
        en: `${SITE_URL}/en/services/`,
        'x-default': `${SITE_URL}/fr/services/`,
      },
    },
    openGraph: { title: t('title'), description: t('description'), url: `${SITE_URL}/${locale}/services/` },
  }
}

export default async function ServicesPage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)
  const nav = await getTranslations({ locale, namespace: 'nav' })

  return (
    <main id="contenu">
      <Breadcrumbs locale={locale} items={[{ href: '/services', label: nav('services') }]} />
      <Reveal>
        <Services />
      </Reveal>
      <Reveal>
        <GiftCards />
      </Reveal>
    </main>
  )
}
