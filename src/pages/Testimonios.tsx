import { Seo } from '../lib/Seo'
import { PageHero } from '../components/layout/PageHero'
import { CtaBand } from '../components/layout/CtaBand'
import { OrganicShapes } from '../components/ui/OrganicShapes'
import { StaggerTestimonials } from '../components/ui/StaggerTestimonials'
import { ButtonLink } from '../components/ui/Button'
import { useTestimonios } from '../lib/useContent'

/* =========================================================================
   TESTIMONIOS — "Recogiendo los sentimientos de Tehuacán".
   Carrusel escalonado interactivo (asset adaptado a la identidad guinda)
   sobre crema institucional. Editable desde /admin (pestaña Testimonios);
   respaldo local si Supabase no está.
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

      <PageHero
        index="04"
        label="Recogiendo los sentimientos de Tehuacán"
        title={'Lo que me\ndice la gente'}
        intro="Camino el territorio para escuchar. Estas son las voces de vecinas y vecinos —con sus palabras— que le dan sentido a todo lo que hago."
      />

      <section className="relative overflow-hidden bg-cream py-10 text-ink md:py-16">
        <OrganicShapes tone="light" opacity={0.5} />
        <div className="relative z-10">
          {testimonios.length > 0 ? (
            <StaggerTestimonials items={testimonios} />
          ) : (
            <p className="py-16 text-center text-mute">
              Pronto compartiremos más voces del territorio.
            </p>
          )}
        </div>

        <div className="relative z-10 mt-6 flex justify-center pb-6">
          <ButtonLink to="/contacto" tone="accent" variant="outline">
            Cuéntame el tuyo
          </ButtonLink>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
