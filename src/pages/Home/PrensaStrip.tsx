import { SectionLabel } from '../../components/ui/SectionLabel'
import { RevealText } from '../../components/ui/RevealText'
import { Reveal } from '../../components/ui/Reveal'
import { FacebookRecentPosts } from '../../components/ui/FacebookRecentPosts'
import { SOCIAL } from '../../data/site'

/* =========================================================================
   "En las noticias": publicaciones recientes de Facebook (embebidas y
   auto-actualizables) + notas de prensa reales y positivas. Sin scraping.
   ========================================================================= */

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
      'Como delegado de Gobernación de la microrregión 25, Marco Balseca explica el módulo de canje voluntario y confidencial de armas: una jornada por la paz de las familias.',
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

/** Sección "En las noticias": redes (Facebook en vivo) + prensa. */
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
                Sus publicaciones más recientes de Facebook (se actualizan solas) y la prensa local.
                Todo real y verificable.
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

        {/* Publicaciones recientes de Facebook (embebidas, auto-actualizables) */}
        <Reveal className="mt-12">
          <FacebookRecentPosts />
        </Reveal>

        {/* Notas de prensa (positivas) */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
