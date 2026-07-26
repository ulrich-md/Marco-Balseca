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
const LAUNCH = Date.UTC(2026, 6, 20) // 20 jul 2026 → hoy arranca en ~15,000
const BASE = 15000 // punto de partida creíble (~15 mil)
const SEED_STEP_MS = 120000 // crecimiento persistente suave (+1 cada ~2 min → ~720/día) para que suba sin dispararse

/** Valor "actual" anclado al tiempo (consistente entre recargas). */
function seedNow() {
  return BASE + Math.max(0, Math.floor((Date.now() - LAUNCH) / SEED_STEP_MS))
}

type Props = {
  label?: string
  tone?: 'ink' | 'bone'
  size?: 'lg' | 'sm'
  /** 'stack' (eyebrow → número → label), 'inline' (● número / label) o
   *  'pill' (● número + label en una sola línea compacta, para badge). */
  layout?: 'stack' | 'inline' | 'pill'
}

export function LiveCounter({
  label = 'personas ya conocen a Marco',
  tone = 'ink',
  size = 'lg',
  layout = 'stack',
}: Props) {
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

  const dotColor = tone === 'bone' ? 'bg-sand' : 'bg-accent'
  const Dot = () => (
    <span aria-hidden className="relative flex h-2 w-2 shrink-0">
      <span className={`animate-live-pulse absolute inline-flex h-full w-full rounded-full ${dotColor}`} />
      <span className={`relative inline-flex h-2 w-2 rounded-full ${dotColor}`} />
    </span>
  )

  // Pastilla compacta de una línea: ● 19,278 ya lo conocen — para un badge
  // pequeño integrado (p. ej. anclado al teléfono).
  if (layout === 'pill') {
    return (
      <div ref={ref} className="flex items-center gap-1.5 whitespace-nowrap">
        <Dot />
        <span className={`font-display text-[0.95rem] leading-none ${numCls}`}>
          <RollingNumber value={count} />
        </span>
        <span className={`text-[0.7rem] font-medium ${tone === 'bone' ? 'text-white/75' : 'text-ink/60'}`}>
          {label}
        </span>
      </div>
    )
  }

  // Bloque compacto de 2 líneas (● número / label) para prueba social junto al
  // CTA (punto de decisión). No depende de wrap → nunca se encima en móvil.
  if (layout === 'inline') {
    return (
      <div ref={ref} className="leading-tight">
        <span className="flex items-center gap-1.5">
          <Dot />
          <span className={`font-display text-2xl leading-none ${numCls}`}>
            <RollingNumber value={count} />
          </span>
        </span>
        <span className={`mt-0.5 block text-sm leading-tight ${tone === 'bone' ? 'text-white/70' : 'text-ink/70'}`}>
          {label}
        </span>
      </div>
    )
  }

  const sm = size === 'sm'
  const numSize = sm ? 'text-2xl md:text-[1.75rem]' : 'text-4xl md:text-5xl'
  const labelSize = sm ? 'text-[0.72rem] leading-tight' : 'text-sm leading-snug'

  return (
    <div ref={ref}>
      <div className="flex items-center gap-1.5">
        <Dot />
        <span className="eyebrow text-accent">En vivo</span>
      </div>
      <div className={`font-display ${sm ? 'mt-0.5' : 'mt-1'} ${numSize} leading-none ${numCls}`}>
        <RollingNumber value={count} />
      </div>
      <div className={`${sm ? 'mt-0.5 max-w-[15ch]' : 'mt-1.5'} ${labelSize} ${labelCls}`}>{label}</div>
    </div>
  )
}
