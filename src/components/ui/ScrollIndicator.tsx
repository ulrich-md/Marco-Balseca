import { motion, useReducedMotion } from 'framer-motion'

/** Indicador de scroll discreto para el hero. */
export function ScrollIndicator({ tone = 'bone' }: { tone?: 'bone' | 'guinda' }) {
  const reduce = useReducedMotion()
  const color = tone === 'bone' ? 'text-bone/70' : 'text-guinda/70'

  return (
    <div className={`flex items-center gap-3 ${color}`}>
      <span className="eyebrow">Scroll</span>
      <div className="relative h-10 w-px overflow-hidden bg-current/30">
        <motion.span
          className="absolute inset-x-0 top-0 h-4 bg-current"
          animate={reduce ? undefined : { y: [-16, 40] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </div>
  )
}
