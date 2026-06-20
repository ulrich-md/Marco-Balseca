import { SectionLabel } from '../../components/ui/SectionLabel'
import { RevealText } from '../../components/ui/RevealText'
import { Reveal } from '../../components/ui/Reveal'
import { ResponsiveImg } from '../../components/ui/ResponsiveImg'
import { FacebookProfileCard } from '../../components/ui/FacebookProfileCard'
import { FacebookIcon, InstagramIcon } from '../../components/ui/Icons'
import { SOCIAL } from '../../data/site'

/* =========================================================================
   Prensa y redes — cobertura REAL y positiva sobre Marco Balseca.
   IMPORTANTE: NO usamos iframes de plugins de Facebook/Instagram. Los
   escáneres anti-phishing (Malwarebytes Browser Guard, etc.) marcan como
   "phishing" cualquier frame de login/plugin de una marca incrustado en otro
   dominio (patrón de login falso). Por eso usamos TARJETAS-ENLACE branded:
   mismo contenido real, interacción al abrir la red, y CERO falsos positivos.
   ========================================================================= */

type Red = {
  brand: 'facebook' | 'instagram'
  kind: 'page' | 'video' | 'reel'
  marca: string
  titulo: string
  resumen: string
  url: string
  /** Miniatura real (foto propia) que representa el contenido. */
  thumb: string
}

const REDES: Red[] = [
  {
    brand: 'instagram',
    kind: 'reel',
    marca: 'Instagram · @marcobalseca1',
    titulo: 'Atención a vecinos — Col. San Francisco 1ª sección',
    resumen: 'Reel destacado: escucha vecinal y atención cercana, casa por casa.',
    url: 'https://www.instagram.com/marcobalseca1/reel/DZp5ue_xllO/',
    thumb: '/assets/comunidad/comunidad-visita.jpg',
  },
  {
    brand: 'facebook',
    kind: 'video',
    marca: 'Facebook · Video',
    titulo: '#DelegadosEnMovimiento — Marco Balseca, microrregión 25',
    resumen: 'Diario Primera Línea: el delegado invita y explica el trabajo en territorio.',
    url: 'https://www.facebook.com/DiarioPrimeraLineaTH/videos/2010567689555570/',
    thumb: '/assets/portraits/marco-corazon-fondo.jpg',
  },
]

type Nota = {
  fuente: string
  etiqueta: string
  titulo: string
  resumen: string
  url: string
}

// Notas reales y POSITIVAS (verificadas). Se excluye todo lo negativo/partidista.
const NOTAS: Nota[] = [
  {
    fuente: 'Municipios Puebla',
    etiqueta: 'Seguridad y paz',
    titulo: '«Sí al desarme, sí a la paz»: Tehuacán abre el canje voluntario de armas',
    resumen:
      'Como delegado de Gobernación de la microrregión 25, Marco Balseca explica el módulo de canje voluntario y confidencial de armas en el Palacio Municipal: una jornada por la paz de las familias.',
    url: 'https://municipiospuebla.mx/nota/tehuacan/realizan-en-tehuacan-campana-de-canje-voluntario-de-armas',
  },
  {
    fuente: 'Diario Primera Línea',
    etiqueta: 'En territorio',
    titulo: '#DelegadosEnTerritorio: entrevista con Marco Antonio Balseca Romero',
    resumen:
      'El trabajo de calle del delegado en la microrregión 25 de Tehuacán: recorridos por las colonias, escucha vecinal y atención cercana, una a una.',
    url: 'https://www.facebook.com/61572253138907/videos/entrevista-delegado/1287605396616409/',
  },
  {
    fuente: 'Contraparte',
    etiqueta: 'Jornada ciudadana',
    titulo: 'Jornada «Por Amor a Puebla» acerca programas y servicios a la microrregión',
    resumen:
      'Obra Comunitaria, mejoramiento de vivienda, becas de conectividad y apoyos al campo llegan a las colonias y juntas auxiliares de la microrregión 25 de Tehuacán.',
    url: 'https://contraparte.mx/lo-oficial/75520-jornada-por-amor-a-puebla-acerca-programas-y-servicios-de-beneficio-para-la-poblaci%C3%B3n.html',
  },
  {
    fuente: 'Quince Minutos',
    etiqueta: 'Desarrollo del campo',
    titulo: 'Con cercanía y escucha, se detona el campo de la microrregión de Tehuacán',
    resumen:
      'Insumos estratégicos, maquinaria y seguridad para el campo poblano llegan a la microrregión de Tehuacán con un enfoque de cercanía y escucha a las familias productoras.',
    url: 'https://www.quinceminutos.mx/post/con-cercania-y-escucha-gobierno-estatal-detona-campo-de-microrregion-de-tehuacan',
  },
]

