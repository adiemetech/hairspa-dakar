'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import BookingButton from './BookingButton'

// Révélation du titre mot à mot (masque qui remonte), avec décalage progressif.
const TITLE_CONTAINER = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.25 } },
}
const TITLE_WORD = {
  hidden: { y: '110%', opacity: 0 },
  show: { y: '0%', opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  const t = useTranslations()
  const words = t('hero.title').split(' ')

  return (
    <section id="accueil" className="relative flex min-h-[92vh] items-center justify-center overflow-hidden">
      {/* Ken Burns : zoom lent et continu sur la photo (désactivé si reduced-motion) */}
      <motion.div
        className="absolute inset-0"
        aria-hidden="true"
        initial={{ scale: 1 }}
        animate={{ scale: 1.12 }}
        transition={{ duration: 18, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero/hero-accueil.jpg"
          srcSet="/images/hero/hero-accueil-960.jpg 960w, /images/hero/hero-accueil.jpg 1440w"
          sizes="100vw"
          alt={t('hero.imageAlt')}
          fetchPriority="high"
          className="size-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/55 to-ink/70" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-3xl px-4 py-24 text-center text-cream">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto inline-flex items-center gap-2 rounded-btn bg-cream/15 px-4 py-1.5 text-sm font-semibold backdrop-blur"
        >
          <Star className="size-4 fill-gold text-gold" aria-hidden="true" />
          {t('hero.badge')}
        </motion.p>

        <motion.h1
          variants={TITLE_CONTAINER}
          initial="hidden"
          animate="show"
          className="mt-6 font-serif text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl"
        >
          {words.map((word, index) => (
            <span key={`${word}-${index}`} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
              <motion.span variants={TITLE_WORD} className="inline-block">
                {word}
              </motion.span>
              {index < words.length - 1 && <span className="inline-block w-[0.3em]" aria-hidden="true" />}
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mx-auto mt-5 max-w-xl text-lg text-cream/85"
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <BookingButton className="w-full sm:w-auto" />
          <Link
            href="/services"
            className="inline-flex w-full items-center justify-center rounded-btn border-2 border-cream px-5 py-2.5 font-semibold text-cream transition-colors hover:bg-cream/10 sm:w-auto"
          >
            {t('cta.discover')}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
