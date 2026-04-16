import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '../../../config/axiosConfig';
import { uploadToS3 } from '../../../utils/s3Upload';
import './RefereeEditor.css';

const LEVELS = ['International', 'National', 'State', 'District'];

const emptyForm = {
  name: '',
  level: 'National',
  photo_url: '',
  phone: '',
  email: '',
  certification_year: '',
  description: '',
  order: 0,
  is_active: true,
};

const RefereeEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(Boolean(id));
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }

    let isMounted = true;

    const loadReferee = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/referees/${id}`);
        const referee = response.data;
        if (!isMounted) {
          return;
        }

        setFormData({
          name: referee.name || '',
          level: referee.level || 'National',
          photo_url: referee.photo_url || '',
          phone: referee.phone || '',
          email: referee.email || '',
          certification_year: referee.certification_year || '',
          description: referee.description || '',
          order: Number(referee.order ?? 0),
          is_active: referee.is_active ?? true,
        });
      } catch (error) {
        console.error('Error loading referee:', error);
        alert('Failed to load referee');
        navigate('/admin/dashboard?section=referees');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadReferee();

    return () => {
      isMounted = false;
    };
  }, [id, navigate]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleProfileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      setUploading(true);
      const response = await uploadToS3(file, 'referees');
      const imageUrl = response.url || response;
      setFormData((current) => ({ ...current, photo_url: imageUrl }));
    } catch (error) {
      console.error('Error uploading referee image:', error);
      alert('Failed to upload referee image');
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      alert('Name is required');
      return;
    }

    try {
      setSaving(true);
      const payload = {
        name: formData.name.trim(),
        level: formData.level,
        photo_url: formData.photo_url || null,
        phone: formData.phone.trim() || null,
        email: formData.email.trim() || null,
        certification_year: formData.certification_year.trim() || null,
        description: formData.description.trim() || null,
        order: Number(formData.order) || 0,
        is_active: formData.is_active,
      };

      if (id) {
        await axiosInstance.put(`/referees/${id}`, payload);
      } else {
        await axiosInstance.post('/referees/', payload);
      }

      navigate('/admin/dashboard?section=referees');
    } catch (error) {
      console.error('Error saving referee:', error);
      alert('Failed to save referee');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (!saving) {
      navigate('/admin/dashboard?section=referees');
    }
  };

  if (loading) {
    return (
      <div className="referee-editor-loading">
        <i className="fas fa-spinner fa-spin fa-3x"></i>
        <p>Loading referee...</p>
      </div>
    );
  }

  return (
    <div className="referee-editor">
      <div className="referee-editor__header">
        <div>
          <button type="button" className="referee-editor__back" onClick={handleCancel}>
            <i className="fas fa-arrow-left"></i>
            Back to referees
          </button>
          <h1>{id ? 'Edit Referee' : 'Add Referee'}</h1>
          <p>Manage the public referees directory with a clear profile image, official level, certification year, and contact details.</p>
        </div>
        <div className="referee-editor__actions">
          <button type="button" className="referee-editor__button referee-editor__button--secondary" onClick={handleCancel}>
            Cancel
          </button>
          <button
            type="button"
            className="referee-editor__button referee-editor__button--primary"
            onClick={handleSave}
            disabled={saving || uploading}
          >
            <i className={`fas ${saving ? 'fa-spinner fa-spin' : 'fa-save'}`}></i>
            {saving ? 'Saving...' : 'Save Referee'}
          </button>
        </div>
      </div>

      <div className="referee-editor__layout">
        <section className="referee-editor__panel referee-editor__panel--main">
          <div className="referee-editor__grid">
            <div className="referee-editor__field">
              <label htmlFor="name">Full Name</label>
              <input id="name" name="name" type="text" value={formData.name} onChange={handleInputChange} required />
            </div>
            <div className="referee-editor__field">
              <label htmlFor="level">Level</label>
              <select id="level" name="level" value={formData.level} onChange={handleInputChange}>
                {LEVELS.map((level) => <option key={level} value={level}>{level}</option>)}
              </select>
            </div>
          </div>

          <div className="referee-editor__grid">
            <div className="referee-editor__field">
              <label htmlFor="phone">Phone</label>
              <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} />
            </div>
            <div className="referee-editor__field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
            </div>
          </div>

          <div className="referee-editor__grid">
            <div className="referee-editor__field">
              <label htmlFor="certification_year">Certification Year</label>
              <input id="certification_year" name="certification_year" type="text" value={formData.certification_year} onChange={handleInputChange} placeholder="Example: 2024" />
            </div>
            <div className="referee-editor__field">
              <label htmlFor="order">Display Order</label>
              <input id="order" name="order" type="number" min="0" value={formData.order} onChange={(event) => setFormData((current) => ({ ...current, order: Number(event.target.value) || 0 }))} />
            </div>
          </div>

          <div className="referee-editor__toggles">
            <button
              type="button"
              className={`referee-editor__toggle ${formData.is_active ? 'referee-editor__toggle--on' : ''}`}
              onClick={() => setFormData((current) => ({ ...current, is_active: !current.is_active }))}
            >
              <span>Status</span>
              <strong>{formData.is_active ? 'Active' : 'Inactive'}</strong>
            </button>
          </div>

          <div className="referee-editor__field">
            <label htmlFor="description">Summary</label>
            <textarea id="description" name="description" rows="6" value={formData.description} onChange={handleInputChange} />
          </div>
        </section>

        <aside className="referee-editor__panel referee-editor__panel--side">
          <div className="referee-editor__asset-block">
            <div className="referee-editor__asset-header">
              <h2>Profile Image</h2>
              <p>One image only. This is the main public photo.</p>
            </div>
            <div className="referee-editor__profile-preview">
              {formData.photo_url ? (
                <img src={formData.photo_url} alt={formData.name || 'Profile preview'} />
              ) : (
                <div className="referee-editor__profile-placeholder">
                  <i className="fas fa-user"></i>
                </div>
              )}
            </div>
            <input type="file" accept="image/*" onChange={handleProfileUpload} disabled={uploading} />
            {formData.photo_url ? (
              <button
                type="button"
                className="referee-editor__text-button"
                onClick={() => setFormData((current) => ({ ...current, photo_url: '' }))}
              >
                Remove profile image
              </button>
            ) : null}
            {uploading ? <p className="referee-editor__status">Uploading profile image...</p> : null}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default RefereeEditor;