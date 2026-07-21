import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── Replace with your Formspree form ID from formspree.io ─────────────────
const FORMSPREE_ID = 'YOUR_FORM_ID'

// Pre-generated barcode widths (static to avoid re-render flicker)
const BARCODE = [2,1,3,1,2,2,1,3,1,2,1,2,3,1,2,1,1,3,2,1,2,1,3,2,1]

type Status = 'idle' | 'sending' | 'sent' | 'error'

// ── Input field ────────────────────────────────────────────────────────────

function PassField({
  label, value, onChange, type = 'text', placeholder,
}: {
  label: string; value: string; onChange: (v: string) => void
  type?: string; placeholder?: string
}) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <label style={{
        fontFamily: 'var(--font-code)', fontSize: 8,
        letterSpacing: '0.28em', textTransform: 'uppercase',
        color: focused ? 'rgba(201,168,76,0.7)' : 'rgba(201,168,76,0.38)',
        transition: 'color 0.2s',
      }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required
        style={{
          background: 'transparent',
          border: 'none',
          borderBottom: `1px solid ${focused ? 'rgba(201,168,76,0.5)' : 'rgba(240,237,232,0.1)'}`,
          outline: 'none',
          padding: '6px 0',
          fontFamily: 'var(--font-body)',
          fontSize: '0.88rem',
          color: 'rgba(240,237,232,0.85)',
          width: '100%',
          transition: 'border-color 0.2s',
        }}
      />
    </div>
  )
}

function PassTextarea({
  label, value, onChange,
}: {
  label: string; value: string; onChange: (v: string) => void
}) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, flex: 1 }}>
      <label style={{
        fontFamily: 'var(--font-code)', fontSize: 8,
        letterSpacing: '0.28em', textTransform: 'uppercase',
        color: focused ? 'rgba(201,168,76,0.7)' : 'rgba(201,168,76,0.38)',
        transition: 'color 0.2s',
      }}>
        {label}
      </label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required
        rows={4}
        style={{
          background: 'rgba(240,237,232,0.02)',
          border: `1px solid ${focused ? 'rgba(201,168,76,0.35)' : 'rgba(240,237,232,0.07)'}`,
          borderRadius: 6,
          outline: 'none',
          padding: '10px 12px',
          fontFamily: 'var(--font-body)',
          fontSize: '0.88rem',
          color: 'rgba(240,237,232,0.8)',
          width: '100%',
          resize: 'none',
          transition: 'border-color 0.2s',
          lineHeight: 1.6,
        }}
      />
    </div>
  )
}

// ── Backstage pass card ────────────────────────────────────────────────────

