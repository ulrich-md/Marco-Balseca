import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { SectionLabel } from '../../components/ui/SectionLabel'
import { RevealText } from '../../components/ui/RevealText'
import { Reveal } from '../../components/ui/Reveal'
import { GrecaField } from '../../components/ui/Greca'
import { Sticker } from '../../components/ui/Sticker'
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
      className="group relative block aspect-[16/12] w-full overflow-hidden rounded-2xl bg-accent shadow-lift sm:aspect-[16/10]"
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
      <div className="absolute inset-0 bg-gradient-to-t from-wine/95 via-wine/40 to-transparent" />
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

/* Spotlight automático + "playlist" de notas sincronizada: la nota grande
   avanza sola cada AUTO_MS; las miniaturas de abajo funcionan como pestañas
   (con barra de progreso en la activa). Pausa al pasar el mouse / enfocar.
   Respeta reduce-motion. */
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
  }, [reduce, paused, count, index])

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
      <div className="relative overflow-hidden rounded-2xl">
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
          <div className="absolute right-4 top-4 z-10 flex gap-2">
            <button
              type="button"
              aria-label="Nota anterior"
              onClick={() => go(-1)}
              className="grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-white/90 text-lg text-ink shadow-soft transition-colors duration-200 hover:bg-accent hover:text-white"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Nota siguiente"
              onClick={() => go(1)}
              className="grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-white/90 text-lg text-ink shadow-soft transition-colors duration-200 hover:bg-accent hover:text-white"
            >
              ›
            </button>
          </div>
        )}
      </div>

      {count > 1 && (
        <div
          className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-5"
          role="tablist"
          aria-label="Ir a la nota"
        >
          {noticias.map((it, i) => {
            const active = i === safe
            return (
              <button
                key={it.id}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={`Nota ${i + 1} de ${count}`}
                onClick={() => setIndex(i)}
                className={`group relative cursor-pointer overflow-hidden rounded-lg text-left ring-1 transition-all duration-300 ${
                  active ? 'ring-accent' : 'opacity-70 ring-ink/10 hover:opacity-100'
                } ${i >= 3 ? 'hidden sm:block' : ''}`}
              >
                <div className="aspect-[16/10] bg-accent">
                  {it.imagen && (
                    <img
                      src={it.imagen}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  )}
                </div>
                {/* barra de progreso de la nota activa */}
                <span aria-hidden className="absolute inset-x-0 bottom-0 h-1 bg-black/20">
                  {active && (
                    <motion.span
                      key={`${it.id}-${paused}`}
                      className="block h-full bg-sand"
                      initial={{ width: reduce || paused ? '100%' : '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: reduce || paused ? 0 : AUTO_MS / 1000, ease: 'linear' }}
                    />
                  )}
                </span>
              </button>
            )
          })}
        </div>
      )}
      {count > 1 && (
        <span className="eyebrow mt-4 block text-right text-mute">
          {safe + 1} / {count}
        </span>
      )}
    </div>
  )
}

export function PrensaStrip() {
  const { noticias } = useNoticias()

  return (
    <section className="relative overflow-hidden bg-paper pb-24 pt-24 text-ink md:pb-32 md:pt-32">
      {/* greca dorada muy tenue en la esquina (textura cultural, sin ruido) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-10 hidden h-[420px] w-[520px] md:block"
        style={{
          WebkitMaskImage: 'radial-gradient(closest-side, #000, transparent)',
          maskImage: 'radial-gradient(closest-side, #000, transparent)',
        }}
      >
        <GrecaField color="var(--color-gold)" opacity={0.2} size={64} strokeWidth={2} />
      </div>

      <div className="container-x relative z-10">
        {/* Encabezado editorial */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel tone="accent">
              En las noticias
            </SectionLabel>
            <RevealText
              as="h2"
              text="Últimas Noticias"
              className="font-display mt-5 text-[13vw] leading-[0.9] text-ink sm:text-6xl lg:text-7xl"
            />
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-xl text-ink/70">
                El trabajo en territorio de Marco, contado por la prensa y sus redes.
              </p>
            </Reveal>
          </div>
          <div className="hidden md:block">
            <ButtonAnchor href={SOCIAL.facebook.url} tone="accent" variant="outline" arrow>
              Más actividades de Marco
            </ButtonAnchor>
          </div>
        </div>

        {/* Spotlight de notas (izq) + muro de Facebook AL LADO (der) */}
        <div className="mt-12 grid items-start gap-10 lg:mt-14 lg:grid-cols-[1.55fr_1fr] lg:gap-12">
          <div className="relative">
            <Reveal>
              <NewsSpotlight noticias={noticias} />
            </Reveal>
            <Sticker
              name="megafono"
              alt="Cerca de la gente"
              rotate={-10}
              className="-left-8 -top-12 hidden w-36 md:block lg:-left-14 lg:w-44"
            />
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

        <div className="mt-10 md:hidden">
          <ButtonAnchor href={SOCIAL.facebook.url} tone="accent" variant="outline" arrow full>
            Más actividades de Marco
          </ButtonAnchor>
        </div>
      </div>
    </section>
  )
}
