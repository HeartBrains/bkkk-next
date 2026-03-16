import { fetchPosts } from '@/lib/api'
import { buildMetadata } from '@/lib/metadata'
import { PageHeader } from '@/components/layout/PageHeader'
import type { Metadata } from 'next'

export const metadata: Metadata = buildMetadata({ title: 'Press', path: '/press' })

export default async function PressPage() {
  const items = await fetchPosts('press')
  return (
    <div className="w-full">
      <PageHeader title="Press" />
      <div className="px-[6vw] pb-24">
        <div className="flex flex-col divide-y divide-border">
          {items.map((item) => (
            <div key={item.slug} className="py-6 flex justify-between items-baseline gap-8">
              <div>
                <h3 className="text-sm font-medium">{item.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
              </div>
              {(item as any).link && (item as any).link !== '#' && (
                <a href={(item as any).link} target="_blank" rel="noopener noreferrer"
                  className="text-xs underline underline-offset-4 hover:opacity-70 whitespace-nowrap">
                  {(item as any).type === 'pdf' ? 'Download PDF' : 'Read Article'}
                </a>
              )}
            </div>
          ))}
          {items.length === 0 && <p className="text-sm text-muted-foreground py-8">Coming soon.</p>}
        </div>
      </div>
    </div>
  )
}
