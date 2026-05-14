import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import './EnquiryForm.css';

const EnquiryForm = ({ isOpen, onClose }) => {
  const formRef = useRef(null);
  const fieldsRef = useRef([]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // GSAP animation for form fields reveal
      gsap.fromTo(
        fieldsRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          delay: 0.3,
          force3D: true,
        }
      );
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const addToFields = (el) => {
    if (el && !fieldsRef.current.includes(el)) {
      fieldsRef.current.push(el);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="enquiry-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="enquiry-modal"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="enquiry-header">
              <span className="enquiry-subtitle">PROJECT ENQUIRY</span>
              <h2 className="enquiry-title">Let's build something<br/>extraordinary.</h2>
              <button className="enquiry-close" onClick={onClose}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form className="enquiry-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group" ref={addToFields}>
                <label>NAME</label>
                <input type="text" placeholder="Your name" required />
              </div>

              <div className="form-group" ref={addToFields}>
                <label>EMAIL</label>
                <input type="email" placeholder="email@address.com" required />
              </div>

              <div className="form-group" ref={addToFields}>
                <label>SUBJECT</label>
                <input type="text" placeholder="Project type / Subject" required />
              </div>

              <div className="form-group" ref={addToFields}>
                <label>MESSAGE</label>
                <textarea rows="4" placeholder="Tell us about your project..." required></textarea>
              </div>

              <div className="form-submit" ref={addToFields}>
                <button type="submit" className="submit-btn">
                  <span>SEND ENQUIRY</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14m0 0l-7-7m7 7l-7 7" />
                  </svg>
                </button>
              </div>
            </form>

            <div className="enquiry-footer" ref={addToFields}>
              <p>Prefer direct email? <a href="mailto:info@theopenroom.in">info@theopenroom.in</a></p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EnquiryForm;
