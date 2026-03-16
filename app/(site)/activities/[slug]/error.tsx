'use client'
import Link from 'next/link'
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="px-[6vw] py-24">
      <p className="text-muted-foreground mb-4">Failed to load content.</p>
      <div className="flex gap-4">
        <button onClick={reset} className="text-sm underline underline-offset-4">Try again</button>
        <Link href="/activities" className="text-sm underline underline-offset-4">← Back to Activities</Link>
      </div>
    </div>
  )
}
