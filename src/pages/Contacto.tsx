import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Seo } from '../lib/Seo'
import { PageHero } from '../components/layout/PageHero'
import { Button, ButtonAnchor, ButtonLink } from '../components/ui/Button'
import { SectionLabel } from '../components/ui/SectionLabel'
import { ResponsiveImg } from '../components/ui/ResponsiveImg'
import {
  InstagramIcon,
  FacebookIcon,
  XIcon,
  WhatsappIcon,
  MailIcon,
  PinIcon,
} from '../components/ui/Icons'
import { supabaseEnabled, sbInsert } from '../lib/supabase'
import { SITE, SOCIAL } from '../data/site'

/* =========================================================================
   CONTACTO — editorial, accesible y FUNCIONAL.
   El envío es real: si Supabase está conectado, guarda el mensaje en la tabla
   `mensajes` (política solo-inserción: el público envía pero NO puede leer →
   los datos personales quedan privados). Si no, abre el correo del visitante
   ya prellenado (mailto). Nunca es un envío "simulado".
   ========================================================================= */

type Fields = {
  nombre: string
  correo: string
  telefono: string
  lugar: string
  mensaje: string
}
type Errors = Partial<Record<keyof Fields, string>>

const EMPTY: Fields = { nombre: '', correo: '', telefono: '', lugar: '', mensaje: '' }

const MOTIVOS = [
  { key: 'voluntario', label: 'Quiero ser voluntario', ph: '¿En qué colonia y cómo te gustaría ayudar? Cuéntame.' },
  { key: 'colonia', label: 'Algo en mi colonia', ph: '¿Qué está pasando y en dónde? Dame los detalles para apoyarte.' },
  { key: 'invitar', label: 'Invitar a Marco', ph: '¿Qué evento es, qué día y en dónde? Con gusto lo vemos.' },
  { key: 'saludar', label: 'Solo saludar', ph: 'Escríbeme lo que quieras contarme. Te leo.' },
] as const

function validate(f: Fields): Errors {
  const e: Errors = {}
  if (!f.nombre.trim()) e.nombre = 'Dime tu nombre.'
  if (!f.correo.trim()) e.correo = 'Necesito tu correo para responderte.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.correo)) e.correo = 'Ese correo no parece válido.'
  if (f.telefono && !/^[\d\s()+-]{7,}$/.test(f.telefono)) e.telefono = 'Ese teléfono no parece válido.'
  if (!f.mensaje.trim()) e.mensaje = 'Escríbeme tu mensaje.'
  return e
}

const inputBase =
  'w-full rounded-sm border bg-white px-4 py-3 text-ink placeholder:text-mute/55 transition-colors focus:border-accent focus:outline-none focus-visible:outline-none'

const hasWhats = SOCIAL.whatsapp.url !== '#'

/* --- iconos finos para señales de confianza --- */
const ClockIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
    <path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6l7-3z" strokeLinejoin="round" />
    <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const HeartIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
    <path d="M12 20s-7-4.4-7-9.5A3.8 3.8 0 0 1 12 7a3.8 3.8 0 0 1 7 3.5C19 15.6 12 20 12 20z" strokeLinejoin="round" />
  </svg>
)

