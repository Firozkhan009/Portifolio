import { profile } from '../../data/profile'
import { navLinks } from '../../data/skills'

export default function Navbar() {
  const scrollTo = (e, href) => {
    e.preventDefault()
    if (href.startsWith('#')) {
      const el = document.querySelector(href)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      window.open(href, '_blank', 'noopener')
    }
  }

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderBottom: '0.5px solid rgba(255,255,255,0.08)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 28px',
        }}
      >
        <a
          href="#top"
          data-magnetic
          onClick={(e) => scrollTo(e, '#top')}
          style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: '#fff' }}
        >
          <span style={{ width: 8, height: 8, background: '#ff003c', borderRadius: 1, display: 'block' }} />
          <span className="font-mono" style={{ fontSize: 12, fontWeight: 500, letterSpacing: '0.08em' }}>
            FIROZ.KHAN
          </span>
        </a>

        <nav style={{ display: 'flex', gap: 22 }} className="hide-mobile">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              data-magnetic
              onClick={(e) => scrollTo(e, link.href)}
              className="font-mono"
              style={{
                fontSize: 11,
                color: 'rgba(255,255,255,0.55)',
                letterSpacing: '0.08em',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#connect"
          data-magnetic
          onClick={(e) => scrollTo(e, '#connect')}
          className="btn-accent"
          style={{ textDecoration: 'none', display: 'inline-block' }}
        >
          HIRE ME →
        </a>
      </div>

      {/* OPEN TO WORK banner */}
      <div
        style={{
          padding: '8px 28px',
          background: 'rgba(255,0,60,0.04)',
          borderTop: '0.5px solid rgba(255,0,60,0.15)',
          borderBottom: '0.5px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <span
          className="font-mono"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 11,
            color: '#ff003c',
            letterSpacing: '0.08em',
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#ff003c',
              boxShadow: '0 0 8px #ff003c',
              display: 'inline-block',
            }}
          />
          {profile.status.label}
        </span>
        <span
          className="font-mono hide-mobile"
          style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}
        >
          · {profile.status.detail}
        </span>
      </div>
    </header>
  )
}
