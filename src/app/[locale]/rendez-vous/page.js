import { getTranslations, setRequestLocale } from 'next-intl/server'
import BookingPanel from '@/components/BookingPanel'
import Breadcrumbs from '@/components/Breadcrumbs'
import Reveal from '@/components/Reveal'
import { SITE_URL, WHATSAPP_NUMBER } from '@/constants'
import { routing } from '@/i18n/routing'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'seo.pages.rendezvous' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${SITE_URL}/${locale}/rendez-vous/`,
      languages: {
        fr: `${SITE_URL}/fr/rendez-vous/`,
        en: `${SITE_URL}/en/rendez-vous/`,
        'x-default': `${SITE_URL}/fr/rendez-vous/`,
      },
    },
    openGraph: { title: t('title'), description: t('description'), url: `${SITE_URL}/${locale}/rendez-vous/` },
  }
}

const JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'BeautySalon',
  name: 'HairSpa Dakar',
  telephone: `+${WHATSAPP_NUMBER}`,
  url: `${SITE_URL}/fr/rendez-vous/`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Sacré-Cœur 2, en face du restaurant OBV',
    addressLocality: 'Dakar',
    addressCountry: 'SN',
  },
  openingHours: 'Mo-Su 10:00-19:00',
}

export default async function RendezVousPage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)
  const booking = await getTranslations({ locale, namespace: 'booking' })

  return (
    <main id="contenu">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
      />
      <Breadcrumbs locale={locale} items={[{ href: '/rendez-vous', label: booking('title') }]} />
      <Reveal>
        <BookingPanel />
      </Reveal>
    </main>
  )
}
