import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Homepage from './components/Homepage'
import About from './pages/About'
import Projects from './pages/Projects'
import Services from './pages/Services'
import Awards from './pages/Awards'
import Contact from './pages/Contact'

const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <Router>
      <div className="bg-white min-h-screen">
        <Routes>
          <Route path="/" element={
            <>
              <Homepage />
              <About />
              <section id="projects">
                <Projects />
              </section>
              <section id="services">
                <Services />
              </section>
              <section id="awards">
                <Awards />
              </section>
              <section id="contact">
                <Contact />
              </section>
            </>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App


