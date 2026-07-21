import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useAudioAnalyzer } from '../hooks/useAudioAnalyzer'
import type { AudioData }   from '../hooks/useAudioAnalyzer'

export const TRACKS = [
  { title: 'Rach-Style Prelude',  src: '/music/rach-style-prelude.mp3' },
  { title: 'String Quartet',      src: '/music/string-quartet.mp3'     },
] as const

interface MusicCtxValue {
  isPlaying:       boolean
  currentTrack:    number
  toggle:          () => void
  prevTrack:       () => void
  nextTrack:       () => void
  getAudioData:    () => AudioData
  getFrequencyData: () => Uint8Array<ArrayBuffer>
  audioRef:        React.RefObject<HTMLAudioElement | null>
}

const MusicCtx = createContext<MusicCtxValue | null>(null)

export function useMusicContext() {
  const ctx = useContext(MusicCtx)
  if (!ctx) throw new Error('useMusicContext must be used inside MusicProvider')
  return ctx
}

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying,    setIsPlaying]    = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)

  const audioRef = useRef<HTMLAudioElement>(null)
  const { getAudioData, getFrequencyData } = useAudioAnalyzer(audioRef)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const wasPlaying = !audio.paused
    audio.src = TRACKS[currentTrack].src
    audio.load()
    if (wasPlaying) audio.play().catch(() => {})
  }, [currentTrack])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onEnded = () => setCurrentTrack(i => (i + 1) % TRACKS.length)
    audio.addEventListener('ended', onEnded)
    return () => audio.removeEventListener('ended', onEnded)
  }, [])

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {})
    } else {
      audio.pause()
      setIsPlaying(false)
    }
  }, [])

  const prevTrack = useCallback(() =>
    setCurrentTrack(i => (i - 1 + TRACKS.length) % TRACKS.length), [])

  const nextTrack = useCallback(() =>
    setCurrentTrack(i => (i + 1) % TRACKS.length), [])

  return (
    <MusicCtx.Provider value={{
      isPlaying, currentTrack, toggle, prevTrack, nextTrack,
      getAudioData, getFrequencyData, audioRef,
    }}>
      <audio ref={audioRef} src={TRACKS[0].src} preload="metadata" />
      {children}
    </MusicCtx.Provider>
  )
}
