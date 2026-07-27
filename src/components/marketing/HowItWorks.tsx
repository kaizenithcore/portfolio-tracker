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
    <div className="bg-paper px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-[1180px]">
        <p className="text-[13px] font-semibold tracking-[0.02em] text-stone uppercase">
          Cómo funciona
        </p>
        <h2 className="mt-2 font-heading text-3xl font-normal text-charcoal sm:text-4xl">
          De la botella al valor, en tres pasos
        </h2>

        <div className="mt-12 grid gap-10 sm:grid-cols-3">
          {STEPS.map((step, index) => (
            <div key={step.title}>
              <p className="font-heading text-2xl text-garnet">{`0${index + 1}`}</p>
              <h3 className="mt-2 text-[15px] font-semibold text-charcoal">{step.title}</h3>
              <p className="mt-1 text-[15px] leading-relaxed text-stone">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
