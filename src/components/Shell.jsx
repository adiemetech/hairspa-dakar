'use client'

import { MotionConfig } from 'framer-motion'
import AlertBanner from './AlertBanner'
import BackToTop from './BackToTop'
import Footer from './Footer'
import Header from './Header'
import Preloader from './Preloader'
import WhatsAppButton from './WhatsAppButton'

// Enveloppe partagée : preloader + bandeau + header + contenu + footer + flottants.
// MotionConfig reducedMotion="user" fait respecter prefers-reduced-motion partout.
export default function Shell({ children }) {
  return (
    <MotionConfig reducedMotion="user">
      <Preloader>
        <AlertBanner />
        <Header />
        {children}
        <Footer />
      </Preloader>
      <WhatsAppButton />
      <BackToTop />
    </MotionConfig>
  )
}
