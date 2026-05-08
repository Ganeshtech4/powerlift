import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../../config/axiosConfig';
import './PartnershipsManager.css';

const PartnershipsManager = () => {
  const [partnerships, setPartnerships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'Partner', 'Sponsor'
  const navigate = useNavigate();

  useEffect(() => { fetchPartnerships(); }, []);

  const fetchPartnerships = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/partnerships/');
      setPartnerships(res.data);
    } catch (err) {
      console.error('Error fetching partnerships:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    navigate('/admin/partnerships/new');
  };

  const handleEdit = (p) => {
    navigate(`/admin/partnerships/edit/${p.id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this partnership?')) return;
    try {
      await axiosInstance.delete(`/partnerships/${id}`);
      fetchPartnerships();
    } catch (err) {
      alert('Failed to delete partnership');
    }
  };

  const filtered = partnerships.filter(p => {
    const matchesSearch = p.gym_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.owner_name && p.owner_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (p.location && p.location.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTab = activeTab === 'all' || p.type === activeTab;
    return matchesSearch && matchesTab;
  });

  const counts = {
    all: partnerships.length,
    Partner: partnerships.filter(p => p.type === 'Partner').length,
    Sponsor: partnerships.filter(p => p.type === 'Sponsor').length,
  };

  return (
    <div className="partnerships-manager">
      <div className="manager-header">
        <div>
          <h2><i className="fas fa-handshake"></i> Partnerships & Sponsors</h2>
          <p className="subtitle">Manage partners and sponsors across all levels</p>
        </div>
        <button className="btn-primary" onClick={handleAdd}>
          <i className="fas fa-plus"></i> Add New
        </button>
      </div>

      {/* Tabs */}
      <div className="tabs-section">
        <button
          className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          <i className="fas fa-list"></i> All ({counts.all})
        </button>
        <button
          className={`tab-button ${activeTab === 'Partner' ? 'active' : ''}`}
          onClick={() => setActiveTab('Partner')}
        >
          <i className="fas fa-handshake"></i> Partners ({counts.Partner})
        </button>
        <button
          className={`tab-button ${activeTab === 'Sponsor' ? 'active' : ''}`}
          onClick={() => setActiveTab('Sponsor')}
        >
          <i className="fas fa-award"></i> Sponsors ({counts.Sponsor})
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-icon"><i className="fas fa-building"></i></div>
          <div className="stat-content">
            <h3>{partnerships.length}</h3><p>Total Partners</p>
          </div>
        </div>
        <div className="stat-card assigned">
          <div className="stat-icon"><i className="fas fa-check-circle"></i></div>
          <div className="stat-content">
            <h3>{partnerships.filter(p => p.is_active).length}</h3><p>Active</p>
          </div>
        </div>
        <div className="stat-card available">
          <div className="stat-icon"><i className="fas fa-pause-circle"></i></div>
          <div className="stat-content">
            <h3>{partnerships.filter(p => !p.is_active).length}</h3><p>Inactive</p>
          </div>
        </div>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input type="text" placeholder="Search by gym, owner, or location..."
            value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
      </div>

      {loading ? (
        <div className="loading-state"><i className="fas fa-spinner fa-spin"></i> Loading...</div>
      ) : (
        <div className="partners-grid">
          {filtered.map(p => (
            <div key={p.id} className={`partner-card ${!p.is_active ? 'inactive' : ''}`}>
              <div className="partner-logo">
                {p.logo_url
                  ? <img src={p.logo_url} alt={p.gym_name} />
                  : <div className="logo-placeholder"><i className="fas fa-dumbbell"></i></div>
                }
                <span className={`status-badge ${p.is_active ? 'active' : 'inactive'}`}>
                  {p.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="partner-info">
                <h3>{p.gym_name}</h3>
                <div className="partner-badges">
                  <span className="badge-type">{p.type || 'Partner'}</span>
                  <span className="badge-level">{p.level || 'District'}</span>
                </div>
                {p.owner_name && <p><i className="fas fa-user"></i> {p.owner_name}</p>}
                {p.location && <p><i className="fas fa-map-marker-alt"></i> {p.location}</p>}
                {p.phone && <p><i className="fas fa-phone"></i> {p.phone}</p>}
                {p.email && <p><i className="fas fa-envelope"></i> {p.email}</p>}
                {p.description && <p className="partner-desc">{p.description}</p>}
                {Array.isArray(p.highlights) && p.highlights.length > 0 && (
                  <p><i className="fas fa-list-check"></i> {p.highlights.length} highlight{p.highlights.length > 1 ? 's' : ''}</p>
                )}
              </div>
              <div className="partner-actions">
                <button className="btn-edit" onClick={() => handleEdit(p)}>
                  <i className="fas fa-edit"></i> Edit
                </button>
                <button className="btn-delete" onClick={() => handleDelete(p.id)}>
                  <i className="fas fa-trash"></i> Delete
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="empty-state">
              <i className="fas fa-handshake"></i>
              <p>No partnerships found.</p>
              <button className="btn-primary" onClick={handleAdd}>Add First Partnership</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PartnershipsManager;
