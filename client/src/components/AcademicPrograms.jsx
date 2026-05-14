import React, { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AcademicPrograms = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal-item", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-[#f8f7f5] min-h-screen py-20 md:py-32 font-sans text-[#1a1a1a] overflow-hidden" id="programs">
      <div className="max-w-7xl mx-auto px-8 md:px-24">
        
        {/* Main Header Section */}
        <div className="mb-20 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-10 h-[1px] bg-[#c5a47e]"></div>
            <span className="text-[#c5a47e] text-[10px] font-bold uppercase tracking-[0.4em]">Academy Edtech</span>
          </motion.div>

          <h2 className="reveal-item text-2xl md:text-3xl font-bold tracking-tight uppercase mb-4 leading-tight">
            EDTECH & ACADEMIC PROGRAMS
          </h2>

          <h1 className="reveal-item text-4xl md:text-6xl font-serif leading-[1.1] text-black mt-8 mb-8 tracking-tight">
            Where design education meets <br />
            <span className="italic text-[#c5a47e]">real-world practice.</span>
          </h1>

          <div className="reveal-item h-[1px] bg-black/10 w-full mb-10"></div>

          <p className="reveal-item text-lg md:text-xl text-[#555] font-light leading-relaxed max-w-4xl">
            The Open Room's education arm is built on a simple but powerful conviction: the best way to learn architecture 
            is to be immersed in it. Our programs are designed for students at critical junctures — from school-leavers 
            aspiring to study architecture, to college students seeking deeper industry exposure.
          </p>
        </div>

        {/* NATA Featured Section - Centered Card */}
        <div className="flex justify-center mb-24 md:mb-32">
          <div className="reveal-item w-full max-w-4xl">
            <div className="bg-white p-8 md:p-16 border border-black/5 shadow-[0_20px_50px_rgba(0,0,0,0.03)] rounded-sm relative">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#c5a47e]"></div>
              
              <h3 className="text-2xl md:text-4xl font-serif mb-4">NATA Coaching & <br />Design Guidance</h3>
              <p className="text-[#c5a47e] italic text-lg mb-8 font-serif">For Class 11 & 12 Students</p>
              
              <p className="text-[#666] text-lg md:text-xl leading-relaxed font-light mb-10">
                Our NATA preparation program is structured to build spatial reasoning, drawing 
                skills, design thinking, and aesthetic sensibility in young aspirants. We go 
                beyond exam prep — we mentor students to understand what architecture truly 
                means as a discipline and a career. Small batches ensure personalised attention 
                and rapid skill development.
              </p>
            </div>
          </div>
        </div>

        {/* College Collaborations Section */}
        <div className="mb-24 md:mb-32">
          <div className="reveal-item flex flex-col md:flex-row gap-8 md:gap-16 items-start mb-12">
            <h3 className="text-[#1a1a1a] text-2xl md:text-4xl font-serif max-w-sm shrink-0 leading-tight">
              Academic College <br />Collaborations
            </h3>
            <p className="text-lg md:text-xl text-[#555] font-light leading-relaxed">
              The Open Room actively partners with architecture colleges to bridge the gap between academic theory and 
              professional practice. Our collaboration programs include live studio visits, guest lectures by practising 
              architects, joint design workshops, and semester project mentorship. We bring the studio into the classroom — 
              and the classroom into the studio.
            </p>
          </div>
        </div>

        {/* Programs Detail Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-16 border-t border-black/10">
          {[
            {
              title: "NATA Preparation",
              desc: "Structured batches for Class 11 & 12 with mock tests, drawing labs, and one-on-one mentoring."
            },
            {
              title: "Portfolio Development",
              desc: "Guidance for students building portfolios for architecture school admissions."
            },
            {
              title: "College Partnership Program",
              desc: "Workshops, live briefs, and mentorship sessions with partner institutions."
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="group"
            >
              <div className="mb-6 overflow-hidden h-[1px]">
                <motion.div 
                  initial={{ x: "-100%" }}
                  whileInView={{ x: 0 }}
                  transition={{ delay: i * 0.2, duration: 1.5, ease: "circOut" }}
                  className="w-full h-full bg-[#c5a47e]/30 group-hover:bg-[#c5a47e] transition-colors"
                ></motion.div>
              </div>
              <h4 className="text-lg font-serif text-[#1a1a1a] mb-3 group-hover:text-[#c5a47e] transition-colors">
                {item.title}
              </h4>
              <p className="text-sm md:text-base text-[#666] font-light leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AcademicPrograms;

