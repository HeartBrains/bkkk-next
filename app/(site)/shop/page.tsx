import { buildMetadata } from '@/lib/metadata'
import { PageHeader } from '@/components/layout/PageHeader'
import type { Metadata } from 'next'

export const metadata: Metadata = buildMetadata({ title: 'Shop', path: '/shop' })

export default function ShopPage() {
  return (
    <div className="w-full">
      <PageHeader title="Shop" />
      <div className="px-[6vw] pb-24">
        <p className="text-sm text-muted-foreground">Shop coming soon.</p>
      </div>
    </div>
  )
}
