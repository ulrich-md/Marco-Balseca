import { Link } from 'react-router-dom'
import { SITE } from '../../data/site'
import { OrganicShapes } from '../ui/OrganicShapes'
import { scrollToTop } from '../../lib/SmoothScroll'

/* =========================================================================
   FOOTER — réplica exacta del pie de alejandroarmenta.com.mx (somos parte
   del mismo equipo del Gobierno del Estado de Puebla):
   guinda oscuro + formas orgánicas, lockup institucional centrado
   (GOBIERNO DEL ESTADO 2024-2030 / POR AMOR A PUEBLA), derechos reservados,
   Aviso de Privacidad y botón para volver arriba.
   REEMPLAZAR: si consiguen el PNG oficial del escudo, súbanlo a
   /assets/logos/escudo-puebla.png y aparecerá solo (sin él, el lockup
   tipográfico se sostiene igual).
   ========================================================================= */

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-accent-deep text-white">
      <OrganicShapes />

      <div className="container-x relative flex flex-col items-center py-16 text-center md:py-24">
        {/* Lockup institucional (Gobierno del Estado de Puebla) */}
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:gap-6">
          <div className="flex items-center gap-4">
            {/* Escudo oficial (aparece cuando exista el asset) */}
            <img
              src="/assets/logos/escudo-puebla.png"
              alt=""
              aria-hidden
              className="h-14 w-auto md:h-16"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
            <div className="text-left">
              <p className="font-condensed text-lg font-bold uppercase leading-[1.05] tracking-wide">
                Gobierno
                <br />
                del Estado
              </p>
              <p className="font-condensed mt-1 text-[11px] font-semibold tracking-[0.3em] text-gold">
                2024 - 2030
              </p>
            </div>
          </div>
          <span aria-hidden className="hidden h-14 w-px bg-white/30 sm:block" />
          <div className="text-left">
            <p className="font-condensed text-sm font-medium uppercase tracking-wide text-white/85">
              por <span className="font-bold text-accent-soft">amor</span> a
            </p>
            <p className="font-condensed text-3xl font-bold uppercase leading-none tracking-wide">
              Puebla
            </p>
          </div>
        </div>

        <p className="mt-14 text-[15px] text-white/95 md:mt-16">
          Todos los Derechos Reservados {SITE.name} {year}
        </p>

        <Link
          to="/aviso-de-privacidad"
          className="mt-8 inline-block min-h-[44px] pt-2 text-[15px] text-white/95 underline-offset-4 transition-colors hover:text-sand hover:underline"
        >
          Aviso de Privacidad
        </Link>
      </div>

      {/* Botón volver arriba (esquina inferior derecha, como la referencia) */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Volver arriba"
        className="absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-sm bg-white text-accent-deep shadow-lg transition-transform hover:-translate-y-0.5 md:bottom-7 md:right-7"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="m5 14 7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </footer>
  )
}
