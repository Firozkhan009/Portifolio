import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { skills } from '../../data/skills'

export default function Stack() {
  const rootRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cats = rootRef.current.querySelectorAll('[data-cat]')
      gsap.from(cats, {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      const items = rootRef.current.querySelectorAll('[data-item]')
      gsap.from(items, {
        opacity: 0,
        x: -8,
        duration: 0.4,
        stagger: 0.02,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="stack"
      ref={rootRef}
      style={{
        padding: '56px 28px',
        borderBottom: '0.5px solid rgba(255,255,255,0.08)',
      }}
    >
      <div className="section-tag">
        <span className="label-mono">[ 06 / TECH STACK ]</span>
      </div>

      <div
        className="grid-stack"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 28,
        }}
      >
        {skills.map((cat) => (
          <div key={cat.label} data-cat>
            <div
              className="font-mono"
              style={{
                fontSize: 10,
                color: '#ff003c',
                letterSpacing: '0.1em',
                marginBottom: 10,
              }}
            >
              — {cat.label}
            </div>
            <div
              style={{
                fontSize: 14,
                color: 'rgba(255,255,255,0.85)',
                lineHeight: 2,
              }}
            >
              {cat.items.map((item, i) => (
                <span key={item} data-item style={{ display: 'inline-block' }}>
                  {item}
                  {i < cat.items.length - 1 && (
                    <span style={{ color: 'rgba(255,255,255,0.3)', margin: '0 8px' }}>·</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
