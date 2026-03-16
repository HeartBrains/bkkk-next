import { buildMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'
import { ParallaxHero } from '@/components/ui/ParallaxHero'
import { VisitClient } from './VisitClient'

export const metadata: Metadata = buildMetadata({ title: 'Visit', path: '/visit' })

export default function VisitPage() {
  return (
    <div className="w-full bg-white pb-24 min-h-screen">
      <ParallaxHero image="https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_cover-for-about.jpg" height="h-[80vh]">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none md:hidden" />
      </ParallaxHero>
      <div className="w-full px-[5%] pt-[96px] pb-[0px]">
        <VisitClient />
      </div>
    </div>
  )
}
