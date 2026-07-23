import { Seo } from '../lib/Seo'
import { PageHero } from '../components/layout/PageHero'
import { CtaBand } from '../components/layout/CtaBand'
import { Reveal } from '../components/ui/Reveal'
import { useTestimonios } from '../lib/useContent'

/* =========================================================================
   TESTIMONIOS — "Recogiendo los sentimientos de Tehuacán".
   Página propia (ya no en la home). Editable desde /admin (pestaña
   Testimonios, con foto opcional); respaldo local si Supabase no está.
   ========================================================================= */

function QuoteMark() {
  return (
    <span aria-hidden className="font-display block text-6xl leading-[0.6] text-accent">
      “
    </span>
  )
}

function Avatar({ nombre, foto }: { nombre: string; foto?: string }) {
  if (foto) {
    return (
      <img
        src={foto}
        alt={`Foto de ${nombre}`}
        loading="lazy"
        decoding="async"
        className="h-12 w-12 shrink-0 rounded-full border border-ink/10 object-cover"
        onError={(e) => {
          e.currentTarget.style.display = 'none'
        }}
      />
    )
  }
  const iniciales = nombre
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
  return (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10 font-condensed text-sm font-bold text-accent">
      {iniciales}
    </span>
  )
}

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

      <section className="bg-bone py-20 text-ink md:py-32">
        <div className="container-x">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonios.map((t, i) => (
              <Reveal key={t.id} delay={(i % 3) * 0.08}>
                <figure className="flex h-full flex-col rounded-sm border border-ink/10 bg-white p-6 shadow-[0_18px_45px_-34px_rgba(22,22,22,0.4)] transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-[0_26px_50px_-30px_rgba(155,34,71,0.4)] md:p-8">
                  <QuoteMark />
                  <blockquote className="mt-4 flex-1 leading-relaxed text-ink/85">
                    {t.texto}
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-ink/10 pt-5">
                    <Avatar nombre={t.nombre} foto={t.foto} />
                    <span>
                      <span className="font-condensed block text-lg font-semibold uppercase leading-tight tracking-wide text-ink">
                        {t.nombre}
                      </span>
                      <span className="mt-0.5 block text-sm text-mute">
                        {t.rol ? `${t.rol} · ` : ''}
                        {t.lugar}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          {testimonios.length === 0 && (
            <p className="py-16 text-center text-mute">Pronto compartiremos más voces del territorio.</p>
          )}
        </div>
      </section>

      <CtaBand />
    </>
  )
}
