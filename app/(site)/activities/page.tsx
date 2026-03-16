import { fetchPosts } from '@/lib/api'
import { buildMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'
import { ParallaxHero } from '@/components/ui/ParallaxHero'
import { ListingClient } from '@/components/pages/ListingClient'

export const revalidate = 3600
export const metadata: Metadata = buildMetadata({ title: 'Activities', path: '/activities' })

export default async function ActivitiesPage() {
  const posts = await fetchPosts('activities')
  return (
    <div className="w-full bg-white min-h-screen pb-24 font-sans text-black">
      <ParallaxHero image="https://irp.cdn-website.com/5516674f/dms3rep/multi/1000012646.jpg" height="h-[80vh]">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none md:hidden" />
      </ParallaxHero>
      <ListingClient
        posts={posts}
        type="activities"
        navLabel={{ en: 'Activities', th: 'กิจกรรม' }}
        emptyLabel={{ en: 'No activities', th: 'ไม่มีกิจกรรม' }}
        tags={{ en: ['Performance', 'Screening', 'Talk / Lectures', 'Workshop', 'Sound'], th: ['การแสดง', 'การฉายภาพยนตร์', 'การบรรยาย', 'เวิร์คช็อป', 'เสียง'] }}
      />
    </div>
  )
}
