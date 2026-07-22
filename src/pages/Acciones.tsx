import { Seo } from '../lib/Seo'
import { PageHero } from '../components/layout/PageHero'
import { CtaBand } from '../components/layout/CtaBand'
import { Reveal } from '../components/ui/Reveal'
import { Marquee } from '../components/ui/Marquee'
import { ActionCard } from '../components/ui/ActionCard'
import { useAcciones } from '../lib/useContent'

export default function Acciones() {
  const { acciones } = useAcciones()
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
        intro="Estos son los ejes que trabajo cada semana en Tehuacán: deporte que une, educación para las juventudes, obra cercana, economía local y seguridad con prevención. Cosas concretas, hechas de tú a tú."
      />

      <section className="bg-white py-20 text-ink md:py-36">
        <div className="container-x">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {acciones.map((a, i) => (
              <Reveal key={a.id} delay={(i % 3) * 0.06}>
                <ActionCard accion={a} index={i} />
              </Reveal>
            ))}
          </div>

          <p className="mt-12 max-w-2xl text-sm text-mute">
            Cada acción nace en la calle, escuchando a las familias. Si quieres que llevemos alguna
            de estas iniciativas a tu colonia, escríbeme y la organizamos juntos.
          </p>
        </div>
      </section>

      <Marquee tone="dark" />
      <CtaBand />
    </>
  )
}
