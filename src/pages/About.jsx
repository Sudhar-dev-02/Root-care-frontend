import React from 'react';
import { FaHeart, FaEye, FaShieldAlt, FaUserShield, FaAmbulance } from 'react-icons/fa';

const About = () => {
  return (
    <div className="fade-in">
      {/* Header Banner */}
      <section style={{ backgroundColor: '#0B4B3E', color: 'white', padding: '60px 0', textAlign: 'center' }}>
        <div className="container">
          <h1 className="text-white mb-2" style={{ fontFamily: 'Poppins', fontWeight: '800' }}>Caring Roots Mission</h1>
          <p className="text-white-50 mb-0" style={{ fontSize: '18px' }}>“Even miles away, your roots are safe.”</p>
        </div>
      </section>

      {/* Intro section */}
      <section className="py-5" style={{ backgroundColor: '#FAF9F6' }}>
        <div className="container py-4">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <h2 className="mb-4" style={{ fontFamily: 'Poppins', color: '#0B4B3E' }}>Bridging the Distance with Empathy & Trust</h2>
              <p className="text-muted mb-3" style={{ lineHeight: '1.7', fontSize: '16px' }}>
                Caring Roots was founded by a team of NRIs who personally faced the acute challenges of living abroad while worrying about their aging parents’ medical checks and property security in India.
              </p>
              <p className="text-muted" style={{ lineHeight: '1.7', fontSize: '16px' }}>
                We understand that phone calls are never enough. Our platform operates as your local hands, eyes, and heart in India. We coordinate verified care companions to check up on parents and professional technicians to audit properties, supplying absolute peace of mind.
              </p>
            </div>
            <div className="col-lg-6">
              <div className="premium-card p-5" style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(11, 75, 62, 0.08)' }}>
                <h4 className="mb-4 text-center" style={{ fontFamily: 'Poppins', color: '#0B4B3E', fontWeight: '700' }}>Our Foundations</h4>
                
                <div className="d-flex align-items-start gap-3 mb-4">
                  <div style={{ color: '#1FB6B5', fontSize: '24px', marginTop: '4px' }}><FaHeart /></div>
                  <div>
                    <h6 className="fw-bold mb-1">Our Mission</h6>
                    <p className="text-muted small mb-0">To eliminate geographical anxieties for NRIs by offering robust, high-fidelity caretaking and maintenance in India.</p>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3">
                  <div style={{ color: '#1FB6B5', fontSize: '24px', marginTop: '4px' }}><FaEye /></div>
                  <div>
                    <h6 className="fw-bold mb-1">Our Vision</h6>
                    <p className="text-muted small mb-0">To build the world’s most trusted ecosystem for remote family support, powered by transparency and real-time dashboard logs.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Safety Deep Dive */}
      <section className="py-5" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container py-4">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: '600px' }}>
            <h2 className="mb-3" style={{ fontFamily: 'Poppins', color: '#0B4B3E' }}>Our Trust & Safety Measures</h2>
            <p className="text-muted">Because family care demands nothing less than absolute security and professional checks.</p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="premium-card p-4 text-center h-100">
                <div className="mx-auto mb-3" style={{ width: '50px', height: '50px', backgroundColor: 'rgba(31,182,181,0.1)', borderRadius: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1FB6B5' }}>
                  <FaUserShield size={24} />
                </div>
                <h5 className="fw-bold mb-2">Verified & Certified Staff</h5>
                <p className="text-muted small mb-0">
                  All care advocates pass strict criminal and civil record verifications. We partner exclusively with certified geriatric specialists.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="premium-card p-4 text-center h-100">
                <div className="mx-auto mb-3" style={{ width: '50px', height: '50px', backgroundColor: 'rgba(31,182,181,0.1)', borderRadius: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1FB6B5' }}>
                  <FaShieldAlt size={24} />
                </div>
                <h5 className="fw-bold mb-2">Detailed Check-in Checklists</h5>
                <p className="text-muted small mb-0">
                  Every partner completes a multi-point verification checklist (e.g., vital values, pharmacy refills, leak inspections) using video logs.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="premium-card p-4 text-center h-100">
                <div className="mx-auto mb-3" style={{ width: '50px', height: '50px', backgroundColor: 'rgba(31,182,181,0.1)', borderRadius: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1FB6B5' }}>
                  <FaAmbulance size={24} />
                </div>
                <h5 className="fw-bold mb-2">Rapid Emergency Logistics</h5>
                <p className="text-muted small mb-0">
                  We integrate directly with local cardiac centers and private ambulance providers, guaranteeing rapid emergency responses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core values block */}
      <section className="py-5 text-center" style={{ backgroundColor: '#F5EFE3' }}>
        <div className="container py-4">
          <h2 className="mb-4" style={{ fontFamily: 'Poppins', color: '#0B4B3E', fontWeight: '700' }}>“Empathetic Hearts, Trusted Eyes.”</h2>
          <p className="lead text-muted max-width-600 mx-auto" style={{ fontSize: '18px' }}>
            We do not operate as an app; we operate as a family network. Join Caring Roots to keep your elderly parents healthy and your property investments safe.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
