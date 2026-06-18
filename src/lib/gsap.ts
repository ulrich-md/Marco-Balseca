import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/** Registro único de plugins GSAP para toda la app. */
gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

/** ¿El usuario pidió reducir movimiento? (SSR-safe) */
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
