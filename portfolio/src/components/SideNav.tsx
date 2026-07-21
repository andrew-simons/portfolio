import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const SECTIONS = [
  { id: 'intro',   label: 'Intro'       },
  { id: 'stack',   label: 'Tech Stack'  },
  { id: 'work',    label: 'Projects'    },
  { id: 'about',   label: 'About Me'    },
  { id: 'contact', label: 'Contact Me'  },
]

export function SideNav() {
  const [active, setActive] = useState('intro')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { threshold: 0.3 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  return (
    <motion.nav
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 1.2, ease: 'easeOut' }}
      className="fixed left-8 top-1/2 z-40 flex -translate-y-1/2 flex-col items-center gap-0"
      aria-label="Page sections"
    >
      {SECTIONS.map(({ id, label }, i) => {
        const isActive = active === id
        return (
          <div key={id} className="flex flex-col items-center">
            {/* Connector line above (skip for first) */}
            {i > 0 && (
              <div
                className="w-px transition-colors duration-500"
                style={{
                  height: 28,
                  background: isActive || active === SECTIONS[i - 1]?.id
                    ? 'rgba(201,168,76,0.35)'
                    : 'rgba(155,147,144,0.15)',
                }}
              />
            )}

            {/* Dot + label row */}
            <a
              href={`#${id}`}
              className="group flex items-center gap-3"
              aria-current={isActive ? 'true' : undefined}
            >
              {/* Dot */}
              <div
                className="relative flex items-center justify-center transition-all duration-400"
                style={{ width: 10, height: 10 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidenav-ring"
                    className="absolute inset-0 rounded-full"
                    style={{ border: '1px solid rgba(201,168,76,0.5)', scale: 1.8 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <div
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: isActive ? 6 : 4,
                    height: isActive ? 6 : 4,
                    background: isActive
                      ? '#C9A84C'
                      : 'rgba(155,147,144,0.4)',
                  }}
                />
              </div>

              {/* Label */}
              <span
                className="font-body text-[10px] uppercase tracking-[0.2em] transition-all duration-300 whitespace-nowrap"
                style={{
                  color: isActive ? 'rgba(201,168,76,0.9)' : 'rgba(155,147,144,0.4)',
                  fontWeight: isActive ? 500 : 400,
                }}
              >
                {label}
              </span>
            </a>
          </div>
        )
      })}
    </motion.nav>
  )
}
