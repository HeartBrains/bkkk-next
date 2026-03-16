import { fetchPosts, getExhibitionStatus } from '@/lib/api'
import { buildMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'
import { ParallaxHero } from '@/components/ui/ParallaxHero'
import { ExhibitionsClient } from './ExhibitionsClient'

export const revalidate = 3600

export const metadata: Metadata = buildMetadata({
  title: 'Exhibitions',
  path: '/exhibitions',
})

export default async function ExhibitionsPage() {
  const exhibitions = await fetchPosts('exhibitions')

  const current = exhibitions
    .filter((e) => getExhibitionStatus(e.acf?.from_date ?? '', e.acf?.to_date ?? '') === 'current')
    .sort((a, b) => new Date(b.acf?.from_date ?? '').getTime() - new Date(a.acf?.from_date ?? '').getTime())

  const upcoming = exhibitions
    .filter((e) => getExhibitionStatus(e.acf?.from_date ?? '', e.acf?.to_date ?? '') === 'upcoming')
    .sort((a, b) => new Date(a.acf?.from_date ?? '').getTime() - new Date(b.acf?.from_date ?? '').getTime())

  const past = exhibitions
    .filter((e) => getExhibitionStatus(e.acf?.from_date ?? '', e.acf?.to_date ?? '') === 'past')
    .sort((a, b) => new Date(b.acf?.from_date ?? '').getTime() - new Date(a.acf?.from_date ?? '').getTime())

  return (
    <div className="w-full bg-white min-h-screen pb-24 font-sans text-black">
      <ParallaxHero
        image="https://irp.cdn-website.com/5516674f/dms3rep/multi/cover-for-Exhibitions-list-83b680a4.jpg"
        height="h-[80vh]"
      >
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none md:hidden" />
      </ParallaxHero>
      <ExhibitionsClient current={current} upcoming={upcoming} past={past} />
    </div>
  )
}
