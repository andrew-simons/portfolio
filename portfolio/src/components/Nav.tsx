import { motion } from 'framer-motion'

const links = [
  { label: 'Work',    href: '#work'    },
  { label: 'Music',   href: '#music'   },
  { label: 'About',   href: '#about'   },
  { label: 'Contact', href: '#contact' },
]

export function Nav() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
    >
      <span className="font-display text-lg font-light tracking-widest text-cream opacity-90">
        Andrew Simons
      </span>

      <ul className="glass flex items-center gap-8 rounded-full px-7 py-3">
        {links.map(({ label, href }) => (
          <li key={label}>
            <a
              href={href}
              className="font-body text-sm font-medium tracking-wide text-mist transition-colors duration-200 hover:text-cream"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
  )
}
