import { Link, useParams } from 'react-router-dom'
import { Seo } from '../lib/Seo'
import { CtaBand } from '../components/layout/CtaBand'
import { SectionLabel } from '../components/ui/SectionLabel'
import { RevealText } from '../components/ui/RevealText'
import { Reveal } from '../components/ui/Reveal'
import { ResponsiveImg } from '../components/ui/ResponsiveImg'
import { ButtonLink } from '../components/ui/Button'
import { useAcciones } from '../lib/useContent'

export default function AccionDetalle() {
  const { slug } = useParams()
  const { acciones, loading } = useAcciones()
  const accion = acciones.find((a) => a.slug === slug || a.id === slug)

  // Cargando desde Supabase y aún no aparece: muestra placeholder, no "no existe".
  if (!accion && loading) {
    return <div className="min-h-[70vh] bg-white" />
  }

  if (!accion) {
    return (
      <section className="bg-white pt-40 pb-28 text-ink">
        <div className="container-x text-center">
          <SectionLabel tone="accent" className="justify-center">
            Acciones y propuestas
          </SectionLabel>
          <h1 className="font-display mt-6 text-5xl text-ink">No encontramos esa acción</h1>
          <p className="mt-4 text-ink/70">Quizá cambió de lugar. Mira todas las acciones aquí.</p>
          <div className="mt-8 flex justify-center">
            <ButtonLink to="/acciones" tone="accent" variant="solid" arrow>
              Ver acciones y propuestas
            </ButtonLink>
          </div>
        </div>
      </section>
    )
  }

  const parrafos = (accion.detalle || accion.resumen).split('\n').filter((p) => p.trim())

  return (
    <>
      <Seo title={accion.titulo} path={`/acciones/${accion.slug}`} description={accion.resumen} />

      <section className="relative overflow-hidden bg-white pt-32 pb-12 text-ink md:pt-40">
        <div className="container-x">
          <Link
            to="/acciones"
            className="eyebrow inline-flex items-center gap-2 text-mute transition-colors hover:text-accent"
          >
            ← Acciones y propuestas
          </Link>

          <div className="mt-6">
            <SectionLabel tone="accent">{accion.categoria}</SectionLabel>
          </div>
          <RevealText
            as="h1"
            text={accion.titulo}
            onMount
            className="font-display mt-5 max-w-4xl text-[12vw] leading-[0.92] text-ink sm:text-6xl lg:text-7xl"
          />
        </div>
      </section>

      <section className="bg-white pb-20 text-ink md:pb-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <Reveal className="order-2 lg:order-1">
            <div className="space-y-5 text-lg leading-relaxed text-ink/85">
              {parrafos.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-10 border-t border-ink/10 pt-8">
              <p className="font-condensed text-xl font-semibold uppercase tracking-wide text-ink">
                ¿Quieres esto en tu colonia?
              </p>
              <p className="mt-2 max-w-md text-ink/70">
                Escríbeme y lo organizamos juntos. Cada acción nace en la calle, contigo.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <ButtonLink to="/contacto" tone="accent" variant="solid" arrow>
                  Súmate
                </ButtonLink>
                <ButtonLink to="/acciones" tone="ink" variant="outline">
                  Ver todas
                </ButtonLink>
              </div>
            </div>
          </Reveal>

          {accion.imagen && (
            <Reveal className="order-1 lg:order-2">
              <div className="relative overflow-hidden rounded-sm">
                <ResponsiveImg
                  src={accion.imagen}
                  alt={accion.titulo}
                  sizes="(min-width: 1024px) 42vw, 94vw"
                  imgClassName="block w-full object-cover"
                />
                <span aria-hidden className="pointer-events-none absolute inset-3 border border-accent" />
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <CtaBand />
    </>
  )
}
