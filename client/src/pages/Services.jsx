import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    title: "Architectural Design",
    subtitle: "Concept to Construction",
    description: "Concept development, schematic design, design development, and construction documentation for residential, commercial, and institutional projects. We craft buildings that are spatially resolved, technically sound, and contextually aware.",
    number: "01"
  },
  {
    title: "Interior Design",
    subtitle: "Spaces for Living",
    description: "Comprehensive interior design services from space planning and material selection to furniture specification and lighting design. We create interiors that are both functional and deeply considered.",
    number: "02"
  },
  {
    title: "Design Consultation",
    subtitle: "Expert Guidance",
    description: "Expert consultation at any stage of your project. Whether you need a second opinion on your design direction, help with planning regulations, or strategic advice on space utilisation, we provide clear and actionable guidance.",
    number: "03"
  },
  {
    title: "Turnkey Execution",
    subtitle: "Seamless Realization",
    description: "Complete project execution including contractor management, procurement, site supervision, and handover. We ensure design intent is maintained from drawing board to built reality.",
    number: "04"
  },
  {
    title: "Commercial Projects",
    subtitle: "Business Environments",
    description: "Offices, retail spaces, showrooms, hospitality venues, and mixed-use developments — we bring commercial intelligence and design excellence together for spaces that perform and inspire.",
    number: "05"
  },
  {
    title: "Residential Projects",
    subtitle: "Bespoke Homes",
    description: "Villas, apartments, row houses, and bespoke homes designed around the lives of the people who inhabit them. Every home we design is a reflection of its owners, shaped by function, culture, and craft.",
    number: "06"
  }
];

const Services = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.service-stacking-card');
      
      cards.forEach((card, index) => {
        if (index === cards.length - 1) return;
        
        gsap.to(card, {
          yPercent: -10,
          xPercent: -15,
          scale: 0.85,
          opacity: 0,
          rotation: -8,
          filter: "blur(15px)",
          scrollTrigger: {
            trigger: cards[index + 1],
            start: "top 70%", // Start blurring when next card is in the middle
            end: "top 20%",
            scrub: 1,
            onEnter: () => gsap.set(card, { pointerEvents: 'none' }),
            onLeaveBack: () => gsap.set(card, { pointerEvents: 'auto' }),
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative bg-[#fbf9e3] z-10 scroll-mt-24 pb-40" id="services">
      {/* Intro Header */}
      <div className="pt-48 pb-20 px-6 md:px-24 max-w-[1400px]">
        <div>
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[#ff4041] text-[10px] font-bold uppercase tracking-[0.5em]">Our Services</span>
            <div className="w-12 h-[1px] bg-[#ff4041]/30"></div>
          </div>
          <h2 className="text-4xl md:text-7xl font-serif leading-[1.1] mb-12 tracking-tight max-w-5xl">
            End-to-end design solutions &mdash; <br />
            <span className="italic text-[#ff4041]">from concept to completion.</span>
          </h2>
          
          <div className="max-w-3xl">
            <p className="text-lg md:text-xl text-black/60 font-light leading-relaxed">
              At The Open Room, we handle every stage of your project with precision and care. Whether you are
              envisioning a home, a commercial space, or a large-scale institutional project, our team brings together
              creative design, technical rigour, and seamless execution under one roof.
            </p>
          </div>
        </div>
      </div>

      {/* Stacking Cards Container */}
      <div className="flex flex-col items-center px-6 md:px-24">
        <div className="w-full max-w-6xl flex flex-col gap-4">
          {servicesData.map((service, index) => (
            <div 
              key={index}
              className="service-stacking-card sticky top-32 w-full bg-[#ff4041] p-10 md:p-16 text-white min-h-[40vh] md:min-h-[45vh] shadow-2xl relative overflow-hidden flex flex-col justify-center border border-white/10"
              style={{ zIndex: index + 1 }}
            >
              {/* Service Number Background */}
              <div className="absolute top-0 right-0 text-[10vw] font-bold text-white/15 select-none pointer-events-none translate-y-[-10%] translate-x-[5%]">
                {service.number}
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl md:text-4xl font-bold mb-2 tracking-tight">
                  {service.title}
                </h3>
                <p className="text-base md:text-lg italic mb-6 font-serif opacity-90">
                  {service.subtitle}
                </p>
                
                <div className="w-full h-[1px] bg-white/20 mb-6" />
                
                <p className="text-sm md:text-lg font-light leading-relaxed max-w-3xl opacity-90">
                  {service.description}
                </p>
                
                <div className="mt-8 flex justify-end">
                  <button className="group/btn flex items-center gap-4 text-[9px] font-bold uppercase tracking-[0.3em] hover:gap-6 transition-all duration-300">
                    <span>Explore Service</span>
                    <div className="w-8 h-[1px] bg-white transition-all group-hover/btn:w-12"></div>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
