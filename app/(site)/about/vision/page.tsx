import { buildMetadata } from '@/lib/metadata'
import { PageHeader } from '@/components/layout/PageHeader'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = buildMetadata({ title: 'Vision', path: '/about/vision' })

export default function VisionPage() {
  return (
    <div className="w-full">
      <PageHeader title="Vision" />
      <div className="px-[6vw] pb-24 max-w-3xl">
        <p className="text-sm leading-relaxed mb-8">
          We envision a space where art transcends boundaries, connecting communities through
          creative expression and critical discourse.
        </p>
        <Link href="/about" className="text-sm underline underline-offset-4 hover:opacity-70">← About</Link>
      </div>
    </div>
  )
}
