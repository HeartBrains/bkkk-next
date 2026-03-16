import { buildMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'
import { ContactClient } from './ContactClient'

export const metadata: Metadata = buildMetadata({ title: 'Contact', path: '/contact' })

export default function ContactPage() {
  return <ContactClient />
}
