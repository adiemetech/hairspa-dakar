import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { CONSEILS_SLUGS } from '../constants'

export default function ConseilsPage({ slug }) {
  const { t } = useTranslation()

  if (slug && CONSEILS_SLUGS.includes(slug)) {
    const article = t(`conseils.articles.${slug}`, { returnObjects: true })
    return (
      <main id="contenu" className="px-4 py-24">
        <article className="mx-auto max-w-3xl">
          <a
            href="#conseils"
            className="inline-flex items-center gap-2 text-sm font-semibold text-secondary-dark hover:underline"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            {t('conseils.backToList')}
          </a>
          <p className="mt-8 font-script text-3xl text-secondary">{t('conseils.eyebrow')}</p>
          <h1 className="mt-2 font-serif text-3xl font-semibold text-ink sm:text-4xl">{article.title}</h1>
          <p className="mt-4 text-lg text-ink/70">{article.intro}</p>
          <div className="mt-8 space-y-5 leading-relaxed text-ink/80">
            {article.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <a
            href="#accueil"
            className="mt-10 inline-flex items-center gap-2 rounded-btn border-2 border-secondary px-5 py-2.5 font-semibold text-secondary-dark transition-colors hover:bg-secondary-light"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            {t('conseils.backHome')}
          </a>
        </article>
      </main>
    )
  }

  return (
    <main id="contenu" className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-center font-script text-3xl text-secondary">{t('conseils.eyebrow')}</p>
        <h1 className="mt-2 text-center font-serif text-3xl font-semibold text-ink sm:text-4xl">
          {t('conseils.title')}
        </h1>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {CONSEILS_SLUGS.map((articleSlug) => {
            const article = t(`conseils.articles.${articleSlug}`, { returnObjects: true })
            return (
              <article
                key={articleSlug}
                className="flex flex-col rounded-card border border-primary/15 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="flex size-12 items-center justify-center rounded-full bg-primary-light">
                  <BookOpen className="size-6 text-primary" aria-hidden="true" />
                </span>
                <h2 className="mt-4 font-serif text-xl font-semibold text-ink">{article.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/70">{article.intro}</p>
                <a
                  href={`#conseils/${articleSlug}`}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-secondary-dark hover:underline"
                >
                  {t('conseils.read')}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </article>
            )
          })}
        </div>
      </div>
    </main>
  )
}
