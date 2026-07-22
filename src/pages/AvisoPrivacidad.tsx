import { Seo } from '../lib/Seo'
import { PageHero } from '../components/layout/PageHero'
import { SITE, SOCIAL } from '../data/site'

/* Aviso de privacidad simplificado (sitio personal/político).
   REEMPLAZAR/VALIDAR: revisar con el equipo legal antes del lanzamiento. */

export default function AvisoPrivacidad() {
  return (
    <>
      <Seo
        title="Aviso de Privacidad"
        path="/aviso-de-privacidad"
        description="Aviso de privacidad del sitio de Marco Balseca."
      />
      <PageHero
        index="§"
        label="Legal"
        title={'Aviso de\nPrivacidad'}
        intro="Cómo cuidamos los datos que nos compartes a través de este sitio."
      />
      <section className="bg-bone py-20 text-ink md:py-36">
        <div className="container-x max-w-3xl space-y-8 leading-relaxed text-ink/80">
          <p>
            <strong>{SITE.name}</strong>, con domicilio en {SITE.ciudad}, {SITE.estado},{' '}
            {SITE.pais}, es responsable del tratamiento de los datos personales que nos proporciones
            a través de este sitio, conforme a la Ley Federal de Protección de Datos Personales en
            Posesión de los Particulares.
          </p>
          <div>
            <h2 className="font-condensed text-2xl font-semibold uppercase tracking-wide text-ink">
              ¿Qué datos recabamos?
            </h2>
            <p className="mt-3">
              Únicamente los que tú nos compartes de forma voluntaria mediante el formulario de
              contacto: nombre, correo electrónico, teléfono (opcional), colonia o municipio
              (opcional) y tu mensaje.
            </p>
          </div>
          <div>
            <h2 className="font-condensed text-2xl font-semibold uppercase tracking-wide text-ink">
              ¿Para qué los usamos?
            </h2>
            <p className="mt-3">
              Exclusivamente para responder a tu mensaje, dar seguimiento a tu solicitud y, si así
              lo pides, sumarte a las actividades del movimiento. No vendemos ni compartimos tus
              datos con terceros.
            </p>
          </div>
          <div>
            <h2 className="font-condensed text-2xl font-semibold uppercase tracking-wide text-ink">
              Derechos ARCO
            </h2>
            <p className="mt-3">
              Puedes solicitar en cualquier momento el acceso, rectificación, cancelación u
              oposición del tratamiento de tus datos escribiendo a{' '}
              <a
                href={`mailto:${SOCIAL.email.value}`}
                className="text-accent underline-offset-4 hover:underline"
              >
                {SOCIAL.email.value}
              </a>
              .
            </p>
          </div>
          <div>
            <h2 className="font-condensed text-2xl font-semibold uppercase tracking-wide text-ink">
              Cambios a este aviso
            </h2>
            <p className="mt-3">
              Cualquier modificación a este aviso se publicará en esta misma página. Última
              actualización: {new Date().getFullYear()}.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
