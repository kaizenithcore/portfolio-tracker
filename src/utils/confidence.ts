import type { Enums } from '@/types/database.types'

type ConfidenceLevel = Enums<'confidence_level'>

// Los niveles de confianza se codifican por peso visual, no por color
// (verde/ámbar/rojo) — el sistema Acervo reserva el color para un único
// acento (Garnet). Alto = sólido y compacto; bajo = tenue y punteado.
// Ver docs/DESIGN.md §"Confidence Badge".
export const CONFIDENCE_META: Record<
  ConfidenceLevel,
  { label: string; badgeClassName: string }
> = {
  alto: {
    label: 'Confianza alta',
    badgeClassName: 'border border-paper bg-paper text-void',
  },
  medio: {
    label: 'Confianza media',
    badgeClassName: 'border border-hairline bg-graphite text-frost',
  },
  bajo: {
    label: 'Confianza baja',
    badgeClassName: 'border border-dashed border-hairline bg-transparent text-ash',
  },
}

export function formatVintageMismatchNote(referenceVintage: number | null, userVintage: number | null) {
  if (referenceVintage == null || userVintage == null || referenceVintage === userVintage) {
    return null
  }
  return `Precio estimado a partir de la añada ${referenceVintage}, no de tu añada exacta (${userVintage}).`
}
