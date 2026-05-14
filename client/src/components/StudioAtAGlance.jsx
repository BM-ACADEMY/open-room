import React, { useState, useLayoutEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AccordionItem = ({ title, content, isOpen, onClick, index }) => {
  return (
    <div className="reveal-accordion border-b border-black/10 last:border-none">
      <button 
        onClick={onClick}
        className="w-full py-8 md:py-10 flex justify-between items-center text-left group transition-all duration-300 cursor-pointer"
      >
        <div className="flex gap-6 md:gap-12 items-center">
          <span className="text-[#c5a47e] font-serif text-sm md:text-base opacity-40 group-hover:opacity-100 transition-opacity">0{index + 1}</span>
          <h3 className={`text-xl md:text-3xl font-serif tracking-tight transition-colors duration-300 ${isOpen ? "text-[#c5a47e]" : "text-[#1a1a1a]"}`}>
            {title}
          </h3>
        </div>
        <div className={`p-2 rounded-full transition-all duration-500 ${isOpen ? "bg-[#c5a47e] text-white rotate-180" : "bg-black/5 text-black"}`}>
          {isOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          )}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-10 pl-[4.5rem] md:pl-[6.5rem] pr-8 md:pr-24">
              <p className="text-base md:text-xl text-[#555] font-light leading-relaxed max-w-4xl">
                {content}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const StudioAtAGlance = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const containerRef = useRef(null);

  const points = [
    {
      title: "One of India's First",
      content: "Architecture studios integrated with an EdTech platform, pioneering a new model of practice and learning."
    },
    {
      title: "Full-Service Studio",
      content: "Design, consultation, and turnkey execution under one roof, providing comprehensive solutions from concept to completion."
    },
    {
      title: "NATA Specialists",
      content: "Dedicated coaching for Class 11 & 12 architecture aspirants, focusing on spatial reasoning and design thinking."
    },
    {
      title: "Chennai Based",
      content: "Serving clients across Tamil Nadu and pan-India with a deep understanding of local context and global standards."
    },
    {
      title: "Academic Partners",
      content: "Active collaborations with architecture colleges to bridge the gap between academic theory and professional practice."
    },
    {
      title: "Design Philosophy",
      content: "Nothing is random — every decision is informed and intentional, rooted in architectural rigor and user experience."
    }
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal-accordion", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="at-a-glance" className="bg-[#eeeeee] py-24 md:py-40 font-sans text-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-8 md:px-24">
        
        {/* Header Section */}
        <div className="mb-20 md:mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-10 h-[1px] bg-[#c5a47e]"></div>
            <span className="text-[#c5a47e] text-[10px] font-bold uppercase tracking-[0.4em]">Overview</span>
          </motion.div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight uppercase mb-8">
            STUDIO AT A GLANCE
          </h1>
        </div>

        {/* Accordion List */}
        <div className="border-t border-black/10">
          {points.map((item, index) => (
            <AccordionItem 
              key={index}
              index={index}
              title={item.title}
              content={item.content}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudioAtAGlance;
