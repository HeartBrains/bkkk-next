'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/utils/languageContext'
import { visibility } from '@/lib/visibility'

export function LandingPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [visited, setVisited] = useState(false)

  useEffect(() => {
    const seen = localStorage.getItem('bkkk-location')
    if (seen) {
      router.replace(seen === 'khaoyai' ? '/khaoyai' : '/bangkok')
    } else {
      setVisited(true)
    }
  }, [router])

  const select = (loc: 'bangkok' | 'khaoyai') => {
    localStorage.setItem('bkkk-location', loc)
    router.push(loc === 'khaoyai' ? '/khaoyai' : '/bangkok')
  }

  if (!visited) return null

  return (
    <div className="fixed inset-0 bg-black text-white flex flex-col items-center justify-center z-50">
      <h1 className="text-base font-medium tracking-widest uppercase mb-16">
        Bangkok Kunsthalle
      </h1>
      <div className="flex flex-col md:flex-row gap-8 md:gap-16">
        <button
          onClick={() => select('bangkok')}
          className="text-2xl font-medium tracking-wide hover:text-gray-400 transition-colors duration-300"
        >
          {t('landing.bangkok')}
        </button>
        {visibility.khaoyai && (
          <button
            onClick={() => select('khaoyai')}
            className="text-2xl font-medium tracking-wide hover:text-gray-400 transition-colors duration-300"
          >
            {t('landing.khaoyai')}
          </button>
        )}
      </div>
    </div>
  )
}
