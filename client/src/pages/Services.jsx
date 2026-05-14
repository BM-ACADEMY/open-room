import React from 'react';
import { motion } from 'framer-motion';

const Services = () => {
  return (
    <div className="pt-32 px-12 md:px-24">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-7xl font-serif mb-12"
      >
        Our <span className="italic">Services</span>
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {['Architecture', 'Interior Design', 'Urban Planning'].map((service, i) => (
          <div key={i} className="p-12 border border-gray-100 hover:border-gold transition-colors">
            <h2 className="text-3xl font-serif mb-4">{service}</h2>
            <p className="text-gray-500">Bespoke architectural solutions tailored to your unique spatial needs.</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
