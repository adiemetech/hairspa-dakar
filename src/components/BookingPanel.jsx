'use client'

import { CalendarCheck, CalendarHeart, Clock, MessageCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { BOOKING_URL, waLink } from '@/constants'

const STEP_ICONS = [MessageCircle, CalendarCheck, CalendarHeart]

export default function BookingPanel() {
  const t = useTranslations('booking')
  const steps = t.raw('steps')
  const href = BOOKING_URL ?? waLink(t('cta'))

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <p className="text-center font-script text-3xl text-secondary">{t('eyebrow')}</p>
        <h1 className="mt-2 text-center font-serif text-3xl font-semibold text-ink sm:text-4xl">
          {t('title')}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-center text-lg leading-relaxed text-ink/75">
          {t('intro')}
        </p>

        {/* Widget de réservation en ligne si BOOKING_URL est fourni, sinon WhatsApp */}
        <div className="mx-auto mt-10 max-w-xl">
          {BOOKING_URL ? (
            <div className="overflow-hidden rounded-card border border-primary/15 bg-white shadow-sm">
              <iframe
                title={t('onlineTitle')}
                src={BOOKING_URL}
                loading="lazy"
                className="min-h-[600px] w-full border-0"
              />
            </div>
          ) : (
            <div className="rounded-card border border-gold/40 bg-gold-light/50 p-6 text-center shadow-sm">
              <p className="font-serif text-xl font-semibold text-ink">{t('onlineTitle')}</p>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink/70">
                {t('onlineSoon')}
              </p>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('ctaAria')}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-btn bg-[#128C4B] px-6 py-3 font-semibold text-white shadow-md transition-colors hover:brightness-95"
              >
                <MessageCircle className="size-5" aria-hidden="true" />
                {t('cta')}
              </a>
            </div>
          )}
        </div>

        {/* Étapes */}
        <h2 className="mt-16 text-center font-serif text-2xl font-semibold text-ink">
          {t('stepsTitle')}
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = STEP_ICONS[index] ?? CalendarHeart
            return (
              <div
                key={step.title}
                className="rounded-card border border-primary/15 bg-white p-6 text-center shadow-sm"
              >
                <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary-light">
                  <Icon className="size-7 text-primary" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-serif text-lg font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{step.text}</p>
              </div>
            )
          })}
        </div>

        <p className="mt-10 flex items-center justify-center gap-2 text-center text-sm font-medium text-secondary-dark">
          <Clock className="size-4 shrink-0" aria-hidden="true" />
          {t('hoursReminder')}
        </p>
      </div>
    </section>
  )
}
