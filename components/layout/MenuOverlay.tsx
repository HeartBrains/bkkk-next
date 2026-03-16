'use client'

import { useState } from 'react'
import { X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/utils/languageContext'
import { visibility } from '@/lib/visibility'

interface MenuItem {
  label: string
  href: string
  children?: { label: string; href: string }[]
  hidden?: boolean
}

interface MenuOverlayProps {
  open: boolean
  onClose: () => void
}

export function MenuOverlay({ open, onClose }: MenuOverlayProps) {
  const [expanded, setExpanded] = useState<string[]>([])
  const pathname = usePathname()
  const { language, setLanguage, t, isLanguageSwitcherEnabled } = useLanguage()

  const toggle = (label: string) =>
    setExpanded((prev) =>
      prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label]
    )

  const sitemap: MenuItem[] = [
    { label: t('nav.home'), href: '/bangkok' },
    { label: t('nav.visit'), href: '/visit' },
    {
      label: t('nav.exhibitions'),
      href: '/exhibitions',
      children: [
        { label: t('exhibitions.current'), href: '/exhibitions?section=current-exhibitions' },
        { label: t('exhibitions.upcoming'), href: '/exhibitions?section=upcoming-exhibitions' },
        { label: t('exhibitions.past'), href: '/exhibitions?section=past-exhibitions' },
      ],
    },
    {
      label: t('nav.movingImage'),
      href: '/moving-image',
      hidden: !visibility.movingImage,
      children: [
        { label: t('common.current'), href: '/moving-image?section=current-programs' },
        { label: t('common.upcoming'), href: '/moving-image?section=upcoming-programs' },
        { label: t('common.past'), href: '/moving-image?section=past-programs' },
      ],
    },
    {
      label: t('nav.activities'),
      href: '/activities',
      children: [
        { label: 'Public Program', href: '/activities?section=public-program' },
        { label: 'Screenings', href: '/activities?section=screenings' },
      ],
    },
    {
      label: t('nav.residency'),
      href: '/residency',
      hidden: !visibility.residency,
      children: [
        { label: t('residency.current'), href: '/residency?section=current-artists' },
        { label: t('residency.past'), href: '/residency?section=past-artists' },
      ],
    },
    { label: t('nav.blog'), href: '/blog' },
    {
      label: t('nav.about'),
      href: '/about',
      children: [
        { label: t('nav.vision'), href: '/about/vision' },
        { label: t('nav.founder'), href: '/about/founder' },
      ],
    },
    { label: t('nav.team'), href: '/team' },
    {
      label: t('nav.archives'),
      href: '/archives',
      hidden: !visibility.archives,
    },
    { label: t('nav.shop'), href: '/shop', hidden: !visibility.shop },
    { label: t('nav.press'), href: '/press', hidden: !visibility.press },
    { label: t('nav.contact'), href: '/contact' },
    { label: t('nav.khaoyai'), href: '/khaoyai', hidden: !visibility.khaoyai },
  ]

  const visible = sitemap.filter((item) => !item.hidden)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex text-white"
        >
          {/* Left image panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.5, ease: 'circOut' }}
            className="hidden md:block w-1/2 h-full bg-zinc-900 cursor-pointer"
            onClick={onClose}
          />

          {/* Right nav panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full md:w-1/2 h-full bg-black flex flex-col relative overflow-y-auto"
          >
            {/* Close */}
            <div className="absolute top-[8vh] right-[6vw] z-20">
              <button onClick={onClose} className="hover:opacity-70 transition-opacity">
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Nav links */}
            <motion.nav
              className="flex-1 flex flex-col px-[6vw] pt-[8vh] pb-[10vh]"
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.25 } },
              }}
            >
              <div className="flex flex-col gap-1">
                {visible.map((item) => {
                  const isActive = pathname.startsWith(item.href.split('?')[0])
                  const isExpanded = expanded.includes(item.label)
                  const hasChildren = item.children && item.children.length > 0

                  return (
                    <motion.div
                      key={item.label}
                      variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}
                    >
                      <div className="flex items-center justify-between group">
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className={`text-[18px] font-normal tracking-wide transition-colors duration-200 ${
                            isActive ? 'text-gray-400' : 'text-white hover:text-gray-300'
                          }`}
                        >
                          {item.label}
                        </Link>
                        {hasChildren && (
                          <button
                            onClick={() => toggle(item.label)}
                            className="p-1 text-white hover:text-gray-300"
                            aria-label="Expand"
                          >
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                            />
                          </button>
                        )}
                      </div>

                      {/* Sub-items */}
                      <AnimatePresence>
                        {hasChildren && isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden pl-4 flex flex-col gap-1 mt-1"
                          >
                            {item.children!.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={onClose}
                                className="text-[14px] text-gray-400 hover:text-white transition-colors duration-200 tracking-wide"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                })}
              </div>

              {/* Language switcher */}
              {isLanguageSwitcherEnabled && (
                <div className="mt-auto pt-8 flex gap-4">
                  <button
                    onClick={() => setLanguage('en')}
                    className={`text-sm tracking-widest uppercase transition-colors ${
                      language === 'en' ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    EN
                  </button>
                  <span className="text-gray-600">/</span>
                  <button
                    onClick={() => setLanguage('th')}
                    className={`text-sm tracking-widest uppercase transition-colors ${
                      language === 'th' ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    TH
                  </button>
                </div>
              )}
            </motion.nav>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
