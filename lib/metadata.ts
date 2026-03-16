import type { Metadata } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.bangkok-kunsthalle.org'
const SITE_NAME = 'Bangkok Kunsthalle'
const DEFAULT_DESCRIPTION =
  'Bangkok Kunsthalle is a multidisciplinary platform for contemporary art in Thailand.'

export function buildMetadata({
  title,
  description,
  path: pagePath = '/',
  image,
}: {
  title: string
  description?: string
  path?: string
  image?: string
}): Metadata {
  const desc = description ?? DEFAULT_DESCRIPTION
  const url = `${SITE_URL}${pagePath}`
  const ogImage = image
    ? `${SITE_URL}/api/image?url=${encodeURIComponent(image)}`
    : `${SITE_URL}/images/og-default.jpg`

  return {
    title,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description: desc,
      url,
      siteName: SITE_NAME,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_NAME}`,
      description: desc,
      images: [ogImage],
    },
  }
}
