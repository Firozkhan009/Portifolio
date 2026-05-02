import { useState } from 'react'
import { Analytics } from '@vercel/analytics/react'
import SmoothScroll from './components/layout/SmoothScroll'
import Cursor from './components/ui/Cursor'
import Loader from './components/ui/Loader'
import Navbar from './components/ui/Navbar'
import Hero from './components/sections/Hero'
import Stats from './components/sections/Stats'
import Experience from './components/sections/Experience'
import Projects from './components/sections/Projects'
import Stack from './components/sections/Stack'
import Connect from './components/sections/Connect'
import Footer from './components/sections/Footer'
import { ParticleBackground } from './components/three/Scene'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <SmoothScroll>
      <Cursor />
      {!loaded && <Loader onDone={() => setLoaded(true)} />}

      <ParticleBackground />

      <main
        style={{
          position: 'relative',
          zIndex: 1,
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}
      >
        <Navbar />
        <Hero />
        <Stats />
        <Experience />
        <Projects />
        <Stack />
        <Connect />
        <Footer />
      </main>

      <Analytics />
    </SmoothScroll>
  )
}
