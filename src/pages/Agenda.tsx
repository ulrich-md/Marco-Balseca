import { Seo } from '../lib/Seo'
import { PageHero } from '../components/layout/PageHero'
import { CtaBand } from '../components/layout/CtaBand'
import { Reveal } from '../components/ui/Reveal'
import { PinIcon } from '../components/ui/Icons'
import { ButtonAnchor } from '../components/ui/Button'
import { useEventos } from '../lib/useContent'

function parseDate(iso: string) {
  const d = new Date(`${iso}T00:00:00`)
  return {
    dia: new Intl.DateTimeFormat('es-MX', { day: '2-digit' }).format(d),
    mes: new Intl.DateTimeFormat('es-MX', { month: 'short' }).format(d).replace('.', ''),
    anio: new Intl.DateTimeFormat('es-MX', { year: 'numeric' }).format(d),
    dow: new Intl.DateTimeFormat('es-MX', { weekday: 'long' }).format(d),
  }
}

export default function Agenda() {
  // Eventos desde Supabase (editables en /admin) con respaldo local.
  const { eventos } = useEventos()

  return (
    <>
      <Seo
        title="Agenda"
        path="/agenda"
        description="Agenda y eventos de Marco Balseca: recorridos, encuentros y giras comunitarias en Tehuacán, Puebla."
      />

      <PageHero
        index="06"
        label="Agenda y eventos"
        title={'Nos vemos\nen la calle'}
        intro="Aquí te comparto mis próximos recorridos, encuentros y jornadas por las colonias de Tehuacán. Las fechas marcadas como tentativas las confirmo en cuanto cierro sede y hora: nos vemos en la calle."
      />

      <section className="bg-bone py-16 text-ink md:py-24">
        <div className="container-x">
          <ul className="divide-y divide-ink/10 border-y border-ink/10">
            {eventos.map((ev, i) => {
              const d = parseDate(ev.fechaISO)
              const confirmado = ev.estado === 'confirmado'
              return (
                <Reveal as="li" key={ev.id} delay={i * 0.05}>
                  <div className="group grid items-center gap-6 py-8 md:grid-cols-[auto_1fr_auto] md:gap-10">
                    {/* Fecha */}
                    <div className="flex items-center gap-4 md:w-44">
                      <span className="font-display text-6xl leading-none text-ink">{d.dia}</span>
                      <div className="font-condensed uppercase leading-tight">
                        <span className="block text-lg font-semibold tracking-wide text-accent">
                          {d.mes}
                        </span>
                        <span className="block text-sm text-mute">{d.anio}</span>
                        <span className="block text-xs capitalize text-mute">{d.dow}</span>
                      </div>
                    </div>

                    {/* Detalle */}
                    <div>
                      <div
                        className={`mb-2 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest ${
                          confirmado
                            ? 'border-accent/40 bg-accent/10 text-accent'
                            : 'border-mute/30 bg-ink/5 text-mute'
                        }`}
                      >
                        {confirmado ? 'Confirmado' : 'Tentativa'}
                      </div>
                      <h2 className="font-condensed text-2xl font-semibold leading-tight text-ink transition-colors group-hover:text-accent md:text-3xl">
                        {ev.titulo}
                      </h2>
                      <p className="mt-1.5 flex items-center gap-1.5 text-sm text-accent">
                        <PinIcon className="h-4 w-4" />
                        {ev.lugar}
                      </p>
                      <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink/70">
                        {ev.descripcion}
                      </p>
                    </div>

                    {/* CTA */}
                    <div className="md:justify-self-end">
                      <ButtonAnchor
                        href={ev.cta?.url ?? '#'}
                        external={false}
                        tone="accent"
                        variant="outline"
                        arrow
                        className="px-6 py-2.5 text-xs"
                      >
                        {ev.cta?.label ?? 'Quiero ir'}
                      </ButtonAnchor>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </ul>

          <p className="mt-10 text-sm text-mute">
            Los eventos se actualizarán con fechas y sedes reales en cuanto estén confirmados.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
