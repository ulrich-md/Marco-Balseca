import { useEffect, useState } from 'react'
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
   "Últimas Noticias" — mismo tratamiento guinda de "En Territorio" (foto
   difuminada + capa guinda + formas orgánicas + grano). Las notas van
   ROTANDO en un spotlight automático (una grande a la vez, avanza sola,
   con flechas, puntos y pausa al pasar el mouse). El muro de Facebook en
   vivo se mantiene AL LADO (columna derecha, sticky).
   ========================================================================= */

const EXPO = [0.16, 1, 0.3, 1]
const AUTO_MS = 6000

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

/* Una diapositiva del spotlight: foto grande con degradado y titular blanco
   encima; si la nota no trae foto real, panel guinda con greca de marca. */
function SpotlightSlide({ n }: { n: Noticia }) {
  const fecha = fmtFecha(n.fecha)
  return (
    <a
      href={n.url}
      target="_blank"
      rel="noreferrer"
      className="group relative block aspect-[16/12] w-full overflow-hidden rounded-lg shadow-[0_30px_70px_-30px_rgba(0,0,0,0.6)] ring-1 ring-white/10 sm:aspect-[16/10]"
    >
      {n.imagen ? (
        <img
          src={n.imagen}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-accent to-accent-deep">
          <svg
            viewBox="0 0 100 100"
            aria-hidden
            className="absolute -right-4 -top-4 h-40 w-40 opacity-20"
            fill="none"
          >
            <path
              d="M12 88 L12 38 L50 38 L50 66 L30 66 L30 52 L40 52 L40 58"
              stroke="var(--color-sand)"
              strokeWidth={6}
              strokeLinecap="square"
            />
          </svg>
        </div>
      )}

      {/* degradado para legibilidad del titular */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
      {/* brillo diagonal que barre al hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-full motion-reduce:transition-none"
      />

      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          {n.fuente && <span className="eyebrow text-sand">{n.fuente}</span>}
          {n.fuente && fecha && <span aria-hidden className="h-1 w-1 rounded-full bg-white/40" />}
          {fecha && <span className="eyebrow text-white/70">{fecha}</span>}
        </div>
        <h3 className="font-condensed mt-2 text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-[2rem]">
          {n.titulo}
        </h3>
        <span className="font-condensed mt-4 inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-white">
          Continúa leyendo
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </a>
  )
}

/* Spotlight automático: una nota a la vez, avanza sola cada AUTO_MS, con
   flechas, puntos y pausa al pasar el mouse / enfocar. Respeta reduce-motion. */
function NewsSpotlight({ noticias }: { noticias: Noticia[] }) {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = noticias.length

  // Si cambia la cantidad (carga async), no dejar el índice fuera de rango.
  useEffect(() => {
    if (count > 0 && index >= count) setIndex(0)
  }, [count, index])

  // Auto-avance (sólo si hay más de una y sin reduce-motion / sin pausa).
  useEffect(() => {
    if (reduce || paused || count <= 1) return
    const id = setInterval(() => setIndex((i) => (i + 1) % count), AUTO_MS)
    return () => clearInterval(id)
  }, [reduce, paused, count])

  if (count === 0) return null
  const safe = Math.min(index, count - 1)
  const n = noticias[safe]
  const go = (dir: number) => setIndex((i) => (i + dir + count) % count)

  return (
    <div
      className="relative"
      role="group"
      aria-roledescription="carrusel"
      aria-label="Últimas noticias"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative overflow-hidden rounded-lg">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={n.id}
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.015 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.99 }}
            transition={{ duration: reduce ? 0.2 : 0.6, ease: EXPO }}
          >
            <SpotlightSlide n={n} />
          </motion.div>
        </AnimatePresence>

        {count > 1 && (
          <>
            <button
              type="button"
              aria-label="Nota anterior"
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/35 text-lg text-white backdrop-blur-sm transition-colors duration-200 hover:bg-black/60"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Nota siguiente"
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-black/35 text-lg text-white backdrop-blur-sm transition-colors duration-200 hover:bg-black/60"
            >
              ›
            </button>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="mt-5 flex items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Ir a la nota">
            {noticias.map((it, i) => (
              <button
                key={it.id}
                type="button"
                role="tab"
                aria-selected={i === safe}
                aria-label={`Nota ${i + 1} de ${count}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === safe ? 'w-7 bg-sand' : 'w-2.5 bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
          <span className="eyebrow shrink-0 text-white/60">
            {safe + 1} / {count}
          </span>
        </div>
      )}
    </div>
  )
}

export function PrensaStrip() {
  const { noticias } = useNoticias()

  return (
    <section className="relative overflow-hidden bg-accent pb-20 pt-24 text-white md:pb-32 md:pt-36">
      {/* Transición suave desde el Hero claro: una curva crema con filo dorado
          que da un borde superior redondeado a la sección guinda (evita el corte
          recto contra el Hero). */}
      <div aria-hidden className="absolute inset-x-0 top-0 z-[2] leading-[0]">
        <svg
          viewBox="0 0 1440 110"
          preserveAspectRatio="none"
          className="block h-[52px] w-full md:h-[84px] lg:h-[104px]"
          fill="none"
        >
          <path d="M0 0 H1440 V66 C 1080 16, 360 16, 0 66 Z" fill="var(--color-cream)" />
          <path
            d="M0 66 C 360 16, 1080 16, 1440 66"
            stroke="var(--color-sand)"
            strokeWidth="2.5"
            opacity="0.55"
          />
        </svg>
      </div>

      {/* Fondo tipo "En Territorio": foto difuminada B&N + capa guinda
          (multiply) + formas orgánicas + grano. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          src="/assets/comunidad/comunidad-visita.webp"
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full scale-110 object-cover opacity-25 blur-[3px] grayscale"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
        <div className="absolute inset-0 bg-accent/85 mix-blend-multiply" />
        <OrganicShapes opacity={0.5} />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'url(/assets/backgrounds/grain.png)', backgroundSize: '420px' }}
        />
      </div>

      <div className="container-x relative z-10">
        {/* Encabezado centrado */}
        <div className="flex flex-col items-center text-center">
          <SectionLabel tone="bone">En las noticias</SectionLabel>
          <RevealText
            as="h2"
            text="Últimas Noticias"
            className="font-display mt-5 text-[13vw] leading-[0.9] text-white sm:text-6xl lg:text-7xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-xl text-white/75">
              El trabajo en territorio de Marco, contado por la prensa y sus redes.
            </p>
          </Reveal>
        </div>

        {/* Spotlight de notas (izq) + muro de Facebook AL LADO (der) */}
        <div className="mt-14 grid items-start gap-10 lg:grid-cols-[1.55fr_1fr] lg:gap-12">
          <div>
            <Reveal>
              <NewsSpotlight noticias={noticias} />
            </Reveal>
            <div className="mt-8">
              <ButtonAnchor href={SOCIAL.facebook.url} tone="bone" variant="outline" arrow>
                Más actividades de Marco
              </ButtonAnchor>
            </div>
          </div>

          {/* Columna del muro de Facebook (sticky en desktop) */}
          <Reveal delay={0.1}>
            <div className="lg:sticky lg:top-24">
              <div className="mb-4 flex items-center gap-2">
                <span aria-hidden className="relative flex h-2.5 w-2.5">
                  <span className="animate-live-pulse absolute inline-flex h-full w-full rounded-full bg-sand" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-sand" />
                </span>
                <span className="eyebrow text-sand">En vivo en Facebook</span>
              </div>
              <FacebookRecentPosts />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
