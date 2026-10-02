'use client'

import { motion } from 'framer-motion'
import { ClipboardCheck, Droplets, HandHeart, Info, ShieldCheck } from 'lucide-react'
import { useTranslations } from 'next-intl'

const SERVICES = [
  { key: 'diagnostic', Icon: ClipboardCheck, image: 'service-diagnostic.jpg' },
  { key: 'deep', Icon: Droplets, image: 'service-soin-vapeur.jpg' },
  { key: 'massage', Icon: HandHeart, image: 'service-massage.jpg' },
  { key: 'braids', Icon: ShieldCheck, image: 'service-coiffure.jpg' },
]

const GRID = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }
const CARD = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

function ServiceCard({ serviceKey, Icon, image }) {
  const t = useTranslations()

  return (
    <motion.article
      variants={CARD}
      className="group flex flex-col overflow-hidden rounded-card border border-primary/15 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/images/services/${image}`}
          alt={t(`services.imageAlts.${serviceKey}`)}
          loading="lazy"
          className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <span className="flex size-12 items-center justify-center rounded-full bg-secondary-light transition-transform duration-300 group-hover:scale-110">
          <Icon className="size-6 text-secondary-dark" aria-hidden="true" />
        </span>
        <h3 className="mt-4 font-serif text-xl font-semibold text-ink">
          {t(`services.items.${serviceKey}.title`)}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink/70">
          {t(`services.items.${serviceKey}.text`)}
        </p>
      </div>
    </motion.article>
  )
}

export default function Services() {
  const t = useTranslations()

  return (
    <section id="services" className="scroll-mt-24 bg-primary-light/40 px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-center font-script text-3xl text-secondary">{t('services.eyebrow')}</p>
        <h2 className="mt-2 text-center font-serif text-3xl font-semibold text-ink sm:text-4xl">
          {t('services.title')}
        </h2>

        <motion.div
          variants={GRID}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {SERVICES.map(({ key, Icon, image }) => (
            <ServiceCard key={key} serviceKey={key} Icon={Icon} image={image} />
          ))}
        </motion.div>

        <p className="mt-8 flex items-center justify-center gap-2 text-center text-sm text-ink/60">
          <Info className="size-4 shrink-0" aria-hidden="true" />
          {t('services.note')}
        </p>
      </div>
    </section>
  )
}
