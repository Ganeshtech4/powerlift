import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '../../../config/axiosConfig';
import { uploadToS3 } from '../../../utils/s3Upload';
import './BlogEditor.css';

const DEFAULT_CATEGORIES = ['international', 'national', 'state', 'district'];

const VtdBookEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(Boolean(id));
  const [saving, setSaving] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    quote: '',
    category: 'district',
    pdf_url: '',
    cover_image_url: '',
    images: [],
    order: 0,
    is_active: true,
  });
  const [uploadedImages, setUploadedImages] = useState([]);
  const [customCategories, setCustomCategories] = useState([]);
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    fetchExistingCategories();
  }, []);

  const fetchExistingCategories = async () => {
    try {
      const res = await axiosInstance.get('/vtd-books/');
      const allCategories = res.data
        .map(item => item.category)
        .filter(Boolean)
        .filter(cat => !DEFAULT_CATEGORIES.includes(cat.toLowerCase()));
      setCustomCategories([...new Set(allCategories)]);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  useEffect(() => {
    if (!id) return;
    let isMounted = true;
    const loadBook = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/vtd-books/${id}`);
        const book = response.data;
        if (!isMounted) return;
        setFormData({
          title: book.title || '',
          subtitle: book.subtitle || '',
          quote: book.quote || '',
          category: book.category || 'district',
          pdf_url: book.pdf_url || '',
          cover_image_url: book.cover_image_url || '',
          images: book.images || [],
          order: Number(book.order ?? 0),
          is_active: book.is_active ?? true,
        });
        setUploadedImages(book.images || []);
      } catch (error) {
        console.error('Error loading VTD book:', error);
        alert('Failed to load VTD book');
        navigate('/admin/dashboard?section=vtd');
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadBook();
    return () => { isMounted = false; };
  }, [id, navigate]);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((current) => ({ 
      ...current, 
      [name]: type === 'checkbox' ? checked : value 
    }));
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
      setFormData(prev => ({ ...prev, category: 'district' }));
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    for (const file of files) {
      try {
        const response = await uploadToS3(file, 'images/VTD');
        const s3Url = response.url || response;
        setUploadedImages(prev => [...prev, s3Url]);
      } catch (error) {
        console.error('Error uploading image:', error);
        alert(`Failed to upload ${file.name}`);
      }
    }
    e.target.value = '';
  };

  const toggleImageSelection = (index) => {
    setSelectedImages(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const selectAllImages = () => {
    if (selectedImages.length === uploadedImages.length) {
      setSelectedImages([]);
    } else {
      setSelectedImages(uploadedImages.map((_, idx) => idx));
    }
  };

  const deleteSelectedImages = () => {
    if (selectedImages.length === 0) {
      alert('No images selected');
      return;
    }
    if (window.confirm(`Delete ${selectedImages.length} selected image(s)?`)) {
      setUploadedImages(prev => prev.filter((_, idx) => !selectedImages.includes(idx)));
      setSelectedImages([]);
    }
  };

  const setAsCover = (imageUrl) => {
    setFormData(prev => ({ ...prev, cover_image_url: imageUrl }));
  };

  const handleCoverUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      setUploadingCover(true);
      const response = await uploadToS3(file, 'images/VTD');
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
      const response = await uploadToS3(file, 'pdfs/vtd');
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
    if (!formData.title.trim()) {
      alert('Please enter a title');
      return;
    }
    try {
      setSaving(true);
      const payload = { 
        ...formData, 
        images: uploadedImages,
        order: Number(formData.order || 0) 
      };
      if (id) {
        await axiosInstance.put(`/vtd-books/${id}`, payload);
      } else {
        await axiosInstance.post('/vtd-books/', payload);
      }
      navigate('/admin/dashboard?section=vtd');
    } catch (error) {
      console.error('Error saving VTD book:', error);
      alert('Failed to save VTD book');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => navigate('/admin/dashboard?section=vtd');

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
    <div className="blog-editor">
      <div className="manager-header">
        <div>
          <h2><i className="fas fa-book"></i> {id ? 'Edit VTD Book' : 'Add VTD Book'}</h2>
          <p className="subtitle">{id ? 'Update the details of this VTD book.' : 'Fill in the details to add a new VTD book.'}</p>
        </div>
        <button className="btn-secondary" onClick={handleCancel}>
          <i className="fas fa-arrow-left"></i> Back to VTD Books
        </button>
      </div>

      <form onSubmit={handleSubmit} className="editor-form">
        <div className="editor-main">
          <div className="form-section">
            <h3>Basic Information</h3>
            
            <div className="form-group">
              <label>Title *</label>
              <input 
                type="text" 
                name="title" 
                required 
                value={formData.title} 
                onChange={handleInputChange} 
                placeholder="Enter book title" 
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Subtitle</label>
                <input 
                  type="text" 
                  name="subtitle" 
                  value={formData.subtitle} 
                  onChange={handleInputChange} 
                  placeholder="e.g., Training Guide, Reference Material" 
                />
              </div>
            </div>

            <div className="form-group">
              <label>Description / Quote</label>
              <textarea 
                name="quote" 
                rows="4" 
                value={formData.quote} 
                onChange={handleInputChange} 
                placeholder="Brief description or quote about this VTD resource" 
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Category</label>
                <select name="category" value={formData.category} onChange={handleInputChange}>
                  <optgroup label="Default Categories">
                    {DEFAULT_CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                    ))}
                  </optgroup>
                  {customCategories.length > 0 && (
                    <optgroup label="Custom Categories">
                      {customCategories.map(cat => (
                        <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                      ))}
                    </optgroup>
                  )}
                </select>
              </div>

              <div className="form-group">
                <label>Display Order</label>
                <input 
                  type="number" 
                  name="order" 
                  min="0" 
                  value={formData.order} 
                  onChange={handleInputChange} 
                />
              </div>
            </div>

            {!showCustomCategory ? (
              <button 
                type="button" 
                className="btn-secondary" 
                onClick={() => setShowCustomCategory(true)}
                style={{ marginBottom: '20px' }}
              >
                <i className="fas fa-plus"></i> Add Custom Category
              </button>
            ) : (
              <div style={{ marginBottom: '20px', padding: '16px', background: '#f8fafc', borderRadius: '8px' }}>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Enter category name"
                    style={{ flex: 1, padding: '8px 12px', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                  />
                  <button 
                    type="button" 
                    onClick={handleAddCustomCategory}
                    style={{ padding: '8px 18px', background: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                  >
                    Add
                  </button>
                  <button 
                    type="button" 
                    onClick={() => { setShowCustomCategory(false); setNewCategory(''); }}
                    style={{ padding: '8px 18px', background: '#6b7280', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {customCategories.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Custom Categories:</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {customCategories.map(cat => (
                    <span 
                      key={cat}
                      style={{ 
                        padding: '6px 12px', 
                        background: '#e0e7ff', 
                        borderRadius: '20px', 
                        fontSize: '0.9rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      <button
                        type="button"
                        onClick={() => handleRemoveCustomCategory(cat)}
                        style={{ 
                          background: 'none', 
                          border: 'none', 
                          color: '#4338ca', 
                          cursor: 'pointer',
                          fontSize: '1.1rem',
                          lineHeight: 1
                        }}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="form-section">
            <h3>Cover Image & PDF</h3>
            
            <div className="form-group">
              <label>Cover Image</label>
              {formData.cover_image_url && (
                <div className="image-preview" style={{ marginBottom: '10px' }}>
                  <img src={formData.cover_image_url} alt="cover preview" style={{ maxWidth: '300px', borderRadius: '8px' }} />
                </div>
              )}
              <input type="file" accept="image/*" onChange={handleCoverUpload} disabled={uploadingCover} />
              {uploadingCover && <span className="upload-status"><i className="fas fa-spinner fa-spin"></i> Uploading...</span>}
            </div>

            <div className="form-group">
              <label>PDF File</label>
              <input type="file" accept="application/pdf" onChange={handlePdfUpload} disabled={uploadingPdf} />
              {uploadingPdf && <span className="upload-status"><i className="fas fa-spinner fa-spin"></i> Uploading PDF...</span>}
              {formData.pdf_url && !uploadingPdf && (
                <a 
                  href={formData.pdf_url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '6px', fontSize: '0.9rem', color: '#4da6ff' }}
                >
                  <i className="fas fa-external-link-alt"></i> View PDF
                </a>
              )}
            </div>
          </div>

          <div className="form-section">
            <h3>Gallery Images</h3>
            
            <div className="form-group">
              <label>Upload Images</label>
              <input 
                type="file" 
                accept="image/*" 
                multiple 
                onChange={handleImageUpload} 
              />
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '4px' }}>
                You can select multiple images at once
              </p>
            </div>

            {uploadedImages.length > 0 && (
              <div>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', alignItems: 'center' }}>
                  <button 
                    type="button" 
                    onClick={selectAllImages}
                    className="btn-secondary"
                    style={{ padding: '6px 12px', fontSize: '0.85rem' }}
                  >
                    {selectedImages.length === uploadedImages.length ? 'Deselect All' : 'Select All'}
                  </button>
                  {selectedImages.length > 0 && (
                    <button 
                      type="button" 
                      onClick={deleteSelectedImages}
                      style={{ 
                        padding: '6px 12px', 
                        fontSize: '0.85rem',
                        background: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      <i className="fas fa-trash"></i> Delete Selected ({selectedImages.length})
                    </button>
                  )}
                </div>

                <div className="images-grid">
                  {uploadedImages.map((img, idx) => (
                    <div 
                      key={idx} 
                      className="image-item"
                      style={{ 
                        position: 'relative',
                        border: selectedImages.includes(idx) ? '3px solid #3b82f6' : '1px solid #e2e8f0',
                        borderRadius: '8px',
                        overflow: 'hidden'
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedImages.includes(idx)}
                        onChange={() => toggleImageSelection(idx)}
                        style={{ 
                          position: 'absolute', 
                          top: '8px', 
                          left: '8px', 
                          width: '20px', 
                          height: '20px',
                          cursor: 'pointer',
                          zIndex: 10
                        }}
                      />
                      <img src={img} alt={`Upload ${idx + 1}`} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                      <div className="image-actions" style={{ padding: '8px', background: '#f8fafc', display: 'flex', gap: '5px', justifyContent: 'center' }}>
                        <button
                          type="button"
                          onClick={() => setAsCover(img)}
                          className="btn-icon"
                          title="Set as Cover"
                          style={{ padding: '6px 10px', fontSize: '0.8rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                        >
                          <i className="fas fa-star"></i> Cover
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="editor-sidebar">
          <div className="sidebar-section">
            <h3>Publish</h3>
            <div className="form-group">
              <label>Status</label>
              <select 
                name="is_active" 
                value={formData.is_active} 
                onChange={(e) => setFormData((current) => ({ ...current, is_active: e.target.value === 'true' }))}
              >
                <option value="true">Active (Visible)</option>
                <option value="false">Inactive (Hidden)</option>
              </select>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary" disabled={saving}>
                {saving ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Saving...
                  </>
                ) : (
                  <>
                    <i className="fas fa-save"></i> {id ? 'Update' : 'Create'} Book
                  </>
                )}
              </button>
              <button type="button" className="btn-secondary" onClick={handleCancel} disabled={saving}>
                <i className="fas fa-times"></i> Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default VtdBookEditor;
