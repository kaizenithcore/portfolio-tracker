import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatEur } from '@/utils/formatters'
import type { PortfolioValuation } from '@/hooks/usePortfolioValuation'

export function PortfolioValueCard({ valuation }: { valuation: PortfolioValuation }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Valor total estimado
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-4xl font-semibold tabular-nums">
          {formatEur(valuation.totalValueEur)}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          {valuation.totalBottles} botellas · {valuation.itemCount} referencias
          {valuation.unvaluedCount > 0 &&
            ` · ${valuation.unvaluedCount} sin valorar`}
        </p>
      </CardContent>
    </Card>
  )
}
