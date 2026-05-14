import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ModelMatters from '../components/ModelMatters';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal Timeline (Faster and more responsive)
      const revealTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#about",
          start: "top 70%",
          end: "top 10%", // Finishes much sooner
          scrub: 1,
        }
      });

      revealTl.fromTo(imageRef.current, 
        { scale: 1.1, opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' },
        { scale: 1, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: "none" }
      )
      .to(".reveal-tag", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, 0)
      .to(".reveal-heading", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
      }, 0.2)
      .to(".reveal-para", {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1,
        ease: "none"
      }, 0.4);
      // Dynamic Slide-Out Stacking Effect
      const stackingCards = sectionRef.current.querySelectorAll('.stacking-card');
      stackingCards.forEach((card, index) => {
        if (index === stackingCards.length - 1) return;
        
        gsap.to(card, {
          xPercent: -20, // Subtle slide out
          scale: 0.8,
          opacity: 0,
          rotation: -5, // Slight tilt
          filter: "blur(10px)",
          scrollTrigger: {
            trigger: stackingCards[index + 1],
            start: "top 95%",
            end: "top 10%",
            scrub: true,
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="bg-[#fafafa]">
      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center py-24 md:py-0 px-12 md:px-40 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 overflow-hidden relative">
        <div className="md:col-span-5 relative" ref={imageRef}>
          <div className="aspect-[3/4] relative z-10 overflow-hidden shadow-2xl">
            <img src="/assets/arch1.png" className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-1000" alt="About" />
          </div>
          <div className="absolute top-8 md:top-12 -left-8 md:-left-12 w-full h-full border-[1px] border-gold/30 -z-0"></div>
        </div>
        
        <div className="md:col-span-7 flex flex-col justify-center" ref={textRef}>
          <span className="reveal-tag text-gold text-[10px] font-bold uppercase tracking-[0.6em] mb-8 block opacity-0 translate-y-4">
            WHAT WE DO
          </span>
          <h2 className="reveal-heading text-4xl md:text-6xl font-serif mb-12 leading-tight tracking-tight opacity-0 translate-y-8">
            One of India's first <span className="italic font-light">architecture studios</span> integrated with <span className="text-gold">EdTech</span>.
          </h2>
          <div className="space-y-6">
            <p className="reveal-para text-gray-600 text-lg md:text-xl leading-relaxed font-light opacity-0 will-change-transform will-change-opacity">
              The Open Room is a pioneering design practice based in Chennai that uniquely bridges the gap between professional architectural execution and design education.
            </p>
            <p className="reveal-para text-gray-500 text-base md:text-lg leading-relaxed font-light opacity-0">
              We believe that learning and doing are not separate pursuits — they are deeply interconnected. Our studio operates simultaneously as a full-service architecture and interior design firm and as a structured educational platform, creating a dynamic environment where real-world projects inspire better learning, and education fuels sharper design thinking.
            </p>
          </div>
        </div>
      </section>


      {/* Stacking Cards Section */}
      <section className="bg-[#fafafa] py-24 md:py-40 px-12 md:px-40">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col gap-20">
            {/* Card 1 */}
            <div className="stacking-card sticky top-40 w-full bg-[#ff4d4d] p-12 md:p-24 rounded-sm min-h-[400px] flex flex-col justify-center shadow-2xl border border-white/10 group transition-transform duration-700">
              <div className="max-w-2xl">
                <h3 className="text-4xl md:text-6xl font-serif text-white mb-8">Design Practice</h3>
                <p className="text-white/90 text-lg md:text-xl leading-relaxed font-light">
                  A full-service studio delivering architectural design, interior projects, and turnkey execution across residential and commercial sectors in Chennai and beyond.
                </p>
                <div className="mt-12 w-12 h-[1px] bg-white/30 group-hover:w-24 transition-all duration-500"></div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="stacking-card sticky top-48 w-full bg-[#ff3333] p-12 md:p-24 rounded-sm min-h-[400px] flex flex-col justify-center shadow-2xl border border-white/10 group transition-transform duration-700">
              <div className="max-w-2xl">
                <h3 className="text-4xl md:text-6xl font-serif text-white mb-8">Education Platform</h3>
                <p className="text-white/90 text-lg md:text-xl leading-relaxed font-light">
                  A structured EdTech arm offering NATA coaching, design guidance for students, and collaborative academic programs with architecture colleges.
                </p>
                <div className="mt-12 w-12 h-[1px] bg-white/30 group-hover:w-24 transition-all duration-500"></div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <ModelMatters />
    </div>
  );
};

export default About;
