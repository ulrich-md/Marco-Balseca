import { SectionLabel } from '../../components/ui/SectionLabel'
import { RevealText } from '../../components/ui/RevealText'
import { Reveal } from '../../components/ui/Reveal'
import { OrganicShapes } from '../../components/ui/OrganicShapes'
import { ButtonAnchor } from '../../components/ui/Button'
import { useNoticias } from '../../lib/useContent'
import { SOCIAL } from '../../data/site'

/* =========================================================================
   "Últimas Noticias" — estilo del sitio del Gobierno del Estado (crema +
   tarjetas blancas con foto, fecha y botón guinda), con nuestra tipografía.
   Editable desde /admin (pestaña Noticias); respaldo local si no hay BD.
   ========================================================================= */

function fmtFecha(iso?: string) {
  if (!iso) return null
  try {
    return new Intl.DateTimeFormat('es-MX', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(`${iso.slice(0, 10)}T00:00:00`))
  } catch {
    return iso
  }
}

export function PrensaStrip() {
  const { noticias } = useNoticias()
  const items = noticias.slice(0, 3)

  return (
    <section className="relative overflow-hidden bg-cream py-20 text-ink md:py-36">
      <OrganicShapes tone="light" opacity={0.55} />
      <div className="container-x relative z-10">
        {/* Encabezado centrado (ref. Armenta) con nuestra tipografía */}
        <div className="flex flex-col items-center text-center">
          <SectionLabel tone="accent">En las noticias</SectionLabel>
          <RevealText
            as="h2"
            text="Últimas Noticias"
            className="font-display mt-5 text-[12vw] leading-[0.9] text-accent sm:text-5xl lg:text-6xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-xl text-ink/70">
              El trabajo en territorio de Marco, contado por la prensa y sus redes.
            </p>
          </Reveal>
        </div>

        {/* Tarjetas de nota */}
        <div className="mx-auto mt-14 grid max-w-5xl gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((n, i) => {
            const fecha = fmtFecha(n.fecha)
            return (
              <Reveal key={n.id} delay={i * 0.08} className={i === 2 ? 'sm:col-span-2 lg:col-span-1' : ''}>
                <article className="group flex h-full flex-col overflow-hidden rounded-md bg-white shadow-[0_18px_45px_-30px_rgba(22,22,22,0.35)] transition-transform duration-300 hover:-translate-y-1">
                  <a href={n.url} target="_blank" rel="noreferrer" className="block overflow-hidden" tabIndex={-1} aria-hidden>
                    {n.imagen ? (
                      <img
                        src={n.imagen}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    ) : (
                      <div className="aspect-[16/10] w-full bg-accent/10" />
                    )}
                  </a>
                  <div className="flex flex-1 flex-col items-center px-6 pb-7 pt-6 text-center">
                    <h3 className="font-condensed text-xl font-semibold leading-snug text-accent-deep">
                      {n.titulo}
                    </h3>
                    {fecha && <p className="mt-3 text-sm text-mute">Publicado: {fecha}</p>}
                    <div className="mt-auto pt-6">
                      <a
                        href={n.url}
                        target="_blank"
                        rel="noreferrer"
                        className="font-condensed inline-block rounded-md bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-accent-deep"
                      >
                        Continúa leyendo
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>

        {/* CTA grande (pill) — como la referencia */}
        <Reveal delay={0.15}>
          <div className="mt-14 flex justify-center">
            <ButtonAnchor href={SOCIAL.facebook.url} tone="accent" variant="solid" arrow>
              Más actividades de Marco Balseca
            </ButtonAnchor>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
