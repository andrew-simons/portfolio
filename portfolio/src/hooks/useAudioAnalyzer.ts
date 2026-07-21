import { useEffect, useRef, useCallback } from 'react'

export interface AudioData {
  bass:   number  // 0-1
  mid:    number  // 0-1
  treble: number  // 0-1
}

export function useAudioAnalyzer(audioRef: React.RefObject<HTMLAudioElement | null>) {
  const ctxRef      = useRef<AudioContext | null>(null)
  const analyzerRef = useRef<AnalyserNode  | null>(null)
  const bufferRef   = useRef<Uint8Array<ArrayBuffer>>(new Uint8Array(128) as Uint8Array<ArrayBuffer>)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const init = () => {
      if (ctxRef.current) return
      const ctx      = new AudioContext()
      const analyzer = ctx.createAnalyser()
      analyzer.fftSize = 256
      ctx.createMediaElementSource(audio).connect(analyzer)
      analyzer.connect(ctx.destination)
      analyzerRef.current = analyzer
      bufferRef.current   = new Uint8Array(analyzer.frequencyBinCount) as Uint8Array<ArrayBuffer>
      ctxRef.current      = ctx
    }

    audio.addEventListener('play', init, { once: true })
    return () => {
      audio.removeEventListener('play', init)
      ctxRef.current?.close()
      ctxRef.current = null
    }
  }, [audioRef])

  // Returns raw frequency byte data (0–255 per bin). Fills the shared buffer in place.
  const getFrequencyData = useCallback((): Uint8Array<ArrayBuffer> => {
    const analyzer = analyzerRef.current
    if (analyzer) analyzer.getByteFrequencyData(bufferRef.current)
    return bufferRef.current
  }, [])

  // Aggregates raw bins into bass / mid / treble (0–1 each)
  const getAudioData = useCallback((): AudioData => {
    const d = getFrequencyData()
    const n = d.length
    const avg = (lo: number, hi: number) => {
      let s = 0
      for (let i = lo; i < hi; i++) s += d[i]
      return s / ((hi - lo) * 255)
    }
    return {
      bass:   avg(0,                    Math.floor(n * 0.1)),
      mid:    avg(Math.floor(n * 0.1),  Math.floor(n * 0.5)),
      treble: avg(Math.floor(n * 0.5),  n),
    }
  }, [getFrequencyData])

  return { getAudioData, getFrequencyData }
}
