import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaArrowLeft } from 'react-icons/fa';

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Validations
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    if (formData.password.length < 6) {
      setErrorMsg('Password should be at least 6 characters.');
      return;
    }

    setLoading(true);
    const res = await register(formData.name, formData.email, formData.password, formData.phone);
    setLoading(false);

    if (res && res.success) {
      navigate('/dashboard');
    } else {
      setErrorMsg(res?.error || 'Registration failed.');
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '90vh' }}>
      <div className="premium-card w-100 shadow-lg" style={{ maxWidth: '520px' }}>
        
        {/* Header */}
        <div className="custom-card-header text-center" style={{ backgroundColor: '#0B4B3E' }}>
          <Link to="/login" style={{ position: 'absolute', left: '20px', top: '20px', color: 'white', textDecoration: 'none' }}>
            <FaArrowLeft size={16} />
          </Link>
          <div className="custom-card-icon-container mx-auto mb-2" style={{ width: '50px', height: '50px', backgroundColor: 'rgba(255, 255, 255, 0.15)', borderRadius: '12px' }}>
            🌳
          </div>
          <h4 className="text-white mb-0" style={{ fontFamily: 'Poppins', fontWeight: '600' }}>Register Family Account</h4>
          <p className="text-white-50 small mb-0">Join 450+ secure NRIs caring for roots</p>
        </div>

        {/* Body */}
        <div className="custom-card-body p-4" style={{ backgroundColor: 'white' }}>
          {errorMsg && (
            <div className="alert alert-danger rounded-3 text-center border-0 small py-2 mb-4" style={{ fontWeight: '500' }}>
              {errorMsg}
            </div>
          )}

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
              <label className="custom-form-label">Phone Number</label>
              <div className="custom-form-input-wrapper">
                <span className="custom-form-input-icon"><FaPhone /></span>
                <input
                  type="tel"
                  name="phone"
                  className="custom-form-input"
                  placeholder="e.g. +1 555 0199"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="custom-form-group">
                  <label className="custom-form-label">Password</label>
                  <div className="custom-form-input-wrapper">
                    <span className="custom-form-input-icon"><FaLock /></span>
                    <input
                      type="password"
                      name="password"
                      className="custom-form-input"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="custom-form-group">
                  <label className="custom-form-label">Confirm Password</label>
                  <div className="custom-form-input-wrapper">
                    <span className="custom-form-input-icon"><FaLock /></span>
                    <input
                      type="password"
                      name="confirmPassword"
                      className="custom-form-input"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-teal-custom w-100 mt-4 d-flex align-items-center justify-content-center"
              style={{ padding: '14px 0' }}
            >
              {loading ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Registering...</span>
                </div>
              ) : (
                <span>Register & Setup Dashboard</span>
              )}
            </button>
          </form>

          <div className="text-center mt-4">
            <span className="text-muted small">Already registered? </span>
            <Link to="/login" className="small fw-bold text-success text-decoration-none">
              Sign In
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Register;
