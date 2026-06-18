import { Seo } from '../../lib/Seo'
import { Marquee } from '../../components/ui/Marquee'
import { CtaBand } from '../../components/layout/CtaBand'
import { Hero } from './Hero'
import { StatsBand } from './StatsBand'
import { TrayectoriaTeaser } from './TrayectoriaTeaser'
import { AccionesTeaser } from './AccionesTeaser'
import { ReelsStrip } from './ReelsStrip'
import { QuoteAncla } from './QuoteAncla'

export default function Home() {
  return (
    <>
      <Seo
        title="Marco Balseca"
        path="/"
        description="Marco Balseca, figura política y comunitaria de Tehuacán, Puebla. Tiui Chikavak — Vámonos recio. Por nuestra tierra y nuestra gente."
      />
      <Hero />
      <Marquee tone="guinda" />
      <StatsBand />
      <TrayectoriaTeaser />
      <AccionesTeaser />
      <ReelsStrip />
      <QuoteAncla />
      <CtaBand />
    </>
  )
}
