import { useState } from 'react'
import { Seo } from '../lib/Seo'
import { PageHero } from '../components/layout/PageHero'
import { CtaBand } from '../components/layout/CtaBand'
import { Reveal } from '../components/ui/Reveal'
import { VideoEmbed } from '../components/ui/VideoEmbed'
import { ButtonAnchor } from '../components/ui/Button'
import { useReels } from '../lib/useContent'
import { SOCIAL } from '../data/site'
import type { Reel } from '../data/reels'

const INITIAL = 5

/** Grupo de videos (Reels o TikToks): muestra los primeros 5 y revela el resto. */
function VideoGroup({ titulo, videos }: { titulo: string; videos: Reel[] }) {
  const [showAll, setShowAll] = useState(false)
  if (videos.length === 0) return null
  const shown = showAll ? videos : videos.slice(0, INITIAL)
  const resto = videos.length - INITIAL

  return (
    <div>
      <div className="flex items-baseline gap-3">
        <h2 className="font-display text-3xl text-accent sm:text-4xl">{titulo}</h2>
        <span className="eyebrow text-mute">{videos.length}</span>
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((v, i) => (
          <Reveal key={v.id} delay={(i % 3) * 0.06}>
            <VideoEmbed video={v} />
          </Reveal>
        ))}
      </div>
      {resto > 0 && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            aria-expanded={showAll}
            className="font-condensed group inline-flex items-center gap-2 rounded-full border border-accent/40 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-accent transition-colors duration-300 hover:bg-accent hover:text-white"
          >
            {showAll ? 'Ver menos' : `Ver ${resto} más`}
            <span
              aria-hidden
              className={`transition-transform duration-300 ${showAll ? 'rotate-180' : 'group-hover:translate-y-0.5'}`}
            >
              ↓
            </span>
          </button>
        </div>
      )}
    </div>
  )
}

export default function Videos() {
  const { reels } = useReels()
  const igReels = reels.filter((r) => r.kind === 'instagram')
  const tiktoks = reels.filter((r) => r.kind === 'tiktok')

  return (
    <>
      <Seo
        title="Videos"
        path="/reels"
        description="Videos de Marco Balseca: Reels y TikToks en territorio, con la comunidad de Tehuacán."
      />

      <PageHero
        index="05"
        label="Videos"
        title="En territorio"
        compact
        intro="Aquí me ves en territorio, con la gente: atención a vecinos, jornadas y deporte. Reels y TikToks oficiales de Marco, directo desde sus redes."
      >
        <div className="mt-8">
          <ButtonAnchor href={SOCIAL.instagram.url} tone="accent" variant="outline" arrow>
            Seguir en Instagram
          </ButtonAnchor>
        </div>
      </PageHero>

      <section className="bg-white py-20 text-ink md:py-36">
        <div className="container-x space-y-20">
          <VideoGroup titulo="Reels" videos={igReels} />
          <VideoGroup titulo="TikToks" videos={tiktoks} />
        </div>
      </section>

      <CtaBand />
    </>
  )
}
