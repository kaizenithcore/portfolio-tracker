import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

// Selección curada a propósito para la landing: un icónico de alta confianza,
// uno medio y uno de entrada asequible — refuerza el mensaje de honestidad
// sobre el nivel de confianza en vez de mostrar solo vinos de lujo.
const PREVIEW_WINE_NAMES = ['Único', 'Roda I Reserva', 'Viñas de Gain', "L'Ermita"]

export function useCatalogPreview() {
  return useQuery({
    queryKey: ['catalog-preview'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reference_wines')
        .select('*')
        .in('name', PREVIEW_WINE_NAMES)

      if (error) throw error
      return data
    },
  })
}
