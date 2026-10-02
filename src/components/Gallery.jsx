'use client'

import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useRef, useState } from 'react'

const PHOTOS = [
  { file: 'galerie-1.jpg', cat: 'tresses' },
  { file: 'galerie-2.jpg', cat: 'tresses' },
  { file: 'galerie-3.jpg', cat: 'tresses' },
  { file: 'galerie-4.jpg', cat: 'soins' },
  { file: 'galerie-5.jpg', cat: 'chignons' },
  { file: 'galerie-6.jpg', cat: 'tresses' },
  { file: 'galerie-7.jpg', cat: 'chignons' },
  { file: 'galerie-8.jpg', cat: 'tresses' },
]

const FILTERS = ['all', 'tresses', 'chignons', 'soins']

export default function Gallery() {
  const t = useTranslations()
  const reducedMotion = useReducedMotion()
  const [filter, setFilter] = useState('all')
  const [lightbox, setLightbox] = useState(null) // index dans `photos`, ou null
  const closeRef = useRef(null)

  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const titleY = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [40, -40])

  const photos = PHOTOS.map((photo, index) => ({ ...photo, altKey: index + 1 })).filter(
    ({ cat }) => filter === 'all' || cat === filter,
  )

  const close = useCallback(() => setLightbox(null), [])
  const step = useCallback(
    (dir) => setLightbox((i) => (i === null ? i : (i + dir + photos.length) % photos.length)),
    [photos.length],
  )

  // Verrouillage du scroll + navigation clavier tant que la lightbox est ouverte.
  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') step(1)
      else if (e.key === 'ArrowLeft') step(-1)
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [lightbox, close, step])

  // Changer de filtre referme la lightbox (les indices ne sont plus valides).
  const changeFilter = (key) => {
    setFilter(key)
    setLightbox(null)
  }

  const current = lightbox !== null ? photos[lightbox] : null

  return (
    <section id="galerie" ref={sectionRef} className="scroll-mt-24 px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div style={{ y: titleY }} className="will-change-transform">
          <p className="text-center font-script text-3xl text-secondary">{t('gallery.eyebrow')}</p>
          <h2 className="mt-2 text-center font-serif text-3xl font-semibold text-ink sm:text-4xl">
            {t('gallery.title')}
          </h2>
        </motion.div>

        {/* Filtres par catégorie */}
        <div role="group" aria-label={t('gallery.filterAria')} className="mt-8 flex flex-wrap justify-center gap-2">
          {FILTERS.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => changeFilter(key)}
              aria-pressed={filter === key}
              className={`rounded-btn px-4 py-1.5 text-sm font-semibold transition-colors ${
                filter === key ? 'bg-secondary text-white' : 'bg-primary-light text-ink/70 hover:text-ink'
              }`}
            >
              {t(`gallery.filters.${key}`)}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {photos.map(({ file, altKey }, index) => (
              <motion.div
                layout
                key={file}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden rounded-card shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setLightbox(index)}
                  aria-label={`${t('gallery.lightbox.openAria')} — ${t(`gallery.imageAlts.${altKey}`)}`}
                  className="block size-full cursor-zoom-in"
                >
                  <img
                    src={`/images/galerie/${file}`}
                    alt={t(`gallery.imageAlts.${altKey}`)}
                    loading="lazy"
                    className="aspect-[3/4] size-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {current && (
          <motion.div
            key="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={t('gallery.title')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            className="fixed inset-0 z-100 flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label={t('gallery.lightbox.close')}
              className="absolute right-4 top-4 z-10 flex size-11 items-center justify-center rounded-full bg-cream/15 text-cream transition-colors hover:bg-primary"
            >
              <X className="size-6" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                step(-1)
              }}
              aria-label={t('gallery.lightbox.prev')}
              className="absolute left-2 z-10 flex size-11 items-center justify-center rounded-full bg-cream/15 text-cream transition-colors hover:bg-primary sm:left-6"
            >
              <ChevronLeft className="size-6" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                step(1)
              }}
              aria-label={t('gallery.lightbox.next')}
              className="absolute right-2 z-10 flex size-11 items-center justify-center rounded-full bg-cream/15 text-cream transition-colors hover:bg-primary sm:right-6"
            >
              <ChevronRight className="size-6" aria-hidden="true" />
            </button>

            <motion.figure
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="max-h-full max-w-3xl"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={current.file}
                src={`/images/galerie/${current.file}`}
                alt={t(`gallery.imageAlts.${current.altKey}`)}
                className="max-h-[80vh] w-auto rounded-card object-contain shadow-2xl"
              />
              <figcaption className="mt-3 text-center text-sm text-cream/80">
                {t('gallery.lightbox.counter', { index: lightbox + 1, total: photos.length })}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
