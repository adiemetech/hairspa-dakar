'use client'

import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import AlertBanner from './AlertBanner'
import BackToTop from './BackToTop'
import Footer from './Footer'
import Header from './Header'
import Preloader from './Preloader'
import WhatsAppButton from './WhatsAppButton'
import { usePathname } from '@/i18n/navigation'

// Enveloppe partagée : preloader + bandeau + header + contenu + footer + flottants.
// MotionConfig reducedMotion="user" fait respecter prefers-reduced-motion partout.
export default function Shell({ children }) {
  const pathname = usePathname()

  return (
    <MotionConfig reducedMotion="user">
      <Preloader>
        <AlertBanner />
        <Header />
        {/* Transition de page : fondu + léger glissement à chaque changement de route.
            initial={false} évite l'animation au tout premier rendu (géré par le preloader). */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
        <Footer />
      </Preloader>
      <WhatsAppButton />
      <BackToTop />
    </MotionConfig>
  )
}
