import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '../../../config/axiosConfig';
import { uploadToS3, deleteFromS3 } from '../../../utils/s3Upload';
import './PartnershipEditor.css';

const TYPES = ['Partner', 'Sponsor'];
const LEVELS = ['District', 'State', 'National', 'International'];

const emptyForm = {
  gym_name: '',
  owner_name: '',
  type: 'Partner',
  level: 'District',
  location: '',
  phone: '',
  email: '',
  logo_url: '',
  description: '',
  highlights: [],
  order: 0,
  is_active: true,
};

const PartnershipEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(emptyForm);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [highlightInput, setHighlightInput] = useState('');

  useEffect(() => {
    if (id) {
      loadPartnership();
    }
  }, [id]);

  const loadPartnership = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/partnerships/${id}`);
      const partnership = response.data;
      setFormData({
        gym_name: partnership.gym_name || '',
        owner_name: partnership.owner_name || '',
        type: partnership.type || 'Partner',
        level: partnership.level || 'District',
        location: partnership.location || '',
        phone: partnership.phone || '',
        email: partnership.email || '',
        logo_url: partnership.logo_url || '',
        description: partnership.description || '',
        highlights: partnership.highlights || [],
        order: Number(partnership.order ?? 0),
        is_active: partnership.is_active ?? true,
      });
    } catch (error) {
      console.error('Error loading partnership:', error);
      alert('Failed to load partnership');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleLogoUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      setUploading(true);
      const response = await uploadToS3(file, 'partnerships');
      const logoUrl = response.url || response;
      setFormData((current) => ({ ...current, logo_url: logoUrl }));
    } catch (error) {
      console.error('Error uploading logo:', error);
      alert('Failed to upload logo');
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  const handleAddHighlight = () => {
    if (highlightInput.trim()) {
      setFormData((current) => ({
        ...current,
        highlights: [...current.highlights, highlightInput.trim()],
      }));
      setHighlightInput('');
    }
  };

  const handleRemoveHighlight = (index) => {
    setFormData((current) => ({
      ...current,
      highlights: current.highlights.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    if (!formData.gym_name.trim()) {
      alert('Name is required');
      return;
    }

    try {
      setSaving(true);

      const payload = {
        gym_name: formData.gym_name.trim(),
        owner_name: formData.owner_name.trim() || null,
        type: formData.type,
        level: formData.level,
        location: formData.location.trim() || null,
        phone: formData.phone.trim() || null,
        email: formData.email.trim() || null,
        logo_url: formData.logo_url || null,
        description: formData.description.trim() || null,
        highlights: formData.highlights,
        order: Number(formData.order) || 0,
        is_active: formData.is_active,
      };

      if (id) {
        await axiosInstance.put(`/partnerships/${id}`, payload);
        alert('Partnership updated successfully!');
      } else {
        await axiosInstance.post('/partnerships/', payload);
        alert('Partnership created successfully!');
      }

      navigate('/admin/dashboard?section=partnerships');
    } catch (error) {
      console.error('Error saving partnership:', error);
      alert('Failed to save partnership');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="partnership-editor-loading">
        <i className="fas fa-spinner fa-spin"></i>
        <p>Loading partnership...</p>
      </div>
    );
  }

  return (
    <div className="partnership-editor">
      <div className="partnership-editor__header">
        <div>
          <button className="partnership-editor__back" onClick={() => navigate('/admin/dashboard?section=partnerships')}>
            <i className="fas fa-arrow-left"></i> Back to Partnerships
          </button>
          <h1>{id ? 'Edit Partnership' : 'Add Partnership'}</h1>
          <p>Manage gym partners and sponsors across all levels</p>
        </div>
        <div className="partnership-editor__actions">
          <button
            type="button"
            className="partnership-editor__button"
            onClick={() => navigate('/admin/dashboard?section=partnerships')}
            disabled={saving}
          >
            Cancel
          </button>
          <button
            type="button"
            className="partnership-editor__button partnership-editor__button--primary"
            onClick={handleSave}
            disabled={saving || uploading}
          >
            <i className="fas fa-save"></i>
            {saving ? 'Saving...' : id ? 'Update Partnership' : 'Create Partnership'}
          </button>
        </div>
      </div>

      <div className="partnership-editor__layout">
        <section className="partnership-editor__panel partnership-editor__panel--main">
          <div className="partnership-editor__grid">
            <div className="partnership-editor__field">
              <label htmlFor="type">Type *</label>
              <select id="type" name="type" value={formData.type} onChange={handleInputChange}>
                {TYPES.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="partnership-editor__field">
              <label htmlFor="level">Level *</label>
              <select id="level" name="level" value={formData.level} onChange={handleInputChange}>
                {LEVELS.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="partnership-editor__grid">
            <div className="partnership-editor__field">
              <label htmlFor="gym_name">Name / Title *</label>
              <input
                type="text"
                id="gym_name"
                name="gym_name"
                value={formData.gym_name}
                onChange={handleInputChange}
                placeholder="E.g., PowerHouse Gym"
              />
            </div>

            <div className="partnership-editor__field">
              <label htmlFor="owner_name">Owner / Contact Person</label>
              <input
                type="text"
                id="owner_name"
                name="owner_name"
                value={formData.owner_name}
                onChange={handleInputChange}
                placeholder="E.g., John Doe"
              />
            </div>
          </div>

          <div className="partnership-editor__field">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="City, District, State"
            />
          </div>

          <div className="partnership-editor__grid">
            <div className="partnership-editor__field">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+91 1234567890"
              />
            </div>

            <div className="partnership-editor__field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="contact@example.com"
              />
            </div>
          </div>

          <div className="partnership-editor__field">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Brief description about the partnership..."
            />
          </div>

          <div className="partnership-editor__field">
            <label>Highlights / Benefits</label>
            {formData.highlights.length > 0 && (
              <ul className="partnership-editor__highlights-list">
                {formData.highlights.map((highlight, index) => (
                  <li key={index}>
                    <span>{highlight}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveHighlight(index)}
                      className="partnership-editor__highlight-remove"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <div className="partnership-editor__highlight-input">
              <input
                type="text"
                value={highlightInput}
                onChange={(e) => setHighlightInput(e.target.value)}
                placeholder="Add a highlight or benefit..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddHighlight())}
              />
              <button type="button" onClick={handleAddHighlight} disabled={!highlightInput.trim()}>
                <i className="fas fa-plus"></i> Add
              </button>
            </div>
          </div>

          <div className="partnership-editor__grid">
            <div className="partnership-editor__field">
              <label htmlFor="order">Display Order</label>
              <input
                type="number"
                id="order"
                name="order"
                value={formData.order}
                onChange={handleInputChange}
                min="0"
              />
            </div>

            <div className="partnership-editor__field">
              <label>Status</label>
              <button
                type="button"
                className={`partnership-editor__toggle ${formData.is_active ? 'partnership-editor__toggle--on' : ''}`}
                onClick={() => setFormData((current) => ({ ...current, is_active: !current.is_active }))}
              >
                <span>Status</span>
                <strong>{formData.is_active ? 'Active' : 'Inactive'}</strong>
              </button>
            </div>
          </div>
        </section>

        <aside className="partnership-editor__panel partnership-editor__panel--side">
          <div className="partnership-editor__asset-block">
            <div className="partnership-editor__asset-header">
              <h2>Logo Image</h2>
              <p>Upload organization or gym logo</p>
            </div>
            <div className="partnership-editor__logo-preview">
              {formData.logo_url ? (
                <img src={formData.logo_url} alt={formData.gym_name || 'Logo preview'} />
              ) : (
                <div className="partnership-editor__logo-placeholder">
                  <i className="fas fa-image"></i>
                </div>
              )}
            </div>
            <input
              type="file"
              id="logo-upload"
              className="partnership-editor__file-input"
              accept="image/*"
              onChange={handleLogoUpload}
              disabled={uploading}
            />
            <label
              htmlFor="logo-upload"
              className={`partnership-editor__file-label ${uploading ? 'disabled' : ''}`}
            >
              <i className="fas fa-upload"></i>
              {formData.logo_url ? 'Change Logo' : 'Choose File'}
            </label>
            {formData.logo_url ? (
              <button
                type="button"
                className="partnership-editor__text-button"
                onClick={() => setFormData((current) => ({ ...current, logo_url: '' }))}
              >
                <i className="fas fa-times"></i> Remove logo
              </button>
            ) : null}
            {uploading ? <p className="partnership-editor__status"><i className="fas fa-spinner fa-spin"></i> Uploading logo...</p> : null}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PartnershipEditor;
