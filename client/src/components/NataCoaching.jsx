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

  const stats = [
    { 
      label: "Success Rate", 
      value: "95%+", 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      )
    },
    { 
      label: "Students Trained", 
      value: "500+", 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    },
    { 
      label: "College Admissions", 
      value: "50+", 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9 12 4l9 5v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
          <path d="M9 22V12h6v10" />
        </svg>
      )
    },
    { 
      label: "Years Experience", 
      value: "10+", 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      )
    }
  ];

  return (
    <section 
      ref={containerRef} 
      className="bg-[#fbf9e3] py-20 md:py-28 font-sans text-black overflow-hidden border-t border-black/5" 
      
    >
      <div className="max-w-7xl mx-auto px-8 md:px-24">
        {/* Top Content - Centered */}
        <div className="mb-16 md:mb-20 flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-6 mb-8"
          >
            <div className="w-12 h-[1px] bg-[#ff4041]"></div>
            <span className="text-[#ff4041] text-[10px] font-bold uppercase tracking-[0.8em]">Educational Wing</span>
            <div className="w-12 h-[1px] bg-[#ff4041]"></div>
          </motion.div>

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

        {/* Bottom Stats Grid - Centered items with Animated Counters */}
        <div className="stat-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 pt-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="group relative pt-8 flex flex-col items-center text-center"
            >
              <h3 className="text-5xl md:text-6xl font-serif mb-4 tracking-tighter text-black group-hover:text-[#ff4041] transition-colors duration-500">
                <Counter value={stat.value} />
              </h3>
              
              <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-black/40 group-hover:text-black/80 transition-colors duration-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NataCoaching;
