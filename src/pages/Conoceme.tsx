import { Seo } from '../lib/Seo'
import { PageHero } from '../components/layout/PageHero'
import { CtaBand } from '../components/layout/CtaBand'
import { SectionLabel } from '../components/ui/SectionLabel'
import { RevealText } from '../components/ui/RevealText'
import { Reveal } from '../components/ui/Reveal'
import { Marquee } from '../components/ui/Marquee'
import { PortraitPlaceholder } from '../components/ui/PortraitPlaceholder'
import { PILARES } from '../data/site'

export default function Conoceme() {
  return (
    <>
      <Seo
        title="Conóceme"
        path="/conoceme"
        description="Conoce a Marco Balseca: abogado y emprendedor con raíces en Tehuacán, Puebla. Comunidad, raíces y lenguas maternas, trabajo y cercanía."
      />

      <PageHero
        index="02"
        label="Conóceme"
        title={'Marco\nBalseca'}
        intro="Soy abogado y emprendedor de Tehuacán, Puebla, hoy delegado de Gobernación de la microrregión 25. Vengo de una familia de servicio y de trabajo, y dedico mis días a una sola cosa: estar cerca de mi gente."
      />

      {/* Bio editorial */}
      <section className="bg-bone py-20 text-ink md:py-36">
        <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <Reveal>
            {/* Retrato principal. REEMPLAZAR -> si falta, queda el bloque gris (sin imagen rota). */}
            <PortraitPlaceholder
              src="/assets/portraits/marco-formal.jpg"
              alt="Retrato de Marco Balseca"
              className="aspect-[4/5] w-full"
              tone="grey"
              frame
            />
          </Reveal>

          <div>
            <SectionLabel tone="accent">Origen y arraigo</SectionLabel>
            <RevealText
              as="h2"
              text="Raíces en Tehuacán"
              className="font-display mt-5 text-5xl leading-[0.9] text-ink md:text-6xl"
            />
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink/85">
              <p>
                Soy abogado, con maestría en administración (MBA), y emprendedor de Tehuacán,
                Puebla. Vengo de una familia con larga vocación de servicio público y de empresa en
                la ciudad: la nuestra fue una de las casas del agua mineral que le dieron a Tehuacán
                su nombre y su orgullo, junto a marcas como Peñafiel y Garci-Crespo.
              </p>
              <p>
                El servicio lo aprendí en casa. Mi padre, Marco Antonio Balseca Chávez, fue
                presidente municipal de Tehuacán entre 1981 y 1984 —de su gestión es el mural
                emblemático que hoy es orgullo de la ciudad—. De él entendí que servir a Tehuacán no
                es un cargo, sino una forma de vivir.
              </p>
              <p>
                Mi formación como abogado y mi experiencia como emprendedor me dan una mirada
                práctica: escuchar primero, resolver después. Esa cercanía se ve en lo que impulso
                cada semana como delegado de la microrregión 25: deporte que une a las colonias,
                apoyo a las juventudes y a la educación, y jornadas que acercan servicios a las
                familias.
              </p>
              <p>
                Tehuacán es mi casa y mi causa. Lo digo y lo repito en cada colonia que recorro: la
                fuerza de esta ciudad está en su gente, y mientras pueda caminarla, voy a seguir
                haciéndolo a tu lado.
              </p>
              <p className="border-l-2 border-accent pl-5 font-condensed text-2xl font-medium uppercase tracking-wide text-ink">
                La fuerza de Tehuacán está en su gente.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Marquee tone="dark" />

      {/* Valores / pilares */}
      <section className="bg-white py-20 text-ink md:py-36">
        <div className="container-x">
          <SectionLabel tone="accent">Valores que lo mueven</SectionLabel>
          <RevealText
            as="h2"
            text="Cuatro pilares"
            className="font-display mt-5 text-5xl leading-[0.9] text-ink md:text-7xl"
          />

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2">
            {PILARES.map((p, i) => (
              <Reveal key={p.num} delay={i * 0.06} className="bg-white p-8 md:p-10">
                <div className="flex items-start gap-5">
                  <span className="font-display text-4xl text-ink/15">{p.num}</span>
                  <div>
                    <h3 className="font-condensed text-2xl font-semibold uppercase tracking-wide text-accent">
                      {p.titulo}
                    </h3>
                    <p className="mt-3 leading-relaxed text-ink/70">{p.texto}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Frase ancla (clara) con retrato de apoyo */}
      <section className="relative overflow-hidden bg-bone py-20 text-ink md:py-36">
        <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-accent/20" />
        <div className="container-x relative grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            {/* Apoyo. REEMPLAZAR -> si falta, queda el bloque gris (sin imagen rota). */}
            <PortraitPlaceholder
              src="/assets/portraits/marco-corazon-fondo.jpg"
              alt="Marco Balseca con la comunidad"
              tone="grey"
              frame
              className="aspect-[4/3] w-full"
            />
          </Reveal>
          <div>
            <span className="eyebrow text-accent">Por nuestra tierra</span>
            <RevealText
              as="p"
              text={'Cerca de\nla gente'}
              className="font-display mt-5 text-[16vw] leading-[0.86] text-ink sm:text-7xl lg:text-8xl"
            />
            <Reveal delay={0.12}>
              <p className="mt-5 max-w-xl text-xl text-ink/70">
                No olvido de dónde vengo, y por eso camino con mi gente todos los días: de tú a tú,
                en la colonia, donde la vida de verdad sucede.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
