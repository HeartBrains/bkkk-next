import { buildMetadata } from '@/lib/metadata'
import { PageHeader } from '@/components/layout/PageHeader'
import type { Metadata } from 'next'

export const metadata: Metadata = buildMetadata({ title: 'Team', path: '/team' })

export default function TeamPage() {
  return (
    <div className="w-full">
      <PageHeader title="Team" />
      <div className="px-[6vw] pb-24 max-w-3xl">
        <p className="text-sm text-muted-foreground">Team information coming soon.</p>
      </div>
    </div>
  )
}
