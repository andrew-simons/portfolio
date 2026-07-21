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

// ── Visuals ───────────────────────────────────────────────────

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
    <div className="w-full h-full relative overflow-hidden flex items-end justify-center gap-[3px] px-3 pb-3" style={{ background:'#0c0b14' }}>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 100%,rgba(124,106,156,0.18),transparent 70%)' }} />
      {heights.map((h, i) => (
        <motion.div key={i} style={{ width:4, borderRadius:2, background:'linear-gradient(to top,#7C6A9C,#C9A84C80)', originY:1 }}
          animate={{ scaleY:[0.2,h,0.3,h*0.75,0.2] }}
          transition={{ duration:1.1+(i%4)*0.18, repeat:Infinity, delay:i*0.06, ease:'easeInOut' }}>
          <div style={{ height:52 }} />
        </motion.div>
      ))}
    </div>
  )
}

function BarChartVisual() {
  const bars = [{ h:52 },{ h:76 },{ h:61 },{ h:89 },{ h:43 }]
  return (
    <div className="w-full h-full relative overflow-hidden flex items-end justify-center gap-2 px-5 pb-5" style={{ background:'#0d1018' }}>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 100%,rgba(201,168,76,0.08),transparent 70%)' }} />
      {bars.map((bar, i) => (
        <motion.div key={i} style={{ flex:1, originY:1 }}
          initial={{ scaleY:0 }} whileInView={{ scaleY:1 }} viewport={{ once:true }}
          transition={{ duration:0.5, delay:i*0.07 }}>
          <div style={{ width:'100%', height:bar.h*0.6, background:`linear-gradient(to top,rgba(201,168,76,${0.55+i*0.04}),rgba(201,168,76,0.12))`, borderRadius:'2px 2px 0 0' }} />
        </motion.div>
      ))}
    </div>
  )
}

function PhoneVisual() {
  return (
    <div className="w-full h-full relative overflow-hidden flex items-center justify-center" style={{ background:'#0d0b0e' }}>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 50%,rgba(201,168,76,0.07),transparent 70%)' }} />
      <div style={{ width:52, height:90, border:'1.5px solid rgba(201,168,76,0.38)', borderRadius:10, position:'relative', background:'rgba(201,168,76,0.025)' }}>
        <div style={{ position:'absolute', top:6, left:'50%', transform:'translateX(-50%)', width:16, height:4, background:'rgba(201,168,76,0.28)', borderRadius:10 }} />
        <div style={{ position:'absolute', top:15, left:6, right:6, height:4, background:'rgba(201,168,76,0.12)', borderRadius:2 }} />
        <div style={{ position:'absolute', top:22, left:6, right:6, height:22, background:'rgba(124,106,156,0.15)', borderRadius:3, border:'1px solid rgba(124,106,156,0.2)' }} />
        <div style={{ position:'absolute', bottom:8, left:'50%', transform:'translateX(-50%)', width:20, height:2, background:'rgba(201,168,76,0.28)', borderRadius:10 }} />
      </div>
    </div>
  )
}

function SparklineVisual() {
  const pts = [62,48,73,41,82,58,91,52,77,87,46,96,61,82,53,90]
  const W=140, H=55
  const min=Math.min(...pts), max=Math.max(...pts)
  const y = (v: number) => H - ((v-min)/(max-min))*(H*0.78) - H*0.08
  const path = pts.map((p,i) => `${i===0?'M':'L'} ${(i/(pts.length-1))*W} ${y(p)}`).join(' ')
  return (
    <div className="w-full h-full relative overflow-hidden" style={{ background:'#090d0a' }}>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 85%,rgba(80,168,76,0.1),transparent 70%)' }} />
      <svg width="100%" height="100%" viewBox={`-8 -4 ${W+16} ${H+18}`} preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="sg2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${path} L ${W} ${H+6} L 0 ${H+6} Z`} fill="url(#sg2)" />
        <path d={path} fill="none" stroke="#C9A84C" strokeWidth={1.5} strokeLinejoin="round" opacity={0.85} />
        <circle cx={W} cy={y(pts[pts.length-1])} r={2.5} fill="#C9A84C" opacity={0.9} />
      </svg>
    </div>
  )
}

