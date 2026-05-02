import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const BOOT_LINES = [
  '> INITIALIZING SYSTEMS',
  '> LOADING REACTOR CORE',
  '> CALIBRATING HUD',
  '> SYNCING TELEMETRY',
  '> READY',
]

export default function Loader({ onDone }) {
  const rootRef = useRef(null)
  const barRef = useRef(null)
  const pctRef = useRef(null)
  const lineRef = useRef(null)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const obj = { p: 0 }
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(rootRef.current, {
          opacity: 0,
          duration: 0.6,
          delay: 0.25,
          ease: 'power2.out',
          onComplete: () => {
            setDone(true)
            onDone && onDone()
          },
        })
      },
    })

    BOOT_LINES.forEach((line, i) => {
      tl.to(obj, {
        p: ((i + 1) / BOOT_LINES.length) * 100,
        duration: 0.5 + Math.random() * 0.3,
        ease: 'power1.inOut',
        onUpdate: () => {
          if (barRef.current) barRef.current.style.width = `${obj.p}%`
          if (pctRef.current) pctRef.current.textContent = `${Math.round(obj.p)}%`
        },
        onStart: () => {
          if (lineRef.current) lineRef.current.textContent = line
        },
      })
    })
  }, [onDone])

  if (done) return null

  return (
    <div
      ref={rootRef}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#000',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 28,
      }}
    >
      <svg width="80" height="80" viewBox="-44 -44 88 88">
        <defs>
          <radialGradient id="loadCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff6b85" />
            <stop offset="60%" stopColor="#ff003c" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ff003c" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle r="40" fill="none" stroke="#ff003c" strokeWidth="0.6" opacity="0.4" strokeDasharray="2 4" style={{ animation: 'spin 8s linear infinite', transformOrigin: 'center' }} />
        <g style={{ animation: 'spin 4s linear infinite reverse', transformOrigin: 'center' }}>
          <polygon points="0,-26 22.5,-13 22.5,13 0,26 -22.5,13 -22.5,-13" fill="none" stroke="#ff003c" strokeWidth="1" />
        </g>
        <circle r="14" fill="url(#loadCore)" style={{ animation: 'pulseLoader 1.4s ease-in-out infinite', transformOrigin: 'center' }} />
        <circle r="6" fill="#fff" />
      </svg>

      <div style={{ width: 280, fontFamily: 'JetBrains Mono, monospace' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#ff003c', letterSpacing: '0.2em', marginBottom: 8 }}>
          <span ref={lineRef}>&gt; INITIALIZING SYSTEMS</span>
          <span ref={pctRef}>0%</span>
        </div>
        <div style={{ height: 1.5, background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
          <div ref={barRef} style={{ height: '100%', width: '0%', background: '#ff003c', transition: 'none' }} />
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulseLoader {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.08); }
        }
      `}</style>
    </div>
  )
}
