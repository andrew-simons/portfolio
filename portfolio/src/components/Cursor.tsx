import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const G = '#C9A84C'

export function Cursor() {
  const mx = useMotionValue(-200)
  const my = useMotionValue(-200)

  // Three spring configs, wildly different stiffness creates the presenter-pointer lag
  const x1 = useSpring(mx, { stiffness: 700, damping: 45 })   // inner dot: near-instant
  const y1 = useSpring(my, { stiffness: 700, damping: 45 })
  const x2 = useSpring(mx, { stiffness: 180, damping: 28 })   // mid ring: slight lag
  const y2 = useSpring(my, { stiffness: 180, damping: 28 })
  const x3 = useSpring(mx, { stiffness: 55,  damping: 16 })   // outer glow: heavy lag
  const y3 = useSpring(my, { stiffness: 55,  damping: 16 })

  useEffect(() => {
    const move = (e: MouseEvent) => { mx.set(e.clientX); my.set(e.clientY) }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [mx, my])

  const base = {
    position: 'fixed'  as const,
    top: 0, left: 0,
    pointerEvents: 'none' as const,
    zIndex: 9999,
    borderRadius: '50%',
  }

  return (
    <>
      {/* Outer glow, most lag, gives the floating halo effect */}
      <motion.div
        aria-hidden="true"
        style={{
          ...base,
          width: 52, height: 52,
          marginLeft: -26, marginTop: -26,
          x: x3, y: y3,
          background: `radial-gradient(circle, ${G}1C 0%, transparent 68%)`,
          boxShadow: `0 0 28px 10px ${G}12`,
        }}
      />

      {/* Middle glow, medium lag */}
      <motion.div
        aria-hidden="true"
        style={{
          ...base,
          width: 22, height: 22,
          marginLeft: -11, marginTop: -11,
          x: x2, y: y2,
          background: `radial-gradient(circle, ${G}38 25%, ${G}12 55%, transparent 75%)`,
          boxShadow: `0 0 10px 4px ${G}28`,
        }}
      />

      {/* Inner dot, almost no lag, bright core */}
      <motion.div
        aria-hidden="true"
        style={{
          ...base,
          width: 8, height: 8,
          marginLeft: -4, marginTop: -4,
          x: x1, y: y1,
          background: G,
          boxShadow: `0 0 6px 2px ${G}CC, 0 0 16px 5px ${G}44`,
        }}
      />
    </>
  )
}
