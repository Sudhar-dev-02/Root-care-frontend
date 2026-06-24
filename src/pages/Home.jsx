import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeartbeat, FaHome, FaShieldAlt, FaUserCheck, FaPhoneSquareAlt, FaQuoteLeft, FaStar, FaChevronRight, FaClock } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="fade-in">
      {/* Premium Hero Section */}
      <section style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F5efe3 100%)', padding: '80px 0 100px 0' }}>
        <div className="container">
          <div className="row align-items-center g-5">
            {/* Left side text contents */}
            <div className="col-lg-7">
              <span className="badge px-3 py-2 mb-3 rounded-pill" style={{ backgroundColor: 'rgba(31, 182, 181, 0.12)', color: '#1FB6B5', fontSize: '14px', fontWeight: '700' }}>
                TRUSTED REMOTE ELDERCARE & PROPERTY PROTECTION
              </span>
              
              {/* High Fidelity Hero Heading exactly matching reference styling */}
              <h1 className="hero-heading mb-4">
                Worried About Your <span className="highlight-teal">Parents’</span> <span className="highlight-teal">Health</span> and <span className="highlight-gold" style={{ color: '#C8A27C' }}>Home in India</span> While You Live Abroad?
              </h1>
              
              <p className="lead text-muted mb-5" style={{ fontSize: '20px', fontWeight: '500', fontFamily: 'Inter' }}>
                “Even miles away, your roots are safe.” Connect with dedicated local guardians who offer medical assist, security checks, and companionships.
              </p>
              
              <div className="d-flex flex-wrap gap-3">
                <Link to="/services" className="btn btn-primary-custom d-flex align-items-center gap-2">
                  <span>Book Care Now</span>
                  <FaChevronRight size={12} />
                </Link>
                <Link to="/services" className="btn btn-outline-custom">
                  Explore Services
                </Link>
              </div>

              {/* Trust markers */}
              <div className="row g-3 mt-5">
                <div className="col-sm-4 d-flex align-items-center gap-2">
                  <div style={{ color: '#1FB6B5', fontSize: '20px' }}><FaUserCheck /></div>
                  <span className="fw-semibold text-muted small">100% Verified Staff</span>
                </div>
                <div className="col-sm-4 d-flex align-items-center gap-2">
                  <div style={{ color: '#1FB6B5', fontSize: '20px' }}><FaShieldAlt /></div>
                  <span className="fw-semibold text-muted small">Secure Data & Tracking</span>
                </div>
                <div className="col-sm-4 d-flex align-items-center gap-2">
                  <div style={{ color: '#1FB6B5', fontSize: '20px' }}><FaClock /></div>
                  <span className="fw-semibold text-muted small">24/7 Local Support</span>
                </div>
              </div>
            </div>

            {/* Right side custom dashboard mockups resembling uploaded image style */}
            <div className="col-lg-5">
              <div className="premium-card p-4" style={{ border: '2px solid rgba(11, 75, 62, 0.08)', position: 'relative' }}>
                {/* Visual Header representing Admin control screen or partner card */}
                <div style={{
                  backgroundColor: '#0B4B3E',
                  borderRadius: '16px',
                  padding: '20px',
                  color: 'white',
                  marginBottom: '25px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px'
                }}>
                  <div style={{ width: '45px', height: '45px', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '10px', display: 'flex', alignItems: 'center', justify: 'center' }}>
                    🌳
                  </div>
                  <div>
                    <h5 className="mb-0 text-white" style={{ fontSize: '16px' }}>Caring Roots Shield</h5>
                    <small className="text-white-50">Active Care Guarantee</small>
                  </div>
                </div>

                {/* Sub features mockup inside dashboard preview */}
                <div className="p-3 mb-3 rounded-3" style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-bold text-dark small">Daily Health check</span>
                    <span className="badge bg-success rounded-pill">Completed</span>
                  </div>
                  <p className="text-muted mb-0 small">"Checked Father's BP (120/80) & delivered medicine. Shared video logs."</p>
                  <small className="text-muted d-block mt-2 text-end">- Care Partner Rajesh</small>
                </div>

                <div className="p-3 mb-3 rounded-3" style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-bold text-dark small">House Security Guard Check</span>
                    <span className="badge bg-info text-white rounded-pill">In Progress</span>
                  </div>
                  <p className="text-muted mb-0 small">"Lock examination and gardening patrol scheduled at Bangalore Villa."</p>
                </div>

                <div className="text-center mt-3">
                  <div className="d-flex align-items-center justify-content-center gap-1 text-warning mb-1">
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                  </div>
                  <span className="small text-muted fw-semibold">Trusted by 450+ NRIs globally</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services split overview (Eldercare vs Property) */}
      <section className="py-5" style={{ backgroundColor: '#FAFBF9' }}>
        <div className="container py-4">
          <div className="text-center max-width-600 mx-auto mb-5">
            <h2 className="section-title">Our Solutions for Your Peace of Mind</h2>
            <p className="text-muted">Empathetic caretaking packages tailored specifically for your two primary worries in India.</p>
          </div>

          <div className="row g-4">
            {/* Category 1: Parent Care */}
            <div className="col-lg-6">
              <div className="premium-card h-100 p-5 d-flex flex-column justify-content-between" style={{ borderTop: '6px solid #1FB6B5' }}>
                <div>
                  <div className="d-inline-flex align-items-center justify-content-center mb-4" style={{ width: '60px', height: '60px', backgroundColor: 'rgba(31, 182, 181, 0.1)', color: '#1FB6B5', borderRadius: '16px' }}>
                    <FaHeartbeat size={30} />
                  </div>
                  <h3 className="mb-3" style={{ fontFamily: 'Poppins' }}>Eldercare & Parent Care</h3>
                  <p className="text-muted mb-4" style={{ lineHeight: '1.7' }}>
                    Ensure your elderly parents in India never feel lonely or neglected. Our caretakers visit them, track medical needs, accompany them to hospitals, and coordinates immediate emergency logistics.
                  </p>
                  <ul className="list-unstyled d-flex flex-column gap-2 text-muted mb-4">
                    <li>✓ Daily checkups & physical vital monitoring</li>
                    <li>✓ Medicine reminders & home pharmacy deliveries</li>
                    <li>✓ Accompanied visits to specialists & doctor appointments</li>
                    <li>✓ Emergency coordination & instant response protocols</li>
                  </ul>
                </div>
                <Link to="/services" className="btn btn-outline-custom w-100 mt-2">
                  View Parent Services
                </Link>
              </div>
            </div>

            {/* Category 2: Property Maintenance */}
            <div className="col-lg-6">
              <div className="premium-card h-100 p-5 d-flex flex-column justify-content-between" style={{ borderTop: '6px solid #0B4B3E' }}>
                <div>
                  <div className="d-inline-flex align-items-center justify-content-center mb-4" style={{ width: '60px', height: '60px', backgroundColor: 'rgba(11, 75, 62, 0.1)', color: '#0B4B3E', borderRadius: '16px' }}>
                    <FaHome size={30} />
                  </div>
                  <h3 className="mb-3" style={{ fontFamily: 'Poppins' }}>Property Maintenance</h3>
                  <p className="text-muted mb-4" style={{ lineHeight: '1.7' }}>
                    Protect your hard-earned investments and property holdings in India. We coordinate periodic deep cleanups, gardening, electrical work, plumbing audits, perimeter checkups, and tenant management.
                  </p>
                  <ul className="list-unstyled d-flex flex-column gap-2 text-muted mb-4">
                    <li>✓ Deep villa/flat cleaning & sanitizations</li>
                    <li>✓ Active security monitoring & fence inspections</li>
                    <li>✓ General electrical, plumbing, & painter fixes</li>
                    <li>✓ Tenant verification & lease tracking coordination</li>
                  </ul>
                </div>
                <Link to="/services" className="btn btn-primary-custom w-100 mt-2">
                  View Property Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Safety Features */}
      <section className="py-5" style={{ backgroundColor: '#F5EFE3' }}>
        <div className="container py-4">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: '600px' }}>
            <h2 className="mb-3" style={{ color: '#0B4B3E' }}>Why NRI Families Choose Us</h2>
            <p className="text-muted">Built on trust, empathy, and high-fidelity real-time reporting.</p>
          </div>

          <div className="row g-4 text-center">
            <div className="col-md-4">
              <div className="premium-card p-4 h-100">
                <div className="mx-auto mb-3" style={{ width: '50px', height: '50px', backgroundColor: 'rgba(11,75,62,0.1)', borderRadius: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0B4B3E' }}>
                  <FaUserCheck size={24} />
                </div>
                <h5 className="fw-bold mb-2">Verified Care Advocates</h5>
                <p className="text-muted small mb-0">Every care companion and partner undergoes thorough criminal background checks, address audits, and intense eldercare training.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="premium-card p-4 h-100">
                <div className="mx-auto mb-3" style={{ width: '50px', height: '50px', backgroundColor: 'rgba(11,75,62,0.1)', borderRadius: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0B4B3E' }}>
                  <FaShieldAlt size={24} />
                </div>
                <h5 className="fw-bold mb-2">Detailed Visual Reports</h5>
                <p className="text-muted small mb-0">Receive complete PDF checkup logs, high-resolution property snapshots, and video updates after every single scheduled visit.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="premium-card p-4 h-100">
                <div className="mx-auto mb-3" style={{ width: '50px', height: '50px', backgroundColor: 'rgba(11,75,62,0.1)', borderRadius: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0B4B3E' }}>
                  <FaPhoneSquareAlt size={24} />
                </div>
                <h5 className="fw-bold mb-2">24/7 Medical SOS</h5>
                <p className="text-muted small mb-0">Emergency logistics support. We maintain associations with local cardiac centers and private ambulances for lightning-fast deployments.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-5" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container py-4">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: '600px' }}>
            <h2 className="section-title">What Our Global NRI Families Say</h2>
            <p className="text-muted">Stories of comfort, trust, and absolute peace of mind from London, Silicon Valley, and Toronto.</p>
          </div>

          <div className="row g-4">
            <div className="col-md-6 col-lg-4">
              <div className="premium-card p-4 h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="text-warning mb-2"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>
                  <p className="text-muted italic mb-3">
                    "Living in Boston, I was always anxious about my father’s daily checkups in Chennai. The Daily visits and vitals checkups from Caring Roots have given my entire family a sigh of relief. The care coordinators are extremely professional and treat them like their own family."
                  </p>
                </div>
                <div className="d-flex align-items-center gap-3 border-top pt-3">
                  <div style={{ width: '40px', height: '40px', backgroundColor: '#DFD3BE', borderRadius: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>AS</div>
                  <div>
                    <h6 className="mb-0 text-dark">Aditi Sharma</h6>
                    <small className="text-muted">Boston, USA</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="premium-card p-4 h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="text-warning mb-2"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>
                  <p className="text-muted italic mb-3">
                    "Our home in Gurgaon was vacant and prone to local disputes. The weekly perimeter inspections, lock auditing, and lawn gardening reports sent by Caring Roots are incredible. I highly recommend their property services."
                  </p>
                </div>
                <div className="d-flex align-items-center gap-3 border-top pt-3">
                  <div style={{ width: '40px', height: '40px', backgroundColor: '#DFD3BE', borderRadius: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>RK</div>
                  <div>
                    <h6 className="mb-0 text-dark">Rohan Kapoor</h6>
                    <small className="text-muted">London, UK</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4 mx-auto">
              <div className="premium-card p-4 h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="text-warning mb-2"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>
                  <p className="text-muted italic mb-3">
                    "The medical ambulance assistance team at Caring Roots is real. When my mother had a sudden drop in glucose, their local partner reached her within 12 minutes, admitted her, and coordinated with me via video call. I cannot thank them enough."
                  </p>
                </div>
                <div className="d-flex align-items-center gap-3 border-top pt-3">
                  <div style={{ width: '40px', height: '40px', backgroundColor: '#DFD3BE', borderRadius: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>VM</div>
                  <div>
                    <h6 className="mb-0 text-dark">Vikram Mehta</h6>
                    <small className="text-muted">Toronto, Canada</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic FAQ Accordion */}
      <section className="py-5" style={{ backgroundColor: '#FAF9F6' }}>
        <div className="container py-4">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: '650px' }}>
            <h2 className="mb-3">Frequently Answered Queries</h2>
            <p className="text-muted">Clear details about how we ensure top-tier care from thousands of miles away.</p>
          </div>

          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="accordion" id="faqAccordion">
                {/* FAQ 1 */}
                <div className="accordion-item custom-accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button className="accordion-button custom-accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      How do I verify the background and safety of your caretakers?
                    </button>
                  </h2>
                  <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faqAccordion">
                    <div className="accordion-body text-muted" style={{ fontSize: '15px' }}>
                      All Caring Roots Care Partners undergo rigid screening: biometric verification, local address audits, clean record registry checkup, and reference checks. They are also constantly guided by senior medical advisors.
                    </div>
                  </div>
                </div>

                {/* FAQ 2 */}
                <div className="accordion-item custom-accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button className="accordion-button custom-accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                      What happens in case of an immediate medical emergency?
                    </button>
                  </h2>
                  <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faqAccordion">
                    <div className="accordion-body text-muted" style={{ fontSize: '15px' }}>
                      We assign a dedicated emergency emergency team to your parents. If they click their dashboard panic button, our nearest partner rushes to the site, manages the ambulance, stays at the hospital, and operates as your local hands.
                    </div>
                  </div>
                </div>

                {/* FAQ 3 */}
                <div className="accordion-item custom-accordion-item">
                  <h2 className="accordion-header" id="headingThree">
                    <button className="accordion-button custom-accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                      Can I inspect my vacant properties on demand?
                    </button>
                  </h2>
                  <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#faqAccordion">
                    <div className="accordion-body text-muted" style={{ fontSize: '15px' }}>
                      Yes. In addition to our subscription schedule, you can book an express "Land/Property Inspection" through your dashboard. Our property partner will visit and upload high-resolution video proofs.
                    </div>
                  </div>
                </div>

                {/* FAQ 4 */}
                <div className="accordion-item custom-accordion-item">
                  <h2 className="accordion-header" id="headingFour">
                    <button className="accordion-button custom-accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                      How will I pay from outside of India?
                    </button>
                  </h2>
                  <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#faqAccordion">
                    <div className="accordion-body text-muted" style={{ fontSize: '15px' }}>
                      We support major international credit/debit cards, bank wire transfers, and localized payment gateway gateways. Receipts are automatically saved inside your online dashboard.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-5" style={{ backgroundColor: '#0B4B3E', color: 'white' }}>
        <div className="container py-4 text-center">
          <h2 className="text-white mb-3" style={{ fontFamily: 'Poppins', fontWeight: '700' }}>Get Peace of Mind for Your Family Today</h2>
          <p className="text-white-50 max-width-600 mx-auto mb-4" style={{ fontSize: '17px' }}>Join over 450+ families in USA, UK, and Canada who trust us to manage their parents’ wellness and home upkeep.</p>
          <Link to="/register" className="btn btn-teal-custom" style={{ padding: '14px 38px', fontSize: '16px' }}>
            Create Your Account
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
