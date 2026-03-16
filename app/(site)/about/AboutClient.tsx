'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/utils/languageContext'

type Tab = 'about' | 'history'

export function AboutClient() {
  const { language } = useLanguage()
  const isTh = language === 'th'
  const [tab, setTab] = useState<Tab>('about')

  return (
    <div id="about-content-area" className="w-full px-6 pt-[96px] pr-[24px] pb-[0px] md:pl-[48px]">
      <div className="flex flex-col md:flex-row">
        <aside className="w-full md:w-1/2 shrink-0 h-fit mb-12 md:mb-0">
          <nav className="flex flex-col items-start gap-2">
            {(['about', 'history'] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`text-left text-xl md:text-2xl font-sans transition-all duration-300 ${isTh ? 'leading-[1.82em]' : ''} ${
                  tab === t ? 'text-black font-medium' : 'text-gray-400 hover:text-black font-normal'
                }`}
              >
                {t === 'about' ? (isTh ? 'เกี่ยวกับเรา' : 'About Us') : (isTh ? 'ประวัติ' : 'History')}
              </button>
            ))}
          </nav>
        </aside>

        <main className="w-full md:w-1/2 min-h-[50vh]">
          {tab === 'about' && (
            <div className={`flex flex-col gap-6 text-xl md:text-2xl font-normal leading-tight ${isTh ? 'leading-[1.82em]' : ''}`}>
              {isTh ? (
                <>
                  <p className="leading-[1.82em]">บางกอก คุนซ์ฮาลเล่ เป็นสถาบันทางวัฒนธรรมที่มีพลวัต เข้มงวด และเข้าถึงได้ ที่อุทิศตนเพื่อศิลปะ ภาพยนตร์ ดนตรี การเต้นรำ วรรณกรรม สถาปัตยกรรม และภาษาสร้างสรรค์อื่นๆ บางกอก คุนซ์ฮาลเล่ เป็นตัวแทนของรูปแบบใหม่ของพิพิธภัณฑ์ศิลปะ สถาบันทางเลือกนี้ตั้งอยู่ในอาคารไทยวัฒนาพาณิชย์ที่ถูกทิ้งร้าง ซึ่งเป็นโรงพิมพ์ชั้นนำที่ถูกไฟไหม้ในปี พ.ศ. 2544 พื้นที่ดิบๆ สไตล์อุตสาหกรรมนำเสนอแพลตฟอร์มใหม่และเป็นผู้บุกเบิกที่สะท้อนคุณภาพของงานศิลปะที่ถูกเลือกมาจัดแสดงที่นั่น</p>
                  <p className="leading-[1.82em]">บางกอก คุนซ์ฮาลเล่ เป็นสถาบันที่ขับเคลื่อนโดยศิลปิน ซึ่งการจัดแสดงนิทรรศการใหม่แต่ละครั้งจะเปิดใช้งานพื้นที่ใหม่ในอาคารสไตล์บรูทัลลิสต์ การแทรกแซงทางสถาปัตยกรรมได้รับข้อมูลจากศิลปิน วิสัยทัศน์ และงานศิลปะของพวกเขา ศิลปินที่ได้รับเชิญให้จัดแสดงที่บางกอก คุนซ์ฮาลเล่ ได้รับมอบหมายให้สร้างผลงานเฉพาะสถานที่</p>
                  <p className="leading-[1.82em]">สถาบันภูมิใจในลักษณะการทดลอง ขยายขอบเขตของศิลปะร่วมสมัยผ่านนิทรรศการและโปรแกรมสาธารณะใหม่ๆ โดยแก่นแท้แล้ว บางกอก คุนซ์ฮาลเล่ มุ่งมั่นที่จะเป็นจุดสำคัญของการสนทนาสร้างสรรค์ไม่เพียงแต่สำหรับประเทศไทยเท่านั้น แต่ยังรวมถึงเอเชียตะวันออกเฉียงใต้โดยรวม</p>
                  <p className="leading-[1.82em]">สถาบันจัดนิทรรศการที่มีศิลปินนานาชาติและศิลปินไทย ตลอดทั้งปียังนำเสนอโปรแกรมภาพเคลื่อนไหวและโปรแกรมสาธารณะที่มีพลวัต</p>
                </>
              ) : (
                <>
                  <p>Bangkok Kunsthalle is a dynamic, rigorous and accessible cultural institution devoted to art, cinema, music, dance, literature, architecture and other creative languages. Bangkok Kunsthalle represents a new model of art museum. This alternative institution occupies the abandoned Thai Wattana Panich building, a leading printing house that was razed by fire in 2001. The raw, industrial space presents a novel and pioneering platform which mirrors the quality of artworks chosen to be exhibited there.</p>
                  <p>Bangkok Kunsthalle is an artist driven institution, where each new exhibition activates a new space in the brutalist complex. Architectural interventions are informed by the artists, their vision and artworks. Artists invited to exhibit at Bangkok Kunsthalle are commissioned to make site-specific works addressing the building and surrounding area's rich visual language and cultural history.</p>
                  <p>The institution prides itself in its experimental nature, pushing the boundaries of contemporary art through novel exhibitions and public programs. At its core, Bangkok Kunsthalle strives to be the focal point of creative dialogue for not only Thailand but South-East Asia as a whole.</p>
                  <p>The institution organizes exhibitions featuring international and Thai artists. Throughout the year it also presents a moving image program and a dynamic public program which includes artists' talks, lectures, workshops, screenings and readings.</p>
                </>
              )}
            </div>
          )}

          {tab === 'history' && (
            <div className={`flex flex-col gap-6 text-xl md:text-2xl text-black font-normal leading-tight ${isTh ? 'leading-[1.82em]' : ''}`}>
              {isTh ? (
                <>
                  <p className="leading-[1.82em]">บางกอก คุนซ์ฮาลเล่ ตั้งอยู่ในอาคารไทยวัฒนาพาณิชย์เดิม ตั้งอยู่ทางชายขอบย่านไชน่าทาวน์กรุงเทพฯ ไซต์นี้ทอดข้ามพรมแดนระหว่างกรุงเทพฯ "เก่า" และ "ใหม่" ซึ่งคั่นด้วยคลองผดุงกรุงเกษม ซึ่งเป็นคูนอกสุดท้ายของเมืองประวัติศาสตร์ที่ขุดในปี พ.ศ. 2394</p>
                  <p className="leading-[1.82em]">ไทยวัฒนาพาณิชย์ก่อตั้งขึ้นในปี พ.ศ. 2478 เป็นสำนักพิมพ์ตำรา ในทศวรรษต่อมาธุรกิจขยายตัวอย่างมาก ภายในปี พ.ศ. 2513 โดยผ่านความร่วมมือกับกระทรวงศึกษาธิการ บริษัทได้กลายเป็นหนึ่งในผู้จัดจำหน่ายเอกสารทางการศึกษาแต่เพียงผู้เดียวทั่วประเทศไทย ภายในทศวรรษ 2530 บริษัทกำลังตกต่ำและในปี พ.ศ. 2544 ไฟไหม้ทำลายอาคารจนเหลือเพียงเปลือกที่เป็นเถ้าถ่าน หลังจากวางอยู่อย่างไม่มีพลังเป็นเวลา 23 ปี บางกอก คุนซ์ฮาลเล่ได้ฟื้นฟูอาคารและเปิดตัวเป็นพื้นที่ศิลปะในเดือนมกราคม พ.ศ. 2567</p>
                </>
              ) : (
                <>
                  <p>Bangkok Kunsthalle occupies the former Thai Watana Panich building complex, situated on the periphery of Bangkok's Chinatown. The site straddles the border of "old" and "new" Bangkok, delineated by the Phadung Krung Kasem canal—the last outer moat of the historical city to be dug in 1851.</p>
                  <p>Thai Watana Panich was founded in 1935 as a publisher of textbooks. In the following decades the business expanded significantly. By 1970, through a partnership with the Ministry of Education, the company had become one of the sole distributors of educational materials throughout Thailand. By the 1990s, the company was in decline and in 2001 a conflagration razed the building to an ashen husk. After laying dormant for 23 years, Bangkok Kunsthalle revitalized the building, inaugurating it as an art space in January 2024.</p>
                </>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
