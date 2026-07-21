import { useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { CDDisk }          from '../components/CDDisk'
import { Waveform }        from '../components/Waveform'
import { useTypewriter }   from '../hooks/useTypewriter'
import { useMagnet }       from '../hooks/useMagnet'
import { useMusicContext } from '../context/MusicContext'
import { TRACKS }          from '../context/MusicContext'
import type { TypewriterAction } from '../hooks/useTypewriter'

const ACTIONS: TypewriterAction[] = [
  { type: 'pause', ms: 400 },
  { type: 'type',  text: "hi, i'm andrew. welcome to my portfolio!", speed: 65 },
]

// ── Tiny icon components ──────────────────────────────────────────────────

function PauseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
      <rect x="3"  y="2" width="4" height="12" rx="1" />
      <rect x="9"  y="2" width="4" height="12" rx="1" />
    </svg>
  )
}
function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
      <path d="M4 2.5l10 5.5-10 5.5V2.5z" />
    </svg>
  )
}
function SkipIcon({ flip }: { flip?: boolean }) {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="currentColor"
         style={{ transform: flip ? 'scale(-1,1)' : undefined }}>
      <rect x="9" y="1" width="2" height="12" rx="1" />
      <path d="M1 1.5l8 5.5-8 5.5V1.5z" />
    </svg>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────

export function Hero() {
  const [phase, setPhase] = useState<'typing' | 'reveal'>('typing')

  const { displayed, done } = useTypewriter(ACTIONS, () => {
    setTimeout(() => setPhase('reveal'), 950)
  })

  const { isPlaying, currentTrack, toggle, prevTrack, nextTrack, getFrequencyData } = useMusicContext()

  // Parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const namX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-16, 16]), { stiffness: 45, damping: 18 })
  const namY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-10, 10]), { stiffness: 45, damping: 18 })
  const tagX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6,   6]), { stiffness: 70, damping: 22 })
  const tagY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-4,   4]), { stiffness: 70, damping: 22 })

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { width, height, left, top } = e.currentTarget.getBoundingClientRect()
    mouseX.set((e.clientX - left - width  / 2) / width)
    mouseY.set((e.clientY - top  - height / 2) / height)
  }
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0) }

  const primaryRef   = useMagnet<HTMLAnchorElement>(0.38, 95)

  return (
    <section
      id="intro"
      className="relative flex min-h-screen items-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <AnimatePresence mode="wait">

        {/* ── Phase 1: Typewriter, centered ───────────────────── */}
        {phase === 'typing' && (
          <motion.div
            key="typing"
            className="absolute inset-0 flex items-center justify-center px-8"
            style={{ zIndex: 1 }}
            exit={{ opacity: 0, y: -18, transition: { duration: 0.45, ease: 'easeIn' } }}
          >
            <p
              className="font-display font-light text-cream text-center"
              style={{ fontSize: 'clamp(30px, 4.5vw, 58px)', lineHeight: 1.1 }}
            >
              {displayed}
              <AnimatePresence>
                {!done && (
                  <motion.span
                    key="bar"
                    exit={{ opacity: 0, transition: { duration: 0.3 } }}
                    className="cursor-blink ml-0.5 text-gold"
                  >
                    |
                  </motion.span>
                )}
              </AnimatePresence>
            </p>
          </motion.div>
        )}

        {/* ── Phase 2: Full hero ────────────────────────────────── */}
        {phase === 'reveal' && (
          <motion.div
            key="reveal"
            className="w-full flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24 px-10 pt-24"
            style={{ position: 'relative', zIndex: 1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Left: text */}
            <div className="flex flex-col gap-6 max-w-lg">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x:   0 }}
                transition={{ duration: 0.55, delay: 0.05 }}
                className="font-body text-xs uppercase tracking-[0.35em] text-mist"
              >
                Engineer · Builder · Composer
              </motion.p>

              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x:   0 }}
                transition={{ duration: 0.65, delay: 0.12 }}
              >
                <motion.h1
                  style={{ x: namX, y: namY, fontSize: 'clamp(46px, 6vw, 82px)' }}
                  className="font-display font-light leading-none tracking-wide text-cream"
                >
                  Andrew Simons
                </motion.h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x:   0 }}
                transition={{ duration: 0.55, delay: 0.22 }}
              >
                <motion.p
                  style={{ x: tagX, y: tagY }}
                  className="font-body text-base leading-relaxed text-mist max-w-md"
                >
                  Building systems at the intersection of machine learning,
                  climate science, and creative technology.
                </motion.p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y:  0 }}
                transition={{ duration: 0.5, delay: 0.32 }}
                className="flex items-center gap-5 pt-1"
              >
                <motion.a
                  ref={primaryRef}
                  href="#work"
                  className="font-body relative overflow-hidden rounded-full border border-gold/60 px-16 py-6 text-sm font-medium"
                  style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.18) 0%, rgba(124,106,156,0.12) 100%)' }}
                  initial="rest"
                  animate="rest"
                  whileHover="hover"
                  whileTap={{ scale: 0.95 }}
                  variants={{
                    rest:  { scale: 1, boxShadow: '0 0 12px rgba(201,168,76,0.15), inset 0 1px 0 rgba(255,255,255,0.06)' },
                    hover: { scale: 1.06, boxShadow: '0 0 28px rgba(201,168,76,0.55), inset 0 1px 0 rgba(255,255,255,0.1)' },
                  }}
                  transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                >
                  {/* gradient fill */}
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'linear-gradient(115deg, #C9A84C 0%, #7C6A9C 100%)' }}
                    variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                    transition={{ duration: 0.22 }}
                  />
                  {/* shimmer sweep */}
                  <motion.span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-full"
                    style={{ background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.18) 50%, transparent 65%)' }}
                    animate={{ x: ['-100%', '210%'] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'linear', repeatDelay: 1.2 }}
                  />
                  <motion.span
                    className="relative"
                    variants={{ rest: { color: '#C9A84C' }, hover: { color: '#0D0B0E' } }}
                    transition={{ duration: 0.18 }}
                  >
                    &nbsp; See my work &nbsp;
                  </motion.span>
                </motion.a>
              </motion.div>
            </div>

            {/* Right: CD + waveform + controls */}
            <motion.div
              className="flex flex-col items-center gap-5 shrink-0"
              initial={{ opacity: 0, scale: 0.88, x: 30 }}
              animate={{ opacity: 1, scale: 1,    x:  0 }}
              transition={{ duration: 0.75, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            >
              {/* Handwriting annotation */}
              <motion.div
                className="self-start"
                style={{ pointerEvents: 'none', marginLeft: '24px', marginBottom: '-8px' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.01 }}
              >
                <motion.span
                  style={{
                    fontFamily: "'Caveat', cursive",
                    fontSize: '20px',
                    color: '#C9A84C',
                    opacity: 0.9,
                    display: 'block',
                    transform: 'rotate(-3deg)',
                    whiteSpace: 'nowrap',
                  }}
                  initial={{ clipPath: 'inset(0 100% 0 0)' }}
                  animate={{ clipPath: 'inset(0 0% 0 0)' }}
                  transition={{ delay: 1.5, duration: 1.1, ease: 'linear' }}
                >
                  press me to hear my compositions<span style={{ fontSize: '36px', lineHeight: 1 }}>!</span>
                </motion.span>
                <svg
                  width="110" height="105" viewBox="0 0 110 105" fill="none"
                  style={{ marginLeft: '50px', marginTop: '-2px' }}
                >
                  {/* arc that sweeps right then bends down toward the disk */}
                  <motion.path
                    d="M 10 5 C 55 15, 80 52, 68 95"
                    stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.85 }}
                    transition={{ delay: 2.7, duration: 0.85, ease: 'easeInOut' }}
                  />
                  {/* arrowhead pointing downward */}
                  <motion.path
                    d="M 58 84 L 68 97 L 78 84"
                    stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.85 }}
                    transition={{ delay: 3.5, duration: 0.28, ease: 'easeOut' }}
                  />
                </svg>
              </motion.div>

              {/* CD, click to play/pause */}
              <div
                onClick={toggle}
                style={{ cursor: 'pointer' }}
                title={isPlaying ? 'Pause' : 'Play'}
              >
                <CDDisk isPlaying={isPlaying} />
              </div>

              {/* Waveform */}
              <Waveform
                getFrequencyData={getFrequencyData}
                isPlaying={isPlaying}
                width={310}
                height={52}
              />

              {/* Playback controls */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="flex items-center gap-5"
              >
                <button
                  onClick={prevTrack}
                  className="text-mist/50 hover:text-gold transition-colors duration-200"
                  aria-label="Previous"
                >
                  <SkipIcon flip />
                </button>

                <button
                  onClick={toggle}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                  className="relative flex h-9 w-9 items-center justify-center rounded-full
                             border border-gold/40 text-gold
                             hover:bg-gold/10 transition-colors duration-200"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={isPlaying ? 'pause' : 'play'}
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1   }}
                      exit={{   opacity: 0, scale: 0.7  }}
                      transition={{ duration: 0.12 }}
                    >
                      {isPlaying ? <PauseIcon /> : <PlayIcon />}
                    </motion.span>
                  </AnimatePresence>

                  {isPlaying && (
                    <motion.span
                      className="absolute inset-0 rounded-full border border-gold/30"
                      animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                    />
                  )}
                </button>

                <button
                  onClick={nextTrack}
                  className="text-mist/50 hover:text-gold transition-colors duration-200"
                  aria-label="Next"
                >
                  <SkipIcon />
                </button>

                {/* Track name with crossfade */}
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentTrack}
                    initial={{ opacity: 0, x: 6  }}
                    animate={{ opacity: 1, x: 0  }}
                    exit={{   opacity: 0, x: -6  }}
                    transition={{ duration: 0.2 }}
                    className="font-body text-xs text-mist/60 tracking-wide whitespace-nowrap"
                  >
                    {TRACKS[currentTrack].title}
                  </motion.span>
                </AnimatePresence>
              </motion.div>
            </motion.div>

          </motion.div>
        )}

      </AnimatePresence>

      {/* Scroll indicator */}
      <AnimatePresence>
        {phase === 'reveal' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          >
            <span className="font-body text-[10px] uppercase tracking-[0.3em] text-mist/40">Scroll</span>
            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="h-9 w-px"
              style={{ background: 'linear-gradient(to bottom, #C9A84C70, transparent)' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
