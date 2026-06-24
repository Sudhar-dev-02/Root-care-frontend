import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { FaUserFriends, FaBook, FaTasks, FaCheckCircle, FaTrash, FaCheck, FaTimes, FaPlus, FaWrench, FaSignOutAlt, FaChartBar, FaUserLock } from 'react-icons/fa';

const AdminDashboard = () => {
  const { user, token, logout, apiUrl } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // Service Management Create Form States
  const [newService, setNewService] = useState({
    title: '',
    description: '',
    price: '',
    category: 'Parent Care',
    iconName: 'FaHeartbeat'
  });

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setLoading(true);
        // Fetch Bookings
        const resBookings = await axios.get(`${apiUrl}/bookings/all`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (resBookings.data.success) {
          setBookings(resBookings.data.data);
        }

        // Fetch Users/Partners
        const resUsers = await axios.get(`${apiUrl}/users/all`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (resUsers.data.success) {
          setUsers(resUsers.data.data);
        }

        // Fetch Services
        const resServices = await axios.get(`${apiUrl}/services`);
        if (resServices.data.success) {
          setServices(resServices.data.data);
        }
      } catch (err) {
        console.error('Error fetching admin data:', err);
        setErrorMsg('Database synchronization failed.');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchAdminData();
    }
  }, [token, apiUrl]);

  const handleUpdateStatus = async (id, statusVal) => {
    try {
      const res = await axios.put(`${apiUrl}/bookings/update/${id}`, { status: statusVal }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setBookings(bookings.map(b => b._id === id ? { ...b, status: statusVal } : b));
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to update booking status.');
    }
  };

  const handleAssignPartner = async (id, partnerId) => {
    try {
      const res = await axios.put(`${apiUrl}/bookings/update/${id}`, { assignedPartner: partnerId || null }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        // Refetch to populate partner info
        const updated = await axios.get(`${apiUrl}/bookings/all`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(updated.data.data);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to assign partner.');
    }
  };

  const handleDeleteBooking = async (id) => {
    if (!window.confirm('Are you absolute sure you want to delete this booking?')) return;
    try {
      const res = await axios.delete(`${apiUrl}/bookings/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setBookings(bookings.filter(b => b._id !== id));
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Deletion failed.');
    }
  };

  const handleCreateService = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/services/create`, newService, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setServices([...services, res.data.data]);
        setNewService({ title: '', description: '', price: '', category: 'Parent Care', iconName: 'FaHeartbeat' });
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Service creation failed.');
    }
  };

  const handleDeleteService = async (id) => {
    if (!window.confirm('Delete this service?')) return;
    try {
      const res = await axios.delete(`${apiUrl}/services/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setServices(services.filter(s => s._id !== id));
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Service deletion failed.');
    }
  };

  // Metrics counting
  const totalUsersCount = users.filter(u => u.role === 'user').length;
  const totalPartnersCount = users.filter(u => u.role === 'partner').length;
  const pendingBookings = bookings.filter(b => b.status === 'Pending').length;
  const completedBookings = bookings.filter(b => b.status === 'Completed').length;

  return (
    <div className="container-fluid py-5 fade-in">
      <div className="row">
        
        {/* Left Admin Navigation Sidebar */}
        <div className="col-lg-3 mb-4">
          <div className="premium-card p-4" style={{ borderLeft: '4px solid #0B4B3E' }}>
            <h4 className="mb-4 text-center" style={{ fontFamily: 'Poppins', fontWeight: '700' }}>Admin Central</h4>
            <div className="d-flex flex-column gap-2">
              <button
                onClick={() => setActiveTab('bookings')}
                className={`btn text-start rounded-pill py-2 px-3 fw-bold small ${activeTab === 'bookings' ? 'btn-primary-custom' : 'btn-light text-dark'}`}
              >
                <FaBook className="me-2" /> Bookings Control
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`btn text-start rounded-pill py-2 px-3 fw-bold small ${activeTab === 'users' ? 'btn-primary-custom' : 'btn-light text-dark'}`}
              >
                <FaUserFriends className="me-2" /> Manage Users ({totalUsersCount})
              </button>
              <button
                onClick={() => setActiveTab('partners')}
                className={`btn text-start rounded-pill py-2 px-3 fw-bold small ${activeTab === 'partners' ? 'btn-primary-custom' : 'btn-light text-dark'}`}
              >
                <FaUserLock className="me-2" /> Partners Desk ({totalPartnersCount})
              </button>
              <button
                onClick={() => setActiveTab('services')}
                className={`btn text-start rounded-pill py-2 px-3 fw-bold small ${activeTab === 'services' ? 'btn-primary-custom' : 'btn-light text-dark'}`}
              >
                <FaWrench className="me-2" /> Service Manager
              </button>
              <hr className="my-3" />
              <button onClick={logout} className="btn btn-outline-danger rounded-pill py-2 fw-bold small">
                <FaSignOutAlt className="me-2" /> Logout Admin
              </button>
            </div>
          </div>
        </div>

        {/* Right Dashboard Contents */}
        <div className="col-lg-9">
          {errorMsg && (
            <div className="alert alert-danger border-0 rounded-3 mb-4">
              {errorMsg}
            </div>
          )}

          {/* Quick Analytics Cards */}
          <div className="row g-3 mb-5">
            <div className="col-md-3 col-6">
              <div className="premium-card p-3 text-center" style={{ borderLeft: '4px solid #0B4B3E' }}>
                <small className="text-muted text-uppercase fw-bold" style={{ fontSize: '10px' }}>Total Bookings</small>
                <h2 className="mb-0 fw-bold mt-1" style={{ color: '#0B4B3E' }}>{bookings.length}</h2>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="premium-card p-3 text-center" style={{ borderLeft: '4px solid #1FB6B5' }}>
                <small className="text-muted text-uppercase fw-bold" style={{ fontSize: '10px' }}>Pending Tasks</small>
                <h2 className="mb-0 fw-bold mt-1" style={{ color: '#1FB6B5' }}>{pendingBookings}</h2>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="premium-card p-3 text-center" style={{ borderLeft: '#28A745 4px solid' }}>
                <small className="text-muted text-uppercase fw-bold" style={{ fontSize: '10px' }}>Completed Jobs</small>
                <h2 className="mb-0 fw-bold mt-1" style={{ color: '#28A745' }}>{completedBookings}</h2>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="premium-card p-3 text-center" style={{ borderLeft: '#DC3545 4px solid' }}>
                <small className="text-muted text-uppercase fw-bold" style={{ fontSize: '10px' }}>Staff Partners</small>
                <h2 className="mb-0 fw-bold mt-1" style={{ color: '#DC3545' }}>{totalPartnersCount}</h2>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-teal-custom" role="status">
                <span className="visually-hidden">Fetching records...</span>
              </div>
            </div>
          ) : (
            <>
              {/* TAB 1: BOOKINGS */}
              {activeTab === 'bookings' && (
                <div className="premium-card p-4">
                  <h3 className="mb-4" style={{ fontFamily: 'Poppins', fontWeight: '800' }}>Active Live Care Bookings</h3>
                  <div className="table-responsive">
                    <table className="table align-middle table-hover small">
                      <thead className="table-dark">
                        <tr>
                          <th>User / Email</th>
                          <th>Service Type</th>
                          <th>Parent / Address</th>
                          <th>Preferred Date</th>
                          <th>Status</th>
                          <th>Assign Partner</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.map((booking) => (
                          <tr key={booking._id}>
                            <td>
                              <strong className="text-dark d-block">{booking.userId ? booking.userId.name : 'Unknown'}</strong>
                              <small className="text-muted">{booking.userId ? booking.userId.email : 'Unknown'}</small>
                            </td>
                            <td><span className="fw-semibold text-primary">{booking.serviceName}</span></td>
                            <td>
                              {booking.parentName && <strong className="text-dark d-block">Parent: {booking.parentName} ({booking.parentAge})</strong>}
                              <small className="text-muted">{booking.address}</small>
                            </td>
                            <td>{new Date(booking.visitDate).toLocaleDateString()}</td>
                            <td>
                              <span className={`badge px-2 py-1 rounded-pill ${
                                booking.status === 'Pending' ? 'bg-warning text-dark' :
                                booking.status === 'Approved' ? 'bg-primary' :
                                booking.status === 'In Progress' ? 'bg-info text-white' :
                                booking.status === 'Completed' ? 'bg-success' : 'bg-danger'
                              }`}>
                                {booking.status}
                              </span>
                            </td>
                            <td>
                              <select
                                className="form-select form-select-sm"
                                value={booking.assignedPartner ? booking.assignedPartner._id : ''}
                                onChange={(e) => handleAssignPartner(booking._id, e.target.value)}
                              >
                                <option value="">-- Match Partner --</option>
                                {users.filter(u => u.role === 'partner').map(p => (
                                  <option key={p._id} value={p._id}>{p.name}</option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <div className="d-flex gap-1">
                                {booking.status === 'Pending' && (
                                  <>
                                    <button onClick={() => handleUpdateStatus(booking._id, 'Approved')} className="btn btn-sm btn-success p-1" title="Approve"><FaCheck /></button>
                                    <button onClick={() => handleUpdateStatus(booking._id, 'Rejected')} className="btn btn-sm btn-danger p-1" title="Reject"><FaTimes /></button>
                                  </>
                                )}
                                {booking.status === 'Approved' && (
                                  <button onClick={() => handleUpdateStatus(booking._id, 'In Progress')} className="btn btn-sm btn-info text-white p-1" style={{ fontSize: '10px' }}>Start</button>
                                )}
                                {booking.status === 'In Progress' && (
                                  <button onClick={() => handleUpdateStatus(booking._id, 'Completed')} className="btn btn-sm btn-success p-1" style={{ fontSize: '10px' }}>Done</button>
                                )}
                                <button onClick={() => handleDeleteBooking(booking._id)} className="btn btn-sm btn-outline-danger p-1"><FaTrash /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 2: USERS */}
              {activeTab === 'users' && (
                <div className="premium-card p-4">
                  <h3 className="mb-4" style={{ fontFamily: 'Poppins', fontWeight: '800' }}>Platform Registered Users</h3>
                  <div className="table-responsive">
                    <table className="table align-middle table-hover small">
                      <thead className="table-dark">
                        <tr>
                          <th>Full Name</th>
                          <th>Email Address</th>
                          <th>Phone Number</th>
                          <th>Joined Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.filter(u => u.role === 'user').map(u => (
                          <tr key={u._id}>
                            <td><strong>{u.name}</strong></td>
                            <td>{u.email}</td>
                            <td>{u.phone}</td>
                            <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 3: PARTNERS */}
              {activeTab === 'partners' && (
                <div className="premium-card p-4">
                  <h3 className="mb-4" style={{ fontFamily: 'Poppins', fontWeight: '800' }}>Service Partners / Workers Portal</h3>
                  <div className="table-responsive">
                    <table className="table align-middle table-hover small">
                      <thead className="table-dark">
                        <tr>
                          <th>Partner Name</th>
                          <th>Email Address</th>
                          <th>Phone Number</th>
                          <th>System Role</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.filter(u => u.role === 'partner').map(p => (
                          <tr key={p._id}>
                            <td><strong>{p.name}</strong></td>
                            <td>{p.email}</td>
                            <td>{p.phone}</td>
                            <td><span className="badge bg-secondary">Service Partner</span></td>
                            <td><span className="badge bg-success">Active Ready</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 4: SERVICES */}
              {activeTab === 'services' && (
                <div className="premium-card p-4">
                  <h3 className="mb-4" style={{ fontFamily: 'Poppins', fontWeight: '800' }}>Dynamic Service Offerings</h3>
                  
                  <div className="row g-4">
                    {/* Add form */}
                    <div className="col-lg-4">
                      <div className="p-4 rounded-3 bg-light border">
                        <h5 className="fw-bold mb-3">Add Custom Package</h5>
                        <form onSubmit={handleCreateService}>
                          <div className="mb-3">
                            <label className="small fw-bold text-muted">Service Title</label>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              value={newService.title}
                              onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                              required
                            />
                          </div>
                          <div className="mb-3">
                            <label className="small fw-bold text-muted">Description</label>
                            <textarea
                              className="form-control form-control-sm"
                              rows="3"
                              value={newService.description}
                              onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                              required
                            ></textarea>
                          </div>
                          <div className="mb-3">
                            <label className="small fw-bold text-muted">Price Details</label>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              placeholder="₹4,000/Month"
                              value={newService.price}
                              onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                              required
                            />
                          </div>
                          <div className="mb-3">
                            <label className="small fw-bold text-muted">Category</label>
                            <select
                              className="form-select form-select-sm"
                              value={newService.category}
                              onChange={(e) => setNewService({ ...newService, category: e.target.value })}
                            >
                              <option value="Parent Care">Parent Care</option>
                              <option value="Property Maintenance">Property Maintenance</option>
                            </select>
                          </div>
                          <button type="submit" className="btn btn-teal-custom w-100 mt-2 py-2 small">
                            <FaPlus size={12} className="me-2" />
                            <span>Save Service</span>
                          </button>
                        </form>
                      </div>
                    </div>

                    {/* Catalog list */}
                    <div className="col-lg-8">
                      <div className="table-responsive">
                        <table className="table align-middle table-hover small">
                          <thead className="table-dark">
                            <tr>
                              <th>Title</th>
                              <th>Category</th>
                              <th>Price</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {services.map(s => (
                              <tr key={s._id}>
                                <td>
                                  <strong className="text-dark d-block">{s.title}</strong>
                                  <small className="text-muted d-block" style={{ maxWidth: '300px' }}>{s.description}</small>
                                </td>
                                <td><span className="badge bg-secondary">{s.category}</span></td>
                                <td><strong>{s.price}</strong></td>
                                <td>
                                  <button onClick={() => handleDeleteService(s._id)} className="btn btn-sm btn-outline-danger"><FaTrash /></button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
