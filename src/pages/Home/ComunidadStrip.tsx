import { SectionLabel } from '../../components/ui/SectionLabel'
import { RevealText } from '../../components/ui/RevealText'
import { Reveal } from '../../components/ui/Reveal'
import { ButtonLink } from '../../components/ui/Button'
import { COMUNIDAD, COMUNIDAD_COUNT } from '../../data/site'

/**
 * Galería de comunidad (patrón Community Landing): momentos reales con la
 * gente + contador + onboarding. Aporta cercanía y confianza.
 * Fotos en MASONRY (CSS columns): se muestran TAL CUAL, sin recortar.
 * B&N por coherencia editorial, con color al hover (interacción).
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

        {/* Momentos reales (masonry, sin recortar) */}
        <div className="mt-10 gap-4 [column-fill:balance] sm:columns-2 lg:columns-4">
          {COMUNIDAD.map((p, i) => (
            <Reveal key={i} delay={(i % 4) * 0.05} className="mb-4 break-inside-avoid">
              <figure className="group relative overflow-hidden bg-mist">
                {/* Foto tal cual. REEMPLAZAR -> si falta, queda el bloque gris (sin imagen rota). */}
                <img
                  src={p.foto}
                  alt={`${p.rol} — ${p.colonia}`}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                  className="h-auto w-full grayscale transition-all duration-700 ease-[var(--ease-out-expo)] group-hover:grayscale-0"
                />
                <span
                  aria-hidden
                  className="absolute bottom-0 left-0 z-10 h-1 w-0 bg-accent transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:w-full"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-4 pt-10">
                  <p className="font-condensed text-lg font-semibold leading-tight text-white">{p.rol}</p>
                  <p className="eyebrow mt-1 text-white/70">{p.colonia}</p>
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
