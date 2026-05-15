import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Homepage from './components/Homepage'
import About from './pages/About'
import AcademicPrograms from './components/AcademicPrograms'
import MeetOurTeam from './components/MeetOurTeam'
import Projects from './pages/Projects'
import Services from './pages/Services'
import Awards from './pages/Awards'
import StudioAtAGlance from './components/StudioAtAGlance'
import Footer from './components/Footer'
import EnquiryForm from './components/EnquiryForm'

const App = () => {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

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

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <Router>
      <div className="bg-white min-h-screen overflow-x-hidden">
        <EnquiryForm isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} />
        <Routes>
          <Route path="/" element={
            <>
              <Homepage onEnquiryClick={() => setIsEnquiryOpen(true)} />
              <Services />
              <About />
              <AcademicPrograms />
              <MeetOurTeam />
              {/* <StudioAtAGlance/> */}
              <Footer onEnquiryClick={() => setIsEnquiryOpen(true)} />
            </>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
