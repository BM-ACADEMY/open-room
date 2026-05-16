import React, { useLayoutEffect, useRef} from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BackgroundShapes = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {/* Lightweight CSS shapes instead of a full Three.js Canvas */}
    <div className="absolute -top-20 -left-20 w-40 h-40 border border-[#ff4041]/10 rotate-45 rounded-sm" />
    <div className="absolute top-1/3 -right-16 w-32 h-32 border border-black/5 rotate-12 rounded-full" />
    <div className="absolute bottom-20 left-1/4 w-24 h-24 border border-[#ff4041]/8 -rotate-12 rounded-sm" />
    <div className="absolute top-1/4 right-1/3 w-20 h-20 border border-black/5 rotate-45 rounded-full" />
  </div>
);



const AcademicPrograms = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Heading Mask Reveal
      const headingLines =
        containerRef.current.querySelectorAll(".reveal-line");
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
            once: true,
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
          once: true,
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
          once: true,
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);


  return (
    <section
      ref={containerRef}
      id="nata-excellence"
      className="bg-[#fbf9e3] py-16 md:py-24 font-sans text-black overflow-hidden border-t border-black/5 relative"
    >
      <BackgroundShapes />
      <div className="max-w-7xl mx-auto px-8 md:px-24">
        {/* Main Header Section - Centered Excellence Style */}
        <div className="mb-12 md:mb-16 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-6 mb-8"
          >
            <div className="w-12 h-[1px] bg-[#ff4041]"></div>
            <span className="text-[#ff4041] text-[10px] font-bold uppercase tracking-[0.8em]">
              NATA Coaching
            </span>
            <div className="w-12 h-[1px] bg-[#ff4041]"></div>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-serif leading-[1.1] tracking-tight text-black perspective-1000 mb-8 md:mb-12">
            <div className="overflow-hidden pb-4">
              <span className="reveal-line block">Where design education</span>
            </div>
            <div className="overflow-hidden pb-4">
              <span className="reveal-line block italic font-light text-[#ff4041]">
                meets real-world practice.
              </span>
            </div>
          </h2>

          <div className="max-w-4xl overflow-hidden mx-auto">
            <p className="reveal-content text-black/70 text-lg md:text-2xl leading-relaxed font-light text-center">
              The Open Room's education arm is built on a simple but powerful
              conviction: the best way to learn architecture is to be immersed
              in it. Our programs are designed for students at critical
              junctures — from school-leavers aspiring to study architecture, to
              college students seeking deeper industry exposure.
            </p>
          </div>
        </div>

        {/* NATA Featured Section - Red Premium Card */}
        <div className="mb-20">
          <div className="featured-card bg-[#ff4041] p-10 md:p-20 rounded-sm shadow-[0_40px_80px_rgba(255,64,65,0.2)] relative overflow-hidden group">
            <div className="relative z-10 max-w-3xl">
              <span className="text-white/60 text-[10px] font-bold uppercase tracking-[0.4em] mb-8 block">
                Featured Program
              </span>
              <h3 className="text-3xl md:text-6xl font-serif text-white mb-8 leading-tight tracking-tight">
                NATA Coaching & <br />
                Design Guidance
              </h3>
              <p className="text-white/80 text-lg md:text-xl leading-relaxed font-light mb-12">
                Our preparation program is structured to build spatial reasoning,
                drawing skills, design thinking, and aesthetic sensibility. We
                go beyond exam prep — we mentor students to understand what
                architecture truly means as a discipline.
              </p>
              <div className="flex flex-wrap gap-4 items-center">
                <span className="px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-widest">
                  Class 11 & 12
                </span>
                <span className="px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-widest">
                  Small Batches
                </span>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -right-20 -bottom-20 text-[30vw] font-bold text-white/5 select-none pointer-events-none">
              NATA
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademicPrograms;
