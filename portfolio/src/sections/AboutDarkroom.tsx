import { motion } from 'framer-motion'

// ── Placeholder photo — swap src for your real image ──────────────────────
const PHOTO_SRC = '' // set to your image path, e.g. '/andrew.jpg'

const BIO_PARAGRAPHS = [
  "I'm Andrew — a builder at the intersection of machine learning, creative technology, and music. I study at MIT, where I spend my time training models, composing, and shipping things.",
  "My work spans climate ML, audio AI, full-stack apps, and mobile. I care about building things that are both technically rigorous and genuinely worth using.",
  "Outside of code, I compose music. The two inform each other more than people expect.",
]

const FACTS = [
  { label: 'Based in',  value: 'Cambridge, MA' },
  { label: 'School',    value: 'MIT'            },
  { label: 'Focus',     value: 'ML · Web · Music' },
]

// ── Darkroom photo component ───────────────────────────────────────────────

function DarkroomPhoto() {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 340 }}>
      {/* Photo frame */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{
          position: 'relative',
          borderRadius: 4,
          overflow: 'hidden',
          aspectRatio: '3 / 4',
          background: '#0a0810',
          border: '1px solid rgba(240,237,232,0.07)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
        }}
      >
        {/* Photo or placeholder */}
        {PHOTO_SRC ? (
          <img
            src={PHOTO_SRC}
            alt="Andrew Simons"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          // Placeholder — remove once you add a photo
          <div style={{
            width: '100%', height: '100%',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: 10,
            background: 'linear-gradient(160deg, #110e18 0%, #0D0B0E 100%)',
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              border: '1px solid rgba(201,168,76,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,76,0.35)" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <span style={{ fontFamily: 'var(--font-code)', fontSize: 9, letterSpacing: '0.25em', color: 'rgba(201,168,76,0.25)', textTransform: 'uppercase' }}>
              Photo here
            </span>
          </div>
        )}

        {/* Darkroom develop overlay — dark */}
        <motion.div
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 0 }}
          viewport={{ once: true, margin: '-8%' }}
          transition={{ duration: 3.0, ease: [0.7, 0, 0.3, 1] }}
          style={{ position: 'absolute', inset: 0, background: '#060402', pointerEvents: 'none', zIndex: 10 }}
        />

        {/* Amber safelight wash */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: [0, 0.55, 0] }}
          viewport={{ once: true, margin: '-8%' }}
          transition={{ duration: 2.2, delay: 0.45, times: [0, 0.35, 1] }}
          style={{ position: 'absolute', inset: 0, background: 'rgba(185,75,8,0.88)', pointerEvents: 'none', zIndex: 11 }}
        />

        {/* Film corner brackets */}
        {[
          { top: 8, left: 8,   borderTop: true,    borderLeft: true  },
          { top: 8, right: 8,  borderTop: true,    borderRight: true },
          { bottom: 8, left: 8,  borderBottom: true, borderLeft: true  },
          { bottom: 8, right: 8, borderBottom: true, borderRight: true },
        ].map((c, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: 'top' in c ? c.top : undefined,
            bottom: 'bottom' in c ? c.bottom : undefined,
            left: 'left' in c ? c.left : undefined,
            right: 'right' in c ? c.right : undefined,
            width: 12, height: 12,
            borderTop:    c.borderTop    ? '1px solid rgba(201,168,76,0.3)' : undefined,
            borderBottom: c.borderBottom ? '1px solid rgba(201,168,76,0.3)' : undefined,
            borderLeft:   c.borderLeft   ? '1px solid rgba(201,168,76,0.3)' : undefined,
            borderRight:  c.borderRight  ? '1px solid rgba(201,168,76,0.3)' : undefined,
            pointerEvents: 'none', zIndex: 12,
          }} />
        ))}
      </motion.div>

      {/* Caption below photo */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 2.0 }}
        style={{
          marginTop: 12, paddingLeft: 2,
          display: 'flex', alignItems: 'center', gap: 8,
        }}
      >
        <div style={{ flex: 1, height: 1, background: 'rgba(201,168,76,0.12)' }} />
        <span style={{ fontFamily: 'var(--font-code)', fontSize: 8, letterSpacing: '0.25em', color: 'rgba(201,168,76,0.35)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
          Andrew Simons · 2025
        </span>
        <div style={{ flex: 1, height: 1, background: 'rgba(201,168,76,0.12)' }} />
      </motion.div>
    </div>
  )
}

// ── Section ────────────────────────────────────────────────────────────────

export function About() {
  return (
    <section id="about" className="py-28 flex flex-col items-center">
      <div className="w-full" style={{ maxWidth: 980, padding: '0 24px' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 56 }}
        >
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 300,
            fontSize: 'clamp(32px,5vw,52px)',
            color: '#F0EDE8', lineHeight: 1.1,
          }}>
            About Me
          </h2>
        </motion.div>

        {/* Two-column layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: 72,
          alignItems: 'start',
        }}>
          {/* Left: text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

            {/* Bio paragraphs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {BIO_PARAGRAPHS.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  style={{
                    fontFamily: 'var(--font-body)', fontSize: '1rem',
                    color: 'rgba(240,237,232,0.75)', lineHeight: 1.75,
                  }}
                >
                  {para}
                </motion.p>
              ))}
            </div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                height: 1, originX: 0,
                background: 'linear-gradient(to right, rgba(201,168,76,0.25), transparent)',
              }}
            />

            {/* Quick facts */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
            >
              {FACTS.map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                  <span style={{
                    fontFamily: 'var(--font-code)', fontSize: 9,
                    letterSpacing: '0.22em', textTransform: 'uppercase',
                    color: 'rgba(201,168,76,0.5)', width: 64, flexShrink: 0,
                  }}>
                    {label}
                  </span>
                  <div style={{ width: 1, height: 12, background: 'rgba(201,168,76,0.15)', flexShrink: 0 }} />
                  <span style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.85rem',
                    color: 'rgba(240,237,232,0.65)',
                  }}>
                    {value}
                  </span>
                </div>
              ))}
            </motion.div>

          </div>

          {/* Right: photo */}
          <DarkroomPhoto />
        </div>

      </div>
    </section>
  )
}
