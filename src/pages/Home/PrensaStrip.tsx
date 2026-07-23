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
   "Últimas Noticias" — estilo del sitio del Gobierno del Estado (crema +
   tarjetas blancas con fuente, título, fecha y botón guinda), con nuestra
   tipografía. Las 5 notas se revelan con un botón; incluye el muro de
   Facebook en vivo. Editable desde /admin (pestaña Noticias).
   ========================================================================= */

const EXPO = [0.16, 1, 0.3, 1]

function fmtFecha(iso?: string) {
  if (!iso) return null
  try {
    return new Intl.DateTimeFormat('es-MX', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(`${iso.slice(0, 10)}T00:00:00`))
  } catch {
    return iso
  }
}

function NewsCard({ n }: { n: Noticia }) {
  const fecha = fmtFecha(n.fecha)
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-md bg-white shadow-[0_18px_45px_-30px_rgba(22,22,22,0.35)] ring-1 ring-ink/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_55px_-26px_rgba(155,34,71,0.45)]">
      {n.imagen ? (
        <div className="overflow-hidden">
          <img
            src={n.imagen}
            alt=""
            loading="lazy"
            decoding="async"
            className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        </div>
      ) : (
        // Sin foto: pleca guinda que "se llena" al hover (microinteracción)
        <div className="relative h-2 w-full bg-accent/25">
          <span
            aria-hidden
            className="absolute inset-0 origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col items-center px-6 pb-7 pt-6 text-center">
        {n.fuente && <span className="eyebrow text-accent">{n.fuente}</span>}
        <h3 className="font-condensed mt-3 text-xl font-semibold leading-snug text-accent-deep">
          {n.titulo}
        </h3>
        {fecha && <p className="mt-3 text-sm text-mute">Publicado: {fecha}</p>}
        <div className="mt-auto pt-6">
          <a
            href={n.url}
            target="_blank"
            rel="noreferrer"
            className="font-condensed inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-accent-deep"
          >
            Continúa leyendo
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
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
    <section className="relative overflow-hidden bg-cream py-20 text-ink md:py-36">
      <OrganicShapes tone="light" opacity={0.55} />
      <div className="container-x relative z-10">
        {/* Encabezado centrado (ref. Armenta) con nuestra tipografía */}
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

        {/* Tarjetas de nota */}
        <div className="mx-auto mt-14 grid max-w-5xl gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {primeras.map((n, i) => (
            <Reveal key={n.id} delay={i * 0.08}>
              <NewsCard n={n} />
            </Reveal>
          ))}
          <AnimatePresence initial={false}>
            {showAll &&
              resto.map((n, i) => (
                <motion.div
                  key={n.id}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.42, delay: i * 0.07, ease: EXPO }}
                >
                  <NewsCard n={n} />
                </motion.div>
              ))}
          </AnimatePresence>
        </div>

        {resto.length > 0 && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              aria-expanded={showAll}
              className="font-condensed group inline-flex items-center gap-2 rounded-full border border-accent/40 px-7 py-3 text-sm font-bold uppercase tracking-wide text-accent transition-colors duration-300 hover:bg-accent hover:text-white"
            >
              {showAll ? 'Ver menos' : `Ver todas las noticias (${noticias.length})`}
              <span
                aria-hidden
                className={`transition-transform duration-300 ${showAll ? 'rotate-180' : 'group-hover:translate-y-0.5'}`}
              >
                ↓
              </span>
            </button>
          </div>
        )}

        {/* CTA grande (pill) — como la referencia */}
        <Reveal delay={0.1}>
          <div className="mt-14 flex justify-center">
            <ButtonAnchor href={SOCIAL.facebook.url} tone="accent" variant="solid" arrow>
              Más actividades de Marco Balseca
            </ButtonAnchor>
          </div>
        </Reveal>

        {/* ===== Muro de Facebook en vivo ===== */}
        <div className="mt-20 border-t border-ink/10 pt-16">
          <div className="mx-auto max-w-xl text-center">
            <SectionLabel tone="accent">En vivo</SectionLabel>
            <RevealText
              as="h3"
              text="Su día a día en Facebook"
              className="font-display mt-4 text-[8vw] leading-[0.95] text-accent-deep sm:text-3xl lg:text-4xl"
            />
            <Reveal delay={0.1}>
              <p className="mt-3 text-ink/70">
                Publicaciones recientes, directo desde su página oficial.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.12} className="mx-auto mt-8 max-w-xl">
            <FacebookRecentPosts />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
