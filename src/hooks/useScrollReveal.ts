import { useEffect, useRef } from 'react'
import { animate, stagger, utils } from 'animejs'

type ScrollRevealOptions = {
  /** Selector for the children to stagger, relative to the container. Omit to animate the container itself. */
  itemSelector?: string
  delay?: number
  distance?: number
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Revela un elemento (o sus hijos, en cascada) al entrar en el viewport.
// Ver docs/DESIGN.md §12 "Motion & Interaction".
export function useScrollReveal<T extends HTMLElement>({
  itemSelector,
  delay = 0,
  distance = 24,
}: ScrollRevealOptions = {}) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const targets = itemSelector
      ? Array.from(container.querySelectorAll<HTMLElement>(itemSelector))
      : [container]

    if (prefersReducedMotion()) {
      utils.set(targets, { opacity: 1, translateY: 0 })
      return
    }

    utils.set(targets, { opacity: 0, translateY: distance })

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            animate(targets, {
              opacity: [0, 1],
              translateY: [distance, 0],
              duration: 700,
              delay: stagger(90, { start: delay }),
              ease: 'outQuart',
            })
            observer.disconnect()
          }
        }
      },
      { threshold: 0.15 },
    )

    observer.observe(container)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ref
}
