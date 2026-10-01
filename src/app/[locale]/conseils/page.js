import { ArrowRight, BookOpen } from 'lucide-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import Breadcrumbs from '@/components/Breadcrumbs'
import Reveal from '@/components/Reveal'
import { CONSEILS_SLUGS, SITE_URL } from '@/constants'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'seo.pages.conseils' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${SITE_URL}/${locale}/conseils/`,
      languages: {
        fr: `${SITE_URL}/fr/conseils/`,
        en: `${SITE_URL}/en/conseils/`,
        'x-default': `${SITE_URL}/fr/conseils/`,
      },
    },
    openGraph: { title: t('title'), description: t('description'), url: `${SITE_URL}/${locale}/conseils/` },
  }
}

export default async function ConseilsPage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'conseils' })
  const nav = await getTranslations({ locale, namespace: 'nav' })

  return (
    <main id="contenu">
      <Breadcrumbs locale={locale} items={[{ href: '/conseils', label: nav('conseils') }]} />
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-center font-script text-3xl text-secondary">{t('eyebrow')}</p>
          <h1 className="mt-2 text-center font-serif text-3xl font-semibold text-ink sm:text-4xl">
            {t('title')}
          </h1>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {CONSEILS_SLUGS.map((slug) => (
              <Reveal key={slug}>
                <article className="flex h-full flex-col rounded-card border border-primary/15 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                  <span className="flex size-12 items-center justify-center rounded-full bg-primary-light">
                    <BookOpen className="size-6 text-primary" aria-hidden="true" />
                  </span>
                  <h2 className="mt-4 font-serif text-xl font-semibold text-ink">
                    {t(`articles.${slug}.title`)}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/70">
                    {t(`articles.${slug}.intro`)}
                  </p>
                  <Link
                    href={`/conseils/${slug}`}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-secondary-dark hover:underline"
                  >
                    {t('read')}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
