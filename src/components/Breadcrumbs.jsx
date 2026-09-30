import { ChevronRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

// Fil d'Ariane (server component). `items` = [{ href, label }], le dernier
// étant la page courante (sans lien). L'accueil est toujours ajouté en amont.
export default async function Breadcrumbs({ locale, items }) {
  const t = await getTranslations({ locale, namespace: 'a11y' })
  const nav = await getTranslations({ locale, namespace: 'nav' })

  const trail = [{ href: '/', label: nav('home') }, ...items]

  return (
    <nav aria-label={t('breadcrumb')} className="mx-auto w-full max-w-6xl px-4 pt-28">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink/60">
        {trail.map((item, index) => {
          const isLast = index === trail.length - 1
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {isLast ? (
                <span aria-current="page" className="font-medium text-secondary-dark">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="transition-colors hover:text-secondary-dark">
                  {item.label}
                </Link>
              )}
              {!isLast && <ChevronRight className="size-3.5 text-ink/35" aria-hidden="true" />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
