import { useState } from 'react'
import { motion } from 'framer-motion'

// ── Types ─────────────────────────────────────────────────────

type TagType = 'ml' | 'web' | 'mobile' | 'tool'
interface Tag     { label: string; type: TagType }
interface Project {
  id:          string
  title:       string
  org:         string
  description: string
  accent:      string
  rotation:    number
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
    <div className="w-full h-full relative overflow-hidden flex items-end justify-center gap-[3px] px-3 pb-3" style={{ background:'#0c0b14' }}>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 100%,rgba(124,106,156,0.2),transparent 70%)' }} />
      {heights.map((h, i) => (
        <motion.div key={i} style={{ width:5, borderRadius:3, background:'linear-gradient(to top,#7C6A9C,#C9A84C80)', originY:1 }}
          animate={{ scaleY:[0.2,h,0.3,h*0.75,0.2] }}
          transition={{ duration:1.1+(i%4)*0.18, repeat:Infinity, delay:i*0.06, ease:'easeInOut' }}>
          <div style={{ height:66 }} />
        </motion.div>
      ))}
    </div>
  )
}

function BarChartVisual() {
  const bars = [{ h:52 },{ h:76 },{ h:61 },{ h:89 },{ h:43 }]
  return (
    <div className="w-full h-full relative overflow-hidden flex items-end justify-center gap-3 px-6 pb-5" style={{ background:'#0d1018' }}>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 100%,rgba(201,168,76,0.1),transparent 70%)' }} />
      <div style={{ position:'absolute', bottom:'1.25rem', left:'1.5rem', right:'1.5rem', height:1, background:'rgba(201,168,76,0.2)' }} />
      {bars.map((bar, i) => (
        <motion.div key={i} style={{ flex:1, originY:1 }}
          initial={{ scaleY:0 }} whileInView={{ scaleY:1 }} viewport={{ once:true }}
          transition={{ duration:0.5, delay:i*0.07 }}>
          <div style={{ width:'100%', height:bar.h*0.65, background:`linear-gradient(to top,rgba(201,168,76,${0.55+i*0.04}),rgba(201,168,76,0.1))`, borderRadius:'2px 2px 0 0' }} />
        </motion.div>
      ))}
    </div>
  )
}

