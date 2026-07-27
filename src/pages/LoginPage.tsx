import { Link } from 'react-router-dom'
import { Wordmark } from '@/components/layout/Wordmark'
import { LoginForm } from '@/components/auth/LoginForm'

export function LoginPage() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-void px-4">
      <div className="w-full max-w-sm rounded-xl border border-hairline bg-obsidian p-6">
        <Link to="/" className="mb-4 inline-block">
          <Wordmark />
        </Link>
        <h1 className="mb-6 text-2xl font-bold text-paper">Inicia sesión</h1>
        <LoginForm />
      </div>
    </div>
  )
}
