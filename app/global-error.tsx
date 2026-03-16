'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div style={{ padding: '4rem 6vw' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 500, marginBottom: '1rem' }}>
            Something went wrong
          </h1>
          <button
            onClick={reset}
            style={{ textDecoration: 'underline', cursor: 'pointer' }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
