import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../../config/axiosConfig';
import './CommitteeMembersManager.css';

const CommitteeMembersManager = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => { fetchMembers(); }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/committee-members/');
      setMembers(res.data);
    } catch (err) {
      console.error('Error fetching committee members:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    navigate('/admin/team-members/new');
  };

  const handleEdit = (member) => {
    navigate(`/admin/team-members/edit/${member.id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this committee member?')) return;
    try {
      await axiosInstance.delete(`/committee-members/${id}`);
      fetchMembers();
    } catch (err) {
      console.error('Error deleting member:', err);
      alert('Failed to delete member');
    }
  };

  const filtered = members.filter(m =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (m.highlight || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="committee-manager">
      <div className="manager-header">
        <div>
          <h2><i className="fas fa-users"></i> Team Members</h2>
          <p className="subtitle">Manage the public leadership directory, detail page content, and featured highlights.</p>
        </div>
        <button className="btn-primary" onClick={handleAdd}>
          <i className="fas fa-plus"></i> Add Member
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-icon"><i className="fas fa-users"></i></div>
          <div className="stat-content">
            <h3>{members.length}</h3><p>Total Members</p>
          </div>
        </div>
        <div className="stat-card assigned">
          <div className="stat-icon"><i className="fas fa-check-circle"></i></div>
          <div className="stat-content">
            <h3>{members.filter(m => m.is_active).length}</h3><p>Visible</p>
          </div>
        </div>
        <div className="stat-card available">
          <div className="stat-icon"><i className="fas fa-pause-circle"></i></div>
          <div className="stat-content">
            <h3>{members.filter(m => m.is_featured).length}</h3><p>Featured</p>
          </div>
        </div>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search by name, role, or highlight..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="loading-state"><i className="fas fa-spinner fa-spin"></i> Loading...</div>
      ) : (
        <div className="members-grid">
          {filtered.map(member => (
            <div key={member.id} className={`member-card ${!member.is_active ? 'inactive' : ''}`}>
              <div className="member-photo">
                {member.photo_url
                  ? <img src={member.photo_url} alt={member.name} onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                  : null
                }
                <div className="photo-placeholder" style={{ display: member.photo_url ? 'none' : 'flex' }}><i className="fas fa-user"></i></div>
                <span className={`status-badge ${member.is_active ? 'active' : 'inactive'}`}>
                  {member.is_active ? 'Active' : 'Inactive'}
                </span>
                {member.is_featured && <span className="feature-badge">Featured</span>}
              </div>
              <div className="member-info">
                <h3>{member.name}</h3>
                <p className="member-role"><i className="fas fa-briefcase"></i> {member.role}</p>
                {member.highlight && <p className="member-highlight">{member.highlight}</p>}
                {Array.isArray(member.certificate_urls) && member.certificate_urls.length > 0 && (
                  <p><i className="fas fa-certificate"></i> {member.certificate_urls.length} certificate{member.certificate_urls.length > 1 ? 's' : ''}</p>
                )}
                {member.phone && <p><i className="fas fa-phone"></i> {member.phone}</p>}
                {member.email && <p><i className="fas fa-envelope"></i> {member.email}</p>}
                {member.description && <p className="member-desc">{member.description}</p>}
              </div>
              <div className="member-actions">
                <button className="btn-edit" onClick={() => handleEdit(member)}>
                  <i className="fas fa-edit"></i> Edit
                </button>
                <button className="btn-delete" onClick={() => handleDelete(member.id)}>
                  <i className="fas fa-trash"></i> Delete
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="empty-state">
              <i className="fas fa-users"></i>
              <p>No committee members found.</p>
              <button className="btn-primary" onClick={handleAdd}>Add First Member</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommitteeMembersManager;
