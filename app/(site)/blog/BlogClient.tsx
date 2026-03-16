'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/utils/languageContext'
import type { WPPost } from '@/lib/types'

export function BlogClient({ posts }: { posts: WPPost[] }) {
  const { language } = useLanguage()
  const isTh = language === 'th'
  const [selectedYear, setSelectedYear] = useState<string>('all')

  const blogsByYear = useMemo(() => {
    const grouped = posts.reduce<Record<string, WPPost[]>>((acc, post) => {
      const year = post.date.match(/\d{4}/)?.[0] ?? '2025'
      if (!acc[year]) acc[year] = []
      acc[year].push(post)
      return acc
    }, {})
    return Object.keys(grouped)
      .sort((a, b) => parseInt(b) - parseInt(a))
      .map((year) => ({ year, posts: grouped[year] }))
  }, [posts])

  const years = ['all', ...blogsByYear.map((y) => y.year)]
  const filtered = selectedYear === 'all' ? blogsByYear : blogsByYear.filter((y) => y.year === selectedYear)

  return (
    <div className="w-full px-[5%] pt-[96px] pb-[0px]">
      <div className="flex flex-col">
        <aside className="w-full shrink-0 h-fit mb-12">
          <nav className="flex flex-col items-start gap-2">
            <h2 className={`text-xl md:text-2xl font-sans font-medium text-black mb-4 ${isTh ? 'leading-[1.82em]' : ''}`}>
              {isTh ? 'บล็อก' : 'Blog'}
            </h2>
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`text-left text-xl md:text-2xl font-sans transition-all duration-300 ${
                  selectedYear === year ? 'text-black font-medium' : 'text-gray-400 hover:text-black font-normal'
                }`}
              >
                {year === 'all' ? (isTh ? 'ทั้งหมด' : 'All') : year}
              </button>
            ))}
          </nav>
        </aside>

        <main className="w-full min-h-[50vh]">
          {filtered.map(({ year, posts: yearPosts }) => (
            <div key={year} id={`year-${year}`} className="mb-24 scroll-mt-32">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-24">
                {yearPosts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="flex flex-col gap-6 cursor-pointer group w-full">
                    <div className="aspect-[3/4] w-full bg-gray-100 overflow-hidden">
                      {post.featuredImage?.sourceUrl ? (
                        <img src={post.featuredImage.sourceUrl} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" loading="lazy" />
                      ) : (
                        <div className="w-full h-full bg-gray-100" />
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className={`text-xl md:text-2xl font-sans text-black font-normal leading-tight ${isTh ? 'leading-[1.82em]' : ''}`}>
                        {isTh ? (post.acf?.title_th || post.title) : post.title}
                      </h3>
                      <p className={`text-xl md:text-2xl font-sans text-black font-normal leading-tight ${isTh ? 'leading-[1.82em]' : ''}`}>
                        {post.date}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  )
}
