import { Link } from 'react-router-dom'
import { Wordmark } from '@/components/layout/Wordmark'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export function Hero() {
  const ref = useScrollReveal<HTMLDivElement>({ itemSelector: '[data-reveal-item]' })

  return (
    <div className="relative overflow-hidden bg-ink px-4 py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 50% at 15% 0%, color-mix(in oklab, var(--color-garnet) 16%, transparent), transparent 70%)',
        }}
      />

      <div ref={ref} className="relative mx-auto flex max-w-[1180px] flex-col items-start gap-10">
        <div data-reveal-item>
          <Wordmark tone="ink" />
        </div>

        <div className="max-w-2xl">
          <p
            data-reveal-item
            className="font-mono text-xs font-medium tracking-[0.05em] text-garnet-bright uppercase"
          >
            Vino español, valorado con honestidad
          </p>
          <h1
            data-reveal-item
            className="mt-3 font-heading text-[2.75rem] leading-[1.03] font-light tracking-[-0.01em] text-ivory sm:text-[4rem] lg:text-[5rem]"
          >
            Descubre cuánto vale tu colección de vino
          </h1>
          <p data-reveal-item className="mt-6 max-w-lg text-[15px] leading-relaxed text-stone-light">
            Registra tus botellas de Rioja, Ribera del Duero y Priorat y consulta el
            valor de mercado estimado de cada una — sin investigar vino por vino.
          </p>
        </div>

        <div data-reveal-item className="flex flex-wrap gap-3">
          <Link
            to="/register"
            className="rounded-pill border border-ivory px-6 py-3 text-sm font-semibold text-ivory transition-colors hover:bg-ivory hover:text-ink"
          >
            Crear cuenta gratis
          </Link>
          <Link
            to="/login"
            className="rounded-pill border border-hairline-ink px-6 py-3 text-sm font-semibold text-stone-light transition-colors hover:border-ivory hover:text-ivory"
          >
            Ya tengo cuenta
          </Link>
        </div>
      </div>
    </div>
  )
}
