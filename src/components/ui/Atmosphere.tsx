import { useMemo } from 'react'
import { useParallax } from '../../lib/useParallax'

/* =========================================================================
   ATMÓSFERA — capas de fondo vectoriales (SVG/CSS) con parallax sutil para
   dar PROFUNDIDAD y que cada sección se sienta distinta. Sin imágenes: pesa
   ~1KB, nítido a cualquier resolución, color/opacidad bajo control total.
   Tres variantes en la paleta de marca (B&N + rojo #e1251b):
     · ink   → mancha de tinta roja difusa (glow editorial)
     · topo  → curvas de nivel finas (mapa del valle, ref. microrregión 25)
     · grain → trama de medios tonos / grano risográfico (newsprint)
   El parallax se desactiva solo con prefers-reduced-motion (vía useParallax).
   ========================================================================= */

const ACCENT = '#e1251b'
const INK = '#161616'

let _uid = 0
const nextId = () => `atm${++_uid}`

/* --- Tinta roja difusa: elipse desplazada por ruido + blur (bordes plumeados) --- */
function InkBlob({ id, cx = 50, cy = 48, rx = 210, ry = 170 }: {
  id: string; cx?: number; cy?: number; rx?: number; ry?: number
}) {
  return (
    <svg className="h-full w-full" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <filter id={`${id}-f`} x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence type="fractalNoise" baseFrequency="0.011 0.015" numOctaves="2" seed="11" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="120" xChannelSelector="R" yChannelSelector="G" />
          <feGaussianBlur stdDeviation="16" />
        </filter>
        <radialGradient id={`${id}-g`} cx="50%" cy="48%" r="52%">
          <stop offset="0%" stopColor={ACCENT} stopOpacity="0.85" />
          <stop offset="55%" stopColor={ACCENT} stopOpacity="0.42" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx={(cx / 100) * 600} cy={(cy / 100) * 600} rx={rx} ry={ry}
        fill={`url(#${id}-g)`} filter={`url(#${id}-f)`} />
    </svg>
  )
}

/* --- Curvas de nivel: líneas suaves generadas con ondas senoidales --- */
function TopoLines({ count = 12 }: { count?: number }) {
  const paths = useMemo(() => {
    const W = 1000, H = 600, samples = 30
    const accentLine = Math.floor(count / 2)
    const out: { d: string; red: boolean }[] = []
    for (let i = 0; i < count; i++) {
      const baseY = -50 + ((H + 100) / (count - 1)) * i
      const amp = 16 + (i % 4) * 8
      const pts: string[] = []
      for (let s = 0; s <= samples; s++) {
        const x = -60 + ((W + 120) / samples) * s
        const y = baseY + Math.sin(x * 0.012 + i * 0.9) * amp + Math.sin(x * 0.021 + i * 1.7) * amp * 0.5
        pts.push(`${x.toFixed(0)} ${y.toFixed(1)}`)
      }
      out.push({ d: `M ${pts.join(' L ')}`, red: i === accentLine || i === count - 2 })
    }
    return out
  }, [count])

  return (
    <svg className="h-full w-full" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden>
      {paths.map((p, i) => (
        <path key={i} d={p.d} stroke={p.red ? ACCENT : INK} strokeWidth={p.red ? 1.4 : 1}
          strokeLinejoin="round" strokeLinecap="round" opacity={p.red ? 0.55 : 0.4}
          vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  )
}

/* --- Grano de medios tonos con offset rojo (riso/newsprint) --- */
function Grain() {
  return (
    <div className="absolute inset-0" style={{
      backgroundImage:
        `radial-gradient(${INK} 0.6px, transparent 0.7px), radial-gradient(${ACCENT} 0.6px, transparent 0.7px)`,
      backgroundSize: '7px 7px, 7px 7px',
      backgroundPosition: '0 0, 1px 1px',
      WebkitMaskImage: 'radial-gradient(125% 100% at 82% 0%, #000 0%, transparent 70%)',
      maskImage: 'radial-gradient(125% 100% at 82% 0%, #000 0%, transparent 70%)',
    }} />
  )
}

type Variant = 'ink' | 'topo' | 'grain'

const DEFAULTS: Record<Variant, { distance: number; opacity: number }> = {
  ink: { distance: 90, opacity: 0.16 },
  topo: { distance: 70, opacity: 0.6 },
  grain: { distance: 40, opacity: 0.5 },
}

export function Atmosphere({
  variant,
  className = '',
  distance,
  opacity,
  inkCx,
  inkCy,
}: {
  variant: Variant
  className?: string
  distance?: number
  opacity?: number
  inkCx?: number
  inkCy?: number
}) {
  const id = useMemo(nextId, [])
  const cfg = DEFAULTS[variant]
  const ref = useParallax<HTMLDivElement>(distance ?? cfg.distance)

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}>
      <div ref={ref} className="absolute inset-[-22%]" style={{ opacity: opacity ?? cfg.opacity }}>
        {variant === 'ink' && <InkBlob id={id} cx={inkCx} cy={inkCy} />}
        {variant === 'topo' && <TopoLines />}
        {variant === 'grain' && <Grain />}
      </div>
    </div>
  )
}
