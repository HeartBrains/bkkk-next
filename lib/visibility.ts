// All NEXT_PUBLIC_SHOW_* flags default to true when not set.
// Set to 'false' (string) in .env to hide the corresponding section.

function flag(key: string): boolean {
  const val = process.env[key]
  return val !== 'false'
}

export const visibility = {
  // Menu links / pages
  shop: flag('NEXT_PUBLIC_SHOW_SHOP'),
  press: flag('NEXT_PUBLIC_SHOW_PRESS'),
  archives: flag('NEXT_PUBLIC_SHOW_ARCHIVES'),
  residency: flag('NEXT_PUBLIC_SHOW_RESIDENCY'),
  movingImage: flag('NEXT_PUBLIC_SHOW_MOVING_IMAGE'),
  khaoyai: flag('NEXT_PUBLIC_SHOW_KHAOYAI'),
  // Language switcher
  languageSwitcher: flag('NEXT_PUBLIC_SHOW_LANGUAGE_SWITCHER'),
  // Homepage sections
  homeFeatured: flag('NEXT_PUBLIC_SHOW_HOME_FEATURED'),
  homeActivities: flag('NEXT_PUBLIC_SHOW_HOME_ACTIVITIES'),
  homeBlog: flag('NEXT_PUBLIC_SHOW_HOME_BLOG'),
  homeMovingImage: flag('NEXT_PUBLIC_SHOW_HOME_MOVING_IMAGE'),
} as const

export type VisibilityConfig = typeof visibility
