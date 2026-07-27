import type { ReactNode } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { cn } from '@/lib/utils'

type SubFeature = {
  title: string
  description: string
}

type FeatureSectionProps = {
  id?: string
  kicker: string
  headline: ReactNode
  description: string
  image: string
  imageAlt: string
  imageCaption: string
  subFeatures: SubFeature[]
  reverse?: boolean
  surface?: 'void' | 'obsidian'
  children?: ReactNode
}

// Patrón "Feature Section" — kicker + titular multilínea + descripción +
// fotografía real + 2-3 sub-características. Ver docs/DESIGN.md §5.
export function FeatureSection({
  id,
  kicker,
  headline,
  description,
  image,
  imageAlt,
  imageCaption,
  subFeatures,
  reverse = false,
  surface = 'void',
  children,
}: FeatureSectionProps) {
  const ref = useScrollReveal<HTMLDivElement>({ itemSelector: '[data-reveal-item]' })

  return (
    <section
      id={id}
      className={cn(
        'scroll-mt-14 border-t border-hairline px-4 py-20 sm:py-28',
        surface === 'obsidian' ? 'bg-obsidian' : 'bg-void',
      )}
    >
      <div ref={ref} className="mx-auto max-w-[1180px]">
        <div
          className={cn(
            'grid items-center gap-12 lg:grid-cols-2 lg:gap-20',
            reverse && 'lg:[&>*:first-child]:order-2',
          )}
        >
          <div>
            <p
              data-reveal-item
              className="font-mono text-xs font-medium tracking-[0.08em] text-garnet-bright uppercase"
            >
              {kicker}
            </p>
            <h2
              data-reveal-item
              className="mt-3 text-3xl leading-[1.08] font-bold tracking-[-0.015em] text-paper sm:text-4xl lg:text-[2.75rem]"
            >
              {headline}
            </h2>
            <p data-reveal-item className="mt-5 max-w-md text-[15px] leading-relaxed text-frost">
              {description}
            </p>

            <div className="mt-10 space-y-7 border-t border-hairline pt-8">
              {subFeatures.map((feature) => (
                <div key={feature.title} data-reveal-item>
                  <h3 className="text-[15px] font-semibold text-paper">{feature.title}</h3>
                  <p className="mt-1 text-[14px] leading-relaxed text-ash">{feature.description}</p>
                </div>
              ))}
            </div>

            {children && <div data-reveal-item className="mt-8">{children}</div>}
          </div>

          <div data-reveal-item className="relative">
            <div className="overflow-hidden rounded-xl">
              <img
                src={image}
                alt={imageAlt}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover grayscale-[15%]"
              />
            </div>
            <p className="mt-3 font-mono text-[11px] tracking-[0.04em] text-ash uppercase">
              {imageCaption}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
