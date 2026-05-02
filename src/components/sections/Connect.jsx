import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import emailjs from '@emailjs/browser'
import { Download, Mail, Linkedin, Send } from 'lucide-react'
import { profile } from '../../data/profile'

export default function Connect() {
  const rootRef = useRef(null)
  const formRef = useRef(null)
  const headingRef = useRef(null)

  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [errMsg, setErrMsg] = useState('')

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
      gsap.from(rootRef.current.querySelectorAll('[data-cta]'), {
        y: 24,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })

      // Glitch effect on heading
      const h = headingRef.current
      if (h) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: h,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        })
        tl.to(h, {
          x: -2,
          duration: 0.06,
          repeat: 5,
          yoyo: true,
          ease: 'none',
          delay: 0.3,
        }).set(h, { x: 0 })
      }
    }, rootRef)
    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    setErrMsg('')
    try {
      await emailjs.sendForm(
        profile.emailjs.serviceId,
        profile.emailjs.templateId,
        formRef.current,
        { publicKey: profile.emailjs.publicKey }
      )
      setStatus('sent')
      formRef.current.reset()
    } catch (err) {
      setStatus('error')
      setErrMsg(err?.text || err?.message || 'Failed to send')
    }
  }

  return (
    <section
      id="connect"
      ref={rootRef}
      style={{
        padding: '64px 28px',
        background: 'linear-gradient(180deg, transparent, rgba(255,0,60,0.04))',
      }}
    >
      <div className="section-tag" ref={headingRef}>
        <span className="label-mono">[ 07 / CONNECT ]</span>
      </div>
      <h2
        className="font-display"
        style={{
          fontSize: 'clamp(32px, 5vw, 48px)',
          fontWeight: 600,
          letterSpacing: '-0.02em',
          margin: '0 0 8px',
          lineHeight: 1.1,
        }}
      >
        Let's connect<span style={{ color: '#ff003c' }}>.</span>
      </h2>
      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', margin: '0 0 32px' }}>
        Three fastest ways to reach me below.
      </p>

      <div
        className="grid-connect"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 10,
          marginBottom: 32,
        }}
      >
        <a
          data-cta
          data-magnetic
          href={profile.resumePath}
          download
          className="card-flat"
          style={{ textDecoration: 'none', color: '#fff' }}
        >
          <div className="font-mono" style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', marginBottom: 8 }}>
            01 — RESUME
          </div>
          <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>Download PDF</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginBottom: 14 }}>
            Updated May 2026 · 1 page
          </div>
          <div className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <Download size={13} /> GET CV
          </div>
        </a>

        <a
          data-cta
          data-magnetic
          href={profile.socials.email}
          className="card-flat"
          style={{ textDecoration: 'none', color: '#fff' }}
        >
          <div className="font-mono" style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', marginBottom: 8 }}>
            02 — EMAIL
          </div>
          <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>Direct line</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginBottom: 14, wordBreak: 'break-all' }}>
            {profile.email}
          </div>
          <div
            style={{
              fontSize: 11,
              padding: '7px 12px',
              border: '0.5px solid #ff003c',
              color: '#ff003c',
              borderRadius: 2,
              textAlign: 'center',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 500,
              letterSpacing: '0.05em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <Mail size={13} /> SEND EMAIL ↗
          </div>
        </a>

        <a
          data-cta
          data-magnetic
          href={profile.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="card-flat"
          style={{ textDecoration: 'none', color: '#fff' }}
        >
          <div className="font-mono" style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', marginBottom: 8 }}>
            03 — LINKEDIN
          </div>
          <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>Connect</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginBottom: 14 }}>
            {profile.socials.linkedinHandle}
          </div>
          <div className="btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <Linkedin size={13} /> CONNECT ↗
          </div>
        </a>
      </div>

      {/* Inline contact form (uses EmailJS) */}
      <div
        data-cta
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '0.5px solid rgba(255,255,255,0.12)',
          borderRadius: 4,
          padding: 24,
        }}
      >
        <div
          className="font-mono"
          style={{
            fontSize: 10,
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.15em',
            marginBottom: 16,
          }}
        >
          OR — SEND A QUICK NOTE
        </div>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="grid-form"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 12,
          }}
        >
          <input
            name="from_name"
            required
            placeholder="Your name"
            data-magnetic
            style={inputStyle}
          />
          <input
            name="from_email"
            type="email"
            required
            placeholder="your@email.com"
            data-magnetic
            style={inputStyle}
          />
          <textarea
            name="message"
            required
            placeholder="What's on your mind?"
            rows={4}
            data-magnetic
            style={{ ...inputStyle, gridColumn: '1 / -1', resize: 'vertical', minHeight: 100 }}
          />
          <div
            style={{
              gridColumn: '1 / -1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              flexWrap: 'wrap',
            }}
          >
            <div className="font-mono" style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>
              {status === 'idle' && '✱ Encrypted via EmailJS'}
              {status === 'sending' && <span style={{ color: '#ff6b85' }}>● TRANSMITTING…</span>}
              {status === 'sent' && <span style={{ color: '#67e8f9' }}>✓ MESSAGE RECEIVED — I'LL REPLY SOON</span>}
              {status === 'error' && <span style={{ color: '#ff003c' }}>✕ {errMsg || 'TRANSMISSION FAILED'}</span>}
            </div>
            <button
              type="submit"
              data-magnetic
              disabled={status === 'sending'}
              className="btn-accent"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                opacity: status === 'sending' ? 0.6 : 1,
                cursor: 'inherit',
              }}
            >
              <Send size={12} /> {status === 'sending' ? 'SENDING' : 'SEND MESSAGE'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

const inputStyle = {
  background: 'transparent',
  border: 'none',
  borderBottom: '0.5px solid rgba(255,255,255,0.2)',
  padding: '12px 0',
  color: '#fff',
  fontFamily: 'Inter, sans-serif',
  fontSize: 13,
  outline: 'none',
  transition: 'border-color 0.2s',
}
