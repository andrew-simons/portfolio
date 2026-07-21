import { useEffect, useRef } from 'react'

const BARS = 36

// Gold #C9A84C → Mauve #7C6A9C interpolated across bars
const GOLD  = [0.788, 0.659, 0.298]
const MAUVE = [0.486, 0.416, 0.612]

interface WaveformProps {
  getFrequencyData: () => Uint8Array<ArrayBuffer>
  isPlaying: boolean
  width?: number
  height?: number
}

export function Waveform({ getFrequencyData, isPlaying, width = 310, height = 52 }: WaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = window.devicePixelRatio || 1
    canvas.width  = width  * dpr
    canvas.height = height * dpr
    canvas.style.width  = `${width}px`
    canvas.style.height = `${height}px`

    const ctx = canvas.getContext('2d')!
    ctx.scale(dpr, dpr)

    const smoothed = new Float32Array(BARS)
    let animId: number

    const draw = () => {
      animId = requestAnimationFrame(draw)
      const raw  = getFrequencyData()
      // Only use the lower half of the spectrum (bass + mids), more musically meaningful
      const usable = Math.floor(raw.length * 0.55)
      const step   = Math.max(1, Math.floor(usable / (BARS / 2)))

      ctx.clearRect(0, 0, width, height)

      const barW = width / BARS
      const gap  = 3
      const cx   = height / 2

      for (let i = 0; i < BARS; i++) {
        // Fold: left half mirrors right half so bass sits in the center.
        // Bar 0 / BARS-1 = highest freq used; bar BARS/2 = bass.
        const half     = BARS / 2
        const distEdge = Math.abs(i - (half - 0.5))   // 0 at center gap, half at edges
        const freqBin  = Math.floor((distEdge / half) * (BARS / 2 - 1))

        let sum = 0
        for (let j = 0; j < step; j++) sum += raw[freqBin * step + j] ?? 0
        const val = sum / (step * 255)

        smoothed[i] += (val - smoothed[i]) * 0.18

        const barH = Math.max(2, smoothed[i] * cx * 1.85)

        // Color: gold at center (bass), mauve toward edges (treble)
        const t  = distEdge / half          // 0 = center, 1 = edge
        const r  = Math.round((GOLD[0] * (1 - t) + MAUVE[0] * t) * 255)
        const g  = Math.round((GOLD[1] * (1 - t) + MAUVE[1] * t) * 255)
        const b  = Math.round((GOLD[2] * (1 - t) + MAUVE[2] * t) * 255)
        const a  = 0.55 + smoothed[i] * 0.45

        ctx.fillStyle = `rgba(${r},${g},${b},${a})`

        const x = i * barW + gap / 2
        const w = Math.max(1, barW - gap)

        ctx.beginPath()
        ctx.roundRect(x, cx - barH, w, barH, [2, 2, 0, 0])
        ctx.fill()

        ctx.beginPath()
        ctx.roundRect(x, cx, w, barH, [0, 0, 2, 2])
        ctx.fill()
      }
    }

    animId = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(animId)
  }, [getFrequencyData, width, height])

  return (
    <canvas
      ref={canvasRef}
      style={{
        opacity:    isPlaying ? 1 : 0.25,
        transition: 'opacity 0.6s ease',
        display:    'block',
        margin:     '0 auto',
      }}
    />
  )
}
