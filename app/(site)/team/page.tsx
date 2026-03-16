import { buildMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'
import { ParallaxHero } from '@/components/ui/ParallaxHero'
import { TeamClient } from './TeamClient'

export const metadata: Metadata = buildMetadata({ title: 'Team', path: '/team' })

export default function TeamPage() {
  return (
    <div className="w-full bg-white min-h-screen pb-24">
      <ParallaxHero image="https://irp.cdn-website.com/5516674f/dms3rep/multi/cover-team-f51a7633.jpg" height="h-[80vh]">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none md:hidden" />
      </ParallaxHero>
      <TeamClient />
    </div>
  )
}
