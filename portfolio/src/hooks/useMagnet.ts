import { useRef, useEffect } from 'react'

export function useMagnet<T extends HTMLElement>(strength = 0.35, threshold = 90) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy)

      if (dist < threshold) {
        el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`
        el.style.transition =
          'transform 0.08s ease-out, background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease'
      } else {
        el.style.transform = ''
        el.style.transition =
          'transform 0.55s cubic-bezier(0.23, 1, 0.32, 1), background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease'
      }
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [strength, threshold])

  return ref
}
