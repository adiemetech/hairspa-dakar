import { useEffect, useRef, useState } from 'react'
import { VolumeX } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const VIDEOS = [
  { key: 'steam', file: 'realisation-soin-vapeur' },
  { key: 'care', file: 'realisation-soin' },
  { key: 'team', file: 'realisation-equipe' },
]

// Vidéo paresseuse : poster seul (preload=none) jusqu'à l'entrée dans le viewport,
// puis lecture muette en boucle. Image fixe si l'utilisateur réduit les animations.
function LazyVideo({ file, label }) {
  const ref = useRef(null)
  const [reducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    if (reducedMotion) return
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.preload = 'metadata'
            el.play().catch(() => {})
            io.unobserve(el)
          }
        }
      },
      { rootMargin: '200px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reducedMotion])

  if (reducedMotion) {
    return (
      <img
        src={`/videos/${file}-poster.jpg`}
        alt={label}
        loading="lazy"
        className="aspect-[9/16] size-full object-cover"
      />
    )
  }

  return (
    <video
      ref={ref}
      poster={`/videos/${file}-poster.jpg`}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
      className="aspect-[9/16] size-full object-cover"
    >
      <source src={`/videos/${file}.webm`} type="video/webm" />
      <source src={`/videos/${file}.mp4`} type="video/mp4" />
    </video>
  )
}

export default function Realisations() {
  const { t } = useTranslation()

  return (
    <section id="realisations" className="scroll-mt-24 bg-ink px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-center font-script text-3xl text-gold">{t('realisations.eyebrow')}</p>
        <h2 className="mt-2 text-center font-serif text-3xl font-semibold text-cream sm:text-4xl">
          {t('realisations.title')}
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {VIDEOS.map(({ key, file }) => (
            <figure key={key} className="overflow-hidden rounded-card bg-white/5">
              <LazyVideo file={file} label={t(`realisations.items.${key}`)} />
              <figcaption className="p-4 text-sm text-cream/85">{t(`realisations.items.${key}`)}</figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-8 flex items-center justify-center gap-2 text-center text-sm text-cream/60">
          <VolumeX className="size-4 shrink-0" aria-hidden="true" />
          {t('realisations.note')}
        </p>
      </div>
    </section>
  )
}
