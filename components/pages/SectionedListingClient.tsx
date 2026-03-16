'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/utils/languageContext'
import type { WPPost } from '@/lib/types'

interface SectionLabels {
  upcoming: { en: string; th: string }
  current: { en: string; th: string }
  past: { en: string; th: string }
}

interface Props {
  type: string
  upcoming: WPPost[]
  current: WPPost[]
  past: WPPost[]
  labels: SectionLabels
}

function PostCard({ item, type, isTh }: { item: WPPost; type: string; isTh: boolean }) {
  return (
    <Link href={`/${type}/${item.slug}`} className="flex flex-col gap-6 w-full cursor-pointer group">
      <div className="aspect-[3/4] w-full bg-gray-100 overflow-hidden">
        {item.featuredImage?.sourceUrl ? (
          <img src={item.featuredImage.sourceUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" loading="lazy" />
        ) : (
          <div className="w-full h-full bg-gray-100" />
        )}
      </div>
      <div className="flex flex-col gap-1">
        <h3 className={`text-xl md:text-2xl font-normal text-black leading-tight ${isTh ? 'leading-[1.82em]' : ''}`}>
          {isTh ? (item.acf?.title_th || item.title) : item.title}
        </h3>
        {item.acf?.artist && (
          <p className={`text-xl md:text-2xl font-normal text-black leading-tight ${isTh ? 'leading-[1.82em]' : ''}`}>
            {isTh ? (item.acf?.artist_th || item.acf?.artist) : item.acf?.artist}
          </p>
        )}
        <p className={`text-xl md:text-2xl font-normal text-black leading-tight mt-2 ${isTh ? 'leading-[1.82em]' : ''}`}>
          {isTh ? (item.acf?.date_display_th || item.acf?.date_display || item.date) : (item.acf?.date_display || item.date)}
        </p>
      </div>
    </Link>
  )
}

export function SectionedListingClient({ type, upcoming, current, past, labels }: Props) {
  const { language } = useLanguage()
  const isTh = language === 'th'
  const [activeSection, setActiveSection] = useState('current')

  const sections = [
    ...(upcoming.length > 0 ? [{ id: 'upcoming', label: isTh ? labels.upcoming.th : labels.upcoming.en }] : []),
    ...(current.length > 0 ? [{ id: 'current', label: isTh ? labels.current.th : labels.current.en }] : []),
    ...(past.length > 0 ? [{ id: 'past', label: isTh ? labels.past.th : labels.past.en }] : []),
  ]

  const scrollToSection = (id: string) => {
    const el = document.getElementById(`section-${id}`)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 120, behavior: 'smooth' })
  }

  useEffect(() => {
    const handleScroll = () => {
      const pos = window.scrollY + 200
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(`section-${sections[i].id}`)
        if (el && el.offsetTop <= pos) { setActiveSection(sections[i].id); break }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

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
          {upcoming.length > 0 && (
            <section id="section-upcoming" className="mb-32 md:mb-40 scroll-mt-32 w-full">
              <div className="flex flex-col gap-12 md:gap-16 md:items-end">
                {upcoming.map((item) => <PostCard key={item.slug} item={item} type={type} isTh={isTh} />)}
              </div>
            </section>
          )}
          {current.length > 0 && (
            <section id="section-current" className="mb-32 md:mb-40 scroll-mt-32 w-full">
              <div className="flex flex-col gap-12 md:gap-16 md:items-end">
                {current.map((item) => <PostCard key={item.slug} item={item} type={type} isTh={isTh} />)}
              </div>
            </section>
          )}
          {past.length > 0 && (
            <section id="section-past" className="mb-32 md:mb-40 scroll-mt-32 w-full">
              <div className="flex flex-col gap-12 md:gap-16 md:items-end">
                {past.map((item) => <PostCard key={item.slug} item={item} type={type} isTh={isTh} />)}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
