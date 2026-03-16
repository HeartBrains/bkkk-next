'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-start justify-center min-h-[60vh] px-[6vw]">
      <h1 className="text-2xl font-medium mb-4">Something went wrong</h1>
      <p className="text-muted-foreground mb-8">An unexpected error occurred.</p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="text-sm underline underline-offset-4 hover:opacity-70 transition-opacity"
        >
          Try again
        </button>
        <Link href="/bangkok" className="text-sm underline underline-offset-4 hover:opacity-70 transition-opacity">
          Go home
        </Link>
      </div>
    </div>
  )
}
