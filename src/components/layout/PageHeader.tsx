import type { ReactNode } from 'react'

type PageHeaderProps = {
  kicker: string
  title: string
  description?: string
  action?: ReactNode
}

// Cabecera de página de la app: kicker mono + titular, misma voz tipográfica
// que la landing. Ver docs/DESIGN.md §5 "Kicker Label".
export function PageHeader({ kicker, title, description, action }: PageHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 border-b border-hairline pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="font-mono text-[11px] font-medium tracking-[0.08em] text-garnet-bright uppercase">
          {kicker}
        </p>
        <h1 className="mt-1.5 text-2xl font-bold tracking-[-0.01em] text-paper sm:text-3xl">
          {title}
        </h1>
        {description && <p className="mt-1.5 max-w-md text-sm text-ash">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
