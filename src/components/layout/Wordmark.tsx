import { cn } from '@/lib/utils'

type WordmarkProps = {
  tone?: 'ink' | 'paper'
  className?: string
}

// Lockup de marca: ver docs/DESIGN.md §4 "Wordmark Lockup".
export function Wordmark({ tone = 'ink', className }: WordmarkProps) {
  const isInk = tone === 'ink'

  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <span
        className={cn(
          'text-[15px] font-semibold tracking-[0.04em] uppercase',
          isInk ? 'text-ivory' : 'text-charcoal',
        )}
      >
        Acervo
      </span>
      <span
        className={cn(
          'rounded-pill border px-2.5 py-0.5 text-xs font-medium',
          isInk ? 'border-garnet-bright text-garnet-bright' : 'border-garnet text-garnet',
        )}
      >
        Vino
      </span>
    </span>
  )
}
