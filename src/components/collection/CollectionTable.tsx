import { useState } from 'react'
import { MoreHorizontal } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ConfidenceBadge } from '@/components/catalog/ConfidenceBadge'
import { EditBottleDialog } from '@/components/collection/EditBottleDialog'
import { useDeleteCollectionItem } from '@/hooks/useDeleteCollectionItem'
import { formatEur } from '@/utils/formatters'
import { formatVintageMismatchNote } from '@/utils/confidence'
import type { CollectionItemWithWine } from '@/types/collection'

const REGION_LABEL: Record<string, string> = {
  rioja: 'Rioja',
  ribera_del_duero: 'Ribera del Duero',
  priorat: 'Priorat',
}

function itemDisplayName(item: CollectionItemWithWine) {
  if (item.reference_wine) {
    return { name: item.reference_wine.name, winery: item.reference_wine.winery }
  }
  return { name: item.custom_wine_name ?? 'Vino sin nombre', winery: item.custom_winery ?? '—' }
}

export function CollectionTable({ items }: { items: CollectionItemWithWine[] }) {
  const [editingItem, setEditingItem] = useState<CollectionItemWithWine | null>(null)
  const deleteItem = useDeleteCollectionItem()

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Vino</TableHead>
            <TableHead>Añada</TableHead>
            <TableHead>Región</TableHead>
            <TableHead className="text-right">Cantidad</TableHead>
            <TableHead>Condición</TableHead>
            <TableHead className="text-right">Valor estimado</TableHead>
            <TableHead className="w-10" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => {
            const { name, winery } = itemDisplayName(item)
            const region = item.reference_wine?.region ?? item.custom_region
            const mismatchNote = item.reference_wine
              ? formatVintageMismatchNote(item.reference_wine.vintage, item.vintage)
              : null
            const totalValue = item.reference_wine
              ? item.reference_wine.estimated_market_price_eur * item.quantity
              : null

            return (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="font-medium">{name}</div>
                  <div className="text-xs text-muted-foreground">{winery}</div>
                </TableCell>
                <TableCell>
                  {item.vintage ?? '—'}
                  {mismatchNote && (
                    <div className="text-xs text-amber-700 dark:text-amber-400">
                      añada distinta
                    </div>
                  )}
                </TableCell>
                <TableCell>{region ? REGION_LABEL[region] : '—'}</TableCell>
                <TableCell className="text-right">{item.quantity}</TableCell>
                <TableCell className="capitalize">{item.condition}</TableCell>
                <TableCell className="text-right">
                  {totalValue !== null ? (
                    <div className="flex items-center justify-end gap-2">
                      <span>{formatEur(totalValue)}</span>
                      <ConfidenceBadge
                        level={item.reference_wine!.confidence_level}
                        rationale={mismatchNote ?? item.reference_wine!.confidence_rationale}
                      />
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">Sin valorar</span>
                  )}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-8">
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onSelect={() => setEditingItem(item)}>
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        variant="destructive"
                        onSelect={() => deleteItem.mutate(item.id)}
                      >
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      {editingItem && (
        <EditBottleDialog
          item={editingItem}
          open={!!editingItem}
          onOpenChange={(open) => !open && setEditingItem(null)}
        />
      )}
    </>
  )
}
