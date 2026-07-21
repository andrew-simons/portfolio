import { MusicProvider }  from './context/MusicContext'
import { Background }    from './components/Background'
import { Cursor }        from './components/Cursor'
import { GrainOverlay }  from './components/GrainOverlay'
import { NoiseMesh }     from './components/NoiseMesh'
import { SideNav }       from './components/SideNav'
import { About }         from './sections/About'
import { Contact }       from './sections/Contact'
import { Hero }          from './sections/Hero'
import { Projects }      from './sections/Projects'
import { TechStack }     from './sections/TechStack'
import { Footer }        from './components/Footer'

export default function App() {
  return (
    <MusicProvider>
      <GrainOverlay />
      <Cursor />
      <NoiseMesh />
      <Background />
      <SideNav />
      <main>
        <Hero />
        <TechStack />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </MusicProvider>
  )
}