export default function Contacto() {
  const [fields, setFields] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle')
  const [motivo, setMotivo] = useState<string>('')
  const [via, setVia] = useState<'db' | 'mail'>('db')
  const [hp, setHp] = useState('') // honeypot anti-spam (oculto)

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((p) => ({ ...p, [k]: e.target.value }))
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }))
  }

  const motivoLabel = MOTIVOS.find((m) => m.key === motivo)?.label
  const mensajePh = MOTIVOS.find((m) => m.key === motivo)?.ph ?? '¿Cómo te quieres sumar? Cuéntame.'

  const buildMailto = () => {
    const asunto = motivoLabel ? `Contacto web — ${motivoLabel}` : 'Contacto desde el sitio'
    const cuerpo = [
      `Nombre: ${fields.nombre}`,
      `Correo: ${fields.correo}`,
      fields.telefono ? `Teléfono: ${fields.telefono}` : '',
      fields.lugar ? `Colonia / Municipio: ${fields.lugar}` : '',
      motivoLabel ? `Motivo: ${motivoLabel}` : '',
      '',
      fields.mensaje,
    ]
      .filter(Boolean)
      .join('\n')
    return `mailto:${SOCIAL.email.value}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (hp) {
      // Un bot llenó el campo trampa: fingimos éxito y no enviamos nada.
      setStatus('success')
      return
    }
    const errs = validate(fields)
    setErrors(errs)
    if (Object.keys(errs).length) {
      document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
      return
    }

    setStatus('sending')
    let stored = false
    if (supabaseEnabled) {
      try {
        await sbInsert('mensajes', {
          nombre: fields.nombre.trim(),
          correo: fields.correo.trim(),
          telefono: fields.telefono.trim() || null,
          lugar: fields.lugar.trim() || null,
          motivo: motivoLabel ?? null,
          mensaje: fields.mensaje.trim(),
        })
        stored = true
      } catch {
        stored = false
      }
    }
    if (!stored) {
      // Respaldo real: abre el correo del visitante con todo prellenado.
      setVia('mail')
      window.location.href = buildMailto()
    } else {
      setVia('db')
    }
    setStatus('success')
  }

  const reset = () => {
    setFields(EMPTY)
    setErrors({})
    setMotivo('')
    setStatus('idle')
  }

  const fieldErr = (k: keyof Fields) =>
    errors[k] ? (
      <span id={`err-${k}`} role="alert" className="mt-1.5 block text-sm font-medium text-accent">
        {errors[k]}
      </span>
    ) : null

  const aria = (k: keyof Fields) => ({
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': errors[k] ? `err-${k}` : undefined,
    className: `${inputBase} ${errors[k] ? 'border-accent' : 'border-ink/15'}`,
  })

  return (
    <>
      <Seo
        title="Contacto y súmate"
        path="/contacto"
        description="Contacta a Marco Balseca y súmate al movimiento. Correo, redes y voluntariado. Tehuacán, Puebla."
      />

      <PageHero
        index="07"
        label="Contacto · Súmate"
        title={'Hablemos,\nde tú a tú'}
        compact
        intro="Tu voz mueve a Tehuacán. Déjame un mensaje, hazte voluntario o invítame a tu colonia. Te leo y te respondo personalmente: aquí me tienes."
      >
        <div aria-hidden className="pointer-events-none absolute bottom-0 right-0 hidden h-[90%] w-[34%] lg:block">
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(60% 55% at 62% 78%, rgba(22,22,22,0.10), transparent 70%)',
            }}
          />
          <ResponsiveImg
            src="/assets/portraits/marco-fuerza.png"
            alt=""
            decorative
            sizes="34vw"
            imgClassName="absolute bottom-0 right-0 h-full w-auto max-w-full object-contain object-bottom drop-shadow-[0_22px_45px_rgba(0,0,0,0.28)]"
          />
        </div>
      </PageHero>

      <section className="bg-bone py-20 text-ink md:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* ===================== FORMULARIO ===================== */}
          <div>
            <SectionLabel tone="accent">Escríbeme</SectionLabel>
            <h2 className="font-condensed mt-4 text-3xl font-semibold uppercase leading-none tracking-tight text-ink sm:text-4xl">
              Cuéntame cómo te sumas
            </h2>

            <div className="relative mt-7">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="rounded-sm border border-accent/25 bg-white p-8 text-center"
                    role="status"
                    aria-live="polite"
                  >
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white">
                      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="m5 12 5 5 9-11" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <h3 className="font-display mt-5 text-3xl text-accent">
                      ¡Gracias, {fields.nombre || 'compa'}!
                    </h3>
                    <p className="mx-auto mt-2 max-w-md text-mute">
                      {via === 'mail'
                        ? 'Abrí tu correo con el mensaje listo para que lo envíes a Marco. Si no se abrió, escríbele directo abajo.'
                        : 'Recibí tu mensaje y te contacto pronto. Gracias por sumarte: esto lo construimos juntos.'}
                    </p>
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                      <Button onClick={reset} variant="outline" tone="accent">
                        Enviar otro mensaje
                      </Button>
                      <ButtonAnchor href={`mailto:${SOCIAL.email.value}`} external={false} tone="ink" variant="ghost">
                        <MailIcon className="h-5 w-5" /> {SOCIAL.email.value}
                      </ButtonAnchor>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={false}
                    exit={{ opacity: 0 }}
                    onSubmit={onSubmit}
                    noValidate
                    className="grid gap-6"
                  >
                    {/* Motivo (chips) */}
                    <fieldset className="grid gap-3">
                      <legend className="mb-1 text-sm font-medium text-ink">¿De qué quieres hablar?</legend>
                      <div className="flex flex-wrap gap-2.5">
                        {MOTIVOS.map((m) => {
                          const active = motivo === m.key
                          return (
                            <button
                              key={m.key}
                              type="button"
                              aria-pressed={active}
                              onClick={() => setMotivo(active ? '' : m.key)}
                              className={`cursor-pointer rounded-full border px-4 py-2.5 text-sm font-medium transition-colors ${
                                active
                                  ? 'border-accent bg-accent text-white'
                                  : 'border-ink/20 text-ink hover:border-accent hover:text-accent'
                              }`}
                            >
                              {m.label}
                            </button>
                          )
                        })}
                      </div>
                    </fieldset>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-1.5 block text-sm font-medium">Nombre *</span>
                        <input type="text" autoComplete="name" value={fields.nombre} onChange={set('nombre')} placeholder="Tu nombre" {...aria('nombre')} />
                        {fieldErr('nombre')}
                      </label>
                      <label className="block">
                        <span className="mb-1.5 block text-sm font-medium">Correo *</span>
                        <input type="email" autoComplete="email" value={fields.correo} onChange={set('correo')} placeholder="tucorreo@ejemplo.com" {...aria('correo')} />
                        {fieldErr('correo')}
                      </label>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-1.5 block text-sm font-medium">
                          Teléfono <span className="font-normal text-mute">(opcional)</span>
                        </span>
                        <input type="tel" autoComplete="tel" value={fields.telefono} onChange={set('telefono')} placeholder="(238) 000 0000" {...aria('telefono')} />
                        {fieldErr('telefono')}
                      </label>
                      <label className="block">
                        <span className="mb-1.5 block text-sm font-medium">
                          Colonia / Municipio <span className="font-normal text-mute">(opcional)</span>
                        </span>
                        <input type="text" value={fields.lugar} onChange={set('lugar')} placeholder="Tehuacán, Col. ..." {...aria('lugar')} />
                        {fieldErr('lugar')}
                      </label>
                    </div>

                    <label className="block">
                      <span className="mb-1.5 block text-sm font-medium">Mensaje *</span>
                      <textarea rows={5} value={fields.mensaje} onChange={set('mensaje')} placeholder={mensajePh} {...aria('mensaje')} />
                      {fieldErr('mensaje')}
                    </label>

                    {/* Honeypot: invisible para personas, tentador para bots */}
                    <input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden
                      value={hp}
                      onChange={(e) => setHp(e.target.value)}
                      className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
                    />

                    <div className="flex flex-wrap items-center gap-4">
                      <Button type="submit" tone="accent" variant="solid" arrow disabled={status === 'sending'}>
                        {status === 'sending' ? 'Enviando…' : 'Enviar mensaje'}
                      </Button>
                      <span className="text-xs text-mute">Campos con * son obligatorios.</span>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Señales de confianza */}
            {status !== 'success' && (
              <ul className="mt-9 grid gap-4 border-t border-ink/10 pt-7 sm:grid-cols-3">
                {[
                  { I: ClockIcon, t: 'Te respondo yo', d: 'De tú a tú, sin intermediarios.' },
                  { I: ShieldIcon, t: 'Tus datos, privados', d: 'Solo los uso para contestarte.' },
                  { I: HeartIcon, t: 'Cerca de la gente', d: 'Cada mensaje cuenta y suma.' },
                ].map(({ I, t, d }) => (
                  <li key={t} className="flex items-start gap-3">
                    <span className="mt-0.5 text-accent">
                      <I />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-ink">{t}</span>
                      <span className="block text-sm text-mute">{d}</span>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* ===================== DIRECTO + SÚMATE ===================== */}
          <aside className="flex flex-col gap-6">
            <div className="rounded-sm bg-black p-7 text-white md:p-8">
              <SectionLabel tone="bone">Directo</SectionLabel>
              <p className="mt-4 text-white/70">¿Prefieres escribirme de una vez? Aquí me encuentras.</p>
              <div className="mt-6 space-y-4">
                {hasWhats && (
                  <ButtonAnchor href={SOCIAL.whatsapp.url} tone="bone" variant="solid" full arrow>
                    <WhatsappIcon className="h-5 w-5" /> WhatsApp
                  </ButtonAnchor>
                )}
                <a
                  href={`mailto:${SOCIAL.email.value}`}
                  className="flex items-center gap-3 text-white/85 transition-colors hover:text-accent"
                >
                  <MailIcon /> {SOCIAL.email.value}
                </a>
                <p className="flex items-center gap-3 text-white/85">
                  <PinIcon /> {SITE.ciudad}, {SITE.estado}, {SITE.pais}
                </p>
              </div>

              <div className="mt-7 border-t border-white/15 pt-6">
                <p className="eyebrow text-white/55">Sígueme</p>
                <div className="mt-4 flex items-center gap-3">
                  {[
                    { I: InstagramIcon, ...SOCIAL.instagram },
                    { I: FacebookIcon, ...SOCIAL.facebook },
                    { I: XIcon, ...SOCIAL.x },
                  ].map(({ I, label, url }) => (
                    <a
                      key={label}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/85 transition-colors hover:border-accent hover:text-accent"
                    >
                      <I />
                    </a>
                  ))}
                </div>
                <p className="mt-3 text-sm text-white/60">{SOCIAL.instagram.handle}</p>
              </div>
            </div>

            {/* En persona → Agenda */}
            <div className="rounded-sm border border-ink/12 bg-white p-7 md:p-8">
              <h3 className="font-condensed text-2xl font-semibold uppercase tracking-wide text-ink">
                ¿Nos vemos en persona?
              </h3>
              <p className="mt-3 text-mute">
                Recorro las colonias y juntas auxiliares cada semana. Mira dónde ando y acompáñame.
              </p>
              <div className="mt-5">
                <ButtonLink to="/agenda" tone="ink" variant="outline">
                  Ver mi agenda
                </ButtonLink>
              </div>
            </div>

            {/* Voluntariado */}
            <div className="rounded-sm border border-ink/12 bg-white p-7 md:p-8">
              <h3 className="font-condensed text-2xl font-semibold uppercase tracking-wide text-ink">
                Hazte voluntario
              </h3>
              <p className="mt-3 text-mute">
                Organiza tu colonia, suma a tu gente y caminemos juntos. Este movimiento se construye
                de tú a tú, y tú haces la diferencia.
              </p>
              <p className="font-condensed mt-4 text-lg font-semibold uppercase tracking-wide text-accent">
                Cerca de la gente. Por nuestra tierra.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
