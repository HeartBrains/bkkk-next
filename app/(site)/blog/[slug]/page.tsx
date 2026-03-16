import { fetchPostBySlug, fetchAllSlugs } from '@/lib/api'
import { buildMetadata } from '@/lib/metadata'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { DetailClient } from '@/components/pages/DetailClient'

export const dynamicParams = false

export async function generateStaticParams() {
  const slugs = await fetchAllSlugs('blog')
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await fetchPostBySlug('blog', slug)
  if (!post) return buildMetadata({ title: 'blog', path: '/blog/' + slug })
  return buildMetadata({ title: post.title, description: post.acf?.artist ?? '', path: '/blog/' + slug, image: post.featuredImage?.sourceUrl })
}

export default async function DetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await fetchPostBySlug('blog', slug)
  if (!post) notFound()
  const gallery = post.gallery?.length ? post.gallery : post.featuredImage?.sourceUrl ? [post.featuredImage.sourceUrl] : []
  return (
    <DetailClient
      post={post}
      gallery={gallery}
      backHref="/blog"
      backLabel={{ en: 'Back to Blog', th: 'กลับสู่บล็อก' }}
    />
  )
}
