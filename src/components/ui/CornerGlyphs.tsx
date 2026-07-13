import { motion, useReducedMotion } from 'framer-motion'

/* =========================================================================
   Grecas escalonadas (xicalcoliuhqui / step-fret) en las 4 esquinas del sitio.
   Herencia Mixteca-Puebla/Nahua de la región de Tehuacán. Line-art monocromo y
   muy sutil = marco editorial con identidad, sin caer en "souvenir".
   - Fijas al viewport, decorativas (aria-hidden, pointer-events-none).
   - Solo md+ (en móvil estorbarían y competirían con el header).
   - Entrada suave una vez por carga; respeta prefers-reduced-motion.
   ========================================================================= */

const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1]

// Espiral rectilínea escalonada (greca) que "abre" hacia el centro.
const GRECA = 'M12 88 L12 38 L50 38 L50 66 L30 66 L30 52 L40 52 L40 58'

function Greca({ pos, flip, delay }: { pos: string; flip: string; delay: number }) {
  const reduce = useReducedMotion()
  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed z-40 hidden md:block ${pos}`}
      style={{ transform: flip }}
    >
      <motion.svg
        viewBox="0 0 100 100"
        fill="none"
        className="h-14 w-14 text-ink/[0.12] lg:h-[4.5rem] lg:w-[4.5rem]"
        initial={reduce ? false : { opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={reduce ? { duration: 0 } : { duration: 0.9, delay, ease: EXPO }}
      >
        <path d={GRECA} stroke="currentColor" strokeWidth={3} strokeLinecap="square" strokeLinejoin="miter" />
      </motion.svg>
    </div>
  )
}

export function CornerGlyphs() {
  return (
    <div aria-hidden>
      <Greca pos="left-3 top-3 lg:left-6 lg:top-6" flip="none" delay={0.15} />
      <Greca pos="right-3 top-3 lg:right-6 lg:top-6" flip="scaleX(-1)" delay={0.27} />
      <Greca pos="bottom-3 left-3 lg:bottom-6 lg:left-6" flip="scaleY(-1)" delay={0.39} />
      <Greca pos="bottom-3 right-3 lg:bottom-6 lg:right-6" flip="scale(-1)" delay={0.51} />
    </div>
  )
}
