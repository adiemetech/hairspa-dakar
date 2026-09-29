'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { useMessages, useTranslations } from 'next-intl'
import { useCallback, useEffect, useRef, useState } from 'react'
import CountUp from './CountUp'

const AUTOPLAY_MS = 5000

function Stats({ stats }) {
  return (
    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-4 text-center">
      {['reviews', 'rating', 'clients'].map((key) => (
        <div key={key} className="rounded-card bg-white/70 px-2 py-5 shadow-sm">
          <p className="font-serif text-3xl font-semibold text-secondary-dark sm:text-4xl">
            <CountUp
              value={stats[key].value}
              suffix={stats[key].suffix}
              decimals={stats[key].decimals}
            />
          </p>
          <p className="mt-1 text-xs text-ink/65 sm:text-sm">{stats[key].label}</p>
        </div>
      ))}
    </div>
  )
}

function TrustBadges({ badges }) {
  return (
    <ul className="mt-8 flex flex-wrap items-center justify-center gap-3">
      {badges.map((badge) => (
        <li
          key={badge}
          className="inline-flex items-center gap-2 rounded-btn border border-primary/15 bg-white px-4 py-2 text-xs font-semibold text-ink/75 shadow-sm sm:text-sm"
        >
          <Star className="size-4 shrink-0 fill-gold text-gold" aria-hidden="true" />
          {badge}
        </li>
      ))}
    </ul>
  )
}

export default function Testimonials() {
  const t = useTranslations()
  const messages = useMessages()
  const { items, stats, trust } = messages.testimonials
  const count = items.length

  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)
  const reduced =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const timer = useRef(null)

  const go = useCallback(
    (next) => {
      setDirection(next > index ? 1 : -1)
      setIndex((next + count) % count)
    },
    [index, count],
  )

  useEffect(() => {
    if (reduced || paused || count <= 1) return
    timer.current = setInterval(() => {
      setDirection(1)
      setIndex((i) => (i + 1) % count)
    }, AUTOPLAY_MS)
    return () => clearInterval(timer.current)
  }, [reduced, paused, count])

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  }

  return (
    <section id="temoignages" className="scroll-mt-24 px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-center font-script text-3xl text-secondary">{t('testimonials.eyebrow')}</p>
        <h2 className="mt-2 text-center font-serif text-3xl font-semibold text-ink sm:text-4xl">
          {t('testimonials.title')}
        </h2>

        <Stats stats={stats} />

        {/* Carrousel de témoignages */}
        <div
          className="relative mx-auto mt-12 max-w-2xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div className="relative min-h-[220px] sm:min-h-[190px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.figure
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="absolute inset-0 flex flex-col items-center rounded-card border border-primary/15 bg-white p-8 text-center shadow-sm"
              >
                <div className="flex gap-1" role="img" aria-label="5/5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-5 fill-gold text-gold" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="mt-4 text-base leading-relaxed text-ink/80">
                  « {items[index].quote} »
                </blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-secondary-dark">
                  — {items[index].author}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Dots de navigation */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`Témoignage ${i + 1}`}
                aria-current={i === index}
                className={`size-2.5 rounded-full transition-colors ${
                  i === index ? 'bg-secondary' : 'bg-secondary/25 hover:bg-secondary/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Badges de confiance */}
        <p className="mt-14 text-center font-serif text-xl font-semibold text-ink">{trust.title}</p>
        <TrustBadges badges={trust.badges} />
      </div>
    </section>
  )
}
