const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.bangkok-kunsthalle.org'

export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Bangkok Kunsthalle',
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    sameAs: [
      'https://www.instagram.com/bangkok_kunsthalle/',
      'https://www.facebook.com/BangkokKunsthalle',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'info@bangkok-kunsthalle.org',
      contactType: 'customer service',
    },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

export function WebSiteJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Bangkok Kunsthalle',
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/exhibitions?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

export function EventJsonLd({
  name,
  startDate,
  endDate,
  description,
  image,
  location = 'Bangkok Kunsthalle, Bangkok, Thailand',
}: {
  name: string
  startDate: string
  endDate?: string
  description?: string
  image?: string
  location?: string
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name,
    startDate,
    ...(endDate && { endDate }),
    ...(description && { description }),
    ...(image && { image }),
    location: {
      '@type': 'Place',
      name: 'Bangkok Kunsthalle',
      address: { '@type': 'PostalAddress', addressLocality: 'Bangkok', addressCountry: 'TH' },
    },
    organizer: { '@type': 'Organization', name: 'Bangkok Kunsthalle', url: SITE_URL },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

export function ArticleJsonLd({
  headline,
  datePublished,
  image,
  description,
}: {
  headline: string
  datePublished: string
  image?: string
  description?: string
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    datePublished,
    ...(description && { description }),
    ...(image && { image }),
    publisher: { '@type': 'Organization', name: 'Bangkok Kunsthalle', url: SITE_URL },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
