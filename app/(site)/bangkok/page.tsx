import { fetchPosts, getExhibitionStatus } from '@/lib/api'
import { buildMetadata } from '@/lib/metadata'
import { visibility } from '@/lib/visibility'
import type { Metadata } from 'next'
import Link from 'next/link'
import { HeroSlider } from '@/components/ui/HeroSlider'
import { BangkokClient } from './BangkokClient'

export const revalidate = 3600

export const metadata: Metadata = buildMetadata({
  title: 'Bangkok',
  path: '/bangkok',
})

const HERO_IMAGES = [
  'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_cover-for-about.jpg',
  'https://irp.cdn-website.com/5516674f/dms3rep/multi/cover-for-Exhibitions-list-83b680a4.jpg',
  'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-4.+Moving+Image+Program-4.1+Infringes--Infringes+-Andrea+Rossetti+1+COVER.jpg',
  'https://irp.cdn-website.com/5516674f/dms3rep/multi/1000012646.jpg',
  'https://irp.cdn-website.com/5516674f/dms3rep/multi/cover-for-history-34e22018.jpg',
  'https://irp.cdn-website.com/5516674f/dms3rep/multi/cover-team-f51a7633.jpg',
  'https://irp.cdn-website.com/5516674f/dms3rep/multi/cover-contact-1-89b6eddb.jpg',
]

export default async function BangkokPage() {
  const [exhibitions, activities, blog] = await Promise.all([
    fetchPosts('exhibitions'),
    fetchPosts('activities'),
    fetchPosts('blog'),
  ])

  const today = new Date()
  const currentExhibitions = exhibitions.filter((e) => {
    const from = e.acf?.from_date ?? ''
    const to = e.acf?.to_date ?? ''
    return getExhibitionStatus(String(from), String(to)) === 'current'
  })
  const upcomingExhibitions = exhibitions.filter((e) => {
    const from = e.acf?.from_date ?? ''
    const to = e.acf?.to_date ?? ''
    return getExhibitionStatus(String(from), String(to)) === 'upcoming'
  })

  return (
    <div className="w-full bg-white min-h-screen pb-24 font-sans text-black">
      <HeroSlider images={HERO_IMAGES} height="h-[80vh]">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none md:hidden" />
      </HeroSlider>

      <BangkokClient
        currentExhibitions={currentExhibitions}
        upcomingExhibitions={upcomingExhibitions}
        activities={activities}
        blog={blog}
        visibility={visibility}
      />
    </div>
  )
}
