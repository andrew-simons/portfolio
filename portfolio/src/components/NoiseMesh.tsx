import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMusicContext } from '../context/MusicContext'

// ── Shaders ────────────────────────────────────────────────────────────────

const VERT = /* glsl */ `
uniform float uTime;
uniform vec2  uMouse;
uniform float uStrength;
uniform float uBass;

varying float vHeight;
varying vec2  vUv;

vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1  = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy  -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                          + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m * m * m * m;
  vec3 x  = 2.0 * fract(p * C.www) - 1.0;
  vec3 h  = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vUv = uv;
  vec3 pos = position;

  float n1 = snoise(pos.xy * 0.35 + uTime * 0.10);
  float n2 = snoise(pos.xy * 0.90 + uTime * 0.06 + vec2(4.7, 2.3));
  float n3 = snoise(pos.xy * 2.10 + uTime * 0.14 + vec2(1.3, 8.1));
  float noise = n1 * 0.55 + n2 * 0.30 + n3 * 0.15;

  // Bass swells the amplitude, peaks rise higher on loud hits
  float amp = 0.55 + uBass * 0.55;

  vec2  mPos   = uMouse * 9.0;
  float dist   = distance(pos.xy, mPos);
  float ripple = sin(dist * 2.0 - uTime * 5.0) * exp(-dist * 0.45) * uStrength;

  pos.z   = noise * amp + ripple * (0.65 + uBass * 0.4);
  vHeight = pos.z;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`

const FRAG = /* glsl */ `
uniform float uBass;

varying float vHeight;
varying vec2  vUv;

void main() {
  float t = clamp((vHeight + 0.55) / 1.10, 0.0, 1.0);

  vec3 gold  = vec3(0.788, 0.659, 0.298);
  vec3 mauve = vec3(0.486, 0.416, 0.612);
  vec3 color = mix(mauve * 0.40, gold * 0.65, t);

  // Bass brightens the peaks slightly
  float alpha = smoothstep(-0.10, 0.42, vHeight) * (0.11 + uBass * 0.07);

  float ex = smoothstep(0.0, 0.10, vUv.x) * smoothstep(1.0, 0.90, vUv.x);
  float ey = smoothstep(0.0, 0.10, vUv.y) * smoothstep(1.0, 0.90, vUv.y);
  alpha *= ex * ey;

  gl_FragColor = vec4(color, alpha);
}
`

// ── Inner R3F scene ─────────────────────────────────────────────────────────

function WavePlane() {
  const { getAudioData } = useMusicContext()
  const mouse    = useRef(new THREE.Vector2(0, 0))
  const strength = useRef(0)

  const uniforms = useMemo(() => ({
    uTime:     { value: 0 },
    uMouse:    { value: new THREE.Vector2(0, 0) },
    uStrength: { value: 0 },
    uBass:     { value: 0 },
  }), [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.set(
         (e.clientX / window.innerWidth)  * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1,
      )
      strength.current = 1
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame(({ clock }) => {
    const { bass = 0 } = getAudioData()
    strength.current *= 0.965
    uniforms.uTime.value     = clock.getElapsedTime()
    uniforms.uMouse.value.copy(mouse.current)
    uniforms.uStrength.value = strength.current
    // Smooth follower so bass feels responsive but not jittery
    uniforms.uBass.value += (bass - uniforms.uBass.value) * 0.12
  })

  return (
    <mesh>
      <planeGeometry args={[20, 20, 80, 80]} />
      <shaderMaterial
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  )
}

// ── Export ──────────────────────────────────────────────────────────────────

export function NoiseMesh() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: false }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
      }}
    >
      <WavePlane />
    </Canvas>
  )
}
