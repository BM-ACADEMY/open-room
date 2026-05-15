import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { name: 'About', id: 'about' },
  { name: 'Services', id: 'services' },
  { name: 'Our Team', id: 'governance' },
  { name: 'NATA Coaching', id: 'programs' },
  { name: 'Contact', id: 'contact' },
];

const Footer = ({ onEnquiryClick }) => {
  const footerRef = useRef(null);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="footer-container" ref={footerRef}>
      <div className="footer-image-layer"></div>
      
      <div className="footer-content" ref={contentRef}>
        <div className="footer-grid">
          <div className="footer-brand">
            <img src="/assets/Logo/LOGO -14.png" alt="THE OPEN ROOM" className="footer-logo-img" />
            <p className="footer-tagline">
              Elevating architectural education and professional practice through immersive studio experiences.
            </p>
            <div className="footer-socials">
              <a href="https://www.instagram.com/_theopenroom.in?igsh=MTY0YW5hZnRveWhmNA%3D%3D" target="_blank" rel="noopener noreferrer" className="social-link">Instagram</a>
            
            </div>
          </div>

          <div className="footer-links">
            <h3 className="footer-heading">Studio</h3>
            <ul>
              {navLinks.slice(0, 3).map((link) => (
                <li key={link.name}>
                  <button onClick={() => scrollToSection(link.id)} className="footer-link-btn">
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-links">
            <h3 className="footer-heading">Company</h3>
            <ul>
              {navLinks.slice(3).map((link) => (
                <li key={link.name}>
                  <button onClick={() => scrollToSection(link.id)} className="footer-link-btn">
                    {link.name}
                  </button>
                </li>
              ))}
              <li><button onClick={onEnquiryClick} className="footer-link-btn font-bold text-[#ff4041]">Enquiry</button></li>
            </ul>
          </div>

          <div className="footer-contact" id="contact">
            <h3 className="footer-heading">Connect</h3>
            <div className="footer-contact-item">
              <a href="mailto:info@theopenroom.in">info@theopenroom.in</a>
            </div>
            <div className="footer-contact-item">
              <span>
                8th Floor, Tower A, Featherlite The Address,<br />
                200 Feet Radial Road, Zamin Pallavaram,<br />
                Chennai – 600 044
              </span>
            </div>
          </div>
        </div>

        <div className="footer-bottom border-t border-black/5 pt-10 mt-20">
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