function BackstagePass() {
  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus]   = useState<Status>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, margin: '-80px' }}
      transition={{ type: 'spring', stiffness: 220, damping: 22 }}
      style={{
        position: 'relative',
        borderRadius: 10,
        overflow: 'hidden',
        background: 'rgba(8,6,10,0.92)',
        border: '1px solid rgba(201,168,76,0.15)',
        boxShadow: '0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(201,168,76,0.04)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
      }}
    >
      {/* Gold top strip */}
      <div style={{
        background: 'linear-gradient(90deg, #7a5010, #C9A84C 30%, #EDD06A 50%, #C9A84C 70%, #7a5010)',
        padding: '9px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontFamily: 'var(--font-code)', fontSize: 14, letterSpacing: '0.35em', color: '#0D0B0E', fontWeight: 800 }}>
          CONTACT ME
        </span>
        <span style={{ fontFamily: 'var(--font-code)', fontSize: 8, letterSpacing: '0.25em', color: 'rgba(13,11,14,0.65)' }}>
          ALL ACCESS · 2025
        </span>
      </div>

      {/* Pass body */}
      <div style={{ display: 'flex' }}>

        {/* Left: ID panel */}
        <div style={{
          width: 148,
          flexShrink: 0,
          padding: '24px 20px',
          borderRight: '1px solid rgba(201,168,76,0.1)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
        }}>
          {/* Hole punch */}
          <div style={{
            width: 14, height: 14, borderRadius: '50%',
            border: '1px solid rgba(201,168,76,0.25)',
            background: 'rgba(0,0,0,0.5)',
          }} />

          {/* Monogram box */}
          <div style={{
            width: 72, height: 72,
            border: '1px solid rgba(201,168,76,0.22)',
            borderRadius: 4,
            background: 'rgba(201,168,76,0.04)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: 28, fontWeight: 300,
              color: 'rgba(201,168,76,0.6)',
              letterSpacing: '0.05em',
            }}>
              A.S.
            </span>
          </div>

          {/* Name block */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-code)', fontSize: 10, letterSpacing: '0.2em', color: 'rgba(240,237,232,0.8)', lineHeight: 1.6 }}>
              ANDREW<br />SIMONS
            </p>
            <p style={{ fontFamily: 'var(--font-code)', fontSize: 7, letterSpacing: '0.18em', color: 'rgba(201,168,76,0.4)', marginTop: 5, textTransform: 'uppercase' }}>
              MIT · 2028
            </p>
          </div>

          {/* Fake barcode */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 1.5, marginTop: 'auto' }}>
            {BARCODE.map((w, i) => (
              <div key={i} style={{
                width: w,
                height: 22 + (i % 3) * 3,
                background: 'rgba(201,168,76,0.28)',
                borderRadius: 0.5,
              }} />
            ))}
          </div>
          <p style={{ fontFamily: 'var(--font-code)', fontSize: 6, letterSpacing: '0.1em', color: 'rgba(201,168,76,0.2)' }}>
            0427 · MIT · AS
          </p>
        </div>

        {/* Right: form */}
        <div style={{ flex: 1, padding: '28px 32px' }}>
          <AnimatePresence mode="wait">
            {status === 'sent' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  height: '100%', display: 'flex',
                  flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  gap: 14, textAlign: 'center',
                }}
              >
                {/* Gold stamp */}
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  border: '2px solid rgba(201,168,76,0.5)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(201,168,76,0.7)',
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p style={{ fontFamily: 'var(--font-code)', fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.7)' }}>
                  Pass Requested
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'rgba(155,147,144,0.6)' }}>
                  Message received. I'll be in touch.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: 20, height: '100%' }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <PassField label="Your Name" value={name} onChange={setName} placeholder="Jane Smith" />
                  <PassField label="Your Email" value={email} onChange={setEmail} type="email" placeholder="jane@email.com" />
                </div>

                <PassTextarea label="Message" value={message} onChange={setMessage} />

                {status === 'error' && (
                  <p style={{ fontFamily: 'var(--font-code)', fontSize: 8, letterSpacing: '0.18em', color: 'rgba(200,80,80,0.7)', textTransform: 'uppercase' }}>
                    Something went wrong. Try again.
                  </p>
                )}

                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    alignSelf: 'flex-start',
                    background: status === 'sending' ? 'transparent' : 'rgba(201,168,76,0.1)',
                    border: '1px solid rgba(201,168,76,0.4)',
                    borderRadius: 6,
                    padding: '10px 28px',
                    fontFamily: 'var(--font-code)',
                    fontSize: 10,
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    color: 'rgba(201,168,76,0.85)',
                    cursor: status === 'sending' ? 'default' : 'pointer',
                    transition: 'background 0.2s',
                  }}
                >
                  {status === 'sending' ? 'Sending...' : 'Submit'}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

// ── Section ────────────────────────────────────────────────────────────────

export function Contact() {
  return (
    <section id="contact" className="py-28 flex flex-col items-center" style={{ marginTop: 48 }}>
      <div className="w-full" style={{ maxWidth: 980, padding: '0 24px' }}>

        <BackstagePass />

      </div>
    </section>
  )
}
