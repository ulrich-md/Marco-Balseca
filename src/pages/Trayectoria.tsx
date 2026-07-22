import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Seo } from '../lib/Seo'
import { PageHero } from '../components/layout/PageHero'
import { CtaBand } from '../components/layout/CtaBand'
import { SectionLabel } from '../components/ui/SectionLabel'
import { Reveal } from '../components/ui/Reveal'
import { TimelineItem } from '../components/ui/TimelineItem'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { TRAYECTORIA } from '../data/trayectoria'

export default function Trayectoria() {
  const reduce = useReducedMotion()
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  // Timeline horizontal-pinned SUAVE (solo desktop, sin secuestrar el scroll:
  // el avance está ligado 1:1 al scroll del usuario vía scrub).
  useEffect(() => {
    if (reduce) return
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px)', () => {
      const getDistance = () => track.scrollWidth - section.clientWidth + 96

      gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => '+=' + getDistance(),
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    })

    // Re-mide tras montar/cargar fuentes (la página entra con fade).
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 600)
    return () => {
      window.clearTimeout(t)
      mm.revert()
    }
  }, [reduce])

  return (
    <>
      <Seo
        title="Trayectoria"
        path="/trayectoria"
        description="La trayectoria de Marco Balseca: hitos de su camino político y comunitario en Tehuacán, Puebla."
      />

      <PageHero
        index="03"
        label="Trayectoria"
        title={'El camino'}
        intro="De las raíces del agua mineral al trabajo en territorio de hoy. Este es el camino que me trajo hasta aquí, contado con honestidad: de dónde vengo, qué aprendí y por qué sigo caminando Tehuacán."
      />

      {/* === Desktop: horizontal pinned === */}
      {!reduce && (
        <section
          ref={sectionRef}
          className="relative hidden h-screen items-center overflow-hidden bg-bone lg:flex"
        >
          <div className="pointer-events-none absolute left-0 right-0 top-12 z-10">
            <div className="container-x flex items-center justify-between">
              <SectionLabel tone="accent">Línea de tiempo</SectionLabel>
              <span className="eyebrow text-mute">Desliza para avanzar →</span>
            </div>
          </div>

          <div ref={trackRef} className="relative flex items-start gap-12 pl-[8vw] pr-[34vw] pt-14">
            {/* riel */}
            <div className="pointer-events-none absolute left-[8vw] right-[34vw] top-6 h-px bg-ink/20" />
            {TRAYECTORIA.map((hito, i) => (
              <TimelineItem key={i} hito={hito} index={i} orientation="horizontal" />
            ))}
          </div>
        </section>
      )}

      {/* === Móvil / reduced-motion: vertical === */}
      <section className={`bg-bone py-20 ${reduce ? '' : 'lg:hidden'}`}>
        <div className="container-x">
          <SectionLabel tone="accent">Línea de tiempo</SectionLabel>
          <div className="relative mt-10 space-y-8 pl-8">
            {/* riel vertical */}
            <div className="absolute bottom-2 left-[6px] top-2 w-px bg-ink/15" />
            {TRAYECTORIA.map((hito, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <TimelineItem hito={hito} index={i} orientation="vertical" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
