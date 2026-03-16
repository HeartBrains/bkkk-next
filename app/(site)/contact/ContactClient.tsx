'use client'

import { useState } from 'react'
import { useLanguage } from '@/utils/languageContext'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export function ContactClient() {
  const { language } = useLanguage()
  const isTh = language === 'th'
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [form, setForm] = useState({ email: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="bg-white min-h-screen pb-24 font-sans text-black">
      <div className="w-full h-[60vh] md:h-[80vh] bg-[#D9D9D9] relative overflow-hidden">
        <img
          src="https://irp.cdn-website.com/5516674f/dms3rep/multi/cover-contact-1-89b6eddb.jpg"
          alt="Bangkok Kunsthalle"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full px-6 pt-24">
        <div className="flex flex-col md:flex-row mb-32 md:mb-40">
          <div className="w-full md:w-1/2 mb-12 md:mb-0">
            <h1 className={`text-xl md:text-2xl font-normal md:ml-[24px] ${isTh ? 'leading-[1.82em]' : ''}`}>
              {isTh ? 'ติดต่อบางกอก คุนซ์ฮาลเล่' : 'Connect with Bangkok Kunsthalle'}
            </h1>
          </div>

          <div className="w-full md:w-1/2 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <p className={`text-xl md:text-2xl font-normal ${isTh ? 'leading-[1.82em]' : 'leading-tight'}`}>
                {isTh
                  ? 'สำหรับข้อสอบถามเกี่ยวกับนิทรรศการ สื่อมวลชน การเยี่ยมชมส่วนตัว หรือวัตถุประสงค์ทางการศึกษา'
                  : 'For inquiries regarding exhibitions, press, private visits, or educational purpose.'}
              </p>
              <p className={`text-xl md:text-2xl font-normal mt-4 ${isTh ? 'leading-[1.82em]' : 'leading-tight'}`}>
                {isTh ? 'กรุณาฝากข้อความด้านล่าง หรือติดต่อเราทางอีเมล: ' : 'Please leave a message below, or contact us by email: '}
                <a href="mailto:info@bangkok-kunsthalle.org" className="underline hover:no-underline">
                  info@bangkok-kunsthalle.org
                </a>
              </p>
            </div>

            {status === 'sent' ? (
              <p className={`text-xl md:text-2xl font-normal text-black ${isTh ? 'leading-[1.82em]' : ''}`}>
                {isTh ? 'ขอบคุณสำหรับข้อความของคุณ' : 'Thank you for your message.'}
              </p>
            ) : (
              <form className="flex flex-col gap-6 w-full max-w-lg" onSubmit={handleSubmit}>
                <Input
                  placeholder={isTh ? 'อีเมล' : 'Email'}
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="rounded-none border-gray-300 h-12 text-[19px] placeholder:text-gray-400 font-sans"
                />
                <Textarea
                  placeholder={isTh ? 'ข้อความ' : 'Message'}
                  required
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="rounded-none border-gray-300 text-[19px] placeholder:text-gray-400 font-sans resize-none"
                />
                <Button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full rounded-none bg-black text-white hover:bg-gray-800 h-12 text-[19px] font-sans font-normal"
                >
                  {status === 'sending'
                    ? (isTh ? 'กำลังส่ง...' : 'Sending...')
                    : (isTh ? 'ส่งข้อความ' : 'Send Message')}
                </Button>
                {status === 'error' && (
                  <p className="text-red-500 text-sm">{isTh ? 'เกิดข้อผิดพลาด กรุณาลองใหม่' : 'Something went wrong. Please try again.'}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
