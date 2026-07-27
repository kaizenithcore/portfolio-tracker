import { Link } from 'react-router-dom'
import { Wordmark } from '@/components/layout/Wordmark'
import { RegisterForm } from '@/components/auth/RegisterForm'

export function RegisterPage() {
  return (
    <div className="dark flex min-h-svh items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-lg border border-border bg-card p-6">
        <Link to="/" className="mb-4 inline-block">
          <Wordmark tone="ink" />
        </Link>
        <h1 className="mb-6 font-heading text-2xl text-foreground">Crea tu cuenta</h1>
        <RegisterForm />
      </div>
    </div>
  )
}
