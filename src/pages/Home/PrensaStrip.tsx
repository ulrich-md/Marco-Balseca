import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { SectionLabel } from '../../components/ui/SectionLabel'
import { RevealText } from '../../components/ui/RevealText'
import { Reveal } from '../../components/ui/Reveal'
import { OrganicShapes } from '../../components/ui/OrganicShapes'
import { ButtonAnchor } from '../../components/ui/Button'
import { FacebookRecentPosts } from '../../components/ui/FacebookRecentPosts'
import { useNoticias } from '../../lib/useContent'
import { SOCIAL } from '../../data/site'
import type { Noticia } from '../../data/noticias'

/* =========================================================================
   "Últimas Noticias" — crema institucional. Tarjetas GRANDES con panel de
   gradiente guinda (fuente + greca + brillo al hover) cuando no hay foto real,
   o la foto real si se agrega desde /admin. Muro de Facebook en vivo AL LADO
   (columna derecha, sticky). Las 5 notas se revelan con un botón.
   ========================================================================= */

const EXPO = [0.16, 1, 0.3, 1]

function fmtFecha(iso?: string) {
  if (!iso) return null
  try {
    return new Intl.DateTimeFormat('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })
      .format(new Date(`${iso.slice(0, 10)}T00:00:00`))
      .replace('.', '')
  } catch {
    return iso
  }
}

/* Panel de gradiente guinda cuando la nota no trae foto real (con greca de
   marca de agua + brillo que barre al hover). */
function CoverPanel({ fuente }: { fuente?: string }) {
  return (
    <div className="relative flex min-h-[168px] items-end overflow-hidden bg-gradient-to-br from-accent to-accent-deep p-5">
      <svg viewBox="0 0 100 100" aria-hidden className="absolute -right-3 -top-3 h-24 w-24 opacity-20" fill="none">
        <path
          d="M12 88 L12 38 L50 38 L50 66 L30 66 L30 52 L40 52 L40 58"
          stroke="var(--color-sand)"
          strokeWidth={6}
          strokeLinecap="square"
        />
      </svg>
      {/* brillo diagonal que barre al hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-full motion-reduce:transition-none"
      />
      <span className="relative">
        <span className="eyebrow text-white/70">En la prensa</span>
        <span className="font-condensed mt-1 block text-lg font-bold uppercase leading-tight tracking-wide text-white">
          {fuente ?? 'Marco Balseca'}
        </span>
      </span>
    </div>
  )
}

function NewsCard({ n }: { n: Noticia }) {
  const fecha = fmtFecha(n.fecha)
  return (
    <article className="group grid overflow-hidden rounded-lg bg-white shadow-[0_18px_45px_-30px_rgba(22,22,22,0.4)] ring-1 ring-ink/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_55px_-24px_rgba(155,34,71,0.5)] sm:grid-cols-[minmax(0,42%)_1fr]">
      {n.imagen ? (
        <div className="overflow-hidden">
          <img
            src={n.imagen}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-full"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        </div>
      ) : (
        <CoverPanel fuente={n.fuente} />
      )}

      <div className="flex flex-col justify-center p-6 sm:p-7">
        {(n.fuente || fecha) && (
          <div className="flex flex-wrap items-center gap-2">
            {n.imagen && n.fuente && <span className="eyebrow text-accent">{n.fuente}</span>}
            {n.imagen && n.fuente && fecha && (
              <span aria-hidden className="h-1 w-1 rounded-full bg-ink/25" />
            )}
            {fecha && <span className="eyebrow text-mute">{fecha}</span>}
          </div>
        )}
        <h3 className="font-condensed mt-2 text-xl font-semibold leading-snug text-accent-deep transition-colors duration-200 group-hover:text-accent sm:text-2xl">
          {n.titulo}
        </h3>
        <a
          href={n.url}
          target="_blank"
          rel="noreferrer"
          className="font-condensed mt-4 inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-accent"
        >
          Continúa leyendo
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>
      </div>
    </article>
  )
}

export function PrensaStrip() {
  const reduce = useReducedMotion()
  const { noticias } = useNoticias()
  const [showAll, setShowAll] = useState(false)
  const primeras = noticias.slice(0, 3)
  const resto = noticias.slice(3)

  return (
    <section className="relative overflow-hidden bg-cream py-20 text-ink md:py-32">
      <OrganicShapes tone="light" opacity={0.55} />
      <div className="container-x relative z-10">
        {/* Encabezado centrado */}
        <div className="flex flex-col items-center text-center">
          <SectionLabel tone="accent">En las noticias</SectionLabel>
          <RevealText
            as="h2"
            text="Últimas Noticias"
            className="font-display mt-5 text-[13vw] leading-[0.9] text-accent sm:text-6xl lg:text-7xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-xl text-ink/70">
              El trabajo en territorio de Marco, contado por la prensa y sus redes.
            </p>
          </Reveal>
        </div>

        {/* Notas (izq) + muro de Facebook AL LADO (der) */}
        <div className="mt-14 grid items-start gap-10 lg:grid-cols-[1.55fr_1fr] lg:gap-12">
          {/* Columna de notas */}
          <div>
            <div className="grid gap-6">
              {primeras.map((n, i) => (
                <Reveal key={n.id} delay={i * 0.06}>
                  <NewsCard n={n} />
                </Reveal>
              ))}
              <AnimatePresence initial={false}>
                {showAll &&
                  resto.map((n, i) => (
                    <motion.div
                      key={n.id}
                      initial={reduce ? false : { opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
                      transition={{ duration: reduce ? 0.2 : 0.42, delay: reduce ? 0 : i * 0.08, ease: EXPO }}
                    >
                      <NewsCard n={n} />
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>

            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              {resto.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowAll((v) => !v)}
                  aria-expanded={showAll}
                  className="font-condensed group inline-flex items-center gap-2 rounded-full border border-accent/40 px-6 py-3 text-sm font-bold uppercase tracking-wide text-accent transition-colors duration-300 hover:bg-accent hover:text-white"
                >
                  {showAll ? 'Ver menos' : `Ver todas (${noticias.length})`}
                  <span
                    aria-hidden
                    className={`transition-transform duration-300 ${showAll ? 'rotate-180' : 'group-hover:translate-y-0.5'}`}
                  >
                    ↓
                  </span>
                </button>
              )}
              <ButtonAnchor href={SOCIAL.facebook.url} tone="accent" variant="outline" arrow>
                Más actividades de Marco
              </ButtonAnchor>
            </div>
          </div>

          {/* Columna del muro de Facebook (sticky en desktop) */}
          <Reveal delay={0.1}>
            <div className="lg:sticky lg:top-24">
              <div className="mb-4 flex items-center gap-2">
                <span aria-hidden className="relative flex h-2.5 w-2.5">
                  <span className="animate-live-pulse absolute inline-flex h-full w-full rounded-full bg-accent" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
                </span>
                <span className="eyebrow text-accent">En vivo en Facebook</span>
              </div>
              <FacebookRecentPosts />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
