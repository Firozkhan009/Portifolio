import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { profile } from '../../data/profile'
import { HeroCanvas } from '../three/Scene'
import { splitText } from '../../hooks/useGsapReveal'
import { Download, Mail, Linkedin } from 'lucide-react'

export default function Hero() {
  const rootRef = useRef(null)
  const firstNameRef = useRef(null)
  const lastNameRef = useRef(null)
  const taglineRef = useRef(null)
  const subRef = useRef(null)
  const bioRef = useRef(null)
  const ctasRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const firstSpans = splitText(firstNameRef.current)
      const lastSpans = splitText(lastNameRef.current)

      gsap.set([firstSpans, lastSpans], { y: 80, opacity: 0 })

      const tl = gsap.timeline({ delay: 0.3 })
      tl.to(firstSpans, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.04,
        ease: 'power3.out',
      })
        .to(
          lastSpans,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.04,
            ease: 'power3.out',
          },
          '-=0.4'
        )
        .from(
          taglineRef.current,
          { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' },
          '-=0.5'
        )
        .from(
          subRef.current,
          { opacity: 0, y: 16, duration: 0.5, ease: 'power2.out' },
          '-=0.3'
        )
        .from(
          bioRef.current,
          { opacity: 0, y: 16, duration: 0.5, ease: 'power2.out' },
          '-=0.3'
        )
        .from(
          ctasRef.current?.children || [],
          { opacity: 0, y: 14, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
          '-=0.3'
        )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="top"
      ref={rootRef}
      className="grid-hero"
      style={{
        padding: '64px 28px 72px',
        display: 'grid',
        gridTemplateColumns: '1fr 320px',
        gap: 32,
        alignItems: 'center',
        position: 'relative',
        minHeight: '70vh',
      }}
    >
      <div>
        <div className="section-tag">
          <span className="label-mono">[ 01 / INTRO ]</span>
        </div>
        <h1
          className="font-display"
          style={{
            fontSize: 'clamp(48px, 8vw, 92px)',
            fontWeight: 600,
            lineHeight: 0.95,
            letterSpacing: '-0.04em',
            margin: 0,
          }}
        >
          <span ref={firstNameRef} style={{ display: 'inline-block' }}>{profile.firstName}</span>
          <br />
          <span ref={lastNameRef} style={{ display: 'inline-block' }}>{profile.lastName}</span>
          <span style={{ color: '#ff003c' }}>_</span>
        </h1>

        <p
          ref={taglineRef}
          className="font-mono"
          style={{
            fontSize: 14,
            color: 'rgba(255,255,255,0.7)',
            margin: '20px 0 4px',
            letterSpacing: '0.05em',
          }}
        >
          {profile.shortTitle}
        </p>
        <p
          ref={subRef}
          className="font-mono"
          style={{
            fontSize: 12,
            color: 'rgba(255,255,255,0.5)',
            margin: '0 0 24px',
            letterSpacing: '0.05em',
          }}
        >
          M.S. CS · UNIV. OF GEORGIA · {profile.shortLocation.toUpperCase()}
        </p>

        <p
          ref={bioRef}
          style={{
            fontSize: 14,
            color: 'rgba(255,255,255,0.75)',
            lineHeight: 1.7,
            maxWidth: 460,
            margin: '0 0 32px',
          }}
        >
          {profile.bio}
        </p>

        <div ref={ctasRef} style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <a
            href={profile.resumePath}
            download
            data-magnetic
            className="btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}
          >
            <Download size={14} strokeWidth={2.2} />
            DOWNLOAD CV
          </a>
          <a
            href={profile.socials.email}
            data-magnetic
            className="btn-ghost"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}
          >
            <Mail size={14} strokeWidth={2.2} />
            EMAIL
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            data-magnetic
            className="btn-ghost"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}
          >
            <Linkedin size={14} strokeWidth={2.2} />
            LINKEDIN
          </a>
        </div>
      </div>

      <div style={{ height: 360, position: 'relative' }} className="hide-mobile">
        <HeroCanvas />
      </div>
    </section>
  )
}
