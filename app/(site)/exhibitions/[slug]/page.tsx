import { fetchPostBySlug, fetchAllSlugs } from '@/lib/api'
import { buildMetadata } from '@/lib/metadata'
import { PageHeader } from '@/components/layout/PageHeader'
import { EventJsonLd } from '@/components/seo/JsonLd'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'

export const dynamicParams = false

export async function generateStaticParams() {
  const slugs = await fetchAllSlugs('exhibitions')
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await fetchPostBySlug('exhibitions', slug)
  if (!post) return buildMetadata({ title: 'Exhibition', path: `/exhibitions/${slug}` })
  return buildMetadata({
    title: post.title,
    description: post.acf?.artist ?? '',
    path: `/exhibitions/${slug}`,
    image: post.featuredImage?.sourceUrl,
  })
}

export default async function ExhibitionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await fetchPostBySlug('exhibitions', slug)
  if (!post) notFound()

  const artist = post.acf?.artist ?? ''
  const artistTH = post.acf?.artist_th ?? ''
  const dateDisplay = post.acf?.date_display ?? ''
  const curator = post.acf?.curator ?? ''
  const featuredImage = post.featuredImage?.sourceUrl ?? ''

  const fromDate = post.acf?.from_date ?? ''
  const toDate = post.acf?.to_date ?? ''

  return (
    <div className="w-full">
      <EventJsonLd
        name={post.title}
        startDate={String(fromDate)}
        endDate={String(toDate)}
        description={artist}
        image={featuredImage}
      />
      <PageHeader
        title={post.title}
        imageUrl={featuredImage}
        meta={
          <>
            {artist && <span className="text-sm">{artist}</span>}
            {dateDisplay && <span className="text-sm text-muted-foreground">{dateDisplay}</span>}
            {curator && <span className="text-sm text-muted-foreground">Curator: {curator}</span>}
          </>
        }
      />
      {post.content && (
        <div
          className="px-[6vw] py-12 prose prose-sm max-w-2xl"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      )}
      <div className="px-[6vw] pb-16">
        <Link href="/exhibitions" className="text-sm underline underline-offset-4 hover:opacity-70">
          ← Back to Exhibitions
        </Link>
      </div>
    </div>
  )
}
