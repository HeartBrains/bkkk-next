'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/utils/languageContext'
import type { WPPost } from '@/lib/types'

interface Props {
  currentExhibitions: WPPost[]
  upcomingExhibitions: WPPost[]
  activities: WPPost[]
  blog: WPPost[]
  visibility: Record<string, boolean>
}

export function BangkokClient({ currentExhibitions, upcomingExhibitions, activities, blog, visibility }: Props) {
  const { language } = useLanguage()
  const isTh = language === 'th'
  const [activeSection, setActiveSection] = useState('current-exhibitions')

  const sections = useMemo(() => [
    { id: 'current-exhibitions', label: isTh ? 'นิทรรศการปัจจุบัน' : 'Current Exhibitions' },
    { id: 'upcoming-exhibitions', label: isTh ? 'นิทรรศการที่กำลังจะเริ่ม' : 'Upcoming Exhibitions' },
    { id: 'current-activities', label: isTh ? 'กิจกรรมปัจจุบัน' : 'Current Activities' },
  ], [isTh])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 120
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const pos = window.scrollY + 200
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id)
        if (el && el.offsetTop <= pos) {
          setActiveSection(sections[i].id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  return (
    <div className="w-full px-[5%] pt-[96px] pb-[0px]">
      <div className="flex flex-col md:flex-row gap-12 md:gap-0">

        {/* Sticky nav */}
        <aside className="w-full md:w-1/2 shrink-0">
          <nav className="md:sticky md:top-32 flex flex-col items-start gap-2">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => { setActiveSection(s.id); setTimeout(() => scrollToSection(s.id), 100) }}
                className={`text-left text-xl md:text-2xl font-sans font-normal transition-all duration-300 ${
                  activeSection === s.id ? 'text-black' : 'text-gray-400 hover:text-black'
                }`}
              >
                {s.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <div className="w-full md:w-1/2 flex flex-col md:items-end">

          {/* Current Exhibitions */}
          <section id="current-exhibitions" className="mb-32 md:mb-40 scroll-mt-32 w-full">
            <div className="flex flex-col gap-12 md:gap-16 md:items-end">
              {currentExhibitions.length > 0 ? currentExhibitions.map((item) => (
                <Link key={item.slug} href={`/exhibitions/${item.slug}`} className="flex flex-col gap-6 w-full cursor-pointer group">
                  <div className="aspect-[3/4] w-full bg-gray-100 overflow-hidden relative">
                    {item.featuredImage?.sourceUrl && (
                      <img
                        src={item.featuredImage.sourceUrl}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className={`text-xl md:text-2xl font-normal leading-tight ${isTh ? 'leading-[1.82em]' : ''}`}>{isTh ? (item.acf?.title_th || item.title) : item.title}</h3>
                    <p className={`text-xl md:text-2xl font-normal text-black leading-tight ${isTh ? 'leading-[1.82em]' : ''}`}>{isTh ? (item.acf?.artist_th || item.acf?.artist) : item.acf?.artist}</p>
                    <p className={`text-xl md:text-2xl font-normal text-black leading-tight mt-2 ${isTh ? 'leading-[1.82em]' : ''}`}>{isTh ? (item.acf?.date_display_th || item.acf?.date_display) : item.acf?.date_display}</p>
                  </div>
                </Link>
              )) : (
                <p className={`text-xl md:text-2xl font-normal text-gray-400 ${isTh ? 'leading-[1.82em]' : ''}`}>
                  {isTh ? 'ไม่มีนิทรรศการในขณะนี้' : 'No current exhibitions'}
                </p>
              )}
            </div>
          </section>

          {/* Upcoming Exhibitions */}
          <section id="upcoming-exhibitions" className="mb-32 md:mb-40 scroll-mt-32 w-full">
            <div className="flex flex-col gap-12 md:gap-16 md:items-end">
              {upcomingExhibitions.length > 0 ? upcomingExhibitions.map((item) => (
                <Link key={item.slug} href={`/exhibitions/${item.slug}`} className="flex flex-col gap-6 w-full cursor-pointer group">
                  <div className="aspect-[3/4] w-full bg-gray-100 overflow-hidden relative">
                    {item.featuredImage?.sourceUrl && (
                      <img
                        src={item.featuredImage.sourceUrl}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className={`text-xl md:text-2xl font-normal leading-tight ${isTh ? 'leading-[1.82em]' : ''}`}>{isTh ? (item.acf?.title_th || item.title) : item.title}</h3>
                    <p className={`text-xl md:text-2xl font-normal text-black leading-tight ${isTh ? 'leading-[1.82em]' : ''}`}>{isTh ? (item.acf?.artist_th || item.acf?.artist) : item.acf?.artist}</p>
                    <p className={`text-xl md:text-2xl font-normal text-black leading-tight mt-2 ${isTh ? 'leading-[1.82em]' : ''}`}>{isTh ? (item.acf?.date_display_th || item.acf?.date_display) : item.acf?.date_display}</p>
                  </div>
                </Link>
              )) : (
                <p className={`text-xl md:text-2xl font-normal text-gray-400 ${isTh ? 'leading-[1.82em]' : ''}`}>
                  {isTh ? 'ไม่มีนิทรรศการที่กำลังจะเริ่ม' : 'No upcoming exhibitions'}
                </p>
              )}
            </div>
          </section>

          {/* Current Activities */}
          {visibility.homeActivities !== false && (
            <section id="current-activities" className="mb-32 md:mb-40 scroll-mt-32 w-full">
              <div className="flex flex-col gap-12 md:gap-16 md:items-end">
                {activities.length > 0 ? activities.map((item) => (
                  <Link key={item.slug} href={`/activities/${item.slug}`} className="flex flex-col gap-6 w-full cursor-pointer group">
                    <div className="aspect-[3/4] w-full bg-gray-100 overflow-hidden relative">
                      {item.featuredImage?.sourceUrl && (
                        <img
                          src={item.featuredImage.sourceUrl}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          loading="lazy"
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className={`text-xl md:text-2xl font-normal leading-tight ${isTh ? 'leading-[1.82em]' : ''}`}>{isTh ? (item.acf?.title_th || item.title) : item.title}</h3>
                      {item.acf?.artist && <p className={`text-xl md:text-2xl font-normal text-black leading-tight ${isTh ? 'leading-[1.82em]' : ''}`}>{isTh ? (item.acf?.artist_th || item.acf?.artist) : item.acf?.artist}</p>}
                      <p className={`text-xl md:text-2xl font-normal text-black leading-tight mt-2 ${isTh ? 'leading-[1.82em]' : ''}`}>{item.date}</p>
                    </div>
                  </Link>
                )) : (
                  <p className={`text-xl md:text-2xl font-normal text-gray-400 ${isTh ? 'leading-[1.82em]' : ''}`}>
                    {isTh ? 'ไม่มีกิจกรรมในขณะนี้' : 'No current activities'}
                  </p>
                )}
              </div>
            </section>
          )}

        </div>
      </div>
    </div>
  )
}
