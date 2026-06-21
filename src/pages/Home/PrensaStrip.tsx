import { useState } from 'react'
import { SectionLabel } from '../../components/ui/SectionLabel'
import { RevealText } from '../../components/ui/RevealText'
import { Reveal } from '../../components/ui/Reveal'
import { FacebookRecentPosts } from '../../components/ui/FacebookRecentPosts'
import { SOCIAL } from '../../data/site'

/* =========================================================================
   "En las noticias": muro de Facebook en vivo (sin API) + rejilla de notas de
   prensa reales y positivas. Layout balanceado para que no se vea vacío.
   ========================================================================= */

type Nota = {
  fuente: string
  etiqueta: string
  titulo: string
  resumen: string
  url: string
}

// Notas reales y POSITIVAS que mencionan a MARCO BALSECA por nombre (verificadas).
// Se excluye todo lo negativo/partidista.
const NOTAS: Nota[] = [
  {
    fuente: 'Municipios Puebla',
    etiqueta: 'Seguridad y paz',
    titulo: '«Sí al desarme, sí a la paz»: Marco Balseca encabeza el canje de armas',
    resumen:
      'El delegado de la microrregión 25, Marco Balseca, explica el módulo de canje voluntario y confidencial de armas en Tehuacán: una jornada por la paz de las familias.',
    url: 'https://municipiospuebla.mx/nota/tehuacan/realizan-en-tehuacan-campana-de-canje-voluntario-de-armas',
  },
  {
    fuente: 'Sedeño Noticias',
    etiqueta: 'Seguridad',
    titulo: 'Entrega Marco Balseca una alarma vecinal más en una junta auxiliar',
    resumen:
      'Instalación del comité y entrega de una nueva alarma vecinal para reforzar la seguridad de las familias en la microrregión 25 de Tehuacán.',
    url: 'https://www.facebook.com/balseca',
  },
  {
    fuente: 'Diario Primera Línea',
    etiqueta: '#DelegadosEnMovimiento',
    titulo: 'Marco Balseca, delegado de la microrregión 25, invita a la comunidad',
    resumen:
      'El delegado de Gobernación recorre el territorio e invita a vecinas y vecinos a sumarse a las jornadas y acciones de comunidad.',
    url: 'https://www.facebook.com/DiarioPrimeraLineaTH/videos/2010567689555570/',
  },
  {
    fuente: 'Diario Primera Línea',
    etiqueta: '#DelegadosEnTerritorio',
    titulo: 'Entrevista con Marco Antonio Balseca Romero',
    resumen:
      'El trabajo de calle del delegado en la microrregión 25: recorridos por las colonias, escucha vecinal y atención cercana, una a una.',
    url: 'https://www.facebook.com/61572253138907/videos/1287605396616409/',
  },
  {
    fuente: 'Talavera Noticias',
    etiqueta: 'Entrevista',
    titulo: 'Marco Balseca en entrevista: el trabajo en la microrregión 25',
    resumen:
      'El delegado de Gobernación habla del trabajo territorial y de las acciones de comunidad que impulsa en Tehuacán.',
    url: 'https://www.facebook.com/talavera.noticias.tehuacan/videos/26120198540995756/',
  },
]

function NewsCard({ nota, featured = false }: { nota: Nota; featured?: boolean }) {
  const isFb = nota.url.includes('facebook.com')
  return (
    <a
      href={nota.url}
      target="_blank"
      rel="noreferrer"
      className="group flex h-full cursor-pointer flex-col justify-between rounded-sm border border-ink/12 bg-white p-4 transition-colors duration-200 hover:border-accent sm:p-5"
    >
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="eyebrow text-accent">{nota.fuente}</span>
          <span className="h-1 w-1 rounded-full bg-ink/30" aria-hidden />
          <span className="eyebrow text-mute">{nota.etiqueta}</span>
        </div>
        <h3
          className={`font-condensed mt-2 font-semibold leading-tight text-ink sm:mt-3 ${
            featured ? 'text-xl sm:text-2xl' : 'text-lg'
          }`}
        >
          {nota.titulo}
        </h3>
        {/* El resumen se oculta en móvil para no cansar al lector */}
        <p className="mt-2 hidden text-sm leading-relaxed text-ink/70 sm:block">{nota.resumen}</p>
      </div>
      <span className="font-condensed mt-3 inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-wide text-ink transition-colors group-hover:text-accent sm:mt-4">
        {isFb ? 'Ver en Facebook' : 'Leer nota'}
        <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>
      </span>
    </a>
  )
}

const VISIBLE_MOVIL = 3 // cuántas notas se ven en móvil antes de "ver más"

export function PrensaStrip() {
  const [expanded, setExpanded] = useState(false)
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
                Sus publicaciones de Facebook (en vivo) y la prensa local. Todo real y verificable.
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

        {/* Bento: muro de Facebook (1/3) + rejilla de prensa (2/3) */}
        <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:items-start">
          <Reveal className="lg:col-span-1">
            <p className="mb-3 font-condensed text-lg font-semibold uppercase tracking-wide text-ink">
              Publicaciones recientes
            </p>
            <FacebookRecentPosts />
          </Reveal>

          <div className="lg:col-span-2">
            <p className="mb-3 font-condensed text-lg font-semibold uppercase tracking-wide text-ink">
              En la prensa
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {NOTAS.map((nota, i) => {
                const cls = [
                  i === 0 ? 'sm:col-span-2' : '',
                  i >= VISIBLE_MOVIL && !expanded ? 'hidden sm:block' : '',
                ]
                  .filter(Boolean)
                  .join(' ')
                return (
                  <Reveal key={nota.url} delay={(i % 2) * 0.05} className={cls || undefined}>
                    <NewsCard nota={nota} featured={i === 0} />
                  </Reveal>
                )
              })}
            </div>
            {!expanded && NOTAS.length > VISIBLE_MOVIL && (
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="mt-4 w-full cursor-pointer rounded-sm border border-ink/15 py-3 text-sm font-semibold uppercase tracking-wide text-ink transition-colors hover:border-accent hover:text-accent sm:hidden"
              >
                Ver más notas ({NOTAS.length - VISIBLE_MOVIL})
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
