import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
   "Últimas Noticias" — crema institucional. Lista de notas a la izquierda
   (con fuente, título, fecha y "Continúa leyendo") y el MURO DE FACEBOOK en
   vivo AL LADO (columna derecha, sticky). Las 5 notas se revelan con un
   botón. Editable desde /admin. Microinteracciones sutiles.
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

function NewsCard({ n }: { n: Noticia }) {
  const fecha = fmtFecha(n.fecha)
  return (
    <article className="group relative flex items-start gap-4 overflow-hidden rounded-md border border-ink/8 bg-white p-5 pl-6 shadow-[0_16px_40px_-32px_rgba(22,22,22,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_45px_-28px_rgba(155,34,71,0.45)]">
      {/* pleca guinda que se "llena" al hover */}
      <span aria-hidden className="absolute left-0 top-0 h-full w-1.5 bg-accent/20">
        <span className="block h-full origin-top scale-y-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
      </span>

      {n.imagen && (
        <div className="hidden shrink-0 overflow-hidden rounded sm:block">
          <img
            src={n.imagen}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-20 w-28 object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        </div>
      )}

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          {n.fuente && <span className="eyebrow text-accent">{n.fuente}</span>}
          {fecha && (
            <>
              <span aria-hidden className="h-1 w-1 rounded-full bg-ink/25" />
              <span className="eyebrow text-mute">{fecha}</span>
            </>
          )}
        </div>
        <h3 className="font-condensed mt-2 text-lg font-semibold leading-snug text-accent-deep transition-colors duration-200 group-hover:text-accent">
          {n.titulo}
        </h3>
        <a
          href={n.url}
          target="_blank"
          rel="noreferrer"
          className="font-condensed mt-3 inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-accent"
        >
          Continúa leyendo
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>
      </div>
    </article>
  )
}

export function PrensaStrip() {
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
            className="font-display mt-5 text-[12vw] leading-[0.9] text-accent sm:text-5xl lg:text-6xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-xl text-ink/70">
              El trabajo en territorio de Marco, contado por la prensa y sus redes.
            </p>
          </Reveal>
        </div>

        {/* Notas (izq) + muro de Facebook AL LADO (der) */}
        <div className="mt-14 grid items-start gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
          {/* Columna de notas */}
          <div>
            <div className="grid gap-4">
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
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.4, delay: i * 0.07, ease: EXPO }}
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
