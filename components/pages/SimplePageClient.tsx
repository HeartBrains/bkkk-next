'use client'

import { useLanguage } from '@/utils/languageContext'

interface Props {
  title: { en: string; th: string }
  body?: { en: string; th: string }
}

export function SimplePageClient({ title, body }: Props) {
  const { language } = useLanguage()
  const isTh = language === 'th'
  return (
    <div className="w-full px-[5%] pt-[96px] pb-[0px]">
      <div className="flex flex-col md:flex-row gap-12 md:gap-0">
        <aside className="w-full md:w-1/2 shrink-0">
          <h1 className={`text-xl md:text-2xl font-sans font-normal text-black ${isTh ? 'leading-[1.82em]' : ''}`}>
            {isTh ? title.th : title.en}
          </h1>
        </aside>
        <main className="w-full md:w-1/2">
          {body && (
            <p className={`text-xl md:text-2xl font-sans font-normal text-black ${isTh ? 'leading-[1.82em]' : ''}`}>
              {isTh ? body.th : body.en}
            </p>
          )}
        </main>
      </div>
    </div>
  )
}
