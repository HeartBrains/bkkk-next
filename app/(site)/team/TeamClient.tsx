'use client'

import { useLanguage } from '@/utils/languageContext'

const FOUNDER = {
  name: 'Mark Chearavanont',
  nameTh: 'มาร์ค เจียรวนนท์',
  role: { en: 'Founder & Director', th: 'ผู้ก่อตั้งและผู้อำนวยการ' },
  bio: {
    en: 'Mark Chearavanont is the founder and director of Bangkok Kunsthalle. He has been instrumental in establishing Bangkok Kunsthalle as a leading contemporary art institution in Southeast Asia.',
    th: 'มาร์ค เจียรวนนท์ เป็นผู้ก่อตั้งและผู้อำนวยการของบางกอก คุนซ์ฮาลเล่ เขามีบทบาทสำคัญในการสถาปนาบางกอก คุนซ์ฮาลเล่ให้เป็นสถาบันศิลปะร่วมสมัยชั้นนำในเอเชียตะวันออกเฉียงใต้',
  },
}

const TEAM = [
  { role: { en: 'Curator', th: 'ภัณฑารักษ์' }, members: ['Emma McCormick-Goodhart'] },
  { role: { en: 'Programme Manager', th: 'ผู้จัดการโปรแกรม' }, members: ['Natalie Bruck'] },
  { role: { en: 'Communications', th: 'การสื่อสาร' }, members: ['Cole Lu'] },
]

export function TeamClient() {
  const { language } = useLanguage()
  const isTh = language === 'th'
  const cls = `text-xl md:text-2xl font-sans text-black ${isTh ? 'leading-[1.82em]' : ''}`

  return (
    <div className="w-full px-[5%] pt-[96px] pb-[0px]">
      <div className="flex flex-col gap-16 md:gap-24">
        {/* Founder */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-x-8">
          <div className="md:col-span-6">
            <p className={cls}>{isTh ? FOUNDER.role.th : FOUNDER.role.en}</p>
          </div>
          <div className="md:col-span-6 flex flex-col gap-4">
            <p className={cls}>{isTh ? FOUNDER.nameTh : FOUNDER.name}</p>
            <p className={cls}>{isTh ? FOUNDER.bio.th : FOUNDER.bio.en}</p>
          </div>
        </div>

        {/* Team */}
        {TEAM.map((group) => (
          <div key={group.role.en} className="grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-x-8">
            <div className="md:col-span-6">
              <p className={cls}>{isTh ? group.role.th : group.role.en}</p>
            </div>
            <div className="md:col-span-6 flex flex-col gap-1">
              {group.members.map((m) => <p key={m} className={cls}>{m}</p>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
