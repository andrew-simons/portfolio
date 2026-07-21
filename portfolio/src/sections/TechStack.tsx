import { motion } from 'framer-motion'

type Category = 'ml' | 'web' | 'mobile' | 'tool'

const CAT_COLOR: Record<Category, string> = {
  ml:     '#C9A84C',
  web:    '#7C6A9C',
  mobile: '#D4CFC9',
  tool:   '#9B9390',
}

const GROUPS: { label: string; category: Category; techs: string[] }[] = [
  {
    label: 'ML / AI', category: 'ml',
    techs: ['Python', 'PyTorch', 'Scikit-learn', 'Google Earth Engine', 'Pandas', 'NumPy'],
  },
  {
    label: 'Web', category: 'web',
    techs: ['React', 'TypeScript', 'Three.js', 'TailwindCSS', 'Node.js', 'Framer Motion'],
  },
  {
    label: 'Mobile', category: 'mobile',
    techs: ['Swift', 'Flutter'],
  },
  {
    label: 'Tooling', category: 'tool',
    techs: ['SQL', 'Git', 'Figma'],
  },
]

// Corner bulb decoration
function CornerBulbs({ color = 'rgba(201,168,76,0.25)' }) {
  return (
    <div className="flex gap-1.5">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          animate={{
            opacity: [0.3, 1, 0.4, 1, 0.3],
            scale:   [0.9, 1.2, 0.9, 1.15, 0.9],
          }}
          transition={{
            duration: 1.8 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.35,
            ease: 'easeInOut',
          }}
          style={{
            width: 6, height: 6, borderRadius: '50%',
            background: color,
            boxShadow: `0 0 8px ${color}, 0 0 16px ${color}80`,
          }}
        />
      ))}
    </div>
  )
}

// Individual lit bulb pill
function Bulb({ tech, seed, color }: { tech: string; seed: number; color: string }) {
  const dur   = 1.6 + (seed % 7) * 0.4
  const delay = (seed * 0.31) % 2.4

  return (
    <motion.span
      animate={{
        opacity: [1, 0.45, 1, 0.65, 0.5, 1],
        textShadow: [
          `0 0 14px ${color}cc`,
          `0 0 4px ${color}33`,
          `0 0 18px ${color}ee`,
          `0 0 6px ${color}55`,
          `0 0 4px ${color}22`,
          `0 0 14px ${color}cc`,
        ],
      }}
      transition={{ duration: dur, repeat: Infinity, delay, ease: 'easeInOut' }}
      whileHover={{ scale: 1.08, transition: { duration: 0.15 } }}
      className="shrink-0 select-none cursor-default rounded-full"
      style={{
        padding: '6px 16px',
        background: `${color}18`,
        border: `1px solid ${color}55`,
        color,
        fontFamily: 'var(--font-body)',
        fontSize: '0.78rem',
        fontWeight: 500,
        letterSpacing: '0.05em',
        boxShadow: `0 0 14px ${color}30, 0 0 32px ${color}14, inset 0 1px 0 rgba(255,255,255,0.08)`,
        textShadow: `0 0 14px ${color}cc`,
      }}
    >
      {tech}
    </motion.span>
  )
}

export function TechStack() {
  let seed = 0

  return (
    <section id="stack" className="py-28 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="w-full"
        style={{ maxWidth: 980 }}
      >
        {/* Marquee sign board */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(7,5,8,0.85)',
            border: '1px solid rgba(201,168,76,0.14)',
            boxShadow: '0 0 0 1px rgba(201,168,76,0.04), 0 24px 60px rgba(0,0,0,0.5)',
          }}
        >
          {/* Top strip */}
          <div
            className="flex items-center justify-between px-6 py-3"
            style={{ borderBottom: '1px solid rgba(201,168,76,0.09)', background: 'rgba(201,168,76,0.04)' }}
          >
            <CornerBulbs />
            <span style={{
              fontFamily: 'var(--font-code)', fontSize: 12,
              color: 'rgba(201,168,76,0.5)', letterSpacing: '0.38em', textTransform: 'uppercase',
            }}>
              THE TECH STACK
            </span>
            <CornerBulbs />
          </div>

          {/* Bulb rows */}
          <div className="flex flex-col gap-7" style={{ padding: '20px 32px' }}>
            {GROUPS.map((group, gi) => {
              const color = CAT_COLOR[group.category]
              return (
                <motion.div
                  key={group.category}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: gi * 0.1 }}
                  className="flex items-center gap-5"
                >
                  {/* Category label */}
                  <span
                    className="shrink-0"
                    style={{
                      fontFamily: 'var(--font-code)', fontSize: 10,
                      color: `${color}60`, letterSpacing: '0.22em',
                      textTransform: 'uppercase', width: 64,
                    }}
                  >
                    {group.label}
                  </span>

                  {/* Hairline separator */}
                  <div style={{ width: 1, height: 24, background: `${color}18`, flexShrink: 0 }} />

                  {/* Bulbs */}
                  <div className="flex flex-wrap gap-2">
                    {group.techs.map(tech => (
                      <Bulb key={tech} tech={tech} seed={seed++} color={color} />
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Bottom strip */}
          <div
            className="flex items-center justify-between px-6 py-3"
            style={{ borderTop: '1px solid rgba(201,168,76,0.09)', background: 'rgba(201,168,76,0.04)' }}
          >
            <CornerBulbs />
            <span>&nbsp;</span>
            <CornerBulbs />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
