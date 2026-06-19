import { useState } from 'react'
import { Seo } from '../lib/Seo'
import { PageHero } from '../components/layout/PageHero'
import { CtaBand } from '../components/layout/CtaBand'
import { Reveal } from '../components/ui/Reveal'
import { ReelCard } from '../components/ui/ReelCard'
import { Lightbox } from '../components/ui/Lightbox'
import { ButtonAnchor } from '../components/ui/Button'
import { REELS, type Reel } from '../data/reels'
import { SOCIAL } from '../data/site'

export default function Reels() {
  const [active, setActive] = useState<Reel | null>(null)

  return (
    <>
      <Seo
        title="Reels"
        path="/reels"
        description="Reels de Marco Balseca: momentos en la calle, con la comunidad. Contenido oficial de @marcobalseca1."
      />

      <PageHero
        index="05"
        label="Reels"
        title="En la calle"
        intro="Video vertical, en directo desde el movimiento. Da clic para reproducir; la galería se enlaza con los reels oficiales de @marcobalseca1."
      >
        <div className="mt-8">
          <ButtonAnchor href={SOCIAL.instagram.url} tone="accent" variant="outline" arrow>
            Seguir en Instagram
          </ButtonAnchor>
        </div>
      </PageHero>

      <section className="bg-white py-20 text-ink md:py-28">
        <div className="container-x">
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {REELS.map((reel, i) => (
              <Reveal key={reel.id} delay={(i % 4) * 0.06}>
                <ReelCard reel={reel} index={i} onOpen={setActive} />
              </Reveal>
            ))}
          </div>

          <p className="mt-12 max-w-2xl text-sm text-mute">
            // REEMPLAZAR: agrega más reels en
            <code className="mx-1 rounded bg-ink/5 px-1.5 py-0.5 text-accent">src/data/reels.ts</code>
            con permalink de Instagram, id de YouTube o un MP4 propio (autoplay en hover).
          </p>
        </div>
      </section>

      <CtaBand />

      <Lightbox reel={active} onClose={() => setActive(null)} />
    </>
  )
}
