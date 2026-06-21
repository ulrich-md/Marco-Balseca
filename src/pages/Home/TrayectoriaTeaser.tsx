import { SectionLabel } from '../../components/ui/SectionLabel'
import { RevealText } from '../../components/ui/RevealText'
import { Reveal } from '../../components/ui/Reveal'
import { ButtonLink } from '../../components/ui/Button'
import { TRAYECTORIA } from '../../data/trayectoria'

/** Teaser de Trayectoria en Inicio: 3 hitos + enlace a la página completa. */
export function TrayectoriaTeaser() {
  const hitos = TRAYECTORIA.slice(0, 3)

  return (
    <section className="bg-bone py-14 text-ink md:py-28">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel num="02" tone="accent">
              Trayectoria
            </SectionLabel>
            <RevealText
              as="h2"
              text={'El camino,\npaso a paso'}
              className="font-display mt-5 text-[14vw] leading-[0.86] text-ink sm:text-7xl lg:text-8xl"
            />
          </div>
          <div className="hidden md:block">
            <ButtonLink to="/trayectoria" variant="outline" tone="accent">
              Ver trayectoria
            </ButtonLink>
          </div>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 md:grid-cols-3">
          {hitos.map((h, i) => (
            <Reveal key={i} delay={i * 0.08} className="bg-bone p-7">
              <span className="font-display text-3xl text-ink/15">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="font-condensed mt-4 text-xl font-semibold uppercase tracking-wide text-accent">
                {h.anio}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-ink">{h.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{h.texto}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <ButtonLink to="/trayectoria" variant="outline" tone="accent" full>
            Ver trayectoria
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
