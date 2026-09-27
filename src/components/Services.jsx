import { ClipboardCheck, Droplets, HandHeart, Info, ShieldCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const SERVICES = [
  { key: 'diagnostic', Icon: ClipboardCheck, image: 'service-diagnostic.jpg' },
  { key: 'deep', Icon: Droplets, image: 'service-soin-profond.jpg' },
  { key: 'massage', Icon: HandHeart, image: 'service-massage.jpg' },
  { key: 'braids', Icon: ShieldCheck, image: 'service-tresses.jpg' },
]

function ServiceCard({ serviceKey, Icon, image }) {
  const { t } = useTranslation()

  return (
    <article className="flex flex-col overflow-hidden rounded-card border border-primary/15 bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Remplacer par l'image réelle : {image} (déjà nommée ainsi) */}
      <img
        src={`/images/services/${image}`}
        alt={t(`services.imageAlts.${serviceKey}`)}
        loading="lazy"
        className="h-44 w-full object-cover"
      />
      <div className="flex flex-1 flex-col p-6">
        <span className="flex size-12 items-center justify-center rounded-full bg-secondary-light">
          <Icon className="size-6 text-secondary-dark" aria-hidden="true" />
        </span>
        <h3 className="mt-4 font-serif text-xl font-semibold text-ink">
          {t(`services.items.${serviceKey}.title`)}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink/70">
          {t(`services.items.${serviceKey}.text`)}
        </p>
      </div>
    </article>
  )
}

export default function Services() {
  const { t } = useTranslation()

  return (
    <section id="services" className="scroll-mt-24 bg-primary-light/40 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-center font-script text-3xl text-secondary">{t('services.eyebrow')}</p>
        <h2 className="mt-2 text-center font-serif text-3xl font-semibold text-ink sm:text-4xl">
          {t('services.title')}
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map(({ key, Icon, image }) => (
            <ServiceCard key={key} serviceKey={key} Icon={Icon} image={image} />
          ))}
        </div>

        <p className="mt-8 flex items-center justify-center gap-2 text-center text-sm text-ink/60">
          <Info className="size-4 shrink-0" aria-hidden="true" />
          {t('services.note')}
        </p>
      </div>
    </section>
  )
}
