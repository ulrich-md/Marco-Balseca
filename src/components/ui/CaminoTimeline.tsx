import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import type { Hito } from '../../data/trayectoria'

/* =========================================================================
   "EL CAMINO, PASO A PASO" — línea de tiempo como un camino que se dibuja.
   - Un camino guinda serpentea entre los hitos y se va trazando con el
     scroll (revelado por máscara: coincide 1:1 con la altura recorrida).
   - Un marcador (guinda con anillo dorado) camina por la punta del trazo.
   - Cada parada se "enciende" cuando el camino llega a ella.
   - Al fondo, el AÑO del hito activo en gigante (outline), fijo mientras
     se recorre: 1995 → … → 2026.
   El trazado se calcula midiendo los nodos reales (robusto a cualquier largo
   de texto y ancho de pantalla). Respeta reduce-motion.
   ========================================================================= */

type Pt = { x: number; y: number }

function buildPath(pts: Pt[], h: number) {
  if (pts.length === 0) return ''
  const first = pts[0]
  let d = `M ${first.x} 0 L ${first.x} ${first.y}`
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1]
    const b = pts[i]
    const dy = (b.y - a.y) / 2
    d += ` C ${a.x} ${a.y + dy}, ${b.x} ${b.y - dy}, ${b.x} ${b.y}`
  }
  const last = pts[pts.length - 1]
  d += ` L ${last.x} ${h}`
  return d
}

