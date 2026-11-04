import { Link } from 'react-router-dom'
import { NAV, SITE, SOCIAL } from '../../data/site'
import { GrecaBand, GrecaField } from '../ui/Greca'
import { Wordmark } from '../ui/Wordmark'
import { InstagramIcon, FacebookIcon, XIcon } from '../ui/Icons'
import { scrollToTop } from '../../lib/SmoothScroll'

const FOOT_SOCIAL = [
  { Icon: InstagramIcon, ...SOCIAL.instagram },
  { Icon: FacebookIcon, ...SOCIAL.facebook },
  { Icon: XIcon, ...SOCIAL.x },
]

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
    <footer className="relative overflow-hidden bg-wine text-white">
      <GrecaBand className="text-sand/20" height={12} />
      <GrecaField color="var(--color-sand)" opacity={0.025} size={64} strokeWidth={2.5} />

      {/* Fila superior: marca + navegación + redes */}
      <div className="container-x relative flex flex-col items-center gap-8 pb-12 pt-14 text-center lg:flex-row lg:justify-between lg:text-left">
        <Wordmark tone="bone" className="transition-opacity hover:opacity-80" />
        <nav aria-label="Pie de página" className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="font-condensed inline-flex min-h-[44px] items-center text-[0.92rem] font-semibold uppercase tracking-[0.1em] text-white/70 transition-colors hover:text-sand"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {FOOT_SOCIAL.map(({ Icon, label, url }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors duration-200 hover:border-sand hover:bg-sand hover:text-wine"
            >
              <Icon className="h-[18px] w-[18px]" />
            </a>
          ))}
        </div>
      </div>
      <div aria-hidden className="container-x relative">
        <div className="h-px bg-gradient-to-r from-transparent via-sand/35 to-transparent" />
      </div>

      <div className="container-x relative flex flex-col items-center py-14 text-center md:py-16">
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

        <p className="mt-12 text-[15px] text-white/80">
          Todos los Derechos Reservados {SITE.name} {year}
        </p>

        <Link
          to="/aviso-de-privacidad"
          className="mt-4 inline-block min-h-[44px] pt-2 text-[15px] text-white/80 underline-offset-4 transition-colors hover:text-sand hover:underline"
        >
          Aviso de Privacidad
        </Link>
      </div>

      {/* Botón volver arriba (esquina inferior derecha, como la referencia) */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Volver arriba"
        className="absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center cursor-pointer rounded-full bg-sand text-wine shadow-lg transition-transform hover:-translate-y-0.5 md:bottom-7 md:right-7"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="m5 14 7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </footer>
  )
}
