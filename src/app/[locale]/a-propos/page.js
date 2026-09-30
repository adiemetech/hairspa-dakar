import { getTranslations, setRequestLocale } from 'next-intl/server'
import About from '@/components/About'
import Breadcrumbs from '@/components/Breadcrumbs'
import Reveal from '@/components/Reveal'
import Testimonials from '@/components/Testimonials'
import { SITE_URL } from '@/constants'
import { routing } from '@/i18n/routing'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'seo.pages.about' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${SITE_URL}/${locale}/a-propos/`,
      languages: {
        fr: `${SITE_URL}/fr/a-propos/`,
        en: `${SITE_URL}/en/a-propos/`,
        'x-default': `${SITE_URL}/fr/a-propos/`,
      },
    },
    openGraph: { title: t('title'), description: t('description'), url: `${SITE_URL}/${locale}/a-propos/` },
  }
}

export default async function AboutPage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)
  const nav = await getTranslations({ locale, namespace: 'nav' })

  return (
    <main id="contenu">
      <Breadcrumbs locale={locale} items={[{ href: '/a-propos', label: nav('about') }]} />
      <Reveal>
        <About />
      </Reveal>
      <Reveal>
        <Testimonials />
      </Reveal>
    </main>
  )
}
