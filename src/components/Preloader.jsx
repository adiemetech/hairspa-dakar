'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

// Écran de chargement animé — première visite de la session uniquement.
// - Désactivé si prefers-reduced-motion ou si déjà vu (sessionStorage).
// - Skippable au clic ou via Échap.
// - N'apparaît jamais sur les navigations internes (monté une seule fois).
// - Fallback sans JS : `show` démarre à false et `mounted` à false → le contenu
//   est rendu visible côté serveur, donc immédiatement lisible.
export default function Preloader({ children }) {
  const [mounted, setMounted] = useState(false)
  const [show, setShow] = useState(false)
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    setMounted(true)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const seen = sessionStorage.getItem('hs-preloaded') === '1'
    if (reduced || seen) {
      setEntered(true)
      return
    }
    setShow(true)
    let finished = false
    const finish = () => {
      if (finished) return
      finished = true
      setShow(false)
      setEntered(true)
      try {
        sessionStorage.setItem('hs-preloaded', '1')
      } catch {
        /* stockage indisponible : ignorer */
      }
    }
    const timer = setTimeout(finish, 1800)
    const onKey = (e) => {
      if (e.key === 'Escape') finish()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  const hidden = mounted && !entered

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            key="preloader"
            onClick={() => {
              setShow(false)
              setEntered(true)
              try {
                sessionStorage.setItem('hs-preloaded', '1')
              } catch {
                /* ignorer */
              }
            }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="fixed inset-0 z-100 flex cursor-pointer flex-col items-center justify-center bg-cream"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="rounded-card bg-white p-4 shadow-sm"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo/logo-hairspa.png"
                alt="HairSpa Dakar"
                className="h-20 w-auto mix-blend-multiply"
              />
            </motion.div>

            <div className="mt-8 h-0.5 w-40 overflow-hidden rounded-full bg-primary/15">
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-4 font-script text-2xl text-secondary"
            >
              HairSpa Dakar
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={hidden ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </>
  )
}
