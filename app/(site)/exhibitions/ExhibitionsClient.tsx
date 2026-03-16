'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/utils/languageContext'
import type { WPPost } from '@/lib/types'

interface Props {
  current: WPPost[]
  upcoming: WPPost[]
  past: WPPost[]
}

function ExhibitionCard({ item, isTh }: { item: WPPost; isTh: boolean }) {
  return (
    <Link href={`/exhibitions/${item.slug}`} className="flex flex-col gap-6 w-full cursor-pointer group">
      <div className="aspect-[3/4] w-full bg-gray-100 overflow-hidden relative">
        {item.featuredImage?.sourceUrl ? (
          <img
            src={item.featuredImage.sourceUrl}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-sm">
            {isTh ? 'ไม่มีรูปภาพ' : 'No image'}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <h3 className={`text-xl md:text-2xl font-normal leading-tight ${isTh ? 'leading-[1.82em]' : ''}`}>
          {isTh ? (item.acf?.title_th || item.title) : item.title}
        </h3>
        {item.acf?.artist && (
          <p className={`text-xl md:text-2xl font-normal text-black leading-tight ${isTh ? 'leading-[1.82em]' : ''}`}>
            {isTh ? (item.acf?.artist_th || item.acf?.artist) : item.acf?.artist}
          </p>
        )}
        <p className={`text-xl md:text-2xl font-normal text-black leading-tight mt-2 ${isTh ? 'leading-[1.82em]' : ''}`}>
          {isTh ? (item.acf?.date_display_th || item.acf?.date_display) : item.acf?.date_display}
        </p>
      </div>
    </Link>
  )
}

export function ExhibitionsClient({ current, upcoming, past }: Props) {
  const { language } = useLanguage()
  const isTh = language === 'th'
  const [activeSection, setActiveSection] = useState('upcoming-exhibitions')

  const sections = [
    { id: 'upcoming-exhibitions', label: isTh ? 'นิทรรศการที่กำลังจะเริ่ม' : 'Upcoming Exhibitions' },
    { id: 'current-exhibitions', label: isTh ? 'นิทรรศการปัจจุบัน' : 'Current Exhibitions' },
    { id: 'past-exhibitions', label: isTh ? 'นิทรรศการที่ผ่านมา' : 'Past Exhibitions' },
  ]

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 120, behavior: 'smooth' })
  }

  useEffect(() => {
    const handleScroll = () => {
      const pos = window.scrollY + 200
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id)
        if (el && el.offsetTop <= pos) { setActiveSection(sections[i].id); break }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const empty = (msg: string) => (
    <div className={`py-20 text-gray-400 font-sans text-xl md:text-2xl ${isTh ? 'leading-[1.82em]' : ''}`}>{msg}</div>
  )

  return (
    <div className="w-full px-[5%] pt-[96px] pb-[0px]">
      <div className="flex flex-col md:flex-row gap-12 md:gap-0">
        <aside className="w-full md:w-1/2 shrink-0">
          <nav className="md:sticky md:top-32 flex flex-col items-start gap-2">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className={`text-left text-xl md:text-2xl font-sans font-normal transition-all duration-300 ${
                  activeSection === s.id ? 'text-black' : 'text-gray-400 hover:text-black'
                }`}
              >
                {s.label}
              </button>
            ))}
          </nav>
        </aside>

        <div className="w-full md:w-1/2 flex flex-col md:items-end">
          <section id="upcoming-exhibitions" className="mb-32 md:mb-40 scroll-mt-32 w-full">
            <div className="flex flex-col gap-12 md:gap-16 md:items-end">
              {upcoming.length > 0
                ? upcoming.map((item) => <ExhibitionCard key={item.slug} item={item} isTh={isTh} />)
                : empty(isTh ? 'ไม่มีนิทรรศการที่กำลังจะเริ่ม' : 'No upcoming exhibitions')}
            </div>
          </section>

          <section id="current-exhibitions" className="mb-32 md:mb-40 scroll-mt-32 w-full">
            <div className="flex flex-col gap-12 md:gap-16 md:items-end">
              {current.length > 0
                ? current.map((item) => <ExhibitionCard key={item.slug} item={item} isTh={isTh} />)
                : empty(isTh ? 'ไม่มีนิทรรศการปัจจุบัน' : 'No current exhibitions')}
            </div>
          </section>

          <section id="past-exhibitions" className="mb-32 md:mb-40 scroll-mt-32 w-full">
            <div className="flex flex-col gap-12 md:gap-16 md:items-end">
              {past.length > 0
                ? past.map((item) => <ExhibitionCard key={item.slug} item={item} isTh={isTh} />)
                : empty(isTh ? 'ไม่มีนิทรรศการที่ผ่านมา' : 'No past exhibitions')}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
