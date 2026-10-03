import { Great_Vibes, Inter, Playfair_Display } from 'next/font/google'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import Shell from '@/components/Shell'
import { SITE_URL } from '@/constants'
import { routing } from '@/i18n/routing'
import '../globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-great-vibes',
  display: 'swap',
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'seo' })
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t('title'), template: `%s` },
    description: t('description'),
    openGraph: {
      type: 'website',
      url: `${SITE_URL}/${locale}/`,
      title: t('title'),
      description: t('description'),
      images: [{ url: `${SITE_URL}/images/logo/logo-hairspa.png` }],
      locale: locale === 'en' ? 'en_GB' : 'fr_FR',
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/`,
      languages: { fr: `${SITE_URL}/fr/`, en: `${SITE_URL}/en/`, 'x-default': `${SITE_URL}/` },
    },
  }
}

const JSONLD = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'BeautySalon'],
  name: 'HairSpa Dakar',
  description:
    "Centre de soins capillaires toutes textures à Sacré-Cœur 2, Dakar. Spécialiste des cheveux naturels, crépus et bouclés.",
  image: `${SITE_URL}/images/logo/logo-hairspa.png`,
  telephone: '+221778582196',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Sacré-Cœur 2, en face du restaurant OBV',
    addressLocality: 'Dakar',
    addressCountry: 'SN',
  },
  openingHours: 'Mo-Su 10:00-19:00',
  priceRange: '$$',
  sameAs: [
    'https://www.facebook.com/hairspadakar',
    'https://www.instagram.com/hairspadakar',
    'https://www.tiktok.com/@hairspadakar',
  ],
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params
  if (!routing.locales.includes(locale)) notFound()
  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body
        className={`${playfair.variable} ${inter.variable} ${greatVibes.variable} bg-cream font-sans text-ink antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
        />
        <NextIntlClientProvider messages={messages}>
          <Shell>{children}</Shell>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
