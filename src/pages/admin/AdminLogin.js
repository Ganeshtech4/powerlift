import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

// Use FastAPI backend for admin authentication
const API_BASE = process.env.REACT_APP_API_URL || '/api/v1';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check if already logged in
  React.useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    const token = localStorage.getItem('adminToken');

    if (isLoggedIn === 'true' && token) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const url = `${API_BASE}/auth/login`;
      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: credentials.username.trim(),
          password: credentials.password
        })
      });

      if (!resp.ok) {
        let detail = 'Invalid username or password';
        try {
          const errData = await resp.json();
          if (errData.detail) detail = errData.detail;
        } catch { }
        throw new Error(detail);
      }

      const data = await resp.json();
      if (!data.access_token) throw new Error('Missing access token in response');

      // Persist session & token
      localStorage.setItem('isAdminLoggedIn', 'true');
      localStorage.setItem('adminLoginTime', Date.now().toString());
      localStorage.setItem('adminToken', data.access_token);

      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Make sure the backend server is running on port 8000.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <div className="admin-login-header">
          <h2>WPC Telangana Admin</h2>
          <p>Login to manage website content</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          {error && (
            <div className="error-message">
              <i className="fa fa-exclamation-circle"></i>
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleInputChange}
              placeholder="Enter admin username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              placeholder="Enter admin password"
              required
            />
          </div>

          <button
            type="submit"
            className="admin-login-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <i className="fa fa-spinner fa-spin"></i>
                Logging in...
              </>
            ) : (
              <>
                <i className="fa fa-sign-in"></i>
                {loading ? 'Logging in...' : 'Login'}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;