import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { RollingNumber } from './RollingNumber'

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

type Props = { label?: string; tone?: 'ink' | 'bone' }

export function LiveCounter({ label = 'personas ya conocen a Marco', tone = 'ink' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduce = useReducedMotion()
  // Arranca en el valor real; los dígitos "ruedan" al montar (entrada) y en
  // cada chunk en vivo, dando la sensación seamless de odómetro.
  const [count, setCount] = useState(() => seedNow())

  // Incremento "en vivo" por CHUNKS de personas (varía: a veces +2, +4, +9…),
  // a intervalos también variables. Se siente orgánico, como gente sumándose
  // en grupos. Sesgado a grupos chicos para que sea creíble.
  useEffect(() => {
    if (!inView || reduce) return
    let timer: number
    const nextChunk = () => 1 + Math.floor(Math.pow(Math.random(), 1.7) * 10) // 1–10, sesgo a chicos
    const bump = () => {
      setCount((c) => c + nextChunk())
      timer = window.setTimeout(bump, 1600 + Math.random() * 3200) // cada 1.6–4.8 s
    }
    timer = window.setTimeout(bump, 1600)
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
      <div className={`font-display mt-1 text-4xl leading-none md:text-5xl ${numCls}`}>
        <RollingNumber value={count} />
      </div>
      <div className={`mt-1.5 text-sm leading-snug ${labelCls}`}>{label}</div>
    </div>
  )
}
