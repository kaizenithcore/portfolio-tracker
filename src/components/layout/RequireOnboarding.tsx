import { Navigate, Outlet } from 'react-router-dom'
import { useProfile } from '@/hooks/useProfile'

export function RequireOnboarding() {
  const { data: profile, isLoading } = useProfile()

  if (isLoading) {
    return (
      <div className="flex min-h-svh items-center justify-center text-muted-foreground">
        Cargando…
      </div>
    )
  }

  if (profile && !profile.onboarding_completed) {
    return <Navigate to="/onboarding" replace />
  }

  return <Outlet />
}
