'use client'

import { useEffect, useRef, useState } from 'react'

// Compteur animé : démarre quand l'élément entre dans le viewport.
// Affiche directement la valeur finale si l'utilisateur réduit les animations.
export default function CountUp({ value, suffix = '', decimals = 0, duration = 1600 }) {
  const ref = useRef(null)
  const reduced =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [display, setDisplay] = useState(reduced ? value : 0)

  useEffect(() => {
    if (reduced) return
    const el = ref.current
    if (!el) return

    let frame
    let fallback
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1)
          // easeOutCubic
          const eased = 1 - Math.pow(1 - p, 3)
          setDisplay(value * eased)
          if (p < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
        // Filet de sécurité : garantit la valeur finale si rAF est mis en pause (onglet masqué)
        fallback = setTimeout(() => setDisplay(value), duration + 150)
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(frame)
      clearTimeout(fallback)
    }
  }, [value, duration, reduced])

  return (
    <span ref={ref}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  )
}
