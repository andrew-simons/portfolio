import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── Types ─────────────────────────────────────────────────────

type TagType = 'ml' | 'web' | 'mobile' | 'tool'
interface Tag     { label: string; type: TagType }
interface Project {
  id:          string
  number:      string
  title:       string
  org:         string
  description: string
  highlights:  string[]
  accent:      string
  tags:        Tag[]
  Visual:      () => React.ReactElement
}

const TAG_STYLE: Record<TagType, string> = {
  ml:     'border-gold/30  text-gold/80',
  web:    'border-mauve/30 text-mauve/80',
  mobile: 'border-cream/20 text-cream/60',
  tool:   'border-mist/20  text-mist/60',
}

// ── Visual motifs (reused in expanded panel) ──────────────────

function HeatmapVisual() {
  return (
    <div className="w-full h-full relative overflow-hidden" style={{ background:'linear-gradient(150deg,#0d1f35 0%,#1a4a3a 40%,#7a2518 70%,#c45a10 100%)' }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)', backgroundSize:'22px 22px' }} />
      {[0,1,2,3].map(i => (
        <div key={i} style={{ position:'absolute', border:'1px solid rgba(201,168,76,0.13)', borderRadius:'50%', width:`${50+i*24}%`, height:`${50+i*24}%`, top:'50%', left:'50%', transform:'translate(-50%,-50%)' }} />
      ))}
      <div style={{ position:'absolute', top:'33%', left:'44%', width:8, height:8, background:'#C9A84C', borderRadius:'50%', boxShadow:'0 0 14px #C9A84C90' }} />
    </div>
  )
}

function BeaverVisual() {
  return (
    <div className="w-full h-full relative overflow-hidden" style={{ background:'#150f08' }}>
      <div style={{ position:'absolute', bottom:0, left:'50%', transform:'translateX(-50%)', width:'80%', height:'60%', background:'radial-gradient(ellipse at bottom,rgba(201,168,76,0.14),transparent)' }} />
      <div style={{ position:'absolute', bottom:'23%', left:0, right:0, height:1, background:'rgba(201,168,76,0.18)' }} />
      <div style={{ position:'absolute', bottom:'23%', left:'50%', transform:'translateX(-50%)', width:64, height:3, background:'rgba(201,168,76,0.3)', borderRadius:2 }} />
      <div style={{ position:'absolute', bottom:'27%', left:'calc(50% + 12px)', width:20, height:15, background:'rgba(124,106,156,0.35)', borderRadius:2, border:'1px solid rgba(124,106,156,0.45)' }} />
      <div style={{ position:'absolute', bottom:'25%', left:'50%', transform:'translateX(-50%)', width:16, height:18, background:'#7a4a1a', borderRadius:'40% 40% 45% 45%' }} />
      <div style={{ position:'absolute', bottom:'41%', left:'50%', transform:'translateX(-50%)', width:16, height:14, background:'#8a5820', borderRadius:'50% 50% 45% 45%' }} />
      <div style={{ position:'absolute', bottom:'52%', left:'calc(50% - 10px)', width:7, height:7, background:'#8a5820', borderRadius:'50%' }} />
      <div style={{ position:'absolute', bottom:'52%', left:'calc(50% + 4px)',  width:7, height:7, background:'#8a5820', borderRadius:'50%' }} />
      <div style={{ position:'absolute', bottom:'47%', left:'calc(50% - 4px)', width:3, height:3, background:'#111', borderRadius:'50%' }} />
      <div style={{ position:'absolute', bottom:'47%', left:'calc(50% + 2px)', width:3, height:3, background:'#111', borderRadius:'50%' }} />
      <div style={{ position:'absolute', bottom:'43%', left:'50%', transform:'translateX(-50%)', width:6, height:3, background:'rgba(240,237,232,0.8)', borderRadius:'0 0 2px 2px' }} />
    </div>
  )
}

function WaveformVisual() {
  const heights = [0.35,0.65,0.45,0.9,0.55,0.8,0.38,0.95,0.5,0.7,0.32,0.85,0.58,0.42,0.9,0.48]
  return (
    <div className="w-full h-full relative overflow-hidden flex items-end justify-center gap-[3px] px-5 pb-4" style={{ background:'#0c0b14' }}>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 100%,rgba(124,106,156,0.18),transparent 70%)' }} />
      {heights.map((h, i) => (
        <motion.div key={i} style={{ width:5, borderRadius:3, background:'linear-gradient(to top,#7C6A9C,#C9A84C80)', originY:1 }}
          animate={{ scaleY:[0.2,h,0.3,h*0.75,0.2] }}
          transition={{ duration:1.1+(i%4)*0.18, repeat:Infinity, delay:i*0.06, ease:'easeInOut' }}>
          <div style={{ height:72 }} />
        </motion.div>
      ))}
    </div>
  )
}

