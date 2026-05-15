import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const servicesData = [
  {
    title: "Architectural Design",
    subtitle: "Concept to Construction",
    description: "Concept development, schematic design, design development, and construction documentation for residential, commercial, and institutional projects. We craft buildings that are spatially resolved, technically sound, and contextually aware.",
    number: "01"
  },
  {
    title: "Interior Design",
    subtitle: "Spaces for Living",
    description: "Comprehensive interior design services from space planning and material selection to furniture specification and lighting design. We create interiors that are both functional and deeply considered.",
    number: "02"
  },
  {
    title: "Design Consultation",
    subtitle: "Expert Guidance",
    description: "Expert consultation at any stage of your project. Whether you need a second opinion on your design direction, help with planning regulations, or strategic advice on space utilisation, we provide clear and actionable guidance.",
    number: "03"
  },
  {
    title: "Turnkey Execution",
    subtitle: "Seamless Realization",
    description: "Complete project execution including contractor management, procurement, site supervision, and handover. We ensure design intent is maintained from drawing board to built reality.",
    number: "04"
  },
  {
    title: "Commercial Projects",
    subtitle: "Business Environments",
    description: "Offices, retail spaces, showrooms, hospitality venues, and mixed-use developments — we bring commercial intelligence and design excellence together for spaces that perform and inspire.",
    number: "05"
  },
  {
    title: "Residential Projects",
    subtitle: "Bespoke Homes",
    description: "Villas, apartments, row houses, and bespoke homes designed around the lives of the people who inhabit them. Every home we design is a reflection of its owners, shaped by function, culture, and craft.",
    number: "06"
  }
];

const ServiceCard = ({ service, index, total }) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start", "end end", "end start"]
  });

  // New Stack Style: Scale down and move up as we are covered
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 0.95, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, -20, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0.8]);

  return (
    <div 
      ref={cardRef}
      className="sticky top-48 w-full max-w-[1000px] flex justify-center mb-[20vh]"
      style={{ 
        zIndex: index + 1
      }}
    >
      <motion.div 
        style={{ scale, y, opacity }}
        className="bg-[#ff4041] p-8 md:p-12 text-white w-full h-[40vh] md:h-[45vh] relative overflow-hidden shadow-2xl flex flex-col justify-center border border-white/10"
      >
        {/* Service Number Background */}
        <div className="absolute top-0 right-0 text-[10vw] font-bold text-white/20 select-none pointer-events-none translate-y-[-10%] translate-x-[5%]">
          {service.number}
        </div>

        <div className="relative z-10">
          <motion.h3 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-4xl font-bold mb-2 tracking-tight"
          >
            {service.title}
          </motion.h3>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 0.9 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg italic mb-6 font-serif"
          >
            {service.subtitle}
          </motion.p>
          
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-full h-[1px] bg-white/20 mb-6 origin-left"
          />
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 0.9 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-sm md:text-lg font-light leading-relaxed max-w-3xl"
          >
            {service.description}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex justify-end"
          >
            <button className="group/btn flex items-center gap-4 text-[9px] font-bold uppercase tracking-[0.3em] hover:gap-6 transition-all duration-300">
              <span>Explore</span>
              <div className="w-8 h-[1px] bg-white transition-all group-hover/btn:w-12"></div>
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const Services = () => {
  const containerRef = useRef(null);

  return (
    <section ref={containerRef} className="relative bg-[#fbf9e3] z-10 scroll-mt-24 pb-40" id="services">
      {/* Intro Header */}
      <div className="pt-48 pb-20 px-6 md:px-24 max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "power3.out" }}
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[#ff4041] text-[10px] font-bold uppercase tracking-[0.5em]">Our Services</span>
            <div className="w-12 h-[1px] bg-[#ff4041]/30"></div>
          </div>
          <h2 className="text-4xl md:text-7xl font-serif leading-[1.1] mb-12 tracking-tight max-w-5xl">
            End-to-end design solutions &mdash; <br />
            <span className="italic text-[#ff4041]">from concept to completion.</span>
          </h2>
          
          <div className="max-w-3xl">
            <p className="text-lg md:text-xl text-black/60 font-light leading-relaxed">
              At The Open Room, we handle every stage of your project with precision and care. Whether you are
              envisioning a home, a commercial space, or a large-scale institutional project, our team brings together
              creative design, technical rigour, and seamless execution under one roof.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Stacking Cards Container */}
      <div className="flex flex-col items-center px-6 md:px-24">
        {servicesData.map((service, index) => (
          <ServiceCard 
            key={index} 
            service={service} 
            index={index} 
            total={servicesData.length} 
          />
        ))}
      </div>
    </section>
  );
};

export default Services;
