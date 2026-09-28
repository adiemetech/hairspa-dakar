import { Star } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import BookingButton from './BookingButton'

export default function Hero() {
  const { t } = useTranslation()
  // Fond vidéo muet en boucle ; image fixe si l'utilisateur préfère réduire les animations
  const [reducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  return (
    <section id="accueil" className="relative flex min-h-[92vh] items-center justify-center overflow-hidden">
      {reducedMotion ? (
        <img
          src="/images/hero/hero-accueil.jpg"
          srcSet="/images/hero/hero-accueil-960.jpg 960w, /images/hero/hero-accueil.jpg 1440w"
          sizes="100vw"
          alt={t('hero.imageAlt')}
          fetchPriority="high"
          className="absolute inset-0 size-full object-cover"
        />
      ) : (
        <video
          src="/videos/realisation-soin-vapeur.mp4"
          poster="/images/hero/hero-accueil.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="absolute inset-0 size-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/55 to-ink/70" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-3xl px-4 py-24 text-center text-cream">
        <p className="mx-auto inline-flex items-center gap-2 rounded-btn bg-cream/15 px-4 py-1.5 text-sm font-semibold backdrop-blur">
          <Star className="size-4 fill-gold text-gold" aria-hidden="true" />
          {t('hero.badge')}
        </p>
        <h1 className="mt-6 font-serif text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
          {t('hero.title')}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-cream/85">{t('hero.subtitle')}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <BookingButton className="w-full sm:w-auto" />
          <a
            href="#services"
            className="inline-flex w-full items-center justify-center rounded-btn border-2 border-cream px-5 py-2.5 font-semibold text-cream transition-colors hover:bg-cream/10 sm:w-auto"
          >
            {t('cta.discover')}
          </a>
        </div>
      </div>
    </section>
  )
}
