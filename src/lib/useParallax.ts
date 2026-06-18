import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap'

/**
 * Parallax sutil con scrub suave (GSAP ScrollTrigger).
 * NO secuestra el scroll: solo desplaza el elemento mientras la página avanza.
 * `distance` = px totales de recorrido (positivo baja, negativo sube).
 */
export function useParallax<T extends HTMLElement>(distance = 80) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: -distance / 2 },
        {
          y: distance / 2,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        },
      )
    })

    return () => ctx.revert()
  }, [distance])

  return ref
}

/** Refresca ScrollTrigger tras cargar (fuentes/imagenes). */
export function refreshScrollTrigger() {
  ScrollTrigger.refresh()
}
