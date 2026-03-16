import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-start justify-center min-h-[60vh] px-[6vw]">
      <p className="text-sm text-muted-foreground mb-2 tracking-widest uppercase">404</p>
      <h1 className="text-2xl font-medium mb-4">Page not found</h1>
      <Link
        href="/bangkok"
        className="text-sm underline underline-offset-4 hover:opacity-70 transition-opacity"
      >
        Return home
      </Link>
    </div>
  )
}
