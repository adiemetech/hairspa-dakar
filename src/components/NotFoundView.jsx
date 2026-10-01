'use client'

import { motion } from 'framer-motion'
import { Home } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

// Page 404 animée : le "404" flotte doucement, le contenu apparaît en fondu.
export default function NotFoundView() {
  const t = useTranslations('notFound')

  return (
    <main
      id="contenu"
      className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-24 text-center"
    >
      <motion.p
        aria-hidden="true"
        className="font-serif text-8xl font-bold text-primary/25 sm:text-9xl"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.span
          className="inline-block"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {t('code')}
        </motion.span>
      </motion.p>

      <motion.h1
        className="mt-4 font-serif text-3xl font-semibold text-ink sm:text-4xl"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        {t('title')}
      </motion.h1>
      <motion.p
        className="mt-3 max-w-md text-ink/70"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        {t('text')}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
      >
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-btn bg-secondary px-6 py-3 font-semibold text-white shadow-md transition-colors hover:bg-secondary-dark"
        >
          <Home className="size-5" aria-hidden="true" />
          {t('backHome')}
        </Link>
      </motion.div>
    </main>
  )
}
