import { AnimatePresence, motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { NAV, SITE, SOCIAL } from '../../data/site'
import { ButtonLink } from '../ui/Button'

type Props = { open: boolean; onClose: () => void }

/** Menú móvil full-screen en negro editorial, con guinda como acento. */
export function MobileMenu({ open, onClose }: Props) {
  const { pathname } = useLocation()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex flex-col bg-black text-white lg:hidden"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <nav className="relative flex flex-1 flex-col justify-center gap-1 px-6 pt-24">
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
                    className="font-display flex items-baseline gap-4 py-2 text-5xl sm:text-6xl"
                  >
                    <span className="eyebrow w-8 shrink-0 text-guinda">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className={active ? 'text-guinda' : 'text-white'}>{item.label}</span>
                  </Link>
                </motion.div>
              )
            })}
          </nav>

          <div className="relative flex flex-col gap-5 border-t border-white/15 px-6 py-7">
            <ButtonLink to="/contacto" tone="bone" variant="solid" full onClick={onClose}>
              Súmate
            </ButtonLink>
            <div className="flex items-center justify-between text-sm text-white/60">
              <a href={SOCIAL.instagram.url} target="_blank" rel="noreferrer" className="hover:text-guinda">
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
