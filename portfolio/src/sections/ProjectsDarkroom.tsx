import { motion } from 'framer-motion'

// Darkroom Photo Development, backup of option 2

function BotswanaVisual() {
  const cols = 10, rows = 5
  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative',
      background: 'linear-gradient(145deg, #061420 0%, #0D0B0E 55%, #180d05 100%)',
      overflow: 'hidden', display: 'grid', placeItems: 'center',
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 4, padding: 16, width: '100%' }}>
        {Array.from({ length: rows * cols }, (_, i) => {
          const col = i % cols, row = Math.floor(i / cols)
          const h = Math.min(1, (col * 0.6 + row * 0.4) / (cols - 1))
          const r = Math.round(18 + h * 210), g = Math.round(110 - h * 65), b = Math.round(165 - h * 145)
          return <div key={i} style={{ borderRadius: '50%', aspectRatio: '1', background: `rgba(${r},${g},${b},${0.28 + h * 0.62})` }} />
        })}
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 40%, rgba(201,168,76,0.06), transparent 65%)', pointerEvents: 'none' }} />
    </div>
  )
}

function BeaverVisual() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#0a0608', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'relative', width: 84, height: 88 }}>
        <div style={{ position: 'absolute', bottom: -6, left: '50%', transform: 'translateX(-50%)', width: 68, height: 20, background: '#5a3218', borderRadius: 5, border: '2px solid #3a1e0e' }} />
        <div style={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', width: 64, height: 48, background: '#7a4a28', borderRadius: '50% 50% 44% 44% / 60% 60% 40% 40%' }} />
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 54, height: 46, background: '#8a5030', borderRadius: '50%' }}>
          <div style={{ position: 'absolute', top: 13, left: 9, width: 9, height: 9, borderRadius: '50%', background: '#1a0d08' }} />
          <div style={{ position: 'absolute', top: 13, right: 9, width: 9, height: 9, borderRadius: '50%', background: '#1a0d08' }} />
          <div style={{ position: 'absolute', top: 15, left: 13, width: 3, height: 3, borderRadius: '50%', background: 'rgba(255,255,255,0.55)' }} />
          <div style={{ position: 'absolute', top: 15, right: 13, width: 3, height: 3, borderRadius: '50%', background: 'rgba(255,255,255,0.55)' }} />
          <div style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', width: 11, height: 7, borderRadius: '50%', background: '#3a1a0a' }} />
          <div style={{ position: 'absolute', bottom: 4, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 2 }}>
            <div style={{ width: 9, height: 10, background: '#f0ede8', borderRadius: '1px 1px 3px 3px' }} />
            <div style={{ width: 9, height: 10, background: '#e8e4de', borderRadius: '1px 1px 3px 3px' }} />
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 65%, rgba(122,74,40,0.1), transparent 60%)', pointerEvents: 'none' }} />
    </div>
  )
}

function MediaLabVisual() {
  const bars = [0.3, 0.65, 0.85, 0.5, 1.0, 0.72, 0.42, 0.88, 0.55, 0.78, 0.35, 0.92, 0.6, 0.48]
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: 'linear-gradient(180deg, #0a0812 0%, #0D0B0E 100%)', overflow: 'hidden', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 3, padding: '12px 18px 12px' }}>
      {bars.map((h, i) => (
        <motion.div key={i} animate={{ scaleY: [1, h * 0.6 + 0.35, 1] }} transition={{ duration: 1.3 + i * 0.14, repeat: Infinity, delay: i * 0.09, ease: 'easeInOut' }}
          style={{ flex: 1, height: `${h * 78}%`, transformOrigin: 'bottom', background: i % 3 === 0 ? 'linear-gradient(to top, rgba(124,106,156,0.85), rgba(124,106,156,0.15))' : 'linear-gradient(to top, rgba(201,168,76,0.75), rgba(201,168,76,0.1))', borderRadius: '2px 2px 0 0' }} />
      ))}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 100%, rgba(124,106,156,0.1), transparent 55%)', pointerEvents: 'none' }} />
    </div>
  )
}

