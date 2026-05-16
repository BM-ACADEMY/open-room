import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { name: 'About', id: 'about' },
  { name: 'Architecture', id: 'services' },
  { name: 'NATA Coaching', id: 'nata-excellence' },
  { name: 'Collaborations', id: 'programs' },
  { name: 'Our Team', id: 'governance' },
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
              <a href="https://www.instagram.com/_theopenroom.in?igsh=OTFpa2R2emYwcG8x&utm_source=qr" target="_blank" rel="noopener noreferrer" className="social-icon-link" title="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://www.linkedin.com/company/the-open-room?trk=profile-position" target="_blank" rel="noopener noreferrer" className="social-icon-link" title="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61589702217728" target="_blank" rel="noopener noreferrer" className="social-icon-link" title="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="https://x.com/_theopenroom" target="_blank" rel="noopener noreferrer" className="social-icon-link" title="X">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
              </a>
            </div>
          </div>



          <div className="footer-links">
            <h3 className="footer-heading">Explore</h3>
            <ul>
              {navLinks.slice(0, 5).map((link) => (
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
            <h3 className="footer-heading">Office</h3>
            <div className="footer-contact-item">
              <a href="mailto:info@theopenroom.in">info@theopenroom.in</a>
            </div>
            <div className="footer-contact-item text-white/60 font-light text-sm">
              <span>
                8th Floor, Tower A, Featherlite The Address,<br />
                200 Feet Radial Road, Zamin Pallavaram,<br />
                Chennai – 600 044
              </span>
            </div>
          </div>

          <div className="footer-map">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15553.220615637812!2d80.162919!3d12.952315!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52675aeb55363f%3A0x491352dd8672f0dd!2sMH%20Cockpit%20-%20Aviation%20Academy!5e0!3m2!1sen!2sin!4v1778932360955!5m2!1sen!2sin" 
              width="100%" 
              height="200" 
              style={{ border: 0, borderRadius: '8px', opacity: 0.8 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Studio Location"
            ></iframe>
          </div>
        </div>

        <div className="footer-bottom border-t border-black/5 pt-10 mt-20">
          <p>&copy; {new Date().getFullYear()} The Open Room. All rights reserved.</p>
          {/* <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
