import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import * as Icons from 'react-icons/fa';
import { FaHeartbeat, FaPills, FaUserMd, FaAmbulance, FaVideo, FaUserFriends, FaHome, FaLeaf, FaClipboardCheck, FaBolt, FaWrench, FaShieldAlt, FaRegMoneyBillAlt, FaArrowRight, FaTimes, FaCalendarAlt, FaUser, FaPhoneAlt, FaStickyNote, FaCheckCircle } from 'react-icons/fa';

// Map icon names to components dynamically
const iconMapping = {
  FaHeartbeat: <FaHeartbeat size={36} />,
  FaPills: <FaPills size={36} />,
  FaUserMd: <FaUserMd size={36} />,
  FaAmbulance: <FaAmbulance size={36} />,
  FaVideo: <FaVideo size={36} />,
  FaUserFriends: <FaUserFriends size={36} />,
  FaHome: <FaHome size={36} />,
  FaLeaf: <FaLeaf size={36} />,
  FaClipboardCheck: <FaClipboardCheck size={36} />,
  FaBolt: <FaBolt size={36} />,
  FaWrench: <FaWrench size={36} />,
  FaShieldAlt: <FaShieldAlt size={36} />,
  FaRegMoneyBillAlt: <FaRegMoneyBillAlt size={36} />
};

