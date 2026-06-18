import { RevealText } from '../ui/RevealText'
import { ButtonLink, ButtonAnchor } from '../ui/Button'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal } from '../ui/Reveal'
import { SOCIAL } from '../../data/site'

/** Llamado a la acción compartido (cierre de páginas): negro + acento guinda. */
export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-black py-20 text-white md:py-28">
      <div className="container-x relative text-center">
        <div className="flex justify-center">
          <SectionLabel tone="bone">Súmate al movimiento</SectionLabel>
        </div>
        <h2 className="font-display mx-auto mt-6 text-[18vw] leading-[0.84] md:text-[10vw]">
          <RevealText as="span" text="Vámonos" className="block" />
          <RevealText as="span" text="recio" className="block text-guinda" delay={0.12} />
        </h2>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/65">
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
