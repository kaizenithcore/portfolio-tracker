import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Wordmark } from '@/components/layout/Wordmark'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const TEASERS = [
  {
    image: '/media/bottles-silhouette.jpg',
    alt: 'Siluetas de botellas de vino sobre fondo negro',
    caption: 'Catálogo de 29 referencias',
  },
  {
    image: '/media/bottle-glass-dark.jpg',
    alt: 'Botella y copa de vino tinto sobre fondo oscuro',
    caption: 'Rioja · Ribera del Duero · Priorat',
  },
  {
    image: '/media/cellar-arched.jpg',
    alt: 'Cava histórica con hilera de barricas',
    caption: 'Confianza alta, media o baja — siempre visible',
  },
]

export function Hero() {
  const ref = useScrollReveal<HTMLDivElement>({ itemSelector: '[data-reveal-item]' })
  const videoRef = useRef<HTMLVideoElement>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(query.matches)
  }, [])

  return (
    <div className="relative overflow-hidden bg-void">
      <div className="absolute inset-0">
        {!reducedMotion && (
          <video
            ref={videoRef}
            className="size-full object-cover opacity-45"
            src="/media/hero-loop.mp4"
            poster="/media/bottles-silhouette.jpg"
            autoPlay
            muted
            loop
            playsInline
          />
        )}
        {reducedMotion && (
          <img
            src="/media/bottles-silhouette.jpg"
            alt=""
            aria-hidden
            className="size-full object-cover opacity-45"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-void/40 via-void/70 to-void" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(60% 50% at 15% 0%, color-mix(in oklab, var(--color-garnet) 30%, transparent), transparent 70%)',
          }}
        />
      </div>

      <div className="relative px-4 py-24 sm:py-32">
        <div ref={ref} className="mx-auto flex max-w-[1180px] flex-col items-start gap-10">
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

          <div className="mt-4 grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
            {TEASERS.map((teaser) => (
              <div key={teaser.caption} data-reveal-item>
                <div className="overflow-hidden rounded-xl border border-hairline">
                  <img
                    src={teaser.image}
                    alt={teaser.alt}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
                <p className="mt-2 font-mono text-[11px] tracking-[0.03em] text-ash uppercase">
                  {teaser.caption}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
