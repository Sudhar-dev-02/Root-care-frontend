import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaUserCircle, FaSignOutAlt, FaChevronDown, FaThLarge } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-custom sticky-top">
      <div className="container">
        {/* Brand Logo exactly like reference screenshots */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <div className="d-flex align-items-center gap-2">
            <div style={{
              width: '42px',
              height: '42px',
              backgroundColor: '#0B4B3E',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: '0 4px 10px rgba(11, 75, 62, 0.15)'
            }}>
              {/* Custom High Quality SVG Tree Logo matching image */}
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M17 10l-5-5-5 5M18 15l-6-6-6 6" />
              </svg>
            </div>
            <span style={{
              fontSize: '24px',
              fontWeight: '800',
              fontFamily: 'Poppins',
              color: '#0B4B3E',
              letterSpacing: '-0.5px',
              lineHeight: 1
            }}>
              Caring Roots
            </span>
          </div>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ border: 'none', padding: '0' }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link nav-link-custom" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link nav-link-custom" to="/services">Services</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link nav-link-custom" to="/about">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link nav-link-custom" to="/contact">Contact</NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2">
            {user ? (
              <div className="dropdown">
                <button
                  className="btn btn-outline-custom dropdown-toggle d-flex align-items-center gap-2"
                  type="button"
                  id="profileDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ padding: '8px 20px', borderRadius: '50px' }}
                >
                  <FaUserCircle size={18} />
                  <span>Hi, {user.name.split(' ')[0]}</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end custom-dropdown-menu" aria-labelledby="profileDropdown">
                  <li>
                    <Link
                      className="dropdown-item dropdown-item-custom d-flex align-items-center gap-2"
                      to={
                        user.role === 'admin'
                          ? '/admin/dashboard'
                          : user.role === 'partner'
                          ? '/partner/dashboard'
                          : '/dashboard'
                      }
                    >
                      <FaThLarge size={14} />
                      <span>Dashboard</span>
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button
                      className="dropdown-item dropdown-item-custom text-danger d-flex align-items-center gap-2"
                      onClick={handleLogoutClick}
                    >
                      <FaSignOutAlt size={14} />
                      <span>Logout</span>
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="dropdown">
                <button
                  className="btn btn-primary-custom dropdown-toggle d-flex align-items-center gap-2"
                  type="button"
                  id="loginDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ padding: '10px 24px' }}
                >
                  <span>Portal Sign In</span>
                  <FaChevronDown size={12} />
                </button>
                <ul className="dropdown-menu dropdown-menu-end custom-dropdown-menu" aria-labelledby="loginDropdown">
                  <li>
                    <Link className="dropdown-item dropdown-item-custom" to="/login">
                      User Login
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item dropdown-item-custom" to="/admin/login">
                      Admin Login
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item dropdown-item-custom" to="/partner/login">
                      Partner Login
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <Link className="dropdown-item dropdown-item-custom text-center fw-bold text-success" to="/register">
                      Register User
                    </Link>
                  </li>
                </ul>
              </div>
            )}
            
            <Link
              to="/services"
              className="btn btn-teal-custom d-none d-md-inline-block"
              style={{ padding: '10px 24px' }}
            >
              Get Peace of Mind
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
