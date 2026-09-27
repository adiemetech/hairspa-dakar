import { Clock, Languages, MapPin, Phone } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PHONE_DISPLAY, waLink } from '../constants'
import BookingButton from './BookingButton'

export default function Contact() {
  const { t } = useTranslation()

  return (
    <section id="contact" className="scroll-mt-24 bg-secondary-light/40 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-center font-script text-3xl text-secondary">{t('contact.eyebrow')}</p>
        <h2 className="mt-2 text-center font-serif text-3xl font-semibold text-ink sm:text-4xl">
          {t('contact.title')}
        </h2>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          {/* Coordonnées */}
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
                  <a href={`tel:+${PHONE_DISPLAY.replace(/\s/g, '')}`} className="text-ink/75 hover:text-secondary-dark">
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
                <p className="text-ink/75">{t('hours.short')}</p>
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

            <BookingButton className="w-full sm:w-auto" />
          </div>

          {/* Carte Google Maps — Sacré-Cœur 2, en face du restaurant OBV */}
          <iframe
            title={t('contact.mapTitle')}
            src="https://maps.google.com/maps?q=Sacr%C3%A9-C%C5%93ur%202%2C%20Dakar%20(en%20face%20du%20restaurant%20OBV)&z=16&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="min-h-[360px] w-full rounded-card border-0 shadow-sm"
          />
        </div>
      </div>
    </section>
  )
}
