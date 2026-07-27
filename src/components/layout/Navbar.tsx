import { NavLink } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Wordmark } from '@/components/layout/Wordmark'
import { useAuth } from '@/hooks/useAuth'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition-colors hover:text-ivory ${
    isActive ? 'text-ivory' : 'text-stone-light'
  }`

export function Navbar() {
  const { user, signOut } = useAuth()

  return (
    <header className="border-b border-hairline-ink bg-ink">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <NavLink to="/app/dashboard">
          <Wordmark tone="ink" />
        </NavLink>

        <nav className="flex items-center gap-6">
          <NavLink to="/app/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/app/collection" className={navLinkClass}>
            Mi colección
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-stone-light sm:inline">{user?.email}</span>
          <Button
            variant="ghost"
            size="sm"
            className="text-ivory hover:bg-ink-elevated hover:text-ivory"
            onClick={() => signOut()}
          >
            Cerrar sesión
          </Button>
        </div>
      </div>
    </header>
  )
}
