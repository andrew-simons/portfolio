import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame }           from '@react-three/fiber'
import * as THREE                     from 'three'
import { useMusicContext }            from '../context/MusicContext'

// ── Config ────────────────────────────────────────────────────────────────
const N      = 1600   // particle count
const SPREAD = 9      // world-unit half-extent (camera is at z=8, fov=60 → ~9 units visible)
const SPEED  = 0.30   // base drift speed

// ── Shaders ───────────────────────────────────────────────────────────────
const VERT = /* glsl */ `
uniform float uBass;

varying float vOpacity;
varying vec3  vColor;

const vec3 gold  = vec3(0.788, 0.659, 0.298);
const vec3 mauve = vec3(0.486, 0.416, 0.612);
const float S    = ${SPREAD}.0;

void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;

  // Fade toward edges so fog blends naturally with the background
  float rim = length(position.xy) / S;
  gl_PointSize = (520.0 + uBass * 280.0)
                 * clamp(1.3 - rim * 0.8, 0.05, 1.0)
                 / -mv.z;

  float t  = clamp((position.y + S) / (S * 2.0), 0.0, 1.0);
  vColor   = mix(mauve * 0.65, gold * 0.75, t);
  vOpacity = clamp(1.0 - rim * rim * 0.7, 0.0, 1.0) * 0.026;
}
`

const FRAG = /* glsl */ `
varying float vOpacity;
varying vec3  vColor;

void main() {
  float d = length(gl_PointCoord - 0.5);
  // Smooth gaussian-like falloff so each particle is a soft blob, not a disc
  float a = exp(-d * d * 12.0) * vOpacity;
  gl_FragColor = vec4(vColor, a);
}
`

// ── Inner R3F scene ──────────────────────────────────────────────────────
interface FogSceneProps {
  getAudioData?: () => { bass: number; mid: number; treble: number }
}

function FogScene({ getAudioData }: FogSceneProps) {
  // Lazy-initialise positions on first render so frame 0 is correct
  const posArr = useRef<Float32Array | null>(null)
  if (posArr.current === null) {
    posArr.current = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) {
      posArr.current[i * 3]     = (Math.random() - 0.5) * SPREAD * 2
      posArr.current[i * 3 + 1] = (Math.random() - 0.5) * SPREAD * 2
      posArr.current[i * 3 + 2] = (Math.random() - 0.5) * 1.5
    }
  }

  const attrRef = useRef<THREE.BufferAttribute>(null)
  const mouse   = useRef(new THREE.Vector2(0, 0))

  const uniforms = useMemo(() => ({ uBass: { value: 0 } }), [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => mouse.current.set(
       (e.clientX / window.innerWidth)  * 2 - 1,
      -(e.clientY / window.innerHeight) * 2 + 1,
    )
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame(({ clock }, delta) => {
    const { bass = 0 } = getAudioData?.() ?? {}

    // Smooth bass follower for the shader uniform
    uniforms.uBass.value += (bass - uniforms.uBass.value) * 0.12

    const t   = clock.getElapsedTime()
    const dt  = Math.min(delta, 0.05)               // cap so tab-blur doesn't explode
    const spd = (SPEED + bass * 1.1) * dt

    const p  = posArr.current!
    const mx = mouse.current.x * SPREAD
    const my = mouse.current.y * SPREAD * 0.6

    for (let i = 0; i < N; i++) {
      const ix = i * 3
      const x  = p[ix], y = p[ix + 1]

      // Three overlapping sinusoidal waves → curl-like divergence-free flow
      const angle =
        Math.sin(x * 0.27 + t * 0.13) * 2.2 +
        Math.cos(y * 0.34 + t * 0.10) * 1.8 +
        Math.sin((x * 0.12 + y * 0.18) + t * 0.07) * 1.4

      let vx = Math.cos(angle) * spd
      let vy = Math.sin(angle) * spd

      // Mouse repulsion, particles part like fog from a warm hand
      const dx = x - mx
      const dy = y - my
      const d2 = dx * dx + dy * dy
      if (d2 < 12 && d2 > 0.001) {
        const inv  = 1 / Math.sqrt(d2)
        const pull = ((3.464 - Math.sqrt(d2)) / 3.464) * 0.06   // 3.464 = sqrt(12)
        vx += dx * inv * pull
        vy += dy * inv * pull
      }

      p[ix]     += vx
      p[ix + 1] += vy
      // Gentle Z drift gives very subtle depth variation
      p[ix + 2] += Math.sin(t * 0.08 + i * 0.019) * 0.002

      // Wrap at boundaries so particles recirculate
      if (p[ix]     >  SPREAD) p[ix]     = -SPREAD
      if (p[ix]     < -SPREAD) p[ix]     =  SPREAD
      if (p[ix + 1] >  SPREAD) p[ix + 1] = -SPREAD
      if (p[ix + 1] < -SPREAD) p[ix + 1] =  SPREAD
    }

    if (attrRef.current) attrRef.current.needsUpdate = true
  })

  return (
    <points>
      <bufferGeometry>
        {/* @ts-expect-error, R3F bufferAttribute ref typing is loose in v9 */}
        <bufferAttribute
          ref={attrRef}
          attach="attributes-position"
          args={[posArr.current, 3]}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// ── Export ────────────────────────────────────────────────────────────────
export function CurlFog() {
  const { getAudioData } = useMusicContext()

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: false }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
      }}
    >
      <FogScene getAudioData={getAudioData} />
    </Canvas>
  )
}
