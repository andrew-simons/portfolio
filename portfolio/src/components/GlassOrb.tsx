import { useRef }                                      from 'react'
import { Canvas, useFrame }                          from '@react-three/fiber'
import { MeshTransmissionMaterial, Float, Environment } from '@react-three/drei'
import type { Mesh }                                    from 'three'
import type { AudioData }                               from '../hooks/useAudioAnalyzer'

interface OrbMeshProps {
  getAudioData?: () => AudioData
}

function OrbMesh({ getAudioData }: OrbMeshProps) {
  const meshRef = useRef<Mesh>(null)
  const t       = useRef(0)

  useFrame((_, delta) => {
    t.current += delta
    if (!meshRef.current) return

    const { bass, mid } = getAudioData?.() ?? { bass: 0, mid: 0, treble: 0 }

    meshRef.current.rotation.y += delta * (0.14 + bass * 0.5)
    meshRef.current.rotation.x = Math.sin(t.current * 0.22) * 0.09

    const s = 1 + Math.sin(t.current * 0.45) * 0.025 + bass * 0.09
    meshRef.current.scale.setScalar(s)

    const mat = meshRef.current.material as any
    if (mat) {
      mat.distortion         = 0.25 + Math.sin(t.current * 0.35) * 0.06 + mid * 0.45
      mat.temporalDistortion = 0.08 + bass * 0.14
    }
  })

  return (
    <Float speed={1.4} rotationIntensity={0.18} floatIntensity={0.45}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshTransmissionMaterial
          backside
          samples={10}
          thickness={1.5}
          roughness={0.25}
          transmission={1}
          ior={1.4}
          chromaticAberration={0.02}
          distortion={0.08}
          distortionScale={0.15}
          temporalDistortion={0.03}
          color="#ffffff"
          attenuationColor="#C9A84C"
          attenuationDistance={8.0}
        />
      </mesh>
    </Float>
  )
}

interface GlassOrbProps {
  getAudioData?: () => AudioData
}

export function GlassOrb({ getAudioData }: GlassOrbProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.5], fov: 42 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <Environment preset="apartment" />
      <ambientLight intensity={0.1} />
      <pointLight position={[2, 2, 2]}      intensity={0.8} color="#C9A84C" />
      <pointLight position={[-2, -1, 0.5]}  intensity={0.3} color="#7C6A9C" />
      <OrbMesh getAudioData={getAudioData} />
    </Canvas>
  )
}
