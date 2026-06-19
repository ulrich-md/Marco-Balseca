import { SectionLabel } from '../../components/ui/SectionLabel'
import { RevealText } from '../../components/ui/RevealText'
import { Reveal } from '../../components/ui/Reveal'
import { ButtonLink } from '../../components/ui/Button'
import { PortraitPlaceholder } from '../../components/ui/PortraitPlaceholder'
import { COMUNIDAD, COMUNIDAD_COUNT } from '../../data/site'

/**
 * Galería de comunidad (patrón Community Landing): rostros reales de
 * simpatizantes + contador + onboarding. Aporta cercanía y confianza.
 */
export function ComunidadStrip() {
  return (
    <section className="bg-white py-20 text-ink md:py-28">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel num="05" tone="accent">
              Comunidad
            </SectionLabel>
            <RevealText
              as="h2"
              text={'Ya caminan\ncon Marco'}
              className="font-display mt-5 text-[13vw] leading-[0.86] text-ink sm:text-6xl lg:text-7xl"
            />
          </div>
          <div className="hidden md:block">
            <ButtonLink to="/contacto" tone="accent" variant="solid">
              Súmate
            </ButtonLink>
          </div>
        </div>

        {/* Contador */}
        <Reveal>
          <div className="mt-10 flex flex-wrap items-baseline gap-x-5 gap-y-1 border-y border-ink/15 py-7">
            <span className="font-display text-6xl leading-none text-accent md:text-7xl">
              {COMUNIDAD_COUNT > 0 ? `${COMUNIDAD_COUNT}+` : '[N]'}
            </span>
            <span className="text-lg text-ink/70">
              vecinas y vecinos ya se sumaron al movimiento.{' '}
              <span className="text-mute">// REEMPLAZAR: número real (data/site.ts).</span>
            </span>
          </div>
        </Reveal>

        {/* Rostros */}
        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {COMUNIDAD.map((p, i) => (
            <Reveal key={i} delay={(i % 4) * 0.05}>
              <figure className="group">
                <div className="relative overflow-hidden">
                  {/* REEMPLAZAR: foto B&N real del simpatizante (con consentimiento) */}
                  <PortraitPlaceholder tone="grey" note={false} className="aspect-square w-full" />
                  <span
                    aria-hidden
                    className="absolute bottom-0 left-0 h-1 w-0 bg-accent transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:w-full"
                  />
                </div>
                <figcaption className="mt-3">
                  <p className="font-condensed text-lg font-semibold leading-tight text-ink">{p.rol}</p>
                  <p className="eyebrow mt-1 text-mute">{p.colonia}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <ButtonLink to="/contacto" tone="accent" variant="solid" full>
            Súmate al movimiento
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
