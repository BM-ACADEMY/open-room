import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className="pt-32 px-12 md:px-24">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-7xl font-serif mb-12"
      >
        Contact <span className="italic">Us</span>
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
        <div>
          <p className="text-2xl font-serif leading-relaxed text-gray-600">
            Let's discuss your next landmark project. Reach out to our studio today.
          </p>
        </div>
        <div className="space-y-12">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-gold mb-4">Email</div>
            <div className="text-2xl font-serif">hello@openroom.architecture</div>
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-gold mb-4">Location</div>
            <div className="text-2xl font-serif">Main Design Studio, Floor 12<br/>New York, NY 10001</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
