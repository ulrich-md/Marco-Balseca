import { SectionLabel } from '../../components/ui/SectionLabel'
import { RevealText } from '../../components/ui/RevealText'
import { Reveal } from '../../components/ui/Reveal'
import { ButtonLink } from '../../components/ui/Button'
import { useTestimonios } from '../../lib/useContent'

/* "Recogiendo los sentimientos de Tehuacán" — voces reales del territorio.
   Editable desde /admin (pestaña Testimonios, con foto opcional); con
   respaldo local si Supabase no está. */

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

export function Testimonios() {
  const { testimonios } = useTestimonios()
  return (
    <section className="bg-white py-20 text-ink md:py-36">
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

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonios.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.08}>
              <figure className="flex h-full flex-col border border-ink/10 bg-bone p-6 transition-colors duration-300 hover:border-accent/40 md:p-7">
                <QuoteMark />
                <blockquote className="mt-4 flex-1 leading-relaxed text-ink/85">
                  {t.texto}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-ink/10 pt-4">
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

        <div className="mt-8 md:hidden">
          <ButtonLink to="/contacto" variant="outline" tone="accent" full>
            Cuéntame el tuyo
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
