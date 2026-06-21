import { useState } from 'react'
import { SectionLabel } from '../../components/ui/SectionLabel'
import { RevealText } from '../../components/ui/RevealText'
import { ButtonLink } from '../../components/ui/Button'
import { ReelCard } from '../../components/ui/ReelCard'
import { Lightbox } from '../../components/ui/Lightbox'
import { type Reel } from '../../data/reels'
import { useReels } from '../../lib/useContent'

/** Franja de Reels en Inicio: solo 4; "ver más" lleva a /reels. */
export function ReelsStrip() {
  const [active, setActive] = useState<Reel | null>(null)
  const { reels } = useReels()
  const cuatro = reels.slice(0, 4)

  return (
    <section className="bg-bone py-20 text-ink md:py-28">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel num="04" tone="accent">
              Reels
            </SectionLabel>
            <RevealText
              as="h2"
              text="En sus palabras"
              className="font-display mt-5 text-[12vw] leading-[0.88] text-ink sm:text-6xl lg:text-7xl"
            />
            <p className="mt-4 text-ink/70">
              Momentos en la calle, en directo desde{' '}
              <a
                href="https://www.instagram.com/marcobalseca1/"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-accent underline-offset-4 hover:underline"
              >
                @marcobalseca1
              </a>
              .
            </p>
          </div>
          <div className="hidden md:block">
            <ButtonLink to="/reels" tone="accent" variant="outline">
              Ver todos los reels
            </ButtonLink>
          </div>
        </div>

        <div className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] md:grid md:grid-cols-4 md:overflow-visible">
          {cuatro.map((reel, i) => (
            <div key={reel.id} className="w-[68%] shrink-0 snap-start sm:w-[42%] md:w-auto">
              <ReelCard reel={reel} index={i} onOpen={setActive} />
            </div>
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <ButtonLink to="/reels" tone="accent" variant="outline" full>
            Ver todos los reels
          </ButtonLink>
        </div>
      </div>

      <Lightbox reel={active} onClose={() => setActive(null)} />
    </section>
  )
}
