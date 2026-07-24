import { RevealText } from '../ui/RevealText'
import { ButtonLink, ButtonAnchor } from '../ui/Button'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal } from '../ui/Reveal'
import { PortraitPlaceholder } from '../ui/PortraitPlaceholder'
import { OrganicShapes } from '../ui/OrganicShapes'
import { SOCIAL } from '../../data/site'

/**
 * Llamado a la acción compartido (cierre de páginas): guinda oscuro
 * institucional con las formas orgánicas del equipo del Gobierno del Estado
 * (mismo lenguaje que el footer), retrato "súmate" y grano sutil.
 */
export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-accent-deep py-20 text-white md:py-36">
      <OrganicShapes />
      {/* Grano de película muy sutil (4KB) al 5% */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: 'url(/assets/backgrounds/grain.png)', backgroundSize: '420px' }}
      />

      <div className="container-x relative grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="text-center lg:text-left">
          <div className="flex justify-center lg:justify-start">
            <SectionLabel tone="bone">Súmate al movimiento</SectionLabel>
          </div>
          <h2 className="font-display mt-6 text-[18vw] leading-[0.84] md:text-[10vw] lg:text-[8vw]">
            <RevealText as="span" text="Vamos" className="block" />
            <RevealText as="span" text="juntos" className="block text-sand" delay={0.12} />
          </h2>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl text-lg text-white/65 lg:mx-0">
              Tu voz, nuestra tierra. Hazte voluntario, organiza tu colonia y caminemos juntos por
              Tehuacán. Aquí me tienes.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <ButtonLink to="/contacto" tone="bone" variant="solid">
                Quiero sumarme
              </ButtonLink>
              <ButtonAnchor href={SOCIAL.instagram.url} tone="bone" variant="outline" arrow>
                Sígueme en Instagram
              </ButtonAnchor>
            </div>
          </Reveal>
        </div>

        {/* Retrato "súmate" (cutout). REEMPLAZAR -> si falta, queda el bloque negro (sin imagen rota). */}
        <Reveal delay={0.1} className="hidden sm:block">
          <PortraitPlaceholder
            src="/assets/portraits/marco-sumate.png"
            alt="Súmate con Marco Balseca"
            tone="black"
            fit="contain"
            shadow
            rounded="rounded-sm"
            className="mx-auto aspect-[4/3] w-full max-w-md lg:max-w-none"
            note={false}
          />
        </Reveal>
      </div>
    </section>
  )
}
