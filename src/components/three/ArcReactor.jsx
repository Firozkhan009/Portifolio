import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// 3D Arc Reactor — rotating rings + pulsing core, reacts to mouse + scroll.
export default function ArcReactor({ mouse }) {
  const groupRef = useRef(null)
  const ringOuterRef = useRef(null)
  const ringMidRef = useRef(null)
  const ringInnerRef = useRef(null)
  const coreRef = useRef(null)
  const coreInnerRef = useRef(null)

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime

    // Mouse parallax on the whole group
    if (groupRef.current && mouse) {
      const targetX = mouse.y * 0.3
      const targetY = mouse.x * 0.5
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.05
    }

    // Ring rotations (different speeds, different axes)
    if (ringOuterRef.current) {
      ringOuterRef.current.rotation.z += delta * 0.25
    }
    if (ringMidRef.current) {
      ringMidRef.current.rotation.z -= delta * 0.4
      ringMidRef.current.rotation.x = Math.sin(t * 0.3) * 0.15
    }
    if (ringInnerRef.current) {
      ringInnerRef.current.rotation.z += delta * 0.7
      ringInnerRef.current.rotation.y = Math.sin(t * 0.5) * 0.2
    }

    // Pulsing core
    if (coreRef.current) {
      const pulse = 1 + Math.sin(t * 2.2) * 0.08
      coreRef.current.scale.setScalar(pulse)
      coreRef.current.material.emissiveIntensity = 1.6 + Math.sin(t * 2.2) * 0.4
    }
    if (coreInnerRef.current) {
      coreInnerRef.current.material.opacity = 0.8 + Math.sin(t * 3) * 0.15
    }
  })

  return (
    <group ref={groupRef}>
      {/* Outer ring + studs (rotates as one group) */}
      <group ref={ringOuterRef}>
        <mesh>
          <torusGeometry args={[2.4, 0.012, 8, 64]} />
          <meshBasicMaterial color="#ff003c" transparent opacity={0.55} />
        </mesh>
        {Array.from({ length: 5 }).map((_, i) => {
          const angle = (i / 5) * Math.PI * 2
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * 2.4, Math.sin(angle) * 2.4, 0]}
            >
              <boxGeometry args={[0.12, 0.06, 0.04]} />
              <meshBasicMaterial color="#ff003c" />
            </mesh>
          )
        })}
      </group>

      {/* Middle ring */}
      <mesh ref={ringMidRef}>
        <torusGeometry args={[1.8, 0.018, 10, 50]} />
        <meshBasicMaterial color="#ff6b85" transparent opacity={0.7} />
      </mesh>

      {/* Inner hexagonal frame */}
      <group ref={ringInnerRef}>
        <mesh>
          <torusGeometry args={[1.3, 0.025, 12, 6]} />
          <meshBasicMaterial color="#ff003c" />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 6]}>
          <torusGeometry args={[1.05, 0.015, 12, 6]} />
          <meshBasicMaterial color="#ff6b85" transparent opacity={0.6} />
        </mesh>
      </group>

      {/* Core glow (large soft red) */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial
          color="#ff003c"
          emissive="#ff003c"
          emissiveIntensity={1.8}
          transparent
          opacity={0.55}
          roughness={0.4}
        />
      </mesh>

      {/* Inner bright white core */}
      <mesh ref={coreInnerRef}>
        <sphereGeometry args={[0.32, 24, 24]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
      </mesh>

      {/* Star burst rays */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        return (
          <mesh
            key={`ray-${i}`}
            position={[Math.cos(angle) * 0.55, Math.sin(angle) * 0.55, 0]}
            rotation={[0, 0, angle + Math.PI / 2]}
          >
            <boxGeometry args={[0.04, 0.18, 0.02]} />
            <meshBasicMaterial color="#ff6b85" />
          </mesh>
        )
      })}

      {/* Point light to lift the scene */}
      <pointLight position={[0, 0, 1.5]} intensity={1.5} color="#ff003c" />
    </group>
  )
}
