const STEPS = [
  {
    title: 'Busca tu vino',
    description:
      'Encuéntralo en nuestro catálogo de vinos españoles investigados, o añádelo a mano si no está.',
  },
  {
    title: 'Regístralo en tu colección',
    description: 'Indica cantidad, añada y condición. Tarda menos de un minuto.',
  },
  {
    title: 'Consulta su valor estimado',
    description:
      'Cada vino muestra su precio de mercado estimado junto con el nivel de confianza de ese dato.',
  },
]

export function HowItWorks() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h2 className="mb-10 text-center text-2xl font-semibold">Cómo funciona</h2>
      <div className="grid gap-8 sm:grid-cols-3">
        {STEPS.map((step, index) => (
          <div key={step.title} className="text-center">
            <div className="mx-auto mb-3 flex size-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
              {index + 1}
            </div>
            <h3 className="font-medium">{step.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
