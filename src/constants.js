export const WHATSAPP_NUMBER = '221778582196'
export const PHONE_DISPLAY = '+221 77 858 21 96'

// URL du widget de réservation en ligne (Planity / Treatwell / Calendly / Addagio).
// Tant qu'aucun lien n'est fourni par le client, les CTA tombent sur WhatsApp.
export const BOOKING_URL = null

// Lien WhatsApp avec message pré-rempli (traduit selon la langue active)
export const waLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

export const SOCIAL_LINKS = [
  { name: 'Facebook', href: 'https://www.facebook.com/hairspadakar' },
  { name: 'Instagram', href: 'https://www.instagram.com/hairspadakar' },
  { name: 'TikTok', href: 'https://www.tiktok.com/@hairspadakar' },
]

export const CONSEILS_SLUGS = ['routine-cheveux-naturels', 'coiffures-protectrices', 'entretenir-soin-vapeur']

export const NAV_SECTIONS = [
  { id: 'accueil', labelKey: 'nav.home' },
  { id: 'a-propos', labelKey: 'nav.about' },
  { id: 'services', labelKey: 'nav.services' },
  { id: 'galerie', labelKey: 'nav.gallery' },
  { id: 'realisations', labelKey: 'nav.realisations' },
  { id: 'tarifs', labelKey: 'nav.pricing' },
  { id: 'conseils', labelKey: 'nav.conseils' },
  { id: 'temoignages', labelKey: 'nav.testimonials' },
  { id: 'contact', labelKey: 'nav.contact' },
]
