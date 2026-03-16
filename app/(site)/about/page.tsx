import { buildMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'
import { ParallaxHero } from '@/components/ui/ParallaxHero'
import { AboutClient } from './AboutClient'

export const metadata: Metadata = buildMetadata({ title: 'About', path: '/about' })

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen bg-white pb-24">
      <ParallaxHero image="https://irp.cdn-website.com/5516674f/dms3rep/multi/cover-for-history-34e22018.jpg" height="h-[80vh]">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none md:hidden" />
      </ParallaxHero>
      <AboutClient />
    </div>
  )
}
