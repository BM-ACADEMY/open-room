import React, { useLayoutEffect, useRef, useEffect } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Counter = ({ value, duration = 2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const numericValue = parseInt(value.replace(/[^0-9]/g, ""));
  const suffix = value.replace(/[0-9]/g, "");

  const spring = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  const displayValue = useTransform(
    spring,
    (current) => Math.round(current) + suffix,
  );

  useEffect(() => {
    if (isInView) {
      spring.set(numericValue);
    }
  }, [isInView, spring, numericValue]);

  return <motion.span ref={ref}>{displayValue}</motion.span>;
};

const Collaborations = () => {
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
            once: true,
          },
        });
      });

      // Reveal items individually - Faster and snappier
      const revealItems = containerRef.current.querySelectorAll(".reveal-content");
      revealItems.forEach((item, i) => {
        gsap.from(item, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power4.out",
          scrollTrigger: {
            trigger: item,
            start: "top 95%",
            once: true,
          },
        });
      });
      // Section label reveals (replaces Framer Motion whileInView)
      const sectionLabels = containerRef.current.querySelectorAll(".collab-section-label");
      sectionLabels.forEach((label) => {
        gsap.from(label, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: label,
            start: "top 95%",
            once: true,
          },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="bg-[#fbf9e3] py-16 md:py-24 font-sans text-black overflow-hidden border-t border-black/5"
      id="programs"
    >
      <div className="max-w-7xl mx-auto px-8 md:px-24">
        {/* College Collaborations Section - Centered Excellence Style */}
        <div className="mb-12 md:mb-16 flex flex-col items-center text-center">
          <div className="collab-section-label flex items-center gap-6 mb-8">
            <div className="w-12 h-[1px] bg-[#ff4041]"></div>
            <span className="text-[#ff4041] text-[10px] font-bold uppercase tracking-[0.8em]">
              Academic Collaborations
            </span>
            <div className="w-12 h-[1px] bg-[#ff4041]"></div>
          </div>

          <h3 className="reveal-content text-black text-4xl md:text-7xl font-serif leading-tight mb-12">
            Academic College <br />
            <span className="italic font-light text-[#ff4041]">Collaborations.</span>
          </h3>

          <div className="overflow-hidden max-w-4xl mx-auto">
            <p className="reveal-content text-black/70 text-lg md:text-xl font-light leading-relaxed">
              We partner with architecture colleges to bridge the gap between
              academic theory and professional practice. Our programs include
              live studio visits, guest lectures, joint workshops, and semester
              project mentorship. We bring the studio into the classroom — and
              the classroom into the studio.
            </p>
          </div>
        </div>

        {/* College Collaborations Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {[
            {
              title: "Academic Partnerships",
              desc: "Strategic alliances with leading architecture and design colleges for curriculum development, workshops, and student exchange programs.",
              tags: ["Guest lectures", "Industry exposure", "Joint research"],
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9 12 4l9 5v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                  <path d="M9 22V12h6v10" />
                </svg>
              )
            },
            {
              title: "Internship Programs",
              desc: "Providing hands-on experience to architecture students through structured internship opportunities at our firm.",
              tags: ["Real project experience", "Mentorship", "Career guidance"],
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              )
            },
            {
              title: "Workshop & Seminars",
              desc: "Regular workshops and seminars on contemporary design trends, software training, and professional development.",
              tags: ["Design trends", "Software labs", "Industry talks"],
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" x2="22" y1="12" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              )
            },
            {
              title: "Industry Connect",
              desc: "Bridging the gap between academia and industry through collaborative projects and placement assistance.",
              tags: ["Live projects", "Placement aid", "Networking"],
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              )
            }
          ].map((item, i) => (
            <div 
              key={i} 
              className="reveal-content bg-[#ff4041] p-10 rounded-xl shadow-[0_20px_50px_rgba(255,64,65,0.15)] border border-white/10 hover:shadow-[0_30px_70px_rgba(255,64,65,0.3)] transition-all duration-700 group"
            >
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-white text-[#ff4041] transition-colors duration-500 shrink-0 border border-white/20">
                  {item.icon}
                </div>
                <div className="flex flex-col gap-4">
                  <h4 className="text-2xl font-serif text-white mb-2">
                    {item.title}
                  </h4>
                  <p className="text-white/80 font-light leading-relaxed text-sm md:text-base">
                    {item.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {item.tags.map((tag, j) => (
                      <span 
                        key={j} 
                        className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10 bg-white text-[#ff4041] transition-all duration-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Our Vision & Stats Section - Matching Header Style */}
        <div className="mt-20 pt-20 border-t border-black/5 flex flex-col items-center text-center">
          <div className="collab-section-label flex items-center gap-6 mb-12">
            <div className="w-12 h-[1px] bg-[#ff4041]"></div>
            <span className="text-[#ff4041] text-[10px] font-bold uppercase tracking-[0.8em]">
              Our Vision
            </span>
            <div className="w-12 h-[1px] bg-[#ff4041]"></div>
          </div>

          <div className="overflow-hidden max-w-4xl mx-auto mb-20">
            <p className="reveal-content font-sans text-black/70 text-lg md:text-xl font-light leading-relaxed">
              At THE OPEN ROOM, we believe in the transformative power of design and education. 
              Our leadership combines decades of architectural expertise with a passion for 
              nurturing the next generation of designers. Together, we are committed to 
              creating spaces that inspire and minds that innovate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24 w-full py-12">
            {[
              { label: "Completed Projects", value: "25+" },
              { label: "Students Mentored", value: "250+" },
              { label: "College Collaborations", value: "5+" },
            ].map((stat, i) => (
              <div key={i} className="reveal-content flex flex-col items-center group">
                <span className="text-6xl md:text-8xl font-serif mb-6 text-black group-hover:text-[#ff4041] transition-colors duration-500">
                  <Counter value={stat.value} />
                </span>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-black/40">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collaborations;
