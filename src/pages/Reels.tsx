import { Seo } from '../lib/Seo'
import { PageHero } from '../components/layout/PageHero'
import { CtaBand } from '../components/layout/CtaBand'
import { Reveal } from '../components/ui/Reveal'
import { InstagramEmbed } from '../components/ui/InstagramEmbed'
import { ButtonAnchor } from '../components/ui/Button'
import { useReels } from '../lib/useContent'
import { SOCIAL } from '../data/site'

export default function Reels() {
  const { reels } = useReels()

  return (
    <>
      <Seo
        title="Reels"
        path="/reels"
        description="Reels de Marco Balseca: momentos en territorio, con la comunidad. Contenido oficial de @marcobalseca1."
      />

      <PageHero
        index="05"
        label="Reels"
        title="En territorio"
        compact
        intro="Aquí me ves en territorio, con la gente: atención a vecinos, jornadas, deporte y la fiesta del Mundial en Tehuacán. Reels oficiales de @marcobalseca1, directo desde Instagram."
      >
        <div className="mt-8">
          <ButtonAnchor href={SOCIAL.instagram.url} tone="accent" variant="outline" arrow>
            Seguir en Instagram
          </ButtonAnchor>
        </div>
      </PageHero>

      <section className="bg-white py-20 text-ink md:py-36">
        <div className="container-x">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reels.map((reel, i) => (
              <Reveal key={reel.id} delay={(i % 3) * 0.06}>
                <InstagramEmbed url={reel.instagramUrl} titulo={reel.titulo} />
              </Reveal>
            ))}
          </div>

          <p className="mt-12 max-w-2xl text-sm text-mute">
            Reels de{' '}
            <a
              href="https://www.instagram.com/marcobalseca1/"
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              @marcobalseca1
            </a>{' '}
            en Instagram.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
