import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatEur } from '@/utils/formatters'
import type { PortfolioValuation } from '@/hooks/usePortfolioValuation'
import type { Enums } from '@/types/database.types'

type Region = Enums<'wine_region'>

// Color fijo por región (identidad, no por rango) — slots 1-3 de la paleta
// categórica validada (dataviz skill): pasa CVD/contraste en claro y oscuro.
const REGION_META: Record<Region, { label: string; color: string }> = {
  rioja: { label: 'Rioja', color: 'var(--chart-1)' },
  ribera_del_duero: { label: 'Ribera del Duero', color: 'var(--chart-2)' },
  priorat: { label: 'Priorat', color: 'var(--chart-3)' },
}

export function RegionBreakdownChart({ valuation }: { valuation: PortfolioValuation }) {
  const data = valuation.byRegion.map((entry) => ({
    region: entry.region,
    label: REGION_META[entry.region].label,
    valueEur: entry.valueEur,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Valor por región
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            Añade botellas del catálogo para ver el desglose por región.
          </p>
        ) : (
          <div style={{ height: Math.max(data.length * 44, 80) }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} layout="vertical" margin={{ left: 8, right: 24 }}>
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="label"
                  width={120}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: 'var(--muted-foreground)', fontSize: 13 }}
                />
                <Tooltip
                  cursor={{ fill: 'var(--muted)' }}
                  contentStyle={{
                    background: 'var(--popover)',
                    border: '1px solid var(--border)',
                    borderRadius: 8,
                    fontSize: 13,
                  }}
                  formatter={(value) => formatEur(Number(value))}
                  labelFormatter={() => ''}
                />
                <Bar dataKey="valueEur" radius={4} maxBarSize={28}>
                  {data.map((entry) => (
                    <Cell key={entry.region} fill={REGION_META[entry.region].color} />
                  ))}
                  <LabelList
                    dataKey="valueEur"
                    position="right"
                    formatter={(value: unknown) => formatEur(Number(value))}
                    style={{ fill: 'var(--foreground)', fontSize: 12 }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
