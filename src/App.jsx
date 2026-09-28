import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import About from './components/About'
import AlertBanner from './components/AlertBanner'
import Contact from './components/Contact'
import ConseilsPage from './components/ConseilsPage'
import Footer from './components/Footer'
import Gallery from './components/Gallery'
import GiftCards from './components/GiftCards'
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

// Page Conseils (blog) : #conseils (liste) ou #conseils/<slug> (article)
const conseilsSlug = (hash) =>
  hash === '#conseils' ? '' : hash.startsWith('#conseils/') ? hash.slice('#conseils/'.length) : null

export default function App() {
  const { t, i18n } = useTranslation()
  useSEO()
  const [hash, setHash] = useState(window.location.hash)

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash)
    // Retour arrière/avant : le hash change, et la langue peut suivre l'URL (/fr/, /en/)
    const onPopState = () => {
      setHash(window.location.hash)
      const segment = window.location.pathname.split('/')[1]
      if ((segment === 'fr' || segment === 'en') && segment !== i18n.resolvedLanguage) {
        i18n.changeLanguage(segment)
      }
    }
    window.addEventListener('hashchange', onHashChange)
    window.addEventListener('popstate', onPopState)
    return () => {
      window.removeEventListener('hashchange', onHashChange)
      window.removeEventListener('popstate', onPopState)
    }
  }, [i18n])

  const legalTitleKey = LEGAL_ROUTES[hash]
  const slug = conseilsSlug(hash)
  const isConseils = slug !== null
  const isSubPage = Boolean(legalTitleKey) || isConseils
  const routeKey = legalTitleKey ? hash : isConseils ? `conseils:${slug || 'list'}` : 'home'

  useEffect(() => {
    if (isSubPage) {
      window.scrollTo(0, 0)
      return
    }
    // Retour sur l'accueil avec un hash : amener la section demandée à l'écran
    if (hash) {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [hash, isSubPage])

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
      <AnimatePresence mode="wait">
        <motion.div
          key={routeKey}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {legalTitleKey ? (
            <LegalPage titleKey={legalTitleKey} />
          ) : isConseils ? (
            <ConseilsPage slug={slug} />
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
                <GiftCards />
              </Reveal>
              <Reveal>
                <Testimonials />
              </Reveal>
              <Reveal>
                <Contact />
              </Reveal>
            </main>
          )}
        </motion.div>
      </AnimatePresence>
      <Footer />
      <WhatsAppButton />
    </MotionConfig>
  )
}
