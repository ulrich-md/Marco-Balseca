import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { EASE_OUT, inView } from '../../lib/motion'

type Props = {
  children: ReactNode
  className?: string
  /** retraso en segundos */
  delay?: number
  /** desplazamiento inicial en px */
  y?: number
  as?: 'div' | 'li' | 'section' | 'article' | 'span'
}

/** Reveal genérico al entrar en viewport: fade + translateY, una sola vez. */
export function Reveal({ children, className = '', delay = 0, y = 28, as = 'div' }: Props) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as]

  if (reduce) {
    return <MotionTag className={className}>{children}</MotionTag>
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inView}
      transition={{ duration: 0.65, ease: EASE_OUT, delay }}
    >
      {children}
    </MotionTag>
  )
}
