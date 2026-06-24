import React, { useState } from 'react';
import { FaWhatsapp, FaPhoneAlt, FaTimes, FaShieldAlt } from 'react-icons/fa';

const FloatingButtons = () => {
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  return (
    <>
      {/* WhatsApp Floating Trigger (bottom left) */}
      <a
        href="https://wa.me/919876543210?text=Hello%20Caring%20Roots%2C%20I%20live%20abroad%20and%20want%20to%20know%20more%20about%20your%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float animate__animated animate__fadeIn"
        title="Chat with Care Representative"
      >
        <FaWhatsapp />
      </a>

      {/* Emergency Assistance Floating Trigger (bottom right) */}
      <button
        onClick={() => setShowEmergencyModal(true)}
        className="emergency-float border-0"
        title="Immediate Emergency Hotline"
      >
        <FaPhoneAlt />
        <span>EMERGENCY SOS</span>
      </button>

      {/* High Fidelity Emergency Assistance Modal Overlay */}
      {showEmergencyModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(10, 22, 51, 0.6)',
          backdropFilter: 'blur(8px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div className="premium-card animate__animated animate__zoomIn" style={{ maxWidth: '500px', width: '100%' }}>
            <div className="custom-card-header text-center" style={{ backgroundColor: '#DC3545' }}>
              <div className="custom-card-icon-container" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                <FaShieldAlt size={28} />
              </div>
              <h3 className="text-white mt-3 mb-0" style={{ fontFamily: 'Poppins' }}>SOS Emergency Care</h3>
              <p className="text-white-50 mb-0 mt-1">Dedicated Instant Health & Property Escort Coordinator</p>
            </div>
            
            <div className="custom-card-body text-center">
              <h4 className="mb-3 text-danger" style={{ fontFamily: 'Poppins', fontWeight: '700' }}>
                Need Immediate Help?
              </h4>
              <p className="text-muted mb-4" style={{ fontSize: '15px', lineHeight: '1.6' }}>
                If your old-age parents in India are experiencing a sudden medical crisis, or if there is a severe breach at your property, trigger this backup response immediately.
              </p>
              
              <div className="p-3 mb-4 rounded-3" style={{ backgroundColor: '#FDF2F4', border: '1px dashed #DC3545' }}>
                <h5 className="mb-2 text-dark" style={{ fontFamily: 'Poppins', fontWeight: '600' }}>
                  24/7 Dedicated Indian Hotline:
                </h5>
                <a
                  href="tel:+919876543210"
                  className="d-block text-danger fw-bold fs-4 mb-2 text-decoration-none"
                >
                  +91 98765 43210
                </a>
                <p className="text-muted small mb-0">Our local Bangalore & Mumbai emergency teams will be dispatched in under 20 minutes.</p>
              </div>

              <div className="row g-2">
                <div className="col-6">
                  <a
                    href="tel:+919876543210"
                    className="btn btn-danger w-100 rounded-pill d-flex align-items-center justify-content-center gap-2"
                    style={{ padding: '12px 20px', fontWeight: '600' }}
                  >
                    <FaPhoneAlt size={14} />
                    <span>Call Now</span>
                  </a>
                </div>
                <div className="col-6">
                  <button
                    onClick={() => setShowEmergencyModal(false)}
                    className="btn btn-light w-100 rounded-pill"
                    style={{ padding: '12px 20px', fontWeight: '600', border: '1px solid #E2E8F0' }}
                  >
                    <span>Dismiss</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingButtons;
