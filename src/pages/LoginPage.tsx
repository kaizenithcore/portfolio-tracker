import { Link } from 'react-router-dom'
import { Wordmark } from '@/components/layout/Wordmark'
import { LoginForm } from '@/components/auth/LoginForm'

export function LoginPage() {
  return (
    <div className="dark flex min-h-svh items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-lg border border-border bg-card p-6">
        <Link to="/" className="mb-4 inline-block">
          <Wordmark tone="ink" />
        </Link>
        <h1 className="mb-6 font-heading text-2xl text-foreground">Inicia sesión</h1>
        <LoginForm />
      </div>
    </div>
  )
}
