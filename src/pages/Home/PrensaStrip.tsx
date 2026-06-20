import { SectionLabel } from '../../components/ui/SectionLabel'
import { RevealText } from '../../components/ui/RevealText'
import { Reveal } from '../../components/ui/Reveal'
import { SOCIAL } from '../../data/site'

/* =========================================================================
   Prensa y redes — cobertura REAL y positiva sobre Marco Balseca.
   - Embeds interactivos vía plugins/embeds oficiales (iframe, sin SDK):
     · Página de Facebook (@balseca) — timeline en vivo.
     · Video de Facebook (#DelegadosEnMovimiento).
     · Reel destacado de Instagram (@marcobalseca1).
   - Tarjetas de notas que enlazan a la fuente (siempre funcionan, sin CLS).
   Cada embed trae enlace directo por si un ad-blocker lo bloquea.
   Nota: Instagram NO permite incrustar el PERFIL completo por iframe; se
   incrusta un reel destacado (embed oficial) + enlace al perfil.
   ========================================================================= */

const FB_PAGE = 'https://www.facebook.com/balseca'
const FB_VIDEO = 'https://www.facebook.com/DiarioPrimeraLineaTH/videos/2010567689555570/'
// Reel real destacado: "Atención a vecinos — Col. San Francisco 1ª sección"
const IG_REEL = 'https://www.instagram.com/marcobalseca1/reel/DZp5ue_xllO/'
const IG_REEL_EMBED = 'https://www.instagram.com/reel/DZp5ue_xllO/embed'

const pagePlugin = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
  FB_PAGE,
)}&tabs=timeline&width=400&height=560&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true`

const videoPlugin = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
  FB_VIDEO,
)}&show_text=false&width=560`

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
      'Como delegado de Gobernación de la microrregión 25, Marco Balseca explica el módulo de canje voluntario y confidencial de armas en el Palacio Municipal: una jornada por la paz y la seguridad de las familias.',
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

/** Cabecera de un tile de embed: marca + enlace directo (fallback garantizado). */
function EmbedHead({ label, href }: { label: string; href: string }) {
  return (
    <div className="flex items-center justify-between border-b border-ink/10 px-4 py-3">
      <span className="eyebrow text-accent">{label}</span>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="eyebrow text-mute transition-colors hover:text-accent"
      >
        Ver ↗
      </a>
    </div>
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

/** Sección "En las noticias": prensa + redes reales y positivas. */
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
                Prensa local y mis redes, en un solo lugar. Mira, comenta e interactúa —todo es real
                y verificable.
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

        {/* Fila de embeds interactivos: 3 columnas de alto parejo */}
        <div className="mt-12 grid items-start gap-5 lg:grid-cols-3">
          {/* Facebook (timeline en vivo) */}
          <Reveal className="overflow-hidden rounded-sm border border-ink/12 bg-white">
            <EmbedHead label="Facebook · @balseca" href={SOCIAL.facebook.url} />
            <iframe
              title="Página de Facebook de Marco Balseca"
              src={pagePlugin}
              className="h-[560px] w-full"
              style={{ border: 'none', overflow: 'hidden' }}
              scrolling="no"
              frameBorder={0}
              loading="lazy"
              allow="encrypted-media; picture-in-picture; web-share"
            />
          </Reveal>

          {/* Instagram (reel destacado — embed oficial) */}
          <Reveal delay={0.06} className="overflow-hidden rounded-sm border border-ink/12 bg-white">
            <EmbedHead label="Instagram · @marcobalseca1" href={IG_REEL} />
            <iframe
              title="Reel destacado de Marco Balseca en Instagram"
              src={IG_REEL_EMBED}
              className="h-[560px] w-full"
              style={{ border: 'none', overflow: 'hidden' }}
              scrolling="no"
              frameBorder={0}
              loading="lazy"
              allow="encrypted-media; picture-in-picture; web-share"
            />
          </Reveal>

          {/* Video de Facebook + nota destacada (apiladas) */}
          <div className="flex flex-col gap-5">
            <Reveal delay={0.12} className="overflow-hidden rounded-sm border border-ink/12 bg-white">
              <EmbedHead label="Video · #DelegadosEnMovimiento" href={FB_VIDEO} />
              <iframe
                title="Marco Balseca, delegado de la microrregión 25 — video"
                src={videoPlugin}
                className="h-[300px] w-full"
                style={{ border: 'none', overflow: 'hidden' }}
                scrolling="no"
                frameBorder={0}
                loading="lazy"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              />
            </Reveal>
            <Reveal delay={0.16} className="flex-1">
              <NewsCard nota={NOTAS[0]} />
            </Reveal>
          </div>
        </div>

        {/* Más notas de prensa (positivas) */}
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {NOTAS.slice(1).map((nota, i) => (
            <Reveal key={nota.url} delay={0.05 + i * 0.06}>
              <NewsCard nota={nota} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
