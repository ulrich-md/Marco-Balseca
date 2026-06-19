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
        intro="Abogado y emprendedor de Tehuacán, Puebla. Una figura cercana, de carácter recio, que hoy impulsa acciones políticas y de comunidad por su tierra y su gente."
      />

      {/* Bio editorial */}
      <section className="bg-bone py-20 text-ink md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <Reveal>
            {/* REEMPLAZAR: retrato de apoyo (B&N) de @marcobalseca1 */}
            <PortraitPlaceholder className="aspect-[4/5] w-full" tone="grey" frame />
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
                El apellido Balseca tiene arraigo local, con tradición empresarial en Tehuacán.
                Marco creció entendiendo el valor del trabajo, del oficio y de la palabra dada.{' '}
                <span className="text-mute">// REEMPLAZAR: historia de origen verificable.</span>
              </p>
              <p>
                Su formación como abogado y su experiencia como emprendedor le dieron una mirada
                práctica: escuchar primero, resolver después.{' '}
                <span className="text-mute">// REEMPLAZAR: trayectoria profesional real.</span>
              </p>
              <p className="border-l-2 border-accent pl-5 font-condensed text-2xl font-medium uppercase tracking-wide text-ink">
                Su orgullo: las raíces, las lenguas maternas y la gente de Tehuacán.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Marquee tone="dark" />

      {/* Valores / pilares */}
      <section className="bg-white py-20 text-ink md:py-28">
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

      {/* Frase ancla (clara) */}
      <section className="relative overflow-hidden bg-bone py-24 text-ink md:py-32">
        <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-accent/20" />
        <div className="container-x relative text-center">
          <span className="eyebrow text-accent">Por nuestra tierra</span>
          <RevealText
            as="p"
            text={'Cerca de\nla gente'}
            className="font-display mt-5 text-[18vw] leading-[0.86] text-ink md:text-[10vw]"
          />
          <Reveal delay={0.12}>
            <p className="mx-auto mt-5 max-w-xl text-xl text-ink/70">
              La fuerza de quien no olvida de dónde viene y camina con su gente, todos los días.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
