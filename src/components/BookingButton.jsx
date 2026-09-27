import { CalendarHeart } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { waLink } from '../constants'

const VARIANTS = {
  primary: 'bg-gold text-ink hover:bg-gold/85 shadow-md',
  outline: 'border-2 border-cream text-cream hover:bg-cream/10',
}

// CTA "Prendre Rendez-vous" → WhatsApp avec message pré-rempli (nouvel onglet).
// Si un lien Addagio est fourni plus tard, remplacer waLink par cette URL.
export default function BookingButton({ variant = 'primary', className = '' }) {
  const { t } = useTranslation()

  return (
    <a
      href={waLink(t('whatsapp.message'))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('cta.bookingAria')}
      className={`inline-flex items-center justify-center gap-2 rounded-btn px-5 py-2.5 font-semibold transition-colors ${VARIANTS[variant]} ${className}`}
    >
      <CalendarHeart className="size-5" aria-hidden="true" />
      {t('cta.booking')}
    </a>
  )
}
