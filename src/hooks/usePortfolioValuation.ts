import { useMemo } from 'react'
import { useCollection } from '@/hooks/useCollection'
import type { Enums } from '@/types/database.types'

type Region = Enums<'wine_region'>
type ConfidenceLevel = Enums<'confidence_level'>

export type PortfolioValuation = {
  totalValueEur: number
  totalBottles: number
  itemCount: number
  unvaluedCount: number
  byRegion: { region: Region; valueEur: number }[]
  byConfidence: { level: ConfidenceLevel; count: number }[]
}

export function usePortfolioValuation() {
  const collectionQuery = useCollection()
  const items = collectionQuery.data

  const valuation = useMemo<PortfolioValuation | null>(() => {
    if (!items) return null

    let totalValueEur = 0
    let totalBottles = 0
    let unvaluedCount = 0
    const regionTotals = new Map<Region, number>()
    const confidenceCounts = new Map<ConfidenceLevel, number>()

    for (const item of items) {
      totalBottles += item.quantity

      if (item.reference_wine) {
        const itemValue = item.reference_wine.estimated_market_price_eur * item.quantity
        totalValueEur += itemValue
        regionTotals.set(
          item.reference_wine.region,
          (regionTotals.get(item.reference_wine.region) ?? 0) + itemValue,
        )
        confidenceCounts.set(
          item.reference_wine.confidence_level,
          (confidenceCounts.get(item.reference_wine.confidence_level) ?? 0) + 1,
        )
      } else {
        unvaluedCount += 1
      }
    }

    return {
      totalValueEur,
      totalBottles,
      itemCount: items.length,
      unvaluedCount,
      byRegion: Array.from(regionTotals.entries())
        .map(([region, valueEur]) => ({ region, valueEur }))
        .sort((a, b) => b.valueEur - a.valueEur),
      byConfidence: (['alto', 'medio', 'bajo'] as const)
        .map((level) => ({ level, count: confidenceCounts.get(level) ?? 0 }))
        .filter((entry) => entry.count > 0),
    }
  }, [items])

  return { ...collectionQuery, valuation }
}
