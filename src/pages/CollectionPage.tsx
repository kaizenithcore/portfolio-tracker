import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { AddBottleForm } from '@/components/collection/AddBottleForm'
import { CollectionTable } from '@/components/collection/CollectionTable'
import { useCollection } from '@/hooks/useCollection'

export function CollectionPage() {
  const [addOpen, setAddOpen] = useState(false)
  const { data: items, isLoading } = useCollection()

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Mi colección</h1>
          <p className="mt-1 text-muted-foreground">
            Registra tus botellas y consulta su valor estimado de mercado.
          </p>
        </div>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <Button onClick={() => setAddOpen(true)}>
            <Plus className="mr-1 size-4" />
            Añadir botella
          </Button>
          {addOpen && (
            <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Añadir botella a la colección</DialogTitle>
              </DialogHeader>
              <AddBottleForm onDone={() => setAddOpen(false)} />
            </DialogContent>
          )}
        </Dialog>
      </div>

      {isLoading && (
        <div className="space-y-2">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      )}

      {!isLoading && items && items.length === 0 && (
        <div className="rounded-lg border border-dashed py-16 text-center">
          <p className="text-muted-foreground">Todavía no has añadido ninguna botella.</p>
          <Button className="mt-4" onClick={() => setAddOpen(true)}>
            <Plus className="mr-1 size-4" />
            Añade tu primera botella
          </Button>
        </div>
      )}

      {!isLoading && items && items.length > 0 && (
        <div className="rounded-lg border">
          <CollectionTable items={items} />
        </div>
      )}
    </div>
  )
}
