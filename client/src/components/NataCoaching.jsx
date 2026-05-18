import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Counter = ({ value, duration = 2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  // Parse the number from the string (e.g., "95%+" -> 95)
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
  const suffix = value.replace(/[0-9]/g, '');

  const spring = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  const displayValue = useTransform(spring, (current) => 
    Math.round(current) + suffix
  );

  useEffect(() => {
    if (isInView) {
      spring.set(numericValue);
    }
  }, [isInView, spring, numericValue]);

  return <motion.span ref={ref}>{displayValue}</motion.span>;
};

const NataCoaching = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Heading Mask Reveal
      const headingLines = containerRef.current.querySelectorAll(".reveal-line");
      headingLines.forEach((line, i) => {
        gsap.from(line, {
          yPercent: 100,
          rotateX: 45,
          opacity: 0,
          duration: 1.2,
          ease: "power4.out",
          delay: i * 0.1,
          scrollTrigger: {
            trigger: line,
            start: "top 95%",
            once: true
          },
        });
      });

      // Simple reveal for content
      gsap.from(".reveal-content", {
        y: 40,
        opacity: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".reveal-content",
          start: "top 90%",
          once: true
        },
      });
      // Section label reveal (replaces Framer Motion whileInView)
      gsap.from(".nata-section-label", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".nata-section-label",
          start: "top 95%",
          once: true,
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const features = [
    "Comprehensive NATA syllabus coverage",
    "Expert faculty with industry experience",
    "Regular mock tests & assessments",
    "Personalized mentoring sessions",
    "Portfolio development guidance",
    "Small batch sizes for better attention"
  ];



  return (
    <section 
      ref={containerRef} 
      className="bg-[#fbf9e3] py-20 md:py-28 font-sans text-black overflow-hidden border-t border-black/5" 
      
    >
      <div className="max-w-7xl mx-auto px-8 md:px-24">
        {/* Top Content - Centered */}
        <div className="mb-16 md:mb-20 flex flex-col items-center text-center">
          <div className="nata-section-label flex items-center gap-6 mb-8">
            <div className="w-12 h-[1px] bg-[#ff4041]"></div>
            <span className="text-[#ff4041] text-[10px] font-bold uppercase tracking-[0.8em]">Educational Wing</span>
            <div className="w-12 h-[1px] bg-[#ff4041]"></div>
          </div>

          <h2 className="text-4xl md:text-7xl font-serif leading-[1.1] tracking-tight text-black mb-10">
            <div className="overflow-hidden pb-2">
              <span className="reveal-line block">NATA Coaching</span>
            </div>
            <div className="overflow-hidden pb-2">
              <span className="reveal-line block italic font-light text-[#ff4041]">Excellence.</span>
            </div>
          </h2>

          <p className="reveal-content text-black/70 text-lg md:text-2xl leading-relaxed font-light mb-12 max-w-3xl mx-auto">
            Unlock your potential with our specialized NATA coaching program. 
            Our structured curriculum and experienced mentors guide aspiring architects 
            toward success in the National Aptitude Test in Architecture.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-12 w-full">
            {features.map((feature, i) => (
              <div key={i} className="reveal-content flex items-center justify-center gap-4 group">
                <div className="w-6 h-6 rounded-full border border-[#ff4041]/20 flex items-center justify-center shrink-0 group-hover:bg-[#ff4041] group-hover:border-[#ff4041] transition-all duration-500">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-[#ff4041] group-hover:text-white transition-colors duration-500">
                    <path d="M20 6L9 17L4 12" />
                  </svg>
                </div>
                <span className="text-[14px] text-black/80 font-medium tracking-tight whitespace-nowrap">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NataCoaching;
