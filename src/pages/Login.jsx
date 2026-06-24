import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaEnvelope, FaLock, FaArrowLeft } from 'react-icons/fa';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const res = await login(formData.email, formData.password);
    setLoading(false);

    if (res && res.success) {
      navigate('/dashboard');
    } else {
      setErrorMsg(res?.error || 'Invalid credentials.');
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="premium-card w-100 shadow-lg" style={{ maxWidth: '480px' }}>
        
        {/* Themed Header exactly matching reference styling */}
        <div className="custom-card-header text-center" style={{ backgroundColor: '#0B4B3E' }}>
          <Link to="/" style={{ position: 'absolute', left: '20px', top: '20px', color: 'white', textDecoration: 'none' }}>
            <FaArrowLeft size={16} />
          </Link>
          <div className="custom-card-icon-container mx-auto mb-2" style={{ width: '50px', height: '50px', backgroundColor: 'rgba(255, 255, 255, 0.15)', borderRadius: '12px' }}>
            🌳
          </div>
          <h4 className="text-white mb-0" style={{ fontFamily: 'Poppins', fontWeight: '600' }}>User Portal</h4>
          <p className="text-white-50 small mb-0">Eldercare & property coordinates</p>
        </div>

        {/* Main Body */}
        <div className="custom-card-body p-4" style={{ backgroundColor: 'white' }}>
          <div className="text-center mb-4">
            <h3 style={{ fontFamily: 'Poppins', fontWeight: '800', color: '#0A1633' }}>Welcome Back</h3>
            <p className="text-muted small">“Even miles away, your roots are safe.”</p>
          </div>

          {errorMsg && (
            <div className="alert alert-danger rounded-3 text-center border-0 small py-2 mb-4" style={{ fontWeight: '500' }}>
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleFormSubmit}>
            <div className="custom-form-group">
              <label className="custom-form-label">Email Address</label>
              <div className="custom-form-input-wrapper">
                <span className="custom-form-input-icon"><FaEnvelope /></span>
                <input
                  type="email"
                  name="email"
                  className="custom-form-input"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

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

            <button
              type="submit"
              disabled={loading}
              className="btn btn-teal-custom w-100 mt-4 d-flex align-items-center justify-content-center"
              style={{ padding: '14px 0' }}
            >
              {loading ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Validating...</span>
                </div>
              ) : (
                <span>Sign In to Dashboard</span>
              )}
            </button>
          </form>

          <div className="text-center mt-4">
            <span className="text-muted small">New to Caring Roots? </span>
            <Link to="/register" className="small fw-bold text-success text-decoration-none">
              Register Account
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
