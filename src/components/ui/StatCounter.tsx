import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

type Props = {
  value: number
  suffix?: string
  /** texto a mostrar cuando aún no hay dato real (value === 0) */
  placeholder?: string
  label: string
  tone?: 'guinda' | 'bone'
}

/**
 * Cifra clave con count-up al entrar en viewport.
 * Si value === 0 muestra el placeholder honesto ([N]) — no inventamos cifras.
 */
export function StatCounter({ value, suffix = '', placeholder = '[N]', label, tone = 'bone' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(0)

  const hasData = value > 0

  useEffect(() => {
    if (!inView || !hasData) return
    if (reduce) {
      setDisplay(value)
      return
    }
    const duration = 1400
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3) // easeOutCubic
      setDisplay(Math.round(value * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, hasData, value, reduce])

  const numClass = tone === 'bone' ? 'text-bone' : 'text-guinda'
  const labelClass = tone === 'bone' ? 'text-bone/65' : 'text-ink/60'
  const phClass = tone === 'bone' ? 'text-sand/80' : 'text-guinda/35'

  return (
    <div ref={ref}>
      <div className={`font-display text-5xl md:text-6xl tabular-nums leading-none ${numClass}`}>
        {hasData ? (
          <>
            {display}
            {suffix}
          </>
        ) : (
          <span className={phClass}>{placeholder}</span>
        )}
      </div>
      <div className={`mt-2 text-sm leading-snug ${labelClass}`}>{label}</div>
    </div>
  )
}
