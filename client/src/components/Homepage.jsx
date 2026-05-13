import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    image: '/assets/slider1.png',
    title: 'Architecture\nThrough Learning',
    subtitle: 'A design studio and educational platform shaping spaces, ideas, and future architects.',
    accent: 'THE OPEN ROOM BRAND'
  },
  {
    image: '/assets/slider2.png',
    title: 'Where Architecture\nMeets Thoughtful Design',
    subtitle: 'Creating timeless residential and commercial spaces through design, detail, and execution.',
    accent: 'LUXURY ARCHITECTURE'
  },
  {
    image: '/assets/hero_bg.png',
    title: 'Designing Spaces\nThat Shape Experiences',
    subtitle: 'Architecture, interiors, and design learning — crafted with intention.',
    accent: 'PREMIUM MINIMAL'
  }
];

const Homepage = () => {
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
    <div ref={containerRef} className="min-h-screen bg-white text-[#1a1a1a] font-sans selection:bg-gold selection:text-white">
      {/* Top Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 w-full h-24 flex justify-between items-center px-12 z-[110] transition-all duration-500 border-b ${
          isScrolled || isMenuOpen ? 'bg-white border-gray-100 h-20' : 'bg-transparent border-transparent h-24'
        }`}
      >
        <div className="flex items-center gap-10 relative z-[120]">
          <div className={`text-[10px] font-bold tracking-[0.3em] uppercase transition-colors duration-500 ${
            isScrolled || isMenuOpen ? 'text-[#1a1a1a]' : 'text-white/60'
          }`}>
            EN | FR
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-gold"></div>
        </div>

        <div className={`text-[11px] font-bold tracking-[0.6em] uppercase transition-colors duration-500 relative z-[120] ${
          isScrolled || isMenuOpen ? 'text-[#1a1a1a]' : 'text-white'
        }`}>
          THE OPEN ROOM
        </div>

        <div 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex flex-col gap-1.5 cursor-pointer group p-4 relative z-[120]"
        >
          <motion.div 
            animate={isMenuOpen 
              ? { rotate: 45, y: 3, backgroundColor: '#000' } 
              : { rotate: 0, y: 0, backgroundColor: isScrolled ? '#000' : '#fff' }
            }
            className="w-7 h-[1px]"
          ></motion.div>
          <motion.div 
            animate={isMenuOpen 
              ? { rotate: -45, y: -3, backgroundColor: '#000' } 
              : { rotate: 0, y: 0, backgroundColor: isScrolled ? '#000' : '#fff' }
            }
            className="w-4 h-[1px] ml-auto"
          ></motion.div>
        </div>
      </motion.nav>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-white z-[100] flex flex-col justify-center px-12 md:px-32 overflow-y-auto pt-24"
          >
            <div className="flex flex-col gap-6 md:gap-8 max-w-4xl">
              {['Home', 'Projects', 'Services', 'Awards', 'Contact'].map((item, idx) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (idx * 0.1) }}
                  className="group cursor-pointer flex items-start gap-4 md:gap-8"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-gold text-[10px] font-bold tracking-widest mt-4 md:mt-8">0{idx + 1}</span>
                  <h2 className="text-5xl md:text-8xl font-serif leading-tight group-hover:pl-6 transition-all duration-500 group-hover:text-gold flex items-baseline">
                    {item}
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
                  <span className="hover:text-gold cursor-pointer transition-colors">Behance</span>
                </div>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Inquiries</div>
                <div className="text-[10px] font-bold tracking-widest uppercase hover:text-gold cursor-pointer transition-colors">
                  hello@openroom.architecture
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
        <div className="absolute inset-0 flex flex-col justify-center px-12 md:px-24 text-white z-10 pointer-events-none">
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
            
            <h1 className="text-6xl md:text-[7rem] font-serif leading-[0.9] mb-10 tracking-tighter whitespace-pre-line">
              {slides[currentSlide].title}
            </h1>
            
            <p className="text-lg md:text-xl max-w-xl text-gray-300 font-light leading-relaxed mb-12">
              {slides[currentSlide].subtitle}
            </p>
            
            <div className="flex flex-wrap items-center gap-8 md:gap-12">
              <button className="group relative px-10 py-5 border border-white/20 overflow-hidden transition-all duration-500 hover:border-gold">
                <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                <span className="relative text-[10px] font-bold uppercase tracking-[0.4em] group-hover:text-white transition-colors">
                  Explore Project
                </span>
              </button>
              
              <div 
                className="flex items-center gap-5 group cursor-pointer" 
                onClick={nextSlide}
              >
                <div className="relative w-14 h-14 rounded-full border border-white/20 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:border-gold">
                   <div className="absolute inset-0 bg-gold -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="relative z-10 group-hover:text-white transition-colors">
                    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-gray-400 group-hover:text-gold transition-colors">
                    Discover
                  </span>
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase">
                    Next Story
                  </span>
                </div>
              </div>
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

      {/* About Section */}
      <section className="py-24 md:py-32 px-12 md:px-40 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 bg-[#fafafa]">
        <div className="md:col-span-5 relative">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="aspect-[3/4] relative z-10"
          >
            <img src="/assets/arch1.png" className="w-full h-full object-cover" alt="About" />
          </motion.div>
          <div className="absolute top-8 md:top-10 -left-8 md:-left-10 w-full h-full border-[8px] md:border-[10px] border-gold/10 -z-0"></div>
        </div>
        
        <div className="md:col-span-7 flex flex-col justify-center">
          <span className="text-gold text-[10px] font-bold uppercase tracking-[0.5em] mb-6 md:mb-8">
            WHO WE ARE
          </span>
          <h2 className="text-5xl md:text-7xl font-serif mb-8 md:mb-10 leading-tight">
            We Design <span className="italic font-light">Spaces</span> That Connect <span className="text-gold">People</span>.
          </h2>
          <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-10 md:mb-12 max-w-xl">
            With over a decade of experience, Antra has been at the forefront of architectural innovation, blending traditional craftsmanship with cutting-edge technology to create timeless structures.
          </p>
          <div className="flex flex-wrap gap-8 md:gap-12">
            <div>
              <div className="text-3xl md:text-4xl font-serif text-gold mb-1 md:mb-2">12+</div>
              <div className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Awards Won</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-serif text-gold mb-1 md:mb-2">150+</div>
              <div className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Projects Done</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-serif text-gold mb-1 md:mb-2">24</div>
              <div className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Experts Team</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 md:py-32 px-12 md:px-40 bg-white">
        <div className="text-center mb-16 md:mb-20">
          <span className="text-gold text-[10px] font-bold uppercase tracking-[0.5em] mb-4 md:mb-6 block">OUR EXPERTISE</span>
          <h2 className="text-5xl md:text-6xl font-serif">Comprehensive Design Services</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {[
            { title: 'Architecture', desc: 'Custom residential and commercial designs that push the boundaries of modern structure.' },
            { title: 'Interior Design', desc: 'Curation of materials, lighting, and furniture to create cohesive and emotive spaces.' },
            { title: 'Urban Planning', desc: 'Sustainable development strategies for communities and large-scale urban projects.' }
          ].map((service, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="p-10 md:p-12 bg-[#fdfdfd] border border-gray-50 hover:border-gold/30 transition-all duration-500"
            >
              <div className="w-14 h-14 md:w-16 h-16 bg-[#f8f8f8] mb-6 md:mb-8 flex items-center justify-center text-gold text-2xl font-serif">
                0{i + 1}
              </div>
              <h3 className="text-xl md:text-2xl font-serif mb-4 md:mb-6">{service.title}</h3>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-6 md:mb-8">
                {service.desc}
              </p>
              <div className="text-[9px] font-bold uppercase tracking-widest cursor-pointer hover:text-gold transition-colors">
                Read More +
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer / CTA */}
      <footer className="bg-[#1a1a1a] text-white py-24 md:py-32 px-12 md:px-40 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-6xl md:text-8xl font-serif mb-10 md:mb-12 max-w-4xl leading-tight">
            Let's build your <span className="italic font-light text-gold">dream</span> together.
          </h2>
          <button className="px-10 py-5 md:px-12 md:py-6 border border-gold text-gold text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-gold hover:text-white transition-all duration-500">
            Start A Conversation
          </button>
        </div>
        
        {/* Background Text */}
        <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 text-[30vw] font-serif text-white/5 pointer-events-none italic">
          ANTRA
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
