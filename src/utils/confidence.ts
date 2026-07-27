import type { Enums } from '@/types/database.types'

type ConfidenceLevel = Enums<'confidence_level'>

export const CONFIDENCE_META: Record<
  ConfidenceLevel,
  { label: string; badgeClassName: string }
> = {
  alto: {
    label: 'Confianza alta',
    badgeClassName: 'bg-status-alto-bg text-status-alto',
  },
  medio: {
    label: 'Confianza media',
    badgeClassName: 'bg-status-medio-bg text-status-medio',
  },
  bajo: {
    label: 'Confianza baja',
    badgeClassName: 'bg-status-bajo-bg text-status-bajo',
  },
}

export function formatVintageMismatchNote(referenceVintage: number | null, userVintage: number | null) {
  if (referenceVintage == null || userVintage == null || referenceVintage === userVintage) {
    return null
  }
  return `Precio estimado a partir de la añada ${referenceVintage}, no de tu añada exacta (${userVintage}).`
}
