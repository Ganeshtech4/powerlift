import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosConfig';
import './AdminDashboard.css';

const CATEGORIES = ['General', 'Newspaper', 'Championship', 'State Meet', 'District Meet', 'National', 'International', 'Announcement'];

const EMPTY_FORM = {
  title: '',
  description: '',
  image_url: '',
  thumbnail_url: '',
  category: 'General',
  published_date: new Date().toISOString().slice(0, 10),
  is_featured: false,
  status: 'published',
};

async function uploadImage(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', 'news');
  const res = await axiosInstance.post('/s3/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data?.url || res.data?.file_url || '';
}

const NewsForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [customCategories, setCustomCategories] = useState([]);
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const fileRef = useRef();

  useEffect(() => {
    if (id) {
      fetchNewsItem();
    }
    fetchExistingCategories();
  }, [id]);

  const fetchExistingCategories = async () => {
    try {
      const res = await axiosInstance.get('/news/');
      const allCategories = res.data
        .map(item => item.category)
        .filter(Boolean)
        .filter(cat => !CATEGORIES.includes(cat));
      setCustomCategories([...new Set(allCategories)]);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const fetchNewsItem = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/news/${id}`);
      setForm({ ...EMPTY_FORM, ...res.data });
    } catch (err) {
      alert('Failed to load news item: ' + (err.response?.data?.detail || err.message));
      navigate('/admin/news');
    } finally {
      setLoading(false);
    }
  };

  const handleField = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploading(true);
      const url = await uploadImage(file);
      setForm(f => ({ ...f, image_url: url, thumbnail_url: url }));
    } catch (err) {
      alert('Image upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleAddCustomCategory = () => {
    if (!newCategory.trim()) {
      alert('Please enter a category name.');
      return;
    }
    const trimmedCategory = newCategory.trim();
    if (CATEGORIES.includes(trimmedCategory) || customCategories.includes(trimmedCategory)) {
      alert('This category already exists.');
      return;
    }
    setCustomCategories([...customCategories, trimmedCategory]);
    setForm(f => ({ ...f, category: trimmedCategory }));
    setNewCategory('');
    setShowCustomCategory(false);
  };

  const handleRemoveCustomCategory = (categoryToRemove) => {
    if (!window.confirm(`Remove "${categoryToRemove}" from the list? This won't affect existing news items using this category.`)) {
      return;
    }
    setCustomCategories(customCategories.filter(c => c !== categoryToRemove));
    if (form.category === categoryToRemove) {
      setForm(f => ({ ...f, category: 'General' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.image_url) {
      alert('Title and image are required.');
      return;
    }
    try {
      setSaving(true);
      if (id) {
        await axiosInstance.put(`/news/${id}`, form);
      } else {
        await axiosInstance.post('/news/', form);
      }
      navigate('/admin/news');
    } catch (err) {
      alert('Save failed: ' + (err.response?.data?.detail || err.message));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-container">
        <div style={{ textAlign: 'center', padding: 60 }}>
          <i className="fas fa-spinner fa-spin" style={{ fontSize: 32, color: '#c0392b' }} />
          <p style={{ marginTop: 16, color: '#64748b' }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="manager-header" style={{ marginBottom: 32 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
            <button
              onClick={() => navigate('/admin/news')}
              style={{
                padding: '8px 12px',
                borderRadius: 8,
                border: '1px solid #e2e8f0',
                background: '#fff',
                cursor: 'pointer',
                fontSize: 14,
              }}
            >
              <i className="fas fa-arrow-left" /> Back to News
            </button>
          </div>
          <h2><i className="fas fa-newspaper" /> {id ? 'Edit News Item' : 'Add News Item'}</h2>
          <p className="subtitle">
            {id ? 'Update the news article details below' : 'Create a new news article or media coverage'}
          </p>
        </div>
      </div>

      <div style={{
        background: '#fff',
        borderRadius: 16,
        padding: 36,
        maxWidth: 800,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}>
        <form onSubmit={handleSubmit}>
          {/* Image upload */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontWeight: 700, marginBottom: 10, fontSize: 14, color: '#374151' }}>
              Newspaper Image *
            </label>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange}
              style={{ display: 'none' }} />
            <button type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              style={{
                padding: '12px 24px',
                borderRadius: 8,
                border: '2px dashed #e2e8f0',
                background: '#f8fafc',
                cursor: 'pointer',
                fontSize: 14,
                color: '#64748b',
                width: '100%',
                textAlign: 'center',
                marginBottom: 12,
              }}>
              {uploading ? <><i className="fas fa-spinner fa-spin" /> Uploading…</> : <><i className="fas fa-cloud-upload-alt" /> Choose Image</>}
            </button>
            {form.image_url && (
              <div style={{ textAlign: 'center' }}>
                <img src={form.image_url} alt="Preview"
                  style={{ maxWidth: '100%', maxHeight: 300, objectFit: 'contain', borderRadius: 8, border: '1px solid #e2e8f0' }} />
              </div>
            )}
          </div>

          {/* Or paste URL */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontWeight: 700, marginBottom: 10, fontSize: 14, color: '#374151' }}>
              Image URL (or paste directly)
            </label>
            <input type="url" name="image_url" value={form.image_url}
              onChange={e => setForm(f => ({ ...f, image_url: e.target.value, thumbnail_url: e.target.value }))}
              placeholder="https://…"
              style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14 }} />
          </div>

          {/* Title */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontWeight: 700, marginBottom: 10, fontSize: 14, color: '#374151' }}>
              Title *
            </label>
            <input type="text" name="title" value={form.title} onChange={handleField} required
              placeholder="e.g. WPC Telangana athletes shine at State Championship"
              style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14 }} />
          </div>

          {/* Description */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontWeight: 700, marginBottom: 10, fontSize: 14, color: '#374151' }}>
              Short Description (optional)
            </label>
            <textarea name="description" value={form.description} onChange={handleField} rows={4}
              placeholder="Brief summary…"
              style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, resize: 'vertical' }} />
          </div>

          {/* Category + Date row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', fontWeight: 700, marginBottom: 10, fontSize: 14, color: '#374151' }}>
                Category
                <button
                  type="button"
                  onClick={() => setShowCustomCategory(!showCustomCategory)}
                  style={{
                    marginLeft: '8px',
                    padding: '4px 10px',
                    borderRadius: 6,
                    border: '1px solid #e2e8f0',
                    background: '#f8fafc',
                    cursor: 'pointer',
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#64748b'
                  }}
                >
                  <i className="fas fa-plus" /> Add Custom
                </button>
              </label>
              <select name="category" value={form.category} onChange={handleField}
                style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14 }}>
                <optgroup label="Default Categories">
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </optgroup>
                {customCategories.length > 0 && (
                  <optgroup label="Custom Categories">
                    {customCategories.map(c => <option key={c} value={c}>{c}</option>)}
                  </optgroup>
                )}
              </select>
              
              {/* Show custom category input */}
              {showCustomCategory && (
                <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Enter new category name"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCustomCategory())}
                    style={{
                      flex: 1,
                      padding: '10px 14px',
                      borderRadius: 8,
                      border: '1px solid #e2e8f0',
                      fontSize: 13
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomCategory}
                    style={{
                      padding: '10px 16px',
                      borderRadius: 8,
                      border: 'none',
                      background: '#10b981',
                      color: '#fff',
                      cursor: 'pointer',
                      fontSize: 13,
                      fontWeight: 600
                    }}
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowCustomCategory(false); setNewCategory(''); }}
                    style={{
                      padding: '10px 16px',
                      borderRadius: 8,
                      border: '1px solid #e2e8f0',
                      background: '#fff',
                      color: '#64748b',
                      cursor: 'pointer',
                      fontSize: 13
                    }}
                  >
                    <i className="fas fa-times" />
                  </button>
                </div>
              )}
              
              {/* Show custom categories with delete option */}
              {customCategories.length > 0 && (
                <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {customCategories.map(cat => (
                    <span key={cat} style={{
                      padding: '4px 10px',
                      background: '#f1f5f9',
                      borderRadius: 999,
                      fontSize: 12,
                      fontWeight: 600,
                      color: '#475569',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6
                    }}>
                      {cat}
                      <button
                        type="button"
                        onClick={() => handleRemoveCustomCategory(cat)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#94a3b8',
                          padding: 0,
                          fontSize: 10
                        }}
                      >
                        <i className="fas fa-times" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 700, marginBottom: 10, fontSize: 14, color: '#374151' }}>Published Date</label>
              <input type="date" name="published_date" value={form.published_date} onChange={handleField}
                style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14 }} />
            </div>
          </div>

          {/* Featured + Status row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <input type="checkbox" id="is_featured" name="is_featured"
                checked={form.is_featured} onChange={handleField}
                style={{ width: 18, height: 18, cursor: 'pointer' }} />
              <label htmlFor="is_featured" style={{ fontWeight: 600, fontSize: 14, color: '#374151', cursor: 'pointer' }}>
                Set as Featured
              </label>
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 700, marginBottom: 10, fontSize: 14, color: '#374151' }}>Status</label>
              <select name="status" value={form.status} onChange={handleField}
                style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14 }}>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', paddingTop: 16, borderTop: '1px solid #e2e8f0' }}>
            <button type="button" onClick={() => navigate('/admin/news')}
              style={{
                padding: '12px 28px',
                borderRadius: 8,
                border: '1px solid #e2e8f0',
                background: '#f8fafc',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 600,
              }}>
              Cancel
            </button>
            <button type="submit" disabled={saving || uploading}
              style={{
                padding: '12px 32px',
                borderRadius: 8,
                border: 'none',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 700,
                background: 'linear-gradient(90deg,#c0392b,#1a5276)',
                color: '#fff',
                opacity: saving || uploading ? 0.7 : 1,
              }}>
              {saving ? <><i className="fas fa-spinner fa-spin" /> Saving…</> : (id ? 'Save Changes' : 'Add News')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsForm;
