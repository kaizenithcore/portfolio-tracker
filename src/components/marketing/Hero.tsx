import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <div className="flex flex-col items-center gap-6 px-4 py-20 text-center">
      <h1 className="max-w-2xl text-4xl font-semibold text-balance">
        Descubre cuánto vale tu colección de vino español
      </h1>
      <p className="max-w-xl text-lg text-muted-foreground">
        Registra tus botellas de Rioja, Ribera del Duero y Priorat y consulta el
        valor de mercado estimado de cada una, sin investigar vino por vino.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button size="lg" asChild>
          <Link to="/register">Crear cuenta gratis</Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link to="/login">Ya tengo cuenta</Link>
        </Button>
      </div>
    </div>
  )
}
