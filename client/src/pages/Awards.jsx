import React from 'react';
import { motion } from 'framer-motion';

const Awards = () => {
  return (
    <div className="pt-32 px-12 md:px-24">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-7xl font-serif mb-12"
      >
        Awards & <span className="italic">Recognition</span>
      </motion.h1>
      <div className="space-y-8">
        {[2024, 2023, 2022].map((year) => (
          <div key={year} className="flex justify-between items-center border-b border-gray-100 py-8">
            <span className="text-gold font-bold">{year}</span>
            <span className="text-2xl font-serif">International Architecture Award</span>
            <span className="text-gray-400">Winner</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Awards;
