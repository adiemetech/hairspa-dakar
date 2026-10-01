import { ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import BookingButton from '@/components/BookingButton'
import Breadcrumbs from '@/components/Breadcrumbs'
import { CONSEILS_SLUGS, SITE_URL } from '@/constants'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    CONSEILS_SLUGS.map((slug) => ({ locale, slug })),
  )
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params
  if (!CONSEILS_SLUGS.includes(slug)) return {}
  const t = await getTranslations({ locale, namespace: `conseils.articles.${slug}` })
  const title = t('title')
  const description = t('metaDescription')
  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/conseils/${slug}/`,
      languages: {
        fr: `${SITE_URL}/fr/conseils/${slug}/`,
        en: `${SITE_URL}/en/conseils/${slug}/`,
        'x-default': `${SITE_URL}/fr/conseils/${slug}/`,
      },
    },
    openGraph: {
      type: 'article',
      title,
      description,
      url: `${SITE_URL}/${locale}/conseils/${slug}/`,
    },
  }
}

export default async function ArticlePage({ params }) {
  const { locale, slug } = await params
  if (!CONSEILS_SLUGS.includes(slug)) notFound()
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'conseils' })
  const nav = await getTranslations({ locale, namespace: 'nav' })
  const title = t(`articles.${slug}.title`)
  const intro = t(`articles.${slug}.intro`)
  const paragraphs = t.raw(`articles.${slug}.paragraphs`)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: t(`articles.${slug}.metaDescription`),
    inLanguage: locale,
    author: { '@type': 'Organization', name: 'HairSpa Dakar' },
    publisher: {
      '@type': 'Organization',
      name: 'HairSpa Dakar',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/logo/logo-hairspa.png` },
    },
    mainEntityOfPage: `${SITE_URL}/${locale}/conseils/${slug}/`,
  }

  return (
    <main id="contenu">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs
        locale={locale}
        items={[{ href: '/conseils', label: nav('conseils') }, { href: `/conseils/${slug}`, label: title }]}
      />
      <section className="px-4 py-12">
        <article className="mx-auto max-w-3xl">
          <Link
            href="/conseils"
            className="inline-flex items-center gap-2 text-sm font-semibold text-secondary-dark hover:underline"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            {t('backToList')}
          </Link>
          <p className="mt-8 font-script text-3xl text-secondary">{t('eyebrow')}</p>
          <h1 className="mt-2 font-serif text-3xl font-semibold text-ink sm:text-4xl">{title}</h1>
          <p className="mt-4 text-lg text-ink/70">{intro}</p>
          <div className="mt-8 space-y-5 leading-relaxed text-ink/80">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-12 rounded-card bg-primary-light p-6 text-center sm:p-8">
            <p className="font-serif text-2xl font-semibold text-ink">{t('ctaTitle')}</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-ink/75">{t('ctaText')}</p>
            <BookingButton className="mt-5" />
          </div>

          <Link
            href="/"
            className="mt-10 inline-flex items-center gap-2 rounded-btn border-2 border-secondary px-5 py-2.5 font-semibold text-secondary-dark transition-colors hover:bg-secondary-light"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            {t('backHome')}
          </Link>
        </article>
      </section>
    </main>
  )
}