function PhoneVisual() {
  return (
    <div className="w-full h-full relative overflow-hidden flex items-center justify-center" style={{ background:'#0d0b0e' }}>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 50%,rgba(201,168,76,0.08),transparent 70%)' }} />
      <div style={{ width:60, height:104, border:'1.5px solid rgba(201,168,76,0.4)', borderRadius:11, position:'relative', background:'rgba(201,168,76,0.025)' }}>
        <div style={{ position:'absolute', top:7, left:'50%', transform:'translateX(-50%)', width:18, height:4, background:'rgba(201,168,76,0.28)', borderRadius:10 }} />
        <div style={{ position:'absolute', top:17, left:7, right:7, height:4, background:'rgba(201,168,76,0.12)', borderRadius:2 }} />
        <div style={{ position:'absolute', top:25, left:7, right:7, height:26, background:'rgba(124,106,156,0.18)', borderRadius:3, border:'1px solid rgba(124,106,156,0.25)' }} />
        <div style={{ position:'absolute', top:57, left:7, width:20, height:4, background:'rgba(201,168,76,0.2)', borderRadius:3 }} />
        <div style={{ position:'absolute', bottom:9, left:'50%', transform:'translateX(-50%)', width:22, height:3, background:'rgba(201,168,76,0.28)', borderRadius:10 }} />
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
          <linearGradient id="sgp" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${path} L ${W} ${H+10} L 0 ${H+10} Z`} fill="url(#sgp)" />
        <path d={path} fill="none" stroke="#C9A84C" strokeWidth={1.5} strokeLinejoin="round" opacity={0.9} />
        <circle cx={W} cy={y(pts[pts.length-1])} r={3} fill="#C9A84C" opacity={0.95} />
      </svg>
    </div>
  )
}

// ── Data ──────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    id:'botswana', title:'Drought & Flood Early Warning', org:'Internship · Botswana',
    description:'Spatio-temporal ML predicting drought and flood events using Google Earth Engine satellite imagery.',
    accent:'#C9A84C', rotation:-3.5, Visual:HeatmapVisual,
    tags:[{label:'Python',type:'ml'},{label:'PyTorch',type:'ml'},{label:'Earth Engine',type:'ml'}],
  },
  {
    id:'beaver', title:'Beaver', org:'Personal Project',
    description:'Self-improvement app with a 2D beaver companion who lives in a customizable room and reacts to your habits.',
    accent:'#9a6830', rotation:1.8, Visual:BeaverVisual,
    tags:[{label:'React',type:'web'},{label:'Node.js',type:'web'},{label:'TypeScript',type:'web'}],
  },
  {
    id:'medialab', title:'Music AI Research', org:'MIT Media Lab',
    description:'Training ML models to generate, analyse, and transform orchestral compositions.',
    accent:'#7C6A9C', rotation:-2.4, Visual:WaveformVisual,
    tags:[{label:'Python',type:'ml'},{label:'PyTorch',type:'ml'},{label:'Music21',type:'tool'}],
  },
  {
    id:'sloan', title:'Food Systems Data', org:'MIT Sloan · FSAS',
    description:'Data pipeline scraping and surfacing food industry trends for MIT Sloan\'s food policy research team.',
    accent:'#C9A84C', rotation:2.6, Visual:BarChartVisual,
    tags:[{label:'Python',type:'ml'},{label:'BeautifulSoup',type:'tool'},{label:'Pandas',type:'ml'}],
  },
  {
    id:'nonprofit', title:'Music Nonprofit App', org:'Pro Bono · Mobile',
    description:'Cross-platform mobile app for member management, event scheduling, and communications.',
    accent:'#C9A84C', rotation:-1.5, Visual:PhoneVisual,
    tags:[{label:'Flutter',type:'mobile'},{label:'Swift',type:'mobile'},{label:'Firebase',type:'tool'}],
  },
  {
    id:'volatility', title:'Volatility Forecasting', org:'Personal Project · Finance',
    description:'ML model predicting short-term financial volatility with 78% regime classification accuracy.',
    accent:'#40c875', rotation:3.2, Visual:SparklineVisual,
    tags:[{label:'Python',type:'ml'},{label:'PyTorch',type:'ml'},{label:'NumPy',type:'ml'}],
  },
]

// ── Concert poster ────────────────────────────────────────────

function Poster({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div style={{ position:'relative', zIndex: hovered ? 20 : 1 }}>
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        animate={{
          rotate: hovered ? 0 : project.rotation,
          scale:  hovered ? 1.05 : 1,
          y:      hovered ? -10 : 0,
        }}
        transition={{ duration:0.45, ease:[0.23,1,0.32,1] }}
        style={{ cursor:'default', transformOrigin:'top center' }}
      >
        {/* Thumbtack */}
        <div style={{
          position:'absolute', top:-7, left:'50%', transform:'translateX(-50%)',
          width:13, height:13, borderRadius:'50%', zIndex:5,
          background:'radial-gradient(circle at 38% 32%, #EDD06A, #9A7020)',
          boxShadow:'0 2px 8px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.15)',
        }} />

        {/* Poster body */}
        <div style={{
          background:'#110d09',
          border:`1px solid ${project.accent}28`,
          borderRadius:3,
          overflow:'hidden',
          boxShadow: hovered
            ? `0 24px 56px rgba(0,0,0,0.75), 0 0 40px ${project.accent}18`
            : '0 6px 28px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.4)',
          transition:'box-shadow 0.4s',
          position:'relative',
        }}>

          {/* Artwork */}
          <div style={{ height:155, position:'relative' }}>
            <project.Visual />
            {/* Bottom vignette blending into poster body */}
            <div style={{ position:'absolute', bottom:0, left:0, right:0, height:40, background:'linear-gradient(to bottom, transparent, #110d09)' }} />
          </div>

          {/* Outer decorative border inside poster */}
          <div style={{ position:'absolute', inset:6, border:`1px solid ${project.accent}12`, borderRadius:2, pointerEvents:'none' }} />

          {/* Horizontal rule */}
          <div style={{ margin:'0 14px' }}>
            <div style={{ height:1, background:`linear-gradient(to right, transparent, ${project.accent}45, transparent)` }} />
          </div>

          {/* Text content */}
          <div style={{ padding:'10px 16px 14px', textAlign:'center' }}>
            {/* "Headlining" label */}
            <p style={{ fontFamily:'var(--font-code)', fontSize:6.5, color:`${project.accent}55`, letterSpacing:'0.45em', textTransform:'uppercase', marginBottom:7 }}>
              ✦ Headlining ✦
            </p>

            {/* Project title */}
            <h3 style={{ fontFamily:'var(--font-display)', fontSize:'1.08rem', fontWeight:400, color:'rgba(240,237,232,0.92)', lineHeight:1.2, marginBottom:7, letterSpacing:'0.01em' }}>
              {project.title}
            </h3>

            {/* Venue / org */}
            <p style={{ fontFamily:'var(--font-code)', fontSize:6.5, color:`${project.accent}60`, letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:8 }}>
              ◆ {project.org} ◆
            </p>

            {/* Description, slides in on hover */}
            <div style={{ overflow:'hidden' }}>
              <motion.p
                animate={{ maxHeight: hovered ? 72 : 0, opacity: hovered ? 1 : 0, marginBottom: hovered ? 10 : 0 }}
                transition={{ duration:0.35, ease:[0.23,1,0.32,1] }}
                style={{ fontFamily:'var(--font-body)', fontSize:'0.64rem', color:'rgba(155,147,144,0.68)', lineHeight:1.55, overflow:'hidden' }}
              >
                {project.description}
              </motion.p>
            </div>

            {/* Tags as support acts */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:4, justifyContent:'center' }}>
              {project.tags.slice(0,3).map(tag => (
                <span key={tag.label} className={`rounded-full border px-2 py-0.5 font-body text-[7px] ${TAG_STYLE[tag.type]}`}>
                  {tag.label}
                </span>
              ))}
            </div>
          </div>

          {/* Aged paper warm glow */}
          <div style={{ position:'absolute', inset:0, pointerEvents:'none', background:`radial-gradient(ellipse at 30% 90%, ${project.accent}06, transparent 60%)` }} />
        </div>
      </motion.div>
    </div>
  )
}

// ── Section ───────────────────────────────────────────────────

export function Projects() {
  return (
    <section id="work" className="py-32 flex flex-col items-center">
      {/* Header */}
      <motion.div
        initial={{ opacity:0, y:14 }}
        whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true }}
        transition={{ duration:0.6 }}
        className="mb-16 text-center"
      >
        <p className="font-body text-[10px] uppercase tracking-[0.35em] text-mist/50 mb-2">Selected Work</p>
        <h2 className="font-display font-light text-cream" style={{ fontSize:'clamp(32px,4vw,52px)' }}>
          Projects
        </h2>
      </motion.div>

      {/* Wall */}
      <motion.div
        initial={{ opacity:0, y:20 }}
        whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true }}
        transition={{ duration:0.8, delay:0.1 }}
        className="w-full relative"
        style={{ maxWidth:920 }}
      >
        {/* Ambient wall glow */}
        <div aria-hidden style={{
          position:'absolute', top:-40, left:'50%', transform:'translateX(-50%)',
          width:'70%', height:200, pointerEvents:'none',
          background:'radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.05), transparent 70%)',
        }} />

        {/* Poster grid */}
        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(3, 1fr)',
          gap:'32px 24px',
          padding:'28px 16px 40px',
          // Subtle wall texture
          background:'rgba(8,5,3,0.4)',
          borderRadius:12,
          border:'1px solid rgba(255,255,255,0.03)',
        }}>
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity:0, y:20 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ duration:0.5, delay:i * 0.08 }}
            >
              <Poster project={project} />
            </motion.div>
          ))}
        </div>

        {/* Wall baseboard */}
        <div style={{ height:8, margin:'0 16px', background:'linear-gradient(to bottom, rgba(60,38,18,0.35), rgba(30,18,6,0.5))', borderRadius:'0 0 6px 6px', borderTop:'1px solid rgba(120,75,25,0.2)' }} />
      </motion.div>
    </section>
  )
}
