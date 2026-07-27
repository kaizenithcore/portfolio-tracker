import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCompleteOnboarding } from '@/hooks/useProfile'

export function OnboardingPage() {
  const [displayName, setDisplayName] = useState('')
  const navigate = useNavigate()
  const completeOnboarding = useCompleteOnboarding()

  async function finish(nameToSave: string | null) {
    try {
      await completeOnboarding.mutateAsync(nameToSave)
      navigate('/app/dashboard')
    } catch {
      toast.error('No se pudo guardar. Inténtalo de nuevo.')
    }
  }

  return (
    <div className="flex min-h-svh items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">¡Bienvenido!</CardTitle>
          <p className="text-sm text-muted-foreground">
            Un último paso opcional antes de registrar tu colección.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="displayName">¿Cómo te llamamos?</Label>
            <Input
              id="displayName"
              placeholder="Tu nombre"
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              disabled={completeOnboarding.isPending}
              onClick={() => finish(null)}
            >
              Saltar
            </Button>
            <Button
              className="flex-1"
              disabled={completeOnboarding.isPending}
              onClick={() => finish(displayName.trim() || null)}
            >
              Continuar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