function BarChartVisual() {
  const bars = [{ h:52,label:'Jan' },{ h:76,label:'Apr' },{ h:61,label:'Jul' },{ h:89,label:'Oct' },{ h:43,label:'Dec' }]
  return (
    <div className="w-full h-full relative overflow-hidden flex items-end justify-center gap-3 px-8 pb-7" style={{ background:'#0d1018' }}>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 100%,rgba(201,168,76,0.08),transparent 70%)' }} />
      <div style={{ position:'absolute', bottom:'1.75rem', left:'2rem', right:'2rem', height:1, background:'rgba(201,168,76,0.18)' }} />
      {bars.map((bar, i) => (
        <motion.div key={i} className="flex flex-col items-center gap-1 flex-1"
          initial={{ scaleY:0 }} whileInView={{ scaleY:1 }} viewport={{ once:true }}
          transition={{ duration:0.6, delay:i*0.08, ease:[0.23,1,0.32,1] }} style={{ originY:1 }}>
          <div style={{ width:'100%', height:bar.h*0.78, background:`linear-gradient(to top,rgba(201,168,76,${0.55+i*0.04}),rgba(201,168,76,0.12))`, borderRadius:'3px 3px 0 0', border:'1px solid rgba(201,168,76,0.28)' }} />
          <span style={{ fontSize:8, color:'rgba(155,147,144,0.45)', fontFamily:'var(--font-body)' }}>{bar.label}</span>
        </motion.div>
      ))}
    </div>
  )
}

