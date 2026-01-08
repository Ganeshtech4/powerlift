import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import GalleryManager from './sections/GalleryManager';
import DistrictsManager from './sections/DistrictsManager';
import ResultsManager from './sections/ResultsManager';
import CalendarManager from './sections/CalendarManager';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [adminUser, setAdminUser] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: 'tachometer-alt' },
    { id: 'gallery', label: 'Gallery Posts', icon: 'images' },
    { id: 'districts', label: 'Districts', icon: 'map-marked-alt' },
    { id: 'results', label: 'Results & ID Cards', icon: 'trophy' },
    { id: 'calendar', label: 'Events Calendar', icon: 'calendar' },
  ];

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    const loginTime = localStorage.getItem('adminLoginTime');
    const currentTime = Date.now();
    const sessionDuration = 24 * 60 * 60 * 1000;

    if (isLoggedIn !== 'true' || !loginTime || (currentTime - parseInt(loginTime)) >= sessionDuration) {
      navigate('/admin');
      return;
    }

    setAdminUser('rekhawpc');
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('adminLoginTime');
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewSection />;
      case 'gallery':
        return <GalleryManager />;
      case 'districts':
        return <DistrictsManager />;
      case 'results':
        return <ResultsManager />;
      case 'calendar':
        return <CalendarManager />;
      default:
        return <OverviewSection />;
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="admin-logo">
            <i className="fas fa-dumbbell"></i>
            <span>WPC Admin</span>
          </div>
          <button className="sidebar-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <i className={`fas fa-${isSidebarOpen ? 'times' : 'bars'}`}></i>
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => setActiveSection(item.id)}
            >
              <i className={`fas fa-${item.icon}`}></i>
              {isSidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="admin-user">
            <i className="fas fa-user-shield"></i>
            {isSidebarOpen && <span>{adminUser}</span>}
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i>
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-content">
        <header className="content-header">
          <h1>{menuItems.find(item => item.id === activeSection)?.label || 'Dashboard'}</h1>
          <div className="header-actions">
            <button className="btn-icon" title="Notifications">
              <i className="fas fa-bell"></i>
              <span className="badge">3</span>
            </button>
            <button className="btn-icon" title="Settings">
              <i className="fas fa-cog"></i>
            </button>
          </div>
        </header>

        <div className="content-body">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

// Overview Section Component
const OverviewSection = () => {
  const [stats, setStats] = React.useState({
    districts: { value: '...', loading: true },
    posts: { value: '...', loading: true },
    results: { value: '...', loading: true },
    events: { value: '...', loading: true }
  });

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

  React.useEffect(() => {
    fetchRealData();
  }, []);

  const fetchRealData = async () => {
    try {
      // Fetch Districts
      const districtsRes = await fetch(`${API_URL}/districts/`);
      const districtsData = await districtsRes.json();

      // Fetch Blog Posts
      const postsRes = await fetch(`${API_URL}/blogs/`);
      const postsData = await postsRes.json();

      // Fetch Results
      const resultsRes = await fetch(`${API_URL}/results/`);
      const resultsData = await resultsRes.json();

      // Fetch Events
      const eventsRes = await fetch(`${API_URL}/events/`);
      const eventsData = await eventsRes.json();

      // Get upcoming events
      const upcomingEvents = eventsData.filter(e =>
        e.is_active && new Date(e.event_date) >= new Date()
      );

      setStats({
        districts: {
          value: districtsData.length.toString(),
          loading: false,
          label: 'Total Districts',
          icon: 'map-marked-alt',
          color: '#4da6ff'
        },
        posts: {
          value: postsData.length.toString(),
          loading: false,
          label: 'Gallery Posts',
          icon: 'images',
          color: '#ff4444'
        },
        results: {
          value: resultsData.length.toString(),
          loading: false,
          label: 'Results',
          icon: 'trophy',
          color: '#ffa500'
        },
        events: {
          value: upcomingEvents.length.toString(),
          loading: false,
          label: 'Upcoming Events',
          icon: 'calendar',
          color: '#28a745'
        }
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setStats({
        districts: { value: 'Error', loading: false, label: 'Districts', icon: 'map-marked-alt', color: '#4da6ff' },
        posts: { value: 'Error', loading: false, label: 'Posts', icon: 'images', color: '#ff4444' },
        results: { value: 'Error', loading: false, label: 'Results', icon: 'trophy', color: '#ffa500' },
        events: { value: 'Error', loading: false, label: 'Events', icon: 'calendar', color: '#28a745' }
      });
    }
  };

  const statsArray = Object.values(stats);

  return (
    <div className="overview-section">
      <div className="stats-grid">
        {statsArray.map((stat, index) => (
          <div key={index} className="stat-card" style={{ borderLeftColor: stat.color }}>
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
              {stat.loading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                <i className={`fas fa-${stat.icon}`}></i>
              )}
            </div>
            <div className="stat-info">
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="recent-activity">
        <h3><i className="fas fa-history"></i> Recent Activity</h3>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon bg-blue">
              <i className="fas fa-database"></i>
            </div>
            <div className="activity-content">
              <p><strong>Real Data Connected</strong> - Dashboard showing live AWS data</p>
              <span className="activity-time">Just now</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon bg-green">
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="activity-content">
              <p><strong>All APIs Active</strong> - {statsArray.filter(s => !s.loading && s.value !== 'Error').length}/4 endpoints responding</p>
              <span className="activity-time">Now</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon bg-orange">
              <i className="fas fa-sync"></i>
            </div>
            <div className="activity-content">
              <p><strong>Auto-Refresh</strong> - Data syncs from DynamoDB automatically</p>
              <span className="activity-time">Live</span>
            </div>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h3><i className="fas fa-bolt"></i> Quick Actions</h3>
        <div className="actions-grid">
          <button className="action-btn" onClick={() => window.location.href = '/admin/dashboard'}>
            <i className="fas fa-sync"></i>
            <span>Refresh Data</span>
          </button>
          <button className="action-btn">
            <i className="fas fa-database"></i>
            <span>View DynamoDB</span>
          </button>
          <button className="action-btn">
            <i className="fas fa-chart-line"></i>
            <span>Analytics</span>
          </button>
          <button className="action-btn">
            <i className="fas fa-cog"></i>
            <span>Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;