'use client'

import { useState, useRef } from 'react'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/utils/languageContext'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import type { WPPost } from '@/lib/types'

interface Props {
  post: WPPost
  gallery: string[]
}

export function ExhibitionDetailClient({ post, gallery }: Props) {
  const { language } = useLanguage()
  const isTh = language === 'th'
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }))
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  const title = isTh ? (post.acf?.title_th || post.title) : post.title
  const artist = isTh ? (post.acf?.artist_th || post.acf?.artist) : post.acf?.artist
  const dateDisplay = isTh ? (post.acf?.date_display_th || post.acf?.date_display) : post.acf?.date_display
  const curator = isTh ? (post.acf?.curator_th || post.acf?.curator) : post.acf?.curator

  return (
    <div className="w-full bg-white pb-24 min-h-screen">
      {/* Hero carousel */}
      <div className="h-[35vh] md:h-[80vh] w-full relative overflow-hidden group bg-black">
        {gallery.length > 0 ? (
          <Carousel
            setApi={(a) => { setApi(a); a?.on('select', () => setCurrent(a.selectedScrollSnap())) }}
            plugins={[plugin.current]}
            className="w-full h-full"
            opts={{ align: 'start', loop: true }}
          >
            <CarouselContent className="h-full -ml-0">
              {gallery.map((src, i) => (
                <CarouselItem key={i} className="h-full pl-0 flex items-center justify-center">
                  <img
                    src={src}
                    alt={`${post.title} ${i + 1}`}
                    className="w-full h-full object-cover object-center"
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            {gallery.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <CarouselPrevious className="pointer-events-auto static transform-none h-12 w-12 bg-black/30 hover:bg-black/50 border-none text-white" />
                <CarouselNext className="pointer-events-auto static transform-none h-12 w-12 bg-black/30 hover:bg-black/50 border-none text-white" />
              </div>
            )}
          </Carousel>
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">{isTh ? 'ไม่มีรูปภาพ' : 'No images available'}</span>
          </div>
        )}

        {/* Dot indicators */}
        {gallery.length > 1 && (
          <div className="absolute bottom-8 right-6 md:right-[5%] z-20 flex gap-2">
            {gallery.map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${current === i ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'}`}
                aria-label={`Image ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Back button */}
        <div className="absolute bottom-8 left-6 md:left-12 z-20">
          <Link
            href="/exhibitions"
            className="fixed top-[120px] left-6 z-50 md:static md:ml-[5%] flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/20 hover:bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-normal font-sans whitespace-nowrap">
              {isTh ? 'กลับสู่นิทรรศการ' : 'Back to Exhibitions'}
            </span>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="w-full px-[5%] pt-[96px] pb-[0px]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-8">

          {/* Left — meta */}
          <div className="md:col-span-6 flex flex-col gap-8">
            <div className="flex flex-col gap-0 px-0 md:px-[28px] py-[0px]">
              <h1 className={`text-xl md:text-2xl font-normal text-black leading-tight ${isTh ? 'leading-[1.82em]' : ''}`}>{title}</h1>
              {artist && <p className={`text-xl md:text-2xl font-normal text-black leading-tight ${isTh ? 'leading-[1.82em]' : ''}`}>{artist}</p>}
              {dateDisplay && <p className={`text-xl md:text-2xl text-black font-normal leading-tight ${isTh ? 'leading-[1.82em]' : ''}`}>{dateDisplay}</p>}
              {curator && (
                <p className={`text-xl md:text-2xl text-black font-normal leading-tight ${isTh ? 'leading-[1.82em]' : ''}`}>
                  {isTh ? 'ภัณฑารักษ์: ' : 'Curated by '}{curator}
                </p>
              )}
            </div>
          </div>

          {/* Right — content */}
          <div className={`md:col-start-7 md:col-span-6 text-xl md:text-2xl text-black font-normal leading-tight ${isTh ? 'leading-[1.82em]' : ''}`}>
            {post.content && (
              <div className="[&>p]:mb-8" dangerouslySetInnerHTML={{ __html: post.content }} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
