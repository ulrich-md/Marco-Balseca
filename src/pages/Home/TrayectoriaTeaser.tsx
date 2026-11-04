import { SectionLabel } from '../../components/ui/SectionLabel'
import { RevealText } from '../../components/ui/RevealText'
import { Reveal } from '../../components/ui/Reveal'
import { ButtonLink } from '../../components/ui/Button'
import { TRAYECTORIA } from '../../data/trayectoria'

/** Teaser de Trayectoria en Inicio: 3 hitos sobre una línea de tiempo real
 *  (hilo dorado + nodos guinda) y enlace a la página completa. */
export function TrayectoriaTeaser() {
  const hitos = TRAYECTORIA.slice(0, 3)

  return (
    <section className="relative overflow-hidden bg-paper py-24 text-ink md:py-32">
      {/* luz dorada cálida en la esquina (decorativo) */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(50% 60% at 100% 0%, rgba(230,209,148,0.22), transparent 70%)' }}
        />
      </div>

      <div className="container-x relative z-10">
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

        <div className="relative mt-16">
          {/* Hilo del tiempo: vertical en móvil, horizontal en desktop */}
          <span
            aria-hidden
            className="absolute bottom-0 left-[11px] top-0 w-px bg-gradient-to-b from-accent via-gold to-transparent md:bottom-auto md:left-0 md:right-0 md:top-[11px] md:h-px md:w-auto md:bg-gradient-to-r"
          />
          <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
            {hitos.map((h, i) => (
              <Reveal key={i} delay={i * 0.08} as="li" className="relative pl-10 md:pl-0 md:pt-12">
                <span
                  aria-hidden
                  className="absolute left-0 top-0 grid h-[23px] w-[23px] place-items-center rounded-full bg-paper ring-1 ring-accent/30"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                </span>
                <div className="group h-full rounded-2xl border border-ink/8 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-soft">
                  <div className="flex items-start justify-between">
                    <p className="font-condensed text-xl font-semibold uppercase tracking-wide text-accent">
                      {h.anio}
                    </p>
                    <span className="font-display text-3xl text-ink/10 transition-colors duration-300 group-hover:text-gold/50">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-ink">{h.titulo}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">{h.texto}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <div className="mt-10 md:hidden">
          <ButtonLink to="/trayectoria" variant="outline" tone="accent" full>
            Ver trayectoria
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
