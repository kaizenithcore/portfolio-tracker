import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

// PostgREST usa coma/paréntesis como sintaxis de filtro en .or() — se eliminan
// del término de búsqueda porque no aportan nada a una búsqueda de nombre de vino.
function sanitizeSearchTerm(term: string) {
  return term.replace(/[,()]/g, ' ').trim()
}

export function useReferenceWines(search: string) {
  const trimmed = sanitizeSearchTerm(search)

  return useQuery({
    queryKey: ['reference-wines', trimmed],
    enabled: trimmed.length >= 2,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reference_wines')
        .select('*')
        .or(`name.ilike.%${trimmed}%,winery.ilike.%${trimmed}%`)
        .order('name')
        .limit(20)

      if (error) throw error
      return data
    },
  })
}
