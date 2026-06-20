import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'

export type VideoPhoto = { src: string; alt: string }

type Props = {
  /** Fotos reales para el montaje (fallback si no hay MP4). */
  photos: VideoPhoto[]
  caption?: string
  /** Si subes un MP4/WebM real, se usa automáticamente; si falla, cae al montaje. */
  videoSrc?: { mp4?: string; webm?: string }
  poster?: string
  className?: string
  interval?: number
}

function pic(src: string) {
  const base = src.replace(/\.(jpg|jpeg|png)$/i, '')
  return { webp: `${base}.webp`, sm: `${base}-sm.webp` }
}

const EXPO = [0.16, 1, 0.3, 1] as const

/**
 * "Video" del hero que se reproduce al cargar la página. Si hay un MP4 real
 * lo usa; si no, hace un montaje en bucle de fotos reales (crossfade + Ken
 * Burns) con cromo de reproductor. Muted/loop/inline; respeta reduced-motion.
 */
export function HeroVideo({ photos, caption, videoSrc, poster, className = '', interval = 2400 }: Props) {
  const reduce = useReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const inView = useInView(rootRef, { margin: '0px 0px -10% 0px' })
  const [i, setI] = useState(0)
  const [videoFailed, setVideoFailed] = useState(false)
  const useVideo = !!videoSrc && !videoFailed

  // Montaje: solo avanza cuando está en pantalla (ahorra trabajo fuera de vista).
  useEffect(() => {
    if (useVideo || reduce || !inView || photos.length < 2) return
    const id = window.setInterval(() => setI((p) => (p + 1) % photos.length), interval)
    return () => window.clearInterval(id)
  }, [useVideo, reduce, inView, photos.length, interval])

  // Video real: pausa fuera de pantalla (guía UX: no malgastar datos/energía).
  useEffect(() => {
    const v = videoRef.current
    if (!useVideo || !v) return
    if (inView) v.play().catch(() => {})
    else v.pause()
  }, [useVideo, inView])

  const photo = photos[i]
  const s = pic(photo.src)

  return (
    <div ref={rootRef} className={`group relative overflow-hidden rounded-sm bg-black ${className}`}>
      {useVideo ? (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          onError={() => setVideoFailed(true)}
        >
          {videoSrc?.webm && <source src={videoSrc.webm} type="video/webm" />}
          {videoSrc?.mp4 && <source src={videoSrc.mp4} type="video/mp4" />}
        </video>
      ) : (
        <AnimatePresence initial={false}>
          <motion.div
            key={i}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: EXPO }}
          >
            <motion.div
              className="h-full w-full"
              initial={reduce ? false : { scale: 1.14 }}
              animate={reduce ? {} : { scale: 1.0 }}
              transition={{ duration: interval / 1000 + 0.8, ease: 'easeOut' }}
            >
              <picture>
                <source
                  type="image/webp"
                  srcSet={`${s.sm} 760w, ${s.webp} 1200w`}
                  sizes="(min-width: 1024px) 32vw, 92vw"
                />
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </picture>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Cromo de reproductor */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/75 to-transparent" />
      <span aria-hidden className="pointer-events-none absolute inset-2.5 border border-white/10" />

      <div className="absolute left-3 top-3 flex items-center gap-2">
        <span aria-hidden className="relative flex h-2 w-2">
          <span className="animate-live-pulse absolute inline-flex h-full w-full rounded-full bg-accent" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        </span>
        <span className="eyebrow text-white/85">Reproduciendo</span>
      </div>

      {caption && (
        <div className="absolute inset-x-3 bottom-3">
          <p className="font-condensed text-lg font-semibold leading-tight text-white">{caption}</p>
          {!reduce && !useVideo && (
            <div className="mt-2 h-[3px] overflow-hidden rounded-full bg-white/25">
              <motion.div
                key={i}
                className="h-full bg-accent"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: interval / 1000, ease: 'linear' }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
