import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatEur } from '@/utils/formatters'
import type { PortfolioValuation } from '@/hooks/usePortfolioValuation'

export function PortfolioValueCard({ valuation }: { valuation: PortfolioValuation }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-mono text-[11px] font-medium tracking-[0.06em] text-muted-foreground uppercase">
          Valor total estimado
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-4xl font-bold tracking-[-0.01em] text-foreground">
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
