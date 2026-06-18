import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap'

/** Instancia global para que ScrollToTop pueda hablar con Lenis. */
let lenisInstance: Lenis | null = null

/**
 * Smooth scroll LIGERO con Lenis, sincronizado con GSAP ScrollTrigger.
 * Prohibido el scroll-jacking: solo suaviza, no frena ni secuestra.
 * Si el usuario pide reducir movimiento, no se activa Lenis.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (prefersReducedMotion()) return

    const lenis = new Lenis({
      duration: 1.05, // suave pero ágil, sin sensación de "freno"
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    })
    lenisInstance = lenis

    // Lenis maneja el rAF a través del ticker de GSAP (una sola fuente de verdad)
    lenis.on('scroll', ScrollTrigger.update)
    const onTick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(onTick)
      lenis.destroy()
      lenisInstance = null
    }
  }, [])

  return <>{children}</>
}

/** Lleva el scroll arriba en cada cambio de ruta y refresca ScrollTrigger. */
export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
    // El layout nuevo cambió: recalcula triggers tras pintar.
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [pathname])

  return null
}

export function scrollToTop() {
  if (lenisInstance) lenisInstance.scrollTo(0)
  else window.scrollTo({ top: 0, behavior: 'smooth' })
}
