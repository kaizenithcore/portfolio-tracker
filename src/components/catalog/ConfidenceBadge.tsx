import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { CONFIDENCE_META } from '@/utils/confidence'
import type { Enums } from '@/types/database.types'

type ConfidenceBadgeProps = {
  level: Enums<'confidence_level'>
  rationale?: string
}

export function ConfidenceBadge({ level, rationale }: ConfidenceBadgeProps) {
  const meta = CONFIDENCE_META[level]

  const badge = (
    <Badge variant="secondary" className={meta.badgeClassName}>
      {meta.label}
    </Badge>
  )

  if (!rationale) return badge

  return (
    <Tooltip>
      <TooltipTrigger asChild>{badge}</TooltipTrigger>
      <TooltipContent className="max-w-xs">{rationale}</TooltipContent>
    </Tooltip>
  )
}
