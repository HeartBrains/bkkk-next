import { buildMetadata } from '@/lib/metadata'
import { PageHeader } from '@/components/layout/PageHeader'
import type { Metadata } from 'next'

export const metadata: Metadata = buildMetadata({ title: 'Khao Yai Art Forest', path: '/khaoyai' })

export default function KhaoYaiPage() {
  return (
    <div className="w-full">
      <PageHeader title="Khao Yai Art Forest" />
      <div className="px-[6vw] pb-24 max-w-3xl">
        <p className="text-sm leading-relaxed">
          Khao Yai Art Forest is Bangkok Kunsthalle&apos;s second location, situated in the lush
          landscape of Khao Yai, Nakhon Ratchasima.
        </p>
      </div>
    </div>
  )
}