// ── Data ──────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    id:'botswana', number:'01', title:'Drought & Flood Early Warning', org:'Internship · Botswana',
    description:'Spatio-temporal ML system predicting drought and flood events across Botswana using satellite data from Google Earth Engine.',
    highlights:['PyTorch models on GEE satellite imagery (NDVI, soil moisture)','District-level risk classification across Botswana','Designed for real-world government deployment'],
    accent:'#C9A84C', Visual:HeatmapVisual,
    tags:[{label:'Python',type:'ml'},{label:'PyTorch',type:'ml'},{label:'Google Earth Engine',type:'ml'},{label:'GeoPandas',type:'tool'}],
  },
  {
    id:'beaver', number:'02', title:'Beaver', org:'Personal Project',
    description:'Full-stack self-improvement app with a 2D beaver companion who lives in a customizable room and reacts to your habits.',
    highlights:['Animated 2D beaver that walks, reacts, and evolves','Habit tracking with room customisation rewards','Full-stack: React frontend + Node.js REST API'],
    accent:'#8a5820', Visual:BeaverVisual,
    tags:[{label:'React',type:'web'},{label:'Node.js',type:'web'},{label:'TypeScript',type:'web'}],
  },
  {
    id:'medialab', number:'03', title:'Music AI Research', org:'MIT Media Lab',
    description:'ML research for musical orchestration, training models to generate, analyse, and transform orchestral compositions.',
    highlights:['Trained generative models on orchestral MIDI corpora','Evaluated outputs with music-theory-informed metrics','Bridging computational creativity and composition'],
    accent:'#7C6A9C', Visual:WaveformVisual,
    tags:[{label:'Python',type:'ml'},{label:'PyTorch',type:'ml'},{label:'Music21',type:'tool'}],
  },
  {
    id:'sloan', number:'04', title:'Food Systems Data', org:'MIT Sloan · FSAS',
    description:"Python data pipeline for MIT Sloan's Food Systems Advisory team, scraping, cleaning, and surfacing food industry trends.",
    highlights:['Custom scrapers across 10+ food industry sources','Automated cleaning & trend reporting pipeline','Insights used for food policy research briefs'],
    accent:'#C9A84C', Visual:BarChartVisual,
    tags:[{label:'Python',type:'ml'},{label:'BeautifulSoup',type:'tool'},{label:'Pandas',type:'ml'}],
  },
  {
    id:'nonprofit', number:'05', title:'Music Nonprofit App', org:'Pro Bono · Mobile',
    description:'Cross-platform mobile app for a music nonprofit, member management, event scheduling, and internal communications.',
    highlights:['Cross-platform Flutter + Swift native modules','Member directory, event calendar, push notifications','Delivered pro bono for an active nonprofit org'],
    accent:'#C9A84C', Visual:PhoneVisual,
    tags:[{label:'Flutter',type:'mobile'},{label:'Swift',type:'mobile'},{label:'Firebase',type:'tool'}],
  },
  {
    id:'volatility', number:'06', title:'Volatility Forecasting', org:'Personal Project · Finance',
    description:'ML model for short-term financial volatility prediction using historical market data and rolling statistical features.',
    highlights:['PyTorch architecture trained on historical OHLCV data','Identifies high/low volatility regimes with 78% accuracy','Rolling feature engineering: ATR, Bollinger, RSI'],
    accent:'#40c875', Visual:SparklineVisual,
    tags:[{label:'Python',type:'ml'},{label:'PyTorch',type:'ml'},{label:'NumPy',type:'ml'}],
  },
]

// ── Record sleeve ─────────────────────────────────────────────

function RecordSleeve({ project, isOpen, onToggle }: { project: Project; isOpen: boolean; onToggle: () => void }) {
  return (
    <motion.div
      onClick={onToggle}
      className="flex-1 flex flex-col cursor-pointer"
      style={{ minWidth: 0 }}
      whileHover={{ y: isOpen ? -10 : -14 }}
      animate={{ y: isOpen ? -10 : 0 }}
      transition={{ duration: 0.3, ease: [0.23,1,0.32,1] }}
    >
      {/* Sleeve cover, square art area */}
      <div
        className="w-full relative overflow-hidden"
        style={{
          aspectRatio: '1 / 1',
          borderRadius: '4px 4px 0 0',
          border: `1px solid ${isOpen ? project.accent + '60' : 'rgba(255,255,255,0.08)'}`,
          borderBottom: 'none',
          boxShadow: isOpen
            ? `0 -8px 32px ${project.accent}25, 0 0 0 1px ${project.accent}30`
            : '0 -4px 16px rgba(0,0,0,0.4)',
          transition: 'box-shadow 0.3s, border-color 0.3s',
        }}
      >
        <project.Visual />

        {/* Gloss overlay */}
        <div style={{
          position:'absolute', inset:0,
          background:'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 60%)',
          pointerEvents:'none',
        }} />

        {/* Track number badge */}
        <div style={{
          position:'absolute', top:8, left:8,
          fontFamily:'var(--font-code)', fontSize:8,
          color:`${project.accent}CC`, letterSpacing:'0.1em',
        }}>
          {project.number}
        </div>

        {/* Open accent bar at top */}
        {isOpen && (
          <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:project.accent, opacity:0.7 }} />
        )}
      </div>

      {/* Spine label strip */}
      <div style={{
        background: isOpen ? `rgba(13,11,14,0.98)` : 'rgba(13,11,14,0.9)',
        border: `1px solid ${isOpen ? project.accent + '40' : 'rgba(255,255,255,0.07)'}`,
        borderTop: `1px solid ${isOpen ? project.accent + '50' : 'rgba(255,255,255,0.1)'}`,
        borderRadius: '0 0 4px 4px',
        padding: '8px 8px 10px',
        transition: 'border-color 0.3s',
      }}>
        <p style={{
          fontFamily:'var(--font-display)', fontSize:'0.7rem', fontWeight:300,
          color: isOpen ? 'rgba(240,237,232,0.95)' : 'rgba(240,237,232,0.65)',
          lineHeight:1.25, letterSpacing:'0.01em',
          overflow:'hidden', display:'-webkit-box',
          WebkitLineClamp:2, WebkitBoxOrient:'vertical',
          transition:'color 0.3s',
        }}>
          {project.title}
        </p>
        <p style={{
          fontFamily:'var(--font-code)', fontSize:7,
          color: isOpen ? `${project.accent}90` : 'rgba(155,147,144,0.35)',
          letterSpacing:'0.12em', textTransform:'uppercase',
          marginTop:4, transition:'color 0.3s',
        }}>
          {project.org.split('·')[0].trim()}
        </p>
      </div>
    </motion.div>
  )
}

