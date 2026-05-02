import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { profile } from '../../data/profile'

export default function Experience() {
  const rootRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(rootRef.current.querySelectorAll('[data-reveal]'), {
        x: -24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={rootRef}
      className="grid-experience"
      style={{
        padding: '32px 28px',
        borderBottom: '0.5px solid rgba(255,255,255,0.08)',
        display: 'grid',
        gridTemplateColumns: '60px 1fr 60px 1fr',
        gap: 20,
        alignItems: 'center',
      }}
    >
      <div data-reveal className="label-mono">03 /</div>
      <div data-reveal>
        <div className="label-mono" style={{ marginBottom: 4 }}>EXPERIENCE</div>
        <div style={{ fontSize: 15, fontWeight: 500 }}>{profile.experience.role}</div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>
          {profile.experience.company} · {profile.experience.period}
        </div>
      </div>
      <div data-reveal className="label-mono">04 /</div>
      <div data-reveal>
        <div className="label-mono" style={{ marginBottom: 4 }}>PUBLICATION</div>
        <div style={{ fontSize: 15, fontWeight: 500 }}>Crime Analysis using ML</div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>
          {profile.publication.presented} · AIP Proceedings
        </div>
      </div>
    </section>
  )
}
