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
import { PageHeader } from '@/components/layout/PageHeader'
import { EmptyState } from '@/components/layout/EmptyState'
import { AddBottleForm } from '@/components/collection/AddBottleForm'
import { CollectionTable } from '@/components/collection/CollectionTable'
import { useCollection } from '@/hooks/useCollection'

export function CollectionPage() {
  const [addOpen, setAddOpen] = useState(false)
  const { data: items, isLoading } = useCollection()

  return (
    <div>
      <PageHeader
        kicker="Mi colección"
        title="Botellas registradas"
        description="Busca en el catálogo o añade a mano — cada botella lleva su valor estimado y su nivel de confianza."
        action={
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
        }
      />

      {isLoading && (
        <div className="space-y-2">
          <Skeleton className="h-12 w-full bg-graphite" />
          <Skeleton className="h-12 w-full bg-graphite" />
          <Skeleton className="h-12 w-full bg-graphite" />
        </div>
      )}

      {!isLoading && items && items.length === 0 && (
        <EmptyState
          image="/media/bottles-shelf.jpg"
          imageAlt="Botellas de vino ordenadas en una estantería de bodega"
          title="Todavía no has añadido ninguna botella"
          description="Busca tu vino en el catálogo investigado o regístralo a mano si no está — tarda menos de un minuto."
          action={
            <Button onClick={() => setAddOpen(true)}>
              <Plus className="mr-1 size-4" />
              Añade tu primera botella
            </Button>
          }
        />
      )}

      {!isLoading && items && items.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-hairline bg-obsidian">
          <CollectionTable items={items} />
        </div>
      )}
    </div>
  )
}
