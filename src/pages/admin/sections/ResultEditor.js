import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '../../../config/axiosConfig';
import { uploadToS3 } from '../../../utils/s3Upload';
import './ResultEditor.css';

const DEFAULT_CATEGORIES = ['district', 'state', 'nationals', 'internationals'];

const ResultEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'district',
    type: 'results',
    event_date: '',
    location: '',
    thumbnail_url: ''
  });
  const [uploadedImages, setUploadedImages] = useState([]);
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [uploadProgress, setUploadProgress] = useState({});
  const [customCategories, setCustomCategories] = useState([]);
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    fetchExistingCategories();
  }, []);

  useEffect(() => {
    if (id) {
      loadResult();
    }
  }, [id]);

  const fetchExistingCategories = async () => {
    try {
      const res = await axiosInstance.get('/results/');
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
    if (!window.confirm(`Remove "${categoryToRemove}" from the list? This won't affect existing results using this category.`)) {
      return;
    }
    setCustomCategories(customCategories.filter(c => c !== categoryToRemove));
    if (formData.category === categoryToRemove) {
      setFormData(prev => ({ ...prev, category: 'district' }));
    }
  };

  const loadResult = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/results/${id}`);
      const result = response.data;
      
      setFormData({
        title: result.title || '',
        description: result.description || '',
        category: result.category || 'district',
        type: result.type || 'results',
        event_date: result.event_date || '',
        location: result.location || '',
        thumbnail_url: result.thumbnail_url || ''
      });
      setUploadedImages(result.images || []);
      setThumbnailPreview(result.thumbnail_url || '');
    } catch (error) {
      console.error('Error loading result:', error);
      alert('Failed to load result');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMultipleImagesUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    for (const file of files) {
      const imageId = `img_${Date.now()}_${Math.random()}`;
      
      setUploadProgress(prev => ({
        ...prev,
        [imageId]: { name: file.name, progress: 0 }
      }));

      try {
        const folder = `results/${formData.category}/${formData.type}`;
        const result = await uploadToS3(file, folder);
        const s3Url = result.url || result;
        
        setUploadedImages(prev => [...prev, s3Url]);
        
        setUploadProgress(prev => ({
          ...prev,
          [imageId]: { ...prev[imageId], progress: 100 }
        }));

        setTimeout(() => {
          setUploadProgress(prev => {
            const newProgress = { ...prev };
            delete newProgress[imageId];
            return newProgress;
          });
        }, 1000);
      } catch (error) {
        console.error('Error uploading image:', error);
        alert(`Failed to upload ${file.name}`);
        setUploadProgress(prev => {
          const newProgress = { ...prev };
          delete newProgress[imageId];
          return newProgress;
        });
      }
    }
  };

  const handleThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      const folder = `results/${formData.category}/${formData.type}/thumbnails`;
      const response = await uploadToS3(file, folder);
      const s3Url = response.url || response;
      setFormData(prev => ({ ...prev, thumbnail_url: s3Url }));
      setThumbnailPreview(s3Url);
    } catch (error) {
      console.error('Error uploading thumbnail:', error);
      alert('Failed to upload featured image');
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (index) => {
    if (window.confirm('Remove this image?')) {
      setUploadedImages(prev => prev.filter((_, i) => i !== index));
    }
  };

  const setAsThumbnail = (imageUrl) => {
    setFormData(prev => ({ ...prev, thumbnail_url: imageUrl }));
    setThumbnailPreview(imageUrl);
  };

  const handleSave = async () => {
    if (!formData.title.trim()) {
      alert('Please enter a title');
      return;
    }

    if (uploadedImages.length === 0) {
      alert('Please upload at least one image');
      return;
    }

    try {
      setLoading(true);
      
      const postData = {
        title: formData.title.trim(),
        category: formData.category.toLowerCase(),
        type: formData.type,
        images: uploadedImages
      };

      if (formData.description && formData.description.trim()) {
        postData.description = formData.description.trim();
      }
      
      if (formData.event_date && formData.event_date.trim()) {
        postData.event_date = formData.event_date.trim();
      }
      
      if (formData.location && formData.location.trim()) {
        postData.location = formData.location.trim();
      }
      
      if (formData.thumbnail_url && formData.thumbnail_url.trim()) {
        postData.thumbnail_url = formData.thumbnail_url.trim();
      }

      if (id) {
        await axiosInstance.put(`/results/${id}`, postData);
        alert('Updated successfully!');
      } else {
        await axiosInstance.post('/results/', postData);
        alert('Created successfully!');
      }
      navigate('/admin/dashboard?section=results');
    } catch (error) {
      console.error('Error saving:', error);
      console.error('Error details:', error.response?.data);
      
      let errorMessage = 'Failed to save';
      if (error.response?.data?.detail) {
        if (Array.isArray(error.response.data.detail)) {
          errorMessage = error.response.data.detail.map(err => 
            `${err.loc?.join(' -> ') || 'Field'}: ${err.msg}`
          ).join('\n');
        } else {
          errorMessage = error.response.data.detail;
        }
      }
      
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm('Discard changes?')) {
      navigate('/admin/dashboard?section=results');
    }
  };

  if (loading && !formData.title) {
    return (
      <div className="result-editor-loading">
        <i className="fas fa-spinner fa-spin fa-3x"></i>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="result-editor-container">
      <div className="result-editor-header">
        <div className="header-left">
          <button className="btn-back" onClick={handleCancel}>
            <i className="fas fa-arrow-left"></i>
            Back
          </button>
          <div className="header-title">
            <h1>{id ? 'Edit' : 'Create'} {formData.type === 'id_card' ? 'ID Card' : 'Result'}</h1>
            <p>Manage competition results and member ID cards</p>
          </div>
        </div>
        <div className="header-actions">
          <button 
            className="btn-save" 
            onClick={handleSave}
            disabled={loading}
          >
            <i className="fas fa-save"></i>
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      <div className="result-editor-content">
        <div className="editor-main">
          {/* Basic Information */}
          <div className="editor-section">
            <h3><i className="fas fa-info-circle"></i> Basic Information</h3>
            
            <div className="form-group">
              <label>Type *</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
              >
                <option value="championship">Championship</option>
                <option value="records">Records</option>
                <option value="results">Results</option>
              </select>
            </div>

            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., District Championship 2025"
                required
              />
            </div>

            <div className="form-group">
              <label>Category *
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
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <optgroup label="Default Categories">
                  <option value="district">District</option>
                  <option value="state">State</option>
                  <option value="nationals">Nationals</option>
                  <option value="internationals">Internationals</option>
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

            <div className="form-group">
              <label>Event Date</label>
              <input
                type="date"
                name="event_date"
                value={formData.event_date}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., Hyderabad, Telangana"
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Add description or notes..."
                rows="4"
              />
            </div>
          </div>

          {/* Images Section */}
          <div className="editor-section">
            <h3>
              <i className="fas fa-images"></i> 
              Result Images
            </h3>
            
            <div className="upload-area">
              <input
                type="file"
                id="multipleImagesUpload"
                multiple
                accept="image/*"
                onChange={handleMultipleImagesUpload}
                style={{ display: 'none' }}
              />
              <label htmlFor="multipleImagesUpload" className="upload-label">
                <i className="fas fa-cloud-upload-alt"></i>
                <p>Click or drag to upload images</p>
                <span>Supports: JPG, PNG, GIF, WebP</span>
              </label>
            </div>

            {/* Upload Progress */}
            {Object.keys(uploadProgress).length > 0 && (
              <div className="upload-progress-list">
                {Object.entries(uploadProgress).map(([id, { name, progress }]) => (
                  <div key={id} className="progress-item">
                    <span>{name}</span>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Uploaded Images Grid */}
            {uploadedImages.length > 0 && (
              <div className="uploaded-images-grid">
                {uploadedImages.map((img, index) => (
                  <div key={index} className="image-item">
                    <img src={img} alt={`Uploaded ${index + 1}`} />
                    <div className="image-overlay">
                      <button
                        className="btn-set-thumbnail"
                        onClick={() => setAsThumbnail(img)}
                        title="Set as featured image"
                      >
                        <i className="fas fa-star"></i>
                      </button>
                      <button
                        className="btn-remove"
                        onClick={() => removeImage(index)}
                        title="Remove image"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                    {formData.thumbnail_url === img && (
                      <div className="featured-badge">
                        <i className="fas fa-star"></i> Featured
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="editor-sidebar">
          {/* Featured Image */}
          <div className="sidebar-section">
            <h4><i className="fas fa-image"></i> Featured Image</h4>
            <div className="featured-image-upload">
              {thumbnailPreview ? (
                <div className="thumbnail-preview">
                  <img src={thumbnailPreview} alt="Featured" />
                  <button
                    className="btn-remove-thumbnail"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, thumbnail_url: '' }));
                      setThumbnailPreview('');
                    }}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ) : (
                <div className="thumbnail-placeholder">
                  <i className="fas fa-image"></i>
                  <p>No featured image</p>
                </div>
              )}
              <input
                type="file"
                id="thumbnailUpload"
                accept="image/*"
                onChange={handleThumbnailUpload}
                style={{ display: 'none' }}
              />
              <label htmlFor="thumbnailUpload" className="btn-upload-thumbnail">
                <i className="fas fa-upload"></i>
                Upload Featured Image
              </label>
              <p className="help-text">Or click ⭐ on any uploaded image</p>
            </div>
          </div>

          {/* Quick Info */}
          <div className="sidebar-section">
            <h4><i className="fas fa-info-circle"></i> Information</h4>
            <div className="info-list">
              <div className="info-item">
                <span className="info-label">Images:</span>
                <span className="info-value">{uploadedImages.length}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Type:</span>
                <span className="info-value">{formData.type === 'id_card' ? 'ID Card' : 'Result'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Category:</span>
                <span className="info-value">{formData.category}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultEditor;
