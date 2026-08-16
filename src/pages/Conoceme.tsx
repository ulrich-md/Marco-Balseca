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
        description="Conoce a Marco Balseca: orgullosamente tehuacanero, abogado y maestro en Administración de Empresas, tercera generación en el agua mineral y delegado de la Secretaría de Gobernación de la microrregión 25."
      />

      <PageHero
        index="02"
        label="Conóceme"
        title={'Marco\nBalseca'}
        intro="Orgullosamente tehuacanero. Abogado y maestro en Administración de Empresas, tercera generación de mi familia en el agua mineral, hoy delegado de la Secretaría de Gobernación de la microrregión 25, con un enfoque humanista y de territorio."
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
              text="Orgullosamente tehuacanero"
              className="font-display mt-5 text-5xl leading-[0.9] text-ink md:text-6xl"
            />
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink/85">
              <p>
                Soy orgullosamente tehuacanero. Nací el 31 de enero de 1979 en el hermoso estado de
                Puebla, y he tenido la fortuna de caminar el valle y mi región desde los quince años
                de edad.
              </p>
              <p>
                Estudié la carrera de Derecho y la maestría en Administración de Empresas. Soy,
                además, la tercera generación de mi familia dedicada al embotellamiento de agua
                mineral, la industria que le dio a Tehuacán su nombre y su orgullo.
              </p>
              <p>
                Actualmente me desempeño como delegado de la Secretaría de Gobernación de la
                microrregión 25, con cabecera en Tehuacán, con un enfoque humanista y de territorio.
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
