import { getTranslations, setRequestLocale } from 'next-intl/server'
import BookingButton from '@/components/BookingButton'
import Hero from '@/components/Hero'
import Realisations from '@/components/Realisations'
import Reveal from '@/components/Reveal'
import Services from '@/components/Services'
import Testimonials from '@/components/Testimonials'
import { Link } from '@/i18n/navigation'

export default async function AccueilPage({ params }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'cta' })

  return (
    <main id="contenu">
      <Hero />

      <Reveal>
        <Services />
      </Reveal>

      <Reveal>
        <Realisations />
      </Reveal>

      <Reveal>
        <Testimonials />
      </Reveal>

      <section className="bg-primary px-4 py-20 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-3xl font-semibold sm:text-4xl">{t('bandTitle')}</h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/85">
            {t('bandText')}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <BookingButton />
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-btn border-2 border-white/70 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-white/10"
            >
              {t('contact')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
