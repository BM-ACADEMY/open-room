import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ModelMatters = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading Reveal
      const headingLines = sectionRef.current.querySelectorAll(".mm-reveal-line");
      headingLines.forEach((line, i) => {
        gsap.from(line, {
          y: 50,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          delay: i * 0.1,
          scrollTrigger: {
            trigger: line,
            start: "top 95%",
            once: true
          },
        });
      });

      // Paragraph Reveal
      gsap.from(".mm-reveal-para", {
        y: 30,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".mm-reveal-para",
          start: "top 90%",
          once: true
        },
      });



      // Infinite Looping Watermark
      const watermark = sectionRef.current.querySelector(".bg-watermark-wrapper");
      if (watermark) {
        gsap.to(watermark, {
          xPercent: -50,
          repeat: -1,
          duration: 30,
          ease: "none",
        });
      }

      // Pillars staggered reveal
      gsap.from(".mm-pillar-item", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".mm-pillars-grid",
          start: "top 90%",
          once: true
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#fbf9e3] text-black py-20 md:py-32 px-8 md:px-24 relative overflow-hidden flex flex-col justify-center border-t border-black/5"
    >
      {/* Background Watermark */}
      <div className="bg-watermark-wrapper absolute top-1/2 left-0 flex whitespace-nowrap z-0 pointer-events-none select-none opacity-[0.03]">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="text-[15vw] md:text-[20vw] font-bold uppercase tracking-tighter pr-20"
          >
            The Open Room
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 text-center">
        <div className="mb-24 flex flex-col items-center">
          <h2 className="text-5xl md:text-8xl font-serif mb-16 leading-[1.2] tracking-tight text-black perspective-1000">
            <div className="overflow-hidden pb-4 mb-2">
              <span className="mm-reveal-line block">Why this</span>
            </div>
            <div className="overflow-hidden pb-4">
              <span className="mm-reveal-line block italic font-light text-[#ff4041]">
                model matters.
              </span>
            </div>
          </h2>

          <div className="max-w-4xl mx-auto text-center overflow-hidden">
            <p className="mm-reveal-para text-black/70 text-lg md:text-2xl leading-relaxed font-light">
              In a country where architecture education and professional
              practice remain largely siloed, The Open Room bridges that divide.
              Students learn within a live studio environment. Professionals
              grow by engaging with curious minds. Clients benefit from a team
              that is constantly evolving, researching, and thinking critically
              about space, design, and the built environment.
            </p>
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="mm-pillars-grid grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl text-left items-start mx-auto">
          {[
            {
              title: "Integrated Thinking",
              desc: "Design and education inform each other constantly, ensuring every project is backed by research.",
              num: "01",
            },
            {
              title: "Live Studio Learning",
              desc: "Students work alongside real projects, gaining practical experience that traditional classrooms can't provide.",
              num: "02",
            },
            {
              title: "Community of Makers",
              desc: "A growing network of architects, students, and thinkers pushing the boundaries of built form.",
              num: "03",
            },
          ].map((pillar, i) => (
            <div
              key={i}
              className="mm-pillar-item group relative p-10 md:p-12 rounded-sm bg-[#ff4041] shadow-[0_20px_50px_rgba(255,64,65,0.15)] hover:shadow-[0_40px_80px_rgba(255,64,65,0.25)] border border-white/10"
            >
              <span className="text-[10px] font-bold text-white/60 mb-6 block tracking-[0.4em]">
                PILLAR {pillar.num}
              </span>

              <h3 className="text-white text-2xl md:text-3xl font-serif mb-6 leading-tight">
                {pillar.title}
              </h3>
              <p className="text-white/80 text-base md:text-lg font-light leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default ModelMatters;
