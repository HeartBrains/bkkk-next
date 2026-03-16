import { buildMetadata } from '@/lib/metadata'
import { PageHeader } from '@/components/layout/PageHeader'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = buildMetadata({ title: 'Founding Director', path: '/about/founder' })

export default function FounderPage() {
  return (
    <div className="w-full">
      <PageHeader title="Founding Director" />
      <div className="px-[6vw] pb-24 max-w-3xl">
        <h2 className="text-xl font-medium mb-4">Mark Chearavanont</h2>
        <p className="text-sm leading-relaxed mb-8">
          Mark Chearavanont is the founding director of Bangkok Kunsthalle.
        </p>
        <Link href="/about" className="text-sm underline underline-offset-4 hover:opacity-70">← About</Link>
      </div>
    </div>
  )
}
