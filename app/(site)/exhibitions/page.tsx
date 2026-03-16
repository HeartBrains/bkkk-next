import { fetchPosts, getExhibitionStatus } from '@/lib/api'
import { buildMetadata } from '@/lib/metadata'
import { PageHeader } from '@/components/layout/PageHeader'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ImageWithFallback } from '@/components/ui/ImageWithFallback'

export const metadata: Metadata = buildMetadata({ title: 'Exhibitions', path: '/exhibitions' })

export default async function ExhibitionsPage() {
  const all = await fetchPosts('exhibitions')

  const current = all.filter((e) => {
    const from = (e as any).fromDate ?? e.acf?.from_date ?? ''
    const to = (e as any).toDate ?? e.acf?.to_date ?? ''
    return getExhibitionStatus(String(from), String(to)) === 'current'
  })
  const upcoming = all.filter((e) => {
    const from = (e as any).fromDate ?? e.acf?.from_date ?? ''
    const to = (e as any).toDate ?? e.acf?.to_date ?? ''
    return getExhibitionStatus(String(from), String(to)) === 'upcoming'
  })
  const past = all.filter((e) => {
    const from = (e as any).fromDate ?? e.acf?.from_date ?? ''
    const to = (e as any).toDate ?? e.acf?.to_date ?? ''
    return getExhibitionStatus(String(from), String(to)) === 'past'
  })

  const ExhibitionGrid = ({ items }: { items: typeof all }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((ex) => (
        <Link key={ex.slug} href={`/exhibitions/${ex.slug}`} className="group">
          <div className="aspect-[4/3] relative overflow-hidden bg-zinc-100 mb-4">
            <ImageWithFallback
              src={ex.featuredImage?.sourceUrl ?? ''}
              alt={ex.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <h3 className="text-sm font-medium">{ex.title}</h3>
          <p className="text-xs text-muted-foreground mt-1">{(ex as any).artist?.en ?? ex.acf?.artist ?? ''}</p>
          <p className="text-xs text-muted-foreground">{(ex as any).dateDisplay?.en ?? ex.acf?.date_display ?? ''}</p>
        </Link>
      ))}
    </div>
  )

  return (
    <div className="w-full">
      <PageHeader title="Exhibitions" />
      <div className="px-[6vw] pb-24 space-y-20">
        {current.length > 0 && (
          <section id="current-exhibitions">
            <h2 className="text-xs tracking-widest uppercase text-muted-foreground mb-8">Current</h2>
            <ExhibitionGrid items={current} />
          </section>
        )}
        {upcoming.length > 0 && (
          <section id="upcoming-exhibitions">
            <h2 className="text-xs tracking-widest uppercase text-muted-foreground mb-8">Upcoming</h2>
            <ExhibitionGrid items={upcoming} />
          </section>
        )}
        {past.length > 0 && (
          <section id="past-exhibitions">
            <h2 className="text-xs tracking-widest uppercase text-muted-foreground mb-8">Past</h2>
            <ExhibitionGrid items={past} />
          </section>
        )}
      </div>
    </div>
  )
}
