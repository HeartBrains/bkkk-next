import { fetchSiteSettings } from '@/lib/api'
import { buildMetadata } from '@/lib/metadata'
import { PageHeader } from '@/components/layout/PageHeader'
import type { Metadata } from 'next'

export const metadata: Metadata = buildMetadata({ title: 'Visit', path: '/visit' })

export default async function VisitPage() {
  const settings = await fetchSiteSettings()

  const LocationBlock = ({
    name,
    address,
    hours,
    mapsUrl,
    phone,
  }: {
    name: string
    address: string
    hours: string
    mapsUrl: string
    phone: string
  }) => (
    <div className="flex flex-col gap-3">
      <h2 className="text-base font-medium tracking-wide">{name}</h2>
      <div className="text-sm text-muted-foreground whitespace-pre-line">{address}</div>
      <div className="text-sm text-muted-foreground whitespace-pre-line">{hours}</div>
      {phone && <div className="text-sm text-muted-foreground">{phone}</div>}
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm underline underline-offset-4 hover:opacity-70 w-fit"
      >
        Get Directions →
      </a>
    </div>
  )

  return (
    <div className="w-full">
      <PageHeader title="Visit" />
      <div className="px-[6vw] pb-24 grid grid-cols-1 md:grid-cols-2 gap-16 max-w-4xl">
        <LocationBlock
          name="Bangkok"
          address={settings?.bangkok.address_en ?? ''}
          hours={settings?.bangkok.hours_en ?? ''}
          mapsUrl={settings?.bangkok.maps_url ?? '#'}
          phone={settings?.bangkok.phone ?? ''}
        />
        <LocationBlock
          name="Khao Yai Art Forest"
          address={settings?.khaoyai.address_en ?? ''}
          hours={settings?.khaoyai.hours_en ?? ''}
          mapsUrl={settings?.khaoyai.maps_url ?? '#'}
          phone={settings?.khaoyai.phone ?? ''}
        />
      </div>
    </div>
  )
}
