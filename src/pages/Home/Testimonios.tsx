import { SectionLabel } from '../../components/ui/SectionLabel'
import { RevealText } from '../../components/ui/RevealText'
import { Reveal } from '../../components/ui/Reveal'
import { ButtonLink } from '../../components/ui/Button'
import { TESTIMONIOS } from '../../data/testimonios'

/* "Recogiendo los sentimientos de Tehuacán" — voces reales del territorio.
   Reemplaza a la sección de Acciones en el Inicio. Tarjetas editoriales con
   comilla gigante en guinda; los textos son placeholder (ver data). */

function QuoteMark() {
  return (
    <span aria-hidden className="font-display block text-6xl leading-[0.6] text-accent">
      “
    </span>
  )
}

export function Testimonios() {
  return (
    <section className="bg-white py-14 text-ink md:py-28">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <SectionLabel num="03" tone="accent">
              Recogiendo los sentimientos de Tehuacán
            </SectionLabel>
            <RevealText
              as="h2"
              text="Lo que me dice la gente"
              className="font-display mt-5 text-[12vw] leading-[0.88] text-ink sm:text-6xl lg:text-7xl"
            />
            <p className="mt-4 text-ink/70">
              Camino el territorio para escuchar. Esto es lo que vecinas y vecinos me comparten,
              con sus palabras.
            </p>
          </div>
          <div className="hidden md:block">
            <ButtonLink to="/contacto" variant="outline" tone="accent">
              Cuéntame el tuyo
            </ButtonLink>
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIOS.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.08}>
              <figure className="flex h-full flex-col border border-ink/10 bg-bone p-6 transition-colors duration-300 hover:border-accent/40 md:p-7">
                <QuoteMark />
                <blockquote className="mt-4 flex-1 leading-relaxed text-ink/85">
                  {t.texto}
                </blockquote>
                <figcaption className="mt-6 border-t border-ink/10 pt-4">
                  <p className="font-condensed text-lg font-semibold uppercase tracking-wide text-ink">
                    {t.nombre}
                  </p>
                  <p className="mt-0.5 text-sm text-mute">
                    {t.rol ? `${t.rol} · ` : ''}
                    {t.lugar}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <ButtonLink to="/contacto" variant="outline" tone="accent" full>
            Cuéntame el tuyo
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
