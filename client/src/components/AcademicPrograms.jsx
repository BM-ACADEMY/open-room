import React, { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AcademicPrograms = () => {
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

      // Simple reveal for paragraph and items
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

      // Special card reveal
      gsap.from(".featured-card", {
        scale: 0.95,
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".featured-card",
          start: "top 85%",
          once: true
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="bg-[#fbf9e3] py-24 md:py-40 font-sans text-black overflow-hidden border-t border-black/5" 
      id="programs"
    >
      <div className="max-w-7xl mx-auto px-8 md:px-24">
        
        {/* Main Header Section */}
        <div className="mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-6 mb-12"
          >
            <div className="w-12 h-[1px] bg-[#ff4041]"></div>
            <span className="text-[#ff4041] text-[10px] font-bold uppercase tracking-[0.8em]">Academy Edtech</span>
          </motion.div>

          <h2 className="text-5xl md:text-8xl font-serif leading-[1.1] tracking-tight text-black perspective-1000 mb-16">
            <div className="overflow-hidden pb-4">
              <span className="reveal-line block">Where design education</span>
            </div>
            <div className="overflow-hidden pb-4">
              <span className="reveal-line block italic font-light text-[#ff4041]">
                meets real-world practice.
              </span>
            </div>
          </h2>

          <div className="max-w-4xl overflow-hidden">
            <p className="reveal-content text-black/70 text-lg md:text-2xl leading-relaxed font-light">
              The Open Room's education arm is built on a simple but powerful conviction: the best way to learn architecture 
              is to be immersed in it. Our programs are designed for students at critical junctures — from school-leavers 
              aspiring to study architecture, to college students seeking deeper industry exposure.
            </p>
          </div>
        </div>

        {/* NATA Featured Section - Red Premium Card */}
        <div className="mb-24">
          <div className="featured-card bg-[#ff4041] p-10 md:p-20 rounded-sm shadow-[0_40px_80px_rgba(255,64,65,0.2)] relative overflow-hidden group">
            <div className="relative z-10 max-w-3xl">
              <span className="text-white/60 text-[10px] font-bold uppercase tracking-[0.4em] mb-8 block">Featured Program</span>
              <h3 className="text-3xl md:text-6xl font-serif text-white mb-8 leading-tight tracking-tight">
                NATA Coaching & <br />Design Guidance
              </h3>
              <p className="text-white/80 text-lg md:text-xl leading-relaxed font-light mb-12">
                Our preparation program is structured to build spatial reasoning, drawing 
                skills, design thinking, and aesthetic sensibility. We go beyond exam prep — 
                we mentor students to understand what architecture truly means as a discipline.
              </p>
              <div className="flex flex-wrap gap-4 items-center">
                <span className="px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-widest">Class 11 & 12</span>
                <span className="px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-widest">Small Batches</span>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -right-20 -bottom-20 text-[30vw] font-bold text-white/5 select-none pointer-events-none">NATA</div>
          </div>
        </div>

        {/* College Collaborations Section */}
        <div className="mb-24 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
          <div className="overflow-hidden">
            <h3 className="reveal-content text-black text-3xl md:text-5xl font-serif leading-tight">
              Academic College <br />Collaborations
            </h3>
          </div>
          <div className="overflow-hidden">
            <p className="reveal-content text-black/70 text-lg md:text-xl font-light leading-relaxed">
              We partner with architecture colleges to bridge the gap between academic theory and 
              professional practice. Our programs include live studio visits, guest lectures, 
              joint workshops, and semester project mentorship. We bring the studio into the 
              classroom — and the classroom into the studio.
            </p>
          </div>
        </div>

        {/* Programs Detail Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-16 border-t border-black/5">
          {[
            {
              title: "NATA Preparation",
              desc: "Structured batches for Class 11 & 12 with mock tests, drawing labs, and one-on-one mentoring.",
              num: "01"
            },
            {
              title: "Portfolio Development",
              desc: "Guidance for students building portfolios for architecture school admissions.",
              num: "02"
            },
            {
              title: "College Partnerships",
              desc: "Workshops, live briefs, and mentorship sessions with partner institutions.",
              num: "03"
            }
          ].map((item, i) => (
            <div key={i} className="reveal-content group">
              <span className="text-[#ff4041] font-serif italic text-2xl mb-6 block">{item.num}</span>
              <h4 className="text-xl font-serif text-black mb-4 group-hover:text-[#ff4041] transition-colors duration-500">
                {item.title}
              </h4>
              <p className="text-black/60 font-light leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AcademicPrograms;
