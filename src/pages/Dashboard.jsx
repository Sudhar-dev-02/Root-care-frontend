import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { FaUser, FaPhone, FaEnvelope, FaCalendarAlt, FaClock, FaClipboardList, FaFileAlt, FaMapMarkerAlt, FaPlus, FaCheckCircle, FaUserShield, FaExclamationCircle } from 'react-icons/fa';

const Dashboard = () => {
  const { user, token, logout, apiUrl } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const res = await axios.get(`${apiUrl}/bookings/user`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.success) {
          setBookings(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setErrorMsg('Failed to sync live bookings.');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUserBookings();
    }
  }, [token, apiUrl]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return <span className="badge bg-warning text-dark px-3 py-2 rounded-pill">Pending Approval</span>;
      case 'Approved':
        return <span className="badge bg-primary px-3 py-2 rounded-pill">Approved & Assigned</span>;
      case 'In Progress':
        return <span className="badge bg-info text-white px-3 py-2 rounded-pill">In Progress</span>;
      case 'Completed':
        return <span className="badge bg-success px-3 py-2 rounded-pill">Completed</span>;
      case 'Rejected':
        return <span className="badge bg-danger px-3 py-2 rounded-pill">Rejected</span>;
      default:
        return <span className="badge bg-secondary px-3 py-2 rounded-pill">{status}</span>;
    }
  };

  const getStatusStepClass = (currentStatus, step) => {
    const steps = ['Pending', 'Approved', 'In Progress', 'Completed'];
    const currentIndex = steps.indexOf(currentStatus);
    const stepIndex = steps.indexOf(step);

    if (currentStatus === 'Rejected') return 'step-muted';
    if (stepIndex <= currentIndex) return 'step-active';
    return 'step-pending';
  };

  return (
    <div className="container py-5 fade-in">
      <div className="row g-4">
        {/* Profile Card left */}
        <div className="col-lg-4">
          <div className="premium-card p-4 text-center mb-4">
            <div className="mx-auto mb-3" style={{
              width: '80px',
              height: '80px',
              backgroundColor: '#F5EFE3',
              borderRadius: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              color: '#0B4B3E',
              fontWeight: 'bold'
            }}>
              {user ? user.name[0].toUpperCase() : 'U'}
            </div>
            
            <h3 style={{ fontFamily: 'Poppins', fontWeight: '700', fontSize: '20px' }}>
              {user ? user.name : 'Caring Roots Family'}
            </h3>
            <span className="badge bg-success-light text-success px-3 py-1 rounded-pill mb-4 small fw-semibold" style={{ backgroundColor: 'rgba(40,167,69,0.1)' }}>
              Verified NRI Customer
            </span>

            <div className="text-start border-top pt-4">
              <div className="d-flex align-items-center gap-3 mb-3 small">
                <FaEnvelope className="text-muted" />
                <span className="text-dark">{user ? user.email : 'email@example.com'}</span>
              </div>
              <div className="d-flex align-items-center gap-3 mb-3 small">
                <FaPhone className="text-muted" />
                <span className="text-dark">{user ? user.phone : 'No Phone'}</span>
              </div>
              <div className="d-flex align-items-center gap-3 small">
                <FaUserShield className="text-muted" />
                <span className="text-dark">Account Role: Standard User</span>
              </div>
            </div>

            <button onClick={logout} className="btn btn-outline-danger w-100 mt-4 rounded-pill py-2 small" style={{ fontWeight: '600', fontSize: '13px' }}>
              Logout Session
            </button>
          </div>

          {/* Quick Notice Banner */}
          <div className="premium-card p-4" style={{ backgroundColor: '#0B4B3E', color: 'white', border: 'none' }}>
            <h5 className="text-white mb-2" style={{ fontFamily: 'Poppins' }}>Support Hotline</h5>
            <p className="text-white-50 small mb-3">If you need immediate scheduling alterations, call your primary desk.</p>
            <strong className="d-block fs-5 text-white">+91 98765 43210</strong>
          </div>
        </div>

        {/* Previous and Active Bookings right */}
        <div className="col-lg-8">
          {/* Welcome Alert */}
          <div className="p-4 mb-4 rounded-4 d-flex justify-content-between align-items-center flex-wrap gap-3" style={{ backgroundColor: '#F5EFE3', border: '1px solid rgba(11, 75, 62, 0.08)' }}>
            <div>
              <h4 className="mb-1" style={{ fontFamily: 'Poppins', color: '#0B4B3E', fontWeight: '700' }}>
                Welcome Back, {user ? user.name.split(' ')[0] : 'User'}!
              </h4>
              <p className="text-muted mb-0 small">Easily check caretakers visits timeline logs or schedule new home upkeep audits.</p>
            </div>
            <Link to="/services" className="btn btn-teal-custom d-flex align-items-center gap-2">
              <FaPlus size={12} />
              <span>Book New Service</span>
            </Link>
          </div>

          <h3 className="mb-4" style={{ fontFamily: 'Poppins', fontWeight: '800', color: '#0B4B3E' }}>
            My Active Care Schedules
          </h3>

          {errorMsg && <div className="alert alert-danger border-0">{errorMsg}</div>}

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-teal-custom" role="status">
                <span className="visually-hidden">Syncing dashboard...</span>
              </div>
            </div>
          ) : bookings.length === 0 ? (
            <div className="premium-card p-5 text-center">
              <FaClipboardList className="text-muted mb-3" size={48} />
              <h5 className="fw-bold">No Booked Services Yet</h5>
              <p className="text-muted small">Keep your parents safe and properties secure by scheduling our elite caretakers.</p>
              <Link to="/services" className="btn btn-primary-custom px-4 mt-2">
                Browse Services Catalog
              </Link>
            </div>
          ) : (
            <div className="d-flex flex-column gap-4">
              {bookings.map((booking) => (
                <div className="premium-card p-4" key={booking._id} style={{ borderLeft: '5px solid #1FB6B5' }}>
                  
                  {/* Title & Status */}
                  <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                    <div>
                      <span className="text-uppercase small text-muted fw-bold d-block" style={{ fontSize: '10px', letterSpacing: '1px' }}>
                        Service Type
                      </span>
                      <h4 className="mb-0" style={{ fontFamily: 'Poppins', fontWeight: '700', fontSize: '18px', color: '#0B4B3E' }}>
                        {booking.serviceName}
                      </h4>
                    </div>
                    {getStatusBadge(booking.status)}
                  </div>

                  {/* Booking specifics info */}
                  <div className="row g-3 bg-light p-3 rounded-3 mb-4">
                    {booking.parentName && (
                      <div className="col-sm-6 small">
                        <span className="text-muted d-block">Parent Inspected:</span>
                        <strong className="text-dark">{booking.parentName} (Age: {booking.parentAge})</strong>
                      </div>
                    )}
                    <div className="col-sm-6 small">
                      <span className="text-muted d-block">India Service Location:</span>
                      <strong className="text-dark"><FaMapMarkerAlt className="text-muted me-1" />{booking.address}</strong>
                    </div>
                    <div className="col-sm-6 small">
                      <span className="text-muted d-block">Scheduled Visit Date:</span>
                      <strong className="text-dark"><FaCalendarAlt className="text-muted me-1" />{new Date(booking.visitDate).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</strong>
                    </div>
                    <div className="col-sm-6 small">
                      <span className="text-muted d-block">Emergency Local Phone:</span>
                      <strong className="text-dark"><FaPhone className="text-muted me-1" />{booking.emergencyContact}</strong>
                    </div>
                  </div>

                  {/* Partner details (if assigned) */}
                  {booking.assignedPartner ? (
                    <div className="p-3 mb-4 rounded-3 d-flex align-items-center justify-content-between flex-wrap gap-3" style={{ backgroundColor: 'rgba(31, 182, 181, 0.08)', border: '1px solid rgba(31, 182, 181, 0.2)' }}>
                      <div>
                        <small className="text-muted d-block text-uppercase fw-bold" style={{ fontSize: '10px' }}>Assigned Care Partner</small>
                        <strong className="text-dark">{booking.assignedPartner.name}</strong>
                      </div>
                      <a href={`tel:${booking.assignedPartner.phone}`} className="btn btn-sm btn-teal-custom rounded-pill px-3 py-2 small">
                        Call Caretaker
                      </a>
                    </div>
                  ) : booking.status !== 'Rejected' ? (
                    <div className="p-2 mb-4 text-center rounded bg-light small text-muted">
                      <FaClock className="me-1" /> Coordinator is matching the perfect local care advocate for your parents.
                    </div>
                  ) : null}

                  {/* Tracking Timeline steps */}
                  <div className="mb-4">
                    <h6 className="small fw-bold text-muted text-uppercase mb-3" style={{ letterSpacing: '0.5px' }}>Progress Tracking</h6>
                    
                    <div className="timeline-container d-flex justify-content-between text-center position-relative">
                      {/* Timeline connecting bar */}
                      <div style={{
                        position: 'absolute',
                        top: '15px',
                        left: '5%',
                        right: '5%',
                        height: '3px',
                        backgroundColor: '#E2E8F0',
                        zIndex: 1
                      }}></div>

                      {/* Step 1: Pending */}
                      <div className={`timeline-step ${getStatusStepClass(booking.status, 'Pending')}`} style={{ zIndex: 2 }}>
                        <div className="step-circle mx-auto">1</div>
                        <span className="small d-block mt-2 fw-semibold">Pending</span>
                      </div>

                      {/* Step 2: Approved */}
                      <div className={`timeline-step ${getStatusStepClass(booking.status, 'Approved')}`} style={{ zIndex: 2 }}>
                        <div className="step-circle mx-auto">2</div>
                        <span className="small d-block mt-2 fw-semibold">Approved</span>
                      </div>

                      {/* Step 3: In Progress */}
                      <div className={`timeline-step ${getStatusStepClass(booking.status, 'In Progress')}`} style={{ zIndex: 2 }}>
                        <div className="step-circle mx-auto">3</div>
                        <span className="small d-block mt-2 fw-semibold">In Progress</span>
                      </div>

                      {/* Step 4: Completed */}
                      <div className={`timeline-step ${getStatusStepClass(booking.status, 'Completed')}`} style={{ zIndex: 2 }}>
                        <div className="step-circle mx-auto">4</div>
                        <span className="small d-block mt-2 fw-semibold">Completed</span>
                      </div>
                    </div>
                  </div>

                  {/* Visit Report (if complete) */}
                  {booking.reportDetails && (
                    <div className="p-3 rounded-3" style={{ backgroundColor: '#F8FAF9', border: '1px solid #E2E8F0' }}>
                      <div className="d-flex align-items-center gap-2 mb-2 text-success">
                        <FaCheckCircle />
                        <h6 className="mb-0 fw-bold">Visit Execution Report Details</h6>
                      </div>
                      <p className="text-muted mb-0 small" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                        {booking.reportDetails}
                      </p>
                    </div>
                  )}

                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Styled JSX for the custom tracking timeline */}
      <style>{`
        .timeline-step {
          width: 20%;
        }
        .step-circle {
          width: 32px;
          height: 32px;
          border-radius: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 13px;
          background-color: #E2E8F0;
          color: #718096;
          border: 2px solid white;
          transition: all 0.3s ease;
        }
        .step-active .step-circle {
          background-color: #1FB6B5;
          color: white;
          box-shadow: 0 0 0 4px rgba(31, 182, 181, 0.2);
        }
        .step-pending .step-circle {
          background-color: #E2E8F0;
          color: #718096;
        }
        .step-active span {
          color: #1FB6B5;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