const PlayBadge = () => (
  <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-accent">
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  </span>
)

/** Tarjeta-enlace de red social (sin iframe): marca + CTA hacia la red real. */
function SocialCard({ red }: { red: Red }) {
  const Brand = red.brand === 'facebook' ? FacebookIcon : InstagramIcon
  const cta = red.brand === 'facebook' ? 'Ver en Facebook' : 'Ver en Instagram'
  return (
    <a
      href={red.url}
      target="_blank"
      rel="noreferrer"
      className="group flex cursor-pointer flex-col overflow-hidden rounded-sm border border-ink/12 bg-white transition-colors duration-200 hover:border-accent"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-black">
        <ResponsiveImg
          src={red.thumb}
          alt=""
          decorative
          sizes="(min-width: 768px) 30vw, 92vw"
          imgClassName="absolute inset-0 h-full w-full object-cover opacity-95 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
        />
        <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/20" />
        {red.kind !== 'page' && <PlayBadge />}
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5">
          <Brand className="h-4 w-4 text-white" />
          <span className="eyebrow text-white/90">{red.marca}</span>
        </span>
        <span aria-hidden className="pointer-events-none absolute inset-2.5 border border-white/0 transition-colors duration-300 group-hover:border-accent" />
      </div>
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <h3 className="font-condensed text-lg font-semibold leading-tight text-ink">{red.titulo}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink/70">{red.resumen}</p>
        </div>
        <span className="font-condensed mt-4 inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-wide text-ink transition-colors group-hover:text-accent">
          {cta}
          <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">↗</span>
        </span>
      </div>
    </a>
  )
}

function NewsCard({ nota }: { nota: Nota }) {
  return (
    <a
      href={nota.url}
      target="_blank"
      rel="noreferrer"
      className="group flex h-full cursor-pointer flex-col justify-between rounded-sm border border-ink/12 bg-white p-6 transition-colors duration-200 hover:border-accent"
    >
      <div>
        <div className="flex items-center gap-2">
          <span className="eyebrow text-accent">{nota.fuente}</span>
          <span className="h-1 w-1 rounded-full bg-ink/30" aria-hidden />
          <span className="eyebrow text-mute">{nota.etiqueta}</span>
        </div>
        <h3 className="font-condensed mt-3 text-xl font-semibold leading-tight text-ink">
          {nota.titulo}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink/70">{nota.resumen}</p>
      </div>
      <span className="font-condensed mt-5 inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-wide text-ink transition-colors group-hover:text-accent">
        Leer nota
        <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>
      </span>
    </a>
  )
}

/** Sección "En las noticias": prensa + redes reales y positivas (sin iframes). */
export function PrensaStrip() {
  return (
    <section className="bg-bone py-20 text-ink md:py-28">
      <div className="container-x">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <SectionLabel tone="accent">En las noticias</SectionLabel>
            <RevealText
              as="h2"
              text="Lo que se dice de Marco"
              className="font-display mt-5 text-[12vw] leading-[0.9] text-ink sm:text-5xl lg:text-6xl"
            />
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-xl text-ink/70">
                Prensa local y mis redes, en un solo lugar. Toca cualquiera para verlo, comentar e
                interactuar —todo es real y verificable.
              </p>
            </Reveal>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={SOCIAL.facebook.url}
              target="_blank"
              rel="noreferrer"
              className="font-condensed text-sm font-semibold uppercase tracking-wide text-ink transition-colors hover:text-accent"
            >
              Facebook ↗
            </a>
            <span className="h-4 w-px bg-ink/20" aria-hidden />
            <a
              href={SOCIAL.instagram.url}
              target="_blank"
              rel="noreferrer"
              className="font-condensed text-sm font-semibold uppercase tracking-wide text-ink transition-colors hover:text-accent"
            >
              Instagram ↗
            </a>
          </div>
        </div>

        {/* Redes (sin iframe): widget de perfil de Facebook + tarjetas-enlace */}
        <div className="mt-12 grid items-start gap-5 md:grid-cols-3">
          <Reveal>
            <FacebookProfileCard />
          </Reveal>
          {REDES.map((red, i) => (
            <Reveal key={red.url} delay={(i + 1) * 0.06}>
              <SocialCard red={red} />
            </Reveal>
          ))}
        </div>

        {/* Notas de prensa (positivas) */}
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {NOTAS.map((nota, i) => (
            <Reveal key={nota.url} delay={i * 0.05}>
              <NewsCard nota={nota} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
