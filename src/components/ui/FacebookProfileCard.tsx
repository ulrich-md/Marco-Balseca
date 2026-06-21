import { useState } from 'react'
import { ResponsiveImg } from './ResponsiveImg'
import { FacebookIcon } from './Icons'

/* =========================================================================
   Perfil de Facebook con EMBED REAL bajo demanda (facade / click-to-load).
   - Por defecto se ve una tarjeta estática (rápida y segura).
   - Al pulsar "Ver en vivo" se carga el plugin OFICIAL de Facebook (iframe).
   Esto evita que el anti-phishing (Malwarebytes) bloquee a quien solo navega;
   el embed real se carga solo si la persona lo pide. Datos reales de @balseca.
   ========================================================================= */

const FB_URL = 'https://www.facebook.com/balseca'
const FB_BLUE = '#1877F2'
const PAGE_PLUGIN = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
  FB_URL,
)}&tabs=timeline&width=400&height=560&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`

const VerifiedCheck = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
    <path
      fill={FB_BLUE}
      d="M12 2 9.8 4.2 6.8 4l-.8 2.9L3.2 8.5l1.4 2.6-1.4 2.6 2.8 1.6.8 2.9 3-.2L12 22l2.2-2.2 3 .2.8-2.9 2.8-1.6-1.4-2.6 1.4-2.6-2.8-1.6L17.2 4l-3 .2z"
    />
    <path fill="#fff" d="m10.6 14.6-2.2-2.2 1.1-1.1 1.1 1.1 3-3 1.1 1.1z" />
  </svg>
)

const PublicTag = () => (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-mute" fill="currentColor" aria-hidden>
    <path d="M4 7a2 2 0 0 1 2-2h3V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1h3a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Zm6-2v1h4V5h-4Z" />
  </svg>
)

export function FacebookProfileCard({ className = '' }: { className?: string }) {
  const [live, setLive] = useState(false)

  if (live) {
    return (
      <div className={`overflow-hidden rounded-md border border-ink/12 bg-white ${className}`}>
        <div className="flex items-center justify-between border-b border-ink/10 px-4 py-3">
          <span className="eyebrow text-accent">Facebook · @balseca</span>
          <a
            href={FB_URL}
            target="_blank"
            rel="noreferrer"
            className="eyebrow text-mute transition-colors hover:text-accent"
          >
            Ver ↗
          </a>
        </div>
        <iframe
          title="Página de Facebook de Marco Balseca"
          src={PAGE_PLUGIN}
          className="h-[560px] w-full"
          style={{ border: 'none', overflow: 'hidden' }}
          scrolling="no"
          frameBorder={0}
          loading="lazy"
          allow="encrypted-media; picture-in-picture; web-share"
        />
      </div>
    )
  }

  return (
    <div
      className={`overflow-hidden rounded-md border border-ink/12 bg-white shadow-[0_18px_40px_-28px_rgba(0,0,0,0.45)] ${className}`}
    >
      {/* Portada */}
      <div className="relative h-24">
        <ResponsiveImg
          src="/assets/comunidad/comunidad-cancha.jpg"
          alt=""
          decorative
          sizes="400px"
          imgClassName="absolute inset-0 h-full w-full object-cover"
        />
        <span aria-hidden className="absolute inset-0 bg-black/15" />
        <span
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-white"
          style={{ backgroundColor: FB_BLUE }}
        >
          <FacebookIcon className="h-5 w-5" />
        </span>
      </div>

      {/* Encabezado */}
      <div className="px-4 pb-4">
        <div className="-mt-9 flex items-end">
          <img
            src="/assets/portraits/marco-formal.webp"
            alt="Marco Balseca"
            width={72}
            height={72}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.currentTarget.src = '/assets/portraits/marco-formal.jpg'
            }}
            className="rounded-full border-4 border-white bg-mist object-cover"
            style={{ height: 72, width: 72 }}
          />
        </div>

        <div className="mt-2">
          <div className="flex items-center gap-1.5">
            <h3 className="font-condensed text-xl font-semibold leading-none text-ink">Marco Balseca</h3>
            <VerifiedCheck />
          </div>
          <p className="mt-1 text-sm text-mute">11 mil seguidores</p>
          <p className="mt-1.5 text-sm font-medium text-ink">#BALSECA</p>
          <p className="mt-0.5 flex items-center gap-1.5 text-xs text-mute">
            <PublicTag /> Figura pública
          </p>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <a
            href={FB_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-md py-2 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
            style={{ backgroundColor: FB_BLUE }}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
              <path d="M12 5a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5H6a1 1 0 1 1 0-2h5V6a1 1 0 0 1 1-1Z" />
            </svg>
            Seguir
          </a>
          <button
            type="button"
            onClick={() => setLive(true)}
            className="flex cursor-pointer items-center justify-center gap-1.5 rounded-md border border-ink/20 py-2 text-sm font-semibold text-ink transition-colors duration-200 hover:border-accent hover:text-accent"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
            Ver en vivo
          </button>
        </div>

        {/* Publicación reciente (real) */}
        <a
          href={FB_URL}
          target="_blank"
          rel="noreferrer"
          className="group mt-4 block border-t border-ink/10 pt-3"
        >
          <div className="flex items-center gap-2">
            <img
              src="/assets/portraits/marco-formal.webp"
              alt=""
              aria-hidden
              width={32}
              height={32}
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
              className="h-8 w-8 rounded-full bg-mist object-cover"
            />
            <div className="leading-tight">
              <p className="text-sm font-semibold text-ink transition-colors group-hover:text-accent">
                Marco Balseca
              </p>
              <p className="text-xs text-mute">13 h · Público</p>
            </div>
          </div>
          <p className="mt-2 text-sm leading-snug text-ink/85">
            <span className="text-accent">●</span> #EnEstosMomentos estamos instalando el comité para
            la alarma vecinal en el fraccionamiento Hacienda…
          </p>
          <div className="mt-2 rounded-md border border-ink/10 bg-bone p-2.5">
            <p className="eyebrow text-mute">Sedeño Noticias</p>
            <p className="font-condensed mt-1 text-sm font-semibold uppercase leading-tight text-ink">
              Entrega Marco Balseca una alarma vecinal más en la junta auxiliar de San…
            </p>
          </div>
        </a>
      </div>
    </div>
  )
}
