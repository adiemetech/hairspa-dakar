'use client'

import { AlertTriangle, Clock, Languages, MapPin, MessageCircle, Phone } from 'lucide-react'
import { useTranslations } from 'next-intl'
import ContactForm from '@/components/ContactForm'
import { ADDRESS_QUERY, PHONE_DISPLAY, WHATSAPP_NUMBER, waLink } from '@/constants'

export default function Contact() {
  const t = useTranslations()

  return (
    <section id="contact" className="scroll-mt-24 bg-secondary-light/40 px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-center font-script text-3xl text-secondary">{t('contact.eyebrow')}</p>
        <h2 className="mt-2 text-center font-serif text-3xl font-semibold text-ink sm:text-4xl">
          {t('contact.title')}
        </h2>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          {/* Colonne gauche : coordonnées + encart anti-imitation + WhatsApp direct */}
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary-light">
                <MapPin className="size-5 text-primary" aria-hidden="true" />
              </span>
              <div>
                <p className="font-semibold text-ink">{t('contact.addressLabel')}</p>
                <p className="text-ink/75">{t('contact.address')}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary-light">
                <Phone className="size-5 text-primary" aria-hidden="true" />
              </span>
              <div>
                <p className="font-semibold text-ink">{t('contact.phoneLabel')}</p>
                <p className="flex flex-wrap gap-x-4">
                  <a
                    href={`tel:+${WHATSAPP_NUMBER}`}
                    className="text-ink/75 hover:text-secondary-dark"
                  >
                    {PHONE_DISPLAY}
                  </a>
                  <a
                    href={waLink(t('whatsapp.message'))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#128C4B] hover:underline"
                  >
                    WhatsApp
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary-light">
                <Clock className="size-5 text-primary" aria-hidden="true" />
              </span>
              <div>
                <p className="flex items-center gap-2 font-semibold text-ink">
                  {t('contact.hoursLabel')}
                  <span className="rounded-btn bg-secondary px-2.5 py-0.5 text-xs font-semibold text-white">
                    {t('hours.badge')}
                  </span>
                </p>
                <p className="text-ink/75">{t('contact.hours')}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary-light">
                <Languages className="size-5 text-primary" aria-hidden="true" />
              </span>
              <div>
                <p className="font-semibold text-ink">{t('contact.languagesLabel')}</p>
                <p className="text-ink/75">{t('contact.languages')}</p>
              </div>
            </div>

            {/* Encart anti-imitation (exigence client) */}
            <div className="flex items-start gap-3 rounded-card border border-secondary/30 bg-white p-5 shadow-sm">
              <AlertTriangle className="mt-0.5 size-6 shrink-0 text-secondary" aria-hidden="true" />
              <div>
                <p className="font-serif text-lg font-semibold text-ink">{t('contact.warning.title')}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink/70">{t('contact.warning.text')}</p>
              </div>
            </div>

            <a
              href={waLink(t('whatsapp.message'))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-btn bg-[#128C4B] px-6 py-3 font-semibold text-white shadow-md transition-colors hover:brightness-95 sm:w-auto"
            >
              <MessageCircle className="size-5" aria-hidden="true" />
              {t('contact.directWhatsapp')}
            </a>

            {/* Carte Google Maps — Sacré-Cœur 2, en face du restaurant OBV */}
            <iframe
              title={t('contact.mapTitle')}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS_QUERY)}&z=16&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="min-h-[320px] w-full rounded-card border-0 shadow-sm"
            />
          </div>

          {/* Colonne droite : formulaire */}
          <div className="rounded-card border border-primary/15 bg-white p-6 shadow-sm sm:p-8">
            <h3 className="font-serif text-2xl font-semibold text-ink">{t('contact.form.title')}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">{t('contact.form.subtitle')}</p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
