'use client'

import { motion } from 'framer-motion'

// Apparition douce au scroll (fade-in + slide-up), une seule fois.
// Désactivé automatiquement si l'utilisateur préfère moins d'animations
// (via <MotionConfig reducedMotion="user"> dans App).
export default function Reveal({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
