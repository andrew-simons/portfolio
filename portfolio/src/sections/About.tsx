import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const PHOTO_SRC = '/andrew.png'

const BIO_PARAGRAPHS = [
  "Hi! I'm Andrew, a second-year student at MIT studying Mathematics (18) and Computer Science, Economics, and Data Science (6-14).",
  "I'm passionate about building software and machine learning systems, with experience spanning climate modeling, AI research, and full-stack development.",
  "Outside of coding, you'll usually find me swimming, diving, playing violin or piano, playing poker, or exploring new ideas at the intersection of technology and creativity.",
]

const FACTS = [
  { label: 'From',    value: 'Long Island, NY'  },
  { label: 'School',  value: 'MIT'              },
  { label: 'Focus',   value: 'ML · Web · Music' },
]

// ── Press photo ────────────────────────────────────────────────────────────

function PressPhoto() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const photoY = useTransform(scrollYProgress, [0, 1], [-24, 24])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.75, ease: [0.23, 1, 0.32, 1] }}
      style={{ width: 260, flexShrink: 0 }}
    >
      {/* Outer frame */}
      <div style={{
        background: 'rgba(240,237,232,0.03)',
        border: '1px solid rgba(240,237,232,0.1)',
        padding: 5,
        boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
      }}>
        {/* Photo viewport */}
        <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '3 / 4' }}>
          <motion.div style={{ y: photoY, height: '115%', width: '100%', position: 'absolute', top: '-7.5%' }}>
            <img
              src={PHOTO_SRC}
              alt="Andrew Simons"
              style={{
                width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                filter: 'sepia(8%) contrast(1.04)',
                transition: 'filter 0.4s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.filter = 'none')}
              onMouseLeave={e => (e.currentTarget.style.filter = 'sepia(8%) contrast(1.04)')}
            />
          </motion.div>

          {/* Warm vignette */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse at 50% 100%, rgba(201,168,76,0.06), transparent 65%)',
          }} />

          {/* Press stamp */}
          <div style={{
            position: 'absolute', bottom: 8, right: 9,
            fontFamily: 'var(--font-code)', fontSize: 6.5,
            color: 'rgba(240,237,232,0.15)', letterSpacing: '0.18em',
            textTransform: 'uppercase', pointerEvents: 'none',
          }}>
            Press Use
          </div>
        </div>

        {/* Caption strip */}
        <div style={{
          borderTop: '1px solid rgba(240,237,232,0.07)',
          padding: '9px 11px 7px',
          display: 'flex', flexDirection: 'column', gap: 3,
        }}>
          <span style={{
            fontFamily: 'var(--font-code)', fontSize: 10,
            color: 'rgba(240,237,232,0.65)', letterSpacing: '0.18em', textTransform: 'uppercase',
          }}>
            Andrew Simons
          </span>
          <span style={{
            fontFamily: 'var(--font-code)', fontSize: 7.5,
            color: 'rgba(201,168,76,0.42)', letterSpacing: '0.14em', textTransform: 'uppercase',
          }}>
            Mathematics · CS · Economics
          </span>
        </div>
      </div>
    </motion.div>
  )
}

// ── Section ────────────────────────────────────────────────────────────────

export function About() {
  return (
    <section id="about" className="flex flex-col items-center" style={{ paddingTop: 48, paddingBottom: 80 }}>
      <div className="w-full" style={{ maxWidth: 980, padding: '0 24px' }}>

        {/* Glass card */}
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, margin: '-80px' }}
          transition={{ type: 'spring', stiffness: 220, damping: 22 }}
          style={{
            background: 'rgba(7,5,9,0.82)',
            border: '1px solid rgba(201,168,76,0.1)',
            borderRadius: 14,
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            boxShadow: '0 24px 64px rgba(0,0,0,0.45), 0 0 0 1px rgba(201,168,76,0.04)',
            padding: '44px 48px',
          }}
        >
          {/* Heading inside card */}
          <div style={{ marginBottom: 36 }}>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 300,
              fontSize: 'clamp(28px,3.5vw,44px)',
              color: 'rgba(240,237,232,0.88)', lineHeight: 1.1,
            }}>
              About Me
            </h2>
            <div style={{ marginTop: 10, height: 1, background: 'linear-gradient(to right, rgba(201,168,76,0.2), transparent)' }} />
          </div>

          {/* Two-column layout */}
          <div style={{ display: 'flex', gap: 64, alignItems: 'flex-start' }}>

            {/* Left: text */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>

              {BIO_PARAGRAPHS.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.97rem',
                    color: 'rgba(240,237,232,0.7)', lineHeight: 1.8,
                  }}
                >
                  {para}
                </motion.p>
              ))}

              {/* Divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.5 }}
                style={{
                  height: 1, originX: 0,
                  background: 'linear-gradient(to right, rgba(201,168,76,0.2), transparent)',
                }}
              />

              {/* Quick facts */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.55 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 13 }}
              >
                {FACTS.map(({ label, value }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
                    <span style={{
                      fontFamily: 'var(--font-code)', fontSize: 9,
                      letterSpacing: '0.22em', textTransform: 'uppercase' as const,
                      color: 'rgba(201,168,76,0.45)', width: 56, flexShrink: 0,
                    }}>
                      {label}
                    </span>
                    <div style={{ width: 1, height: 12, background: 'rgba(201,168,76,0.14)', flexShrink: 0 }} />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.84rem', color: 'rgba(240,237,232,0.58)' }}>
                      {value}
                    </span>
                  </div>
                ))}
              </motion.div>

            </div>

            {/* Right: press photo */}
            <PressPhoto />

          </div>
        </motion.div>

      </div>
    </section>
  )
}
