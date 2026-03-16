import { buildMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'
import { ParallaxHero } from '@/components/ui/ParallaxHero'
import { KhaoYaiClient } from './KhaoYaiClient'

export const metadata: Metadata = buildMetadata({ title: 'Khao Yai', path: '/khaoyai' })

export default function KhaoYaiPage() {
  return (
    <div className="w-full bg-white min-h-screen pb-24">
      <ParallaxHero image="https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_cover-for-about.jpg" height="h-[80vh]">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none md:hidden" />
      </ParallaxHero>
      <KhaoYaiClient />
    </div>
  )
}
