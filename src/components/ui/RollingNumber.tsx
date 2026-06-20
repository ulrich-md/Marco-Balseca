import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

/* =========================================================================
   Número con dígitos "rodantes" (odómetro): cuando un dígito cambia, sale
   hacia arriba y el nuevo entra desde abajo, con resorte. Da una sensación
   seamless y premium, mejor que ver el número saltar de golpe.
   ========================================================================= */

const fmt = new Intl.NumberFormat('es-MX')

function Digit({ char }: { char: string }) {
  const reduce = useReducedMotion()
  if (reduce) {
    return <span className="inline-block text-center tabular-nums">{char}</span>
  }
  return (
    <span
      className="relative inline-block overflow-hidden tabular-nums"
      style={{ width: '0.62em', height: '1em' }}
    >
      <AnimatePresence mode="popLayout">
        <motion.span
          key={char}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-110%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 30, mass: 0.7 }}
        >
          {char}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

/** Renderiza `value` con separadores de miles; los dígitos ruedan al cambiar. */
export function RollingNumber({ value, className = '' }: { value: number; className?: string }) {
  const str = fmt.format(Math.max(0, Math.round(value)))
  return (
    <span className={`inline-flex items-center ${className}`} aria-label={str}>
      {str.split('').map((ch, i) =>
        /\d/.test(ch) ? (
          <Digit key={`d-${i}`} char={ch} />
        ) : (
          <span key={`s-${i}`} className="inline-block">
            {ch}
          </span>
        ),
      )}
    </span>
  )
}
