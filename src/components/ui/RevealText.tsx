import { motion, useReducedMotion } from 'framer-motion'
import { EASE_OUT } from '../../lib/motion'

type Tag = 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div'

type Props = {
  text: string
  as?: Tag
  className?: string
  /** clase aplicada a cada palabra (para el lema outline, etc.) */
  wordClassName?: string
  stagger?: number
  delay?: number
  once?: boolean
  /** dispara al montar (hero) en lugar de al entrar en viewport */
  onMount?: boolean
}

/**
 * Revelado split-text por palabra con máscara (overflow hidden) + translateY.
 * Respeta prefers-reduced-motion (muestra el texto sin animar).
 * Mantiene saltos de línea con '\n'.
 */
export function RevealText({
  text,
  as = 'span',
  className = '',
  wordClassName = '',
  stagger = 0.06,
  delay = 0,
  once = true,
  onMount = false,
}: Props) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as]

  const lines = text.split('\n')

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  }
  const word = {
    hidden: { y: '115%' },
    show: { y: '0%', transition: { duration: 0.7, ease: EASE_OUT } },
  }

  if (reduce) {
    // Sin animación, pero conservamos el estilo por palabra (p.ej. el outline del lema).
    return (
      <MotionTag className={className}>
        {wordClassName ? <span className={wordClassName}>{text}</span> : text}
      </MotionTag>
    )
  }

  const animationProps = onMount
    ? { initial: 'hidden' as const, animate: 'show' as const }
    : {
        initial: 'hidden' as const,
        whileInView: 'show' as const,
        viewport: { once, margin: '0px 0px -10% 0px' },
      }

  return (
    <MotionTag className={className} variants={container} {...animationProps}>
      {lines.map((line, li) => {
        const words = line.split(' ')
        return (
          <span key={li} className="block">
            {words.map((w, wi) => (
              <span key={wi}>
                <span className="reveal-mask">
                  <motion.span variants={word} className={`inline-block ${wordClassName}`}>
                    {w}
                  </motion.span>
                </span>
                {wi < words.length - 1 ? ' ' : ''}
              </span>
            ))}
          </span>
        )
      })}
    </MotionTag>
  )
}
