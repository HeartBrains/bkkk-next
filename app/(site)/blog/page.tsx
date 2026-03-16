import { fetchPosts } from '@/lib/api'
import { buildMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'
import { ParallaxHero } from '@/components/ui/ParallaxHero'
import { BlogClient } from './BlogClient'

export const revalidate = 3600
export const metadata: Metadata = buildMetadata({ title: 'Blog', path: '/blog' })

export default async function BlogPage() {
  const posts = await fetchPosts('blog')
  return (
    <div className="w-full bg-white min-h-screen pb-24 font-sans text-black">
      <ParallaxHero image="https://irp.cdn-website.com/5516674f/dms3rep/multi/cover-for-history-34e22018.jpg" height="h-[80vh]">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none md:hidden" />
      </ParallaxHero>
      <BlogClient posts={posts} />
    </div>
  )
}
