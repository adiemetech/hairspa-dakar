export const SITE_URL = 'https://hairspa-dakar.vercel.app'

export const WHATSAPP_NUMBER = '221778582196'
export const PHONE_DISPLAY = '+221 77 858 21 96'

// Adresse pour la carte Google Maps (Sacré-Cœur 2, en face du restaurant OBV)
export const ADDRESS_QUERY = 'HairSpa Dakar Sacré-Cœur 2, en face du restaurant OBV, Dakar'

// URL du widget de réservation en ligne (Planity / Treatwell / Calendly).
// Tant qu'aucun lien n'est fourni, la page /rendez-vous et les CTA tombent sur WhatsApp.
export const BOOKING_URL = null

// Endpoint Formspree (ex: 'https://formspree.io/f/xxxxxxxx').
// Vide pour l'instant : le formulaire de contact se rabat sur WhatsApp (message composé).
// Renseigner cette constante active automatiquement l'envoi par email, sans autre changement.
export const FORMSPREE_ENDPOINT = ''

// Lien WhatsApp avec message pré-rempli (traduit selon la langue active)
export const waLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

export const SOCIAL_LINKS = [
  { name: 'Facebook', href: 'https://www.facebook.com/hairspadakar' },
  { name: 'Instagram', href: 'https://www.instagram.com/hairspadakar' },
  { name: 'TikTok', href: 'https://www.tiktok.com/@hairspadakar' },
]

export const CONSEILS_SLUGS = ['routine-cheveux-naturels', 'coiffures-protectrices', 'entretenir-soin-vapeur']

// Navigation principale — routes multipage (la locale /fr /en est ajoutée par next-intl)
export const NAV_SECTIONS = [
  { href: '/', labelKey: 'nav.home' },
  { href: '/a-propos', labelKey: 'nav.about' },
  { href: '/services', labelKey: 'nav.services' },
  { href: '/realisations', labelKey: 'nav.realisations' },
  { href: '/tarifs', labelKey: 'nav.pricing' },
  { href: '/conseils', labelKey: 'nav.conseils' },
  { href: '/contact', labelKey: 'nav.contact' },
]
