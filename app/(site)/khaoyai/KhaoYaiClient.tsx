'use client'

import { useLanguage } from '@/utils/languageContext'

export function KhaoYaiClient() {
  const { language } = useLanguage()
  const isTh = language === 'th'
  const cls = `text-xl md:text-2xl font-sans text-black ${isTh ? 'leading-[1.82em]' : ''}`

  return (
    <div className="w-full px-[5%] pt-[96px] pb-[0px]">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-8">
        <div className="md:col-span-6">
          <h1 className={cls}>{isTh ? 'เขาใหญ่' : 'Khao Yai'}</h1>
        </div>
        <div className="md:col-span-6 flex flex-col gap-6">
          {isTh ? (
            <>
              <p className={cls}>บางกอก คุนซ์ฮาลเล่ เขาใหญ่ เป็นพื้นที่ศิลปะแห่งที่สองของเรา ตั้งอยู่ในอุทยานแห่งชาติเขาใหญ่</p>
              <p className={cls}>ที่อยู่: เขาใหญ่ นครราชสีมา ประเทศไทย</p>
            </>
          ) : (
            <>
              <p className={cls}>Bangkok Kunsthalle Khao Yai is our second art space, located within Khao Yai National Park.</p>
              <p className={cls}>Address: Khao Yai, Nakhon Ratchasima, Thailand</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