export function CaminoTimeline({ hitos }: { hitos: Hito[] }) {
  const reduce = useReducedMotion()
  const wrapRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<(HTMLSpanElement | null)[]>([])
  const pathRef = useRef<SVGPathElement>(null)
  const samples = useRef<Pt[]>([])

  const [size, setSize] = useState({ w: 0, h: 0 })
  const [d, setD] = useState('')
  const [fracs, setFracs] = useState<number[]>([])
  const [active, setActive] = useState(0)
  const [walker, setWalker] = useState<Pt>({ x: 0, y: 0 })

  // ---- Medición de nodos → trazado ----
  const measure = useCallback(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const r = wrap.getBoundingClientRect()
    const pts = nodeRefs.current.map((n) => {
      if (!n) return { x: 0, y: 0 }
      const b = n.getBoundingClientRect()
      return { x: b.left + b.width / 2 - r.left, y: b.top + b.height / 2 - r.top }
    })
    setSize({ w: r.width, h: r.height })
    setD(buildPath(pts, r.height))
    setFracs(pts.map((p) => (r.height ? p.y / r.height : 0)))
  }, [])

  useLayoutEffect(() => {
    measure()
    const ro = new ResizeObserver(() => measure())
    if (wrapRef.current) ro.observe(wrapRef.current)
    return () => ro.disconnect()
  }, [measure, hitos.length])

  // Muestras del trazado (para ubicar al marcador según la altura)
  useEffect(() => {
    const p = pathRef.current
    if (!p || !d) return
    const len = p.getTotalLength()
    const out: Pt[] = []
    for (let i = 0; i <= 240; i++) {
      const q = p.getPointAtLength((len * i) / 240)
      out.push({ x: q.x, y: q.y })
    }
    samples.current = out
  }, [d])

  // ---- Progreso de scroll ----
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start 62%', 'end 62%'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 })
  const prog = reduce ? scrollYProgress : smooth
  const revealH = useTransform(prog, (v) => Math.max(0, Math.min(1, v)) * size.h)

  useMotionValueEvent(prog, 'change', (v) => {
    const y = Math.max(0, Math.min(1, v)) * size.h
    // hito activo = último nodo alcanzado
    let a = 0
    fracs.forEach((f, i) => {
      if (v >= f - 0.002) a = i
    })
    setActive(a)
    // marcador: punto del trazado a esa altura
    const s = samples.current
    if (s.length) {
      let best = s[0]
      for (const p of s) if (Math.abs(p.y - y) < Math.abs(best.y - y)) best = p
      setWalker(best)
    }
  })

  const maskId = 'camino-mask'
  const current = hitos[active]

  return (
    <div className="relative">
      {/* Año gigante de fondo (fijo mientras se recorre) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
        <div className="sticky top-[18vh] flex justify-center overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={current?.anio}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -60 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-outline block whitespace-nowrap text-[17vw] leading-none text-gold/25"
            >
              {current?.anio}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      <div ref={wrapRef} className="relative">
        {/* ---- Camino (SVG medido) ---- */}
        {size.w > 0 && (
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 overflow-visible"
            width={size.w}
            height={size.h}
            viewBox={`0 0 ${size.w} ${size.h}`}
          >
            <defs>
              <mask id={maskId} maskUnits="userSpaceOnUse">
                <motion.rect x={-40} y={0} width={size.w + 80} height={revealH} fill="#fff" />
              </mask>
            </defs>
            {/* huella punteada del camino completo (lo que falta por recorrer) */}
            <path d={d} fill="none" stroke="var(--color-ink)" strokeOpacity={0.14} strokeWidth={2} strokeDasharray="2 9" strokeLinecap="round" />
            {/* camino recorrido: guinda con filete dorado */}
            <g mask={`url(#${maskId})`}>
              <path d={d} fill="none" stroke="var(--color-sand)" strokeWidth={12} strokeLinecap="round" strokeOpacity={0.55} />
              <path ref={pathRef} d={d} fill="none" stroke="var(--color-accent)" strokeWidth={6} strokeLinecap="round" />
            </g>
            {/* marcador que camina por la punta */}
            {walker.y > 2 && (
              <g transform={`translate(${walker.x} ${walker.y})`}>
                {!reduce && (
                  <circle r={16} fill="var(--color-accent)" opacity={0.18}>
                    <animate attributeName="r" values="10;20;10" dur="1.8s" repeatCount="indefinite" />
                  </circle>
                )}
                <circle r={9} fill="var(--color-accent)" stroke="var(--color-sand)" strokeWidth={3} />
              </g>
            )}
          </svg>
        )}

        {/* ---- Paradas ---- */}
        <ol className="relative z-10 space-y-10 lg:space-y-4">
          {hitos.map((h, i) => {
            const left = i % 2 === 0
            const reached = i <= active
            return (
              <li
                key={`${h.anio}-${i}`}
                className="grid grid-cols-[44px_1fr] items-center gap-x-4 lg:grid-cols-[1fr_260px_1fr] lg:gap-x-0"
              >
                {/* Nodo (zigzag: se desplaza a un lado del carril central) */}
                <div
                  className={`flex justify-center lg:col-start-2 lg:row-start-1 ${
                    left ? 'lg:justify-start lg:pl-4' : 'lg:justify-end lg:pr-4'
                  }`}
                >
                  <span
                    ref={(el) => {
                      nodeRefs.current[i] = el
                    }}
                    className={`relative grid h-11 w-11 place-items-center rounded-full border-2 transition-all duration-500 ${
                      reached
                        ? 'scale-100 border-accent bg-accent text-sand shadow-[0_0_0_6px_rgba(230,209,148,0.45)]'
                        : 'scale-90 border-ink/15 bg-white text-ink/30'
                    }`}
                  >
                    <span className="font-display text-sm leading-none">{String(i + 1).padStart(2, '0')}</span>
                  </span>
                </div>

                {/* Tarjeta */}
                <article
                  className={`lg:row-start-1 lg:py-10 ${left ? 'lg:col-start-1 lg:pr-4' : 'lg:col-start-3 lg:pl-4'}`}
                >
                  <div
                    className={`rounded-2xl border bg-white p-6 transition-all duration-500 md:p-8 ${
                      reached
                        ? 'border-accent/25 opacity-100 shadow-lift'
                        : 'border-ink/8 opacity-55 shadow-soft lg:translate-y-3'
                    } ${left ? 'lg:text-right' : ''}`}
                  >
                    <p className="font-condensed text-2xl font-semibold uppercase tracking-wide text-accent">
                      {h.anio}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold leading-snug text-ink">{h.titulo}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink/70">{h.texto}</p>
                    {h.lugar && <p className="eyebrow mt-5 text-mute">{h.lugar}</p>}
                  </div>
                </article>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
