import { buildMetadata } from '@/lib/metadata'
import { PageHeader } from '@/components/layout/PageHeader'
import type { Metadata } from 'next'

export const metadata: Metadata = buildMetadata({ title: 'Archives', path: '/archives' })

export default function ArchivesPage() {
  return (
    <div className="w-full">
      <PageHeader title="Archives" />
      <div className="px-[6vw] pb-24">
        <p className="text-sm text-muted-foreground">Archives coming soon.</p>
      </div>
    </div>
  )
}
