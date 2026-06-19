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
    <section className="relative overflow-hidden bg-black py-20 text-white md:py-28">
      {/* grano sutil (4KB) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: 'url(/assets/backgrounds/grain.png)', backgroundSize: '420px' }}
      />
      <div className="container-x relative grid items-center gap-10 lg:grid-cols-2">
        <div>
          <SectionLabel tone="bone">Momentos · Redes</SectionLabel>
          <RevealText
            as="h2"
            text="#PuroTehuacán"
            className="font-display mt-5 text-[12vw] leading-[0.9] sm:text-6xl lg:text-7xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-md text-lg text-white/65">
              El día a día del movimiento, en la calle y con la gente. Síguelo en Instagram.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-7">
              <ButtonAnchor href={SOCIAL.instagram.url} tone="bone" variant="solid" arrow>
                Seguir {SOCIAL.instagram.handle}
              </ButtonAnchor>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="relative mx-auto w-full max-w-md">
            <span aria-hidden className="pointer-events-none absolute -inset-2 z-10 border border-accent" />
            {/* Pieza social tal cual (color, sin recortar). REEMPLAZAR -> si falta, no se ve nada (sin imagen rota). */}
            <ResponsiveImg
              src="/assets/social/social-purotehuacan.jpg"
              alt="#PuroTehuacán — Marco Balseca con la comunidad"
              width={485}
              height={486}
              sizes="(min-width: 1024px) 42vw, 92vw"
              imgClassName="block h-auto w-full"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
