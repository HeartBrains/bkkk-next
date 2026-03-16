import { fetchPosts, fetchSiteSettings, getExhibitionStatus } from '@/lib/api'
import { buildMetadata } from '@/lib/metadata'
import { visibility } from '@/lib/visibility'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ImageWithFallback } from '@/components/ui/ImageWithFallback'

export const metadata: Metadata = buildMetadata({
  title: 'Bangkok',
  path: '/bangkok',
})

export default async function BangkokPage() {
  const [exhibitions, activities, blog] = await Promise.all([
    fetchPosts('exhibitions'),
    fetchPosts('activities'),
    fetchPosts('blog'),
  ])

  const currentExhibitions = exhibitions.filter((e) => {
    const from = e.acf?.from_date ?? (e as any).fromDate ?? ''
    const to = e.acf?.to_date ?? (e as any).toDate ?? ''
    return getExhibitionStatus(String(from), String(to)) === 'current'
  })

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="w-full aspect-[16/9] md:aspect-[21/9] relative overflow-hidden bg-zinc-900">
        {currentExhibitions[0] && (
          <ImageWithFallback
            src={currentExhibitions[0].featuredImage?.sourceUrl ?? ''}
            alt={currentExhibitions[0].title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/30 flex flex-col justify-end px-[6vw] pb-12">
          <p className="text-white/70 text-xs tracking-widest uppercase mb-2">Current Exhibition</p>
          {currentExhibitions[0] && (
            <Link href={`/exhibitions/${currentExhibitions[0].slug}`}>
              <h2 className="text-white text-2xl md:text-4xl font-medium tracking-wide hover:opacity-80 transition-opacity">
                {currentExhibitions[0].title}
              </h2>
            </Link>
          )}
        </div>
      </section>

      {/* Featured exhibitions */}
      {visibility.homeFeatured && currentExhibitions.length > 0 && (
        <section className="px-[6vw] py-16">
          <div className="flex justify-between items-baseline mb-8">
            <h2 className="text-base font-medium tracking-widest uppercase">Exhibitions</h2>
            <Link href="/exhibitions" className="text-sm underline underline-offset-4 hover:opacity-70">View all</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentExhibitions.slice(0, 3).map((ex) => (
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
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Activities */}
      {visibility.homeActivities && activities.length > 0 && (
        <section className="px-[6vw] py-16 border-t border-border">
          <div className="flex justify-between items-baseline mb-8">
            <h2 className="text-base font-medium tracking-widest uppercase">Activities</h2>
            <Link href="/activities" className="text-sm underline underline-offset-4 hover:opacity-70">View all</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {activities.slice(0, 2).map((act) => (
              <Link key={act.slug} href={`/activities/${act.slug}`} className="group">
                <h3 className="text-sm font-medium group-hover:opacity-70 transition-opacity">{act.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{act.date}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Blog */}
      {visibility.homeBlog && blog.length > 0 && (
        <section className="px-[6vw] py-16 border-t border-border">
          <div className="flex justify-between items-baseline mb-8">
            <h2 className="text-base font-medium tracking-widest uppercase">Blog</h2>
            <Link href="/blog" className="text-sm underline underline-offset-4 hover:opacity-70">View all</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blog.slice(0, 3).map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <h3 className="text-sm font-medium group-hover:opacity-70 transition-opacity">{post.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{post.date}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
