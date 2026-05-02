import { useEffect, useRef, useState } from 'react'

// Mini Arc Reactor cursor — replaces default browser arrow.
// - Outer ring (static)
// - Inner spinning hexagon
// - Pulsing red core
// - Scales / morphs on interactive elements
export default function Cursor() {
  const cursorRef = useRef(null)
  const targetRef = useRef({ x: -100, y: -100 })
  const currentRef = useRef({ x: -100, y: -100 })
  const rafRef = useRef(0)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const onMove = (e) => {
      targetRef.current.x = e.clientX
      targetRef.current.y = e.clientY
    }
    const onOver = (e) => {
      const t = e.target
      if (
        t.closest('a, button, [data-magnetic], input, textarea, [role="button"]')
      ) {
        setHovered(true)
      } else {
        setHovered(false)
      }
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)

    const tick = () => {
      // Lerp toward target
      const dx = targetRef.current.x - currentRef.current.x
      const dy = targetRef.current.y - currentRef.current.y
      currentRef.current.x += dx * 0.18
      currentRef.current.y += dy * 0.18
      const el = cursorRef.current
      if (el) {
        el.style.transform = `translate3d(${currentRef.current.x}px, ${currentRef.current.y}px, 0) translate(-50%, -50%)`
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      id="cursor-root"
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: hovered ? 64 : 36,
        height: hovered ? 64 : 36,
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'difference',
        transition: 'width 0.25s cubic-bezier(0.22, 1, 0.36, 1), height 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
        willChange: 'transform',
      }}
      aria-hidden="true"
    >
      <svg width="100%" height="100%" viewBox="-22 -22 44 44" style={{ overflow: 'visible' }}>
        {/* Outer ring */}
        <circle r="14" fill="none" stroke="#ff003c" strokeWidth="0.8" opacity="0.8" />

        {/* Spinning hexagon */}
        <g style={{ animation: 'spin 3s linear infinite', transformOrigin: 'center' }}>
          <polygon
            points="0,-10 8.6,-5 8.6,5 0,10 -8.6,5 -8.6,-5"
            fill="none"
            stroke="#ff003c"
            strokeWidth="1"
          />
        </g>

        {/* Pulsing core */}
        <circle r="4" fill="#ff003c" style={{ animation: 'pulseCore 1.6s ease-in-out infinite', transformOrigin: 'center' }} />
        <circle r="1.6" fill="#fff" />

        {/* Hover-only target brackets */}
        {hovered && (
          <g>
            <path d="M -18 -12 L -22 -12 L -22 -8" fill="none" stroke="#ff003c" strokeWidth="1.2" />
            <path d="M 18 -12 L 22 -12 L 22 -8" fill="none" stroke="#ff003c" strokeWidth="1.2" />
            <path d="M -18 12 L -22 12 L -22 8" fill="none" stroke="#ff003c" strokeWidth="1.2" />
            <path d="M 18 12 L 22 12 L 22 8" fill="none" stroke="#ff003c" strokeWidth="1.2" />
          </g>
        )}
      </svg>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulseCore {
          0%, 100% { opacity: 0.85; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }
      `}</style>
    </div>
  )
}