function SloanVisual() {
  const bars = [{ label: 'Grains', value: 0.75, color: '#C9A84C' }, { label: 'Produce', value: 0.92, color: '#6A9C6A' }, { label: 'Protein', value: 0.55, color: '#9C6A6A' }, { label: 'Dairy', value: 0.68, color: '#9B9390' }, { label: 'Other', value: 0.42, color: '#7C6A9C' }]
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#070c07', overflow: 'hidden', display: 'flex', alignItems: 'flex-end', gap: 7, padding: '18px 18px 10px' }}>
      {[0.25, 0.5, 0.75].map(y => <div key={y} style={{ position: 'absolute', left: 18, right: 18, bottom: `calc(${y * 80}% + 10px)`, height: 1, background: 'rgba(155,147,144,0.07)' }} />)}
      {bars.map(({ label, value, color }) => (
        <div key={label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
          <div style={{ width: '100%', height: `${value * 78}%`, background: `linear-gradient(to top, ${color}cc, ${color}44)`, borderRadius: '3px 3px 0 0', border: `1px solid ${color}33` }} />
          <span style={{ fontSize: 7, fontFamily: 'var(--font-code)', color: `${color}70`, letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>{label}</span>
        </div>
      ))}
    </div>
  )
}

function NonprofitVisual() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#070610', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 70, height: 130, background: '#12101e', borderRadius: 14, border: '2px solid rgba(124,106,156,0.22)', overflow: 'hidden', boxShadow: '0 0 28px rgba(124,106,156,0.08)' }}>
        <div style={{ height: 4, background: 'rgba(155,147,144,0.15)', margin: '8px 8px 0' }} />
        <div style={{ padding: '6px 7px', display: 'flex', flexDirection: 'column', gap: 5 }}>
          <div style={{ height: 11, background: 'rgba(124,106,156,0.28)', borderRadius: 3 }} />
          {[0.9, 0.65, 0.8, 0.55, 0.7].map((w, i) => <div key={i} style={{ height: 5, width: `${w * 100}%`, background: i === 0 ? 'rgba(201,168,76,0.3)' : 'rgba(155,147,144,0.12)', borderRadius: 2 }} />)}
          <div style={{ height: 13, marginTop: 3, background: 'rgba(124,106,156,0.22)', borderRadius: 5, border: '1px solid rgba(124,106,156,0.15)' }} />
        </div>
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, rgba(124,106,156,0.07), transparent 60%)', pointerEvents: 'none' }} />
    </div>
  )
}

