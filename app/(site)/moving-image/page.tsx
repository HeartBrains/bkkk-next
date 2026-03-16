import { fetchPosts, getExhibitionStatus } from '@/lib/api'
import { buildMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'
import { ParallaxHero } from '@/components/ui/ParallaxHero'
import { SectionedListingClient } from '@/components/pages/SectionedListingClient'

export const revalidate = 3600
export const metadata: Metadata = buildMetadata({ title: 'Moving Image', path: '/moving-image' })

export default async function MovingImagePage() {
  const posts = await fetchPosts('moving-image')
  const upcoming = posts.filter((p) => getExhibitionStatus(p.acf?.from_date ?? '', p.acf?.to_date ?? '') === 'upcoming')
  const current = posts.filter((p) => getExhibitionStatus(p.acf?.from_date ?? '', p.acf?.to_date ?? '') === 'current')
  const past = posts.filter((p) => getExhibitionStatus(p.acf?.from_date ?? '', p.acf?.to_date ?? '') === 'past')

  return (
    <div className="w-full bg-white min-h-screen pb-24 font-sans text-black">
      <ParallaxHero image="https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-4.+Moving+Image+Program-4.1+Infringes--Infringes+-Andrea+Rossetti+1+COVER.jpg" height="h-[80vh]">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none md:hidden" />
      </ParallaxHero>
      <SectionedListingClient
        type="moving-image"
        upcoming={upcoming}
        current={current}
        past={past}
        labels={{
          upcoming: { en: 'Upcoming Moving Image Program', th: 'โปรแกรมภาพเคลื่อนไหวที่กำลังจะมาถึง' },
          current: { en: 'Current Moving Image Program', th: 'โปรแกรมภาพเคลื่อนไหวปัจจุบัน' },
          past: { en: 'Past Moving Image Program', th: 'โปรแกรมภาพเคลื่อนไหวที่ผ่านมา' },
        }}
      />
    </div>
  )
}
