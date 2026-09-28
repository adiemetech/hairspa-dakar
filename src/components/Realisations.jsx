import { VolumeX } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const VIDEOS = [
  { key: 'steam', file: 'realisation-soin-vapeur.mp4' },
  { key: 'care', file: 'realisation-soin.mp4' },
  { key: 'team', file: 'realisation-equipe.mp4' },
]

export default function Realisations() {
  const { t } = useTranslation()

  return (
    <section id="realisations" className="scroll-mt-24 bg-ink px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-center font-script text-3xl text-gold">{t('realisations.eyebrow')}</p>
        <h2 className="mt-2 text-center font-serif text-3xl font-semibold text-cream sm:text-4xl">
          {t('realisations.title')}
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {VIDEOS.map(({ key, file }) => (
            <figure key={key} className="overflow-hidden rounded-card bg-white/5">
              <video
                src={`/videos/${file}`}
                muted
                loop
                autoPlay
                playsInline
                preload="metadata"
                aria-label={t(`realisations.items.${key}`)}
                className="aspect-[9/16] size-full object-cover"
              />
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
