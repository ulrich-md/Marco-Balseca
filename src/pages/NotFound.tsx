import { Seo } from '../lib/Seo'
import { ButtonLink } from '../components/ui/Button'
import { SITE } from '../data/site'

export default function NotFound() {
  return (
    <>
      <Seo title="Página no encontrada" path="/404" />
      <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-white text-ink">
        <div className="container-x relative pt-28 text-center">
          <p className="eyebrow text-accent">Error 404</p>
          <h1 className="font-display mt-6 text-[28vw] leading-none text-ink md:text-[16rem]">404</h1>
          <p className="mx-auto mt-4 max-w-md text-lg text-ink/70">
            Esta página no existe, pero el camino sí. Volvamos al inicio.
          </p>
          <div className="mt-8 flex justify-center">
            <ButtonLink to="/" tone="accent" variant="solid">
              Volver al inicio
            </ButtonLink>
          </div>
          <p className="eyebrow mt-10 text-ink/45">
            Marco Balseca · {SITE.ciudad}, {SITE.estado}
          </p>
        </div>
      </section>
    </>
  )
}
