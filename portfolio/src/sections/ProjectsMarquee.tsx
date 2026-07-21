import { useState }  from 'react'
import { motion }    from 'framer-motion'

type TagType = 'ml' | 'web' | 'mobile' | 'tool'
interface Tag     { label: string; type: TagType }
interface Project {
  id:           string
  title:        string
  org:          string
  description:  string
  highlights:   string[]
  previewAccent: string   // hex used for the mock screenshot tint
  tags:         Tag[]
  Visual:       () => React.ReactElement
}

const TAG_STYLE: Record<TagType, string> = {
  ml:     'border-gold/30  text-gold/80',
  web:    'border-mauve/30 text-mauve/80',
  mobile: 'border-cream/20 text-cream/60',
  tool:   'border-mist/20  text-mist/60',
}

// ── Visual motifs ─────────────────────────────────────────────

function HeatmapVisual() {
  return (
    <div className="w-full h-full relative overflow-hidden" style={{
      background: 'linear-gradient(150deg, #0d1f35 0%, #1a4a3a 40%, #7a2518 70%, #c45a10 100%)'
    }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)', backgroundSize:'22px 22px' }} />
      {[0,1,2,3].map(i => (
        <div key={i} style={{ position:'absolute', border:'1px solid rgba(201,168,76,0.13)', borderRadius:'50%', width:`${50+i*24}%`, height:`${50+i*24}%`, top:'50%', left:'50%', transform:'translate(-50%,-50%)' }} />
      ))}
      <div style={{ position:'absolute', top:'33%', left:'44%', width:8, height:8, background:'#C9A84C', borderRadius:'50%', boxShadow:'0 0 14px #C9A84C90' }} />
      <div style={{ position:'absolute', top:'52%', left:'58%', width:5, height:5, background:'#e87a40', borderRadius:'50%', opacity:0.75 }} />
      <div style={{ position:'absolute', top:'44%', left:'28%', width:4, height:4, background:'#e04040', borderRadius:'50%', opacity:0.55 }} />
    </div>
  )
}

function BeaverVisual() {
  return (
    <div className="w-full h-full relative overflow-hidden" style={{ background:'#150f08' }}>
      <div style={{ position:'absolute', bottom:0, left:'50%', transform:'translateX(-50%)', width:'80%', height:'60%', background:'radial-gradient(ellipse at bottom, rgba(201,168,76,0.14), transparent)' }} />
      {/* Floor */}
      <div style={{ position:'absolute', bottom:'23%', left:0, right:0, height:1, background:'rgba(201,168,76,0.18)' }} />
      {/* Desk */}
      <div style={{ position:'absolute', bottom:'23%', left:'50%', transform:'translateX(-50%)', width:64, height:3, background:'rgba(201,168,76,0.3)', borderRadius:2 }} />
      <div style={{ position:'absolute', bottom:'13%', left:'calc(50% - 28px)', width:2, height:'11%', background:'rgba(201,168,76,0.2)' }} />
      <div style={{ position:'absolute', bottom:'13%', left:'calc(50% + 26px)', width:2, height:'11%', background:'rgba(201,168,76,0.2)' }} />
      {/* Monitor */}
      <div style={{ position:'absolute', bottom:'27%', left:'calc(50%+12px)', width:20, height:15, background:'rgba(124,106,156,0.35)', borderRadius:2, border:'1px solid rgba(124,106,156,0.45)' }} />
      {/* Beaver body */}
      <div style={{ position:'absolute', bottom:'25%', left:'50%', transform:'translateX(-50%)', width:16, height:18, background:'#7a4a1a', borderRadius:'40% 40% 45% 45%' }} />
      {/* Beaver head */}
      <div style={{ position:'absolute', bottom:'41%', left:'50%', transform:'translateX(-50%)', width:16, height:14, background:'#8a5820', borderRadius:'50% 50% 45% 45%' }} />
      {/* Ears */}
      <div style={{ position:'absolute', bottom:'52%', left:'calc(50% - 10px)', width:7, height:7, background:'#8a5820', borderRadius:'50%' }} />
      <div style={{ position:'absolute', bottom:'52%', left:'calc(50% + 4px)',  width:7, height:7, background:'#8a5820', borderRadius:'50%' }} />
      {/* Eyes */}
      <div style={{ position:'absolute', bottom:'47%', left:'calc(50% - 4px)', width:3, height:3, background:'#111', borderRadius:'50%' }} />
      <div style={{ position:'absolute', bottom:'47%', left:'calc(50% + 2px)', width:3, height:3, background:'#111', borderRadius:'50%' }} />
      {/* Teeth */}
      <div style={{ position:'absolute', bottom:'43%', left:'50%', transform:'translateX(-50%)', width:6, height:3, background:'rgba(240,237,232,0.8)', borderRadius:'0 0 2px 2px' }} />
    </div>
  )
}

