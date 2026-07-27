import { Link } from 'react-router-dom'
import { Wordmark } from '@/components/layout/Wordmark'

const LINKS = [
  { label: 'Catálogo', href: '#catalogo' },
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Iniciar sesión', href: '/login' },
  { label: 'Crear cuenta', href: '/register' },
]

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-void">
      <div className="mx-auto max-w-[1180px] px-4 py-14">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <Wordmark />
            <p className="mt-3 text-sm leading-relaxed text-ash">
              Un acervo para lo que ya tienes. Vino es la primera categoría — no
              la única.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {LINKS.map((link) =>
              link.href.startsWith('#') ? (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-frost transition-colors hover:text-paper"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-sm text-frost transition-colors hover:text-paper"
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>
        </div>

        <p className="mt-10 max-w-2xl font-mono text-xs leading-relaxed text-ash">
          Acervo muestra valoraciones estimadas de mercado con fines puramente
          informativos. No constituye asesoramiento de inversión ni una
          recomendación personalizada de compra o venta. Los precios son
          estimaciones propias basadas en fuentes públicas y pueden no reflejar
          el precio real de reventa de tu botella.
        </p>

        <div className="mt-8 flex flex-col gap-2 border-t border-hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] text-ash">© 2026 Acervo</p>
          <p className="font-mono text-[11px] text-ash">Hecho en España</p>
        </div>
      </div>
    </footer>
  )
}
