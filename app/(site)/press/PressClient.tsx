'use client'

import { useLanguage } from '@/utils/languageContext'
import type { WPPost } from '@/lib/types'

export function PressClient({ posts }: { posts: WPPost[] }) {
  const { language } = useLanguage()
  const isTh = language === 'th'

  return (
    <div className="w-full px-6 py-12 md:py-20">
      <h1 className={`text-3xl md:text-4xl font-sans mb-8 text-gray-900 ${isTh ? 'leading-[1.82em]' : ''}`}>
        {isTh ? 'สื่อมวลชน' : 'Press'}
      </h1>
      <div className="grid gap-8">
        {posts.map((item) => {
          const title = isTh ? String(item.acf?.title_th ?? item.title) : item.title
          const link = item.acf?.link ? String(item.acf.link) : null
          const type = item.acf?.type ? String(item.acf.type) : 'article'
          return (
            <div key={item.slug} className="border-b border-gray-200 py-8">
              <p className={`text-gray-500 mb-2 ${isTh ? 'leading-[1.82em]' : ''}`}>{item.date}</p>
              <h2 className={`text-2xl font-sans text-black mb-4 ${isTh ? 'leading-[1.82em]' : ''}`}>
                {title}
              </h2>
              {link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-black underline underline-offset-4 hover:text-gray-600 transition-colors ${isTh ? 'leading-[1.82em]' : ''}`}
                >
                  {type === 'pdf'
                    ? (isTh ? 'ดาวน์โหลด PDF' : 'Download PDF')
                    : (isTh ? 'อ่านบทความ' : 'Read Article')}
                </a>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
