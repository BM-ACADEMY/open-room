import React from 'react';
import { motion } from 'framer-motion';

const Projects = () => {
  return (
    <div className="pt-32 px-12 md:px-24" id="projects">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-7xl font-serif mb-12"
      >
        Our <span className="italic">Projects</span>
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="aspect-video bg-gray-100 flex items-center justify-center text-gray-400">Project Placeholder 1</div>
        <div className="aspect-video bg-gray-100 flex items-center justify-center text-gray-400">Project Placeholder 2</div>
      </div>
    </div>
  );
};

export default Projects;
