import { fetchPostBySlug, fetchAllSlugs } from '@/lib/api'
import { buildMetadata } from '@/lib/metadata'
import { PageHeader } from '@/components/layout/PageHeader'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'

export const dynamicParams = false

export async function generateStaticParams() {
  const slugs = await fetchAllSlugs('activities')
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await fetchPostBySlug('activities', slug)
  if (!post) return buildMetadata({ title: 'Activities', path: '/activities/${slug}' })
  return buildMetadata({ title: post.title, path: '/activities/${slug}', image: post.featuredImage?.sourceUrl })
}

export default async function ActivitiesDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await fetchPostBySlug('activities', slug)
  if (!post) notFound()
  return (
    <div className="w-full">
      <PageHeader
        title={post.title}
        imageUrl={post.featuredImage?.sourceUrl ?? ''}
        meta={post.date ? <span className="text-sm text-muted-foreground">{post.date}</span> : undefined}
      />
      {post.content && (
        <div className="px-[6vw] py-12 prose prose-sm max-w-2xl" dangerouslySetInnerHTML={{ __html: post.content }} />
      )}
      <div className="px-[6vw] pb-16">
        <Link href="/activities" className="text-sm underline underline-offset-4 hover:opacity-70">← Back to Activities</Link>
      </div>
    </div>
  )
}
