import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Reel } from '../../data/reels'
import { ButtonAnchor } from './Button'

type Props = {
  reel: Reel | null
  onClose: () => void
}

/** Lightbox/modal para reproducir reels (MP4 / YouTube) o enlazar a Instagram. */
export function Lightbox({ reel, onClose }: Props) {
  useEffect(() => {
    if (!reel) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [reel, onClose])

  return (
    <AnimatePresence>
      {reel && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Reel: ${reel.titulo}`}
        >
          <div className="absolute inset-0 bg-black/88 backdrop-blur-sm" />

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>

          <motion.div
            className="relative aspect-[9/16] w-full max-w-[min(92vw,420px)] overflow-hidden rounded-2xl bg-black shadow-2xl"
            initial={{ scale: 0.94, y: 16 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {reel.kind === 'mp4' && reel.src && (
              <video src={reel.src} controls autoPlay playsInline className="h-full w-full object-contain" />
            )}

            {reel.kind === 'youtube' && reel.youtubeId && (
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${reel.youtubeId}?autoplay=1`}
                title={reel.titulo}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}

            {/* Instagram: enlazamos al reel original (sin scripts de terceros). */}
            {reel.kind === 'instagram' && (
              <div className="flex h-full flex-col items-center justify-center gap-5 bg-black p-6 text-center">
                <span className="eyebrow text-accent">Reel de Instagram</span>
                <h3 className="font-display text-3xl text-white">{reel.titulo}</h3>
                <p className="max-w-[24ch] text-sm text-white/70">
                  Reproduce el reel original en el perfil oficial de Marco.
                </p>
                <ButtonAnchor href={reel.instagramUrl ?? '#'} tone="bone" variant="solid" arrow>
                  Ver en Instagram
                </ButtonAnchor>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
