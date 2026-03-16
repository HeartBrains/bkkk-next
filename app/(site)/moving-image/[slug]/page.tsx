import { fetchPostBySlug, fetchAllSlugs } from '@/lib/api'
import { buildMetadata } from '@/lib/metadata'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { DetailClient } from '@/components/pages/DetailClient'

export const dynamicParams = false

export async function generateStaticParams() {
  const slugs = await fetchAllSlugs('moving-image')
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await fetchPostBySlug('moving-image', slug)
  if (!post) return buildMetadata({ title: 'moving-image', path: '/moving-image/' + slug })
  return buildMetadata({ title: post.title, description: post.acf?.artist ?? '', path: '/moving-image/' + slug, image: post.featuredImage?.sourceUrl })
}

export default async function DetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await fetchPostBySlug('moving-image', slug)
  if (!post) notFound()
  const gallery = post.gallery?.length ? post.gallery : post.featuredImage?.sourceUrl ? [post.featuredImage.sourceUrl] : []
  return (
    <DetailClient
      post={post}
      gallery={gallery}
      backHref="/moving-image"
      backLabel={{ en: 'Back to Moving Image', th: 'กลับสู่ภาพเคลื่อนไหว' }}
    />
  )
}
