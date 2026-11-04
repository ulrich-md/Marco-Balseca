import { SectionLabel } from '../../components/ui/SectionLabel'
import { RevealText } from '../../components/ui/RevealText'
import { Reveal } from '../../components/ui/Reveal'
import { ButtonAnchor } from '../../components/ui/Button'
import { ResponsiveImg } from '../../components/ui/ResponsiveImg'
import { Sticker } from '../../components/ui/Sticker'
import { SOCIAL } from '../../data/site'

/**
 * Franja Momentos / Redes con la pieza social #PuroTehuacán.
 * La imagen ya trae su propio texto: se muestra TAL CUAL (color, sin recortar,
 * object-contain) para no romper su composición.
 */
export function SocialStrip() {
  return (
    <section className="relative overflow-hidden bg-white py-24 text-ink md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(50% 60% at 0% 100%, rgba(230,209,148,0.18), transparent 70%)' }}
      />
      {/* triángulo guinda del cartel detrás de las fotos */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 hidden h-full w-[58%] bg-gradient-to-b from-accent to-accent-deep lg:block"
        style={{ clipPath: 'polygon(18% 0, 100% 0, 100% 100%)' }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* papel de cartel (pliegues + fibras, en gris neutro: no tiñe el blanco) */}
        <img
          src="/assets/generated/poster-papel.webp"
          alt=""
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.28] mix-blend-multiply"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
      </div>
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
            <Sticker
              name="puro-tehuacan"
              alt="#PuroTehuacán en Instagram"
              href={SOCIAL.instagram.url}
              rotate={-9}
              className="-bottom-12 -left-6 z-30 w-36 sm:-left-16 md:w-44"
            />
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
