import { ImageWithFallback } from '@/components/ui/ImageWithFallback'

interface PageHeaderProps {
  title: string
  subtitle?: string
  imageUrl?: string
  imageAlt?: string
  /** Slot for meta info: date, artist, curator etc. */
  meta?: React.ReactNode
  /** Extra classes on the wrapper */
  className?: string
  /** Use priority loading for hero image (above the fold) */
  priority?: boolean
}

export function PageHeader({
  title,
  subtitle,
  imageUrl,
  imageAlt,
  meta,
  className = '',
  priority = true,
}: PageHeaderProps) {
  return (
    <section className={`w-full ${className}`}>
      {imageUrl && (
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden">
          <ImageWithFallback
            src={imageUrl}
            alt={imageAlt ?? title}
            fill
            priority={priority}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="px-[6vw] pt-12 pb-8">
        <h1 className="text-2xl font-medium tracking-wide">{title}</h1>
        {subtitle && (
          <p className="mt-2 text-lg text-muted-foreground">{subtitle}</p>
        )}
        {meta && <div className="mt-4 flex flex-col gap-0 leading-tight text-sm">{meta}</div>}
      </div>
    </section>
  )
}