const Services = () => {
  const { user, token, apiUrl } = useContext(AuthContext);
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Parent Care');
  const [errorMsg, setErrorMsg] = useState('');

  // Booking Modal States
  const [selectedService, setSelectedService] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingFormData, setBookingFormData] = useState({
    parentName: '',
    parentAge: '',
    address: '',
    visitDate: '',
    emergencyContact: '',
    notes: ''
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${apiUrl}/services`);
        if (res.data.success) {
          setServices(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching database services:', err);
        // Fallback static data if backend connection issue to prevent blank pages
        setServices([
          { title: 'Daily Checkup Visits', description: 'Empathetic caretakers visiting parents daily to check health vitals, assist with meals, and provide visual comfort.', price: '₹4,500/Month', category: 'Parent Care', iconName: 'FaHeartbeat' },
          { title: 'Medicine Reminder', description: 'Automated tele-monitoring and dedicated calls to remind elders to take their exact medications on time.', price: '₹999/Month', category: 'Parent Care', iconName: 'FaPills' },
          { title: 'Hospital Assistance', description: 'Complete support for pre-planned doctor consultations, diagnostics support, and physical movement care.', price: '₹1,500/Visit', category: 'Parent Care', iconName: 'FaUserMd' },
          { title: 'Emergency Support', description: '24/7 dedicated local emergency backup coordination, ambulance requests, and prompt hospital check-ins.', price: '₹4,999/Year', category: 'Parent Care', iconName: 'FaAmbulance' },
          { title: 'Video Call Assistance', description: 'Friendly technologist visit to set up calls so you can chat face-to-face with your parents in absolute high definition.', price: '₹499/Session', category: 'Parent Care', iconName: 'FaVideo' },
          { title: 'Companion Visits', description: 'Warm care advocates visiting to read stories, take walks, and spend quality time to tackle senior isolation.', price: '₹1,200/Visit', category: 'Parent Care', iconName: 'FaUserFriends' },
          { title: 'House Cleaning', description: 'Premium deep sanitization, sweeping, dusting, and full home care conducted by trusted, fully verified experts.', price: '₹2,500/Visit', category: 'Property Maintenance', iconName: 'FaHome' },
          { title: 'Gardening', description: 'Routine soil care, plant watering, weeding, trimming, and seasonal nursery maintenance for your local garden.', price: '₹1,800/Month', category: 'Property Maintenance', iconName: 'FaLeaf' },
          { title: 'Land Inspection', description: 'High-definition photo/video evidence reports, perimeter boundary verification, and encroachment prevention patrols.', price: '₹3,500/Visit', category: 'Property Maintenance', iconName: 'FaClipboardCheck' },
          { title: 'Electrical Repair', description: 'On-demand resolution for wiring failures, short circuits, switch repairs, and electrical appliance setups.', price: '₹350/Hour', category: 'Property Maintenance', iconName: 'FaBolt' },
          { title: 'Plumbing Services', description: 'Expert fixes for pipe leaks, tap replacement, bathroom fittings adjustments, and water tank inspections.', price: '₹350/Hour', category: 'Property Maintenance', iconName: 'FaWrench' },
          { title: 'Security Checks', description: 'Weekly perimeter patrols, door-lock checking, smart alarm installation audit, and remote property reviews.', price: '₹2,999/Month', category: 'Property Maintenance', iconName: 'FaShieldAlt' },
          { title: 'Rent Monitoring', description: 'Liaison support, lease verification, tenant utility checklist checks, and hassle-free monthly rent deposit tracking.', price: '₹1,200/Month', category: 'Property Maintenance', iconName: 'FaRegMoneyBillAlt' }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [apiUrl]);

  const handleBookClick = (service) => {
    if (!token) {
      setErrorMsg('Kindly log in or register before booking a service.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Redirect to login shortly
      setTimeout(() => navigate('/login'), 2500);
      return;
    }
    setSelectedService(service);
    setErrorMsg('');
  };

  const handleInputChange = (e) => {
    setBookingFormData({
      ...bookingFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        serviceName: selectedService.title,
        parentName: bookingFormData.parentName,
        parentAge: bookingFormData.parentAge ? Number(bookingFormData.parentAge) : undefined,
        address: bookingFormData.address,
        visitDate: bookingFormData.visitDate,
        emergencyContact: bookingFormData.emergencyContact,
        notes: bookingFormData.notes
      };

      const res = await axios.post(`${apiUrl}/bookings/create`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        setBookingSuccess(true);
        // Reset states after brief confirmation
        setTimeout(() => {
          setSelectedService(null);
          setBookingSuccess(false);
          setBookingFormData({
            parentName: '',
            parentAge: '',
            address: '',
            visitDate: '',
            emergencyContact: '',
            notes: ''
          });
          navigate('/dashboard');
        }, 2500);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.response?.data?.error || 'Booking creation failed. Try again.');
    }
  };

  const filteredServices = services.filter((s) => s.category === activeCategory);

  return (
    <div className="container py-5 fade-in">
      <div className="text-center mx-auto mb-5" style={{ maxWidth: '650px' }}>
        <span className="badge px-3 py-2 mb-2 rounded-pill" style={{ backgroundColor: 'rgba(11, 75, 62, 0.12)', color: '#0B4B3E', fontSize: '13px', fontWeight: '700' }}>
          OUR SERVICE PORTFOLIO
        </span>
        <h1 className="mb-3" style={{ fontFamily: 'Poppins', fontWeight: '800' }}>Empathic Support & Maintenance</h1>
        <p className="text-muted">Choose from our verified eldercare packages or robust property security operations. Book custom setups in under a minute.</p>
      </div>

      {errorMsg && (
        <div className="alert alert-danger rounded-3 text-center mb-4 border-0 shadow-sm" style={{ fontWeight: '500' }}>
          {errorMsg}
        </div>
      )}

      {/* Modern Filter Navigation Pills */}
      <div className="d-flex justify-content-center mb-5">
        <div className="custom-nav-pill d-flex bg-white p-2 rounded-pill shadow-sm">
          <button
            onClick={() => setActiveCategory('Parent Care')}
            className={`nav-link border-0 ${activeCategory === 'Parent Care' ? 'active' : ''}`}
          >
            Parent Care Services
          </button>
          <button
            onClick={() => setActiveCategory('Property Maintenance')}
            className={`nav-link border-0 ${activeCategory === 'Property Maintenance' ? 'active' : ''}`}
          >
            Property Maintenance Services
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-teal-custom" role="status">
            <span className="visually-hidden">Cataloging services...</span>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {filteredServices.map((service, idx) => (
            <div className="col-lg-4 col-md-6" key={service.title || idx}>
              <div className="premium-card h-100 p-4 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <div style={{
                      width: '64px',
                      height: '64px',
                      backgroundColor: activeCategory === 'Parent Care' ? 'rgba(31, 182, 181, 0.1)' : 'rgba(11, 75, 62, 0.1)',
                      color: activeCategory === 'Parent Care' ? '#1FB6B5' : '#0B4B3E',
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {iconMapping[service.iconName] || <FaHeartbeat size={36} />}
                    </div>
                    <span className="fw-bold px-3 py-1 rounded-pill" style={{ backgroundColor: '#F8F9FA', color: '#0B4B3E', fontSize: '15px' }}>
                      {service.price}
                    </span>
                  </div>
                  
                  <h4 className="mb-2" style={{ fontSize: '18px', fontFamily: 'Poppins', fontWeight: '700', color: '#0B4B3E' }}>
                    {service.title}
                  </h4>
                  <p className="text-muted small mb-4" style={{ lineHeight: '1.6' }}>
                    {service.description}
                  </p>
                </div>

                <button
                  onClick={() => handleBookClick(service)}
                  className="btn btn-outline-custom w-100 d-flex align-items-center justify-content-center gap-2"
                  style={{ padding: '10px 0', fontSize: '14px' }}
                >
                  <span>Book Now</span>
                  <FaArrowRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Booking Form Dialog Modal overlay */}
      {selectedService && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(10, 22, 51, 0.6)',
          backdropFilter: 'blur(8px)',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflowY: 'auto',
          padding: '40px 10px'
        }}>
          <div className="premium-card shadow-lg" style={{ maxWidth: '650px', width: '100%', border: 'none' }}>
            
            {/* Header */}
            <div className="custom-card-header text-center" style={{ padding: '30px' }}>
              <button
                onClick={() => setSelectedService(null)}
                style={{ position: 'absolute', right: '20px', top: '20px', background: 'transparent', border: 'none', color: 'white' }}
              >
                <FaTimes size={20} />
              </button>
              <h3 className="text-white mb-1" style={{ fontFamily: 'Poppins' }}>Service Booking Request</h3>
              <p className="text-white-50 mb-0">Book caretaker or property maintenance experts in India</p>
            </div>

            {/* Body */}
            <div className="custom-card-body" style={{ padding: '30px' }}>
              {bookingSuccess ? (
                <div className="text-center py-5 animate__animated animate__zoomIn">
                  <FaCheckCircle className="text-success mb-3" size={64} />
                  <h4 style={{ fontFamily: 'Poppins', fontWeight: '700' }}>Booking Request Lodged!</h4>
                  <p className="text-muted">Your schedule is securely stored. Redirecting to your family dashboard...</p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit}>
                  {/* Service info banner */}
                  <div className="p-3 mb-4 rounded-3 d-flex justify-content-between align-items-center" style={{ backgroundColor: '#F5EFE3', border: '1px solid rgba(11, 75, 62, 0.1)' }}>
                    <div>
                      <small className="text-muted d-block text-uppercase fw-bold" style={{ fontSize: '10px' }}>Requested Package</small>
                      <strong className="text-dark fs-5">{selectedService.title}</strong>
                    </div>
                    <span className="badge bg-dark px-3 py-2 rounded-pill fs-6">{selectedService.price}</span>
                  </div>

                  <div className="row">
                    {/* Parent Specifications (only if Parent Care) */}
                    {selectedService.category === 'Parent Care' && (
                      <>
                        <div className="col-md-8 custom-form-group">
                          <label className="custom-form-label">Parent's Full Name</label>
                          <div className="custom-form-input-wrapper">
                            <span className="custom-form-input-icon"><FaUser /></span>
                            <input
                              type="text"
                              name="parentName"
                              className="custom-form-input"
                              placeholder="e.g. Ramesh Kumar"
                              value={bookingFormData.parentName}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-4 custom-form-group">
                          <label className="custom-form-label">Parent's Age</label>
                          <div className="custom-form-input-wrapper">
                            <input
                              type="number"
                              name="parentAge"
                              className="custom-form-input"
                              placeholder="e.g. 72"
                              style={{ paddingLeft: '20px' }}
                              value={bookingFormData.parentAge}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {/* Standard details */}
                    <div className="col-12 custom-form-group">
                      <label className="custom-form-label">
                        {selectedService.category === 'Parent Care' ? 'Parent Address in India' : 'Property Address in India'}
                      </label>
                      <div className="custom-form-input-wrapper">
                        <span className="custom-form-input-icon"><Icons.FaMapMarkerAlt /></span>
                        <input
                          type="text"
                          name="address"
                          className="custom-form-input"
                          placeholder="House, St, Sector, City, Pincode"
                          value={bookingFormData.address}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-6 custom-form-group">
                      <label className="custom-form-label">Preferred Visit Date</label>
                      <div className="custom-form-input-wrapper">
                        <span className="custom-form-input-icon"><FaCalendarAlt /></span>
                        <input
                          type="date"
                          name="visitDate"
                          className="custom-form-input"
                          value={bookingFormData.visitDate}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-6 custom-form-group">
                      <label className="custom-form-label">Emergency Contact Number</label>
                      <div className="custom-form-input-wrapper">
                        <span className="custom-form-input-icon"><FaPhoneAlt /></span>
                        <input
                          type="tel"
                          name="emergencyContact"
                          className="custom-form-input"
                          placeholder="Include country code"
                          value={bookingFormData.emergencyContact}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-12 custom-form-group">
                      <label className="custom-form-label">Additional Instructions / Health Notes</label>
                      <div className="custom-form-input-wrapper">
                        <span className="custom-form-input-icon"><FaStickyNote /></span>
                        <textarea
                          name="notes"
                          rows="3"
                          className="custom-form-input"
                          placeholder="Mention specific medication reminders, lock details, or companion requests here..."
                          value={bookingFormData.notes}
                          onChange={handleInputChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex gap-3 justify-content-end mt-4">
                    <button
                      type="button"
                      onClick={() => setSelectedService(null)}
                      className="btn btn-outline-custom"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-teal-custom px-4"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
