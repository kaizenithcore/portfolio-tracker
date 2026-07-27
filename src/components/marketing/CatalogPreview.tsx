import { Card, CardContent } from '@/components/ui/card'
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
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h2 className="mb-2 text-center text-2xl font-semibold">
        Una muestra de nuestro catálogo
      </h2>
      <p className="mx-auto mb-10 max-w-lg text-center text-muted-foreground">
        Cada vino muestra su nivel de confianza — no todas las valoraciones tienen
        la misma fiabilidad, y creemos que debes saberlo.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {isLoading &&
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        {wines?.map((wine) => (
          <Card key={wine.id}>
            <CardContent className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium">{wine.name}</p>
                <p className="text-sm text-muted-foreground">
                  {wine.winery} · {REGION_LABEL[wine.region]}
                  {wine.vintage && ` · ${wine.vintage}`}
                </p>
                <p className="mt-1 text-sm font-medium">
                  {formatEur(wine.estimated_market_price_eur)}
                </p>
              </div>
              <ConfidenceBadge level={wine.confidence_level} rationale={wine.confidence_rationale} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
