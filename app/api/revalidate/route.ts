import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// Not available in static export (GitHub Pages)
export const dynamic = 'force-static'

export async function POST(req: NextRequest) {
  if (process.env.NEXT_PUBLIC_STATIC_EXPORT === '1') {
    return NextResponse.json({ error: 'Not available in static mode' }, { status: 405 })
  }
  const secret = req.nextUrl.searchParams.get('secret')
  const tag = req.nextUrl.searchParams.get('tag') ?? 'content'

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(revalidateTag as any)(tag)
  return NextResponse.json({ revalidated: true, tag, timestamp: Date.now() })
}
