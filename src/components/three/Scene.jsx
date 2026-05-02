import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useRef } from 'react'
import ArcReactor from './ArcReactor'
import Particles from './Particles'

// Two scenes share state: one fills the hero (right side), one is the ambient particle field.
// We render them as separate <Canvas> instances stacked in the layout.

export function HeroCanvas() {
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.3} />
      <Suspense fallback={null}>
        <ArcReactor mouse={mouseRef.current} />
      </Suspense>
    </Canvas>
  )
}

export function ParticleBackground() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <Particles count={600} />
        </Suspense>
      </Canvas>
    </div>
  )
}
