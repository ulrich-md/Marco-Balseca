import { SectionLabel } from '../../components/ui/SectionLabel'
import { StatCounter } from '../../components/ui/StatCounter'
import { Reveal } from '../../components/ui/Reveal'
import { STATS } from '../../data/site'

/** Banda de credenciales/cifras clave con count-up (placeholders honestos). */
export function StatsBand() {
  return (
    <section className="bg-white py-20 text-ink md:py-20">
      <div className="container-x">
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.4fr] md:items-end">
          <div>
            <SectionLabel num="01" tone="accent">
              Quién soy
            </SectionLabel>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">
              Soy Marco Balseca: abogado, con maestría en administración (MBA), y emprendedor con
              raíces hondas en Tehuacán. Vengo de una familia que ayudó a construir el Tehuacán del
              agua mineral y del servicio público. Hoy soy delegado de Gobernación de la microrregión
              25, y mi trabajo es en territorio: recorro las colonias, escucho a vecinas y vecinos e
              impulso acciones de comunidad. Mi manera de hacer las cosas es sencilla: escuchar
              primero, resolver después.
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
                  tone="accent"
                />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
