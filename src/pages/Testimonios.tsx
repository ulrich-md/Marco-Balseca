import { Seo } from '../lib/Seo'
import { CtaBand } from '../components/layout/CtaBand'
import { CoyoteTexture } from '../components/ui/CoyoteTexture'
import { SectionLabel } from '../components/ui/SectionLabel'
import { StaggerTestimonials } from '../components/ui/StaggerTestimonials'
import { ButtonLink } from '../components/ui/Button'
import { useTestimonios } from '../lib/useContent'

/* =========================================================================
   TESTIMONIOS — solo el carrusel escalonado interactivo (asset adaptado a la
   identidad guinda), sobre crema institucional con comilla gigante y formas
   orgánicas de fondo. Editable desde /admin.
   ========================================================================= */

export default function Testimonios() {
  const { testimonios } = useTestimonios()

  return (
    <>
      <Seo
        title="Testimonios"
        path="/testimonios"
        description="Lo que vecinas y vecinos de Tehuacán dicen de Marco Balseca. Voces reales del territorio."
      />

      <section className="relative min-h-screen overflow-hidden bg-cream pt-32 pb-16 text-ink md:pt-40">
        <CoyoteTexture color="#9b2247" opacity={0.06} />
        {/* Comilla gigante decorativa detrás del carrusel */}
        <span
          aria-hidden
          className="font-display pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 select-none text-[42vw] leading-[0.7] text-accent/[0.06] md:top-16 md:text-[26vw]"
        >
          “
        </span>

        <div className="container-x relative z-10 flex flex-col items-center text-center">
          <SectionLabel tone="accent">Voces de Tehuacán · En vivo</SectionLabel>
        </div>

        <div className="relative z-10 mt-8">
          {testimonios.length > 0 ? (
            <StaggerTestimonials items={testimonios} />
          ) : (
            <p className="py-16 text-center text-mute">Pronto compartiremos más voces del territorio.</p>
          )}
        </div>

        <div className="relative z-10 mt-4 flex flex-col items-center gap-6">
          <p className="eyebrow text-mute/70">Arrastra · toca los lados · usa ← →</p>
          <ButtonLink to="/contacto" tone="accent" variant="outline">
            Cuéntame el tuyo
          </ButtonLink>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
