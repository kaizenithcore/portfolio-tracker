import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatEur } from '@/utils/formatters'
import type { PortfolioValuation } from '@/hooks/usePortfolioValuation'

export function PortfolioValueCard({ valuation }: { valuation: PortfolioValuation }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[13px] font-semibold tracking-[0.02em] text-muted-foreground uppercase">
          Valor total estimado
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-heading text-4xl font-normal text-foreground">
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
