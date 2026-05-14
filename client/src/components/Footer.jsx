import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current.children, {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%',
        }
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="footer-container" ref={footerRef}>
      <div className="footer-image-layer"></div>
      <div className="footer-overlay"></div>
      
      <div className="footer-content" ref={contentRef}>
        <div className="footer-grid">
          <div className="footer-brand">
            <h2 className="footer-logo">THE OPEN ROOM</h2>
            <p className="footer-tagline">
              Elevating architectural education and professional practice through immersive studio experiences.
            </p>
            <div className="footer-socials">
              <a href="#" className="social-link">Instagram</a>
              <a href="#" className="social-link">LinkedIn</a>
              <a href="#" className="social-link">Behance</a>
            </div>
          </div>

          <div className="footer-links">
            <h3 className="footer-heading">Navigate</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About Studio</a></li>
              <li><a href="/programs">Academic Programs</a></li>
              <li><a href="/projects">Design Portfolio</a></li>
              <li><a href="/contact">Connect</a></li>
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

          <div className="footer-contact">
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
            <p className="footer-contact-item">
              <span className="label">WEBSITE</span>
              <a href="https://theopenroom.in" target="_blank" rel="noopener noreferrer">theopenroom.in</a>
            </p>
            <button className="footer-cta">Get Started</button>
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