function WaveformVisual() {
  const heights = [0.35,0.65,0.45,0.9,0.55,0.8,0.38,0.95,0.5,0.7,0.32,0.85,0.58,0.42,0.9,0.48]
  return (
    <div className="w-full h-full relative overflow-hidden flex items-end justify-center gap-[3px] px-5 pb-4" style={{ background:'#0c0b14' }}>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 100%, rgba(124,106,156,0.18), transparent 70%)' }} />
      {heights.map((h, i) => (
        <motion.div
          key={i}
          style={{ width:5, borderRadius:3, background:'linear-gradient(to top, #7C6A9C, #C9A84C80)', originY:1 }}
          animate={{ scaleY:[0.2, h, 0.3, h*0.75, 0.2] }}
          transition={{ duration:1.1+(i%4)*0.18, repeat:Infinity, delay:i*0.06, ease:'easeInOut' }}
        >
          <div style={{ height:72 }} />
        </motion.div>
      ))}
    </div>
  )
}

function BarChartVisual() {
  const bars = [{ h:52, label:'Jan' },{ h:76, label:'Apr' },{ h:61, label:'Jul' },{ h:89, label:'Oct' },{ h:43, label:'Dec' }]
  return (
    <div className="w-full h-full relative overflow-hidden flex items-end justify-center gap-3 px-8 pb-7" style={{ background:'#0d1018' }}>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 100%, rgba(201,168,76,0.08), transparent 70%)' }} />
      <div style={{ position:'absolute', bottom:'1.75rem', left:'2rem', right:'2rem', height:1, background:'rgba(201,168,76,0.18)' }} />
      {[0.25,0.5,0.75].map(f => (
        <div key={f} style={{ position:'absolute', bottom:`calc(1.75rem + ${f*80}px)`, left:'2rem', right:'2rem', height:1, background:'rgba(201,168,76,0.06)' }} />
      ))}
      {bars.map((bar, i) => (
        <motion.div
          key={i}
          className="flex flex-col items-center gap-1 flex-1"
          initial={{ scaleY:0 }}
          whileInView={{ scaleY:1 }}
          viewport={{ once:true }}
          transition={{ duration:0.6, delay:i*0.08, ease:[0.23,1,0.32,1] }}
          style={{ originY:1 }}
        >
          <div style={{ width:'100%', height:bar.h*0.78, background:`linear-gradient(to top, rgba(201,168,76,${0.55+i*0.04}), rgba(201,168,76,0.12))`, borderRadius:'3px 3px 0 0', border:'1px solid rgba(201,168,76,0.28)' }} />
          <span style={{ fontSize:8, color:'rgba(155,147,144,0.45)', fontFamily:'var(--font-body)' }}>{bar.label}</span>
        </motion.div>
      ))}
    </div>
  )
}

