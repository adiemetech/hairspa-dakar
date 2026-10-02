'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

// Bouton "retour en haut" — apparaît après un peu de scroll, disparaît en haut.
export default function BackToTop() {
  const t = useTranslations('a11y')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.25 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label={t('backToTop')}
          className="fixed bottom-24 right-5 z-50 flex size-12 items-center justify-center rounded-full bg-ink text-cream shadow-lg transition-colors hover:bg-secondary-dark"
        >
          <ArrowUp className="size-6" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
