import { AnimatePresence, motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { NAV, SITE, SOCIAL } from '../../data/site'
import { ButtonLink } from '../ui/Button'

type Props = { open: boolean; onClose: () => void }

/** Menú móvil full-screen en negro editorial, con accent como acento. */
export function MobileMenu({ open, onClose }: Props) {
  const { pathname } = useLocation()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex flex-col overflow-y-auto bg-accent-deep text-white lg:hidden"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Cerrar (X): botón visible + accesible. Antes no había forma de
              cerrar salvo navegar — bug de accesibilidad. */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar menú"
            className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-sand hover:text-sand"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>

          <nav className="relative flex flex-col gap-0.5 px-6 pb-8 pt-20">
            {NAV.map((item, i) => {
              const active = pathname === item.to
              return (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={item.to}
                    onClick={onClose}
                    className="font-display flex items-baseline gap-4 py-1.5 text-4xl sm:text-5xl"
                  >
                    <span className="eyebrow w-8 shrink-0 text-gold">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className={active ? 'text-sand' : 'text-white'}>{item.label}</span>
                  </Link>
                </motion.div>
              )
            })}
          </nav>

          <div className="relative mt-auto flex shrink-0 flex-col gap-5 border-t border-white/15 px-6 py-7">
            <ButtonLink to="/contacto" tone="bone" variant="solid" full onClick={onClose}>
              Súmate
            </ButtonLink>
            <div className="flex items-center justify-between text-sm text-white/60">
              <a href={SOCIAL.instagram.url} target="_blank" rel="noreferrer" className="hover:text-accent">
                {SOCIAL.instagram.handle}
              </a>
              <span>
                {SITE.ciudad}, {SITE.estado}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
