'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/utils/languageContext'
import type { WPPost } from '@/lib/types'

interface Props {
  posts: WPPost[]
  type: string
  navLabel: { en: string; th: string }
  emptyLabel: { en: string; th: string }
  tags?: { en: string[]; th: string[] }
}

export function ListingClient({ posts, type, navLabel, emptyLabel, tags }: Props) {
  const { language } = useLanguage()
  const isTh = language === 'th'
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const tagList = tags ? (isTh ? tags.th : tags.en) : []
  const enTagList = tags?.en ?? []
  const thTagList = tags?.th ?? []

  const filtered = selectedTags.length === 0 ? posts : posts.filter((p) => {
    const rawCats = p.acf?.categories
    const cats = typeof rawCats === 'string' ? rawCats.split(',').map((c) => c.trim()) : []
    const enSelected = selectedTags.map((t) => {
      const idx = thTagList.indexOf(t)
      return idx >= 0 ? enTagList[idx] : t
    })
    return cats.some((c: string) => enSelected.includes(c))
  })

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag])
  }

  return (
    <div className="w-full px-[5%] pt-[96px] pb-[0px]">
      <div className="flex flex-col md:flex-row gap-12 md:gap-0">
        <aside className="w-full md:w-1/2 shrink-0">
          <nav className="md:sticky md:top-32 flex flex-col items-start gap-2">
            <h2 className={`text-xl md:text-2xl font-sans font-medium text-black mb-4 ${isTh ? 'leading-[1.82em]' : ''}`}>
              {isTh ? navLabel.th : navLabel.en}
            </h2>
            {tagList.length > 0 && (
              <>
                <h3 className={`text-xl md:text-2xl font-sans font-normal text-gray-400 mb-4 mt-8 ${isTh ? 'leading-[1.82em]' : ''}`}>
                  {isTh ? 'จัดเรียงตามแท็ก' : 'Sort by Tags'}
                </h3>
                {tagList.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`text-left text-xl md:text-2xl font-sans transition-all duration-300 ${
                      selectedTags.includes(tag) ? 'text-black font-medium' : 'text-gray-400 hover:text-black font-normal'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </>
            )}
          </nav>
        </aside>

        <main className="w-full md:w-1/2 flex flex-col gap-16">
          {filtered.length > 0 ? filtered.map((item) => (
            <Link key={item.slug} href={`/${type}/${item.slug}`} className="flex flex-col gap-6 w-full cursor-pointer group">
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
          )) : (
            <p className={`text-xl md:text-2xl font-normal text-gray-400 ${isTh ? 'leading-[1.82em]' : ''}`}>
              {isTh ? emptyLabel.th : emptyLabel.en}
            </p>
          )}
        </main>
      </div>
    </div>
  )
}
