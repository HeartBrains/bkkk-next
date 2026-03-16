'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ImageWithFallbackProps {
  src: string
  alt: string
  className?: string
  fill?: boolean
  width?: number
  height?: number
  priority?: boolean
  sizes?: string
  style?: React.CSSProperties
}

const FALLBACK = '/images/placeholder.jpg'

export function ImageWithFallback({
  src,
  alt,
  className,
  fill,
  width,
  height,
  priority,
  sizes,
  style,
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src || FALLBACK)

  // In static export (GitHub Pages) the /api/image proxy doesn't exist — use the URL directly.
  // In server mode, proxy WP-hosted images to avoid CORS and keep next/image working.
  const isStatic = process.env.NEXT_PUBLIC_STATIC_EXPORT === '1'
  const proxied =
    imgSrc && imgSrc.startsWith('http')
      ? isStatic
        ? imgSrc
        : `/api/image?url=${encodeURIComponent(imgSrc)}`
      : imgSrc || FALLBACK

  if (fill) {
    return (
      <Image
        src={proxied}
        alt={alt}
        fill
        className={className}
        priority={priority}
        sizes={sizes ?? '100vw'}
        style={style}
        onError={() => setImgSrc(FALLBACK)}
      />
    )
  }

  return (
    <Image
      src={proxied}
      alt={alt}
      width={width ?? 800}
      height={height ?? 600}
      className={className}
      priority={priority}
      sizes={sizes}
      style={style}
      onError={() => setImgSrc(FALLBACK)}
    />
  )
}
