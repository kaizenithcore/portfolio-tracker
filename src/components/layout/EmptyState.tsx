import type { ReactNode } from 'react'

type EmptyStateProps = {
  image: string
  imageAlt: string
  title: string
  description: string
  action: ReactNode
}

// Estado vacío con fotografía real en vez de un recuadro punteado genérico —
// misma voz visual que las secciones de la landing. Ver docs/DESIGN.md §9.
export function EmptyState({ image, imageAlt, title, description, action }: EmptyStateProps) {
  return (
    <div className="grid items-center gap-8 rounded-xl border border-hairline bg-obsidian p-8 sm:grid-cols-2 sm:p-10">
      <div>
        <h2 className="text-xl font-semibold text-paper">{title}</h2>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-ash">{description}</p>
        <div className="mt-6">{action}</div>
      </div>
      <div className="overflow-hidden rounded-lg">
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          className="aspect-[16/10] w-full object-cover grayscale-[15%]"
        />
      </div>
    </div>
  )
}
