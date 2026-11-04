import { SectionLabel } from '../../components/ui/SectionLabel'
import { RevealText } from '../../components/ui/RevealText'
import { ButtonLink } from '../../components/ui/Button'
import { CaminoTimeline } from '../../components/ui/CaminoTimeline'
import { Sticker } from '../../components/ui/Sticker'
import { TRAYECTORIA } from '../../data/trayectoria'

/** Teaser de Trayectoria en Inicio: "El camino, paso a paso" — un camino que
 *  se dibuja con el scroll entre 5 hitos del arco completo (del inicio a hoy)
 *  y enlace a la página con los 10. */
const PICK = [0, 2, 3, 7, 9]

export function TrayectoriaTeaser() {
  const hitos = PICK.map((i) => TRAYECTORIA[i]).filter(Boolean)

  return (
    <section className="relative overflow-x-clip bg-paper py-24 text-ink md:py-32">
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
              className="-right-4 -top-6 w-24 sm:-right-28 sm:top-6 md:w-32 lg:-right-40 lg:w-36"
            />
          </div>
          <div className="hidden md:block">
            <ButtonLink to="/trayectoria" variant="outline" tone="accent">
              Ver trayectoria
            </ButtonLink>
          </div>
        </div>

        <div className="mt-16 md:mt-20">
          <CaminoTimeline hitos={hitos} />
        </div>

        <div className="mt-14 flex justify-center">
          <ButtonLink to="/trayectoria" variant="solid" tone="accent">
            Ver trayectoria
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
