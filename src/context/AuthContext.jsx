import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Set standard API URL
  const API_URL = 'http://localhost:5000/api';

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        // Set axios default auth header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
          const res = await axios.get(`${API_URL}/users/profile`);
          if (res.data.success) {
            setUser(res.data.data);
          } else {
            handleLogout();
          }
        } catch (err) {
          console.error('Error loading user profile:', err);
          handleLogout();
        }
      } else {
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
      }
      setLoading(false);
    };

    loadUser();
  }, [token]);

  const handleRegister = async (name, email, password, phone) => {
    try {
      const res = await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
        phone
      });
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
        setUser(res.data.user);
        return { success: true };
      }
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || 'Registration failed. Please try again.'
      };
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { email, password });
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
        setUser(res.data.user);
        return { success: true };
      }
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || 'Login failed. Invalid credentials.'
      };
    }
  };

  const handleAdminLogin = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/auth/admin-login`, { email, password });
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
        setUser(res.data.user);
        return { success: true };
      }
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || 'Administrative login failed. Invalid credentials.'
      };
    }
  };

  const handlePartnerLogin = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/auth/partner-login`, { email, password });
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
        setUser(res.data.user);
        return { success: true };
      }
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || 'Partner login failed. Invalid credentials.'
      };
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  const handleUpdateProfile = async (name, phone, email) => {
    try {
      const res = await axios.put(`${API_URL}/users/update`, { name, phone, email });
      if (res.data.success) {
        setUser(res.data.data);
        return { success: true };
      }
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || 'Profile update failed.'
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        register: handleRegister,
        login: handleLogin,
        adminLogin: handleAdminLogin,
        partnerLogin: handlePartnerLogin,
        logout: handleLogout,
        updateProfile: handleUpdateProfile,
        apiUrl: API_URL
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
