import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import { COLLECTION_QUERY_KEY } from '@/hooks/useCollection'
import type { TablesInsert } from '@/types/database.types'

export type NewCollectionItem = Omit<TablesInsert<'collection_items'>, 'user_id'>

export function useAddCollectionItem() {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (item: NewCollectionItem) => {
      if (!user) throw new Error('No hay sesión activa')

      const { error } = await supabase
        .from('collection_items')
        .insert({ ...item, user_id: user.id })

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...COLLECTION_QUERY_KEY, user?.id] })
    },
  })
}
