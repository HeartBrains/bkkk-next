import { fetchPostBySlug, fetchAllSlugs } from '@/lib/api'
import { buildMetadata } from '@/lib/metadata'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { EventJsonLd } from '@/components/seo/JsonLd'
import { ExhibitionDetailClient } from './ExhibitionDetailClient'

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

  const gallery = post.gallery && post.gallery.length > 0
    ? post.gallery
    : post.featuredImage?.sourceUrl
      ? [post.featuredImage.sourceUrl]
      : []

  return (
    <>
      <EventJsonLd
        name={post.title}
        startDate={post.acf?.from_date ?? ''}
        endDate={post.acf?.to_date ?? ''}
        description={post.acf?.artist ?? ''}
        image={post.featuredImage?.sourceUrl ?? ''}
      />
      <ExhibitionDetailClient post={post} gallery={gallery} />
    </>
  )
}
