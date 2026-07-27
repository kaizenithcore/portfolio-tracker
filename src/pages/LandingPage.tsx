import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function LandingPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="text-3xl font-semibold">Portfolio Tracker — Vino</h1>
      <p className="max-w-md text-muted-foreground">
        Registra tu colección de vino español y consulta el valor estimado de mercado
        de cada botella, sin investigar cada vino a mano.
      </p>
      <div className="flex gap-3">
        <Button asChild>
          <Link to="/register">Crear cuenta gratis</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/login">Iniciar sesión</Link>
        </Button>
      </div>
    </div>
  )
}
