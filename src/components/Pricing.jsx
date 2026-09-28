import { Check, Crown, Info } from 'lucide-react'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

const TABS = ['soins', 'coupes', 'coiffures', 'headspa', 'forfaits']

function PriceRow({ label, detail, price }) {
  return (
    <li className="flex break-inside-avoid items-baseline gap-2 py-2">
      <span className="text-sm text-ink/85">
        {label}
        {detail && <span className="block text-xs text-ink/55">{detail}</span>}
      </span>
      <span className="mx-1 flex-1 border-b border-dotted border-ink/25" aria-hidden="true" />
      <span className="whitespace-nowrap text-sm font-semibold text-secondary-dark">{price}</span>
    </li>
  )
}

function HeadSpaPanel() {
  const { t } = useTranslation()

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2">
        {['simple', 'complete'].map((formula) => (
          <div
            key={formula}
            className="relative rounded-card border-2 border-gold bg-gold-light p-7 shadow-sm"
          >
            <span className="absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-btn bg-gold px-3 py-1 text-xs font-semibold text-ink">
              <Crown className="size-3.5" aria-hidden="true" />
              {t('pricing.headspaBadge')}
            </span>
            <h3 className="mt-2 font-serif text-2xl font-semibold text-ink">
              {t(`pricing.headspa.${formula}.name`)}
            </h3>
            <p className="mt-1 text-2xl font-bold text-secondary-dark">
              {t(`pricing.headspa.${formula}.price`)}
            </p>
            <ul className="mt-5 space-y-2.5">
              {t(`pricing.headspa.${formula}.includes`, { returnObjects: true }).map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-ink/80">
                  <Check className="mt-0.5 size-4 shrink-0 text-secondary-dark" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-6 flex items-start gap-2 rounded-card bg-white p-4 text-sm text-ink/70">
        <Info className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
        {t('pricing.headspa.note')}
      </p>
    </div>
  )
}

export default function Pricing() {
  const { t } = useTranslation()
  const [active, setActive] = useState('soins')
  const tabRefs = useRef([])

  // Navigation clavier entre onglets (flèches gauche/droite)
  const onTabKeyDown = (event, index) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    event.preventDefault()
    const next =
      event.key === 'ArrowRight' ? (index + 1) % TABS.length : (index - 1 + TABS.length) % TABS.length
    setActive(TABS[next])
    tabRefs.current[next]?.focus()
  }

  return (
    <section id="tarifs" className="scroll-mt-24 bg-white/60 px-4 py-24">
      <div className="mx-auto max-w-5xl">
        <p className="text-center font-script text-3xl text-secondary">{t('pricing.eyebrow')}</p>
        <h2 className="mt-2 text-center font-serif text-3xl font-semibold text-ink sm:text-4xl">
          {t('pricing.title')}
        </h2>

        {/* Onglets de catégories */}
        <div
          role="tablist"
          aria-label={t('pricing.title')}
          className="mt-10 flex flex-wrap justify-center gap-2"
        >
          {TABS.map((tab, index) => (
            <button
              key={tab}
              ref={(el) => (tabRefs.current[index] = el)}
              role="tab"
              id={`tab-${tab}`}
              aria-selected={active === tab}
              aria-controls={`panel-${tab}`}
              tabIndex={active === tab ? 0 : -1}
              onClick={() => setActive(tab)}
              onKeyDown={(event) => onTabKeyDown(event, index)}
              className={`rounded-btn px-4 py-2 text-sm font-semibold transition-colors ${
                active === tab
                  ? 'bg-secondary text-white shadow-sm'
                  : 'bg-primary-light text-ink/70 hover:bg-primary-light/70 hover:text-ink'
              }`}
            >
              {t(`pricing.tabs.${tab}`)}
            </button>
          ))}
        </div>

        {/* Panneaux */}
        <div className="mt-8">
          {TABS.filter((tab) => tab !== 'headspa').map((tab) => (
            <div
              key={tab}
              role="tabpanel"
              id={`panel-${tab}`}
              aria-labelledby={`tab-${tab}`}
              hidden={active !== tab}
            >
              <ul className={tab === 'coiffures' ? 'sm:columns-2 sm:gap-12' : 'mx-auto max-w-2xl'}>
                {t(`pricing.lists.${tab}`, { returnObjects: true }).map(({ label, detail, price }) => (
                  <PriceRow key={label} label={label} detail={detail} price={price} />
                ))}
              </ul>
            </div>
          ))}

          <div
            role="tabpanel"
            id="panel-headspa"
            aria-labelledby="tab-headspa"
            hidden={active !== 'headspa'}
          >
            <HeadSpaPanel />
          </div>
        </div>

        {/* Notes importantes */}
        <div className="mt-12 space-y-3 rounded-card border border-gold/40 bg-gold-light/50 p-6">
          {t('pricing.notes', { returnObjects: true }).map((note) => (
            <p key={note} className="flex items-start gap-2 text-sm text-ink/75">
              <Info className="mt-0.5 size-4 shrink-0 text-secondary-dark" aria-hidden="true" />
              {note}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
