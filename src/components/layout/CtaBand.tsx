import { RevealText } from '../ui/RevealText'
import { ButtonLink, ButtonAnchor } from '../ui/Button'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal } from '../ui/Reveal'
import { SOCIAL } from '../../data/site'

/** Llamado a la acción compartido (cierre de páginas): Súmate al movimiento. */
export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-guinda py-20 text-bone md:py-28">
      <div className="bg-grain absolute inset-0 opacity-50" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[8%] bottom-[-40%] h-[90%] w-[55%] rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgba(217,199,168,0.12), transparent)' }}
      />
      <div className="container-x relative text-center">
        <div className="flex justify-center">
          <SectionLabel tone="bone">Súmate al movimiento</SectionLabel>
        </div>
        <RevealText
          as="h2"
          text={'Vámonos\nrecio'}
          className="font-display mx-auto mt-6 text-[18vw] leading-[0.84] md:text-[10vw]"
        />
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl text-lg text-bone/75">
            Tu voz, nuestra tierra. Sé voluntario, organiza tu colonia y camina con Marco por
            Tehuacán.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <ButtonLink to="/contacto" tone="bone" variant="solid">
              Quiero sumarme
            </ButtonLink>
            <ButtonAnchor href={SOCIAL.whatsapp.url} tone="bone" variant="outline" arrow>
              Escríbenos por WhatsApp
            </ButtonAnchor>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
