import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThreeScene from './ThreeScene';

const navLinks = [
  { name: 'Architecture', id: 'services' },
  { name: 'NATA Coaching', id: 'programs' },
  { name: 'Collaborations', id: 'at-a-glance' },
  { name: 'About', id: 'about' },
  { name: 'Our Team', id: 'about' },
  { name: 'Contact', id: 'contact' },
];

const Homepage = ({ onEnquiryClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'unset';
    };
  }, []);

  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div ref={containerRef} id="home" className="relative min-h-screen bg-[#fbf9e3] text-[#1a1a1a] font-sans selection:bg-gold selection:text-white overflow-hidden">
      {/* Navigation Header */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 w-full z-[110] transition-all duration-500 ${
          isScrolled ? 'bg-white/80 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src="/assets/Logo/LOGO -15.png" alt="Logo" className="h-10 md:h-12 w-auto" />
          </div>

          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.id)}
                className="relative text-[12px] font-bold tracking-widest uppercase group py-1 cursor-pointer transition-all duration-300 text-black/60 hover:text-black"
              >
                <span className="relative z-10">{link.name}</span>
                <span className="absolute bottom-0 left-0 w-full h-[1px] transform scale-x-0 transition-transform duration-300 origin-right group-hover:scale-x-100 group-hover:origin-left bg-black"></span>
              </button>
            ))}
            <button 
              onClick={onEnquiryClick}
              className="ml-4 px-7 py-2.5 bg-[#7A4B3A] text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-none cursor-pointer hover:bg-black transition-all duration-300"
            >
              Get in Touch
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

      {/* Offcanvas Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay */}
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
                <img src="/assets/Logo/LOGO -15.png" alt="Logo" className="h-10" />
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

              {/* Links */}
              <div className="flex-1 flex flex-col justify-center p-10 md:p-20 gap-10">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * idx + 0.3, duration: 0.6 }}
                  >
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="group flex items-center gap-6 text-4xl md:text-6xl font-serif text-black hover:text-[#ff4041] transition-colors duration-300"
                    >
                      <span className="text-[10px] font-mono opacity-20 group-hover:opacity-100 transition-opacity">0{idx + 1}</span>
                      <span className="relative">
                        {link.name}
                        <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-[#ff4041] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                      </span>
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Footer inside menu */}
              <div className="p-10 border-t border-black/5 flex justify-between items-center">
                <div className="text-[9px] font-bold uppercase tracking-[0.3em] opacity-40">The Open Room Studio</div>
                <div className="flex gap-4">
                  <div className="w-8 h-[1px] bg-black/20"></div>
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em] opacity-40">Menu v2.0</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* REAL THREE.JS HERO SECTION */}
      <section className="relative h-screen w-full flex items-center justify-center">
        {/* The Three.js Canvas */}
        <ThreeScene />

        {/* Content Overlay */}
        <div className="relative w-full h-full max-w-[1400px] flex items-center justify-center px-6 pointer-events-none">
          
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="text-center"
            >
              <h1 className="text-7xl md:text-[10rem] font-serif tracking-tighter leading-none mb-2 text-black">
                THE OPEN ROOM
              </h1>
              <div className="flex items-center justify-center gap-4">
                <div className="h-[1px] w-12 bg-black/40"></div>
                <span className="text-[10px] uppercase tracking-[1em] font-bold text-white/60">Studio • Academy</span>
                <div className="h-[1px] w-12 bg-black/40"></div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Action Bar */}
          <div className="absolute bottom-12 left-0 w-full flex justify-center items-center z-30 hidden md:flex pointer-events-auto">
            <div className="flex gap-8">
              <button 
                onClick={() => scrollToSection('services')} 
                className="group relative px-10 py-4 overflow-hidden rounded-full border border-black/40 hover:border-[#ff4041] transition-colors duration-500"
              >
                <div className="absolute inset-0 bg-[#ff4041] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.4em] text-black group-hover:text-white transition-colors duration-500">
                  Explore Work
                </span>
              </button>
              
              <button 
                onClick={() => scrollToSection('programs')} 
                className="group relative px-10 py-4 overflow-hidden rounded-full border border-black/40 hover:border-[#ff4041] transition-colors duration-500"
              >
                <div className="absolute inset-0 bg-[#ff4041] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.4em] text-black group-hover:text-white transition-colors duration-500">
                  NATA Coaching
                </span>
              </button>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
};


const Callout = ({ label, x, y, mouseX, mouseY, delay }) => {
  const moveX = useTransform(mouseX, [-25, 25], [x - 10, x + 10]);
  const moveY = useTransform(mouseY, [-25, 25], [y - 10, y + 10]);
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      style={{ x: moveX, y: moveY }}
      className="absolute hidden md:flex items-center gap-3"
    >
      <div className="w-2 h-2 rounded-full bg-[#7A4B3A]" />
      <div className="h-[1px] w-12 bg-black/10" />
      <span className="text-[9px] font-mono font-bold tracking-widest text-black/40">{label}</span>
    </motion.div>
  );
};

export default Homepage;
