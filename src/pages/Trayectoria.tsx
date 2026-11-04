import { Seo } from '../lib/Seo'
import { PageHero } from '../components/layout/PageHero'
import { CtaBand } from '../components/layout/CtaBand'
import { SectionLabel } from '../components/ui/SectionLabel'
import { CaminoTimeline } from '../components/ui/CaminoTimeline'
import { TRAYECTORIA } from '../data/trayectoria'

export default function Trayectoria() {
  return (
    <>
      <Seo
        title="Trayectoria"
        path="/trayectoria"
        description="La trayectoria de Marco Balseca: hitos de su camino político y comunitario en Tehuacán, Puebla."
      />

      <PageHero
        index="03"
        label="Trayectoria"
        title={'El camino'}
        image="/assets/comunidad/comunidad-cancha.webp"
        imageAlt="Marco en la cancha del barrio"
        intro="De las raíces del agua mineral al trabajo en territorio de hoy. Este es el camino que me trajo hasta aquí, contado con honestidad: de dónde vengo, qué aprendí y por qué sigo caminando Tehuacán."
      />

      {/* === El camino, paso a paso: se dibuja con el scroll === */}
      <section className="relative overflow-x-clip bg-paper py-20 text-ink md:py-28">
        <div className="container-x">
          <SectionLabel tone="accent">Línea de tiempo</SectionLabel>
          <div className="mt-14">
            <CaminoTimeline hitos={TRAYECTORIA} />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
