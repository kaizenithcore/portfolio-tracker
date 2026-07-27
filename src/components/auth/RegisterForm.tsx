import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/useAuth'
import { registerSchema, type RegisterFormValues } from '@/utils/validators'

export function RegisterForm() {
  const { signUp } = useAuth()
  const [submitting, setSubmitting] = useState(false)
  const [registered, setRegistered] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  })

  async function onSubmit(values: RegisterFormValues) {
    setSubmitting(true)
    const { error } = await signUp(values.email, values.password)
    setSubmitting(false)

    if (error) {
      toast.error('No se pudo crear la cuenta', { description: error })
      return
    }

    setRegistered(true)
  }

  if (registered) {
    return (
      <div className="space-y-3 text-center">
        <h2 className="text-lg font-medium">Revisa tu email</h2>
        <p className="text-sm text-muted-foreground">
          Te hemos enviado un enlace de confirmación. Confírmalo para poder iniciar
          sesión.
        </p>
        <Link to="/login" className="text-sm text-primary underline underline-offset-4">
          Volver a iniciar sesión
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" autoComplete="email" {...register('email')} />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Contraseña</Label>
        <Input
          id="password"
          type="password"
          autoComplete="new-password"
          {...register('password')}
        />
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
        <Input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={submitting}>
        {submitting ? 'Creando cuenta…' : 'Crear cuenta gratis'}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        ¿Ya tienes cuenta?{' '}
        <Link to="/login" className="text-primary underline underline-offset-4">
          Inicia sesión
        </Link>
      </p>
    </form>
  )
}
