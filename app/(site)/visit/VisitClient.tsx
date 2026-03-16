'use client'

import { useLanguage } from '@/utils/languageContext'

function Row({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-x-8 mb-16 md:mb-20">
      <div className="md:col-span-6">
        <span className="text-xl md:text-2xl font-sans text-black">{label}</span>
      </div>
      <div className="md:col-span-6 flex flex-col gap-8">{children}</div>
    </div>
  )
}

export function VisitClient() {
  const { language } = useLanguage()
  const isTh = language === 'th'
  const t = (en: string, th: string) => isTh ? th : en
  const cls = `text-xl md:text-2xl font-sans text-black ${isTh ? 'leading-[1.82em]' : ''}`
  const clsGray = `text-xl md:text-2xl font-sans text-gray-500 ${isTh ? 'leading-[1.82em]' : ''}`

  return (
    <div className="flex flex-col gap-0">
      {/* Location */}
      <Row label={t('Location', 'สถานที่')}>
        <div className="flex flex-col gap-1">
          <p className={cls}>{t('Bangkok Kunsthalle', 'บางกอก คุนซ์ฮาลเล่')}</p>
          <p className={cls}>{t('599 Pantachit Alley, Pom Prap,', '599 ซอย พันธจิตต์ แขวงป้อมปราบ')}</p>
          <p className={cls}>{t('Pom Prap Sattru Phai, Bangkok,', 'เขตป้อมปราบศัตรูพาย กรุงเทพมหานคร 10100')}</p>
          {!isTh && <p className={cls}>10100 Thailand</p>}
        </div>
        <div className="flex flex-col gap-1">
          <p className={cls}>{t('Opening Hours', 'เวลาทำการ')}</p>
          <p className={cls}>{t('Wednesday – Sunday', 'วันพุธ – วันอาทิตย์')}</p>
          <p className="text-xl md:text-2xl font-sans text-black">14:00 – 20:00</p>
          <p className={`${cls} mt-2`}>{t('Closed: Monday – Tuesday', 'ปิดทำการ: วันจันทร์ – วันอังคาร')}</p>
        </div>
        <div className="w-full aspect-square md:aspect-[4/3] bg-[#D9D9D9] relative overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.640882!2d100.5151093!3d13.7403172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e299183fb5ee6b%3A0xf0317ecca013dd7b!2sBangkok%20Kunsthalle!5e0!3m2!1sen!2sth!4v1710417600000!5m2!1sen!2sth&z=21"
            title="Bangkok Kunsthalle Map"
            width="100%" height="100%"
            style={{ border: 0 }}
            allowFullScreen loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
        </div>
      </Row>

      {/* Admission */}
      <Row label={t('Admission', 'ค่าเข้าชม')}>
        <div className="flex flex-col gap-1">
          {isTh ? (
            <><p className={cls}>เข้าชมนิทรรศการฟรี ยกเว้น</p><p className={cls}>กิจกรรมพิเศษที่อาจมีค่าใช้จ่ายแตกต่างกัน</p></>
          ) : (
            <><p className={cls}>Entry to exhibitions is free, except for</p><p className={cls}>special events, charges will vary.</p></>
          )}
        </div>
      </Row>

      {/* Transportation */}
      <Row label={t('Transportation', 'การเดินทาง')}>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <p className={cls}>{t('MRT', 'รถไฟฟ้าใต้ดิน')}</p>
            <div className="flex flex-col gap-4">
              <div><p className={cls}>{t('Hua Lamphong Station', 'สถานีหัวลำโพง')}</p><p className={clsGray}>{t('6 – 7 minute walk.', 'เดิน 6 – 7 นาที')}</p></div>
              <div><p className={cls}>{t('Wat Mangkon Station', 'สถานีวัดมังกร')}</p><p className={clsGray}>{t('10 – 12 minute walk.', 'เดิน 10 – 12 นาที')}</p></div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className={cls}>{t('Taxi or Grab', 'แท็กซี่หรือแกร็บ')}</p>
            <p className={`${cls} mt-2`}>
              {isTh ? <>ค้นหา "<a href="https://maps.app.goo.gl/88XLQBeDFaC1wvuQA" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">บางกอก คุนซ์ฮาลเล่</a>"</> : <>Search for "<a href="https://maps.app.goo.gl/88XLQBeDFaC1wvuQA" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Bangkok Kunsthalle</a>"</>}
            </p>
            <p className={cls}>{t('or show the driver this address in Thai:', 'หรือแสดงที่อยู่นี้ให้คนขับ:')}</p>
            <p className="text-xl md:text-2xl font-sans text-black mt-2 leading-[1.82em]">599 ซอย พันธจิตต์ แขวงป้อมปราบ</p>
            <p className="text-xl md:text-2xl font-sans text-black leading-[1.82em]">เขตป้อมปราบศัตรูพาย กรุงเทพมหานคร</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className={cls}>{t('Boat', 'เรือ')}</p>
            <p className={`${cls} mt-2`}>{t('For a more scenic route, take the Chao Phraya Express Boat to Marine Department (N4)', 'สำหรับเส้นทางที่สวยงามกว่า นั่งเรือด่วนเจ้าพระยาไปที่ท่ากรมเจ้าท่า (N4)')}</p>
            <p className={clsGray}>{t('with a 15 minute walk.', 'เดิน 15 นาที')}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className={cls}>{t('Car & Parking', 'รถยนต์และที่จอดรถ')}</p>
            {isTh ? (
              <>
                <p className={`${cls} mt-2`}>ที่จอดรถในสถานที่มีจำกัดมากเนื่องจากตั้งอยู่ในซอยแคบ</p>
                <p className={`${cls} mt-4`}>แนะนำอย่างยิ่งให้จอดรถที่ลานจอดรถเชิงพาณิชย์ใกล้เคียง:</p>
                <p className={`${cls} mt-2`}><a href="https://maps.app.goo.gl/bz9RmmiWfELuy4MV6" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">อาคารจอดรถ Moh Mee Development</a></p>
                <p className={cls}><a href="https://maps.app.goo.gl/Djd42rKh3Wqt4cvv5" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">ลานจอดรถสถานีรถไฟหัวลำโพง</a></p>
              </>
            ) : (
              <>
                <p className={`${cls} mt-2`}>On-site parking is extremely limited due to our location in a narrow alley.</p>
                <p className={`${cls} mt-4`}>It is highly recommended to park at nearby commercial lots:</p>
                <p className={`${cls} mt-2`}><a href="https://maps.app.goo.gl/bz9RmmiWfELuy4MV6" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Moh Mee Development Parking Building</a></p>
                <p className={cls}><a href="https://maps.app.goo.gl/Djd42rKh3Wqt4cvv5" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Hua Lamphong railway station car park</a></p>
              </>
            )}
          </div>
        </div>
      </Row>
    </div>
  )
}
