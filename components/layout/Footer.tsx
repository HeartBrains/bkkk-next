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

  const instagram = settings?.social?.instagram ?? 'https://www.instagram.com/bangkok_kunsthalle/'
  const facebook = settings?.social?.facebook ?? 'https://www.facebook.com/BangkokKunsthalle'
  const email = settings?.social?.email ?? 'info@bangkok-kunsthalle.org'

  return (
    <footer className="w-full bg-black text-white md:px-12 p-[48px] pl-[24px] sm:p-[24px]">
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-12 md:gap-0 mr-[5%] md:pr-[2%]">

        {/* Logo */}
        <div className="flex flex-col">
          <span className="font-sans text-sm tracking-widest uppercase text-white">
            Bangkok Kunsthalle
          </span>
        </div>

        {/* Nav + socials */}
        <div className="w-full lg:w-1/2 md:w-2/3 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-0">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 text-sm md:text-base font-normal tracking-wide">
            <Link
              href="/support"
              className={`hover:text-gray-300 transition-colors text-left ${isTh ? 'leading-[1.82em]' : ''}`}
            >
              {isTh ? 'การสนับสนุน' : 'Sponsorship'}
            </Link>
            <Link
              href="/contact"
              className={`hover:text-gray-300 transition-colors text-left ${isTh ? 'leading-[1.82em]' : ''}`}
            >
              {isTh ? 'สมัครรับข่าวสาร' : 'Subscription'}
            </Link>
          </div>

          <div className="flex-1 flex justify-start md:justify-around items-center gap-6 w-[80%] sm:w-[40%] px-0 md:px-[29px] py-[0px]">
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
