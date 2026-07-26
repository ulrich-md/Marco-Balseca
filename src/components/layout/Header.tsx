import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { NAV } from '../../data/site'
import { Wordmark } from '../ui/Wordmark'
import { ButtonLink } from '../ui/Button'
import { MobileMenu } from './MobileMenu'

/**
 * Header fijo y claro. Todas las páginas abren con fondo claro (bone/blanco),
 * así que el header usa tinta accent. Al hacer scroll, fondo blanco translúcido
 * + sombra suave. Menú móvil full-screen en accent.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-bone"
      >
        Saltar al contenido
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-[var(--ease-out-expo)] ${
          scrolled
            ? 'border-b border-ink/10 bg-white py-3 shadow-[0_10px_30px_-18px_rgba(30,23,20,0.35)]'
            : 'bg-gradient-to-b from-white via-white/80 to-transparent py-5'
        }`}
      >
        {/* Hilo dorado institucional en el borde inferior (aparece al hacer
            scroll): acento de marca sin recurrir a cristal/vidrio. */}
        <span
          aria-hidden
          className={`pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent transition-opacity duration-300 ${
            scrolled ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <div className="container-x flex items-center justify-between gap-6">
          <Wordmark split className="transition-opacity hover:opacity-80" />

          <nav className="hidden items-center gap-x-6 lg:flex xl:gap-x-8" aria-label="Principal">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `font-condensed group relative text-[0.92rem] font-semibold uppercase tracking-[0.1em] transition-colors ${
                    isActive ? 'text-accent' : 'text-ink/70 hover:text-accent'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-accent to-gold transition-all duration-300 ease-[var(--ease-out-expo)] ${
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
              <ButtonLink
                to="/contacto"
                tone="accent"
                variant="solid"
                arrow={false}
                className="px-6 py-2.5 ring-gold/60 transition-all hover:ring-2 active:scale-[0.97]"
              >
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
