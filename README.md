# Firoz Khan Patan — Portfolio

Personal portfolio website built with **Vite + React**, featuring a 3D Arc Reactor centerpiece (Three.js / R3F), GSAP scroll animations, smooth scrolling via Lenis, a custom HUD cursor, and a working contact form (EmailJS).

Live at: _coming soon_

## Stack

- **Vite + React 18** (JavaScript)
- **GSAP 3** + ScrollTrigger
- **Three.js** + `@react-three/fiber` + `@react-three/drei`
- **Lenis** smooth scroll
- **Tailwind CSS**
- **EmailJS** for the contact form
- **Lucide React** icons

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## Deploy

Includes a `vercel.json` — push to GitHub, then import the repo on [Vercel](https://vercel.com/new).

## Project structure

```
src/
├── components/
│   ├── layout/        # SmoothScroll wrapper
│   ├── three/         # 3D Scene, ArcReactor, Particles
│   ├── ui/            # Cursor, Loader, Navbar
│   └── sections/      # Hero, Stats, Experience, Projects, Stack, Connect, Footer
├── data/              # profile, projects, skills (edit content here)
├── hooks/             # useGsapReveal, splitText
├── styles/            # globals.css (design tokens)
├── App.jsx
└── main.jsx
public/
├── ResumeH.pdf        # downloadable CV
└── favicon.svg
```

To update content, edit the files in `src/data/`.
