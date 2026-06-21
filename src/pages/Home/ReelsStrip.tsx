import { SectionLabel } from '../../components/ui/SectionLabel'
import { RevealText } from '../../components/ui/RevealText'
import { ButtonLink } from '../../components/ui/Button'
import { Reveal } from '../../components/ui/Reveal'
import { InstagramEmbed } from '../../components/ui/InstagramEmbed'
import { useReels } from '../../lib/useContent'

/** Franja de Reels en Inicio: 4 reels embebidos; "ver más" lleva a /reels. */
export function ReelsStrip() {
  const { reels } = useReels()
  const cuatro = reels.slice(0, 4)

  return (
    <section className="bg-bone py-14 text-ink md:py-28">
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

        {/* Móvil: carrusel horizontal (swipe) para no apilar 4 embeds altos.
            Desktop: rejilla de 4. */}
        <div className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [-ms-overflow-style:none] [scrollbar-width:none] sm:grid sm:snap-none sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:pb-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden">
          {cuatro.map((reel, i) => (
            <Reveal
              key={reel.id}
              delay={(i % 4) * 0.06}
              className="w-[88vw] max-w-[340px] shrink-0 snap-start sm:w-auto sm:max-w-none"
            >
              <InstagramEmbed url={reel.instagramUrl} titulo={reel.titulo} />
            </Reveal>
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <ButtonLink to="/reels" tone="accent" variant="outline" full>
            Ver todos los reels
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
