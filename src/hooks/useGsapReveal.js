import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Stagger fade-up for [data-reveal] children inside a ref.
export function useGsapReveal(ref, options = {}) {
  useEffect(() => {
    if (!ref.current) return
    const els = ref.current.querySelectorAll('[data-reveal]')
    if (!els.length) return

    const ctx = gsap.context(() => {
      gsap.from(els, {
        y: 32,
        opacity: 0,
        duration: 0.9,
        stagger: options.stagger ?? 0.06,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: options.start ?? 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    }, ref)

    return () => ctx.revert()
  }, [ref, options.stagger, options.start])
}

// Letter-by-letter split reveal (lightweight, no SplitText plugin needed).
export function splitText(el) {
  if (!el) return []
  const text = el.textContent
  el.textContent = ''
  const spans = []
  text.split('').forEach((ch) => {
    const span = document.createElement('span')
    span.textContent = ch === ' ' ? ' ' : ch
    span.style.display = 'inline-block'
    span.style.willChange = 'transform, opacity'
    el.appendChild(span)
    spans.push(span)
  })
  return spans
}
