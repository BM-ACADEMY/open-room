import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Homepage from './components/Homepage'
import About from './pages/About'
import AcademicPrograms from './components/AcademicPrograms'
import Collaborations from './components/Collaborations'
import MeetOurTeam from './components/MeetOurTeam'
import FAQ from './components/FAQ'
import Projects from './pages/Projects'
import Services from './pages/Services'
import Awards from './pages/Awards'
import Footer from './components/Footer'
import EnquiryForm from './components/EnquiryForm'
import NataCoaching from './components/NataCoaching'

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

    // Use GSAP ticker for Lenis instead of a separate RAF loop
    // This avoids running two competing animation loops
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.lagSmoothing(0)
    
    const tickerCallback = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerCallback)

    return () => {
      gsap.ticker.remove(tickerCallback)
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
              <About />
              <Services />
              <AcademicPrograms />
              <NataCoaching/>
              <Collaborations />
              <MeetOurTeam />
              <FAQ />
              <Footer onEnquiryClick={() => setIsEnquiryOpen(true)} />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
