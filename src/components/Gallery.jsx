'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

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
  const [filter, setFilter] = useState('all')

  const photos = PHOTOS.map((photo, index) => ({ ...photo, altKey: index + 1 })).filter(
    ({ cat }) => filter === 'all' || cat === filter,
  )

  return (
    <section id="galerie" className="scroll-mt-24 px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-center font-script text-3xl text-secondary">{t('gallery.eyebrow')}</p>
        <h2 className="mt-2 text-center font-serif text-3xl font-semibold text-ink sm:text-4xl">
          {t('gallery.title')}
        </h2>

        {/* Filtres par catégorie */}
        <div role="group" aria-label={t('gallery.filterAria')} className="mt-8 flex flex-wrap justify-center gap-2">
          {FILTERS.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              aria-pressed={filter === key}
              className={`rounded-btn px-4 py-1.5 text-sm font-semibold transition-colors ${
                filter === key
                  ? 'bg-secondary text-white'
                  : 'bg-primary-light text-ink/70 hover:text-ink'
              }`}
            >
              {t(`gallery.filters.${key}`)}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {photos.map(({ file, altKey }) => (
              <motion.div
                layout
                key={file}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden rounded-card shadow-sm"
              >
                <img
                  src={`/images/galerie/${file}`}
                  alt={t(`gallery.imageAlts.${altKey}`)}
                  loading="lazy"
                  className="aspect-[3/4] size-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
