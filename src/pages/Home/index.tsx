import { Seo } from '../../lib/Seo'
import { Marquee } from '../../components/ui/Marquee'
import { CtaBand } from '../../components/layout/CtaBand'
import { Hero } from './Hero'
import { StatsBand } from './StatsBand'
import { TrayectoriaTeaser } from './TrayectoriaTeaser'
import { AccionesTeaser } from './AccionesTeaser'
import { ReelsStrip } from './ReelsStrip'
import { ComunidadStrip } from './ComunidadStrip'
import { SocialStrip } from './SocialStrip'
import { QuoteAncla } from './QuoteAncla'

export default function Home() {
  return (
    <>
      <Seo
        title="Marco Balseca"
        path="/"
        description="Marco Balseca, figura política y comunitaria de Tehuacán, Puebla. Cerca de la gente, por nuestra tierra. Súmate al movimiento."
      />
      <Hero />
      <Marquee tone="dark" />
      <StatsBand />
      <TrayectoriaTeaser />
      <AccionesTeaser />
      <ReelsStrip />
      <ComunidadStrip />
      <SocialStrip />
      <QuoteAncla />
      <CtaBand />
    </>
  )
}
