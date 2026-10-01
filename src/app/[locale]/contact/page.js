import { getTranslations, setRequestLocale } from 'next-intl/server'
import Breadcrumbs from '@/components/Breadcrumbs'
import Contact from '@/components/Contact'
import Reveal from '@/components/Reveal'
import { SITE_URL, WHATSAPP_NUMBER } from '@/constants'
import { routing } from '@/i18n/routing'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'seo.pages.contact' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${SITE_URL}/${locale}/contact/`,
      languages: {
        fr: `${SITE_URL}/fr/contact/`,
        en: `${SITE_URL}/en/contact/`,
        'x-default': `${SITE_URL}/fr/contact/`,
      },
    },
    openGraph: { title: t('title'), description: t('description'), url: `${SITE_URL}/${locale}/contact/` },
  }
}

const JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact – HairSpa Dakar',
  url: `${SITE_URL}/fr/contact/`,
  mainEntity: {
    '@type': 'BeautySalon',
    name: 'HairSpa Dakar',
    telephone: `+${WHATSAPP_NUMBER}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Sacré-Cœur 2, en face du restaurant OBV',
      addressLocality: 'Dakar',
      addressCountry: 'SN',
    },
    openingHours: 'Mo-Su 10:00-19:00',
  },
}

export default async function ContactPage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)
  const nav = await getTranslations({ locale, namespace: 'nav' })

  return (
    <main id="contenu">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
      />
      <Breadcrumbs locale={locale} items={[{ href: '/contact', label: nav('contact') }]} />
      <Reveal>
        <Contact />
      </Reveal>
    </main>
  )
}
