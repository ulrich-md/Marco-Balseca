import { Seo } from '../lib/Seo'
import { CtaBand } from '../components/layout/CtaBand'
import { SectionLabel } from '../components/ui/SectionLabel'
import { TestimonialGallery } from '../components/ui/TestimonialGallery'
import { ButtonLink } from '../components/ui/Button'
import { useTestimonios } from '../lib/useContent'

/* =========================================================================
   TESTIMONIOS — galería de tarjetas flotantes "en la pared": cada voz es una
   tarjeta con aura de color (guinda / dorado póster), la cita y la foto del
   lugar fundiéndose desde abajo. Editable desde /admin.
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

      <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-paper to-[#ece9e2] pt-32 pb-16 text-ink md:pt-40">
        {/* Comilla gigante decorativa detrás de la galería */}
        <span
          aria-hidden
          className="font-display pointer-events-none absolute right-[4%] top-16 select-none text-[42vw] leading-[0.7] text-accent/[0.05] md:text-[26vw]"
        >
          “
        </span>
        {/* "piso" de la pared: sombra horizontal suave bajo las tarjetas */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[34%]"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(22,22,22,0.05))' }}
        />

        <div className="container-x relative z-10 flex flex-wrap items-center justify-between gap-4">
          <SectionLabel tone="accent">Voces de Tehuacán · En vivo</SectionLabel>
          <p className="eyebrow hidden text-mute/80 sm:block">Arrastra · toca los lados · usa ← →</p>
        </div>

        <div className="relative z-10 mt-10">
          {testimonios.length > 0 ? (
            <TestimonialGallery items={testimonios} />
          ) : (
            <p className="py-16 text-center text-mute">Pronto compartiremos más voces del territorio.</p>
          )}
        </div>

        {/* Bloque inferior (ref. "Stories"): sello de color + CTA */}
        <div className="container-x relative z-10 mt-6 flex items-center gap-5">
          <span
            aria-hidden
            className="h-11 w-11 shrink-0 rounded-md bg-gradient-to-br from-accent to-marigold shadow-[4px_4px_0_0_var(--color-ink)]"
          />
          <ButtonLink to="/contacto" tone="accent" variant="outline">
            Cuéntame el tuyo
          </ButtonLink>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