function VolatilityVisual() {
  const pts = [42, 68, 48, 78, 58, 82, 38, 92, 52, 72, 44, 88, 62, 56, 76, 50, 84, 45]
  const hi = Math.max(...pts), lo = Math.min(...pts)
  const norm = (v: number) => 80 - ((v - lo) / (hi - lo)) * 64
  const pathD = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${(i / (pts.length - 1)) * 200} ${norm(p)}`).join(' ')
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#05090e', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg viewBox="0 0 200 90" preserveAspectRatio="none" style={{ width: '100%', height: '100%', padding: '10px 14px' }}>
        <defs><linearGradient id="vol-grad2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#C9A84C" stopOpacity="0.45" /><stop offset="100%" stopColor="#C9A84C" stopOpacity="0" /></linearGradient></defs>
        {[25, 50, 75].map(y => <line key={y} x1="0" y1={y} x2="200" y2={y} stroke="rgba(155,147,144,0.07)" strokeWidth="0.5" />)}
        <path d={`${pathD} L 200 90 L 0 90 Z`} fill="url(#vol-grad2)" />
        <path d={pathD} stroke="#C9A84C" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 25%, rgba(201,168,76,0.05), transparent 50%)', pointerEvents: 'none' }} />
    </div>
  )
}

function PortfolioVisual() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#0D0B0E', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 230, height: 138, background: '#0a0810', borderRadius: 8, border: '1px solid rgba(201,168,76,0.14)', overflow: 'hidden', boxShadow: '0 0 40px rgba(201,168,76,0.04)' }}>
        <div style={{ height: 18, background: 'rgba(201,168,76,0.05)', borderBottom: '1px solid rgba(201,168,76,0.08)', display: 'flex', alignItems: 'center', gap: 3, padding: '0 8px' }}>
          {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: c, opacity: 0.45 }} />)}
          <div style={{ flex: 1, height: 7, marginLeft: 6, background: 'rgba(155,147,144,0.09)', borderRadius: 3 }} />
        </div>
        <div style={{ padding: '9px 12px', display: 'flex', flexDirection: 'column', gap: 3 }}>
          <div style={{ height: 3, width: '32%', background: 'rgba(201,168,76,0.28)', borderRadius: 2 }} />
          <div style={{ height: 2, width: '52%', background: 'rgba(155,147,144,0.09)', borderRadius: 2, marginBottom: 3 }} />
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
              <div style={{ height: 2, width: '70%', background: 'rgba(155,147,144,0.1)', borderRadius: 2 }} />
              <div style={{ height: 2, width: '55%', background: 'rgba(155,147,144,0.08)', borderRadius: 2 }} />
            </div>
            <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.1)', flexShrink: 0 }} />
          </div>
          <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
            {[1, 2, 3].map(i => <div key={i} style={{ flex: 1, height: 30, background: 'rgba(201,168,76,0.04)', borderRadius: 4, border: '1px solid rgba(201,168,76,0.07)' }} />)}
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.04), transparent 60%)', pointerEvents: 'none' }} />
    </div>
  )
}

interface Project { id: string; title: string; org: string; description: string; accent: string; tags: string[]; Visual: () => JSX.Element }

const PROJECTS: Project[] = [
  { id: 'botswana', title: 'Drought & Flood Early Warning', org: 'Internship · Gaborone', description: 'Spatio-temporal ML model for drought and flood prediction in Botswana using satellite imagery, climate data, and PyTorch.', accent: '#C9A84C', tags: ['Python', 'PyTorch', 'Google Earth Engine', 'Spatio-temporal ML'], Visual: BotswanaVisual },
  { id: 'beaver', title: 'Beaver', org: 'Personal Project', description: 'Full-stack self-improvement app featuring 2D beaver animations that live in a customizable room and react to your habits.', accent: '#A07850', tags: ['React', 'Node.js', '2D Animation'], Visual: BeaverVisual },
  { id: 'medialab', title: 'Musical Orchestration AI', org: 'MIT Media Lab', description: 'AI research for automated musical orchestration, applying machine learning to composition, arrangement, and timbre design.', accent: '#7C6A9C', tags: ['Python', 'ML', 'Music AI', 'Research'], Visual: MediaLabVisual },
  { id: 'sloan', title: 'Food Systems Data Analysis', org: 'MIT Sloan · FSAS', description: 'Python web scraping and data analysis pipeline built for the Food Systems & Sustainability initiative.', accent: '#6A9C6A', tags: ['Python', 'BeautifulSoup', 'Pandas', 'Data Analysis'], Visual: SloanVisual },
  { id: 'nonprofit', title: 'Music Nonprofit App', org: 'Nonprofit Organization', description: 'Management and coordination mobile app for a music nonprofit, scheduling, communications, and member coordination.', accent: '#9C7A7C', tags: ['Flutter', 'Swift', 'Mobile'], Visual: NonprofitVisual },
  { id: 'volatility', title: 'Volatility Forecasting', org: 'Quantitative Research', description: 'Deep learning model for financial volatility prediction using time-series market data and PyTorch.', accent: '#6A8A9C', tags: ['Python', 'PyTorch', 'Time-Series', 'Finance'], Visual: VolatilityVisual },
  { id: 'portfolio', title: 'This Portfolio', org: 'Personal Project', description: "The site you're looking at. React 19, TypeScript, Framer Motion, Three.js, and Tailwind CSS v4, music-studio theme with audio-reactive animations.", accent: '#C9A84C', tags: ['React', 'TypeScript', 'Framer Motion', 'Three.js', 'Tailwind CSS v4'], Visual: PortfolioVisual },
]

const CORNERS = [
  { top: 6, left: 6, borderTop: true, borderLeft: true },
  { top: 6, right: 6, borderTop: true, borderRight: true },
  { bottom: 6, left: 6, borderBottom: true, borderLeft: true },
  { bottom: 6, right: 6, borderBottom: true, borderRight: true },
] as const

function DarkroomCard({ project, index, featured = false }: { project: Project; index: number; featured?: boolean }) {
  const row = Math.floor(index / 3), col = index % 3
  const stagger = featured ? 1.0 : row * 0.45 + col * 0.12
  return (
    <motion.div
      whileHover={{ y: featured ? 0 : -4, transition: { duration: 0.22, ease: 'easeOut' } }}
      style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', background: 'rgba(9,7,11,0.94)', border: '1px solid rgba(240,237,232,0.06)', gridColumn: featured ? '1 / -1' : undefined, display: featured ? 'flex' : 'block', height: featured ? 180 : undefined, cursor: 'default' }}
    >
      <div style={{ height: featured ? '100%' : 160, width: featured ? '42%' : '100%', flexShrink: 0, overflow: 'hidden' }}>
        <project.Visual />
      </div>
      <div style={featured ? { width: 1, height: '100%', background: 'rgba(240,237,232,0.05)', flexShrink: 0 } : { height: 1, background: 'rgba(240,237,232,0.05)' }} />
      <div style={{ padding: featured ? '18px 24px' : '13px 16px 16px', flex: featured ? 1 : undefined, ...(featured ? { display: 'flex', flexDirection: 'column' as const, justifyContent: 'center' as const } : {}) }}>
        <div style={{ fontFamily: 'var(--font-code)', fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: `${project.accent}68`, marginBottom: 5 }}>{project.org}</div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: featured ? 22 : 17, color: '#F0EDE8', lineHeight: 1.25, marginBottom: 7 }}>{project.title}</h3>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(155,147,144,0.62)', lineHeight: 1.55, marginBottom: 11 }}>{project.description}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 4 }}>
          {project.tags.map(tag => <span key={tag} style={{ fontFamily: 'var(--font-code)', fontSize: 9, letterSpacing: '0.08em', padding: '3px 8px', borderRadius: 4, background: `${project.accent}0e`, border: `1px solid ${project.accent}20`, color: `${project.accent}85` }}>{tag}</span>)}
        </div>
      </div>
      {CORNERS.map((c, i) => (
        <div key={i} style={{ position: 'absolute', top: 'top' in c ? c.top : undefined, bottom: 'bottom' in c ? c.bottom : undefined, left: 'left' in c ? c.left : undefined, right: 'right' in c ? c.right : undefined, width: 9, height: 9, borderTop: c.borderTop ? `1px solid ${project.accent}28` : undefined, borderBottom: c.borderBottom ? `1px solid ${project.accent}28` : undefined, borderLeft: c.borderLeft ? `1px solid ${project.accent}28` : undefined, borderRight: c.borderRight ? `1px solid ${project.accent}28` : undefined, pointerEvents: 'none' }} />
      ))}
      <motion.div initial={{ opacity: 1 }} whileInView={{ opacity: 0 }} viewport={{ once: true, margin: '-5%' }} transition={{ duration: 2.8, delay: stagger, ease: [0.7, 0, 0.3, 1] }} style={{ position: 'absolute', inset: 0, background: '#060402', pointerEvents: 'none', zIndex: 10 }} />
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: [0, 0.62, 0] }} viewport={{ once: true, margin: '-5%' }} transition={{ duration: 2.1, delay: stagger + 0.38, times: [0, 0.36, 1] }} style={{ position: 'absolute', inset: 0, background: 'rgba(185,75,8,0.9)', pointerEvents: 'none', zIndex: 11 }} />
    </motion.div>
  )
}

export function Projects() {
  return (
    <section id="work" className="py-28 flex flex-col items-center">
      <div className="w-full" style={{ maxWidth: 980, padding: '0 24px' }}>
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: 36 }}>
          <p style={{ fontFamily: 'var(--font-code)', fontSize: 10, letterSpacing: '0.32em', textTransform: 'uppercase' as const, color: 'rgba(155,147,144,0.38)', marginBottom: 10 }}>Darkroom · 01, 07</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(32px,5vw,52px)', color: '#F0EDE8', lineHeight: 1.1 }}>Projects</h2>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {PROJECTS.slice(0, 6).map((project, i) => <DarkroomCard key={project.id} project={project} index={i} />)}
          <DarkroomCard project={PROJECTS[6]} index={6} featured />
        </div>
      </div>
    </section>
  )
}
