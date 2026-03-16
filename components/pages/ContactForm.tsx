'use client'

import { useState } from 'react'
import { useLanguage } from '@/utils/languageContext'

export function ContactForm() {
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !message) return
    setStatus('sending')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, message }),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return <p className="text-sm">{t('contact.success')}</p>
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-xs tracking-widest uppercase text-muted-foreground">
          {t('contact.email')}
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-b border-border bg-transparent py-2 text-sm outline-none focus:border-foreground transition-colors"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="message" className="text-xs tracking-widest uppercase text-muted-foreground">
          {t('contact.inquiry')}
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border-b border-border bg-transparent py-2 text-sm outline-none focus:border-foreground transition-colors resize-none"
        />
      </div>
      {status === 'error' && (
        <p className="text-sm text-destructive">{t('contact.error')}</p>
      )}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="text-sm tracking-widest uppercase w-fit border-b border-foreground pb-0.5 hover:opacity-70 transition-opacity disabled:opacity-40"
      >
        {status === 'sending' ? t('contact.sending') : t('contact.submit')}
      </button>
    </form>
  )
}
