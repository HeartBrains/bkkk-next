import { buildMetadata } from '@/lib/metadata'
import { PageHeader } from '@/components/layout/PageHeader'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = buildMetadata({ title: 'About', path: '/about' })

export default function AboutPage() {
  return (
    <div className="w-full">
      <PageHeader title="About" />
      <div className="px-[6vw] pb-24 max-w-3xl">
        <p className="text-sm leading-relaxed mb-8">
          Bangkok Kunsthalle is a multidisciplinary platform for contemporary art in Thailand,
          dedicated to fostering dialogue between local and international artistic practices.
        </p>
        <div className="flex flex-col gap-2">
          <Link href="/about/vision" className="text-sm underline underline-offset-4 hover:opacity-70">Vision</Link>
          <Link href="/about/founder" className="text-sm underline underline-offset-4 hover:opacity-70">Founding Director</Link>
        </div>
      </div>
    </div>
  )
}