function PhoneVisual() {
  return (
    <div className="w-full h-full relative overflow-hidden flex items-center justify-center" style={{ background:'#0d0b0e' }}>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.07), transparent 70%)' }} />
      <div style={{ width:68, height:118, border:'1.5px solid rgba(201,168,76,0.38)', borderRadius:14, position:'relative', background:'rgba(201,168,76,0.025)' }}>
        <div style={{ position:'absolute', top:8, left:'50%', transform:'translateX(-50%)', width:22, height:5, background:'rgba(201,168,76,0.28)', borderRadius:10 }} />
        {/* App UI skeleton */}
        <div style={{ position:'absolute', top:20, left:8, right:8, height:5, background:'rgba(201,168,76,0.12)', borderRadius:3 }} />
        <div style={{ position:'absolute', top:30, left:8, right:8, height:28, background:'rgba(124,106,156,0.15)', borderRadius:4, border:'1px solid rgba(124,106,156,0.2)' }} />
        <div style={{ position:'absolute', top:64, left:8, width:24, height:4, background:'rgba(201,168,76,0.2)', borderRadius:3 }} />
        <div style={{ position:'absolute', top:72, left:8, right:8, height:3, background:'rgba(155,147,144,0.1)', borderRadius:3 }} />
        <div style={{ position:'absolute', top:78, left:8, right:8, height:3, background:'rgba(155,147,144,0.1)', borderRadius:3 }} />
        <div style={{ position:'absolute', bottom:10, left:'50%', transform:'translateX(-50%)', width:28, height:3, background:'rgba(201,168,76,0.28)', borderRadius:10 }} />
      </div>
    </div>
  )
}

