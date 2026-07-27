import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ConfidenceBadge } from '@/components/catalog/ConfidenceBadge'
import type { PortfolioValuation } from '@/hooks/usePortfolioValuation'

export function ConfidenceDistributionCard({ valuation }: { valuation: PortfolioValuation }) {
  const valuedCount = valuation.itemCount - valuation.unvaluedCount

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-mono text-[11px] font-medium tracking-[0.06em] text-muted-foreground uppercase">
          Confianza de las valoraciones
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {valuedCount === 0 && valuation.unvaluedCount === 0 ? (
          <p className="py-4 text-center text-sm text-muted-foreground">
            Añade botellas para ver aquí la fiabilidad de sus valoraciones.
          </p>
        ) : (
          <>
            {valuation.byConfidence.map((entry) => {
              const percentage = valuedCount > 0 ? Math.round((entry.count / valuedCount) * 100) : 0
              return (
                <div key={entry.level} className="flex items-center justify-between">
                  <ConfidenceBadge level={entry.level} />
                  <span className="text-sm text-muted-foreground">
                    {entry.count} {entry.count === 1 ? 'referencia' : 'referencias'} ({percentage}%)
                  </span>
                </div>
              )
            })}
            {valuation.unvaluedCount > 0 && (
              <div className="flex items-center justify-between border-t pt-3">
                <span className="text-sm text-muted-foreground">Sin valorar (entrada manual)</span>
                <span className="text-sm text-muted-foreground">{valuation.unvaluedCount}</span>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
