import { SectionLabel } from '../../components/ui/SectionLabel'
import { RevealText } from '../../components/ui/RevealText'
import { Reveal } from '../../components/ui/Reveal'
import { ButtonLink } from '../../components/ui/Button'
import { OrganicShapes } from '../../components/ui/OrganicShapes'
import { TRAYECTORIA } from '../../data/trayectoria'

/** Teaser de Trayectoria en Inicio: 3 hitos + enlace a la página completa.
 *  Fondo GUINDA (intercalado de secciones para contraste). */
export function TrayectoriaTeaser() {
  const hitos = TRAYECTORIA.slice(0, 3)

  return (
    <section className="relative overflow-hidden bg-accent-deep py-20 text-white md:py-36">
      <OrganicShapes />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: 'url(/assets/backgrounds/grain.png)', backgroundSize: '420px' }}
      />
      <div className="container-x relative z-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel num="02" tone="bone">
              Trayectoria
            </SectionLabel>
            <RevealText
              as="h2"
              text={'El camino,\npaso a paso'}
              className="font-display mt-5 text-[14vw] leading-[0.86] text-white sm:text-7xl lg:text-8xl"
            />
          </div>
          <div className="hidden md:block">
            <ButtonLink to="/trayectoria" variant="outline" tone="bone">
              Ver trayectoria
            </ButtonLink>
          </div>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/15 md:grid-cols-3">
          {hitos.map((h, i) => (
            <Reveal key={i} delay={i * 0.08} className="bg-accent-deep p-7">
              <span className="font-display text-3xl text-white/20">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="font-condensed mt-4 text-xl font-semibold uppercase tracking-wide text-sand">
                {h.anio}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-white">{h.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/75">{h.texto}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <ButtonLink to="/trayectoria" variant="outline" tone="bone" full>
            Ver trayectoria
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
