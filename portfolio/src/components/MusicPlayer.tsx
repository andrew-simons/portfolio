import { motion, AnimatePresence } from 'framer-motion'
import { useMusicContext, TRACKS }  from '../context/MusicContext'

function PauseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <rect x="3"  y="2" width="4" height="12" rx="1" />
      <rect x="9" y="2" width="4" height="12" rx="1" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M4 2.5l10 5.5-10 5.5V2.5z" />
    </svg>
  )
}

function SkipIcon({ direction }: { direction: 'prev' | 'next' }) {
  const flip = direction === 'prev' ? 'scale(-1,1)' : undefined
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" style={{ transform: flip }}>
      <rect x="9" y="1" width="2" height="12" rx="1" />
      <path d="M1 1.5l8 5.5-8 5.5V1.5z" />
    </svg>
  )
}

export function MusicPlayer() {
  const { isPlaying, currentTrack, toggle, prevTrack, nextTrack } = useMusicContext()

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className="glass fixed bottom-6 left-1/2 -translate-x-1/2 z-40
                   flex items-center gap-4 rounded-full px-5 py-3
                   border border-white/8"
        style={{ pointerEvents: 'auto' }}
      >
        {/* Prev */}
        <button
          onClick={prevTrack}
          className="text-mist/50 hover:text-gold transition-colors duration-200"
          aria-label="Previous track"
        >
          <SkipIcon direction="prev" />
        </button>

        {/* Play / Pause */}
        <button
          onClick={toggle}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          className="relative flex h-8 w-8 items-center justify-center rounded-full
                     border border-gold/40 text-gold
                     hover:bg-gold/10 transition-colors duration-200"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isPlaying ? 'pause' : 'play'}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{   opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.15 }}
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </motion.span>
          </AnimatePresence>

          {/* Pulsing ring when playing */}
          {isPlaying && (
            <motion.span
              className="absolute inset-0 rounded-full border border-gold/30"
              animate={{ scale: [1, 1.45], opacity: [0.6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
            />
          )}
        </button>

        {/* Next */}
        <button
          onClick={nextTrack}
          className="text-mist/50 hover:text-gold transition-colors duration-200"
          aria-label="Next track"
        >
          <SkipIcon direction="next" />
        </button>

        {/* Divider */}
        <span className="h-4 w-px bg-white/10" />

        {/* Track name */}
        <AnimatePresence mode="wait">
          <motion.span
            key={currentTrack}
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{   opacity: 0, x: -6 }}
            transition={{ duration: 0.25 }}
            className="font-body text-xs text-mist/70 tracking-wide pr-1 whitespace-nowrap"
          >
            {TRACKS[currentTrack].title}
          </motion.span>
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  )
}
