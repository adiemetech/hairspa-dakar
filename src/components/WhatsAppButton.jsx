import { MessageCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { waLink } from '../constants'

// Bouton WhatsApp flottant — visible sur tout le site, en bas à droite
export default function WhatsAppButton() {
  const { t } = useTranslation()

  return (
    <a
      href={waLink(t('whatsapp.message'))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('whatsapp.ariaLabel')}
      className="fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
    >
      <MessageCircle className="size-7" aria-hidden="true" />
    </a>
  )
}
