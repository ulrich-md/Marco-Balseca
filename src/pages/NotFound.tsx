import { Seo } from '../lib/Seo'
import { ButtonLink } from '../components/ui/Button'
import { SITE } from '../data/site'

export default function NotFound() {
  return (
    <>
      <Seo title="Página no encontrada" path="/404" />
      <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-white text-ink">
        <div className="container-x relative pt-28 text-center">
          <p className="eyebrow text-guinda">Error 404</p>
          <h1 className="font-display mt-6 text-[28vw] leading-none text-ink md:text-[16rem]">404</h1>
          <p className="mx-auto mt-4 max-w-md text-lg text-ink/70">
            Esta página no existe, pero el camino sí. Volvamos al inicio y sigamos recio.
          </p>
          <div className="mt-8 flex justify-center">
            <ButtonLink to="/" tone="guinda" variant="solid">
              Volver al inicio
            </ButtonLink>
          </div>
          <p className="font-condensed mt-10 text-xl uppercase tracking-wide text-ink/45">
            {SITE.lema.nahuatl} · {SITE.ciudad}
          </p>
        </div>
      </section>
    </>
  )
}
