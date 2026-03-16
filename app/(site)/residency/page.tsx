import { fetchPosts } from '@/lib/api'
import { buildMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'
import { ParallaxHero } from '@/components/ui/ParallaxHero'
import { ListingClient } from '@/components/pages/ListingClient'

export const revalidate = 3600
export const metadata: Metadata = buildMetadata({ title: 'Residency', path: '/residency' })

export default async function ResidencyPage() {
  const posts = await fetchPosts('residency')
  return (
    <div className="w-full bg-white min-h-screen pb-24 font-sans text-black">
      <ParallaxHero image="https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_cover-for-about.jpg" height="h-[80vh]">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none md:hidden" />
      </ParallaxHero>
      <ListingClient
        posts={posts}
        type="residency"
        navLabel={{ en: 'Residency', th: 'เรสซิเดนซี่' }}
        emptyLabel={{ en: 'No residency programs', th: 'ไม่มีโปรแกรมเรสซิเดนซี่' }}
      />
    </div>
  )
}
