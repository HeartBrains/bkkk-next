import { NextRequest, NextResponse } from 'next/server'

// Not available in static export (GitHub Pages)
export const dynamic = 'force-static'

// Allowed domains for proxying — add your WP subdomain here
const ALLOWED_HOSTS = [
  'cms.bangkok-kunsthalle.org',
  'irp.cdn-website.com',
  'images.unsplash.com',
  'www.khaoyaiart.com',
]

export async function GET(req: NextRequest) {
  if (process.env.NEXT_PUBLIC_STATIC_EXPORT === '1') {
    return NextResponse.json({ error: 'Not available in static mode' }, { status: 405 })
  }

  const url = req.nextUrl.searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'Missing url param' }, { status: 400 })
  }

  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 })
  }

  if (!ALLOWED_HOSTS.includes(parsed.hostname)) {
    return NextResponse.json({ error: 'Domain not allowed' }, { status: 403 })
  }

  try {
    const upstream = await fetch(url, {
      headers: { 'User-Agent': 'Bangkok-Kunsthalle-Next/1.0' },
      next: { revalidate: 86400 }, // cache images 24h
    })

    if (!upstream.ok) {
      return NextResponse.json({ error: 'Upstream error' }, { status: upstream.status })
    }

    const contentType = upstream.headers.get('content-type') ?? 'image/jpeg'
    const buffer = await upstream.arrayBuffer()

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
      },
    })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch image' }, { status: 500 })
  }
}
