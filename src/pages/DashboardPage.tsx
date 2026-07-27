import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { PortfolioValueCard } from '@/components/dashboard/PortfolioValueCard'
import { RegionBreakdownChart } from '@/components/dashboard/RegionBreakdownChart'
import { ConfidenceDistributionCard } from '@/components/dashboard/ConfidenceDistributionCard'
import { usePortfolioValuation } from '@/hooks/usePortfolioValuation'

export function DashboardPage() {
  const { valuation, isLoading } = usePortfolioValuation()

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <Button asChild>
          <Link to="/app/collection">
            <Plus className="mr-1 size-4" />
            Añadir botella
          </Link>
        </Button>
      </div>

      {isLoading && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-48 sm:col-span-2" />
        </div>
      )}

      {!isLoading && valuation && valuation.itemCount === 0 && (
        <div className="rounded-lg border border-dashed py-16 text-center">
          <p className="text-muted-foreground">
            Todavía no has añadido ninguna botella a tu colección.
          </p>
          <Button className="mt-4" asChild>
            <Link to="/app/collection">
              <Plus className="mr-1 size-4" />
              Añade tu primera botella
            </Link>
          </Button>
        </div>
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
