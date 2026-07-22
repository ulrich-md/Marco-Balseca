import { Link } from 'react-router-dom'
import { NAV, SITE, SOCIAL } from '../../data/site'
import { Wordmark } from '../ui/Wordmark'
import { ButtonLink } from '../ui/Button'
import { scrollToTop } from '../../lib/SmoothScroll'
import { InstagramIcon, FacebookIcon, XIcon, WhatsappIcon } from '../ui/Icons'

const socialCls =
  'flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white/85 transition-colors hover:border-sand hover:text-sand'

/* Formas orgánicas tono sobre tono (réplica del patrón institucional del
   Gobierno del Estado: blobs suaves guinda sobre guinda oscuro). */
function OrganicShapes() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <path
        d="M-80 620 C 60 470, 260 480, 360 600 S 520 830, 340 890 C 180 940, -40 850, -80 720 Z"
        fill="#9b2247"
        opacity="0.32"
      />
      <path
        d="M1120 -60 C 1320 -20, 1480 120, 1440 300 C 1400 470, 1180 480, 1080 360 C 980 240, 960 60, 1120 -60 Z"
        fill="#9b2247"
        opacity="0.28"
      />
      <path
        d="M540 260 C 700 180, 900 220, 940 360 C 980 500, 840 600, 680 570 C 520 540, 420 380, 540 260 Z"
        stroke="#9b2247"
        strokeWidth="40"
        opacity="0.22"
      />
      <path
        d="M180 40 C 300 -30, 470 10, 500 120 C 530 230, 420 310, 300 290 C 180 270, 90 130, 180 40 Z"
        stroke="#9b2247"
        strokeWidth="26"
        opacity="0.2"
      />
    </svg>
  )
}

/* Greca escalonada en dorado — hace de "escudo" del lockup institucional. */
function GrecaMark() {
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden className="h-12 w-12 md:h-14 md:w-14">
      <path
        d="M12 88 L12 38 L50 38 L50 66 L30 66 L30 52 L40 52 L40 58"
        stroke="var(--color-gold)"
        strokeWidth={6}
        strokeLinecap="square"
      />
      <path d="M12 24 L88 24" stroke="var(--color-gold)" strokeWidth={6} strokeLinecap="square" />
    </svg>
  )
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-accent-deep text-white">
      <OrganicShapes />
      {/* Grano de película muy sutil para textura editorial */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: 'url(/assets/backgrounds/grain.png)', backgroundSize: '420px' }}
      />

      {/* Nombre gigante */}
      <div className="container-x relative pt-20 md:pt-28">
        <p className="eyebrow text-sand">
          {SITE.ciudad}, {SITE.estado} · {year}
        </p>
        <h2 className="font-display mt-4 text-[18vw] leading-[0.82] md:text-[13vw]">
          <span className="block">Marco</span>
          <span className="block text-outline">Balseca</span>
        </h2>
        <p className="font-condensed mt-3 text-xl text-white/65 md:text-2xl">{SITE.tagline}</p>
      </div>

      {/* Columnas */}
      <div className="container-x relative mt-16 grid gap-12 border-t border-white/15 pt-14 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Wordmark tone="bone" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">
            Soy abogado y maestro en Administración, con 30 años en la vida pública. Hoy, delegado
            de Gobernación del Estado de Puebla en la microrregión 25. Mi trabajo es en territorio:
            cerca de la gente, por nuestra tierra.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a href={SOCIAL.instagram.url} target="_blank" rel="noreferrer" aria-label="Instagram @marcobalseca1" className={socialCls}>
              <InstagramIcon />
            </a>
            <a href={SOCIAL.facebook.url} target="_blank" rel="noreferrer" aria-label="Facebook" className={socialCls}>
              <FacebookIcon />
            </a>
            <a href={SOCIAL.x.url} target="_blank" rel="noreferrer" aria-label="X" className={socialCls}>
              <XIcon />
            </a>
            {SOCIAL.whatsapp.url !== '#' && (
              <a href={SOCIAL.whatsapp.url} target="_blank" rel="noreferrer" aria-label="WhatsApp" className={socialCls}>
                <WhatsappIcon />
              </a>
            )}
          </div>
        </div>

        <nav aria-label="Navegación de pie">
          <p className="eyebrow text-white/50">Navega</p>
          <ul className="mt-4 space-y-2.5">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="font-condensed flex min-h-[44px] items-center text-lg text-white/85 transition-colors hover:text-sand"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="eyebrow text-white/50">Súmate al movimiento</p>
          <p className="mt-4 text-sm leading-relaxed text-white/65">
            Hazte voluntario, organiza tu colonia y caminemos juntos. Aquí me tienes, de tú a tú.
          </p>
          <div className="mt-5">
            <ButtonLink to="/contacto" tone="bone" variant="solid">
              Quiero sumarme
            </ButtonLink>
          </div>
          <a
            href={`mailto:${SOCIAL.email.value}`}
            className="mt-5 block text-sm text-white/75 underline-offset-4 hover:text-sand hover:underline"
          >
            {SOCIAL.email.value}
          </a>
          <a
            href={SOCIAL.linktree.url}
            target="_blank"
            rel="noreferrer"
            className="mt-2 block text-sm text-white/75 underline-offset-4 hover:text-sand hover:underline"
          >
            {SOCIAL.linktree.handle}
          </a>
        </div>
      </div>

      {/* ================= Banda institucional (réplica guía Gob. Puebla) ================= */}
      <div className="relative mt-20 border-t border-white/15">
        <div className="container-x flex flex-col items-center py-14 text-center md:py-20">
          {/* Lockup centrado: greca (escudo) + nombre + / + lema */}
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:gap-6">
            <div className="flex items-center gap-4">
              <GrecaMark />
              <div className="text-left">
                <p className="font-condensed text-lg font-bold uppercase leading-[1.05] tracking-wide">
                  Marco
                  <br />
                  Balseca
                </p>
                <p className="font-condensed mt-1 text-[11px] font-semibold tracking-[0.3em] text-gold">
                  2024 - 2030
                </p>
              </div>
            </div>
            <span aria-hidden className="hidden h-14 w-px bg-white/30 sm:block" />
            <div className="text-left">
              <p className="font-condensed text-sm font-medium uppercase tracking-wide text-white/85">
                por <span className="font-bold text-sand">amor</span> a
              </p>
              <p className="font-condensed text-3xl font-bold uppercase leading-none tracking-wide">
                Tehuacán
              </p>
            </div>
          </div>

          <p className="mt-12 text-sm text-white/90 md:mt-14">
            Todos los Derechos Reservados {SITE.name} {year}
          </p>
          <Link
            to="/aviso-de-privacidad"
            className="mt-6 inline-block min-h-[44px] pt-2 text-sm text-white/90 underline-offset-4 transition-colors hover:text-sand hover:underline"
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
      </div>
    </footer>
  )
}
