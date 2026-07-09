import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '../../../config/axiosConfig';
import { uploadToS3 } from '../../../utils/s3Upload';
import './InkspireManager.css';

const DEFAULT_CATEGORIES = ['international', 'national', 'state', 'district'];

const emptyForm = {
  title: '',
  subtitle: '',
  quote: '',
  category: '',
  pdf_url: '',
  cover_image_url: '',
  order: 0,
  is_active: true,
};

const InkspireBookEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(Boolean(id));
  const [saving, setSaving] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [customCategories, setCustomCategories] = useState([]);
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    fetchExistingCategories();
  }, []);

  const fetchExistingCategories = async () => {
    try {
      const res = await axiosInstance.get('/inkspire-books/');
      const allCategories = res.data
        .map(item => item.category)
        .filter(Boolean)
        .filter(cat => !DEFAULT_CATEGORIES.includes(cat.toLowerCase()));
      setCustomCategories([...new Set(allCategories)]);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const handleAddCustomCategory = () => {
    if (!newCategory.trim()) {
      alert('Please enter a category name.');
      return;
    }
    const trimmedCategory = newCategory.trim().toLowerCase();
    if (DEFAULT_CATEGORIES.includes(trimmedCategory) || customCategories.includes(trimmedCategory)) {
      alert('This category already exists.');
      return;
    }
    setCustomCategories([...customCategories, trimmedCategory]);
    setFormData(prev => ({ ...prev, category: trimmedCategory }));
    setNewCategory('');
    setShowCustomCategory(false);
  };

  const handleRemoveCustomCategory = (categoryToRemove) => {
    if (!window.confirm(`Remove "${categoryToRemove}" from the list? This won't affect existing items using this category.`)) {
      return;
    }
    setCustomCategories(customCategories.filter(c => c !== categoryToRemove));
    if (formData.category === categoryToRemove) {
      setFormData(prev => ({ ...prev, category: '' }));
    }
  };

  useEffect(() => {
    if (!id) return;
    let isMounted = true;
    const loadBook = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/inkspire-books/${id}`);
        const book = response.data;
        if (!isMounted) return;
        setFormData({
          title: book.title || '',
          subtitle: book.subtitle || '',
          quote: book.quote || '',
          category: book.category || '',
          pdf_url: book.pdf_url || '',
          cover_image_url: book.cover_image_url || '',
          order: Number(book.order ?? 0),
          is_active: book.is_active ?? true,
        });
      } catch (error) {
        console.error('Error loading Inkspire book:', error);
        alert('Failed to load Inkspire book');
        navigate('/admin/dashboard?section=inkspire');
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadBook();
    return () => { isMounted = false; };
  }, [id, navigate]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleCoverUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      setUploadingCover(true);
      const response = await uploadToS3(file, 'images/Inspire');
      setFormData((current) => ({ ...current, cover_image_url: response.url || response }));
    } catch (error) {
      alert('Failed to upload cover image');
    } finally {
      setUploadingCover(false);
      event.target.value = '';
    }
  };

  const handlePdfUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      setUploadingPdf(true);
      const response = await uploadToS3(file, 'pdfs');
      setFormData((current) => ({ ...current, pdf_url: response.url || response }));
    } catch (error) {
      alert('Failed to upload PDF');
    } finally {
      setUploadingPdf(false);
      event.target.value = '';
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setSaving(true);
      const payload = { ...formData, order: Number(formData.order || 0) };
      if (id) {
        await axiosInstance.put(`/inkspire-books/${id}`, payload);
      } else {
        await axiosInstance.post('/inkspire-books/', payload);
      }
      navigate('/admin/dashboard?section=inkspire');
    } catch (error) {
      console.error('Error saving Inkspire book:', error);
      alert('Failed to save Inkspire book');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => navigate('/admin/dashboard?section=inkspire');

  if (loading) {
    return (
      <div className="inkspire-manager">
        <div className="loading-state">
          <i className="fas fa-spinner fa-spin"></i> Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="inkspire-manager">
      <div className="manager-header">
        <div>
          <h2><i className="fas fa-book-open"></i> {id ? 'Edit Inkspire Book' : 'Add Inkspire Book'}</h2>
          <p className="subtitle">{id ? 'Update the details of this Inkspire book.' : 'Fill in the details to add a new Inkspire book.'}</p>
        </div>
        <button className="btn-secondary" onClick={handleCancel}>
          <i className="fas fa-arrow-left"></i> Back to Inkspire Books
        </button>
      </div>

      <div className="modal-content" style={{ maxWidth: '700px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)' }}>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row">
            <div className="form-group">
              <label>Title *</label>
              <input type="text" name="title" required value={formData.title} onChange={handleInputChange} placeholder="Enter book title" />
            </div>
            <div className="form-group">
              <label>Category
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
                  <i className="fas fa-plus"></i> Add Custom
                </button>
              </label>
              <select name="category" value={formData.category} onChange={handleInputChange}>
                <option value="">-- Select Category --</option>
                <optgroup label="Default Categories">
                  <option value="international">International</option>
                  <option value="national">National</option>
                  <option value="state">State</option>
                  <option value="district">District</option>
                </optgroup>
                {customCategories.length > 0 && (
                  <optgroup label="Custom Categories">
                    {customCategories.map(c => <option key={c} value={c}>{c}</option>)}
                  </optgroup>
                )}
              </select>
              
              {showCustomCategory && (
                <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Enter new category name"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCustomCategory())}
                    style={{
                      padding: '10px 14px',
                      borderRadius: 8,
                      border: '1px solid #e2e8f0',
                      fontSize: 13
                    }}
                  />
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      type="button"
                      onClick={handleAddCustomCategory}
                      style={{
                        flex: 1,
                        padding: '8px 12px',
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
                        flex: 1,
                        padding: '8px 12px',
                        borderRadius: 8,
                        border: '1px solid #e2e8f0',
                        background: '#fff',
                        color: '#64748b',
                        cursor: 'pointer',
                        fontSize: 13
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
              
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
                        <i className="fas fa-times"></i>
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Subtitle</label>
              <input type="text" name="subtitle" value={formData.subtitle} onChange={handleInputChange} placeholder="e.g., Success Story, Athlete Journey" />
            </div>
          </div>

          <div className="form-group">
            <label>Quote / Description</label>
            <textarea name="quote" rows="4" value={formData.quote} onChange={handleInputChange} placeholder="An inspiring quote or brief description" />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Display Order</label>
              <input type="number" name="order" min="0" value={formData.order} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select name="is_active" value={formData.is_active} onChange={(e) => setFormData((current) => ({ ...current, is_active: e.target.value === 'true' }))}>
                <option value="true">Active (Visible)</option>
                <option value="false">Inactive (Hidden)</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Cover Image URL</label>
            <input type="url" name="cover_image_url" value={formData.cover_image_url} onChange={handleInputChange} placeholder="https://..." />
            {formData.cover_image_url && (
              <div className="photo-preview">
                <img src={formData.cover_image_url} alt="cover preview" />
              </div>
            )}
            <input type="file" accept="image/*" onChange={handleCoverUpload} disabled={uploadingCover} style={{ marginTop: '8px' }} />
            {uploadingCover && <span className="upload-status"><i className="fas fa-spinner fa-spin"></i> Uploading cover image...</span>}
          </div>

          <div className="form-group">
            <label>PDF URL</label>
            <input type="url" name="pdf_url" value={formData.pdf_url} onChange={handleInputChange} placeholder="https://..." />
            <input type="file" accept="application/pdf" onChange={handlePdfUpload} disabled={uploadingPdf} style={{ marginTop: '8px' }} />
            {uploadingPdf && <span className="upload-status"><i className="fas fa-spinner fa-spin"></i> Uploading PDF...</span>}
            {formData.pdf_url && !uploadingPdf && (
              <a href={formData.pdf_url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '6px', fontSize: '0.85rem', color: '#4da6ff' }}>
                <i className="fas fa-external-link-alt"></i> View PDF
              </a>
            )}
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={handleCancel}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={saving || uploadingCover || uploadingPdf}>
              {saving ? <><i className="fas fa-spinner fa-spin"></i> Saving...</> : (id ? 'Update Book' : 'Add Book')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InkspireBookEditor;
