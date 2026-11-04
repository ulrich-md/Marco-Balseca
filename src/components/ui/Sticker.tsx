import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'

/* =========================================================================
   STICKER — calcomanía de afición pegada en la orilla de una sección.
   Mismo comportamiento en todo el sitio: entra "pegándose" (escala + giro con
   resorte), se endereza al pasar el mouse. Posición/tamaño por `className`
   (absolute + top/left/right + w-*). Opcional: enlace interno o externo.
   Reglas de uso: uno por sección, en orillas, nunca sobre texto.
   ========================================================================= */

type Props = {
  /** nombre del archivo en /assets/stickers (sin extensión) */
  name: string
  alt: string
  rotate?: number
  className?: string
  to?: string
  href?: string
  delay?: number
  /** en flujo (relative) en lugar de absolute */
  inline?: boolean
}

const SHADOW = 'drop-shadow(0 14px 14px rgba(0,0,0,0.28)) drop-shadow(0 2px 2px rgba(0,0,0,0.22))'

export function Sticker({ name, alt, rotate = -6, className = '', to, href, delay = 0, inline = false }: Props) {
  const reduce = useReducedMotion()
  const linked = Boolean(to || href)

  const img = (
    <img
      src={`/assets/stickers/${name}.webp`}
      alt={linked ? alt : ''}
      aria-hidden={linked ? undefined : true}
      loading="lazy"
      decoding="async"
      draggable={false}
      className="pointer-events-none block h-auto w-full select-none"
      style={{ filter: SHADOW }}
      onError={(e) => {
        e.currentTarget.style.display = 'none'
      }}
    />
  )

  const content = to ? (
    <Link to={to} aria-label={alt} className="block cursor-pointer">
      {img}
    </Link>
  ) : href ? (
    <a href={href} target="_blank" rel="noreferrer" aria-label={alt} className="block cursor-pointer">
      {img}
    </a>
  ) : (
    img
  )

  return (
    <motion.div
      className={`${inline ? 'relative' : 'absolute'} z-20 ${linked ? '' : 'pointer-events-none sm:pointer-events-auto'} ${className}`}
      initial={reduce ? { rotate } : { opacity: 0, scale: 1.4, rotate: rotate - 16 }}
      whileInView={{ opacity: 1, scale: 1, rotate }}
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
      transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 240, damping: 15, delay }}
      whileHover={reduce ? undefined : { rotate: 0, scale: 1.07, y: -4 }}
    >
      {content}
    </motion.div>
  )
}
