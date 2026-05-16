import React, { useState, useLayoutEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AccordionItem = ({ title, content, isOpen, onClick, index }) => {
  return (
    <div className="reveal-accordion border-b border-black/5 last:border-none">
      <button 
        onClick={onClick}
        className="w-full py-8 md:py-12 flex justify-between items-start text-left group transition-all duration-300 cursor-pointer"
      >
        <div className="flex gap-6 md:gap-12 items-start">
          <span className="text-[#ff4041] font-serif text-sm md:text-base opacity-40 group-hover:opacity-100 transition-opacity mt-1">
            {index < 9 ? `0${index + 1}` : index + 1}
          </span>
          <h3 className={`text-xl md:text-3xl font-serif tracking-tight transition-colors duration-300 ${isOpen ? "text-[#ff4041]" : "text-black"}`}>
            {title}
          </h3>
        </div>
        <div className={`p-2 rounded-full transition-all duration-500 mt-1 shrink-0 ${isOpen ? "bg-[#ff4041] text-white rotate-180" : "bg-black/5 text-black"}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isOpen ? <line x1="5" y1="12" x2="19" y2="12"></line> : <><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></>}
          </svg>
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
            <div className="pb-12 pl-[4.5rem] md:pl-[6.5rem] pr-8 md:pr-24">
              <div 
                className="text-base md:text-xl text-black/60 font-sans font-light leading-relaxed max-w-4xl"
                dangerouslySetInnerHTML={{ __html: content.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-[#ff4041] underline">$1</a>') }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const containerRef = useRef(null);

  const faqItems = [
    {
      title: "What is The Open Room?",
      content: "The Open Room is a contemporary architecture studio engaging with architecture, interiors, spatial exploration, and creative learning initiatives."
    },
    {
      title: "What services does The Open Room offer?",
      content: "We work across architectural design, interior design, conceptual development, spatial planning, NATA coaching, and academic collaborations."
    },
    {
      title: "Does The Open Room conduct workshops for schools and students?",
      content: "Yes. We are developing interactive workshops focused on creativity, spatial thinking, observation, and design exploration for students."
    },
    {
      title: "Where is The Open Room based?",
      content: "The Open Room is based in Chennai, India."
    },
    {
      title: "How can I collaborate or get in touch?",
      content: "You can reach us through our contact page or write to us at [info@theopenroom.in](mailto:info@theopenroom.in)."
    }
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal-accordion", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true,
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="faq" className="bg-[#fbf9e3] py-24 md:py-40 font-sans text-black border-t border-black/5">
      <div className="max-w-7xl mx-auto px-8 md:px-24">
        
        {/* Centered Header Style */}
        <div className="mb-24 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-6 mb-12"
          >
            <div className="w-12 h-[1px] bg-[#ff4041]"></div>
            <span className="text-[#ff4041] text-[10px] font-bold uppercase tracking-[0.8em]">
              Common Inquiries
            </span>
            <div className="w-12 h-[1px] bg-[#ff4041]"></div>
          </motion.div>

          <h3 className="text-black text-4xl md:text-7xl font-serif leading-tight">
            Frequently Asked <br />
            <span className="italic font-light text-[#ff4041]">Questions.</span>
          </h3>
        </div>

        {/* Accordion List */}
        <div className="border-t border-black/5 max-w-5xl mx-auto">
          {faqItems.map((item, index) => (
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

export default FAQ;
