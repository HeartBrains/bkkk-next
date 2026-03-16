import { fetchPosts } from '@/lib/api'
import { buildMetadata } from '@/lib/metadata'
import { PageHeader } from '@/components/layout/PageHeader'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ImageWithFallback } from '@/components/ui/ImageWithFallback'

export const metadata: Metadata = buildMetadata({ title: 'Residency', path: '/residency' })

export default async function ResidencyPage() {
  const items = await fetchPosts('artists')
  return (
    <div className="w-full">
      <PageHeader title="Residency" />
      <div className="px-[6vw] pb-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <Link key={item.slug} href="/residency/${item.slug}" className="group">
            <div className="aspect-[4/3] relative overflow-hidden bg-zinc-100 mb-4">
              <ImageWithFallback
                src={item.featuredImage?.sourceUrl ?? ''}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="text-sm font-medium">{item.title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
          </Link>
        ))}
        {items.length === 0 && (
          <p className="text-muted-foreground text-sm col-span-full">Coming soon.</p>
        )}
      </div>
    </div>
  )
}
