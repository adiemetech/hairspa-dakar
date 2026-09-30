'use client'

import { Gift, HeartHandshake, Sparkles } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { waLink } from '@/constants'

const STEP_ICONS = [Gift, Sparkles, HeartHandshake]

export default function GiftCards() {
  const t = useTranslations()
  const steps = t.raw('gift.steps')

  return (
    <section id="cartes-cadeaux" className="scroll-mt-24 bg-gold-light/60 px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-center font-script text-3xl text-secondary">{t('gift.eyebrow')}</p>
        <h2 className="mt-2 text-center font-serif text-3xl font-semibold text-ink sm:text-4xl">
          {t('gift.title')}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-center text-lg text-ink/75">{t('gift.text')}</p>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = STEP_ICONS[index]
            return (
              <div key={step.title} className="rounded-card border border-gold/30 bg-white p-6 text-center shadow-sm">
                <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-gold-light">
                  <Icon className="size-7 text-gold" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-serif text-lg font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{step.text}</p>
              </div>
            )
          })}
        </div>

        <div className="mt-10 text-center">
          <a
            href={waLink(t('gift.message'))}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('gift.ctaAria')}
            className="inline-flex items-center justify-center gap-2 rounded-btn bg-secondary px-6 py-3 font-semibold text-white shadow-md transition-colors hover:bg-secondary-dark"
          >
            <Gift className="size-5" aria-hidden="true" />
            {t('gift.cta')}
          </a>
        </div>
      </div>
    </section>
  )
}
