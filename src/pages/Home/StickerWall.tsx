import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { SOCIAL } from '../../data/site'

/* =========================================================================
   MURO DE STICKERS — "el locker" (ref. hoja de stickers de afición).
   Continúa la cinta guinda: puerta de locker con luz diagonal, papel, grano
   y rejillas. Los stickers entran "pegándose", se enderezan al pasar el mouse
   y en escritorio (puntero fino) se pueden arrastrar. "Súmate" lleva a
   Contacto y "#PuroTehuacán" a Instagram.
   ========================================================================= */

type Sticker = {
  src: string
  alt: string
  rotate: number
  /** clases de rejilla/tamaño */
  cls: string
  to?: string
  href?: string
}

/* Composición tipo hoja de stickers (ref.): filas 3 · 4 · 3 sobre una rejilla
   de 12 columnas en escritorio; el dedo "Súmate" al centro arriba. En móvil,
   2 columnas con los stickers más chicos. */
const S = (w: string) => `max-w-[150px] sm:max-w-[200px] ${w}`

const STICKERS: Sticker[] = [
  // Fila 1 (3)
  { src: '/assets/stickers/por-nuestra-tierra.webp', alt: 'Sticker: Por nuestra tierra', rotate: -6, cls: S('lg:col-span-4 lg:max-w-[250px] lg:translate-y-10') },
  { src: '/assets/stickers/sumate.webp', alt: 'Sticker: Súmate', rotate: 4, to: '/contacto', cls: S('lg:col-span-4 lg:max-w-[190px]') },
  { src: '/assets/stickers/tehuacan-puebla.webp', alt: 'Sticker: Tehuacán, Puebla', rotate: 7, cls: S('lg:col-span-4 lg:max-w-[210px] lg:translate-y-8') },
  // Fila 2 (4)
  { src: '/assets/stickers/anos-30.webp', alt: 'Sticker: 30 años', rotate: -4, cls: S('lg:col-span-3 lg:max-w-[200px]') },
  { src: '/assets/stickers/megafono.webp', alt: 'Sticker: Cerca de la gente', rotate: -9, cls: S('lg:col-span-3 lg:max-w-[240px] lg:translate-y-6') },
  { src: '/assets/stickers/jersey-balseca.webp', alt: 'Sticker: jersey Balseca', rotate: 5, cls: S('lg:col-span-3 lg:max-w-[200px] lg:-translate-y-2') },
  { src: '/assets/stickers/juntas-12.webp', alt: 'Sticker: 12 juntas auxiliares', rotate: -3, cls: S('lg:col-span-3 lg:max-w-[200px] lg:translate-y-4') },
  // Fila 3 (3)
  { src: '/assets/stickers/puro-tehuacan.webp', alt: 'Sticker: #PuroTehuacán', rotate: -5, href: SOCIAL.instagram.url, cls: S('lg:col-span-4 lg:max-w-[240px]') },
  { src: '/assets/stickers/microrregion-25.webp', alt: 'Sticker: Microrregión 25', rotate: 6, cls: S('lg:col-span-4 lg:max-w-[200px] lg:translate-y-6') },
  { src: '/assets/stickers/cactus-territorio.webp', alt: 'Sticker: Tehuacán en territorio', rotate: -2, cls: S('lg:col-span-4 lg:max-w-[210px]') },
]

const SHADOW = 'drop-shadow(0 18px 18px rgba(0,0,0,0.38)) drop-shadow(0 3px 3px rgba(0,0,0,0.3))'

function useFinePointer() {
  const [fine, setFine] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const on = () => setFine(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return fine
}

function StickerItem({
  s,
  i,
  bounds,
  draggable,
}: {
  s: Sticker
  i: number
  bounds: React.RefObject<HTMLDivElement>
  draggable: boolean
}) {
  const reduce = useReducedMotion()
  const dragged = useRef(false)

  const img = (
    <img
      src={s.src}
      alt={s.alt}
      loading="lazy"
      decoding="async"
      draggable={false}
      className="pointer-events-none block h-auto w-full select-none"
      style={{ filter: SHADOW }}
    />
  )

  // Evita que un arrastre dispare el enlace
  const guard = (e: React.MouseEvent) => {
    if (dragged.current) {
      e.preventDefault()
      dragged.current = false
    }
  }

  const content = s.to ? (
    <Link to={s.to} onClick={guard} aria-label={s.alt} className="block">
      {img}
    </Link>
  ) : s.href ? (
    <a href={s.href} target="_blank" rel="noreferrer" onClick={guard} aria-label={s.alt} className="block">
      {img}
    </a>
  ) : (
    img
  )

  return (
    <motion.div
      className={`relative mx-auto w-full ${draggable ? 'cursor-grab active:cursor-grabbing' : ''} ${
        s.to || s.href ? 'cursor-pointer' : ''
      } ${s.cls}`}
      initial={reduce ? { rotate: s.rotate } : { opacity: 0, scale: 1.35, rotate: s.rotate - 14 }}
      whileInView={{ opacity: 1, scale: 1, rotate: s.rotate }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 16, delay: i * 0.09 }}
      whileHover={reduce ? undefined : { rotate: 0, scale: 1.06, y: -6, zIndex: 20 }}
      drag={draggable && !reduce}
      dragConstraints={bounds}
      dragElastic={0.18}
      whileDrag={{ scale: 1.12, rotate: 0, zIndex: 40 }}
      onDragStart={() => {
        dragged.current = true
      }}
    >
      {content}
    </motion.div>
  )
}

export function StickerWall() {
  const bounds = useRef<HTMLDivElement>(null)
  const fine = useFinePointer()

  return (
    <section aria-label="Stickers" className="relative overflow-hidden bg-accent text-white">
      {/* ---------- Puerta del locker ---------- */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-accent via-accent to-accent-deep" />
        {/* luz diagonal (ventana) que cruza el locker */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(118deg, transparent 18%, rgba(255,255,255,0.09) 30%, rgba(255,255,255,0.13) 40%, transparent 52%, transparent 64%, rgba(0,0,0,0.22) 78%, transparent 92%)',
          }}
        />
        {/* papel y grano (textura impresa) */}
        <img
          src="/assets/generated/poster-papel.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-multiply"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: 'url(/assets/backgrounds/grain.png)', backgroundSize: '420px' }}
        />
        {/* bordes de la puerta y rejillas de ventilación */}
        <div className="absolute inset-y-0 left-[4%] w-px bg-black/25 shadow-[1px_0_0_rgba(255,255,255,0.08)]" />
        <div className="absolute inset-y-0 right-[4%] w-px bg-black/25 shadow-[1px_0_0_rgba(255,255,255,0.08)]" />
        {['top-6', 'top-12', 'bottom-12', 'bottom-6'].map((pos) => (
          <span
            key={pos}
            className={`absolute left-1/2 h-2.5 w-[36%] -translate-x-1/2 rounded-full bg-black/30 shadow-[inset_0_2px_3px_rgba(0,0,0,0.5),0_1px_0_rgba(255,255,255,0.1)] ${pos}`}
          />
        ))}
      </div>

      <div ref={bounds} className="container-x relative z-10 py-24 md:py-28">
        <div className="mx-auto grid max-w-6xl grid-cols-2 items-center gap-x-5 gap-y-8 sm:grid-cols-3 sm:gap-x-8 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-4">
          {STICKERS.map((s, i) => (
            <StickerItem key={s.src} s={s} i={i} bounds={bounds} draggable={fine} />
          ))}
        </div>
      </div>
    </section>
  )
}