function SparklineVisual() {
  const pts = [62,48,73,41,82,58,91,52,77,87,46,96,61,82,53,90]
  const W=180, H=70
  const min=Math.min(...pts), max=Math.max(...pts)
  const y = (v: number) => H - ((v-min)/(max-min))*(H*0.78) - H*0.08
  const path = pts.map((p,i) => `${i===0?'M':'L'} ${(i/(pts.length-1))*W} ${y(p)}`).join(' ')
  return (
    <div className="w-full h-full relative overflow-hidden" style={{ background:'#090d0a' }}>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 85%, rgba(80,168,76,0.1), transparent 70%)' }} />
      <svg width="100%" height="100%" viewBox={`-10 -5 ${W+20} ${H+25}`} preserveAspectRatio="xMidYMid meet" style={{ padding:'8px 16px' }}>
        {[0.25,0.5,0.75].map(f => (
          <line key={f} x1={0} y1={y(min+(max-min)*f)} x2={W} y2={y(min+(max-min)*f)} stroke="rgba(201,168,76,0.07)" strokeWidth={1} />
        ))}
        <defs>
          <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${path} L ${W} ${H+10} L 0 ${H+10} Z`} fill="url(#sg)" />
        <path d={path} fill="none" stroke="#C9A84C" strokeWidth={1.5} strokeLinejoin="round" opacity={0.85} />
        <circle cx={(pts.length-1)/(pts.length-1)*W} cy={y(pts[pts.length-1])} r={3} fill="#C9A84C" opacity={0.9} />
      </svg>
    </div>
  )
}

// ── Mock screenshot ───────────────────────────────────────────

function MockScreenshot({ accent }: { accent: string }) {
  return (
    <div style={{ borderRadius:6, overflow:'hidden', border:'1px solid rgba(255,255,255,0.08)', background:'rgba(0,0,0,0.35)' }}>
      {/* Window chrome */}
      <div style={{ height:16, background:'rgba(0,0,0,0.4)', display:'flex', alignItems:'center', gap:4, padding:'0 8px' }}>
        {['#ff5f57','#febc2e','#28c840'].map((c,i) => (
          <div key={i} style={{ width:5, height:5, borderRadius:'50%', background:c, opacity:0.65 }} />
        ))}
      </div>
      {/* Content skeleton */}
      <div style={{ padding:'7px 9px', display:'flex', flexDirection:'column', gap:4 }}>
        <div style={{ height:4, width:'55%', background:`${accent}50`, borderRadius:2 }} />
        <div style={{ height:3, width:'82%', background:'rgba(255,255,255,0.07)', borderRadius:2 }} />
        <div style={{ height:3, width:'68%', background:'rgba(255,255,255,0.07)', borderRadius:2 }} />
        <div style={{ height:18, marginTop:2, background:`${accent}16`, borderRadius:3, border:`1px solid ${accent}28` }} />
        <div style={{ display:'flex', gap:4, marginTop:1 }}>
          <div style={{ height:3, flex:1, background:'rgba(255,255,255,0.05)', borderRadius:2 }} />
          <div style={{ height:3, flex:1, background:'rgba(255,255,255,0.05)', borderRadius:2 }} />
        </div>
      </div>
    </div>
  )
}

// ── Data ──────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    id: 'botswana',
    title: 'Drought & Flood Early Warning',
    org: 'Internship · Botswana',
    description: 'Spatio-temporal ML system predicting drought and flood events across Botswana using satellite data.',
    highlights: [
      'PyTorch models on GEE satellite imagery (NDVI, soil moisture)',
      'District-level risk classification across Botswana',
      'Designed for real-world government deployment',
    ],
    previewAccent: '#C9A84C',
    tags: [{ label:'Python', type:'ml' },{ label:'PyTorch', type:'ml' },{ label:'Google Earth Engine', type:'ml' },{ label:'GeoPandas', type:'tool' }],
    Visual: HeatmapVisual,
  },
  {
    id: 'beaver',
    title: 'Beaver',
    org: 'Personal Project',
    description: 'Full-stack self-improvement app with a 2D beaver companion who lives in a customizable room and reacts to your habits.',
    highlights: [
      'Animated 2D beaver that walks, reacts, and evolves',
      'Habit tracking with room customisation rewards',
      'Full-stack: React frontend + Node.js REST API',
    ],
    previewAccent: '#8a5820',
    tags: [{ label:'React', type:'web' },{ label:'Node.js', type:'web' },{ label:'TypeScript', type:'web' }],
    Visual: BeaverVisual,
  },
  {
    id: 'medialab',
    title: 'Music AI Research',
    org: 'MIT Media Lab',
    description: 'ML research for musical orchestration, training models to generate, analyse, and transform orchestral compositions.',
    highlights: [
      'Trained generative models on orchestral MIDI corpora',
      'Evaluated outputs with music-theory-informed metrics',
      'Bridging computational creativity and composition',
    ],
    previewAccent: '#7C6A9C',
    tags: [{ label:'Python', type:'ml' },{ label:'PyTorch', type:'ml' },{ label:'Music21', type:'tool' }],
    Visual: WaveformVisual,
  },
  {
    id: 'sloan',
    title: 'Food Systems Data',
    org: 'MIT Sloan · FSAS',
    description: 'Python data pipeline for MIT Sloan\'s Food Systems Advisory team, scraping, cleaning, and surfacing food industry trends.',
    highlights: [
      'Custom scrapers across 10+ food industry sources',
      'Automated cleaning & trend reporting pipeline',
      'Insights used for food policy research briefs',
    ],
    previewAccent: '#C9A84C',
    tags: [{ label:'Python', type:'ml' },{ label:'BeautifulSoup', type:'tool' },{ label:'Pandas', type:'ml' }],
    Visual: BarChartVisual,
  },
  {
    id: 'nonprofit',
    title: 'Music Nonprofit App',
    org: 'Pro Bono · Mobile',
    description: 'Cross-platform mobile app for a music nonprofit, member management, event scheduling, and internal communications.',
    highlights: [
      'Cross-platform Flutter + Swift native modules',
      'Member directory, event calendar, push notifications',
      'Delivered pro bono for an active nonprofit org',
    ],
    previewAccent: '#C9A84C',
    tags: [{ label:'Flutter', type:'mobile' },{ label:'Swift', type:'mobile' },{ label:'Firebase', type:'tool' }],
    Visual: PhoneVisual,
  },
  {
    id: 'volatility',
    title: 'Volatility Forecasting',
    org: 'Personal Project · Finance',
    description: 'ML model for short-term financial volatility prediction using historical market data and rolling statistical features.',
    highlights: [
      'PyTorch architecture trained on historical OHLCV data',
      'Identifies high/low volatility regimes with 78% accuracy',
      'Rolling feature engineering: ATR, Bollinger, RSI',
    ],
    previewAccent: '#40c875',
    tags: [{ label:'Python', type:'ml' },{ label:'PyTorch', type:'ml' },{ label:'NumPy', type:'ml' }],
    Visual: SparklineVisual,
  },
]

// ── Card ──────────────────────────────────────────────────────

const CARD_W = 220
const CARD_H = 300

function ProjectCard({ project }: { project: Project }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      style={{ perspective:'1000px', width:CARD_W, height:CARD_H, flexShrink:0, cursor:'default' }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration:0.5, ease:[0.23,1,0.32,1] }}
        style={{ transformStyle:'preserve-3d', position:'relative', width:'100%', height:'100%' }}
      >
        {/* ── Front ── */}
        <div
          className="absolute inset-0 glass rounded-xl overflow-hidden flex flex-col"
          style={{ backfaceVisibility:'hidden' }}
        >
          <div className="flex-shrink-0 overflow-hidden" style={{ height:110 }}>
            <project.Visual />
          </div>
          <div className="flex flex-col gap-2 p-4 flex-1">
            <div>
              <p className="font-body text-[8px] uppercase tracking-[0.28em] text-mist/50">{project.org}</p>
              <h3 className="font-display leading-tight text-cream mt-0.5" style={{ fontSize:'1.05rem' }}>{project.title}</h3>
            </div>
            <p className="font-body text-mist/55 leading-relaxed" style={{ fontSize:'0.68rem' }}>{project.description}</p>
            <div className="flex flex-wrap gap-1 mt-auto">
              {project.tags.slice(0,3).map(tag => (
                <span key={tag.label} className={`rounded-full border px-2 py-0.5 font-body text-[9px] ${TAG_STYLE[tag.type]}`}>
                  {tag.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Back ── */}
        <div
          className="absolute inset-0 glass-elevated rounded-xl p-4 flex flex-col gap-2.5"
          style={{ backfaceVisibility:'hidden', transform:'rotateY(180deg)' }}
        >
          <div>
            <p className="font-body text-[8px] uppercase tracking-[0.28em] text-mist/50">{project.org}</p>
            <h3 className="font-display leading-tight text-cream mt-0.5" style={{ fontSize:'1rem' }}>{project.title}</h3>
          </div>

          {/* Mock screenshot */}
          <MockScreenshot accent={project.previewAccent} />

          {/* Highlights */}
          <ul className="flex flex-col gap-1.5 flex-1">
            {project.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-1.5 font-body text-mist/70" style={{ fontSize:'0.65rem', lineHeight:1.4 }}>
                <span style={{ color: project.previewAccent, marginTop:1, flexShrink:0 }}>▸</span>
                {h}
              </li>
            ))}
          </ul>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {project.tags.map(tag => (
              <span key={tag.label} className={`rounded-full border px-2 py-0.5 font-body text-[9px] ${TAG_STYLE[tag.type]}`}>
                {tag.label}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// ── Section ───────────────────────────────────────────────────

export function Projects() {
  const doubled = [...PROJECTS, ...PROJECTS]

  return (
    <section id="work" className="py-32 flex flex-col items-center">
      <motion.div
        initial={{ opacity:0, y:14 }}
        whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true }}
        transition={{ duration:0.6 }}
        className="mb-14 w-full text-center"
        style={{ maxWidth: 860 }}
      >
        <p className="font-body text-[10px] uppercase tracking-[0.35em] text-mist/50 mb-3">Selected work</p>
        <h2 className="font-display font-light text-cream" style={{ fontSize:'clamp(32px,4vw,54px)' }}>
          Projects
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity:0 }}
        whileInView={{ opacity:1 }}
        viewport={{ once:true }}
        transition={{ duration:0.8, delay:0.1 }}
        className="relative overflow-hidden w-full"
        style={{ maxWidth: 860 }}
      >
        {/* Edge fade masks, solid at outer edge, fades to transparent at ~1 card in */}
        <div className="absolute left-0 top-0 bottom-0 w-48 pointer-events-none z-10"
          style={{ background:'linear-gradient(to right, #0D0B0E, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-48 pointer-events-none z-10"
          style={{ background:'linear-gradient(to left, #0D0B0E, transparent)' }} />

        <div className="flex gap-4 w-max marquee-projects">
          {doubled.map((project, i) => (
            <ProjectCard key={`${project.id}-${i}`} project={project} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
