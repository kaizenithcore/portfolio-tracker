import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'

const PROFILE_QUERY_KEY = ['profile'] as const

export function useProfile() {
  const { user } = useAuth()

  return useQuery({
    queryKey: [...PROFILE_QUERY_KEY, user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user!.id)
        .single()

      if (error) throw error
      return data
    },
  })
}

export function useCompleteOnboarding() {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (displayName: string | null) => {
      if (!user) throw new Error('No hay sesión activa')

      const { error } = await supabase
        .from('profiles')
        .update({ onboarding_completed: true, display_name: displayName })
        .eq('id', user.id)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...PROFILE_QUERY_KEY, user?.id] })
    },
  })
}
