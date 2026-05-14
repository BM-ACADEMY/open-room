import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

import logo from '../assets/logo.png';

const Footer = ({ onEnquiryClick }) => {
  const footerRef = useRef(null);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Create a reveal animation for the footer content
      gsap.from(contentRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%', // Trigger earlier
          toggleActions: 'play none none reverse'
        }
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="footer-container" ref={footerRef}>
      <div className="footer-image-layer"></div>
      
      <div className="footer-content" ref={contentRef}>
        <div className="footer-grid">
          <div className="footer-brand">
            <img src={logo} alt="THE OPEN ROOM" className="footer-logo-img" />
            <p className="footer-tagline">
              Elevating architectural education and professional practice through immersive studio experiences.
            </p>
            <div className="footer-socials">
              <a href="#" className="social-link">Instagram</a>
              <a href="#" className="social-link">LinkedIn</a>
            </div>
          </div>

          <div className="footer-links">
            <h3 className="footer-heading">Navigate</h3>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">What We Do</a></li>
              <li><a href="#services">Our Services</a></li>
              <li><a href="#at-a-glance">Studio At A Glance</a></li>
              <li><button onClick={onEnquiryClick} className="footer-link-btn">Enquiry</button></li>
            </ul>
          </div>

          <div className="footer-links">
            <h3 className="footer-heading">Programs</h3>
            <ul>
              <li><a href="#">Foundation Studio</a></li>
              <li><a href="#">Advanced Design</a></li>
              <li><a href="#">Digital Fabrication</a></li>
              <li><a href="#">Urban Research</a></li>
            </ul>
          </div>

          <div className="footer-contact" id="contact">
            <h3 className="footer-heading">Connect</h3>
            <p className="footer-contact-item">
              <span className="label">EMAIL</span>
              <a href="mailto:info@theopenroom.in">info@theopenroom.in</a>
            </p>
            <p className="footer-contact-item">
              <span className="label">ADDRESS</span>
              <span>
                8th Floor, Tower A, Featherlite The Address,<br />
                200 Feet Radial Road, Zamin Pallavaram,<br />
                Chennai – 600 044
              </span>
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} The Open Room. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
