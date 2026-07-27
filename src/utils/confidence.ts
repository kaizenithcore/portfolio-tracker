import type { Enums } from '@/types/database.types'

type ConfidenceLevel = Enums<'confidence_level'>

export const CONFIDENCE_META: Record<
  ConfidenceLevel,
  { label: string; badgeClassName: string }
> = {
  alto: {
    label: 'Confianza alta',
    badgeClassName: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-200',
  },
  medio: {
    label: 'Confianza media',
    badgeClassName: 'bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-200',
  },
  bajo: {
    label: 'Confianza baja',
    badgeClassName: 'bg-red-100 text-red-900 dark:bg-red-900/40 dark:text-red-200',
  },
}

export function formatVintageMismatchNote(referenceVintage: number | null, userVintage: number | null) {
  if (referenceVintage == null || userVintage == null || referenceVintage === userVintage) {
    return null
  }
  return `Precio estimado a partir de la añada ${referenceVintage}, no de tu añada exacta (${userVintage}).`
}
