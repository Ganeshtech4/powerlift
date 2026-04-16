import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../../config/axiosConfig';
import './RefereesManager.css';

const LEVELS = ['International', 'National', 'State', 'District'];

const RefereesManager = () => {
  const navigate = useNavigate();
  const [referees, setReferees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');

  useEffect(() => { fetchReferees(); }, []);

  const fetchReferees = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/referees/');
      setReferees(res.data);
    } catch (err) {
      console.error('Error fetching referees:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    navigate('/admin/referees/new');
  };

  const handleEdit = (referee) => {
    navigate(`/admin/referees/edit/${referee.id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this referee?')) return;
    try {
      await axiosInstance.delete(`/referees/${id}`);
      fetchReferees();
    } catch (err) {
      alert('Failed to delete referee');
    }
  };

  const levelColors = {
    International: '#e74c3c',
    National: '#3498db',
    State: '#27ae60',
    District: '#f39c12'
  };

  const filtered = referees.filter(r => {
    const matchSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchLevel = filterLevel === 'all' || r.level === filterLevel;
    return matchSearch && matchLevel;
  });

  return (
    <div className="referees-manager">
      <div className="manager-header">
        <div>
          <h2><i className="fas fa-gavel"></i> Referees</h2>
          <p className="subtitle">Manage WPC Telangana certified referees</p>
        </div>
        <button className="btn-primary" onClick={handleAdd}>
          <i className="fas fa-plus"></i> Add Referee
        </button>
      </div>

      <div className="stats-grid">
        {LEVELS.map(lvl => (
          <div key={lvl} className="stat-card" style={{ '--accent': levelColors[lvl] }}>
            <div className="stat-icon" style={{ background: levelColors[lvl] }}>
              <i className="fas fa-medal"></i>
            </div>
            <div className="stat-content">
              <h3>{referees.filter(r => r.level === lvl).length}</h3>
              <p>{lvl}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="filters-section">
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input type="text" placeholder="Search by name..."
            value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <select className="filter-select" value={filterLevel} onChange={e => setFilterLevel(e.target.value)}>
          <option value="all">All Levels</option>
          {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
      </div>

      {loading ? (
        <div className="loading-state"><i className="fas fa-spinner fa-spin"></i> Loading...</div>
      ) : (
        <div className="members-grid">
          {filtered.map(referee => (
            <div key={referee.id} className={`member-card ${!referee.is_active ? 'inactive' : ''}`}>
              <div className="member-photo">
                {referee.photo_url
                  ? <img src={referee.photo_url} alt={referee.name} />
                  : <div className="photo-placeholder"><i className="fas fa-user"></i></div>
                }
                <span className="level-badge" style={{ background: levelColors[referee.level] || '#888' }}>
                  {referee.level}
                </span>
              </div>
              <div className="member-info">
                <h3>{referee.name}</h3>
                {referee.certification_year && (
                  <p><i className="fas fa-calendar-check"></i> Certified: {referee.certification_year}</p>
                )}
                {referee.phone && <p><i className="fas fa-phone"></i> {referee.phone}</p>}
                {referee.email && <p><i className="fas fa-envelope"></i> {referee.email}</p>}
                {referee.description && <p className="member-desc">{referee.description}</p>}
              </div>
              <div className="member-actions">
                <button className="btn-edit" onClick={() => handleEdit(referee)}>
                  <i className="fas fa-edit"></i> Edit
                </button>
                <button className="btn-delete" onClick={() => handleDelete(referee.id)}>
                  <i className="fas fa-trash"></i> Delete
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="empty-state">
              <i className="fas fa-gavel"></i>
              <p>No referees found.</p>
              <button className="btn-primary" onClick={handleAdd}>Add First Referee</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RefereesManager;
