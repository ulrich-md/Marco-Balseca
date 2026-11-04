import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import type { Hito } from '../../data/trayectoria'
import { smoothScrollTo } from '../../lib/SmoothScroll'

/* =========================================================================
   TRAYECTORIA — "mapa fijo, hitos que fluyen" (scrollytelling tipo NYT).
   La página NUNCA se detiene: las tarjetas de cada hito (año, título, texto
   completo y lugar) suben con el scroll de forma natural, y solo el MAPA se
   queda fijo a un lado (arriba en móvil). La tarjeta que cruza el centro de
   la pantalla es la activa: el mapa ilumina su parada y dibuja el recorrido
   cuando cambia de lugar. El riel de años marca el avance y permite saltar.
   ========================================================================= */

const MAP_W = 1586
const MAP_H = 992

type PinKey = 'T' | 'C' | 'N'
const PINS: Record<PinKey, { x: number; y: number }> = {
  T: { x: 965, y: 745 }, // Tehuacán (sureste de Puebla)
  C: { x: 1230, y: 895 }, // Chiapas
  N: { x: 850, y: 640 }, // Ciudad de México (nacional)
}

const SEGS: Record<string, string> = {
  'T>C': 'M965 745 Q1105 690 1230 895',
  'C>N': 'M1230 895 Q1090 560 850 640',
  'N>T': 'M850 640 Q880 780 965 745',
  'T>N': 'M965 745 Q880 600 850 640',
  'N>C': 'M850 640 Q1090 560 1230 895',
  'C>T': 'M1230 895 Q1105 690 965 745',
}

// Encuadre: centro y sur de México (donde pasa el recorrido)
const CROP = { x: 470, y: 330, w: 1090, h: 662 }

const LABEL_POS: Record<PinKey, string> = {
  N: 'right-full top-1/2 mr-1 -translate-y-1/2',
  T: 'left-full top-1/2 ml-1 -translate-y-1/2',
  C: 'left-1/2 top-full mt-1 -translate-x-1/2',
}

function pinFor(lugar?: string): PinKey {
  const l = (lugar ?? '').toLowerCase()
  if (l.includes('chiapas')) return 'C'
  if (l.includes('nacional') || l === 'méxico' || l === 'mexico') return 'N'
  return 'T'
}

const pct = (v: number, total: number) => `${(v / total) * 100}%`

