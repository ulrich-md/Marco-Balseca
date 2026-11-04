import { useRef, type ReactNode } from 'react'
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
  useReducedMotion,
  useInView,
} from 'framer-motion'
import { GrecaBand } from './Greca'

/* =========================================================================
   MOMENTO FIRMA — "La cinta".
   Cinta cinética con el lema en Anton que reacciona a la VELOCIDAD del scroll:
   se acelera, cambia de dirección y se inclina (skew) según cómo scrolleas.
   Dos filas cruzadas + grecas escalonadas como separador. Solo transform
   (compositor) = fluido; se pausa fuera de pantalla; respeta reduced-motion.
   ========================================================================= */

type Props = {
  tone?: 'dark' | 'light'
  /** velocidad base (px/s aprox). Positivo = derecha, negativo = izquierda. */
  speed?: number
}

const wrap = (min: number, max: number, v: number) => {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

function Greca({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden
      className={`mx-6 h-[0.62em] w-[0.62em] shrink-0 md:mx-10 ${className}`}
    >
      <path
        d="M12 88 L12 38 L50 38 L50 66 L30 66 L30 52 L40 52 L40 58"
        stroke="currentColor"
        strokeWidth={8}
        strokeLinecap="square"
      />
    </svg>
  )
}

function Row({ baseVelocity, children }: { baseVelocity: number; children: ReactNode }) {
  const reduce = useReducedMotion()
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false })
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`)
  // El texto se cizalla ligeramente según la velocidad del scroll.
  const skew = useTransform(smoothVelocity, [-2500, 2500], [-7, 7], { clamp: true })

  const directionFactor = useRef(1)
  const rowRef = useRef<HTMLDivElement>(null)
  const inView = useInView(rowRef, { margin: '250px' })

  useAnimationFrame((_t, delta) => {
    if (reduce || !inView) return
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000)
    if (velocityFactor.get() < 0) directionFactor.current = -1
    else if (velocityFactor.get() > 0) directionFactor.current = 1
    moveBy += directionFactor.current * moveBy * velocityFactor.get()
    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div ref={rowRef} className="overflow-hidden">
      <motion.div className="flex w-max flex-nowrap" style={{ x, skewX: reduce ? 0 : skew }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex shrink-0 items-center">
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

const solid = 'font-display leading-[0.9] text-[11vw] md:text-[6.5vw]'
const outline =
  'font-display leading-[0.9] text-[11vw] md:text-[6.5vw] text-transparent [-webkit-text-stroke:1.5px_rgba(230,209,148,0.75)]'

export function Marquee({ tone = 'dark', speed = 3 }: Props) {
  const bg =
    tone === 'dark' ? 'bg-accent text-white' : 'bg-white text-ink border-y border-ink/10'
  const second = tone === 'dark' ? 'text-sand' : 'text-accent'
  const mark = tone === 'dark' ? 'text-sand' : 'text-accent'

  return (
    <section className={`relative w-full overflow-hidden py-6 md:py-9 ${bg}`} aria-hidden>
      {tone === 'dark' && (
        <>
          <GrecaBand className="absolute inset-x-0 top-1.5 text-sand/25" height={10} />
          <GrecaBand className="absolute inset-x-0 bottom-1.5 text-sand/25" height={10} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />
        </>
      )}
      <Row baseVelocity={-speed}>
        <span className={`${solid} px-4`}>CERCA DE LA GENTE</span>
        <Greca className={mark} />
        <span className={`${solid} px-4 ${second}`}>POR NUESTRA TIERRA</span>
        <Greca className="text-white/70" />
      </Row>

      <div className="mt-1 md:mt-2">
        <Row baseVelocity={speed}>
          <span className={`${outline} px-4`}>MARCO BALSECA</span>
          <Greca className={mark} />
          <span className={`${outline} px-4`}>TEHUACÁN · PUEBLA</span>
          <Greca className={mark} />
          <span className={`${outline} px-4`}>SÚMATE</span>
          <Greca className={mark} />
        </Row>
      </div>
    </section>
  )
}
