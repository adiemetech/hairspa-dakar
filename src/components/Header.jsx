import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NAV_SECTIONS } from '../constants'
import BookingButton from './BookingButton'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header() {
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-primary/20 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        {/* Logo officiel — le fond blanc disparaît sur le crème grâce à multiply */}
        <a href="#accueil" className="flex items-center" aria-label="HairSpa Dakar — accueil">
          <img
            src="/images/logo/logo-hairspa.png"
            alt="HairSpa Dakar"
            className="h-10 w-auto mix-blend-multiply md:h-14"
          />
        </a>

        {/* Navigation desktop */}
        <nav aria-label="Navigation principale" className="hidden xl:block">
          <ul className="flex items-center gap-4 xl:gap-5">
            {NAV_SECTIONS.map(({ id, labelKey }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="text-sm font-medium text-ink/75 transition-colors hover:text-secondary-dark"
                >
                  {t(labelKey)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <BookingButton className="hidden md:inline-flex" />
          {/* Menu mobile */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? t('nav.closeMenuAria') : t('nav.openMenuAria')}
            className="flex size-10 items-center justify-center rounded-btn text-ink xl:hidden"
          >
            {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Navigation mobile déroulante animée */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Navigation principale mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-primary/20 bg-cream px-4 xl:hidden"
          >
            <ul className="flex flex-col gap-1 py-4">
              {NAV_SECTIONS.map(({ id, labelKey }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-card px-3 py-2 font-medium text-ink/80 transition-colors hover:bg-primary-light"
                  >
                    {t(labelKey)}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <BookingButton className="w-full" />
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
