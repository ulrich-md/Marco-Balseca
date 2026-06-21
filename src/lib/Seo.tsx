import { useEffect } from 'react'
import { SITE } from '../data/site'

type SeoProps = {
  title: string
  description?: string
  /** ruta relativa, ej. '/conoceme' */
  path?: string
  image?: string
  /** marca la página como no indexable (ej. panel /admin) */
  noindex?: boolean
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * SEO por página: title, description, canonical y Open Graph.
 * Ligero y sin dependencias (no react-helmet).
 */
export function Seo({ title, description, path = '/', image = '/og-image.svg', noindex = false }: SeoProps) {
  const fullTitle =
    title === SITE.name ? `${SITE.name} — ${SITE.ciudad}, ${SITE.estado}` : `${title} — ${SITE.name}`
  const desc = description ?? SITE.descripcion
  const url = `${SITE.url}${path === '/' ? '' : path}`

  useEffect(() => {
    document.title = fullTitle
    setMeta('name', 'description', desc)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', desc)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', image)
    setMeta('property', 'og:type', 'website')
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', desc)
    setCanonical(url)
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')
  }, [fullTitle, desc, url, image, noindex])

  return null
}
