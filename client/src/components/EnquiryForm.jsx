import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const EnquiryForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Reset form and status when opened
      setFormData({ name: '', email: '', subject: '', message: '' });
      setStatus('idle');
      setErrorMessage('');
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      
      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        setStatus('success');
        // Auto-close modal after 2.5 seconds
        setTimeout(() => {
          onClose();
        }, 2500);
      } else {
        throw new Error(response.data.message || 'Failed to send enquiry.');
      }
    } catch (error) {
      console.error('Enquiry submit error:', error);
      setStatus('error');
      setErrorMessage(
        error.response?.data?.message || 
        error.message || 
        'Something went wrong. Please try again.'
      );
    }
  };

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
          className="fixed inset-0 bg-black/85 z-[1000] flex justify-center items-center p-5 will-change-opacity"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-[500px] bg-white p-6 md:p-8 flex flex-col shadow-[0_30px_60px_rgba(0,0,0,0.2)] overflow-y-auto max-h-[85vh] relative no-scrollbar will-change-transform"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 relative">
              <motion.span variants={itemVariants} className="text-[0.65rem] font-bold tracking-[0.3em] text-[#ff4041] uppercase block mb-1">PROJECT ENQUIRY</motion.span>
              <motion.h2 variants={itemVariants} className="font-serif text-[1.8rem] md:text-[2.2rem] leading-[1.1] text-[#1a1a1a] m-0">Let's build something<br/>extraordinary.</motion.h2>
              <button 
                className="absolute -top-4 -right-4 bg-transparent border-none cursor-pointer text-[#1a1a1a] p-2.5 transition-transform duration-300 hover:rotate-90 z-10" 
                onClick={onClose}
                disabled={status === 'loading'}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-serif text-black mb-2">Thank you!</h3>
                <p className="text-sm text-black/60 max-w-xs">Your enquiry has been received successfully. We will get in touch with you shortly.</p>
              </motion.div>
            ) : (
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <motion.div variants={itemVariants} className="flex flex-col gap-2 relative group">
                  <label className="text-[0.6rem] font-bold tracking-widest text-[#999] uppercase">NAME</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name" 
                      className="w-full bg-transparent border-none border-b border-black/10 py-2.5 text-[0.95rem] text-black outline-none transition-colors placeholder:text-black/20" 
                      required 
                      disabled={status === 'loading'}
                    />
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#ff4041] scale-x-0 transition-transform duration-500 origin-left group-focus-within:scale-x-100"></div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex flex-col gap-2 relative group">
                  <label className="text-[0.6rem] font-bold tracking-widest text-[#999] uppercase">EMAIL</label>
                  <div className="relative">
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@address.com" 
                      className="w-full bg-transparent border-none border-b border-black/10 py-2.5 text-[0.95rem] text-black outline-none transition-colors placeholder:text-black/20" 
                      required 
                      disabled={status === 'loading'}
                    />
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#ff4041] scale-x-0 transition-transform duration-500 origin-left group-focus-within:scale-x-100"></div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex flex-col gap-2 relative group">
                  <label className="text-[0.6rem] font-bold tracking-widest text-[#999] uppercase">SUBJECT</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Project type / Subject" 
                      className="w-full bg-transparent border-none border-b border-black/10 py-2.5 text-[0.95rem] text-black outline-none transition-colors placeholder:text-black/20" 
                      required 
                      disabled={status === 'loading'}
                    />
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#ff4041] scale-x-0 transition-transform duration-500 origin-left group-focus-within:scale-x-100"></div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex flex-col gap-2 relative group">
                  <label className="text-[0.6rem] font-bold tracking-widest text-[#999] uppercase">MESSAGE</label>
                  <div className="relative">
                    <textarea 
                      rows="4" 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project..." 
                      className="w-full bg-transparent border-none border-b border-black/10 py-2.5 text-[0.95rem] text-black outline-none transition-colors resize-none placeholder:text-black/20" 
                      required 
                      disabled={status === 'loading'}
                    ></textarea>
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#ff4041] scale-x-0 transition-transform duration-500 origin-left group-focus-within:scale-x-100"></div>
                  </div>
                </motion.div>

                {status === 'error' && (
                  <motion.p 
                    initial={{ opacity: 0, y: -5 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="text-xs text-[#ff4041] font-semibold"
                  >
                    {errorMessage}
                  </motion.p>
                )}

                <motion.div variants={itemVariants} className="mt-1">
                  <button 
                    type="submit" 
                    disabled={status === 'loading'}
                    className="w-full bg-[#1a1a1a] text-white border-none p-[18px] flex justify-between items-center text-[0.75rem] font-bold tracking-[0.2em] cursor-pointer hover:bg-[#ff4041] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    <span>{status === 'loading' ? 'SENDING...' : 'SEND ENQUIRY'}</span>
                    {status === 'loading' ? (
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14m0 0l-7-7m7 7l-7 7" />
                      </svg>
                    )}
                  </button>
                </motion.div>
              </form>
            )}

            <motion.div variants={itemVariants} className="mt-auto pt-6 border-t border-[#f0f0f0] text-[#888] text-[0.85rem]">
              <p>Prefer direct email? <a href="mailto:info@theopenroom.in" className="text-[#1a1a1a] no-underline font-semibold hover:text-[#ff4041] transition-colors">info@theopenroom.in</a></p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnquiryForm;
