import { SectionLabel } from '../../components/ui/SectionLabel'
import { RevealText } from '../../components/ui/RevealText'
import { Reveal } from '../../components/ui/Reveal'
import { ButtonLink } from '../../components/ui/Button'
import { ActionCard } from '../../components/ui/ActionCard'
import { ACCIONES } from '../../data/acciones'

/** Grid de Acciones/Propuestas (teaser de 3 en Inicio). */
export function AccionesTeaser() {
  const items = ACCIONES.slice(0, 3)

  return (
    <section className="bg-white py-20 text-ink md:py-28">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <SectionLabel num="03" tone="guinda">
              Acciones y propuestas
            </SectionLabel>
            <RevealText
              as="h2"
              text="Lo que mueve a Tehuacán"
              className="font-display mt-5 text-[12vw] leading-[0.88] text-guinda sm:text-6xl lg:text-7xl"
            />
            <p className="mt-4 text-ink/70">
              Ejes de trabajo cercano y con resultados.{' '}
              <span className="text-mute">// REEMPLAZAR: prioridades reales.</span>
            </p>
          </div>
          <div className="hidden md:block">
            <ButtonLink to="/acciones" variant="outline" tone="guinda">
              Ver todas
            </ButtonLink>
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.08}>
              <ActionCard accion={a} index={i} />
            </Reveal>
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <ButtonLink to="/acciones" variant="outline" tone="guinda" full>
            Ver todas las acciones
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
