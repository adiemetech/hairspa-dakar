import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import fr from './locales/fr.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      en: { translation: en },
    },
    fallbackLng: 'fr',
    supportedLngs: ['fr', 'en'],
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'hairspa-lang',
    },
    interpolation: { escapeValue: false },
  })

// Attribut <html lang> synchronisé avec la langue active (accessibilité + SEO)
const setLang = (lng) => {
  document.documentElement.lang = lng?.startsWith('en') ? 'en' : 'fr'
}
setLang(i18n.resolvedLanguage)
i18n.on('languageChanged', setLang)

export default i18n
