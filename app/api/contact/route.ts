import { NextRequest, NextResponse } from 'next/server'

// Not available in static export (GitHub Pages)
export const dynamic = 'force-static'

export async function POST(req: NextRequest) {
  if (process.env.NEXT_PUBLIC_STATIC_EXPORT === '1') {
    return NextResponse.json({ error: 'Not available in static mode' }, { status: 405 })
  }
  const { email, message } = await req.json()

  if (!email || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const formId = process.env.JETFORM_CONTACT_FORM_ID
  const apiUrl = process.env.JETFORM_API_URL

  // If JetFormBuilder is not configured, return success (dev/mockup mode)
  if (!apiUrl || !formId) {
    console.log('[contact] JetFormBuilder not configured — mock success', { email })
    return NextResponse.json({ success: true })
  }

  try {
    const res = await fetch(`${apiUrl}/${formId}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, message }),
    })

    if (!res.ok) {
      const text = await res.text()
      console.error('[contact] JetFormBuilder error:', res.status, text)
      return NextResponse.json({ error: 'Submission failed' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[contact] fetch error:', err)
    return NextResponse.json({ error: 'Network error' }, { status: 500 })
  }
}
