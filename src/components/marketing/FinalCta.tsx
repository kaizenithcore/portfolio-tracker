import { Link } from 'react-router-dom'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export function FinalCta() {
  const ref = useScrollReveal<HTMLDivElement>({ itemSelector: '[data-reveal-item]' })

  return (
    <section className="border-t border-hairline bg-void px-4 py-24 sm:py-32">
      <div ref={ref} className="mx-auto max-w-[640px] text-center">
        <h2
          data-reveal-item
          className="text-3xl leading-[1.1] font-bold tracking-[-0.015em] text-paper sm:text-4xl"
        >
          Empieza a registrar tu colección
        </h2>
        <p data-reveal-item className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-frost">
          Gratis mientras validamos el producto con los primeros coleccionistas.
          Sin tarjeta, sin permanencia — solo tu colección y su valor honesto.
        </p>
        <div data-reveal-item className="mt-8">
          <Link
            to="/register"
            className="rounded-pill bg-garnet px-8 py-3.5 text-[15px] font-semibold text-paper transition-colors hover:bg-garnet/85"
          >
            Crear cuenta gratis
          </Link>
        </div>
      </div>
    </section>
  )
}
