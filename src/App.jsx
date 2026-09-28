import { MotionConfig } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import About from './components/About'
import AlertBanner from './components/AlertBanner'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Gallery from './components/Gallery'
import Header from './components/Header'
import Hero from './components/Hero'
import LegalPage from './components/LegalPage'
import Pricing from './components/Pricing'
import Realisations from './components/Realisations'
import Reveal from './components/Reveal'
import Services from './components/Services'
import Testimonials from './components/Testimonials'
import WhatsAppButton from './components/WhatsAppButton'
import useSEO from './hooks/useSEO'

// Routage minimal par hash pour les pages légales (liens du footer)
const LEGAL_ROUTES = {
  '#mentions-legales': 'legal.title',
  '#politique-confidentialite': 'legal.privacyTitle',
}

export default function App() {
  const { t } = useTranslation()
  useSEO()
  const [hash, setHash] = useState(window.location.hash)

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const legalTitleKey = LEGAL_ROUTES[hash]

  useEffect(() => {
    if (legalTitleKey) window.scrollTo(0, 0)
  }, [legalTitleKey])

  return (
    <MotionConfig reducedMotion="user">
      {/* Lien d'évitement clavier */}
      <a
        href="#contenu"
        className="sr-only z-50 rounded-btn bg-ink px-4 py-2 text-cream focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {t('a11y.skipToContent')}
      </a>
      <AlertBanner />
      <Header />
      {legalTitleKey ? (
        <LegalPage titleKey={legalTitleKey} />
      ) : (
        <main id="contenu">
          <Hero />
          <Reveal>
            <About />
          </Reveal>
          <Reveal>
            <Services />
          </Reveal>
          <Reveal>
            <Gallery />
          </Reveal>
          <Reveal>
            <Realisations />
          </Reveal>
          <Reveal>
            <Pricing />
          </Reveal>
          <Reveal>
            <Testimonials />
          </Reveal>
          <Reveal>
            <Contact />
          </Reveal>
        </main>
      )}
      <Footer />
      <WhatsAppButton />
    </MotionConfig>
  )
}
