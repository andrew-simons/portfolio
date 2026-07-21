import { motion, useMotionValue, useSpring } from 'framer-motion'

const SIZE = 310

const GROOVES = [38, 52, 64, 76, 88, 100, 110, 119, 126, 132, 137, 141, 144]

export function CDDisk({ isPlaying = true }: { isPlaying?: boolean }) {
  const rotX = useMotionValue(-6)
  const rotY = useMotionValue(10)
  const sRotX = useSpring(rotX, { stiffness: 80, damping: 20 })
  const sRotY = useSpring(rotY, { stiffness: 80, damping: 20 })

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    rotX.set(((e.clientY - cy) / (rect.height / 2)) * -16 - 6)
    rotY.set(((e.clientX - cx) / (rect.width  / 2)) *  16 + 10)
  }
  const handleLeave = () => { rotX.set(-6); rotY.set(10) }

  return (
    <div style={{ position: 'relative' }}>
      {/* Blur reflection beneath */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: -40,
          left: '50%',
          transform: 'translateX(-50%) scaleY(-0.25) scaleX(0.85)',
          width: SIZE,
          height: SIZE,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.18) 0%, rgba(201,168,76,0.05) 50%, transparent 70%)',
          filter: 'blur(18px)',
          opacity: 0.6,
          pointerEvents: 'none',
        }}
      />

      {/* 3D tilt wrapper */}
      <motion.div
        style={{ perspective: 900 }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <motion.div style={{ rotateX: sRotX, rotateY: sRotY, transformStyle: 'preserve-3d' }}>

          {/* Spinning disc */}
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            style={{ width: SIZE, height: SIZE, position: 'relative' }}
          >

            {/* Disc body */}
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              background: `conic-gradient(
                from 0deg at 50% 50%,
                #19160f, #22201a, #19160f,
                #1e1c14, #19160f, #221f18,
                #19160f, #1d1b12, #19160f
              )`,
              boxShadow: `
                0 0 0 1px rgba(201,168,76,0.18),
                0 0 48px rgba(201,168,76,0.14),
                0 24px 90px rgba(0,0,0,0.95)
              `,
            }} />

            {/* SVG grooves */}
            <svg
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
              viewBox={`0 0 ${SIZE} ${SIZE}`}
            >
              {GROOVES.map((r, i) => (
                <circle
                  key={r}
                  cx={SIZE / 2} cy={SIZE / 2} r={r}
                  fill="none"
                  stroke={i % 4 === 0 ? 'rgba(201,168,76,0.10)' : 'rgba(255,255,255,0.035)'}
                  strokeWidth={i >= 9 ? 0.5 : 0.8}
                />
              ))}
            </svg>

            {/* Top-left sheen */}
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              background: 'radial-gradient(ellipse at 30% 22%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 32%, transparent 58%)',
            }} />

            {/* Rotating gold arc shimmer */}
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              background: 'conic-gradient(from 198deg, transparent 0deg, rgba(201,168,76,0.09) 16deg, transparent 32deg)',
            }} />

            {/* Center label */}
            <div style={{
              position: 'absolute',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 80, height: 80,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 38% 32%, #201c14, #0e0c0a)',
              border: '1px solid rgba(201,168,76,0.32)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column', gap: 5,
            }}>
              <span style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 14,
                fontStyle: 'italic',
                color: 'rgba(201,168,76,0.88)',
                letterSpacing: '0.1em',
                lineHeight: 1,
              }}>
                A.S.
              </span>
              {/* Spindle hole */}
              <div style={{
                width: 9, height: 9, borderRadius: '50%',
                background: '#09080b',
                border: '1px solid rgba(201,168,76,0.22)',
              }} />
            </div>

          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
