import { useState } from 'react'
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ConfidenceBadge } from '@/components/catalog/ConfidenceBadge'
import { useReferenceWines } from '@/hooks/useReferenceWines'
import { formatEur } from '@/utils/formatters'
import { cn } from '@/lib/utils'
import type { ReferenceWine } from '@/types/wine'

const REGION_LABEL: Record<ReferenceWine['region'], string> = {
  rioja: 'Rioja',
  ribera_del_duero: 'Ribera del Duero',
  priorat: 'Priorat',
}

type WineSearchComboboxProps = {
  value: ReferenceWine | null
  onSelect: (wine: ReferenceWine) => void
}

export function WineSearchCombobox({ value, onSelect }: WineSearchComboboxProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const { data: results, isFetching } = useReferenceWines(search)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-normal"
        >
          {value ? (
            <span className="truncate">
              {value.name} — {value.winery} ({REGION_LABEL[value.region]})
            </span>
          ) : (
            <span className="text-muted-foreground">Busca un vino por nombre o bodega…</span>
          )}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      {open && (
        <PopoverContent className="w-(--radix-popover-trigger-width) p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            value={search}
            onValueChange={setSearch}
            placeholder="Ej. Vega Sicilia, Pingus, Roda…"
          />
          <CommandList>
            {isFetching && (
              <div className="flex items-center justify-center py-6 text-sm text-muted-foreground">
                <Loader2 className="mr-2 size-4 animate-spin" />
                Buscando…
              </div>
            )}
            {!isFetching && search.trim().length < 2 && (
              <div className="py-6 text-center text-sm text-muted-foreground">
                Escribe al menos 2 letras para buscar.
              </div>
            )}
            {!isFetching && search.trim().length >= 2 && (
              <CommandEmpty>No encontramos este vino en nuestro catálogo.</CommandEmpty>
            )}
            <CommandGroup>
              {results?.map((wine) => (
                <CommandItem
                  key={wine.id}
                  value={wine.id}
                  onSelect={() => {
                    onSelect(wine)
                    setOpen(false)
                  }}
                  className="flex-col items-start gap-1"
                >
                  <div className="flex w-full items-center gap-2">
                    <Check
                      className={cn(
                        'size-4 shrink-0',
                        value?.id === wine.id ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                    <span className="font-medium">{wine.name}</span>
                    <span className="text-muted-foreground">— {wine.winery}</span>
                  </div>
                  <div className="flex w-full items-center gap-2 pl-6 text-xs text-muted-foreground">
                    <span>{REGION_LABEL[wine.region]}</span>
                    {wine.vintage && <span>· {wine.vintage}</span>}
                    <span>· {formatEur(wine.estimated_market_price_eur)}</span>
                    <ConfidenceBadge level={wine.confidence_level} />
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
        </PopoverContent>
      )}
    </Popover>
  )
}
