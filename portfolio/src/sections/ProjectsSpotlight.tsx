import { useState } from 'react'
import { motion } from 'framer-motion'

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
        <div key={i} style={{ position:'absolute', border:'1px solid rgba(201,168,76,0.15)', borderRadius:'50%', width:`${50+i*22}%`, height:`${50+i*22}%`, top:'50%', left:'50%', transform:'translate(-50%,-50%)' }} />
      ))}
      <div style={{ position:'absolute', top:'35%', left:'44%', width:9, height:9, background:'#C9A84C', borderRadius:'50%', boxShadow:'0 0 18px #C9A84C' }} />
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
    <div className="w-full h-full relative overflow-hidden flex items-end justify-center gap-[3px] px-4 pb-3" style={{ background:'#0c0b14' }}>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 100%,rgba(124,106,156,0.2),transparent 70%)' }} />
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
  const bars = [{ h:52 },{ h:76 },{ h:61 },{ h:89 },{ h:43 }]
  return (
    <div className="w-full h-full relative overflow-hidden flex items-end justify-center gap-3 px-8 pb-6" style={{ background:'#0d1018' }}>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 100%,rgba(201,168,76,0.1),transparent 70%)' }} />
      <div style={{ position:'absolute', bottom:'1.5rem', left:'2rem', right:'2rem', height:1, background:'rgba(201,168,76,0.2)' }} />
      {bars.map((bar, i) => (
        <motion.div key={i} style={{ flex:1, originY:1 }}
          initial={{ scaleY:0 }} whileInView={{ scaleY:1 }} viewport={{ once:true }}
          transition={{ duration:0.5, delay:i*0.07 }}>
          <div style={{ width:'100%', height:bar.h*0.72, background:`linear-gradient(to top,rgba(201,168,76,${0.55+i*0.04}),rgba(201,168,76,0.1))`, borderRadius:'3px 3px 0 0' }} />
        </motion.div>
      ))}
    </div>
  )
}

function PhoneVisual() {
  return (
    <div className="w-full h-full relative overflow-hidden flex items-center justify-center" style={{ background:'#0d0b0e' }}>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 50%,rgba(201,168,76,0.08),transparent 70%)' }} />
      <div style={{ width:64, height:112, border:'1.5px solid rgba(201,168,76,0.4)', borderRadius:12, position:'relative', background:'rgba(201,168,76,0.025)' }}>
        <div style={{ position:'absolute', top:7, left:'50%', transform:'translateX(-50%)', width:20, height:4, background:'rgba(201,168,76,0.3)', borderRadius:10 }} />
        <div style={{ position:'absolute', top:18, left:7, right:7, height:5, background:'rgba(201,168,76,0.12)', borderRadius:3 }} />
        <div style={{ position:'absolute', top:28, left:7, right:7, height:28, background:'rgba(124,106,156,0.18)', borderRadius:4, border:'1px solid rgba(124,106,156,0.25)' }} />
        <div style={{ position:'absolute', top:62, left:7, width:22, height:4, background:'rgba(201,168,76,0.2)', borderRadius:3 }} />
        <div style={{ position:'absolute', top:70, left:7, right:7, height:3, background:'rgba(155,147,144,0.12)', borderRadius:3 }} />
        <div style={{ position:'absolute', bottom:9, left:'50%', transform:'translateX(-50%)', width:24, height:3, background:'rgba(201,168,76,0.28)', borderRadius:10 }} />
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
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 85%,rgba(80,168,76,0.12),transparent 70%)' }} />
      <svg width="100%" height="100%" viewBox={`-10 -5 ${W+20} ${H+25}`} preserveAspectRatio="xMidYMid meet" style={{ padding:'10px 18px' }}>
        <defs>
          <linearGradient id="sg3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${path} L ${W} ${H+10} L 0 ${H+10} Z`} fill="url(#sg3)" />
        <path d={path} fill="none" stroke="#C9A84C" strokeWidth={1.5} strokeLinejoin="round" opacity={0.9} />
        <circle cx={W} cy={y(pts[pts.length-1])} r={3} fill="#C9A84C" opacity={0.95} />
      </svg>
    </div>
  )
}

