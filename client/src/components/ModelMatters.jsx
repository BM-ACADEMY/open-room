import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ModelMatters = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main text reveal - Optimized (Removed blur for performance)
      gsap.from(".reveal-text", {
        y: 60,
        opacity: 0,
        skewY: 3,
        duration: 1.5,
        ease: "power4.out",
        stagger: 0.1,
        force3D: true, // Hardware acceleration
        scrollTrigger: {
          trigger: ".reveal-text",
          start: "top 90%",
        },
      });

      // Animate the gold underline
      gsap.from(".model-underline", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.2,
        ease: "power3.inOut",
        delay: 0.4,
        force3D: true,
        scrollTrigger: {
          trigger: ".reveal-text",
          start: "top 85%",
        },
      });

      // Architectural Grid Drawing - Optimized
      gsap.from(".grid-line", {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.5,
        stagger: 0.2,
        ease: "power2.inOut",
        force3D: true,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        }
      });

      // Background blueprints - Optimized scrubbing
      gsap.to(".bg-blueprint-left", {
        y: -100,
        rotation: 4,
        force3D: true,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1, // Faster scrub = less lag
        },
      });

      gsap.to(".bg-blueprint-right", {
        y: 100,
        rotation: -4,
        force3D: true,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Subtle float animation - Lightweight
      gsap.to(".bg-blueprint-left, .bg-blueprint-right", {
        y: "+=15",
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Watermark movement - Optimized
      gsap.to(".bg-watermark", {
        x: -120,
        force3D: true,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      // Social icons reveal
      gsap.from(".social-icon", {
        scale: 0,
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.08,
        ease: "back.out(1.5)",
        force3D: true,
        scrollTrigger: {
          trigger: ".social-icon",
          start: "top 95%",
        },
      });

      // Pillars reveal
      gsap.from(".pillar-item", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        force3D: true,
        scrollTrigger: {
          trigger: ".pillar-item",
          start: "top 92%",
        },
      });

      // Optimized Magnetic Effect
      const icons = document.querySelectorAll(".social-icon");
      icons.forEach((icon) => {
        icon.addEventListener("mousemove", (e) => {
          const rect = icon.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          gsap.to(icon, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.4,
            ease: "power1.out",
            overwrite: "auto", // Prevent animation conflicts
          });
        });

        icon.addEventListener("mouseleave", () => {
          gsap.to(icon, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0f0f0f] text-white pt-24 pb-16 md:pt-32 md:pb-20 px-8 md:px-24 relative overflow-hidden flex flex-col justify-center border-t border-white/5"
    >
      {/* Background Blueprints (Absolute Back) */}
      <img
        src="/assets/background/left.png"
        alt="blueprint left"
        className="bg-blueprint-left absolute left-[-5%] top-[15%] w-[40%] opacity-15 pointer-events-none select-none z-0 grayscale"
      />
      <img
        src="/assets/background/right.png"
        alt="blueprint right"
        className="bg-blueprint-right absolute right-[-5%] bottom-[15%] w-[45%] opacity-15 pointer-events-none select-none z-0 grayscale"
      />

      {/* Architectural Grid Lines */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="grid-line absolute top-0 left-1/4 h-full w-[1px] bg-white/20"></div>
        <div className="grid-line absolute top-0 left-2/4 h-full w-[1px] bg-white/20"></div>
        <div className="grid-line absolute top-0 left-3/4 h-full w-[1px] bg-white/20"></div>
      </div>

      {/* Background Watermark (In front of blueprints and grid) */}
      <div className="bg-watermark absolute top-1/2 left-10 text-[12vw] font-bold text-white/[0.08] select-none pointer-events-none whitespace-nowrap z-0 uppercase tracking-tighter">
        The Open Room Ecosystem
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 text-center">
        <div className="mb-20 flex flex-col items-center">
          <h2 className="reveal-text text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-8 relative inline-block">
            Why This{" "}
            <span className="text-[#c5a47e] italic font-serif relative inline-block">
              Model Matters
              <span className="model-underline absolute bottom-0 left-0 h-[2px] md:h-[4px] bg-[#c5a47e] w-full"></span>
            </span>
          </h2>
          <p className="reveal-text text-gray-400 text-base md:text-lg font-light leading-relaxed max-w-3xl mx-auto mb-12">
            In a country where architecture education and professional practice
            remain largely siloed, The Open Room bridges that divide. Students
            learn within a live studio environment. Professionals grow by
            engaging with curious minds. Clients benefit from a team that is
            constantly evolving, researching, and thinking critically about
            space, design, and the built environment. Nothing here is accidental
            — every project, every lesson, every space is designed with
            intention.
          </p>

          {/* 'Hanging' Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 w-full max-w-7xl text-left items-start">
            {[
              {
                title: "Integrated Thinking",
                desc: "Design and education inform each other constantly.",
                offset: "md:mt-0",
              },
              {
                title: "Live Studio Learning",
                desc: "Students work alongside real projects.",
                offset: "md:mt-12",
              },
              {
                title: "Community of Makers",
                desc: "A growing network of architects, students & thinkers",
                offset: "md:mt-24",
              },
            ].map((pillar, i) => (
              <div
                key={i}
                className={`pillar-item group relative p-10 rounded-3xl border border-white/10 bg-[#161616]/90 hover:bg-[#1c1c1c] hover:border-[#c5a47e]/40 transition-all duration-700 ${pillar.offset} overflow-hidden shadow-2xl shadow-black/40`}
              >
                {/* Liquid Glow Highlight */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#c5a47e]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
                
                {/* Refractive Top Edge */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                {/* Vertical Stem Anchor */}
                <div className="absolute top-0 left-0 w-[2px] h-14 bg-[#c5a47e] origin-top scale-y-100 group-hover:h-full transition-all duration-1000 ease-out"></div>

                <span className="text-[11px] uppercase tracking-[0.4em] text-[#c5a47e]/50 mb-8 block font-mono">
                  Module 0{i + 1}
                </span>

                <h3 className="text-white group-hover:text-[#c5a47e] text-2xl md:text-3xl font-serif mb-6 leading-tight transition-colors duration-700">
                  {pillar.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-200 text-base md:text-lg font-light leading-relaxed transition-colors duration-700 max-w-[280px]">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {["IG", "TW", "FB", "WS"].map((social) => (
            <div
              key={social}
              className="social-icon w-14 h-14 md:w-20 md:h-20 rounded-full border border-white/10 flex items-center justify-center text-sm md:text-base font-medium hover:bg-[#c5a47e] hover:text-white hover:border-[#c5a47e] hover:scale-110 transition-all duration-500 cursor-pointer group overflow-hidden relative"
            >
              <span className="relative z-10">{social}</span>
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>

        <div className="reveal-text flex flex-col md:flex-row gap-4 md:gap-8 justify-center text-sm md:text-base font-mono tracking-wider opacity-60 hover:opacity-100 transition-opacity">
          <a
            href="mailto:info@theopenroom.in"
            className="hover:text-[#c5a47e] transition-colors relative group"
          >
            info@theopenroom.in
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#c5a47e] group-hover:w-full transition-all duration-300"></span>
          </a>
          <span className="hidden md:inline text-white/20">|</span>
          <a
            href="#contact"
            className="hover:text-[#c5a47e] transition-colors uppercase relative group"
          >
            Get in Touch
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#c5a47e] group-hover:w-full transition-all duration-300"></span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ModelMatters;
