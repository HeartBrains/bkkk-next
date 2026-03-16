import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { BackToTop } from '@/components/layout/BackToTop'
import { fetchSiteSettings } from '@/lib/api'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await fetchSiteSettings()

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">{children}</main>
      <Footer settings={settings ?? undefined} />
      <BackToTop />
    </>
  )
}
