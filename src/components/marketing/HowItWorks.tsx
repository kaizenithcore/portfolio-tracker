import { useScrollReveal } from '@/hooks/useScrollReveal'

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
  const ref = useScrollReveal<HTMLDivElement>({ itemSelector: '[data-reveal-item]' })

  return (
    <div className="bg-void px-4 py-16 sm:py-24">
      <div ref={ref} className="mx-auto max-w-[1180px]">
        <p data-reveal-item className="font-mono text-xs font-medium tracking-[0.08em] text-ash uppercase">
          Cómo funciona
        </p>
        <h2 data-reveal-item className="mt-2 text-3xl font-bold tracking-[-0.01em] text-paper sm:text-4xl">
          De la botella al valor, en tres pasos
        </h2>

        <div className="mt-12 grid gap-10 sm:grid-cols-3">
          {STEPS.map((step, index) => (
            <div key={step.title} data-reveal-item className="border-t border-hairline pt-6">
              <p className="font-mono text-sm text-ash">{`0${index + 1}`}</p>
              <h3 className="mt-2 text-[15px] font-semibold text-paper">{step.title}</h3>
              <p className="mt-1 text-[15px] leading-relaxed text-frost">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
