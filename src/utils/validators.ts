import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().min(1, 'El email es obligatorio').email('Email no válido'),
  password: z.string().min(1, 'La contraseña es obligatoria'),
})

export type LoginFormValues = z.infer<typeof loginSchema>

export const registerSchema = z
  .object({
    email: z.string().min(1, 'El email es obligatorio').email('Email no válido'),
    password: z
      .string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .regex(/[A-Za-z]/, 'La contraseña debe incluir al menos una letra')
      .regex(/[0-9]/, 'La contraseña debe incluir al menos un número'),
    confirmPassword: z.string().min(1, 'Confirma tu contraseña'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })

export type RegisterFormValues = z.infer<typeof registerSchema>

const currentYear = new Date().getFullYear()

// Los inputs HTML entregan siempre string a react-hook-form, así que el schema
// recibe string y transforma a number — mantiene el tipo de entrada conocido
// (evita el `unknown` de z.preprocess, que rompe la inferencia de zodResolver).
function numberFromString(opts: {
  min?: number
  max?: number
  int?: boolean
  message: string
}) {
  return z
    .string()
    .optional()
    .transform((value, ctx) => {
      if (value === undefined || value === '') return undefined
      const num = Number(value)
      const invalid =
        Number.isNaN(num) ||
        (opts.int && !Number.isInteger(num)) ||
        (opts.min !== undefined && num < opts.min) ||
        (opts.max !== undefined && num > opts.max)
      if (invalid) {
        ctx.addIssue({ code: 'custom', message: opts.message })
        return z.NEVER
      }
      return num
    })
}

export const addBottleDetailsSchema = z.object({
  vintage: numberFromString({
    min: 1900,
    max: currentYear,
    int: true,
    message: 'Añada no válida',
  }),
  quantity: z.string().transform((value, ctx) => {
    const num = Number(value || '1')
    if (!Number.isInteger(num) || num < 1) {
      ctx.addIssue({ code: 'custom', message: 'La cantidad debe ser al menos 1' })
      return z.NEVER
    }
    return num
  }),
  condition: z.enum(['excelente', 'buena', 'aceptable', 'dañada']),
  purchase_price_eur: numberFromString({ min: 0, message: 'El precio no puede ser negativo' }),
  purchase_date: z
    .string()
    .optional()
    .transform((value) => (value === '' ? undefined : value)),
  purchase_location: z
    .string()
    .optional()
    .transform((value) => (value === '' ? undefined : value)),
  personal_notes: z
    .string()
    .optional()
    .transform((value) => (value === '' ? undefined : value)),
})

// Input = lo que entregan los <input> HTML (strings). Output = lo que recibe onSubmit
// tras la transformación del schema (numbers). zodResolver espera el tipo de Input
// en useForm<T> y produce el tipo de Output en el callback de handleSubmit.
export type AddBottleDetailsInput = z.input<typeof addBottleDetailsSchema>
export type AddBottleDetailsValues = z.output<typeof addBottleDetailsSchema>

export const manualWineSchema = z.object({
  custom_wine_name: z.string().min(1, 'El nombre del vino es obligatorio'),
  custom_winery: z
    .string()
    .optional()
    .transform((value) => (value === '' ? undefined : value)),
  custom_region: z.enum(['rioja', 'ribera_del_duero', 'priorat']).optional(),
})

export type ManualWineValues = z.infer<typeof manualWineSchema>
