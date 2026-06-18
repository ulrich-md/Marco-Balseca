import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { NAV } from '../../data/site'
import { Wordmark } from '../ui/Wordmark'
import { ButtonLink } from '../ui/Button'
import { MobileMenu } from './MobileMenu'

/**
 * Header fijo y claro. Todas las páginas abren con fondo claro (bone/blanco),
 * así que el header usa tinta guinda. Al hacer scroll, fondo blanco translúcido
 * + sombra suave. Menú móvil full-screen en guinda.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-guinda focus:px-4 focus:py-2 focus:text-bone"
      >
        Saltar al contenido
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[var(--ease-out-expo)] ${
          scrolled
            ? 'border-b border-ink/10 bg-white/85 py-3 shadow-[0_10px_30px_-18px_rgba(30,23,20,0.35)] backdrop-blur-md'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container-x flex items-center justify-between gap-6">
          <Wordmark tone="ink" />

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Principal">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `group relative font-condensed text-sm font-medium uppercase tracking-[0.14em] transition-colors ${
                    isActive ? 'text-guinda' : 'text-ink/65 hover:text-guinda'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    <span
                      className={`absolute -bottom-1.5 left-0 h-px bg-guinda transition-all duration-300 ease-[var(--ease-out-expo)] ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <ButtonLink to="/contacto" tone="guinda" variant="solid" arrow={false} className="px-6 py-2.5">
                Súmate
              </ButtonLink>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 text-ink lg:hidden"
            >
              <span className="sr-only">Menú</span>
              <div className="flex flex-col gap-[5px]">
                <span className="block h-px w-5 bg-ink" />
                <span className="block h-px w-5 bg-ink" />
                <span className="block h-px w-5 bg-ink" />
              </div>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
