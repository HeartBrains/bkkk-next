import { fetchSiteSettings } from '@/lib/api'
import { buildMetadata } from '@/lib/metadata'
import { PageHeader } from '@/components/layout/PageHeader'
import { ContactForm } from '@/components/pages/ContactForm'
import type { Metadata } from 'next'
import { Instagram, Facebook, AtSign } from 'lucide-react'

export const metadata: Metadata = buildMetadata({ title: 'Contact', path: '/contact' })

export default async function ContactPage() {
  const settings = await fetchSiteSettings()

  return (
    <div className="w-full">
      <PageHeader title="Contact" />
      <div className="px-[6vw] pb-24 grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Left: form */}
        <ContactForm />

        {/* Right: info */}
        <div className="flex flex-col gap-8">
          {/* Bangkok */}
          <div>
            <h3 className="text-xs tracking-widest uppercase text-muted-foreground mb-3">Bangkok</h3>
            <p className="text-sm">{settings?.bangkok.address_en}</p>
            <a
              href={settings?.bangkok.maps_url ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline underline-offset-4 hover:opacity-70 mt-2 inline-block"
            >
              Get Directions →
            </a>
          </div>

          {/* Khao Yai */}
          <div>
            <h3 className="text-xs tracking-widest uppercase text-muted-foreground mb-3">Khao Yai Art Forest</h3>
            <p className="text-sm">{settings?.khaoyai.address_en}</p>
            <a
              href={settings?.khaoyai.maps_url ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline underline-offset-4 hover:opacity-70 mt-2 inline-block"
            >
              Get Directions →
            </a>
          </div>

          {/* Social */}
          <div className="flex gap-6 pt-4">
            <a href={settings?.social.instagram ?? '#'} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram className="w-5 h-5 hover:opacity-70 transition-opacity" />
            </a>
            <a href={settings?.social.facebook ?? '#'} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook className="w-5 h-5 hover:opacity-70 transition-opacity" />
            </a>
            <a href={`mailto:${settings?.social.email ?? 'info@bangkok-kunsthalle.org'}`} aria-label="Email">
              <AtSign className="w-5 h-5 hover:opacity-70 transition-opacity" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
