import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../../config/axiosConfig';
import { uploadToS3 } from '../../../utils/s3Upload';
import './PartnershipsManager.css';

const normalizeHighlights = (highlights) => {
  if (Array.isArray(highlights)) {
    return highlights.filter(Boolean).join('\n');
  }

  return '';
};

const PartnershipsManager = () => {
  const [partnerships, setPartnerships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPartnership, setEditingPartnership] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const emptyForm = {
    gym_name: '', owner_name: '', location: '', phone: '',
    email: '', logo_url: '', description: '', highlightsText: '', order: 0, is_active: true
  };
  const [formData, setFormData] = useState(emptyForm);

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
    setEditingPartnership(null);
    setFormData(emptyForm);
    setShowModal(true);
  };

  const handleEdit = (p) => {
    setEditingPartnership(p);
    setFormData({
      gym_name: p.gym_name || '',
      owner_name: p.owner_name || '',
      location: p.location || '',
      phone: p.phone || '',
      email: p.email || '',
      logo_url: p.logo_url || '',
      description: p.description || '',
      highlightsText: normalizeHighlights(p.highlights),
      order: p.order ?? 0,
      is_active: p.is_active ?? true
    });
    setShowModal(true);
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

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploading(true);
      const url = await uploadToS3(file, 'partnerships');
      setFormData(f => ({ ...f, logo_url: url }));
    } catch (err) {
      alert('Failed to upload logo');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...formData,
        highlights: formData.highlightsText
          .split('\n')
          .map((item) => item.trim())
          .filter(Boolean),
      };
      delete payload.highlightsText;
      if (!payload.email) delete payload.email;
      if (editingPartnership) {
        await axiosInstance.put(`/partnerships/${editingPartnership.id}`, payload);
      } else {
        await axiosInstance.post('/partnerships/', payload);
      }
      setShowModal(false);
      fetchPartnerships();
    } catch (err) {
      console.error('Error saving partnership:', err);
      alert('Failed to save partnership');
    } finally {
      setSaving(false);
    }
  };

  const filtered = partnerships.filter(p =>
    p.gym_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.owner_name && p.owner_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (p.location && p.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="partnerships-manager">
      <div className="manager-header">
        <div>
          <h2><i className="fas fa-handshake"></i> Partnerships</h2>
          <p className="subtitle">Manage partner gyms and collaborations</p>
        </div>
        <button className="btn-primary" onClick={handleAdd}>
          <i className="fas fa-plus"></i> Add Partnership
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

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingPartnership ? 'Edit Partnership' : 'Add Partnership'}</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Title / Partner Name *</label>
                  <input type="text" required value={formData.gym_name}
                    onChange={e => setFormData(f => ({ ...f, gym_name: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label>Subtitle / Owner Name</label>
                  <input type="text" value={formData.owner_name}
                    onChange={e => setFormData(f => ({ ...f, owner_name: e.target.value }))} />
                </div>
              </div>
              <div className="form-group">
                <label>Location</label>
                <input type="text" placeholder="City, District" value={formData.location}
                  onChange={e => setFormData(f => ({ ...f, location: e.target.value }))} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Phone</label>
                  <input type="tel" value={formData.phone}
                    onChange={e => setFormData(f => ({ ...f, phone: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" value={formData.email}
                    onChange={e => setFormData(f => ({ ...f, email: e.target.value }))} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Display Order</label>
                  <input type="number" min="0" value={formData.order}
                    onChange={e => setFormData(f => ({ ...f, order: parseInt(e.target.value) || 0 }))} />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select value={formData.is_active}
                    onChange={e => setFormData(f => ({ ...f, is_active: e.target.value === 'true' }))}>
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea rows="3" value={formData.description}
                  onChange={e => setFormData(f => ({ ...f, description: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>Highlights</label>
                <textarea rows="5" value={formData.highlightsText}
                  onChange={e => setFormData(f => ({ ...f, highlightsText: e.target.value }))}
                  placeholder="One bullet per line" />
              </div>
              <div className="form-group">
                <label>Logo / Image</label>
                {formData.logo_url && (
                  <div className="photo-preview">
                    <img src={formData.logo_url} alt="logo preview" />
                    <button type="button" className="btn-remove-photo"
                      onClick={() => setFormData(f => ({ ...f, logo_url: '' }))}>
                      <i className="fas fa-times"></i> Remove
                    </button>
                  </div>
                )}
                <input type="file" accept="image/*" onChange={handleLogoUpload} disabled={uploading} />
                {uploading && <span className="upload-status"><i className="fas fa-spinner fa-spin"></i> Uploading...</span>}
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={saving || uploading}>
                  {saving ? <><i className="fas fa-spinner fa-spin"></i> Saving...</> : (editingPartnership ? 'Update Partnership' : 'Add Partnership')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnershipsManager;