export function MapaTrayectoria({ hitos }: { hitos: Hito[] }) {
  const reduce = useReducedMotion()
  const listRef = useRef<HTMLOListElement>(null)
  const cardRefs = useRef<(HTMLLIElement | null)[]>([])
  const [active, setActive] = useState(0)
  const n = hitos.length

  // Parada de cada hito y "etapa" (cambia cuando cambia el lugar)
  const { pins, stageOf, segs } = useMemo(() => {
    const pins = hitos.map((h) => pinFor(h.lugar))
    const stageOf: number[] = []
    const segs: string[] = []
    pins.forEach((p, i) => {
      if (i === 0) stageOf.push(0)
      else if (p !== pins[i - 1]) {
        stageOf.push(stageOf[i - 1] + 1)
        const d = SEGS[`${pins[i - 1]}>${p}`]
        if (d) segs.push(d)
      } else stageOf.push(stageOf[i - 1])
    })
    return { pins, stageOf, segs }
  }, [hitos])

  // Hito activo = la tarjeta que cruza la franja central de la pantalla
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i))
        })
      },
      { rootMargin: '-48% 0px -48% 0px' },
    )
    cardRefs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [n])

  // Riel: avance continuo a lo largo de la lista
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 50%', 'end 50%'] })
  const railW = useTransform(scrollYProgress, (v) => `${Math.max(0, Math.min(1, v)) * 100}%`)

  const jump = (i: number) => {
    const el = cardRefs.current[i]
    if (!el) return
    const r = el.getBoundingClientRect()
    smoothScrollTo(r.top + window.scrollY - window.innerHeight / 2 + r.height / 2)
  }

  const pin = pins[active]
  const stage = stageOf[active]
  const pinKeys = Array.from(new Set(pins))

  return (
    <div data-trayectoria-track className="container-x">
      <div className="grid gap-x-14 lg:grid-cols-12">
        {/* ---------------- Mapa fijo (arriba en móvil, a un lado en desktop) ---------------- */}
        <div className="sticky top-16 z-20 -mx-5 bg-paper/95 px-5 pb-3 pt-3 backdrop-blur-sm lg:top-28 lg:col-span-6 lg:mx-0 lg:self-start lg:bg-transparent lg:px-0 lg:pb-0 lg:pt-0 lg:backdrop-blur-none xl:col-span-5">
          <div className="flex justify-center">
              <div
            className="relative mx-auto w-full max-w-[620px] overflow-hidden rounded-2xl bg-cream shadow-lift ring-1 ring-ink/5 max-lg:w-[min(100%,calc(24vh*1.646))]"
            style={{ aspectRatio: `${CROP.w} / ${CROP.h}` }}
          >
            <div
              className="absolute"
              style={{
                width: `${(MAP_W / CROP.w) * 100}%`,
                left: `${(-CROP.x / CROP.w) * 100}%`,
                top: `${(-CROP.y / CROP.h) * 100}%`,
              }}
            >
              <img
                src="/assets/generated/mapa-trayectoria.webp"
                alt="Mapa de México con Puebla y Chiapas resaltados"
                width={MAP_W}
                height={MAP_H}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full"
              />
              <svg aria-hidden viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="pointer-events-none absolute inset-0 h-full w-full">
                {segs.map((d, i) => (
                  <g key={i}>
                    <path d={d} fill="none" stroke="var(--color-accent)" strokeOpacity={0.2} strokeWidth={5} strokeDasharray="2 14" strokeLinecap="round" />
                    <motion.path
                      d={d}
                      fill="none"
                      stroke="var(--color-accent)"
                      strokeWidth={7}
                      strokeLinecap="round"
                      initial={false}
                      animate={{ pathLength: stage > i ? 1 : 0, opacity: stage > i ? 1 : 0 }}
                      transition={{ duration: reduce ? 0 : 0.9, ease: [0.65, 0, 0.35, 1] }}
                    />
                  </g>
                ))}
              </svg>
              {pinKeys.map((k) => {
                const isOn = pin === k
                const label = hitos[pins.indexOf(k)].lugar ?? ''
                return (
                  <span
                    key={k}
                    aria-hidden
                    className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                    style={{ left: pct(PINS[k].x, MAP_W), top: pct(PINS[k].y, MAP_H) }}
                  >
                    <span className="relative grid place-items-center">
                      {isOn && !reduce && (
                        <span className="absolute h-9 w-9 animate-ping rounded-full bg-accent/35 [animation-duration:1.8s]" />
                      )}
                      <span
                        className={`relative block rounded-full border-[3px] border-white shadow-soft transition-all duration-300 ${
                          isOn ? 'h-5 w-5 bg-accent' : 'h-3.5 w-3.5 bg-accent/60'
                        }`}
                      />
                    </span>
                    <span
                      className={`eyebrow absolute whitespace-nowrap rounded-full px-2 py-0.5 text-[0.62rem] shadow-soft transition-all duration-300 ${LABEL_POS[k]} ${
                        isOn ? 'bg-accent text-white' : 'hidden bg-white/90 text-ink/70 sm:block'
                      }`}
                    >
                      {k === 'N' ? hitos[pins.lastIndexOf('N')].lugar : label}
                    </span>
                  </span>
                )
              })}
            </div>
          </div>

          </div>

          {/* Riel de años: avance continuo + saltar a cualquier hito */}
          <div className="mx-auto mt-3 max-w-[620px] lg:mt-5">
            <div className="relative h-1 rounded-full bg-ink/10">
              <motion.div className="absolute inset-y-0 left-0 rounded-full bg-accent" style={{ width: railW }} />
            </div>
            <ol className="mt-1 grid" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
              {hitos.map((hh, i) => (
                <li key={`${hh.anio}-${i}`} className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => jump(i)}
                    aria-label={`${hh.anio}: ${hh.titulo}`}
                    aria-current={i === active ? 'step' : undefined}
                    className="group flex min-h-[44px] min-w-[28px] cursor-pointer flex-col items-center gap-1 pt-1"
                  >
                    <span
                      className={`block h-2 w-2 rounded-full transition-all duration-300 ${
                        i === active ? 'scale-150 bg-accent' : i < active ? 'bg-accent/60' : 'bg-ink/20 group-hover:bg-accent/50'
                      }`}
                    />
                    <span
                      className={`font-condensed text-[0.7rem] font-semibold leading-none transition-colors ${
                        i === active ? 'text-accent' : 'text-ink/40'
                      } ${n > 5 ? 'hidden sm:block' : ''}`}
                    >
                      {hh.anio.split('–')[0]}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* ---------------- Hitos que fluyen con el scroll ---------------- */}
        <ol ref={listRef} className="relative mt-6 space-y-6 pb-[20vh] lg:col-span-6 lg:mt-0 lg:space-y-10 lg:py-[22vh] xl:col-start-7">
          {hitos.map((h, i) => {
            const on = i === active
            return (
              <li
                key={`${h.anio}-${i}`}
                ref={(el) => {
                  cardRefs.current[i] = el
                }}
                data-i={i}
              >
                <article
                  className={`rounded-2xl border bg-white p-6 transition-all duration-500 md:p-8 ${
                    on ? 'border-accent/25 opacity-100 shadow-lift' : 'border-ink/8 opacity-45 shadow-soft'
                  } ${reduce ? '' : on ? 'lg:translate-x-0' : 'lg:translate-x-3'}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="eyebrow tabular-nums text-accent">
                      {String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
                    </span>
                    <span aria-hidden className="h-px w-8 bg-accent/40" />
                    {h.lugar && <span className="eyebrow text-mute">{h.lugar}</span>}
                  </div>
                  <p className="font-display mt-3 text-5xl leading-none text-accent sm:text-6xl">{h.anio}</p>
                  <h3 className="mt-4 text-xl font-semibold leading-snug text-ink md:text-2xl">{h.titulo}</h3>
                  <p className="mt-3 text-base leading-relaxed text-ink/75 md:text-lg">{h.texto}</p>
                </article>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
