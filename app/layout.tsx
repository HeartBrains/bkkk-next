import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/utils/languageContext'
import { visibility } from '@/lib/visibility'
import { OrganizationJsonLd, WebSiteJsonLd } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.bangkok-kunsthalle.org'),
  title: {
    default: 'Bangkok Kunsthalle',
    template: '%s | Bangkok Kunsthalle',
  },
  description: 'Bangkok Kunsthalle is a multidisciplinary platform for contemporary art in Thailand.',
  openGraph: {
    siteName: 'Bangkok Kunsthalle',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <LanguageProvider showLanguageSwitcher={visibility.languageSwitcher}>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
