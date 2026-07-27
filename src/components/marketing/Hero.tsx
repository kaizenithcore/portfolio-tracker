import { Link } from 'react-router-dom'
import { Wordmark } from '@/components/layout/Wordmark'

export function Hero() {
  return (
    <div className="bg-ink px-4 py-16 sm:py-24">
      <div className="mx-auto flex max-w-[1180px] flex-col items-start gap-10">
        <Wordmark tone="ink" />

        <div className="max-w-2xl">
          <h1 className="font-heading text-[2.5rem] leading-[1.05] font-normal text-ivory sm:text-[3.5rem] lg:text-[4.5rem]">
            Sabe cuánto vale tu colección de vino
          </h1>
          <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-stone-light">
            Registra tus botellas de Rioja, Ribera del Duero y Priorat y consulta el
            valor de mercado estimado de cada una — sin investigar vino por vino.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
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
