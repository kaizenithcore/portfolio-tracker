import { cn } from '@/lib/utils'

type WordmarkProps = {
  className?: string
}

// Lockup de marca — un único registro oscuro, ver docs/DESIGN.md §4.
export function Wordmark({ className }: WordmarkProps) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <span className="text-[15px] font-semibold tracking-[0.06em] text-paper uppercase">
        Acervo
      </span>
      <span className="rounded-pill border border-garnet-bright/50 px-2.5 py-0.5 font-mono text-[10px] tracking-[0.04em] text-garnet-bright uppercase">
        Vino
      </span>
    </span>
  )
}
