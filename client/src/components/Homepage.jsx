import React, { useState, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThreeScene from './ThreeScene';

const navLinks = [
  { name: 'About', id: 'about' },
  { name: 'Architecture', id: 'services' },
  { name: 'NATA Coaching', id: 'nata-excellence' },
  { name: 'Academics', id: 'programs' },
  { name: 'Our Team', id: 'governance' },
  { name: 'Gallery', id: 'gallery' },
];

const NavigationHeader = memo(({ isScrolled, setIsMenuOpen, onEnquiryClick, scrollToSection }) => (
  <motion.nav 
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className={`fixed top-0 left-0 w-full z-[110] transition-all duration-500 ${
      isScrolled ? 'bg-[#fbf9e3]/90 backdrop-blur-lg py-4 shadow-sm border-b border-black/5' : 'bg-transparent py-6'
    }`}
  >
    <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center">
      <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <img src="/assets/Logo/LOGO -16.png" alt="Logo" className="h-10 md:h-12 w-auto" />
      </div>

      <div className="hidden lg:flex items-center gap-10">
        {navLinks.map((link) => (
          <button
            key={link.name}
            onClick={() => scrollToSection(link.id)}
            className="relative text-[12px] font-bold tracking-widest uppercase group py-1 cursor-pointer transition-all duration-300 text-black/60 hover:text-black hover:-translate-y-0.5"
          >
            <span className="relative z-10">{link.name}</span>
            <span className="absolute bottom-0 left-0 w-full h-[1.5px] transform scale-x-0 transition-transform duration-500 origin-right group-hover:scale-x-100 group-hover:origin-left bg-[#ff4041]"></span>
          </button>
        ))}
        <button 
          onClick={onEnquiryClick}
          className="ml-4 px-7 py-2.5 bg-[#ff4041] text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-none cursor-pointer hover:bg-black transition-all duration-300"
        >
          Enquiry
        </button>
      </div>

      <div className="lg:hidden">
        <button onClick={() => setIsMenuOpen(true)} className="flex flex-col gap-1.5 items-end group cursor-pointer">
          <div className="h-[1px] bg-black w-8"></div>
          <div className="h-[1px] bg-black w-6 group-hover:w-8 transition-all"></div>
        </button>
      </div>
    </div>
  </motion.nav>
));


const BackToTop = memo(({ isScrolled }) => (
  <AnimatePresence>
    {isScrolled && (
      <motion.button
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.8 }}
        whileHover={{ scale: 1.1, backgroundColor: '#000' }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 z-[100] w-12 h-12 bg-[#ff4041] text-white rounded-full flex items-center justify-center shadow-2xl cursor-pointer group transition-colors duration-300"
        aria-label="Back to top"
      >
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="group-hover:-translate-y-1 transition-transform duration-300"
        >
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </motion.button>
    )}
  </AnimatePresence>
));

const Homepage = ({ onEnquiryClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setHeaderScrolled(scrollPos > 50);
      setShowBackToTop(scrollPos > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = useCallback((id) => {
    setIsMenuOpen(false);
    if (window.lenis) {
      window.lenis.scrollTo('#' + id, { offset: -80 });
    } else {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <div id="home" className="relative min-h-screen bg-[#fbf9e3] text-[#1a1a1a] font-sans selection:bg-gold selection:text-white overflow-hidden">
      <NavigationHeader 
        isScrolled={headerScrolled} 
        setIsMenuOpen={setIsMenuOpen} 
        onEnquiryClick={onEnquiryClick} 
        scrollToSection={scrollToSection} 
      />

      <BackToTop isScrolled={showBackToTop} />

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[150] cursor-pointer"
            />
            
            {/* Menu Panel */}
            <motion.div 
              initial={{ x: '100%', skewX: -10 }}
              animate={{ x: 0, skewX: 0 }}
              exit={{ x: '100%', skewX: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-[#fbf9e3] z-[160] flex flex-col shadow-2xl origin-right"
            >
              {/* Header inside menu */}
              <div className="flex justify-between items-center p-10 border-b border-black/5">
                <img src="/assets/Logo/LOGO -16.png" alt="Logo" className="h-10" />
                <button 
                  onClick={() => setIsMenuOpen(false)} 
                  className="group flex items-center gap-4 text-black cursor-pointer overflow-hidden"
                >
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-opacity">Close</span>
                  <div className="relative w-8 h-8 flex items-center justify-center border border-black/20 rounded-full group-hover:rotate-90 transition-transform duration-500">
                    <div className="absolute w-4 h-[1px] bg-black rotate-45"></div>
                    <div className="absolute w-4 h-[1px] bg-black -rotate-45"></div>
                  </div>
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 flex flex-col gap-6 p-10 md:p-16 overflow-y-auto no-scrollbar">
                {[...navLinks, { name: 'Enquiry', isEnquiry: true }].map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * idx + 0.3, duration: 0.6 }}
                  >
                    <button
                      onClick={() => {
                        if (link.isEnquiry) {
                          setIsMenuOpen(false);
                          onEnquiryClick();
                        } else {
                          scrollToSection(link.id);
                        }
                      }}
                      className="group flex items-start transition-all duration-300"
                    >
                      <span className={`text-3xl md:text-5xl font-serif relative ${link.isEnquiry ? 'text-[#ff4041] font-bold' : 'text-black'} group-hover:text-[#ff4041]`}>
                        {link.name}
                        <span className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-[#ff4041] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                      </span>
                    </button>
                  </motion.div>
                ))}
              </div>


            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* REAL THREE.JS HERO SECTION */}
      <section className="relative h-screen w-full flex items-center justify-center">
        {/* The Three.js Canvas */}
        <ThreeScene onReady={() => setSceneReady(true)} />

        {/* Content Overlay */}
        <div className="relative w-full h-full max-w-[1400px] flex items-center justify-center px-6 pointer-events-none">
          
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
            <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={sceneReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
            >
              <span className="text-[10px] md:text-[12px] uppercase tracking-[0.5em] font-bold text-[#fbf9e3] mb-6 block">Architecture & Design Education</span>
              <h1 className="text-7xl md:text-[10rem] font-display tracking-[-0.04em] leading-none mb-3 text-[#ff4041] font-bold">
                THE OPEN ROOM
              </h1>
              <div className="flex items-center justify-center gap-3 max-w-md md:max-w-lg mx-auto mt-4">
                <div className="h-[1px] w-8 bg-[#ff4041] shrink-0"></div>
                <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-medium text-[#fbf9e3] leading-relaxed text-center">Where vision meets precision. Shaping spaces that inspire, nurturing minds that design the future.</span>
                <div className="h-[1px] w-8 bg-[#ff4041] shrink-0"></div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Action Bar */}
          <div className="absolute bottom-8 md:bottom-12 left-0 w-full flex justify-center items-center z-30 pointer-events-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={sceneReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap justify-center gap-3 md:gap-6"
          >
              <button 
                onClick={() => scrollToSection('services')} 
                className="group relative px-10 py-4 overflow-hidden rounded-full border border-black/20 bg-white/80 backdrop-blur-sm hover:border-[#ff4041] transition-colors duration-500 cursor-pointer"
              >
                <div className="absolute inset-0 bg-[#ff4041] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.4em] text-black group-hover:text-white transition-colors duration-500">
                  Explore Work
                </span>
              </button>
              
              <button 
                onClick={() => scrollToSection('nata-excellence')} 
                className="group relative px-10 py-4 overflow-hidden rounded-full border border-black/20 bg-white/80 backdrop-blur-sm hover:border-[#ff4041] transition-colors duration-500 cursor-pointer"
              >
                <div className="absolute inset-0 bg-[#ff4041] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.4em] text-black group-hover:text-white transition-colors duration-500">
                  NATA Coaching
                </span>
              </button>

              <button 
                onClick={() => scrollToSection('programs')} 
                className="group relative px-10 py-4 overflow-hidden rounded-full border border-black/20 bg-white/80 backdrop-blur-sm hover:border-[#ff4041] transition-colors duration-500 cursor-pointer"
              >
                <div className="absolute inset-0 bg-[#ff4041] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.4em] text-black group-hover:text-white transition-colors duration-500">
                  College Collaboration
                </span>
              </button>
          </motion.div>
          </div>
        </div>

      </section>
    </div>
  );
};

export default Homepage;
