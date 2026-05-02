import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../../data/projects'

export default function Projects() {
  const rootRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = rootRef.current.querySelectorAll('[data-project-row]')
      rows.forEach((row, i) => {
        gsap.from(row, {
          x: 40,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })

        // Red scanline behind each row on enter
        const scan = row.querySelector('[data-scanline]')
        if (scan) {
          gsap.fromTo(
            scan,
            { scaleX: 0, transformOrigin: 'left center' },
            {
              scaleX: 1,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          )
        }
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="work"
      ref={rootRef}
      style={{
        padding: '56px 28px',
        borderBottom: '0.5px solid rgba(255,255,255,0.08)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 18,
        }}
      >
        <span className="label-mono">[ 05 / SELECTED WORK ]</span>
        <span className="label-mono">04 / 12 →</span>
      </div>
      <h2
        className="font-display"
        style={{
          fontSize: 'clamp(28px, 4vw, 40px)',
          fontWeight: 600,
          letterSpacing: '-0.02em',
          margin: '0 0 28px',
        }}
      >
        Things I've shipped<span style={{ color: '#ff003c' }}>.</span>
      </h2>

      <div style={{ borderTop: '0.5px solid rgba(255,255,255,0.1)' }}>
        {projects.map((p) => (
          <a
            key={p.id}
            href={p.github}
            target="_blank"
            rel="noopener noreferrer"
            data-project-row
            data-magnetic
            style={{
              position: 'relative',
              display: 'grid',
              gridTemplateColumns: '46px 1fr 220px 80px',
              gap: 16,
              padding: '20px 0',
              borderBottom: '0.5px solid rgba(255,255,255,0.08)',
              alignItems: 'center',
              textDecoration: 'none',
              color: '#fff',
              transition: 'padding-left 0.25s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.paddingLeft = '12px')}
            onMouseLeave={(e) => (e.currentTarget.style.paddingLeft = '0px')}
          >
            <div
              data-scanline
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                height: 1,
                background: 'linear-gradient(90deg, #ff003c, transparent)',
                opacity: 0.7,
              }}
            />
            <div className="font-mono" style={{ fontSize: 11, color: '#ff003c' }}>{p.id}</div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 17, fontWeight: 500 }}>{p.title}</span>
                {p.status && (
                  <span
                    className="font-mono"
                    style={{
                      fontSize: 9,
                      padding: '2px 7px',
                      background: 'rgba(255,0,60,0.12)',
                      color: '#ff6b85',
                      borderRadius: 3,
                      letterSpacing: '0.1em',
                    }}
                  >
                    {p.status}
                  </span>
                )}
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>
                {p.short}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {p.tags.map((t) => (
                <span key={t} className="tag-mono">
                  {t}
                </span>
              ))}
            </div>
            <div
              className="font-mono"
              style={{
                fontSize: 10,
                color: 'rgba(255,255,255,0.6)',
                textAlign: 'right',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                justifyContent: 'flex-end',
                letterSpacing: '0.1em',
              }}
            >
              VIEW <ArrowUpRight size={12} />
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