function PhoneVisual() {
  return (
    <div className="w-full h-full relative overflow-hidden flex items-center justify-center" style={{ background:'#0d0b0e' }}>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 50%,rgba(201,168,76,0.07),transparent 70%)' }} />
      <div style={{ width:68, height:118, border:'1.5px solid rgba(201,168,76,0.38)', borderRadius:14, position:'relative', background:'rgba(201,168,76,0.025)' }}>
        <div style={{ position:'absolute', top:8, left:'50%', transform:'translateX(-50%)', width:22, height:5, background:'rgba(201,168,76,0.28)', borderRadius:10 }} />
        <div style={{ position:'absolute', top:20, left:8, right:8, height:5, background:'rgba(201,168,76,0.12)', borderRadius:3 }} />
        <div style={{ position:'absolute', top:30, left:8, right:8, height:28, background:'rgba(124,106,156,0.15)', borderRadius:4, border:'1px solid rgba(124,106,156,0.2)' }} />
        <div style={{ position:'absolute', top:64, left:8, width:24, height:4, background:'rgba(201,168,76,0.2)', borderRadius:3 }} />
        <div style={{ position:'absolute', top:72, left:8, right:8, height:3, background:'rgba(155,147,144,0.1)', borderRadius:3 }} />
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
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 85%,rgba(80,168,76,0.1),transparent 70%)' }} />
      <svg width="100%" height="100%" viewBox={`-10 -5 ${W+20} ${H+25}`} preserveAspectRatio="xMidYMid meet" style={{ padding:'8px 16px' }}>
        <defs>
          <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${path} L ${W} ${H+10} L 0 ${H+10} Z`} fill="url(#sg)" />
        <path d={path} fill="none" stroke="#C9A84C" strokeWidth={1.5} strokeLinejoin="round" opacity={0.85} />
        <circle cx={W} cy={y(pts[pts.length-1])} r={3} fill="#C9A84C" opacity={0.9} />
      </svg>
    </div>
  )
}

// ── Data ──────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    id:'botswana', number:'01',
    title:'Drought & Flood Early Warning',
    org:'Internship · Botswana',
    description:'Spatio-temporal ML system predicting drought and flood events across Botswana using satellite data from Google Earth Engine.',
    highlights:['PyTorch models on GEE satellite imagery (NDVI, soil moisture)','District-level risk classification across Botswana','Designed for real-world government deployment'],
    accent:'#C9A84C',
    tags:[{ label:'Python', type:'ml' },{ label:'PyTorch', type:'ml' },{ label:'Google Earth Engine', type:'ml' },{ label:'GeoPandas', type:'tool' }],
    Visual: HeatmapVisual,
  },
  {
    id:'beaver', number:'02',
    title:'Beaver',
    org:'Personal Project',
    description:'Full-stack self-improvement app with a 2D beaver companion who lives in a customizable room and reacts to your habits.',
    highlights:['Animated 2D beaver that walks, reacts, and evolves','Habit tracking with room customisation rewards','Full-stack: React frontend + Node.js REST API'],
    accent:'#8a5820',
    tags:[{ label:'React', type:'web' },{ label:'Node.js', type:'web' },{ label:'TypeScript', type:'web' }],
    Visual: BeaverVisual,
  },
  {
    id:'medialab', number:'03',
    title:'Music AI Research',
    org:'MIT Media Lab',
    description:'ML research for musical orchestration, training models to generate, analyse, and transform orchestral compositions.',
    highlights:['Trained generative models on orchestral MIDI corpora','Evaluated outputs with music-theory-informed metrics','Bridging computational creativity and composition'],
    accent:'#7C6A9C',
    tags:[{ label:'Python', type:'ml' },{ label:'PyTorch', type:'ml' },{ label:'Music21', type:'tool' }],
    Visual: WaveformVisual,
  },
  {
    id:'sloan', number:'04',
    title:'Food Systems Data',
    org:'MIT Sloan · FSAS',
    description:'Python data pipeline for MIT Sloan\'s Food Systems Advisory team, scraping, cleaning, and surfacing food industry trends.',
    highlights:['Custom scrapers across 10+ food industry sources','Automated cleaning & trend reporting pipeline','Insights used for food policy research briefs'],
    accent:'#C9A84C',
    tags:[{ label:'Python', type:'ml' },{ label:'BeautifulSoup', type:'tool' },{ label:'Pandas', type:'ml' }],
    Visual: BarChartVisual,
  },
  {
    id:'nonprofit', number:'05',
    title:'Music Nonprofit App',
    org:'Pro Bono · Mobile',
    description:'Cross-platform mobile app for a music nonprofit, member management, event scheduling, and internal communications.',
    highlights:['Cross-platform Flutter + Swift native modules','Member directory, event calendar, push notifications','Delivered pro bono for an active nonprofit org'],
    accent:'#C9A84C',
    tags:[{ label:'Flutter', type:'mobile' },{ label:'Swift', type:'mobile' },{ label:'Firebase', type:'tool' }],
    Visual: PhoneVisual,
  },
  {
    id:'volatility', number:'06',
    title:'Volatility Forecasting',
    org:'Personal Project · Finance',
    description:'ML model for short-term financial volatility prediction using historical market data and rolling statistical features.',
    highlights:['PyTorch architecture trained on historical OHLCV data','Identifies high/low volatility regimes with 78% accuracy','Rolling feature engineering: ATR, Bollinger, RSI'],
    accent:'#40c875',
    tags:[{ label:'Python', type:'ml' },{ label:'PyTorch', type:'ml' },{ label:'NumPy', type:'ml' }],
    Visual: SparklineVisual,
  },
]

// ── Track row ─────────────────────────────────────────────────

function TrackRow({ project, isOpen, onToggle }: { project: Project; isOpen: boolean; onToggle: () => void }) {
  return (
    <div>
      {/* Track header */}
      <motion.div
        className="flex items-center gap-4 py-4 cursor-pointer group"
        onClick={onToggle}
        style={{ borderBottom: isOpen ? 'none' : '1px solid rgba(255,255,255,0.05)' }}
        whileHover={{ x: 2 }}
        transition={{ duration: 0.15 }}
      >
        {/* Number */}
        <span style={{ fontFamily:'var(--font-code)', fontSize:9, color:'rgba(201,168,76,0.38)', minWidth:22, letterSpacing:'0.1em' }}>
          {project.number}
        </span>

        {/* Title */}
        <span style={{ fontFamily:'var(--font-display)', fontSize:'1.12rem', fontWeight:300, color: isOpen ? 'rgba(240,237,232,1)' : 'rgba(240,237,232,0.78)', letterSpacing:'0.02em', transition:'color 0.2s' }}>
          {project.title}
        </span>

        {/* Dotted leader */}
        <span className="flex-1" style={{ borderBottom:'1px dotted rgba(155,147,144,0.15)', marginBottom:3 }} />

        {/* Org */}
        <span style={{ fontFamily:'var(--font-code)', fontSize:8, color:'rgba(155,147,144,0.4)', letterSpacing:'0.1em', whiteSpace:'nowrap' }}>
          {project.org}
        </span>

        {/* Arrow */}
        <motion.span
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.25, ease: [0.23,1,0.32,1] }}
          style={{ color:'rgba(201,168,76,0.45)', fontSize:10, lineHeight:1, flexShrink:0 }}
        >
          ▸
        </motion.span>
      </motion.div>

      {/* Expanded panel */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="panel"
            initial={{ height:0, opacity:0 }}
            animate={{ height:'auto', opacity:1 }}
            exit={{ height:0, opacity:0 }}
            transition={{ duration:0.4, ease:[0.23,1,0.32,1] }}
            style={{ overflow:'hidden', borderBottom:'1px solid rgba(255,255,255,0.05)' }}
          >
            <div className="glass rounded-xl flex gap-6 mb-3 mt-1 overflow-hidden" style={{ minHeight:140 }}>
              {/* Visual thumbnail */}
              <div className="flex-shrink-0 rounded-l-xl overflow-hidden" style={{ width:180, minHeight:140 }}>
                <project.Visual />
              </div>

              {/* Details */}
              <div className="flex flex-col gap-3 py-5 pr-6 flex-1">
                <p style={{ fontFamily:'var(--font-body)', fontSize:'0.76rem', color:'rgba(155,147,144,0.65)', lineHeight:1.65 }}>
                  {project.description}
                </p>

                <ul className="flex flex-col gap-1.5">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2" style={{ fontFamily:'var(--font-body)', fontSize:'0.68rem', color:'rgba(155,147,144,0.55)', lineHeight:1.4 }}>
                      <span style={{ color:project.accent, flexShrink:0, marginTop:1 }}>▸</span>
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {project.tags.map(tag => (
                    <span key={tag.label} className={`rounded-full border px-2 py-0.5 font-body text-[9px] ${TAG_STYLE[tag.type]}`}>
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Section ───────────────────────────────────────────────────

export function Projects() {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <section id="work" className="py-32 flex flex-col items-center">
      <motion.div
        initial={{ opacity:0, y:18 }}
        whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true }}
        transition={{ duration:0.7 }}
        className="w-full"
        style={{ maxWidth:860 }}
      >
        {/* Album back-cover container */}
        <div className="glass-elevated rounded-2xl overflow-hidden">

          {/* Header */}
          <div className="px-10 pt-9 pb-7" style={{ borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex items-start justify-between">
              <div>
                <p style={{ fontFamily:'var(--font-code)', fontSize:8, color:'rgba(201,168,76,0.4)', letterSpacing:'0.35em', textTransform:'uppercase', marginBottom:6 }}>
                  Selected Work
                </p>
                <h2 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(28px,3.5vw,44px)', color:'rgba(240,237,232,0.92)', fontWeight:300 }}>
                  Projects
                </h2>
              </div>
              <div style={{ textAlign:'right', paddingTop:4 }}>
                <p style={{ fontFamily:'var(--font-display)', fontSize:'0.75rem', fontStyle:'italic', color:'rgba(155,147,144,0.28)', letterSpacing:'0.05em' }}>
                  Vol. I
                </p>
                <p style={{ fontFamily:'var(--font-code)', fontSize:7, color:'rgba(155,147,144,0.18)', letterSpacing:'0.22em', textTransform:'uppercase', marginTop:4 }}>
                  A.S., 2024
                </p>
              </div>
            </div>
          </div>

          {/* Track listing */}
          <div className="px-10 py-2">
            {PROJECTS.map(project => (
              <TrackRow
                key={project.id}
                project={project}
                isOpen={openId === project.id}
                onToggle={() => setOpenId(openId === project.id ? null : project.id)}
              />
            ))}
          </div>

          {/* Footer */}
          <div className="px-10 py-5" style={{ borderTop:'1px solid rgba(255,255,255,0.05)' }}>
            <p style={{ fontFamily:'var(--font-display)', fontSize:'0.68rem', fontStyle:'italic', color:'rgba(155,147,144,0.22)', letterSpacing:'0.06em' }}>
              All sessions recorded at MIT · Cambridge, MA
            </p>
          </div>

        </div>
      </motion.div>
    </section>
  )
}
