import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { PageHeader } from '@/components/layout/PageHeader'
import { EmptyState } from '@/components/layout/EmptyState'
import { PortfolioValueCard } from '@/components/dashboard/PortfolioValueCard'
import { RegionBreakdownChart } from '@/components/dashboard/RegionBreakdownChart'
import { ConfidenceDistributionCard } from '@/components/dashboard/ConfidenceDistributionCard'
import { usePortfolioValuation } from '@/hooks/usePortfolioValuation'

export function DashboardPage() {
  const { valuation, isLoading } = usePortfolioValuation()

  return (
    <div>
      <PageHeader
        kicker="Tu patrimonio"
        title="Dashboard"
        description="El valor estimado de tu colección, siempre con su nivel de confianza al lado."
        action={
          <Button asChild>
            <Link to="/app/collection">
              <Plus className="mr-1 size-4" />
              Añadir botella
            </Link>
          </Button>
        }
      />

      {isLoading && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Skeleton className="h-32 bg-graphite" />
          <Skeleton className="h-32 bg-graphite" />
          <Skeleton className="h-48 bg-graphite sm:col-span-2" />
        </div>
      )}

      {!isLoading && valuation && valuation.itemCount === 0 && (
        <EmptyState
          image="/media/bottle-glass-dark.jpg"
          imageAlt="Botella y copa de vino tinto sobre fondo oscuro"
          title="Todavía no has añadido ninguna botella"
          description="En cuanto registres tu primera botella verás aquí el valor total de tu colección, su desglose por región y la fiabilidad de cada valoración."
          action={
            <Button asChild>
              <Link to="/app/collection">
                <Plus className="mr-1 size-4" />
                Añade tu primera botella
              </Link>
            </Button>
          }
        />
      )}

      {!isLoading && valuation && valuation.itemCount > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          <PortfolioValueCard valuation={valuation} />
          <ConfidenceDistributionCard valuation={valuation} />
          <div className="sm:col-span-2">
            <RegionBreakdownChart valuation={valuation} />
          </div>
        </div>
      )}
    </div>
  )
}
