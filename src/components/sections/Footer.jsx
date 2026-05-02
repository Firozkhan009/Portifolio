import { Github, Linkedin, Mail } from 'lucide-react'
import { profile } from '../../data/profile'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer
      style={{
        padding: '24px 28px',
        borderTop: '0.5px solid rgba(255,255,255,0.08)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 16,
      }}
    >
      <span
        className="font-mono"
        style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}
      >
        © {year} · {profile.name.toUpperCase()}
      </span>

      <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
        <a
          href={profile.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          data-magnetic
          aria-label="GitHub"
          style={{ color: 'rgba(255,255,255,0.6)', display: 'inline-flex' }}
        >
          <Github size={16} />
        </a>
        <a
          href={profile.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          data-magnetic
          aria-label="LinkedIn"
          style={{ color: 'rgba(255,255,255,0.6)', display: 'inline-flex' }}
        >
          <Linkedin size={16} />
        </a>
        <a
          href={profile.socials.email}
          data-magnetic
          aria-label="Email"
          style={{ color: 'rgba(255,255,255,0.6)', display: 'inline-flex' }}
        >
          <Mail size={16} />
        </a>
      </div>

      <span
        className="font-mono"
        style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}
      >
        BUILT WITH REACT · THREE.JS · GSAP
      </span>
    </footer>
  )
}
