import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#0B4B3E', color: '#FFFFFF', paddingTop: '80px', paddingBottom: '30px' }}>
      <div className="container">
        <div className="row g-5">
          {/* Brand section */}
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center gap-2 mb-3">
              <div style={{
                width: '38px',
                height: '38px',
                backgroundColor: '#1FB6B5',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2v20M17 10l-5-5-5 5M18 15l-6-6-6 6" />
                </svg>
              </div>
              <span style={{ fontSize: '22px', fontWeight: '800', fontFamily: 'Poppins', letterSpacing: '-0.5px' }}>
                Caring Roots
              </span>
            </div>
            <p className="pe-lg-4" style={{ color: '#E0ECE9', lineHeight: '1.7', fontSize: '15px' }}>
              “Even miles away, your roots are safe.” Premium, trusted, and empathetic caretaking and property services in India for people living abroad.
            </p>
            <div className="d-flex gap-3 mt-4">
              <a href="#" className="social-icon-btn"><FaFacebookF /></a>
              <a href="#" className="social-icon-btn"><FaTwitter /></a>
              <a href="#" className="social-icon-btn"><FaInstagram /></a>
              <a href="#" className="social-icon-btn"><FaLinkedinIn /></a>
            </div>
          </div>

          {/* Quick links */}
          <div className="col-lg-2 col-md-6">
            <h5 className="mb-4" style={{ fontFamily: 'Poppins', fontWeight: '600', color: '#1FB6B5' }}>Quick Navigation</h5>
            <ul className="list-unstyled d-flex flex-column gap-2" style={{ fontSize: '15px' }}>
              <li><Link to="/" className="footer-link">Home Base</Link></li>
              <li><Link to="/services" className="footer-link">Our Services</Link></li>
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/contact" className="footer-link">Contact Support</Link></li>
              <li><Link to="/register" className="footer-link">Join Platform</Link></li>
            </ul>
          </div>

          {/* Services list */}
          <div className="col-lg-3 col-md-6">
            <h5 className="mb-4" style={{ fontFamily: 'Poppins', fontWeight: '600', color: '#1FB6B5' }}>Our Services</h5>
            <ul className="list-unstyled d-flex flex-column gap-2" style={{ fontSize: '15px', color: '#E0ECE9' }}>
              <li>Daily Checkup Visits</li>
              <li>Medicine Tracking Assist</li>
              <li>Hospital Emergency Escort</li>
              <li>Land Security Protection</li>
              <li>Monthly Rent Monitoring</li>
              <li>Companion Visits</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="col-lg-3 col-md-6">
            <h5 className="mb-4" style={{ fontFamily: 'Poppins', fontWeight: '600', color: '#1FB6B5' }}>Direct Support</h5>
            <ul className="list-unstyled d-flex flex-column gap-3" style={{ fontSize: '15px', color: '#E0ECE9' }}>
              <li className="d-flex align-items-center gap-3">
                <FaPhoneAlt style={{ color: '#1FB6B5' }} />
                <span>+91 98765 43210 (India Office)</span>
              </li>
              <li className="d-flex align-items-center gap-3">
                <FaPhoneAlt style={{ color: '#1FB6B5' }} />
                <span>+1 (800) 555-0199 (USA Toll-Free)</span>
              </li>
              <li className="d-flex align-items-center gap-3">
                <FaEnvelope style={{ color: '#1FB6B5' }} />
                <span>support@caringroots.com</span>
              </li>
              <li className="d-flex align-items-start gap-3">
                <FaMapMarkerAlt style={{ color: '#1FB6B5', marginTop: '4px' }} />
                <span>Greenwood Heights, Level 4, Outer Ring Rd, Bangalore, KA, 560103</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-5" style={{ borderColor: 'rgba(255,255,255,0.1)' }} />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 text-center" style={{ fontSize: '14px', color: '#E0ECE9' }}>
          <p className="mb-0">
            &copy; {new Date().getFullYear()} Caring Roots Private Limited. All rights reserved.
          </p>
          <p className="mb-0 d-flex align-items-center justify-content-center gap-1">
            Made with <FaHeart style={{ color: '#E33E3E' }} /> by Google Advanced Agentic Coding for our NRIs parents.
          </p>
        </div>
      </div>

      {/* Styled JSX for hover effects */}
      <style>{`
        .footer-link {
          color: #E0ECE9;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .footer-link:hover {
          color: #1FB6B5;
          padding-left: 5px;
        }
        .social-icon-btn {
          width: 36px;
          height: 36px;
          border-radius: 50px;
          background-color: rgba(255, 255, 255, 0.08);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .social-icon-btn:hover {
          background-color: #1FB6B5;
          color: white;
          transform: translateY(-3px);
        }
      `}</style>
    </footer>
  );
};

export default Footer;
