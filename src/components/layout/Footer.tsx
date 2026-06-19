import { Link } from 'react-router-dom'
import { NAV, SITE, SOCIAL } from '../../data/site'
import { Wordmark } from '../ui/Wordmark'
import { ButtonLink } from '../ui/Button'
import { scrollToTop } from '../../lib/SmoothScroll'
import { InstagramIcon, FacebookIcon, XIcon, WhatsappIcon } from '../ui/Icons'

const socialCls =
  'flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-accent hover:text-accent'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-black text-white">
      {/* Nombre gigante */}
      <div className="container-x relative pt-16 md:pt-24">
        <p className="eyebrow text-accent">
          {SITE.ciudad}, {SITE.estado} · {year}
        </p>
        <h2 className="font-display mt-4 text-[18vw] leading-[0.82] md:text-[13vw]">
          <span className="block">Marco</span>
          <span className="block text-outline">Balseca</span>
        </h2>
        <p className="font-condensed mt-3 text-xl text-white/60 md:text-2xl">
          {SITE.tagline}
        </p>
      </div>

      {/* Columnas */}
      <div className="container-x relative mt-14 grid gap-10 border-t border-white/12 pt-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Wordmark tone="bone" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
            Figura política y comunitaria de {SITE.ciudad}, {SITE.estado}. Por nuestra tierra,
            nuestra gente y nuestras raíces.
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
            <a href={SOCIAL.whatsapp.url} target="_blank" rel="noreferrer" aria-label="WhatsApp" className={socialCls}>
              <WhatsappIcon />
            </a>
          </div>
        </div>

        <nav aria-label="Navegación de pie">
          <p className="eyebrow text-white/45">Navega</p>
          <ul className="mt-4 space-y-2.5">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="font-condensed text-lg text-white/80 transition-colors hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="eyebrow text-white/45">Súmate al movimiento</p>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            Sé voluntario, organiza tu colonia y camina con nosotros.
          </p>
          <div className="mt-5">
            <ButtonLink to="/contacto" tone="bone" variant="solid">
              Quiero sumarme
            </ButtonLink>
          </div>
          {/* REEMPLAZAR: correo oficial */}
          <a
            href={`mailto:${SOCIAL.email.value}`}
            className="mt-5 block text-sm text-white/70 underline-offset-4 hover:text-accent hover:underline"
          >
            {SOCIAL.email.value}
          </a>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="container-x relative mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/12 py-7 text-xs text-white/55 sm:flex-row sm:items-center">
        <p>
          © {year} {SITE.name}. {SITE.ciudad}, {SITE.estado}, {SITE.pais}.
        </p>
        <p className="text-white/35">Contenido y cifras: placeholders pendientes de validación del equipo.</p>
        <button
          type="button"
          onClick={scrollToTop}
          className="font-condensed uppercase tracking-[0.18em] text-white/70 transition-colors hover:text-accent"
        >
          Volver arriba ↑
        </button>
      </div>
    </footer>
  )
}
