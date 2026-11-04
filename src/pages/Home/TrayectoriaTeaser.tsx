import { SectionLabel } from '../../components/ui/SectionLabel'
import { RevealText } from '../../components/ui/RevealText'
import { ButtonLink } from '../../components/ui/Button'
import { MapaTrayectoria } from '../../components/ui/MapaTrayectoria'
import { Sticker } from '../../components/ui/Sticker'
import { TRAYECTORIA } from '../../data/trayectoria'

/** Teaser de Trayectoria en Inicio: "El camino, paso a paso" — recorrido sobre
 *  el mapa (Tehuacán → Chiapas → Nacional → Tehuacán) que avanza hito por
 *  hito con el scroll, con toda la información de cada año. */
export function TrayectoriaTeaser() {

  return (
    <section className="relative overflow-x-clip bg-paper py-20 text-ink md:py-20">
      {/* luz dorada cálida en la esquina (decorativo) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(50% 40% at 100% 0%, rgba(230,209,148,0.22), transparent 70%)' }}
        />
      </div>

      <div className="container-x relative z-10">
        <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="relative">
            <SectionLabel num="02" tone="accent">
              Trayectoria
            </SectionLabel>
            <RevealText
              as="h2"
              text={'El camino,\npaso a paso'}
              className="font-display mt-5 text-[14vw] leading-[0.86] text-ink sm:text-7xl lg:text-8xl"
            />
            <Sticker
              name="anos-30"
              alt="30 años"
              rotate={8}
              className="-top-16 right-0 w-20 sm:-right-28 sm:top-6 md:w-32 lg:-right-40 lg:w-36"
            />
          </div>
          <div className="hidden md:block">
            <ButtonLink to="/trayectoria" variant="outline" tone="accent">
              Ver trayectoria
            </ButtonLink>
          </div>
        </div>

      </div>

      <MapaTrayectoria hitos={TRAYECTORIA} />

      <div className="container-x relative z-10 md:hidden">
        <ButtonLink to="/trayectoria" variant="outline" tone="accent" full>
          Ver trayectoria
        </ButtonLink>
      </div>
    </section>
  )
}