// ── Section ───────────────────────────────────────────────────

export function Projects() {
  const [openId, setOpenId] = useState<string | null>(null)
  const openProject = PROJECTS.find(p => p.id === openId) ?? null

  return (
    <section id="work" className="py-32 flex flex-col items-center">
      <motion.div
        initial={{ opacity:0, y:18 }}
        whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true }}
        transition={{ duration:0.7 }}
        className="w-full flex flex-col"
        style={{ maxWidth:860 }}
      >
        {/* Section label */}
        <div className="mb-10 flex items-baseline justify-between">
          <p className="font-body text-[10px] uppercase tracking-[0.35em] text-mist/50">Selected Work</p>
          <p style={{ fontFamily:'var(--font-display)', fontSize:'0.75rem', fontStyle:'italic', color:'rgba(155,147,144,0.3)' }}>
            click a record to open
          </p>
        </div>

        {/* Crate */}
        <div
          className="relative rounded-xl overflow-visible"
          style={{
            background:'rgba(10,7,5,0.7)',
            border:'1px solid rgba(120,80,30,0.2)',
            boxShadow:'inset 0 -6px 20px rgba(0,0,0,0.5), 0 0 0 1px rgba(120,80,30,0.08)',
          }}
        >
          {/* Horizontal crate slats */}
          {[30, 55, 80].map(pct => (
            <div key={pct} style={{
              position:'absolute', left:12, right:12, top:`${pct}%`, height:1,
              background:'rgba(120,80,30,0.08)', pointerEvents:'none', zIndex:0,
            }} />
          ))}

          {/* Records row */}
          <div className="relative flex gap-3 px-5 pt-6 pb-0" style={{ zIndex:1 }}>
            {PROJECTS.map(project => (
              <RecordSleeve
                key={project.id}
                project={project}
                isOpen={openId === project.id}
                onToggle={() => setOpenId(openId === project.id ? null : project.id)}
              />
            ))}
          </div>

          {/* Crate bottom rail */}
          <div style={{
            height:14, margin:'0 0 0 0',
            background:'linear-gradient(to bottom, rgba(90,55,18,0.45), rgba(55,32,8,0.7))',
            borderTop:'1px solid rgba(140,90,30,0.3)',
            borderRadius:'0 0 10px 10px',
          }} />
        </div>

        {/* Expanded detail panel */}
        <AnimatePresence initial={false}>
          {openProject && (
            <motion.div
              key={openProject.id}
              initial={{ opacity:0, y:-8, height:0 }}
              animate={{ opacity:1, y:0, height:'auto' }}
              exit={{ opacity:0, y:-8, height:0 }}
              transition={{ duration:0.4, ease:[0.23,1,0.32,1] }}
              style={{ overflow:'hidden' }}
            >
              <div
                className="glass-elevated rounded-xl flex gap-6 mt-3 overflow-hidden"
                style={{ borderTop:`2px solid ${openProject.accent}30` }}
              >
                {/* Visual */}
                <div className="flex-shrink-0" style={{ width:200, minHeight:150 }}>
                  <openProject.Visual />
                </div>

                {/* Info */}
                <div className="flex flex-col gap-3 py-6 pr-7 flex-1">
                  <div>
                    <p style={{ fontFamily:'var(--font-code)', fontSize:8, color:'rgba(155,147,144,0.4)', letterSpacing:'0.28em', textTransform:'uppercase' }}>
                      {openProject.org}
                    </p>
                    <h3 style={{ fontFamily:'var(--font-display)', fontSize:'1.3rem', color:'rgba(240,237,232,0.92)', fontWeight:300, marginTop:4 }}>
                      {openProject.title}
                    </h3>
                  </div>

                  <p style={{ fontFamily:'var(--font-body)', fontSize:'0.76rem', color:'rgba(155,147,144,0.65)', lineHeight:1.65 }}>
                    {openProject.description}
                  </p>

                  <ul className="flex flex-col gap-1.5">
                    {openProject.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2" style={{ fontFamily:'var(--font-body)', fontSize:'0.68rem', color:'rgba(155,147,144,0.55)', lineHeight:1.4 }}>
                        <span style={{ color:openProject.accent, flexShrink:0, marginTop:1 }}>▸</span>
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {openProject.tags.map(tag => (
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

      </motion.div>
    </section>
  )
}
