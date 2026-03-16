import { buildMetadata } from '@/lib/metadata'
import { PageHeader } from '@/components/layout/PageHeader'
import type { Metadata } from 'next'

export const metadata: Metadata = buildMetadata({ title: 'Support', path: '/support' })

export default function SupportPage() {
  return (
    <div className="w-full">
      <PageHeader title="Support Us" />
      <div className="px-[6vw] pb-24 max-w-3xl">
        <p className="text-sm leading-relaxed">
          Bangkok Kunsthalle is an independent non-profit institution. Your support enables us to
          present ambitious exhibitions and public programs.
        </p>
      </div>
    </div>
  )
}
