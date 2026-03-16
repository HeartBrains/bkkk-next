export type Language = 'en' | 'th'

export type ContentType =
  | 'exhibitions'
  | 'activities'
  | 'blog'
  | 'moving-image'
  | 'artists'
  | 'press'

export interface WPImage {
  sourceUrl: string
  altText: string
}

export interface WPScheduleItem {
  title: string
  details: string
}

export interface WPPost {
  id: string
  slug: string
  type: 'activity' | 'exhibition' | 'post' | 'moving-image' | 'artist' | 'press'
  title: string
  content: string
  date: string
  categories?: string[]
  featuredImage?: WPImage
  gallery?: string[]
  acf?: {
    artist?: string
    artist_th?: string
    title_th?: string
    subtitle?: string
    subtitle_th?: string
    location?: string
    from_date?: string
    to_date?: string
    date_display?: string
    date_display_th?: string
    curator?: string
    curator_th?: string
    statement_th?: string
    director?: string
    year?: number
    duration?: string
    name_th?: string
    bio_th?: string
    residency_period?: string
    residency_period_th?: string
    portrait?: string
    schedule?: WPScheduleItem[]
    [key: string]: unknown
  }
}

export interface LocationInfo {
  address_en: string
  address_th: string
  hours_en: string
  hours_th: string
  maps_url: string
  phone: string
  email?: string
}

export interface SiteSettings {
  bangkok: LocationInfo
  khaoyai: LocationInfo
  social: {
    instagram: string
    facebook: string
    email: string
  }
}

export interface SearchDocument {
  id: string
  title: string
  content: string
  keywords: string
  page: string
  slug?: string
  lang: Language
}

export type ExhibitionStatus = 'current' | 'upcoming' | 'past'
