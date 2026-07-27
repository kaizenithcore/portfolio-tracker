import { ConfidenceBadge } from '@/components/catalog/ConfidenceBadge'
import { SpotlightCard } from '@/components/marketing/SpotlightCard'
import { Skeleton } from '@/components/ui/skeleton'
import { useCatalogPreview } from '@/hooks/useCatalogPreview'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { formatEur } from '@/utils/formatters'
import type { Enums } from '@/types/database.types'

const REGION_LABEL: Record<Enums<'wine_region'>, string> = {
  rioja: 'Rioja',
  ribera_del_duero: 'Ribera del Duero',
  priorat: 'Priorat',
}

export function CatalogPreview() {
  const { data: wines, isLoading } = useCatalogPreview()
  const ref = useScrollReveal<HTMLDivElement>({ itemSelector: '[data-reveal-item]' })

  return (
    <div className="border-t border-hairline bg-obsidian px-4 pb-20 sm:pb-28">
      <div ref={ref} className="mx-auto max-w-[1180px] pt-12">
        <p data-reveal-item className="font-mono text-[11px] tracking-[0.04em] text-ash uppercase">
          Una muestra real, no un mockup
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading &&
            Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-32 bg-graphite" />)}
          {wines?.map((wine) => (
            <SpotlightCard key={wine.id} className="p-4" data-reveal-item>
              <p className="text-[15px] font-medium text-paper">{wine.name}</p>
              <p className="text-sm text-ash">
                {wine.winery} · {REGION_LABEL[wine.region]}
                {wine.vintage && ` · ${wine.vintage}`}
              </p>
              <p className="mt-2 text-sm font-medium text-paper">
                {formatEur(wine.estimated_market_price_eur)}
              </p>
              <div className="mt-2">
                <ConfidenceBadge
                  level={wine.confidence_level}
                  rationale={wine.confidence_rationale}
                />
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </div>
  )
}
