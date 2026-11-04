import { SectionLabel } from '../../components/ui/SectionLabel'
import { RevealText } from '../../components/ui/RevealText'
import { Reveal } from '../../components/ui/Reveal'
import { ButtonAnchor } from '../../components/ui/Button'
import { ResponsiveImg } from '../../components/ui/ResponsiveImg'
import { SOCIAL } from '../../data/site'

/**
 * Franja Momentos / Redes con la pieza social #PuroTehuacán.
 * La imagen ya trae su propio texto: se muestra TAL CUAL (color, sin recortar,
 * object-contain) para no romper su composición.
 */
export function SocialStrip() {
  return (
    <section className="grain relative overflow-hidden bg-cream py-24 text-ink [--grain:0.05] md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-full lg:w-1/2"
        style={{ background: 'radial-gradient(60% 60% at 60% 50%, rgba(113,25,36,0.10), transparent 70%)' }}
      />
      <div className="container-x relative z-10 grid items-center gap-16 lg:grid-cols-2">
        <div>
          <SectionLabel tone="accent">Momentos · Redes</SectionLabel>
          <RevealText
            as="h2"
            text="#PuroTehuacán"
            className="font-display mt-5 text-[12vw] leading-[0.9] text-accent sm:text-6xl lg:text-7xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-md text-lg text-ink/70">
              Así vivo el día a día: en territorio, con la gente, colonia por colonia. Sígueme en
              Instagram y caminemos juntos.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-7">
              <ButtonAnchor href={SOCIAL.instagram.url} tone="accent" variant="solid" arrow>
                Seguir {SOCIAL.instagram.handle}
              </ButtonAnchor>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="relative mx-auto w-full max-w-md">
            {/* Pila de fotos (profundidad): dos momentos reales detrás de la pieza */}
            <div aria-hidden className="absolute -left-6 top-8 w-[62%] -rotate-[8deg] rounded-md bg-white p-1.5 shadow-soft sm:-left-14">
              <img
                src="/assets/acciones/accion-educacion-sm.webp"
                alt=""
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full rounded-[3px] object-cover"
              />
            </div>
            <div aria-hidden className="absolute -right-4 -top-6 w-[52%] rotate-[7deg] rounded-md bg-white p-1.5 shadow-soft sm:-right-12">
              <img
                src="/assets/comunidad/comunidad-visita-sm.webp"
                alt=""
                loading="lazy"
                decoding="async"
                className="aspect-square w-full rounded-[3px] object-cover"
              />
            </div>
            {/* Pieza social tal cual (color, sin recortar). REEMPLAZAR -> si falta, no se ve nada (sin imagen rota). */}
            <div className="relative rotate-[-1.5deg] rounded-md bg-white p-2 shadow-lift">
            <ResponsiveImg
              src="/assets/social/social-purotehuacan.jpg"
              alt="#PuroTehuacán — Marco Balseca con la comunidad"
              width={485}
              height={486}
              sizes="(min-width: 1024px) 42vw, 92vw"
              imgClassName="block h-auto w-full rounded-[3px]"
            />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
