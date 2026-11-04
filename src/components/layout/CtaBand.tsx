import { RevealText } from '../ui/RevealText'
import { ButtonLink, ButtonAnchor } from '../ui/Button'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal } from '../ui/Reveal'
import { ArchPortrait } from '../ui/ArchPortrait'
import { GrecaField } from '../ui/Greca'
import { SOCIAL } from '../../data/site'

/**
 * Llamado a la acción compartido (cierre de páginas): campo guinda con greca
 * dorada tenue y, a la derecha, el ARCO dorado (portal de marca) con el
 * recorte de Marco — ecoa el hero y cierra el recorrido visual.
 */
export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-accent text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(55% 70% at 80% 60%, rgba(148,48,60,0.9), transparent 70%), linear-gradient(180deg, var(--color-accent), var(--color-accent-deep))',
          }}
        />
        <GrecaField color="var(--color-sand)" opacity={0.045} size={64} strokeWidth={2.5} />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'url(/assets/backgrounds/grain.png)', backgroundSize: '420px' }}
        />
      </div>

      <div className="container-x relative grid items-end gap-14 pt-24 md:pt-32 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="pb-0 text-center lg:pb-32 lg:text-left">
          <div className="flex justify-center lg:justify-start">
            <SectionLabel tone="bone">Súmate al movimiento</SectionLabel>
          </div>
          <h2 className="font-display mt-6 text-[18vw] leading-[0.84] md:text-[10vw] lg:text-[8vw]">
            <RevealText as="span" text="Vamos" className="block" />
            <RevealText as="span" text="juntos" className="block text-sand" delay={0.12} />
          </h2>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl text-lg text-white/75 lg:mx-0">
              Tu voz, nuestra tierra. Hazte voluntario, organiza tu colonia y caminemos juntos por
              Tehuacán. Aquí me tienes.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <ButtonLink
                to="/contacto"
                tone="bone"
                variant="solid"
                className="px-9 py-4 shadow-[0_18px_40px_-14px_rgba(0,0,0,0.55)]"
              >
                Quiero sumarme
              </ButtonLink>
              <ButtonAnchor href={SOCIAL.instagram.url} tone="bone" variant="outline" arrow>
                Sígueme en Instagram
              </ButtonAnchor>
            </div>
          </Reveal>
        </div>

        {/* Arco dorado con el recorte de Marco, apoyado en la base de la sección */}
        <Reveal delay={0.1} y={60} className="relative mx-auto w-full max-w-[300px] sm:max-w-[380px] lg:max-w-[440px]">
          <div aria-hidden className="arch pointer-events-none absolute -inset-x-6 -top-6 bottom-0 border border-b-0 border-sand/30" />
          <div aria-hidden className="arch pointer-events-none absolute -inset-x-12 -top-12 bottom-0 border border-b-0 border-sand/15" />
          <ArchPortrait
            cutout="/assets/portraits/marco-hero-cut"
            alt="Súmate con Marco Balseca"
            backdrop="/assets/generated/cta-atardecer-tehuacan.webp"
            tone="marigold"
            className="aspect-[4/5] w-full"
            cutoutClassName="w-[94%]"
          />
        </Reveal>
      </div>
    </section>
  )
}
