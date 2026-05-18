import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import vickram from "../assets/team/Vickram.jpeg";
import izas from "../assets/team/Mohammad Izas.png";
import javid from "../assets/team/Javid Asraff.png";
import abishek from "../assets/team/Abishek Pragadheswar.jpeg";
import yasir from "../assets/team/Ahamed Yasir.jpeg";

gsap.registerPlugin(ScrollTrigger);

const team = [
  {
    name: "Vickram MuthuRathina Sabari",
    role: "Founder Chairman",
    image: vickram,
    linkedin: "#",
  },
  {
    name: "Mohammad Izas",
    role: "Head of Operations",
    image: izas,
    linkedin: "#",
  },
  {
    name: "Javid Asraff",
    role: "Principal Architect",
    image: javid,
    linkedin: "https://www.linkedin.com/in/javid-asraff-7341b4283/",
  },
  {
    name: "Abishek Pragadheswar U",
    role: "Head of Constructions",
    image: abishek,
    linkedin: "#",
  },
  {
    name: "Ahamed Yasir",
    role: "Board Of Advisors",
    image: yasir,
    linkedin: "#",
  },
];

const MeetOurTeam = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.from(".team-heading span", {
        yPercent: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".team-heading",
          start: "top 90%",
        },
      });

      // Cards reveal
      gsap.from(".team-card", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".team-grid",
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="bg-[#fbf9e3] py-24 md:py-40 px-8 md:px-24 overflow-hidden border-t border-black/5"
      id="governance"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="mb-20 text-center">
          <h2 className="team-heading text-3xl md:text-5xl font-bold tracking-tight uppercase overflow-hidden">
            <span className="block">
              OUR <span className="font-serif italic font-light text-[#ff4041]">GOVERNANCE.</span>
            </span>
          </h2>
        </div>

        {/* Team Grid */}
        <div className="team-grid flex flex-wrap justify-center gap-10 md:gap-16">
          {team.map((member, i) => (
            <div key={i} className="team-card group w-full sm:w-[calc(50%-2rem)] lg:w-[calc(33.333%-3rem)] max-w-[340px]">
              <div className="relative aspect-[3/4] overflow-hidden bg-white rounded-lg shadow-md hover:shadow-2xl transition-all duration-700 mb-8 border border-black/5">
                <img 
                  src={member.image} 
                  alt={member.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top transition-all duration-1000 scale-[1.05] group-hover:scale-110"
                />
                
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {member.linkedin !== "#" && (
                    <a 
                      href={member.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="absolute top-4 right-4 bg-[#0077b5] text-white p-2.5 rounded-full hover:scale-110 transition-transform duration-300 shadow-lg"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-xl md:text-2xl font-bold text-black mb-2 leading-tight">
                  {member.name}
                </h3>
                <p className="text-[#ff4041] text-sm font-semibold tracking-widest uppercase">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetOurTeam;
