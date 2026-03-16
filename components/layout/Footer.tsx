'use client'

import { Instagram, Facebook, AtSign } from 'lucide-react'
import { useLanguage } from '@/utils/languageContext'
import Link from 'next/link'
import type { SiteSettings } from '@/lib/types'

interface FooterProps {
  settings?: SiteSettings | null
}

export function Footer({ settings }: FooterProps) {
  const { language } = useLanguage()
  const isTh = language === 'th'

  const instagram = settings?.social.instagram ?? 'https://www.instagram.com/bangkok_kunsthalle/'
  const facebook = settings?.social.facebook ?? 'https://www.facebook.com/BangkokKunsthalle'
  const email = settings?.social.email ?? 'info@bangkok-kunsthalle.org'

  return (
    <footer className="w-full bg-black text-white px-[6vw] py-12">
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-12 md:gap-0">
        {/* Logo / name */}
        <div className="flex flex-col">
          <span className={`text-base font-medium tracking-widest uppercase ${isTh ? 'leading-[1.82em]' : ''}`}>
            Bangkok Kunsthalle
          </span>
        </div>

        {/* Nav + socials */}
        <div className="w-full lg:w-1/2 md:w-2/3 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-0">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 text-sm font-normal tracking-wide">
            <Link
              href="/support"
              className={`hover:text-gray-300 transition-colors ${isTh ? 'leading-[1.82em]' : ''}`}
            >
              {isTh ? 'การสนับสนุน' : 'Sponsorship'}
            </Link>
            <Link
              href="/contact"
              className={`hover:text-gray-300 transition-colors ${isTh ? 'leading-[1.82em]' : ''}`}
            >
              {isTh ? 'สมัครรับข่าวสาร' : 'Subscription'}
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <a href={instagram} target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors" aria-label="Instagram">
              <Instagram className="w-5 h-5" />
            </a>
            <a href={facebook} target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors" aria-label="Facebook">
              <Facebook className="w-5 h-5" />
            </a>
            <a href={`mailto:${email}`} className="hover:text-gray-300 transition-colors" aria-label="Email">
              <AtSign className="w-5 h-5" />
            </a>
          </div>

          <span className="text-[10px] text-gray-500 font-medium whitespace-nowrap">
            ©2026 Bangkok Kunsthalle
          </span>
        </div>
      </div>
    </footer>
  )
}
