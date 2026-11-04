import { SectionLabel } from '../../components/ui/SectionLabel'
import { RevealText } from '../../components/ui/RevealText'
import { ButtonLink } from '../../components/ui/Button'
import { Reveal } from '../../components/ui/Reveal'
import { VideoEmbed } from '../../components/ui/VideoEmbed'
import { useReels } from '../../lib/useContent'

/** Franja de Reels en Inicio: 4 reels embebidos; "ver más" lleva a /reels. */
export function ReelsStrip() {
  const { reels } = useReels()
  const cuatro = reels.slice(0, 4)

  return (
    <section className="grain relative overflow-hidden bg-ink py-24 text-white [--grain:0.06] md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(45% 55% at 0% 0%, rgba(113,25,36,0.55), transparent 70%), radial-gradient(40% 50% at 100% 100%, rgba(165,127,44,0.18), transparent 70%)',
        }}
      />
      <div className="container-x relative z-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel num="04" tone="bone">
              Videos
            </SectionLabel>
            <RevealText
              as="h2"
              text="En sus palabras"
              className="font-display mt-5 text-[12vw] leading-[0.88] text-white sm:text-6xl lg:text-7xl"
            />
            <p className="mt-4 text-white/65">
              Momentos en territorio, en directo desde{' '}
              <a
                href="https://www.instagram.com/marcobalseca1/"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-sand underline-offset-4 hover:underline"
              >
                @marcobalseca1
              </a>
              .
            </p>
          </div>
          <div className="hidden md:block">
            <ButtonLink to="/reels" tone="bone" variant="outline">
              Ver todos los videos
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
              <VideoEmbed video={reel} index={i} theme="dark" />
            </Reveal>
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <ButtonLink to="/reels" tone="bone" variant="outline" full>
            Ver todos los reels
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
