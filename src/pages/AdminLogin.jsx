import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaEnvelope, FaLock, FaArrowLeft } from 'react-icons/fa';

const AdminLogin = () => {
  const { adminLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: 'admin@caringroots.com', password: 'admin123' });
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const res = await adminLogin(formData.email, formData.password);
    setLoading(false);

    if (res && res.success) {
      navigate('/admin/dashboard');
    } else {
      setErrorMsg(res?.error || 'Invalid administrator credentials.');
    }
  };

  return (
    <div style={{ backgroundColor: '#F3F4F6', minHeight: '92vh', padding: '40px 10px' }} className="d-flex align-items-center justify-content-center">
      <div className="premium-card w-100 shadow-lg" style={{ maxWidth: '440px', border: 'none', borderRadius: '32px' }}>
        
        {/* Dark Green Top Card Header matching image exactly */}
        <div style={{
          backgroundColor: '#0B4B3E',
          padding: '35px 25px 35px 25px',
          borderTopLeftRadius: '32px',
          borderTopRightRadius: '32px',
          color: 'white',
          position: 'relative'
        }}>
          {/* Back link */}
          <Link to="/" style={{
            color: 'rgba(255, 255, 255, 0.7)',
            textDecoration: 'none',
            fontSize: '14px',
            fontFamily: 'Poppins',
            fontWeight: '600',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '20px'
          }}>
            <FaArrowLeft size={12} />
            <span>Back to Main Site</span>
          </Link>

          {/* Tree Logo Box & Description side-by-side */}
          <div className="d-flex align-items-center gap-3">
            <div style={{
              width: '52px',
              height: '52px',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}>
              {/* Outline tree matching image */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M17 10l-5-5-5 5M18 15l-6-6-6 6" />
              </svg>
            </div>
            <div>
              <h4 className="mb-0" style={{ fontFamily: 'Poppins', fontWeight: '700', fontSize: '18px', letterSpacing: '-0.2px' }}>
                Admin Control Center
              </h4>
              <p className="mb-0 text-white-50 small" style={{ fontSize: '13px' }}>
                System oversight & management.
              </p>
            </div>
          </div>
        </div>

        {/* White Card Body overlaying the header */}
        <div className="p-4 bg-white" style={{ borderBottomLeftRadius: '32px', borderBottomRightRadius: '32px' }}>
          
          <div className="text-center mb-4">
            <h2 style={{ fontFamily: 'Poppins', fontWeight: '800', color: '#0A1633', fontSize: '28px' }}>
              Welcome Back
            </h2>
            <p className="text-muted small italic">
              Even miles away, your roots are safe.
            </p>
          </div>

          {errorMsg && (
            <div className="alert alert-danger rounded-3 text-center border-0 small py-2 mb-4" style={{ fontWeight: '500' }}>
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleFormSubmit}>
            
            {/* Email Field matching image specs */}
            <div className="custom-form-group">
              <label className="custom-form-label" style={{ letterSpacing: '1.2px', fontSize: '11px', color: '#4B5563' }}>
                EMAIL ADDRESS
              </label>
              <div className="custom-form-input-wrapper">
                <span className="custom-form-input-icon"><FaEnvelope /></span>
                <input
                  type="email"
                  name="email"
                  className="custom-form-input"
                  placeholder="email@example.com"
                  style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', padding: '15px 15px 15px 50px', borderRadius: '16px' }}
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Password Field matching image specs */}
            <div className="custom-form-group">
              <label className="custom-form-label" style={{ letterSpacing: '1.2px', fontSize: '11px', color: '#4B5563' }}>
                PASSWORD
              </label>
              <div className="custom-form-input-wrapper">
                <span className="custom-form-input-icon"><FaLock /></span>
                <input
                  type="password"
                  name="password"
                  className="custom-form-input"
                  placeholder="••••••••"
                  style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', padding: '15px 15px 15px 50px', borderRadius: '16px' }}
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="btn w-100 d-flex align-items-center justify-content-center mt-4"
              style={{
                backgroundColor: '#0B4B3E',
                color: 'white',
                fontFamily: 'Poppins',
                fontWeight: '600',
                padding: '15px 0',
                borderRadius: '16px',
                border: 'none',
                transition: 'all 0.2s ease'
              }}
            >
              {loading ? (
                <div className="spinner-border spinner-border-sm text-white" role="status">
                  <span className="visually-hidden">Authorizing...</span>
                </div>
              ) : (
                <span>Access Admin Station</span>
              )}
            </button>
          </form>

          {/* Quick tips about seed */}
          <div className="mt-4 p-3 rounded text-center small" style={{ backgroundColor: '#F9FAFB', border: '1px solid #F3F4F6' }}>
            <span className="text-muted">Seed Account: </span>
            <span className="fw-semibold text-dark">admin@caringroots.com</span>
            <span className="text-muted"> / </span>
            <span className="fw-semibold text-dark">admin123</span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminLogin;
