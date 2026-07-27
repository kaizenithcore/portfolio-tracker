import { useScrollReveal } from '@/hooks/useScrollReveal'

// "Centered Editorial Block" — ver docs/DESIGN.md §4. Geist, no Fraunces:
// el titular del hero ya reclama el único momento de display serif por pantalla.
export function Manifesto() {
  const ref = useScrollReveal<HTMLParagraphElement>()

  return (
    <div className="bg-ink px-4 py-16 sm:py-20">
      <p
        ref={ref}
        className="mx-auto max-w-[640px] text-center text-xl leading-relaxed font-normal text-ivory sm:text-2xl"
      >
        No te decimos qué comprar. Te decimos lo que ya tienes — y cuánto de
        fiable es cada cifra.
      </p>
    </div>
  )
}
