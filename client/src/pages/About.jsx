import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ModelMatters from '../components/ModelMatters';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Premium Mask Reveal for Heading
      const headingLines = sectionRef.current.querySelectorAll('.reveal-line');
      headingLines.forEach((line, i) => {
        gsap.from(line, {
          yPercent: 100,
          opacity: 0,
          rotateX: 45,
          duration: 1.5,
          ease: "power4.out",
          delay: i * 0.15,
          scrollTrigger: {
            trigger: line,
            start: "top 90%",
          }
        });
      });

      // Smooth reveal for the main paragraph
      gsap.from(".reveal-para-text", {
        y: 40,
        opacity: 0,
        duration: 1.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".reveal-para-text",
          start: "top 85%",
        }
      });

      // Dramatic Peel Animation (Old Stack Style)
      const stackingCards = sectionRef.current.querySelectorAll('.stacking-card');
      stackingCards.forEach((card, index) => {
        if (index === stackingCards.length - 1) return;
        
        gsap.to(card, {
          yPercent: -10,
          xPercent: -15,
          scale: 0.85,
          opacity: 0,
          rotation: -8,
          filter: "blur(15px)",
          scrollTrigger: {
            trigger: stackingCards[index + 1],
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
            onEnter: () => gsap.set(card, { pointerEvents: 'none' }),
            onLeaveBack: () => gsap.set(card, { pointerEvents: 'auto' }),
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="bg-[#fbf9e3]">
      {/* What We Do - Typography Focused */}
      <section id="about" className="min-h-[70vh] flex flex-col justify-center items-center px-6 md:px-24 py-20 md:py-28 overflow-hidden relative border-b border-black/5">
        <div className="max-w-6xl text-center relative z-10">
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-[#ff4041] text-[10px] font-bold uppercase tracking-[0.8em] mb-8 block"
          >
            About Us
          </motion.span>
                    <h2 className="text-4xl md:text-7xl font-serif mb-10 md:mb-12 leading-[1.2] tracking-tight text-black perspective-1000">
            <div className="overflow-hidden pb-4 mb-2">
              <span className="reveal-line block">Bridging the gap between</span>
            </div>
            <div className="overflow-hidden pb-4 mb-2">
              <span className="reveal-line block italic font-light text-[#ff4041]">architectural practice</span>
            </div>
            <div className="overflow-hidden pb-4">
              <span className="reveal-line block">
                <span className="font-light">&</span> <span className="text-[#ff4041]">design education.</span>
              </span>
            </div>
          </h2>

          <div className="max-w-4xl mx-auto text-center overflow-hidden">
            <p className="reveal-para-text text-black/70 text-lg md:text-2xl leading-relaxed font-light">
              The Open Room is a pioneering design practice based in Chennai that uniquely bridges the gap between professional architectural execution and design education. We believe that learning and doing are not separate pursuits — they are deeply interconnected. Our studio operates simultaneously as a full-service architecture and interior design firm and as a structured educational platform, creating a dynamic environment where real-world projects inspire better learning, and education fuels sharper design thinking.
            </p>
          </div>
        </div>
      </section>

      {/* Old Stack Animation Sections */}
      <section className="bg-[#fbf9e3] py-12 md:py-20 px-6 md:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col gap-4">
            {/* Card 1 */}
            <div className="stacking-card sticky top-32 w-full bg-[#ff4041] p-12 md:p-24 shadow-2xl border border-white/10 group min-h-[400px] flex flex-col justify-center rounded-sm">
              <div className="max-w-2xl relative z-10">
                <h3 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">Design Practice</h3>
                <p className="text-white/90 text-lg md:text-xl leading-relaxed font-light">
                  A full-service studio delivering architectural design, interior projects, and turnkey execution across residential and commercial sectors in Chennai and beyond.
                </p>
              </div>
              <div className="absolute -right-10 -bottom-10 text-[15vw] font-bold text-white/15 select-none">01</div>
            </div>

            {/* Card 2 */}
            <div className="stacking-card sticky top-36 w-full bg-[#ff4041] p-12 md:p-24 shadow-2xl border border-white/10 group min-h-[400px] flex flex-col justify-center rounded-sm">
              <div className="max-w-2xl relative z-10">
                <h3 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">Education Platform</h3>
                <p className="text-white/90 text-lg md:text-xl leading-relaxed font-light">
                  A structured EdTech arm offering NATA coaching, design guidance for students, and collaborative academic programs with architecture colleges.
                </p>
              </div>
              <div className="absolute -right-10 -bottom-10 text-[15vw] font-bold text-white/15 select-none">02</div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy / Model Matters integration */}
      <ModelMatters />
    </div>
  );
};

export default About;
