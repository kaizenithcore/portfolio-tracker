import { useScrollReveal } from '@/hooks/useScrollReveal'

// "Centered Body Block" — patrón Atlas Card, ver docs/DESIGN.md §4.
export function Manifesto() {
  const ref = useScrollReveal<HTMLParagraphElement>()

  return (
    <div className="border-t border-hairline bg-void px-4 py-16 sm:py-20">
      <p
        ref={ref}
        className="mx-auto max-w-[640px] text-center text-xl leading-relaxed font-normal text-paper sm:text-2xl"
      >
        No te decimos qué comprar. Te decimos lo que ya tienes — y cuánto de
        fiable es cada cifra.
      </p>
    </div>
  )
}
