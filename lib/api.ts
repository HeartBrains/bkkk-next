import type { ContentType, WPPost, SiteSettings } from './types'
import path from 'path'
import fs from 'fs'

const WP_BASE = process.env.WP_API_URL

// ── Source resolution ─────────────────────────────────────────────────────────

function getSource(type: ContentType | 'site-settings'): 'live' | 'mock' {
  const key = `DATA_SOURCE_${type.toUpperCase().replace(/-/g, '_')}` as keyof NodeJS.ProcessEnv
  return process.env[key] === 'live' ? 'live' : 'mock'
}

// ── Fixture loader ────────────────────────────────────────────────────────────

function loadFixture<T>(name: string): T[] {
  try {
    const p = path.join(process.cwd(), 'fixtures', `${name}.json`)
    return JSON.parse(fs.readFileSync(p, 'utf8')) as T[]
  } catch {
    console.warn(`[api] fixture not found: fixtures/${name}.json`)
    return []
  }
}

function loadFixtureObject<T>(name: string): T | null {
  try {
    const p = path.join(process.cwd(), 'fixtures', `${name}.json`)
    return JSON.parse(fs.readFileSync(p, 'utf8')) as T
  } catch {
    console.warn(`[api] fixture not found: fixtures/${name}.json`)
    return null
  }
}

// ── WP REST fetch helpers ─────────────────────────────────────────────────────

const ENDPOINT_MAP: Record<ContentType, string> = {
  exhibitions: 'exhibitions',
  activities: 'activities',
  blog: 'posts',
  'moving-image': 'moving-image',
  residency: 'residency',
  artists: 'artists',
  press: 'press',
}

function mapWPResponse(item: Record<string, unknown>, type: ContentType): WPPost {
  const acf = (item.meta ?? item.acf ?? {}) as Record<string, unknown>
  return {
    id: String(item.id),
    slug: String(item.slug),
    type: type === 'blog' ? 'post' : (type.replace('-', '') as WPPost['type']),
    title: (item.title as { rendered: string })?.rendered ?? String(item.title ?? ''),
    content: (item.content as { rendered: string })?.rendered ?? String(item.content ?? ''),
    date: String(item.date ?? ''),
    categories: [],
    featuredImage: (() => {
      const embedded = item._embedded as Record<string, unknown> | undefined
      const media = embedded?.['wp:featuredmedia'] as Array<{ source_url: string; alt_text: string }> | undefined
      if (media?.[0]) return { sourceUrl: media[0].source_url, altText: media[0].alt_text }
      return undefined
    })(),
    gallery: Array.isArray(acf.gallery) ? (acf.gallery as string[]) : undefined,
    acf: acf as WPPost['acf'],
  }
}

async function fetchFromWP(type: ContentType, params: Record<string, string> = {}): Promise<WPPost[]> {
  if (!WP_BASE) return []
  const endpoint = ENDPOINT_MAP[type]
  const qs = new URLSearchParams({ per_page: '100', _embed: '1', ...params }).toString()
  try {
    const res = await fetch(`${WP_BASE}/${endpoint}?${qs}`, {
      next: { revalidate: 3600, tags: ['content', type] },
    })
    if (!res.ok) throw new Error(`WP API ${res.status}: ${endpoint}`)
    const data = (await res.json()) as Record<string, unknown>[]
    return data.map((item) => mapWPResponse(item, type))
  } catch (err) {
    console.error(`[api] fetchFromWP failed for ${type}:`, err)
    // Fallback to fixtures on WP failure
    return loadFixture<WPPost>(type)
  }
}

async function fetchOneFromWP(type: ContentType, slug: string): Promise<WPPost | null> {
  if (!WP_BASE) return null
  const endpoint = ENDPOINT_MAP[type]
  try {
    const res = await fetch(`${WP_BASE}/${endpoint}?slug=${slug}&_embed=1`, {
      next: { revalidate: 3600, tags: ['content', type, slug] },
    })
    if (!res.ok) return null
    const data = (await res.json()) as Record<string, unknown>[]
    if (!data.length) return null
    return mapWPResponse(data[0], type)
  } catch (err) {
    console.error(`[api] fetchOneFromWP failed for ${type}/${slug}:`, err)
    return null
  }
}

// ── Public API ────────────────────────────────────────────────────────────────

export async function fetchPosts(
  type: ContentType,
  params: Record<string, string> = {}
): Promise<WPPost[]> {
  if (getSource(type) === 'live') return fetchFromWP(type, params)
  return loadFixture<WPPost>(type)
}

export async function fetchPostBySlug(type: ContentType, slug: string): Promise<WPPost | null> {
  if (getSource(type) === 'live') return fetchOneFromWP(type, slug)
  const items = loadFixture<WPPost>(type)
  return items.find((p) => p.slug === slug) ?? null
}

export async function fetchAllSlugs(type: ContentType): Promise<string[]> {
  const items = await fetchPosts(type)
  return items.map((p) => p.slug).filter(Boolean)
}

export async function fetchSiteSettings(): Promise<SiteSettings | null> {
  if (getSource('site-settings') === 'live' && WP_BASE) {
    try {
      const res = await fetch(
        `${WP_BASE.replace('/wp/v2', '')}/jet-engine/v1/options-pages/site-settings`,
        { next: { revalidate: 3600, tags: ['site-settings'] } }
      )
      if (res.ok) return (await res.json()) as SiteSettings
    } catch (err) {
      console.error('[api] fetchSiteSettings failed:', err)
    }
  }
  return loadFixtureObject<SiteSettings>('site-settings')
}

// ── Exhibition status helper ──────────────────────────────────────────────────

export function getExhibitionStatus(
  fromDate: string,
  toDate: string
): 'current' | 'upcoming' | 'past' {
  const now = new Date()
  const from = new Date(fromDate)
  const to = toDate === 'Onwards' ? new Date('2099-12-31') : new Date(toDate)
  if (now < from) return 'upcoming'
  if (now > to) return 'past'
  return 'current'
}
