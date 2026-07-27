import { Link } from 'react-router-dom'
import { Wordmark } from '@/components/layout/Wordmark'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export function Hero() {
  const ref = useScrollReveal<HTMLDivElement>({ itemSelector: '[data-reveal-item]' })

  return (
    <div className="relative overflow-hidden bg-void px-4 py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 50% at 15% 0%, color-mix(in oklab, var(--color-garnet) 22%, transparent), transparent 70%)',
        }}
      />

      <div ref={ref} className="relative mx-auto flex max-w-[1180px] flex-col items-start gap-10">
        <div data-reveal-item>
          <Wordmark />
        </div>

        <div className="max-w-2xl">
          <p
            data-reveal-item
            className="font-mono text-xs font-medium tracking-[0.08em] text-garnet-bright uppercase"
          >
            Vino español, valorado con honestidad
          </p>
          <h1
            data-reveal-item
            className="mt-3 text-[2.75rem] leading-[1.03] font-bold tracking-[-0.02em] text-paper sm:text-[4rem] lg:text-[4.75rem]"
          >
            Descubre cuánto vale tu colección de vino
          </h1>
          <p data-reveal-item className="mt-6 max-w-lg text-[16px] leading-relaxed text-frost">
            Registra tus botellas de Rioja, Ribera del Duero y Priorat y consulta el
            valor de mercado estimado de cada una — sin investigar vino por vino.
          </p>
        </div>

        <div data-reveal-item className="flex flex-wrap gap-3">
          <Link
            to="/register"
            className="rounded-pill bg-garnet px-7 py-3.5 text-[15px] font-semibold text-paper transition-colors hover:bg-garnet/85"
          >
            Crear cuenta gratis
          </Link>
          <Link
            to="/login"
            className="rounded-pill border border-hairline px-7 py-3.5 text-[15px] font-semibold text-paper transition-colors hover:border-frost"
          >
            Ya tengo cuenta
          </Link>
        </div>
      </div>
    </div>
  )
}