// ── Data ──────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    id:'botswana', number:'01', title:'Drought & Flood Early Warning', org:'Internship · Botswana',
    description:'Spatio-temporal ML system predicting drought and flood events across Botswana using satellite imagery from Google Earth Engine.',
    highlights:['PyTorch models trained on NDVI + soil moisture data','District-level risk classification across Botswana','Designed for real-world government deployment'],
    accent:'#C9A84C', Visual:HeatmapVisual,
    tags:[{label:'Python',type:'ml'},{label:'PyTorch',type:'ml'},{label:'Google Earth Engine',type:'ml'},{label:'GeoPandas',type:'tool'}],
  },
  {
    id:'beaver', number:'02', title:'Beaver', org:'Personal Project',
    description:'Full-stack self-improvement app with a 2D beaver companion who lives in a customizable room and reacts to your habits.',
    highlights:['Animated 2D beaver that walks, reacts, and evolves','Habit tracking with room customisation rewards','React frontend + Node.js REST API'],
    accent:'#8a5820', Visual:BeaverVisual,
    tags:[{label:'React',type:'web'},{label:'Node.js',type:'web'},{label:'TypeScript',type:'web'}],
  },
  {
    id:'medialab', number:'03', title:'Music AI Research', org:'MIT Media Lab',
    description:'ML research for musical orchestration, training models to generate, analyse, and transform orchestral compositions.',
    highlights:['Generative models trained on orchestral MIDI corpora','Music-theory-informed evaluation metrics','Bridging computational creativity and composition'],
    accent:'#7C6A9C', Visual:WaveformVisual,
    tags:[{label:'Python',type:'ml'},{label:'PyTorch',type:'ml'},{label:'Music21',type:'tool'}],
  },
  {
    id:'sloan', number:'04', title:'Food Systems Data', org:'MIT Sloan · FSAS',
    description:"Python data pipeline for MIT Sloan's Food Systems Advisory team, scraping, cleaning, and surfacing food industry trends.",
    highlights:['Custom scrapers across 10+ food industry sources','Automated cleaning and trend reporting pipeline','Insights used for food policy research briefs'],
    accent:'#C9A84C', Visual:BarChartVisual,
    tags:[{label:'Python',type:'ml'},{label:'BeautifulSoup',type:'tool'},{label:'Pandas',type:'ml'}],
  },
  {
    id:'nonprofit', number:'05', title:'Music Nonprofit App', org:'Pro Bono · Mobile',
    description:'Cross-platform mobile app for a music nonprofit, member management, event scheduling, and internal communications.',
    highlights:['Flutter + Swift cross-platform architecture','Member directory, events, push notifications','Delivered pro bono for an active nonprofit'],
    accent:'#C9A84C', Visual:PhoneVisual,
    tags:[{label:'Flutter',type:'mobile'},{label:'Swift',type:'mobile'},{label:'Firebase',type:'tool'}],
  },
  {
    id:'volatility', number:'06', title:'Volatility Forecasting', org:'Personal Project · Finance',
    description:'ML model for short-term financial volatility prediction using historical market data and rolling statistical features.',
    highlights:['PyTorch model trained on historical OHLCV data','78% accuracy identifying high/low volatility regimes','Rolling features: ATR, Bollinger Bands, RSI'],
    accent:'#40c875', Visual:SparklineVisual,
    tags:[{label:'Python',type:'ml'},{label:'PyTorch',type:'ml'},{label:'NumPy',type:'ml'}],
  },
]

// ── Layout constants ──────────────────────────────────────────

