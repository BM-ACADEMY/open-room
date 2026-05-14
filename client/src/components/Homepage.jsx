import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    image: '/assets/hero_bg.png',
    title: 'Designing Spaces\nThat Shape Experiences',
    subtitle: 'Architecture, interiors, and design learning — crafted with intention.',
    accent: 'PREMIUM MINIMAL'
  },
  {
    image: '/assets/slider2.png',
    title: 'Where Architecture\nMeets Thoughtful Design',
    subtitle: 'Creating timeless residential and commercial spaces through design, detail, and execution.',
    accent: 'LUXURY ARCHITECTURE'
  },
  {
    image: '/assets/slider1.png',
    title: 'Architecture\nThrough Learning',
    subtitle: 'A design studio and educational platform shaping spaces, ideas, and future architects.',
    accent: 'THE OPEN ROOM BRAND'
  }
];

const Homepage = ({ onEnquiryClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
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
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
      document.body.style.overflow = 'unset';
    };
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div ref={containerRef} id="home" className="min-h-screen bg-white text-[#1a1a1a] font-sans selection:bg-gold selection:text-white">
      {/* Top Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 w-full h-24 flex justify-between items-center px-12 md:px-24 z-[110] transition-all duration-500 ${
          isScrolled && !isMenuOpen ? 'bg-white h-20' : 'bg-transparent h-24'
        }`}
      >
        <div className={`flex items-center gap-8 relative z-[120] transition-opacity duration-500 ${isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <img 
            src={isScrolled ? "/assets/Logo/LOGO -15.png" : "/assets/Logo/LOGO -17.png"} 
            alt="Logo" 
            className="h-14 w-auto transition-all duration-500"
          />
        </div>


      </motion.nav>

      {/* Stable Toggle Button */}
      <div 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`fixed top-6 right-8 md:top-8 md:right-12 cursor-pointer group z-[150] flex items-center justify-center transition-all duration-500 rounded-full ${
          isMenuOpen ? 'w-14 h-14 bg-black shadow-xl' : 'w-10 h-10 bg-transparent'
        }`}
      >
        <motion.div 
          animate={isMenuOpen 
            ? { rotate: 45, y: 0, backgroundColor: '#ffffff' } 
            : { rotate: 0, y: -4, backgroundColor: isScrolled ? '#000000' : (isMenuOpen ? '#ffffff' : '#ffffff') }
          }
          className={`absolute w-7 h-0.5 transition-colors duration-500 ${!isMenuOpen && !isScrolled ? 'bg-white' : ''}`}
        ></motion.div>
        <motion.div 
          animate={isMenuOpen 
            ? { rotate: -45, y: 0, width: '1.75rem', backgroundColor: '#ffffff' } 
            : { rotate: 0, y: 4, width: '1rem', backgroundColor: isScrolled ? '#000000' : (isMenuOpen ? '#ffffff' : '#ffffff') }
          }
          className={`absolute right-auto h-0.5 transition-colors duration-500 ${!isMenuOpen && !isScrolled ? 'bg-white' : ''}`}
        ></motion.div>
      </div>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-white z-[100] flex flex-col px-12 md:px-24 overflow-hidden pt-20 pb-12"
          >
            <div className="container mx-auto flex flex-col justify-center h-full pb-20 md:pb-0">
              <div className="flex flex-col gap-4 md:gap-6 max-w-4xl">
              {[
                { name: 'Home', id: 'home' },
                { name: 'WHAT WE DO', id: 'about' },
                { name: 'Our Services', id: 'services' },
                { name: 'STUDIO AT A GLANCE', id: 'at-a-glance' },
                { name: 'Contact', id: 'contact' },
                { name: 'Enquiry', id: 'enquiry' }
              ].map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + (idx * 0.1) }}
                  className="group cursor-pointer flex items-center gap-4 md:gap-8"
                  onClick={() => {
                    setIsMenuOpen(false);
                    if (item.id === 'enquiry') {
                      onEnquiryClick();
                    } else {
                      const element = document.getElementById(item.id);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  }}
                >
                  <span className="text-gold text-[10px] font-bold tracking-widest opacity-50">0{idx + 1}</span>
                  <h2 className="text-3xl md:text-6xl font-serif leading-tight group-hover:pl-4 transition-all duration-500 group-hover:text-gold flex items-baseline uppercase">
                    {item.name}
                  </h2>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 md:mt-24 flex flex-wrap gap-12 md:gap-24 border-t border-gray-100 pt-10">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Follow Us</div>
                <div className="flex gap-6 text-[10px] font-bold tracking-widest uppercase">
                  <span className="hover:text-gold cursor-pointer transition-colors">Instagram</span>
                  <span className="hover:text-gold cursor-pointer transition-colors">Twitter</span>
                </div>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Inquiries</div>
                <a href="mailto:info@theopenroom.in" className="text-[10px] font-bold tracking-widest uppercase hover:text-gold transition-colors block">
                  info@theopenroom.in
                </a>
              </div>
            </div>
          </div>
        </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Slider */}
      <header className="relative h-screen overflow-hidden bg-black">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img 
              src={slides[currentSlide].image} 
              alt="Slide" 
              className="w-full h-full object-cover brightness-50"
            />
          </motion.div>
        </AnimatePresence>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end md:justify-center px-12 md:px-24 pb-20 md:pb-0 text-white z-10 pointer-events-none">
          <motion.div
            key={`content-${currentSlide}`}
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.2, ease: "circOut" }}
            className="max-w-5xl pointer-events-auto"
          >
            <div className="overflow-hidden mb-6">
              <motion.span 
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="text-gold uppercase tracking-[0.6em] text-[10px] font-bold block"
              >
                {slides[currentSlide].accent}
              </motion.span>
            </div>
            
            <h1 className="text-5xl md:text-[5.5rem] font-serif leading-[0.95] mb-10 tracking-tighter whitespace-pre-line">
              {slides[currentSlide].title}
            </h1>
            
            <p className="text-lg md:text-xl max-w-xl text-gray-300 font-light leading-relaxed mb-12">
              {slides[currentSlide].subtitle}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 md:gap-8">
              <button 
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-10 py-5 bg-gold overflow-hidden transition-all duration-500 hover:bg-white"
              >
                <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.4em] text-white group-hover:text-black transition-colors">
                  Our Services
                </span>
              </button>
              
              <button 
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-10 py-5 border border-white/30 overflow-hidden transition-all duration-500 hover:border-gold"
              >
                <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.4em] text-white transition-colors">
                  Explore Studio
                </span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Slider Navigation Dots */}
        <div className="absolute right-8 md:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
          {slides.map((_, idx) => (
            <div 
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-1.5 h-1.5 rounded-full cursor-pointer transition-all duration-500 ${currentSlide === idx ? 'bg-gold h-10' : 'bg-white/30'}`}
            ></div>
          ))}
        </div>

        {/* Blueprint Texture Overlay (Subtle) */}
        <img 
          src="/assets/blueprint.png" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-5 pointer-events-none"
          alt="texture"
        />
      </header>

    </div>
  );
};

export default Homepage;
