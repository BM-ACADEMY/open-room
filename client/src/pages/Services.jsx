import React, { useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    title: "Architectural Design",
    description: "Concept development, schematic design, design development, and construction documentation for residential, commercial, and institutional projects. We craft buildings that are spatially resolved, technically sound, and contextually aware.",
    image: "/assets/arch1.png",
    number: "01"
  },
  {
    title: "Interior Design",
    description: "Comprehensive interior design services from space planning and material selection to furniture specification and lighting design. We create interiors that are both functional and deeply considered.",
    image: "/assets/interior.png",
    number: "02"
  },
  {
    title: "Design Consultation",
    description: "Expert consultation at any stage of your project. Whether you need a second opinion on your design direction, help with planning regulations, or strategic advice on space utilisation, we provide clear and actionable guidance.",
    image: "/assets/arch2.png",
    number: "03"
  },
  {
    title: "Turnkey Execution",
    description: "Complete project execution including contractor management, procurement, site supervision, and handover. We ensure design intent is maintained from drawing board to built reality.",
    image: "/assets/arch3.png",
    number: "04"
  },
  {
    title: "Commercial Projects",
    description: "Offices, retail spaces, showrooms, hospitality venues, and mixed-use developments — we bring commercial intelligence and design excellence together for spaces that perform and inspire.",
    image: "/assets/commercial.png",
    number: "05"
  },
  {
    title: "Residential Projects",
    description: "Villas, apartments, row houses, and bespoke homes designed around the lives of the people who inhabit them. Every home we design is a reflection of its owners, shaped by function, culture, and craft.",
    image: "/assets/residential.png",
    number: "06"
  }
];

const Services = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('.service-panel');
      const imageItems = gsap.utils.toArray('.service-image-item');
      
      // Initialize states with a vertical slide-up entrance
      gsap.set(imageItems, { opacity: 0, y: 30 });
      gsap.set(imageItems[0], { opacity: 1, y: 0 });

      panels.forEach((panel, i) => {
        // Image switching logic
        ScrollTrigger.create({
          trigger: panel,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            gsap.to(imageItems, { opacity: 0, y: 30, duration: 1, ease: "power3.inOut" });
            gsap.to(imageItems[i], { opacity: 1, y: 0, duration: 1, ease: "power3.out" });
          },
          onEnterBack: () => {
            gsap.to(imageItems, { opacity: 0, y: -30, duration: 1, ease: "power3.inOut" });
            gsap.to(imageItems[i], { opacity: 1, y: 0, duration: 1, ease: "power3.out" });
          }
        });

        // Content reveal animation (About-style sliding entrance)
        gsap.from(panel.querySelectorAll('.content-reveal'), {
          x: -50,
          opacity: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panel,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });
      });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative bg-[#eeeeee] z-10 scroll-mt-24 pb-40" id="services">
      {/* Intro Header */}
      <div className="pt-48 pb-32 px-12 md:px-24 max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "power3.out" }}
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="text-gold text-[10px] font-bold uppercase tracking-[0.5em]">Our Services</span>
            <div className="w-12 h-[1px] bg-gold/30"></div>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif leading-[1.1] mb-12 tracking-tight max-w-5xl whitespace-pre-line">
            End-to-end design solutions &mdash;{"\n"}
            <span className="italic text-gold">from concept to completion.</span>
          </h1>
          
          <div className="max-w-2xl">
            <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed">
              At The Open Room, we handle every stage of your project with precision and care. 
              Whether you are envisioning a home, a commercial space, or a large-scale institutional project, 
              our team brings together creative design, technical rigour, and seamless execution under one roof.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col md:flex-row relative px-12 md:px-24 gap-12 lg:gap-24">
        {/* Left Side: Scrolling Content */}
        <div className="w-full md:w-1/2 relative z-20">
          {servicesData.map((service, index) => (
            <div 
              key={index} 
              className="service-panel min-h-[80vh] flex flex-col justify-center py-20"
            >
              <div className="max-w-md">
                <span className="content-reveal text-gold/30 font-serif text-5xl md:text-7xl mb-8 block">{service.number}</span>
                <h3 className="content-reveal text-4xl md:text-6xl font-serif mb-8 tracking-tighter">{service.title}</h3>
                <div className="content-reveal w-16 h-[1px] bg-gold mb-8"></div>
                <p className="content-reveal text-gray-600 text-lg md:text-xl font-light leading-relaxed">
                  {service.description}
                </p>
                
                {/* Mobile Image */}
                <div className="mt-12 md:hidden shadow-2xl overflow-hidden rounded-sm">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Sticky Images with Top Gap */}
        <div className="hidden md:flex w-full md:w-1/2 h-[75vh] sticky top-32 items-center justify-center z-10">
          <div className="relative w-full h-full shadow-[0_30px_60px_rgba(0,0,0,0.1)] group overflow-hidden bg-white rounded-sm">
            {servicesData.map((service, index) => (
              <div 
                key={index}
                className="service-image-item absolute inset-0 w-full h-full"
              >
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/5"></div>
                
                {/* Overlay Text */}
                <div className="absolute bottom-12 left-12 text-white z-30">
                  <div className="text-[10px] font-bold uppercase tracking-[0.3em] mb-3 text-gold/90">PROJECT TYPE</div>
                  <h4 className="text-4xl font-serif italic leading-none">{service.title}</h4>
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