const CARD_W   = 340
const CARD_H   = 390
const WING_SCALE = 0.74
const WING_GAP   = 18
const WING_X  = CARD_W / 2 + WING_GAP + (CARD_W * WING_SCALE) / 2   // ~424
const HIDDEN_X = WING_X + CARD_W * WING_SCALE + WING_GAP + 40

function getPos(i: number, active: number) {
  const total = PROJECTS.length
  const offset = ((i - active) % total + total) % total
  return offset > Math.floor(total / 2) ? offset - total : offset
}

function getAnim(pos: number) {
  if (pos ===  0) return { x: 0,         scale: 1,          opacity: 1,    zIndex: 10 }
  if (pos ===  1) return { x:  WING_X,   scale: WING_SCALE, opacity: 0.42, zIndex: 5  }
  if (pos === -1) return { x: -WING_X,   scale: WING_SCALE, opacity: 0.42, zIndex: 5  }
  const dir = pos > 0 ? 1 : -1
  return { x: dir * HIDDEN_X, scale: 0.55, opacity: 0, zIndex: 0 }
}

// ── Section ───────────────────────────────────────────────────

export function Projects() {
  const [active, setActive] = useState(0)

  function navigate(dir: number) {
    setActive(prev => (prev + dir + PROJECTS.length) % PROJECTS.length)
  }

  const current = PROJECTS[active]

  return (
    <section id="work" className="py-32 flex flex-col items-center">
      {/* Header */}
      <motion.div
        initial={{ opacity:0, y:14 }}
        whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true }}
        transition={{ duration:0.6 }}
        className="mb-14 text-center"
      >
        <p className="font-body text-[10px] uppercase tracking-[0.35em] text-mist/50 mb-2">Selected Work</p>
        <h2 className="font-display font-light text-cream" style={{ fontSize:'clamp(32px,4vw,52px)' }}>
          Projects
        </h2>
      </motion.div>

      {/* Stage area */}
      <motion.div
        initial={{ opacity:0 }}
        whileInView={{ opacity:1 }}
        viewport={{ once:true }}
        transition={{ duration:0.8, delay:0.15 }}
        className="relative w-full flex flex-col items-center"
        style={{ maxWidth: 900 }}
      >
        {/* Spotlight beam from above */}
        <div
          aria-hidden
          style={{
            position:'absolute', top:-80, left:'50%', transform:'translateX(-50%)',
            width:500, height:520, pointerEvents:'none', zIndex:20,
            background:'radial-gradient(ellipse 55% 100% at 50% 0%, rgba(201,168,76,0.07), transparent 70%)',
          }}
        />

        {/* Left edge fade */}
        <div aria-hidden style={{ position:'absolute', left:0, top:0, bottom:0, width:80, zIndex:15, pointerEvents:'none', background:'linear-gradient(to right, #0D0B0E, transparent)' }} />
        {/* Right edge fade */}
        <div aria-hidden style={{ position:'absolute', right:0, top:0, bottom:0, width:80, zIndex:15, pointerEvents:'none', background:'linear-gradient(to left, #0D0B0E, transparent)' }} />

        {/* Cards container */}
        <div className="relative overflow-hidden w-full" style={{ height: CARD_H + 20 }}>
          {PROJECTS.map((project, i) => {
            const pos  = getPos(i, active)
            const anim = getAnim(pos)

            return (
              <motion.div
                key={project.id}
                animate={anim}
                transition={{ duration:0.55, ease:[0.23,1,0.32,1] }}
                onClick={() => pos !== 0 && setActive(i)}
                style={{
                  position:'absolute',
                  top: '50%', left:'50%',
                  width: CARD_W,
                  marginLeft: -CARD_W / 2,
                  marginTop: -(CARD_H / 2),
                  cursor: pos === 0 ? 'default' : 'pointer',
                  zIndex: anim.zIndex,
                }}
              >
                {/* Card */}
                <div
                  className="glass-elevated rounded-2xl overflow-hidden flex flex-col"
                  style={{
                    height: CARD_H,
                    border:`1px solid ${pos === 0 ? current.accent + '35' : 'rgba(255,255,255,0.06)'}`,
                    boxShadow: pos === 0 ? `0 0 60px ${current.accent}14, 0 24px 48px rgba(0,0,0,0.5)` : '0 8px 24px rgba(0,0,0,0.4)',
                    transition:'border-color 0.4s, box-shadow 0.4s',
                  }}
                >
                  {/* Visual area */}
                  <div style={{ height:170, flexShrink:0 }}>
                    <project.Visual />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-2.5 p-5 flex-1 overflow-hidden">
                    <div>
                      <p style={{ fontFamily:'var(--font-code)', fontSize:7.5, color:'rgba(155,147,144,0.4)', letterSpacing:'0.25em', textTransform:'uppercase' }}>
                        {project.org}
                      </p>
                      <h3 style={{ fontFamily:'var(--font-display)', fontSize:'1.2rem', fontWeight:300, color:'rgba(240,237,232,0.92)', marginTop:3, lineHeight:1.2 }}>
                        {project.title}
                      </h3>
                    </div>

                    <p style={{ fontFamily:'var(--font-body)', fontSize:'0.7rem', color:'rgba(155,147,144,0.6)', lineHeight:1.6 }}>
                      {project.description}
                    </p>

                    <ul className="flex flex-col gap-1">
                      {project.highlights.map((h, hi) => (
                        <li key={hi} className="flex items-start gap-2" style={{ fontFamily:'var(--font-body)', fontSize:'0.65rem', color:'rgba(155,147,144,0.5)', lineHeight:1.4 }}>
                          <span style={{ color:project.accent, flexShrink:0, marginTop:1 }}>▸</span>
                          {h}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1 mt-auto">
                      {project.tags.slice(0,3).map(tag => (
                        <span key={tag.label} className={`rounded-full border px-2 py-0.5 font-body text-[8px] ${TAG_STYLE[tag.type]}`}>
                          {tag.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Stage floor */}
        <div style={{ width:'90%', height:1, background:'linear-gradient(to right, transparent, rgba(201,168,76,0.15) 25%, rgba(201,168,76,0.15) 75%, transparent)' }} />

        {/* Navigation */}
        <div className="flex items-center gap-8 mt-8">
          {/* Prev */}
          <motion.button
            onClick={() => navigate(-1)}
            whileHover={{ x:-3 }}
            transition={{ duration:0.15 }}
            style={{ fontFamily:'var(--font-body)', fontSize:'1rem', color:'rgba(155,147,144,0.4)', background:'none', border:'none', cursor:'pointer', padding:4 }}
          >
            ←
          </motion.button>

          {/* Dots */}
          <div className="flex items-center gap-2.5">
            {PROJECTS.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setActive(i)}
                animate={{
                  width:  i === active ? 18 : 5,
                  background: i === active ? current.accent : 'rgba(155,147,144,0.3)',
                }}
                transition={{ duration:0.3 }}
                style={{ height:5, borderRadius:10, border:'none', cursor:'pointer', padding:0 }}
              />
            ))}
          </div>

          {/* Next */}
          <motion.button
            onClick={() => navigate(1)}
            whileHover={{ x:3 }}
            transition={{ duration:0.15 }}
            style={{ fontFamily:'var(--font-body)', fontSize:'1rem', color:'rgba(155,147,144,0.4)', background:'none', border:'none', cursor:'pointer', padding:4 }}
          >
            →
          </motion.button>
        </div>

        {/* Project counter */}
        <p style={{ fontFamily:'var(--font-code)', fontSize:8, color:'rgba(155,147,144,0.25)', letterSpacing:'0.25em', textTransform:'uppercase', marginTop:12 }}>
          {String(active + 1).padStart(2,'0')} / {String(PROJECTS.length).padStart(2,'0')}
        </p>
      </motion.div>
    </section>
  )
}
