'use client'

import { Clock, MapPin, Phone } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { NAV_SECTIONS, PHONE_DISPLAY, SOCIAL_LINKS, waLink } from '@/constants'
import { Link } from '@/i18n/navigation'

// lucide-react v1 ne fournit plus les icônes de marques → SVG inline
function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

function TikTokIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  )
}

const SOCIAL_ICONS = { Facebook: FacebookIcon, Instagram: InstagramIcon, TikTok: TikTokIcon }

export default function Footer() {
  const t = useTranslations()

  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {/* Logo + slogan — conteneur blanc : le multiply ne fonctionnerait pas sur fond sombre */}
        <div>
          <span className="inline-block rounded-card bg-white p-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo/logo-hairspa.png"
              alt="HairSpa Dakar"
              className="h-10 w-auto"
            />
          </span>
          <p className="mt-3 text-sm leading-relaxed text-cream/70">{t('footer.slogan')}</p>
        </div>

        {/* Liens rapides */}
        <nav aria-label={t('footer.quickLinks')}>
          <p className="font-serif text-lg text-gold">{t('footer.quickLinks')}</p>
          <ul className="mt-3 space-y-2">
            {NAV_SECTIONS.map(({ href, labelKey }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm text-cream/70 transition-colors hover:text-cream"
                >
                  {t(labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Horaires — badge 7j/7 (exigence client) */}
        <div>
          <p className="font-serif text-lg text-gold">{t('contact.hoursLabel')}</p>
          <span className="mt-3 inline-flex items-center gap-1.5 rounded-btn bg-secondary px-3 py-1 text-xs font-semibold text-white">
            <Clock className="size-3.5" aria-hidden="true" />
            {t('hours.badge')}
          </span>
          <p className="mt-3 text-sm text-cream/70">{t('hours.short')}</p>
          <p className="mt-4 flex items-start gap-2 text-sm text-cream/70">
            <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            {t('contact.address')}
          </p>
          <a
            href={`tel:+${PHONE_DISPLAY.replace(/\s/g, '')}`}
            className="mt-2 flex items-center gap-2 text-sm text-cream/70 transition-colors hover:text-cream"
          >
            <Phone className="size-4 shrink-0 text-primary" aria-hidden="true" />
            {PHONE_DISPLAY}
          </a>
        </div>

        {/* Réseaux sociaux */}
        <div>
          <p className="font-serif text-lg text-gold">{t('footer.follow')}</p>
          <ul className="mt-3 flex gap-3">
            {SOCIAL_LINKS.map(({ name, href }) => {
              const Icon = SOCIAL_ICONS[name]
              return (
                <li key={name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${name} HairSpa Dakar`}
                    className="flex size-10 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-primary hover:text-ink"
                  >
                    <Icon className="size-5" />
                  </a>
                </li>
              )
            })}
          </ul>
          <a
            href={waLink(t('whatsapp.message'))}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm font-semibold text-[#25D366] hover:underline"
          >
            WhatsApp : {PHONE_DISPLAY}
          </a>
        </div>
      </div>

      {/* Barre basse : copyright + pages légales */}
      <div className="border-t border-cream/15">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-cream/60 sm:flex-row">
          <p>{t('footer.rights')}</p>
          <p className="flex gap-4">
            <Link href="/mentions-legales" className="transition-colors hover:text-cream">
              {t('footer.legal')}
            </Link>
            <Link href="/politique-confidentialite" className="transition-colors hover:text-cream">
              {t('footer.privacy')}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
