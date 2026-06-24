import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPen, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="container py-5 fade-in">
      <div className="text-center mx-auto mb-5" style={{ maxWidth: '600px' }}>
        <span className="badge px-3 py-2 mb-2 rounded-pill" style={{ backgroundColor: 'rgba(31, 182, 181, 0.12)', color: '#1FB6B5', fontSize: '13px', fontWeight: '700' }}>
          CONTACT CARING ROOTS
        </span>
        <h1 className="mb-3" style={{ fontFamily: 'Poppins', fontWeight: '800' }}>Get in Touch</h1>
        <p className="text-muted">Our customer coordinators in India and the US are available 24/7. Connect with us anytime.</p>
      </div>

      <div className="row g-5">
        {/* Contact form */}
        <div className="col-lg-7">
          <div className="premium-card p-5" style={{ border: '1px solid rgba(11, 75, 62, 0.08)' }}>
            <h3 className="mb-4" style={{ fontFamily: 'Poppins', color: '#0B4B3E' }}>Inquire Details</h3>
            
            {submitted ? (
              <div className="alert alert-success border-0 p-4 text-center rounded-3">
                <h5 className="fw-bold mb-1">Inquiry Dispatched!</h5>
                <p className="small mb-0">Our care managers will review your query and contact you within 2 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <div className="custom-form-group">
                  <label className="custom-form-label">Full Name</label>
                  <div className="custom-form-input-wrapper">
                    <span className="custom-form-input-icon"><FaUser /></span>
                    <input
                      type="text"
                      name="name"
                      className="custom-form-input"
                      placeholder="e.g. Aditi Sharma"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="custom-form-group">
                  <label className="custom-form-label">Email Address</label>
                  <div className="custom-form-input-wrapper">
                    <span className="custom-form-input-icon"><FaEnvelope /></span>
                    <input
                      type="email"
                      name="email"
                      className="custom-form-input"
                      placeholder="e.g. aditi@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="custom-form-group">
                  <label className="custom-form-label">Query Message</label>
                  <div className="custom-form-input-wrapper">
                    <span className="custom-form-input-icon" style={{ top: '24px' }}><FaPen /></span>
                    <textarea
                      name="message"
                      rows="4"
                      className="custom-form-input"
                      placeholder="Ask us anything about caretaker credentials, vitals monitoring, billing, or customized packages..."
                      style={{ paddingLeft: '52px' }}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary-custom w-100 d-flex align-items-center justify-content-center gap-2 mt-4" style={{ padding: '14px 0' }}>
                  <FaPaperPlane size={14} />
                  <span>Send Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Info panel */}
        <div className="col-lg-5">
          <div className="premium-card p-5 h-100" style={{ backgroundColor: '#F5EFE3', border: 'none' }}>
            <h3 className="mb-4" style={{ fontFamily: 'Poppins', color: '#0B4B3E' }}>Corporate Info</h3>
            
            <div className="d-flex align-items-start gap-3 mb-4">
              <div style={{ color: '#0B4B3E', fontSize: '20px', marginTop: '4px' }}><FaPhoneAlt /></div>
              <div>
                <h6 className="fw-bold mb-1">Direct Helplines</h6>
                <p className="text-muted small mb-1">+91 98765 43210 (India Office)</p>
                <p className="text-muted small mb-0">+1 (800) 555-0199 (USA Toll-Free)</p>
              </div>
            </div>

            <div className="d-flex align-items-start gap-3 mb-4">
              <div style={{ color: '#0B4B3E', fontSize: '20px', marginTop: '4px' }}><FaEnvelope /></div>
              <div>
                <h6 className="fw-bold mb-1">Email Support</h6>
                <p className="text-muted small mb-0">support@caringroots.com</p>
              </div>
            </div>

            <div className="d-flex align-items-start gap-3 mb-5">
              <div style={{ color: '#0B4B3E', fontSize: '20px', marginTop: '4px' }}><FaMapMarkerAlt /></div>
              <div>
                <h6 className="fw-bold mb-1">Office Location</h6>
                <p className="text-muted small mb-0">Greenwood Heights, Level 4, Outer Ring Rd, Bangalore, KA, 560103</p>
              </div>
            </div>

            {/* Quick trust guarantee info banner */}
            <div className="bg-white p-3 rounded-3" style={{ borderLeft: '4px solid #1FB6B5' }}>
              <h6 className="fw-bold mb-1 text-dark" style={{ fontSize: '14px' }}>Security Guarantee</h6>
              <p className="text-muted small mb-0">Every digital inquiry and service scheduling logs is fully encrypted using SSL protocols. Your family data is always private.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
