import type { Variants } from 'framer-motion'

/** Curva power3.out aproximada para Framer Motion (cubic-bezier). */
export const EASE_OUT: [number, number, number, number] = [0.215, 0.61, 0.355, 1]

/** Reveal estándar al entrar en viewport: fade + translateY 24–32px. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_OUT },
  },
}

/** Contenedor con stagger para listas/grids. */
export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
})

/** Línea de split-text: máscara + translateY 100%. */
export const lineReveal: Variants = {
  hidden: { y: '110%' },
  show: {
    y: '0%',
    transition: { duration: 0.8, ease: EASE_OUT },
  },
}

/** Palabra de split-text. */
export const wordReveal: Variants = {
  hidden: { y: '115%' },
  show: { y: '0%', transition: { duration: 0.72, ease: EASE_OUT } },
}

/**
 * Transición de página entre rutas. SOLO opacidad a propósito:
 * un transform en <main> crearía un containing block que rompería el
 * pin de GSAP (timeline horizontal). Fade limpio = suave y seguro.
 */
export const pageTransition: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.45, ease: EASE_OUT } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: EASE_OUT } },
}

/** Viewport por defecto para whileInView (una sola vez, con margen). */
export const inView = { once: true, margin: '0px 0px -12% 0px' } as const
