# Andrew Simons — Portfolio

Personal portfolio site. Goal: impress with frontend quality for full-stack/frontend roles while showcasing ML, webdev, and mobile projects.

**Live dev:** `npm run dev` → localhost:5173  
**Build:** `npm run build`

---

## Stack

| Layer        | Tool                              |
|--------------|-----------------------------------|
| Framework    | React 19 + TypeScript + Vite 6    |
| Styling      | Tailwind CSS v4 (CSS-first config)|
| Animation    | Framer Motion 11                  |
| 3D (planned) | React Three Fiber + Drei + Spline |
| Deploy       | Vercel (not yet set up)           |

---

## Theme: "Candlelit Studio"

Dark, warm, music-themed. Think recording studio at 2am. Andrew's compositions play as background audio. Audio-reactive visuals are a stretch goal.

### Color tokens (`src/index.css @theme`)

| Token  | Hex       | Role                            |
|--------|-----------|---------------------------------|
| canvas | `#0D0B0E` | Background                      |
| gold   | `#C9A84C` | Primary accent — brass, warmth  |
| mauve  | `#7C6A9C` | Secondary accent — soft lavender|
| cream  | `#F0EDE8` | Primary text                    |
| mist   | `#9B9390`  | Secondary text, labels          |

### Typography

| Role    | Font               | Use                      |
|---------|--------------------|--------------------------|
| display | Cormorant Garamond | Hero name, section titles|
| body    | Plus Jakarta Sans  | Nav, body, buttons       |
| code    | JetBrains Mono     | Code snippets, data      |

### Reusable CSS classes

- `.glass` — backdrop-blur 12px, 5% white bg, subtle border
- `.glass-elevated` — backdrop-blur 16px, 9% white bg
- `.orb` + `.orb-gold-a/b`, `.orb-mauve` — animated background orbs
- `.marquee-left` / `.marquee-right` — infinite scroll, pauses on hover
- `.cursor-blink` — blinking | cursor for typewriter

---

## File structure

```
src/
├── components/
│   ├── Background.tsx    — three drifting CSS orbs (gold + mauve)
│   ├── CDDisk.tsx        — spinning vinyl disk, SVG grooves, 3D hover tilt
│   ├── Cursor.tsx        — laser-pointer cursor: 3 spring-lagged orbs
│   ├── GrainOverlay.tsx  — film grain overlay (SVG noise, opacity 0.032)
│   └── Nav.tsx           — fixed glass pill nav
├── hooks/
│   ├── useMagnet.ts      — pulls element toward cursor when nearby
│   └── useTypewriter.ts  — human-like typing: variable speed, typos, deletes
├── sections/
│   ├── Hero.tsx          — typewriter → CD reveal, parallax, magnetic CTAs
│   └── TechStack.tsx     — dual marquee, color-coded by category
└── index.css             — Tailwind @theme + custom utilities
```

---

## What's built

- [x] Vite + React + TypeScript + Tailwind v4 scaffold
- [x] Design tokens + Google Fonts loaded
- [x] Animated background orbs
- [x] Film grain overlay
- [x] Glassmorphism nav
- [x] Laser-pointer custom cursor (3-layer spring physics)
- [x] Hero section
  - [x] Two-phase animation: typewriter centered → full hero slides in
  - [x] Typewriter identity reveal: "hi, i'm an engineer" → "a composer" → "Andrew Simons" (with caught double-m typo)
  - [x] Phase 2 layout: text on left, CD disk on right
  - [x] Mouse parallax on name + tagline (3 depth layers at different speeds)
  - [x] Magnetic CTA buttons (pull toward cursor when nearby)
  - [x] CDDisk: spinning vinyl, SVG groove rings, conic sheen, 3D hover tilt, gold "A.S." label, blur reflection beneath
- [x] Tech stack marquee (two rows, opposite directions, pause on hover)
- [x] GlassOrb — R3F glass sphere in hero (audio-reactive hook ready, wires to music player)

---

## Roadmap

### Next: Projects section
6 glass cards. Each card has a unique visual identity. Cards expand/flip in-place on click — no navigation.

| Project                     | Visual idea                                  | Stack tags          |
|-----------------------------|----------------------------------------------|---------------------|
| Botswana drought/flood ML   | Heatmap gradient or Africa continent outline | Python, PyTorch, GEE|
| Beaver self-improvement app | Tiny looping beaver animation (real assets)  | React, Node.js      |
| MIT Media Lab — music AI    | Audio waveform bars                          | Python, ML          |
| MIT Sloan — food data       | Mini bar chart motif                         | Python, BeautifulSoup|
| Music nonprofit mobile app  | Mobile frame mockup                          | Flutter/Swift        |
| Volatility forecasting ML   | Sparkline / candlestick                      | Python, PyTorch     |

### Music section
- Custom audio player UI (not browser default)
- Web Audio API waveform visualizer reacting to frequency data
- Compositions listed as tracks, user can switch
- CDDisk's `isPlaying` prop wired to player state — disk spins when playing

### Glass orb (hero) — R3F, done
- `@react-three/fiber` + `@react-three/drei` + `three` installed
- `src/components/GlassOrb.tsx` — Canvas with:
  - Sphere 64×64, `MeshTransmissionMaterial` (glass + distortion + chromatic aberration)
  - Gold point light + mauve fill light
  - `Float` drift + slow Y rotation
  - `getAudioData?: () => AudioData` prop — idle animates without it
- `src/hooks/useAudioAnalyzer.ts` — Web Audio API hook; lazy-inits on first `play` event
  - Returns `{ getAudioData }` → pass to `<GlassOrb>` to sync orb to music
  - **Wire up**: create `audioRef = useRef<HTMLAudioElement>(null)`, pass to both the music player `<audio>` element and `useAudioAnalyzer(audioRef)`, then pass `getAudioData` to `<GlassOrb>`
- Positioned absolutely in Hero, upper-right, `zIndex: 0` (behind text)

### About section
- Short bio, maybe a subtle timeline
- Glass card

### Contact section
- Email, GitHub, LinkedIn
- Minimal, one glass card

### Polish (later)
- React Three Fiber audio-reactive particle field
- Mobile responsiveness pass
- Vercel deploy + custom domain
- Potential WebGL background shader (Simplex noise)

---

## Projects — context for copy

- **Botswana ML** — spatio-temporal drought/flood early warning system. PyTorch + Google Earth Engine. Real climate impact, internship project.
- **Beaver app** — full-stack self-improvement app. Cute 2D beaver animations that walk around a customizable room.
- **MIT Media Lab** — AI research for musical orchestration.
- **MIT Sloan FSAS** — Python web scraping for food data analysis (food systems initiative).
- **Music nonprofit app** — management mobile app for a music nonprofit.
- **Volatility forecasting** — ML model for financial volatility prediction.

---

## Design rules (don't break these)

1. Gold is earned — use it for primary accents only, not decoration
2. Three motion speeds — cursor lag, parallax, and scroll should always differ
3. Cards don't navigate — project detail reveals in-place (flip/expand)
4. Music is structural — the CD, player, and waveform are layout elements, not afterthoughts
5. Design in Figma before coding any new section
