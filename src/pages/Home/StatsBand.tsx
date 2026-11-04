import { SectionLabel } from '../../components/ui/SectionLabel'
import { Reveal } from '../../components/ui/Reveal'
import { ButtonLink } from '../../components/ui/Button'
import { ResponsiveImg } from '../../components/ui/ResponsiveImg'
import { GrecaMark } from '../../components/ui/Greca'
import { useParallax } from '../../lib/useParallax'

/** "Quién soy": composición de fotos (retrato en arco + foto en territorio
 *  traslapada) y la biografía. Las cifras viven en la barra del hero. */
export function StatsBand() {
  const smallRef = useParallax<HTMLDivElement>(-40)

  return (
    <section className="relative overflow-hidden bg-white py-24 text-ink md:py-32">
      <div className="container-x">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
          {/* Composición de fotos */}
          <Reveal className="relative mx-auto w-full max-w-[440px] lg:col-span-5 lg:mx-0">
            <div className="arch-sm relative aspect-[4/5] overflow-hidden bg-mist shadow-lift">
              <ResponsiveImg
                src="/assets/portraits/marco-formal.jpg"
                alt="Marco Balseca, retrato"
                width={1065}
                height={1065}
                sizes="(min-width: 1024px) 34vw, 90vw"
                imgClassName="h-full w-full object-cover object-[50%_20%]"
              />
              <div aria-hidden className="arch-sm pointer-events-none absolute inset-3 border border-white/40" />
            </div>
            <div
              ref={smallRef}
              className="absolute -bottom-10 -right-4 w-[46%] sm:-right-10"
            >
              <div className="rotate-3 rounded-md bg-white p-1.5 shadow-lift">
              <div className="aspect-square overflow-hidden rounded-[3px] bg-mist">
                <ResponsiveImg
                  src="/assets/comunidad/comunidad-mercado.jpg"
                  alt="Marco en el mercado de Tehuacán"
                  width={492}
                  height={638}
                  sizes="220px"
                  imgClassName="h-full w-full object-cover"
                />
              </div>
              </div>
            </div>
            <span
              aria-hidden
              className="absolute -left-5 top-10 grid h-14 w-14 place-items-center rounded-full bg-accent text-sand shadow-soft"
            >
              <GrecaMark className="h-7 w-7" />
            </span>
          </Reveal>

          {/* Biografía */}
          <div className="lg:col-span-6 lg:col-start-7">
            <SectionLabel num="01" tone="accent">
              Quién soy
            </SectionLabel>
            <Reveal delay={0.05}>
              <p className="mt-7 border-l-2 border-accent/80 pl-6 text-lg leading-relaxed text-ink/80 md:pl-8">
                Soy Marco Balseca: orgullosamente tehuacanero, abogado y maestro en Administración de
                Empresas, y tercera generación de mi familia dedicada al agua mineral que le dio a
                Tehuacán su nombre y su orgullo. Hoy soy delegado de la Secretaría de Gobernación de la
                microrregión 25, y mi trabajo es en territorio, con un enfoque humanista: recorro las
                colonias, escucho a vecinas y vecinos e impulso acciones de comunidad. Mi manera de
                hacer las cosas es sencilla: escuchar primero, resolver después.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-9 pl-6 md:pl-8">
                <ButtonLink to="/conoceme" tone="accent" variant="outline">
                  Conoce a Marco
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
