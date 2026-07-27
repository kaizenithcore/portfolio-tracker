import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useUpdateCollectionItem } from '@/hooks/useUpdateCollectionItem'
import {
  addBottleDetailsSchema,
  type AddBottleDetailsInput,
  type AddBottleDetailsValues,
} from '@/utils/validators'
import type { CollectionItemWithWine } from '@/types/collection'

const CONDITION_OPTIONS = [
  { value: 'excelente', label: 'Excelente' },
  { value: 'buena', label: 'Buena' },
  { value: 'aceptable', label: 'Aceptable' },
  { value: 'dañada', label: 'Dañada' },
] as const

type EditBottleDialogProps = {
  item: CollectionItemWithWine
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditBottleDialog({ item, open, onOpenChange }: EditBottleDialogProps) {
  const updateItem = useUpdateCollectionItem()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddBottleDetailsInput, unknown, AddBottleDetailsValues>({
    resolver: zodResolver(addBottleDetailsSchema),
    defaultValues: {
      vintage: item.vintage ? String(item.vintage) : undefined,
      quantity: String(item.quantity),
      condition: item.condition,
      purchase_price_eur: item.purchase_price_eur ? String(item.purchase_price_eur) : undefined,
      purchase_date: item.purchase_date ?? undefined,
      purchase_location: item.purchase_location ?? undefined,
      personal_notes: item.personal_notes ?? undefined,
    },
  })

  async function onSubmit(values: AddBottleDetailsValues) {
    try {
      await updateItem.mutateAsync({
        id: item.id,
        changes: {
          vintage: values.vintage ?? null,
          quantity: values.quantity,
          condition: values.condition,
          purchase_price_eur: values.purchase_price_eur ?? null,
          purchase_date: values.purchase_date ?? null,
          purchase_location: values.purchase_location ?? null,
          personal_notes: values.personal_notes ?? null,
        },
      })
      toast.success('Botella actualizada')
      onOpenChange(false)
    } catch {
      toast.error('No se pudo actualizar. Inténtalo de nuevo.')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Editar {item.reference_wine?.name ?? item.custom_wine_name}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-vintage">Añada</Label>
              <Input id="edit-vintage" type="number" {...register('vintage')} />
              {errors.vintage && (
                <p className="text-sm text-destructive">{errors.vintage.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-quantity">Cantidad</Label>
              <Input id="edit-quantity" type="number" min={1} {...register('quantity')} />
              {errors.quantity && (
                <p className="text-sm text-destructive">{errors.quantity.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-condition">Condición</Label>
            <select
              id="edit-condition"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none"
              {...register('condition')}
            >
              {CONDITION_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-purchase-price">Precio de compra (opcional)</Label>
              <Input
                id="edit-purchase-price"
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
              <Label htmlFor="edit-purchase-date">Fecha de compra (opcional)</Label>
              <Input id="edit-purchase-date" type="date" {...register('purchase_date')} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-notes">Notas (opcional)</Label>
            <Textarea id="edit-notes" rows={2} {...register('personal_notes')} />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={updateItem.isPending}>
              {updateItem.isPending ? 'Guardando…' : 'Guardar cambios'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
