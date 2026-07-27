import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import { COLLECTION_QUERY_KEY } from '@/hooks/useCollection'
import type { TablesUpdate } from '@/types/database.types'

type UpdateCollectionItemInput = {
  id: string
  changes: TablesUpdate<'collection_items'>
}

export function useUpdateCollectionItem() {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, changes }: UpdateCollectionItemInput) => {
      const { error } = await supabase
        .from('collection_items')
        .update(changes)
        .eq('id', id)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...COLLECTION_QUERY_KEY, user?.id] })
    },
  })
}
