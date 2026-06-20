import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Seo } from '../lib/Seo'
import { PageHero } from '../components/layout/PageHero'
import { Button, ButtonAnchor } from '../components/ui/Button'
import { SectionLabel } from '../components/ui/SectionLabel'
import { PortraitPlaceholder } from '../components/ui/PortraitPlaceholder'
import { ResponsiveImg } from '../components/ui/ResponsiveImg'
import {
  InstagramIcon,
  FacebookIcon,
  XIcon,
  WhatsappIcon,
  MailIcon,
  PinIcon,
} from '../components/ui/Icons'
import { SITE, SOCIAL } from '../data/site'

type Fields = {
  nombre: string
  correo: string
  telefono: string
  lugar: string
  mensaje: string
}
type Errors = Partial<Record<keyof Fields, string>>

const EMPTY: Fields = { nombre: '', correo: '', telefono: '', lugar: '', mensaje: '' }

function validate(f: Fields): Errors {
  const e: Errors = {}
  if (!f.nombre.trim()) e.nombre = 'Dinos tu nombre.'
  if (!f.correo.trim()) e.correo = 'Necesitamos tu correo.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.correo)) e.correo = 'Correo no válido.'
  if (f.telefono && !/^[\d\s()+-]{7,}$/.test(f.telefono)) e.telefono = 'Teléfono no válido.'
  if (!f.mensaje.trim()) e.mensaje = 'Escríbenos tu mensaje.'
  return e
}

const inputBase =
  'w-full rounded-xl border bg-white px-4 py-3 text-ink placeholder:text-mute/60 transition-colors focus:border-accent focus:outline-none focus-visible:outline-none'

export default function Contacto() {
  const [fields, setFields] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle')

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((p) => ({ ...p, [k]: e.target.value }))
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }))
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const errs = validate(fields)
    setErrors(errs)
    if (Object.keys(errs).length) {
      const first = document.querySelector<HTMLElement>('[aria-invalid="true"]')
      first?.focus()
      return
    }
    // Sin backend: simulamos el envío.
    setStatus('sending')
    window.setTimeout(() => setStatus('success'), 900)
  }

  const reset = () => {
    setFields(EMPTY)
    setErrors({})
    setStatus('idle')
  }

  const fieldErr = (k: keyof Fields) =>
    errors[k] ? (
      <span id={`err-${k}`} role="alert" className="mt-1.5 block text-sm text-accent">
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
        description="Contacta a Marco Balseca y súmate al movimiento. WhatsApp, correo y redes. Tehuacán, Puebla."
      />

      <PageHero
        index="07"
        label="Contacto · Súmate"
        title={'Súmate al\nmovimiento'}
        intro="Tu voz, nuestra tierra. Déjame un mensaje, hazte voluntario o escríbeme por mis redes. Aquí me tienes, de tú a tú: cuenta conmigo."
      >
        {/* Acento gráfico (cutout claro). Lleva halo + sombra para separarse del
            blanco (si no, la camisa clara se pierde). REEMPLAZAR -> si falta, no se ve nada. */}
        <div aria-hidden className="pointer-events-none absolute bottom-0 right-0 hidden h-[90%] w-[34%] lg:block">
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(60% 55% at 62% 78%, rgba(22,22,22,0.10), transparent 70%)',
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

      <section className="bg-bone py-16 text-ink md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Formulario */}
          <div>
            <SectionLabel tone="accent">Escríbenos</SectionLabel>

            <div className="relative mt-6">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="rounded-2xl border border-accent/20 bg-white p-8 text-center"
                    role="status"
                    aria-live="polite"
                  >
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white">
                      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="m5 12 5 5 9-11" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <h3 className="font-display mt-5 text-3xl text-accent">¡Gracias, {fields.nombre || 'compa'}!</h3>
                    <p className="mt-2 text-mute">
                      Recibí tu mensaje y te contactaré pronto. Gracias por sumarte: esto lo
                      construimos juntos.
                    </p>
                    <p className="mt-1 text-xs text-mute/70">
                      (Demo sin backend: el envío es simulado.)
                    </p>
                    <div className="mt-6">
                      <Button onClick={reset} variant="outline" tone="accent">
                        Enviar otro mensaje
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={false}
                    exit={{ opacity: 0 }}
                    onSubmit={onSubmit}
                    noValidate
                    className="grid gap-5"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-1.5 block text-sm font-medium">Nombre *</span>
                        <input type="text" value={fields.nombre} onChange={set('nombre')} placeholder="Tu nombre" {...aria('nombre')} />
                        {fieldErr('nombre')}
                      </label>
                      <label className="block">
                        <span className="mb-1.5 block text-sm font-medium">Correo *</span>
                        <input type="email" value={fields.correo} onChange={set('correo')} placeholder="tucorreo@ejemplo.com" {...aria('correo')} />
                        {fieldErr('correo')}
                      </label>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-1.5 block text-sm font-medium">Teléfono</span>
                        <input type="tel" value={fields.telefono} onChange={set('telefono')} placeholder="(238) 000 0000" {...aria('telefono')} />
                        {fieldErr('telefono')}
                      </label>
                      <label className="block">
                        <span className="mb-1.5 block text-sm font-medium">Municipio / Colonia</span>
                        <input type="text" value={fields.lugar} onChange={set('lugar')} placeholder="Tehuacán, Col. ..." {...aria('lugar')} />
                        {fieldErr('lugar')}
                      </label>
                    </div>

                    <label className="block">
                      <span className="mb-1.5 block text-sm font-medium">Mensaje *</span>
                      <textarea
                        rows={5}
                        value={fields.mensaje}
                        onChange={set('mensaje')}
                        placeholder="¿Cómo quieres sumarte? Cuéntanos."
                        {...aria('mensaje')}
                      />
                      {fieldErr('mensaje')}
                    </label>

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
          </div>

          {/* Contacto directo + súmate */}
          <aside className="flex flex-col gap-6">
            {/* Retrato cercano. REEMPLAZAR -> si falta, queda el bloque negro (sin imagen rota). */}
            <PortraitPlaceholder
              src="/assets/portraits/marco-corazon.png"
              alt="Marco Balseca, cerca de la gente"
              tone="black"
              fit="contain"
              rounded="rounded-sm"
              className="aspect-[4/3] w-full"
              note={false}
            />
            <div className="rounded-sm bg-black p-7 text-white md:p-8">
              <SectionLabel tone="bone">Directo</SectionLabel>
              <div className="mt-5 space-y-4">
                {SOCIAL.whatsapp.url !== '#' && (
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
                <p className="eyebrow text-white/55">Síguelo</p>
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

            <div className="rounded-sm border border-ink/10 bg-white p-7 md:p-8">
              <h3 className="font-condensed text-2xl font-semibold uppercase tracking-wide text-ink">
                Hazte voluntario
              </h3>
              <p className="mt-3 text-mute">
                Organiza tu colonia, suma a tu gente y caminemos juntos. Este movimiento se
                construye de tú a tú, y tú haces la diferencia.
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
