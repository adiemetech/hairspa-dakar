'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { NAV_SECTIONS } from '@/constants'
import { Link, usePathname } from '@/i18n/navigation'
import BookingButton from './BookingButton'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header() {
  const t = useTranslations()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <header className="sticky top-0 z-40 border-b border-primary/20 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        {/* Logo officiel — le fond blanc disparaît sur le crème grâce à multiply */}
        <Link href="/" className="flex items-center" aria-label="HairSpa Dakar">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo/logo-hairspa.png"
            alt="HairSpa Dakar"
            className="h-10 w-auto mix-blend-multiply md:h-14"
          />
        </Link>

        {/* Navigation desktop */}
        <nav aria-label="Navigation principale" className="hidden xl:block">
          <ul className="flex items-center gap-4 xl:gap-5">
            {NAV_SECTIONS.map(({ href, labelKey }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive(href) ? 'page' : undefined}
                  className={`relative text-sm font-medium transition-colors hover:text-secondary-dark ${
                    isActive(href) ? 'text-secondary-dark' : 'text-ink/75'
                  }`}
                >
                  {t(labelKey)}
                  {isActive(href) && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-secondary"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
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
              {NAV_SECTIONS.map(({ href, labelKey }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isActive(href) ? 'page' : undefined}
                    className={`block rounded-card px-3 py-2 font-medium transition-colors hover:bg-primary-light ${
                      isActive(href) ? 'bg-primary-light text-secondary-dark' : 'text-ink/80'
                    }`}
                  >
                    {t(labelKey)}
                  </Link>
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
