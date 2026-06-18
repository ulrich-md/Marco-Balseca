import { SectionLabel } from '../../components/ui/SectionLabel'
import { StatCounter } from '../../components/ui/StatCounter'
import { Reveal } from '../../components/ui/Reveal'
import { STATS } from '../../data/site'

/** Banda de credenciales/cifras clave con count-up (placeholders honestos). */
export function StatsBand() {
  return (
    <section className="bg-white py-16 text-ink md:py-20">
      <div className="container-x">
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.4fr] md:items-end">
          <div>
            <SectionLabel num="01" tone="guinda">
              Quién es Marco
            </SectionLabel>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              Abogado y emprendedor con raíces en Tehuacán. Hoy impulsa acciones políticas y de
              comunidad, cerca de la gente.{' '}
              <span className="text-mute">// REEMPLAZAR: bio breve aprobada por el equipo.</span>
            </p>
          </div>

          <Reveal>
            <div className="grid grid-cols-2 gap-8 border-t border-ink/10 pt-8 sm:grid-cols-3">
              {STATS.map((s) => (
                <StatCounter
                  key={s.label}
                  value={s.value}
                  suffix={s.suffix}
                  placeholder={s.placeholder}
                  label={s.label}
                  tone="guinda"
                />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
