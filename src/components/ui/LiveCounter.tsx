import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

/* =========================================================================
   Contador "en vivo": personas que ya conocen a Marco.
   IMPORTANTE — honestidad: NO es una métrica rastreada en tiempo real. Es un
   ESTIMADOR DE ALCANCE anclado al tiempo: parte de una base y crece a un ritmo
   fijo desde una fecha de inicio, de modo que sea consistente entre recargas y
   suba mientras se mira. Afina BASE/STEP_MS o conéctalo a datos reales
   (Instagram/Meta) cuando los tengas.
   ========================================================================= */
const LAUNCH = Date.UTC(2026, 5, 20) // 20 jun 2026 (arranca ~15,000)
const BASE = 15000 // punto de partida creíble (~15 mil)
const SEED_STEP_MS = 60000 // crecimiento persistente lento (+1/min) → creíble día a día

/** Valor "actual" anclado al tiempo (consistente entre recargas). */
function seedNow() {
  return BASE + Math.max(0, Math.floor((Date.now() - LAUNCH) / SEED_STEP_MS))
}

const fmt = new Intl.NumberFormat('es-MX')

type Props = { label?: string; tone?: 'ink' | 'bone' }

export function LiveCounter({ label = 'personas ya conocen a Marco', tone = 'ink' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduce = useReducedMotion()
  const target = useRef(seedNow())
  const [count, setCount] = useState(() => Math.max(0, seedNow() - 160))

  // Count-up al entrar en viewport
  useEffect(() => {
    if (!inView) return
    target.current = seedNow()
    if (reduce) {
      setCount(target.current)
      return
    }
    const from = Math.max(0, target.current - 160)
    const dur = 1700
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.round(from + (target.current - from) * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduce])

  // Incremento "en vivo" mientras se mira: más rápido pero creíble
  // (~+1 cada 1.2–3.0 s, ritmo orgánico ligeramente aleatorio).
  useEffect(() => {
    if (!inView || reduce) return
    let timer: number
    const bump = () => {
      setCount((c) => c + 1)
      timer = window.setTimeout(bump, 1200 + Math.random() * 1800)
    }
    timer = window.setTimeout(bump, 1400)
    return () => window.clearTimeout(timer)
  }, [inView, reduce])

  const numCls = tone === 'bone' ? 'text-white' : 'text-ink'
  const labelCls = tone === 'bone' ? 'text-white/60' : 'text-ink/65'

  return (
    <div ref={ref}>
      <div className="flex items-center gap-2">
        <span aria-hidden className="relative flex h-2.5 w-2.5">
          <span className="animate-live-pulse absolute inline-flex h-full w-full rounded-full bg-accent" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
        </span>
        <span className="eyebrow text-accent">En vivo</span>
      </div>
      <div className={`font-display mt-1 text-4xl leading-none tabular-nums md:text-5xl ${numCls}`}>
        {fmt.format(count)}
      </div>
      <div className={`mt-1.5 text-sm leading-snug ${labelCls}`}>{label}</div>
    </div>
  )
}
