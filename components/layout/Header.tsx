'use client'

import { useState, useEffect } from 'react'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MenuOverlay } from './MenuOverlay'
import Link from 'next/link'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 px-[5%] py-6 flex justify-between items-start md:items-center transition-all duration-300 bg-transparent">
        <div className="cursor-pointer mt-0 mr-0 mb-0 ml-0 p-0 overflow-visible">
          <Link href="/bangkok">
            <span
              className={`font-sans text-sm tracking-widest uppercase transition-all duration-300 ${
                scrolled ? 'opacity-0 invisible' : 'opacity-100 visible'
              }`}
            >
              Bangkok Kunsthalle
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-4 mr-[-2%]">
          <Button
            variant="ghost"
            onClick={() => setMenuOpen(true)}
            className="w-[9vw] h-[9vw] min-w-[9vw] min-h-[9vw] md:w-[6vw] md:h-[6vw] md:min-w-[6vw] md:min-h-[6vw] !p-0 transition-colors hover:bg-transparent text-black"
            aria-label="Open menu"
          >
            <Menu className="!w-[100%] !h-[82%] md:!w-[45%] md:!h-[45%]" strokeWidth={1.5} />
          </Button>
        </div>
      </header>
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
