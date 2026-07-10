import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '../../../config/axiosConfig';
import { uploadToS3 } from '../../../utils/s3Upload';
import './BlogEditor.css';

const DEFAULT_CATEGORIES = ['district', 'state', 'nationals', 'internationals'];

const VtdEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'district',
    tags: '',
    author: 'Admin',
    is_published: false,
    thumbnail_url: '',
    images: [],
    location: 'Hyderabad, Telangana, India',
    event_date: new Date().toISOString().slice(0, 10)
  });
  const [uploadedImages, setUploadedImages] = useState([]);
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [uploadProgress, setUploadProgress] = useState({});
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
    const loaditem = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/vtd-books/${id}`);
        const item = response.data;
        
        // Load images if they exist in item
        let itemImages = item.images || [];
        
        // If no images in item but slug exists, try to fetch from images endpoint
        if ((!itemImages || itemImages.length === 0) && item.slug) {
          try {
            const imagesResponse = await axiosInstance.get(`/images/${id}/list`);
            if (imagesResponse.data && imagesResponse.data.images) {
              itemImages = imagesResponse.data.images;
            }
          } catch (imgError) {
            console.log('No images found or error loading images:', imgError);
          }
        }
        
        setFormData({
          title: item.title || '',
          excerpt: item.excerpt || '',
          content: item.content || '',
          category: item.category || 'district',
          tags: item.tags || '',
          author: item.author || 'Admin',
          is_published: item.is_published || false,
          thumbnail_url: item.thumbnail_url || '',
          images: itemImages,
          location: item.location || 'Hyderabad, Telangana, India',
          event_date: item.event_date || new Date().toISOString().slice(0, 10)
        });
        setUploadedImages(itemImages);
        setThumbnailPreview(item.thumbnail_url || '');
      } catch (error) {
        console.error('Error loading item:', error);
        alert('Failed to load item: ' + (error.response?.data?.detail || error.message));
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loaditem();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);

    for (const file of files) {
      try {
        const imageId = Date.now() + Math.random();
        setUploadProgress(prev => ({ ...prev, [imageId]: 0 }));

        const response = await uploadToS3(file, 'images/VTD');
        const s3Url = response.url || response;

        setUploadedImages(prev => [...prev, s3Url]);
        setUploadProgress(prev => {
          const newProgress = { ...prev };
          delete newProgress[imageId];
          return newProgress;
        });
      } catch (error) {
        console.error('Error uploading image:', error);
        alert(`Failed to upload ${file.name}`);
      }
    }
  };

  const handleThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      const response = await uploadToS3(file, 'images/VTD');
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

  const setAsThumbnail = (imageUrl) => {
    setFormData(prev => ({ ...prev, thumbnail_url: imageUrl }));
    setThumbnailPreview(imageUrl);
  };

  const handleSaveDraft = async () => {
    await saveitem(false);
  };

  const handlePublish = async () => {
    await saveitem(true);
  };

  const saveitem = async (publish = false) => {
    if (!formData.title.trim()) {
      alert('Please enter a title');
      return;
    }

    if (!formData.content.trim() || formData.content.trim().length < 10) {
      alert('Please enter content (at least 10 characters)');
      return;
    }

    try {
      setLoading(true);
      
      // Only include non-empty fields for update
      const itemData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        is_published: publish,
        images: uploadedImages,
        category: formData.category.toLowerCase(),
        location: formData.location.trim() || null,
        event_date: formData.event_date || null
      };

      // Only add optional fields if they have values
      if (formData.excerpt && formData.excerpt.trim()) {
        itemData.excerpt = formData.excerpt.trim();
      }
      
      if (formData.tags && formData.tags.trim()) {
        itemData.tags = formData.tags.trim();
      }
      
      if (formData.thumbnail_url && formData.thumbnail_url.trim()) {
        itemData.thumbnail_url = formData.thumbnail_url.trim();
      }
      
      if (formData.author && formData.author.trim()) {
        itemData.author = formData.author.trim();
      }

      if (id) {
        await axiosInstance.put(`/vtd-books/${id}`, itemData);
        alert(publish ? 'Item published successfully!' : 'Draft saved successfully!');
      } else {
        await axiosInstance.post('/vtd-books/', itemData);
        alert(publish ? 'Item published successfully!' : 'Draft saved successfully!');
      }
      navigate('/admin/dashboard?section=vtd');
    } catch (error) {
      console.error('Error saving item:', error);
      console.error('Error details:', error.response?.data);
      
      let errorMessage = 'Failed to save item';
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
      navigate('/admin/dashboard?section=vtd');
    }
  };

  if (loading && !formData.title) {
    return (
      <div className="vtd-editor-loading">
        <i className="fas fa-spinner fa-spin fa-3x"></i>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="vtd-editor-container">
      <div className="vtd-editor-header">
        <div className="header-left">
          <button className="btn-back" onClick={handleCancel}>
            <i className="fas fa-arrow-left"></i> Back to Dashboard
          </button>
          <h1>{id ? 'Edit item' : 'Create New item'}</h1>
        </div>
        <div className="header-actions">
          <button 
            className="btn-preview" 
            onClick={() => setPreviewMode(!previewMode)}
          >
            <i className={`fas fa-${previewMode ? 'edit' : 'eye'}`}></i>
            {previewMode ? 'Edit' : 'Preview'}
          </button>
          <button 
            className="btn-save-draft" 
            onClick={handleSaveDraft}
            disabled={loading}
          >
            <i className="fas fa-save"></i> Save Draft
          </button>
          <button 
            className="btn-publish" 
            onClick={handlePublish}
            disabled={loading}
          >
            <i className="fas fa-rocket"></i> Publish
          </button>
        </div>
      </div>

      {previewMode ? (
        <div className="blog-preview">
          <div className="preview-container">
            <div className="preview-header">
              {formData.thumbnail_url && (
                <img src={formData.thumbnail_url} alt={formData.title} className="preview-featured-image" />
              )}
              <span className="preview-category">{formData.category}</span>
              <h1 className="preview-title">{formData.title || 'Untitled item'}</h1>
              <div className="preview-meta">
                <span><i className="fas fa-user"></i> {formData.author}</span>
                <span><i className="fas fa-calendar"></i> {new Date().toLocaleDateString()}</span>
              </div>
            </div>
            {formData.excerpt && (
              <div className="preview-excerpt">{formData.excerpt}</div>
            )}
            <div className="preview-content">{formData.content}</div>
            {uploadedImages.length > 0 && (
              <div className="preview-VTD">
                <h3>VTD Images ({uploadedImages.length})</h3>
                <div className="preview-images-grid">
                  {uploadedImages.map((img, idx) => (
                    <img key={idx} src={img} alt={`VTD ${idx + 1}`} />
                  ))}
                </div>
              </div>
            )}
            {formData.tags && (
              <div className="preview-tags">
                {formData.tags.split(',').map((tag, idx) => (
                  <span key={idx} className="tag">{tag.trim()}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="vtd-editor-content">
          <div className="editor-main">
            <div className="form-group">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter item title..."
                className="title-input"
              />
            </div>

            <div className="form-group">
              <label>Excerpt (Short Description)</label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                placeholder="Brief description of your item..."
                rows="3"
                className="excerpt-input"
              />
            </div>

            <div className="form-group">
              <label>Content</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Write your item content here..."
                rows="15"
                className="content-input"
              />
            </div>

            <div className="form-group">
              <label>VTD Images ({uploadedImages.length})</label>
              {uploadedImages.length > 0 && (
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <button
                    type="button"
                    className="btn-select-all"
                    onClick={selectAllImages}
                    style={{
                      padding: '8px 16px',
                      background: '#3b82f6',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}
                  >
                    <i className={`fas fa-${selectedImages.length === uploadedImages.length ? 'times' : 'check-square'}`}></i>
                    {' '}
                    {selectedImages.length === uploadedImages.length ? 'Deselect All' : 'Select All'}
                  </button>
                  {selectedImages.length > 0 && (
                    <button
                      type="button"
                      className="btn-delete-selected"
                      onClick={deleteSelectedImages}
                      style={{
                        padding: '8px 16px',
                        background: '#ef4444',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '600'
                      }}
                    >
                      <i className="fas fa-trash"></i> Delete Selected ({selectedImages.length})
                    </button>
                  )}
                </div>
              )}
              <div className="image-upload-area">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  id="VTD-images"
                  className="file-input"
                />
                <label htmlFor="VTD-images" className="upload-label">
                  <i className="fas fa-cloud-upload-alt"></i>
                  <span>Click to upload images (or drag and drop)</span>
                  <small>Upload as many images as needed</small>
                </label>
              </div>

              {Object.keys(uploadProgress).length > 0 && (
                <div className="upload-progress">
                  {Object.entries(uploadProgress).map(([id, progress]) => (
                    <div key={id} className="progress-bar">
                      <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                      <span>{progress}%</span>
                    </div>
                  ))}
                </div>
              )}

              {uploadedImages.length > 0 && (
                <div className="uploaded-images-grid">
                  {uploadedImages.map((img, idx) => (
                    <div 
                      key={idx} 
                      className={`image-item ${selectedImages.includes(idx) ? 'selected' : ''}`}
                      onClick={() => toggleImageSelection(idx)}
                      style={{ cursor: 'pointer', position: 'relative' }}
                    >
                      <img src={img} alt={`Upload ${idx + 1}`} />
                      <div className="image-checkbox" style={{
                        position: 'absolute',
                        top: '8px',
                        left: '8px',
                        width: '24px',
                        height: '24px',
                        background: selectedImages.includes(idx) ? '#3b82f6' : 'rgba(255,255,255,0.9)',
                        border: '2px solid #fff',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                      }}>
                        {selectedImages.includes(idx) && (
                          <i className="fas fa-check" style={{ color: '#fff', fontSize: '14px' }}></i>
                        )}
                      </div>
                      <div className="image-actions" onClick={(e) => e.stopPropagation()}>
                        <button
                          className="btn-set-featured"
                          onClick={() => setAsThumbnail(img)}
                          title="Set as featured image"
                        >
                          <i className="fas fa-star"></i>
                        </button>
                        <button
                          className="btn-remove-image"
                          onClick={() => removeImage(idx)}
                          title="Remove image"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                      {formData.thumbnail_url === img && (
                        <span className="featured-badge">Featured</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="editor-sidebar">
            <div className="sidebar-section">
              <h3>Publish Settings</h3>
              <div className="form-group">
                <label>Status</label>
                <p className="status-text">
                  {formData.is_published ? (
                    <><i className="fas fa-check-circle"></i> Published</>
                  ) : (
                    <><i className="fas fa-clock"></i> Draft</>
                  )}
                </p>
              </div>
            </div>

            <div className="sidebar-section">
              <h3>Featured Image</h3>
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
                    <i className="fas fa-times"></i> Remove
                  </button>
                </div>
              ) : (
                <div className="thumbnail-upload">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailUpload}
                    id="thumbnail-upload"
                    className="file-input"
                  />
                  <label htmlFor="thumbnail-upload" className="upload-label-small">
                    <i className="fas fa-image"></i>
                    <span>Upload Featured Image</span>
                  </label>
                </div>
              )}
            </div>

            <div className="sidebar-section">
              <h3>Category
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
              </h3>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="category-select"
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
              
              {/* Show custom category input */}
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
                        <i className="fas fa-times"></i>
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="sidebar-section">
              <h3>Tags</h3>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="Comma separated tags"
                className="tags-input"
              />
              <small>Separate tags with commas</small>
            </div>

            <div className="sidebar-section">
              <h3>Author</h3>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                className="author-input"
              />
            </div>

            <div className="sidebar-section">
              <h3>Location</h3>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., Hyderabad, Telangana, India"
                className="author-input"
              />
            </div>

            <div className="sidebar-section">
              <h3>Event Date</h3>
              <input
                type="date"
                name="event_date"
                value={formData.event_date}
                onChange={handleInputChange}
                className="author-input"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VtdEditor;
