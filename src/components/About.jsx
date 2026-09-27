import { Home, Quote, ShieldCheck, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const PILLARS = [
  { key: 'salon', Icon: Sparkles },
  { key: 'home', Icon: Home },
  { key: 'protective', Icon: ShieldCheck },
]

export default function About() {
  const { t } = useTranslation()

  return (
    <section id="a-propos" className="scroll-mt-24 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-center font-script text-3xl text-secondary">{t('about.eyebrow')}</p>
        <h2 className="mt-2 text-center font-serif text-3xl font-semibold text-ink sm:text-4xl">
          {t('about.title')}
        </h2>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-lg leading-relaxed text-ink/80">{t('about.text')}</p>
            <p className="mt-4 leading-relaxed text-ink/70">{t('about.founder')}</p>
          </div>

          {/* Encart "Notre promesse" */}
          <div className="rounded-card bg-gold-light p-8 shadow-sm">
            <Quote className="size-8 text-gold" aria-hidden="true" />
            <p className="mt-3 font-serif text-xl font-semibold text-ink">{t('about.promise.title')}</p>
            <p className="mt-2 text-lg text-ink/80">{t('about.promise.text')}</p>
          </div>
        </div>

        {/* Trois piliers */}
        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {PILLARS.map(({ key, Icon }) => (
            <div
              key={key}
              className="rounded-card border border-primary/15 bg-white p-6 text-center shadow-sm"
            >
              <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary-light">
                <Icon className="size-7 text-primary" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-serif text-lg font-semibold text-ink">
                {t(`about.pillars.${key}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                {t(`about.pillars.${key}.text`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
