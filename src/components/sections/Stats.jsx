import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { profile } from '../../data/profile'

gsap.registerPlugin(ScrollTrigger)

export default function Stats() {
  const rootRef = useRef(null)

  useEffect(() => {
    if (!rootRef.current) return
    const numEls = rootRef.current.querySelectorAll('[data-counter]')

    const ctx = gsap.context(() => {
      numEls.forEach((el) => {
        const target = parseFloat(el.dataset.counter)
        const decimals = parseInt(el.dataset.decimals || '0', 10)
        const obj = { v: 0 }
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          onUpdate: () => {
            el.textContent = obj.v.toFixed(decimals)
          },
        })
      })

      gsap.from(rootRef.current.querySelectorAll('[data-stat-card]'), {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={rootRef}
      style={{
        padding: '32px 28px',
        borderTop: '0.5px solid rgba(255,255,255,0.08)',
        borderBottom: '0.5px solid rgba(255,255,255,0.08)',
      }}
    >
      <div className="section-tag">
        <span className="label-mono">[ 02 / BY THE NUMBERS ]</span>
      </div>

      <div
        className="grid-stats"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 1,
          background: 'rgba(255,255,255,0.08)',
          border: '0.5px solid rgba(255,255,255,0.08)',
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        {profile.stats.map((s, i) => (
          <div
            key={i}
            data-stat-card
            style={{ background: '#000', padding: '20px 18px' }}
          >
            <div
              className="font-display"
              style={{
                fontSize: 38,
                fontWeight: 600,
                letterSpacing: '-0.03em',
                lineHeight: 1,
              }}
            >
              <span data-counter={s.value} data-decimals={s.decimals || 0}>
                0
              </span>
              {s.suffix && (
                <span style={{ color: s.suffix === '+' ? '#ff003c' : 'rgba(255,255,255,0.45)', fontSize: s.suffix === '+' ? 38 : 16, fontWeight: s.suffix === '+' ? 600 : 400 }}>
                  {s.suffix}
                </span>
              )}
            </div>
            <div
              className="font-mono"
              style={{
                fontSize: 10,
                color: 'rgba(255,255,255,0.5)',
                letterSpacing: '0.12em',
                marginTop: 10,
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 14,
          padding: '12px 16px',
          background: 'rgba(255,0,60,0.04)',
          border: '0.5px solid rgba(255,0,60,0.2)',
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          fontSize: 11,
          flexWrap: 'wrap',
        }}
        className="font-mono"
      >
        <span style={{ color: '#ff003c', animation: 'blink 1.4s ease-in-out infinite' }}>▌</span>
        <span style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}>
          CURRENTLY BUILDING
        </span>
        <span style={{ color: '#fff' }}>{profile.currentlyBuilding.name}</span>
        <span style={{ color: 'rgba(255,255,255,0.4)' }}>
          — {profile.currentlyBuilding.detail}
        </span>
        <span style={{ marginLeft: 'auto', color: '#ff003c', fontSize: 10 }}>
          [ {profile.currentlyBuilding.statusLabel} ]
        </span>
      </div>

      <style>{`
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
      `}</style>
    </section>
  )
}
