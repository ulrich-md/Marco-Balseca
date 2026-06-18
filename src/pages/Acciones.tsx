import { Seo } from '../lib/Seo'
import { PageHero } from '../components/layout/PageHero'
import { CtaBand } from '../components/layout/CtaBand'
import { Reveal } from '../components/ui/Reveal'
import { Marquee } from '../components/ui/Marquee'
import { ActionCard } from '../components/ui/ActionCard'
import { ACCIONES } from '../data/acciones'

export default function Acciones() {
  return (
    <>
      <Seo
        title="Acciones y propuestas"
        path="/acciones"
        description="Acciones, causas y propuestas de Marco Balseca para Tehuacán: comunidad, raíces y cultura, economía local, juventud y seguridad."
      />

      <PageHero
        index="04"
        label="Acciones y propuestas"
        title={'Por nuestra\ntierra'}
        intro="Causas, propuestas e iniciativas comunitarias. Una estructura clara, lista para llenarse con el trabajo real de Marco y su equipo."
      />

      <section className="bg-white py-20 text-ink md:py-28">
        <div className="container-x">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ACCIONES.map((a, i) => (
              <Reveal key={a.slug} delay={(i % 3) * 0.06}>
                <ActionCard accion={a} index={i} />
              </Reveal>
            ))}
          </div>

          <p className="mt-12 max-w-2xl text-sm text-mute">
            // REEMPLAZAR: cada tarjeta puede enlazar a una página de detalle por
            <code className="mx-1 rounded bg-ink/5 px-1.5 py-0.5 text-guinda">slug</code>
            con galería, propuestas puntuales y resultados.
          </p>
        </div>
      </section>

      <Marquee tone="dark" />
      <CtaBand />
    </>
  )
}
