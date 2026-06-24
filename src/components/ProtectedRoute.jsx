import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, token, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <div className="spinner-border text-teal-custom" role="status" style={{ width: '3.5rem', height: '3.5rem' }}>
          <span className="visually-hidden">Loading Caring Roots...</span>
        </div>
      </div>
    );
  }

  if (!token) {
    // Redirect unauthorized guests to their specific portal logins
    if (allowedRoles && allowedRoles.includes('admin')) {
      return <Navigate to="/admin/login" replace />;
    }
    if (allowedRoles && allowedRoles.includes('partner')) {
      return <Navigate to="/partner/login" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && (!user || !allowedRoles.includes(user.role))) {
    // If logged in but role mismatch, go to their fallback dashboard or home
    if (user && user.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    }
    if (user && user.role === 'partner') {
      return <Navigate to="/partner/dashboard" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
