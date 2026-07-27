import { ConfidenceBadge } from '@/components/catalog/ConfidenceBadge'
import { Skeleton } from '@/components/ui/skeleton'
import { useCatalogPreview } from '@/hooks/useCatalogPreview'
import { formatEur } from '@/utils/formatters'
import type { Enums } from '@/types/database.types'

const REGION_LABEL: Record<Enums<'wine_region'>, string> = {
  rioja: 'Rioja',
  ribera_del_duero: 'Ribera del Duero',
  priorat: 'Priorat',
}

export function CatalogPreview() {
  const { data: wines, isLoading } = useCatalogPreview()

  return (
    <div className="bg-paper px-4 pb-16 sm:pb-24">
      <div className="mx-auto max-w-[1180px]">
        <p className="text-[13px] font-semibold tracking-[0.02em] text-stone uppercase">
          El catálogo
        </p>
        <h2 className="mt-2 font-heading text-3xl font-normal text-charcoal sm:text-4xl">
          Una muestra de lo que ya hemos investigado
        </h2>
        <p className="mt-3 max-w-lg text-[15px] text-stone">
          Cada vino muestra su nivel de confianza — no todas las valoraciones tienen
          la misma fiabilidad, y creemos que debes saberlo.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {isLoading &&
            Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24" />)}
          {wines?.map((wine) => (
            <div
              key={wine.id}
              className="flex items-start justify-between gap-3 rounded-lg border border-hairline bg-paper-elevated p-4"
            >
              <div>
                <p className="text-[15px] font-medium text-charcoal">{wine.name}</p>
                <p className="text-sm text-stone">
                  {wine.winery} · {REGION_LABEL[wine.region]}
                  {wine.vintage && ` · ${wine.vintage}`}
                </p>
                <p className="mt-1 text-sm font-medium text-charcoal">
                  {formatEur(wine.estimated_market_price_eur)}
                </p>
              </div>
              <ConfidenceBadge
                level={wine.confidence_level}
                rationale={wine.confidence_rationale}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
