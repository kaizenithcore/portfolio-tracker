import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import type { CollectionItemWithWine } from '@/types/collection'

export const COLLECTION_QUERY_KEY = ['collection'] as const

export function useCollection() {
  const { user } = useAuth()

  return useQuery({
    queryKey: [...COLLECTION_QUERY_KEY, user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('collection_items')
        .select('*, reference_wine:reference_wines(*)')
        .order('added_at', { ascending: false })

      if (error) throw error
      return data as CollectionItemWithWine[]
    },
  })
}
