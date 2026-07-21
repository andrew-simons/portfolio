import { motion } from 'framer-motion'

type Category = 'ml' | 'web' | 'mobile' | 'tool'

const CREDITS: { heading: string; category: Category; techs: string[] }[] = [
  {
    heading: 'Produced with',
    category: 'ml',
    techs: ['Python', 'PyTorch', 'Scikit-learn', 'Google Earth Engine', 'Pandas', 'NumPy'],
  },
  {
    heading: 'Mixed in',
    category: 'web',
    techs: ['React', 'TypeScript', 'Three.js', 'TailwindCSS', 'Node.js', 'Framer Motion'],
  },
  {
    heading: 'Performed on',
    category: 'mobile',
    techs: ['Swift', 'Flutter'],
  },
  {
    heading: 'Engineered using',
    category: 'tool',
    techs: ['SQL', 'Git', 'Figma'],
  },
]

const CAT_COLOR: Record<Category, string> = {
  ml:     '#C9A84C',
  web:    '#7C6A9C',
  mobile: 'rgba(220,215,208,0.85)',
  tool:   '#9B9390',
}

export function TechStack() {
  return (
    <section id="stack" className="py-28 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="w-full"
        style={{ maxWidth: 860 }}
      >
        {/* Album-style header */}
        <div className="mb-10 flex items-baseline justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', paddingBottom: 12 }}>
          <p className="font-body text-[10px] uppercase tracking-[0.35em] text-mist/50">
            The stack
          </p>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', color: 'rgba(155,147,144,0.3)', fontStyle: 'italic', letterSpacing: '0.04em' }}>
            liner notes
          </p>
        </div>

        {/* Credit blocks, 2-column grid */}
        <div className="grid grid-cols-2 gap-x-16 gap-y-10">
          {CREDITS.map((block, bi) => (
            <motion.div
              key={block.category}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: bi * 0.1 }}
            >
              {/* Category heading */}
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.7rem',
                fontStyle: 'italic',
                color: CAT_COLOR[block.category],
                letterSpacing: '0.06em',
                marginBottom: 8,
                opacity: 0.8,
              }}>
                {block.heading}
              </p>

              {/* Tech list */}
              <ul className="flex flex-col gap-1.5">
                {block.techs.map((tech, ti) => (
                  <motion.li
                    key={tech}
                    initial={{ opacity: 0, x: -6 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: bi * 0.1 + ti * 0.04 }}
                    className="flex items-baseline gap-3"
                  >
                    {/* Index number */}
                    <span style={{
                      fontFamily: 'var(--font-code)',
                      fontSize: 8,
                      color: `${CAT_COLOR[block.category]}45`,
                      letterSpacing: '0.05em',
                      minWidth: 14,
                      userSelect: 'none',
                    }}>
                      {String(ti + 1).padStart(2, '0')}
                    </span>
                    {/* Tech name */}
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.05rem',
                      color: 'rgba(240,237,232,0.82)',
                      letterSpacing: '0.02em',
                      fontWeight: 300,
                      lineHeight: 1,
                    }}>
                      {tech}
                    </span>
                    {/* Dot leader */}
                    <span style={{
                      flex: 1,
                      borderBottom: `1px dotted ${CAT_COLOR[block.category]}18`,
                      marginBottom: 3,
                    }} />
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Footer rule */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 40, paddingTop: 14 }}>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.7rem',
            fontStyle: 'italic',
            color: 'rgba(155,147,144,0.25)',
            textAlign: 'center',
            letterSpacing: '0.08em',
          }}>
            All compositions engineered at MIT · Cambridge, MA
          </p>
        </div>
      </motion.div>
    </section>
  )
}
