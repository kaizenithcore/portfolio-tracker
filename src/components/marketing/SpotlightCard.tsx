import { useRef, type ComponentProps, type MouseEvent } from 'react'
import { cn } from '@/lib/utils'

type SpotlightCardProps = ComponentProps<'div'>

// Borde que sigue al cursor con Garnet a baja opacidad — la única concesión
// de "brillo" del sistema, y solo en interacción, nunca en reposo.
// Ver docs/DESIGN.md §12 "Motion & Interaction".
export function SpotlightCard({ children, className, onMouseMove, ...props }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (el) {
      const rect = el.getBoundingClientRect()
      el.style.setProperty('--spotlight-x', `${event.clientX - rect.left}px`)
      el.style.setProperty('--spotlight-y', `${event.clientY - rect.top}px`)
    }
    onMouseMove?.(event)
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn(
        'group relative overflow-hidden rounded-xl border border-hairline bg-obsidian transition-transform duration-300 hover:-translate-y-0.5',
        className,
      )}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(220px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), color-mix(in oklab, var(--color-garnet) 22%, transparent), transparent 70%)',
        }}
      />
      {children}
    </div>
  )
}
