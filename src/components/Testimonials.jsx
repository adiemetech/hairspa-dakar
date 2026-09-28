import { Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'

function TestimonialCard({ index }) {
  const { t } = useTranslation()

  return (
    <figure className="flex flex-col rounded-card border border-primary/15 bg-white p-6 shadow-sm">
      <div className="flex gap-1" role="img" aria-label="5/5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="size-4 fill-gold text-gold" aria-hidden="true" />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink/80">
        « {t(`testimonials.items.${index}.quote`)} »
      </blockquote>
      <figcaption className="mt-4 text-sm font-semibold text-secondary-dark">
        — {t(`testimonials.items.${index}.author`)}
      </figcaption>
    </figure>
  )
}

export default function Testimonials() {
  const { t, i18n } = useTranslation()
  const count = i18n.getResourceBundle(i18n.resolvedLanguage, 'translation').testimonials.items.length

  return (
    <section id="temoignages" className="scroll-mt-24 px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-center font-script text-3xl text-secondary">{t('testimonials.eyebrow')}</p>
        <h2 className="mt-2 text-center font-serif text-3xl font-semibold text-ink sm:text-4xl">
          {t('testimonials.title')}
        </h2>
        <p className="mx-auto mt-4 inline-flex items-center gap-2 rounded-btn bg-gold-light px-4 py-1.5 text-sm font-semibold text-ink">
          <Star className="size-4 fill-gold text-gold" aria-hidden="true" />
          {t('testimonials.badge')}
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: count }).map((_, i) => (
            <TestimonialCard key={i} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
