import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { WineSearchCombobox } from '@/components/catalog/WineSearchCombobox'
import { ConfidenceBadge } from '@/components/catalog/ConfidenceBadge'
import { useAddCollectionItem } from '@/hooks/useAddCollectionItem'
import {
  addBottleDetailsSchema,
  type AddBottleDetailsInput,
  type AddBottleDetailsValues,
} from '@/utils/validators'
import { formatEur } from '@/utils/formatters'
import { formatVintageMismatchNote } from '@/utils/confidence'
import type { ReferenceWine } from '@/types/wine'

const REGION_OPTIONS: { value: ReferenceWine['region']; label: string }[] = [
  { value: 'rioja', label: 'Rioja' },
  { value: 'ribera_del_duero', label: 'Ribera del Duero' },
  { value: 'priorat', label: 'Priorat' },
]

const CONDITION_OPTIONS = [
  { value: 'excelente', label: 'Excelente' },
  { value: 'buena', label: 'Buena' },
  { value: 'aceptable', label: 'Aceptable' },
  { value: 'dañada', label: 'Dañada' },
] as const

type AddBottleFormProps = {
  onDone: () => void
}

export function AddBottleForm({ onDone }: AddBottleFormProps) {
  const [mode, setMode] = useState<'catalog' | 'manual'>('catalog')
  const [selectedWine, setSelectedWine] = useState<ReferenceWine | null>(null)
  const [manualName, setManualName] = useState('')
  const [manualWinery, setManualWinery] = useState('')
  const [manualRegion, setManualRegion] = useState<ReferenceWine['region'] | ''>('')
  const [manualNameError, setManualNameError] = useState<string | null>(null)

  const addItem = useAddCollectionItem()

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<AddBottleDetailsInput, unknown, AddBottleDetailsValues>({
    resolver: zodResolver(addBottleDetailsSchema),
    defaultValues: { quantity: '1', condition: 'excelente' },
  })

  const enteredVintage = watch('vintage')
  const vintageMismatchNote =
    mode === 'catalog' && selectedWine
      ? formatVintageMismatchNote(
          selectedWine.vintage,
          enteredVintage ? Number(enteredVintage) : null,
        )
      : null

  async function onSubmit(values: AddBottleDetailsValues) {
    if (mode === 'catalog' && !selectedWine) {
      toast.error('Selecciona un vino del catálogo o cambia a entrada manual')
      return
    }

    if (mode === 'manual' && !manualName.trim()) {
      setManualNameError('El nombre del vino es obligatorio')
      return
    }

    try {
      await addItem.mutateAsync({
        reference_wine_id: mode === 'catalog' ? selectedWine!.id : null,
        custom_wine_name: mode === 'manual' ? manualName.trim() : null,
        custom_winery: mode === 'manual' && manualWinery.trim() ? manualWinery.trim() : null,
        custom_region: mode === 'manual' && manualRegion ? manualRegion : null,
        vintage: values.vintage ?? null,
        quantity: values.quantity,
        condition: values.condition,
        purchase_price_eur: values.purchase_price_eur ?? null,
        purchase_date: values.purchase_date ?? null,
        purchase_location: values.purchase_location ?? null,
        personal_notes: values.personal_notes ?? null,
      })
      toast.success('Botella añadida a tu colección')
      onDone()
    } catch {
      toast.error('No se pudo añadir la botella. Inténtalo de nuevo.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Vino</Label>
          <button
            type="button"
            className="text-xs text-muted-foreground underline underline-offset-4"
            onClick={() => setMode(mode === 'catalog' ? 'manual' : 'catalog')}
          >
            {mode === 'catalog' ? 'No lo encuentro, añadir manualmente' : 'Buscar en el catálogo'}
          </button>
        </div>

        {mode === 'catalog' ? (
          <>
            <WineSearchCombobox value={selectedWine} onSelect={setSelectedWine} />
            {selectedWine && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Precio estimado: {formatEur(selectedWine.estimated_market_price_eur)}</span>
                <ConfidenceBadge
                  level={selectedWine.confidence_level}
                  rationale={selectedWine.confidence_rationale}
                />
              </div>
            )}
          </>
        ) : (
          <div className="space-y-3 rounded-md border p-3">
            <p className="text-xs text-muted-foreground">
              Este vino se guardará sin valoración de mercado, ya que no está en nuestro
              catálogo.
            </p>
            <div className="space-y-2">
              <Label htmlFor="manualName">Nombre del vino</Label>
              <Input
                id="manualName"
                value={manualName}
                onChange={(event) => {
                  setManualName(event.target.value)
                  setManualNameError(null)
                }}
              />
              {manualNameError && (
                <p className="text-sm text-destructive">{manualNameError}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="manualWinery">Bodega (opcional)</Label>
              <Input
                id="manualWinery"
                value={manualWinery}
                onChange={(event) => setManualWinery(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Región (opcional)</Label>
              <Select
                value={manualRegion}
                onValueChange={(value) => setManualRegion(value as ReferenceWine['region'])}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona una región" />
                </SelectTrigger>
                <SelectContent>
                  {REGION_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="vintage">Añada</Label>
          <Input id="vintage" type="number" placeholder="2019" {...register('vintage')} />
          {errors.vintage && (
            <p className="text-sm text-destructive">{errors.vintage.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="quantity">Cantidad</Label>
          <Input id="quantity" type="number" min={1} {...register('quantity')} />
          {errors.quantity && (
            <p className="text-sm text-destructive">{errors.quantity.message}</p>
          )}
        </div>
      </div>

      {vintageMismatchNote && (
        <p className="rounded-md border border-dashed border-hairline bg-graphite/50 px-3 py-2 font-mono text-xs text-frost">
          {vintageMismatchNote}
        </p>
      )}

      <div className="space-y-2">
        <Label htmlFor="condition">Condición</Label>
        <Controller
          control={control}
          name="condition"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="condition" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CONDITION_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="purchase_price_eur">Precio de compra (opcional)</Label>
          <Input
            id="purchase_price_eur"
            type="number"
            step="0.01"
            min={0}
            {...register('purchase_price_eur')}
          />
          {errors.purchase_price_eur && (
            <p className="text-sm text-destructive">{errors.purchase_price_eur.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="purchase_date">Fecha de compra (opcional)</Label>
          <Input id="purchase_date" type="date" {...register('purchase_date')} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="personal_notes">Notas (opcional)</Label>
        <Textarea id="personal_notes" rows={2} {...register('personal_notes')} />
      </div>

      <Button type="submit" className="w-full" disabled={addItem.isPending}>
        {addItem.isPending ? 'Añadiendo…' : 'Añadir a mi colección'}
      </Button>
    </form>
  )
}
