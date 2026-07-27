import { NavLink } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition-colors hover:text-foreground ${
    isActive ? 'text-foreground' : 'text-muted-foreground'
  }`

export function Navbar() {
  const { user, signOut } = useAuth()

  return (
    <header className="border-b">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <NavLink to="/app/dashboard" className="font-semibold">
          Portfolio Tracker
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
          <span className="hidden text-sm text-muted-foreground sm:inline">
            {user?.email}
          </span>
          <Button variant="ghost" size="sm" onClick={() => signOut()}>
            Cerrar sesión
          </Button>
        </div>
      </div>
    </header>
  )
}
