import { fetchAllSlugs } from '@/lib/api'
import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.bangkok-kunsthalle.org'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [exhibitionSlugs, activitySlugs, blogSlugs, movingImageSlugs, artistSlugs] =
    await Promise.all([
      fetchAllSlugs('exhibitions'),
      fetchAllSlugs('activities'),
      fetchAllSlugs('blog'),
      fetchAllSlugs('moving-image'),
      fetchAllSlugs('artists'),
    ])

  const staticRoutes: MetadataRoute.Sitemap = [
    '/',
    '/bangkok',
    '/khaoyai',
    '/about',
    '/about/vision',
    '/about/founder',
    '/team',
    '/support',
    '/visit',
    '/exhibitions',
    '/activities',
    '/blog',
    '/moving-image',
    '/residency',
    '/archives',
    '/shop',
    '/press',
    '/contact',
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '/' ? 1 : 0.8,
  }))

  const dynamicRoutes: MetadataRoute.Sitemap = [
    ...exhibitionSlugs.map((slug) => ({ url: `${SITE_URL}/exhibitions/${slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 })),
    ...activitySlugs.map((slug) => ({ url: `${SITE_URL}/activities/${slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 })),
    ...blogSlugs.map((slug) => ({ url: `${SITE_URL}/blog/${slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 })),
    ...movingImageSlugs.map((slug) => ({ url: `${SITE_URL}/moving-image/${slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 })),
    ...artistSlugs.map((slug) => ({ url: `${SITE_URL}/residency/${slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 })),
  ]

  return [...staticRoutes, ...dynamicRoutes]
}
