type Props = {
  /** ruta original (jpg/png), ej. /assets/comunidad/x.jpg — se sirve WebP automáticamente */
  src: string
  alt: string
  /** dimensiones intrínsecas (evitan saltos de layout / CLS) */
  width?: number
  height?: number
  /** clases para el <img> (la <picture> usa display:contents) */
  imgClassName?: string
  sizes?: string
  /** decorativa: aria-hidden + alt vacío */
  decorative?: boolean
  eager?: boolean
}

/**
 * Imagen responsiva y optimizada:
 * - <picture> con WebP (variante -sm para móvil) + original como fallback.
 * - width/height intrínsecos para reservar espacio (sin CLS).
 * - onError oculta la imagen y deja el color del contenedor (sin imagen rota).
 * La <picture> usa display:contents para no afectar el layout.
 */
export function ResponsiveImg({
  src,
  alt,
  width,
  height,
  imgClassName = '',
  sizes = '100vw',
  decorative = false,
  eager = false,
}: Props) {
  const base = src.replace(/\.(jpg|jpeg|png)$/i, '')
  const webp = `${base}.webp`
  const sm = `${base}-sm.webp`

  return (
    <picture style={{ display: 'contents' }}>
      <source type="image/webp" srcSet={`${sm} 760w, ${webp} ${width ?? 1600}w`} sizes={sizes} />
      <img
        src={src}
        alt={decorative ? '' : alt}
        aria-hidden={decorative || undefined}
        width={width}
        height={height}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onError={(e) => {
          e.currentTarget.style.display = 'none'
        }}
        className={imgClassName}
      />
    </picture>
  )
}
