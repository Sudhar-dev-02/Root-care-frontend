import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { FaUser, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaStickyNote, FaCheckCircle, FaFileAlt, FaSignOutAlt, FaTruckLoading, FaHistory } from 'react-icons/fa';

const PartnerDashboard = () => {
  const { user, token, logout, apiUrl } = useContext(AuthContext);

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Report execution form states
  const [activeReportId, setActiveReportId] = useState(null);
  const [reportText, setReportText] = useState('');
  const [reportStatus, setReportStatus] = useState('Completed');

  const fetchPartnerBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${apiUrl}/bookings/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setBookings(res.data.data);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to sync assigned jobs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchPartnerBookings();
    }
  }, [token, apiUrl]);

  const handleStartJob = async (id) => {
    try {
      setErrorMsg('');
      const res = await axios.put(`${apiUrl}/bookings/update/${id}`, { status: 'In Progress' }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setSuccessMsg('Job successfully updated to In Progress.');
        fetchPartnerBookings();
        setTimeout(() => setSuccessMsg(''), 3000);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to start job.');
    }
  };

  const handleOpenReportForm = (booking) => {
    setActiveReportId(booking._id);
    setReportText(booking.reportDetails || '');
    setReportStatus(booking.status === 'Completed' ? 'Completed' : 'Completed');
  };

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrorMsg('');
      const res = await axios.put(`${apiUrl}/bookings/update/${activeReportId}`, {
        status: reportStatus,
        reportDetails: reportText
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        setSuccessMsg('Visit execution report submitted successfully!');
        setActiveReportId(null);
        setReportText('');
        fetchPartnerBookings();
        setTimeout(() => setSuccessMsg(''), 3000);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to dispatch execution report.');
    }
  };

  return (
    <div className="container py-5 fade-in">
      <div className="row g-4">
        {/* Left Side: Profile Card */}
        <div className="col-lg-4">
          <div className="premium-card p-4 text-center">
            <div className="mx-auto mb-3" style={{
              width: '80px',
              height: '80px',
              backgroundColor: '#E0ECE9',
              borderRadius: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              color: '#0B4B3E',
              fontWeight: 'bold'
            }}>
              {user ? user.name[0].toUpperCase() : 'P'}
            </div>
            
            <h3 style={{ fontFamily: 'Poppins', fontWeight: '700', fontSize: '20px' }}>
              {user ? user.name : 'Care Partner'}
            </h3>
            <span className="badge bg-primary text-white px-3 py-1 rounded-pill mb-4 small fw-semibold">
              Certified Field Specialist
            </span>

            <div className="text-start border-top pt-4">
              <div className="d-flex align-items-center gap-3 mb-3 small">
                <FaUser className="text-muted" />
                <span className="text-dark">Partner Station Portal</span>
              </div>
              <div className="d-flex align-items-center gap-3 mb-3 small">
                <FaEnvelope className="text-muted" />
                <span className="text-dark">{user ? user.email : 'email@example.com'}</span>
              </div>
              <div className="d-flex align-items-center gap-3 small">
                <FaPhone className="text-muted" />
                <span className="text-dark">{user ? user.phone : 'No Phone'}</span>
              </div>
            </div>

            <button onClick={logout} className="btn btn-outline-danger w-100 mt-4 rounded-pill py-2 small" style={{ fontWeight: '600', fontSize: '13px' }}>
              <FaSignOutAlt className="me-2" /> Logout Portal
            </button>
          </div>
        </div>

        {/* Right Side: Assigned Tasks List */}
        <div className="col-lg-8">
          <div className="p-4 mb-4 rounded-4" style={{ backgroundColor: '#0B4B3E', color: 'white' }}>
            <h4 style={{ fontFamily: 'Poppins', fontWeight: '700' }}>Partner Station Workspace</h4>
            <p className="text-white-50 mb-0 small">Review parent checkup files, property layouts, and write home reports.</p>
          </div>

          {successMsg && (
            <div className="alert alert-success border-0 rounded-3 mb-4 text-center fw-bold small animate__animated animate__fadeIn">
              {successMsg}
            </div>
          )}
          {errorMsg && (
            <div className="alert alert-danger border-0 rounded-3 mb-4 text-center fw-bold small">
              {errorMsg}
            </div>
          )}

          <h3 className="mb-4" style={{ fontFamily: 'Poppins', fontWeight: '800', color: '#0B4B3E' }}>
            My Assigned Tasks
          </h3>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-teal-custom" role="status">
                <span className="visually-hidden">Syncing jobs...</span>
              </div>
            </div>
          ) : bookings.length === 0 ? (
            <div className="premium-card p-5 text-center">
              <FaHistory className="text-muted mb-3" size={48} />
              <h5 className="fw-semibold text-dark">No Jobs Assigned Yet</h5>
              <p className="text-muted small">We will alert you when administrators assign new eldercare checkups or properties.</p>
            </div>
          ) : (
            <div className="d-flex flex-column gap-4">
              {bookings.map((booking) => (
                <div className="premium-card p-4" key={booking._id} style={{ borderLeft: '5px solid #0B4B3E' }}>
                  
                  {/* Header details */}
                  <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                    <div>
                      <span className="badge bg-secondary text-uppercase small" style={{ fontSize: '10px' }}>
                        {booking.serviceName.includes('Daily') || booking.serviceName.includes('Remind') || booking.serviceName.includes('Hosp') || booking.serviceName.includes('Emerg') || booking.serviceName.includes('Companion') ? 'Elderly Care' : 'Property Maintenance'}
                      </span>
                      <h4 className="mb-0 mt-1" style={{ fontFamily: 'Poppins', fontWeight: '700', fontSize: '18px', color: '#0B4B3E' }}>
                        {booking.serviceName}
                      </h4>
                    </div>
                    <span className={`badge px-3 py-2 rounded-pill ${
                      booking.status === 'Approved' ? 'bg-primary' :
                      booking.status === 'In Progress' ? 'bg-info text-white animate-pulse' :
                      booking.status === 'Completed' ? 'bg-success' : 'bg-secondary'
                    }`}>
                      {booking.status}
                    </span>
                  </div>

                  {/* Visual specs */}
                  <div className="row g-3 bg-light p-3 rounded-3 mb-4 small">
                    {booking.parentName && (
                      <div className="col-sm-6">
                        <span className="text-muted d-block">Elder Patient Name:</span>
                        <strong className="text-dark">{booking.parentName} (Age: {booking.parentAge})</strong>
                      </div>
                    )}
                    <div className="col-sm-6">
                      <span className="text-muted d-block">India Service Location:</span>
                      <strong className="text-dark"><FaMapMarkerAlt className="text-muted me-1" />{booking.address}</strong>
                    </div>
                    <div className="col-sm-6">
                      <span className="text-muted d-block">Target Visit Date:</span>
                      <strong className="text-dark"><FaCalendarAlt className="text-muted me-1" />{new Date(booking.visitDate).toLocaleDateString()}</strong>
                    </div>
                    <div className="col-sm-6">
                      <span className="text-muted d-block">Client Contact Desk:</span>
                      <strong className="text-dark">{booking.userId ? `${booking.userId.name} (${booking.userId.phone})` : 'Unknown'}</strong>
                    </div>
                  </div>

                  {/* Notes */}
                  {booking.notes && (
                    <div className="mb-4 p-3 rounded bg-light border-start border-3 border-secondary small">
                      <FaStickyNote className="text-muted me-2" />
                      <strong>Family Notes: </strong>
                      <span className="text-muted">{booking.notes}</span>
                    </div>
                  )}

                  {/* Actions & Report details */}
                  <div className="d-flex gap-2 flex-wrap">
                    {booking.status === 'Approved' && (
                      <button
                        onClick={() => handleStartJob(booking._id)}
                        className="btn btn-teal-custom px-4 py-2 small d-flex align-items-center gap-2"
                      >
                        <FaTruckLoading />
                        <span>Start Work Visit</span>
                      </button>
                    )}
                    
                    {booking.status === 'In Progress' && (
                      <button
                        onClick={() => handleOpenReportForm(booking)}
                        className="btn btn-primary-custom px-4 py-2 small d-flex align-items-center gap-2"
                      >
                        <FaCheckCircle />
                        <span>Submit Work Report</span>
                      </button>
                    )}

                    {booking.status === 'Completed' && (
                      <button
                        onClick={() => handleOpenReportForm(booking)}
                        className="btn btn-outline-custom px-4 py-2 small d-flex align-items-center gap-2"
                      >
                        <FaFileAlt />
                        <span>View / Edit Submitted Report</span>
                      </button>
                    )}
                  </div>

                  {/* Custom inline form to write execution report */}
                  {activeReportId === booking._id && (
                    <form onSubmit={handleReportSubmit} className="mt-4 p-4 rounded-3 border bg-light animate__animated animate__slideInDown">
                      <h5 className="fw-bold mb-3" style={{ fontFamily: 'Poppins', color: '#0B4B3E' }}>Draft Visit Execution Report</h5>
                      
                      <div className="mb-3">
                        <label className="small fw-bold text-muted">Execution Report Details</label>
                        <textarea
                          rows="4"
                          className="form-control"
                          placeholder="Provide details of the vitals checked, drug prescriptions delivered, companion tasks completed, or property locks and gardening details..."
                          value={reportText}
                          onChange={(e) => setReportText(e.target.value)}
                          required
                        ></textarea>
                      </div>

                      <div className="mb-3">
                        <label className="small fw-bold text-muted">Status Update</label>
                        <select
                          className="form-select"
                          value={reportStatus}
                          onChange={(e) => setReportStatus(e.target.value)}
                        >
                          <option value="Completed">Complete & Log Job</option>
                          <option value="In Progress">Keep In Progress</option>
                        </select>
                      </div>

                      <div className="d-flex gap-2 justify-content-end">
                        <button
                          type="button"
                          onClick={() => setActiveReportId(null)}
                          className="btn btn-sm btn-outline-secondary px-3"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn btn-sm btn-teal-custom px-4"
                        >
                          Submit Report
                        </button>
                      </div>
                    </form>
                  )}

                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboard;
