import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EnquiryForm = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    },
    exit: { 
      opacity: 0,
      transition: { 
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    },
    exit: { 
      y: 10, 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[1000] flex justify-center items-center p-5 will-change-opacity"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-[550px] bg-white p-10 flex flex-col shadow-[0_30px_60px_rgba(0,0,0,0.2)] overflow-y-auto max-h-[90vh] relative no-scrollbar will-change-transform"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-8 relative">
              <motion.span variants={itemVariants} className="text-[0.65rem] font-bold tracking-[0.3em] text-[#ff4041] uppercase block mb-2">PROJECT ENQUIRY</motion.span>
              <motion.h2 variants={itemVariants} className="font-serif text-[2.5rem] leading-[1.1] text-[#1a1a1a] m-0">Let's build something<br/>extraordinary.</motion.h2>
              <button 
                className="absolute -top-4 -right-4 bg-transparent border-none cursor-pointer text-[#1a1a1a] p-2.5 transition-transform duration-300 hover:rotate-90 z-10" 
                onClick={onClose}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
              <motion.div variants={itemVariants} className="flex flex-col gap-2 relative group">
                <label className="text-[0.6rem] font-bold tracking-widest text-[#999] uppercase">NAME</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Your name" 
                    className="w-full bg-transparent border-none border-b border-black/10 py-2.5 text-[0.95rem] text-black outline-none transition-colors placeholder:text-black/20" 
                    required 
                  />
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#ff4041] scale-x-0 transition-transform duration-500 origin-left group-focus-within:scale-x-100"></div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-col gap-2 relative group">
                <label className="text-[0.6rem] font-bold tracking-widest text-[#999] uppercase">EMAIL</label>
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="email@address.com" 
                    className="w-full bg-transparent border-none border-b border-black/10 py-2.5 text-[0.95rem] text-black outline-none transition-colors placeholder:text-black/20" 
                    required 
                  />
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#ff4041] scale-x-0 transition-transform duration-500 origin-left group-focus-within:scale-x-100"></div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-col gap-2 relative group">
                <label className="text-[0.6rem] font-bold tracking-widest text-[#999] uppercase">SUBJECT</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Project type / Subject" 
                    className="w-full bg-transparent border-none border-b border-black/10 py-2.5 text-[0.95rem] text-black outline-none transition-colors placeholder:text-black/20" 
                    required 
                  />
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#ff4041] scale-x-0 transition-transform duration-500 origin-left group-focus-within:scale-x-100"></div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-col gap-2 relative group">
                <label className="text-[0.6rem] font-bold tracking-widest text-[#999] uppercase">MESSAGE</label>
                <div className="relative">
                  <textarea 
                    rows="4" 
                    placeholder="Tell us about your project..." 
                    className="w-full bg-transparent border-none border-b border-black/10 py-2.5 text-[0.95rem] text-black outline-none transition-colors resize-none placeholder:text-black/20" 
                    required 
                  ></textarea>
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#ff4041] scale-x-0 transition-transform duration-500 origin-left group-focus-within:scale-x-100"></div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="mt-2.5">
                <button 
                  type="submit" 
                  className="w-full bg-[#1a1a1a] text-white border-none p-[18px] flex justify-between items-center text-[0.75rem] font-bold tracking-[0.2em] cursor-pointer hover:bg-[#ff4041]"
                >
                  <span>SEND ENQUIRY</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14m0 0l-7-7m7 7l-7 7" />
                  </svg>
                </button>
              </motion.div>
            </form>

            <motion.div variants={itemVariants} className="mt-auto pt-10 border-t border-[#f0f0f0] text-[#888] text-[0.9rem]">
              <p>Prefer direct email? <a href="mailto:info@theopenroom.in" className="text-[#1a1a1a] no-underline font-semibold hover:text-[#ff4041] transition-colors">info@theopenroom.in</a></p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnquiryForm;
