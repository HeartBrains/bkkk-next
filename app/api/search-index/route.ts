import { fetchPosts } from '@/lib/api'
import { NextResponse } from 'next/server'
import type { SearchDocument } from '@/lib/types'

export const dynamic = 'force-static'

// Rebuild search index — tagged so /api/revalidate?tag=search-index triggers refresh
export async function GET() {
  const [exhibitions, activities, blog, movingImage, artists, press] = await Promise.all([
    fetchPosts('exhibitions'),
    fetchPosts('activities'),
    fetchPosts('blog'),
    fetchPosts('moving-image'),
    fetchPosts('artists'),
    fetchPosts('press'),
  ])

  const docs: SearchDocument[] = []

  const addPost = (
    items: Awaited<ReturnType<typeof fetchPosts>>,
    page: string,
    slugPrefix: string
  ) => {
    for (const item of items) {
      const artistEn = (item as any).artist?.en ?? item.acf?.artist ?? ''
      const artistTh = (item as any).artist?.th ?? item.acf?.artist_th ?? ''
      const titleTh = (item as any).title?.th ?? item.acf?.title_th ?? ''

      docs.push({
        id: `${page}-${item.slug}-en`,
        title: item.title,
        content: item.content?.replace(/<[^>]+>/g, '').slice(0, 200) ?? '',
        keywords: [item.title, artistEn, item.acf?.curator ?? ''].filter(Boolean).join(' '),
        page: `/${slugPrefix}/${item.slug}`,
        slug: item.slug,
        lang: 'en',
      })

      if (titleTh || artistTh) {
        docs.push({
          id: `${page}-${item.slug}-th`,
          title: titleTh || item.title,
          content: item.acf?.statement_th ?? '',
          keywords: [titleTh, artistTh, item.acf?.curator_th ?? ''].filter(Boolean).join(' '),
          page: `/${slugPrefix}/${item.slug}`,
          slug: item.slug,
          lang: 'th',
        })
      }
    }
  }

  addPost(exhibitions, 'exhibitions', 'exhibitions')
  addPost(activities, 'activities', 'activities')
  addPost(blog, 'blog', 'blog')
  addPost(movingImage, 'moving-image', 'moving-image')
  addPost(artists, 'residency', 'residency')
  addPost(press, 'press', 'press')

  // Static pages
  const staticPages: SearchDocument[] = [
    { id: 'about-en', title: 'About', content: 'Bangkok Kunsthalle contemporary art Thailand', keywords: 'about', page: '/about', lang: 'en' },
    { id: 'visit-en', title: 'Visit', content: 'Opening hours address Bangkok Khao Yai', keywords: 'visit hours address', page: '/visit', lang: 'en' },
    { id: 'contact-en', title: 'Contact', content: 'Contact Bangkok Kunsthalle', keywords: 'contact email', page: '/contact', lang: 'en' },
  ]
  docs.push(...staticPages)

  return NextResponse.json(docs, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
