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
  const [coverPreview, setCoverPreview] = useState('');
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
    const loadItem = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/vtd-books/${id}`);
        const item = response.data;
        
        let itemImages = item.images || [];
        
        setFormData({
          title: item.title || '',
          subtitle: item.subtitle || '',
          quote: item.quote || '',
          category: item.category || 'district',
          pdf_url: item.pdf_url || '',
          cover_image_url: item.cover_image_url || '',
          images: itemImages,
          order: item.order || 0,
          is_active: item.is_active !== false,
        });
        setUploadedImages(itemImages);
        setCoverPreview(item.cover_image_url || '');
      } catch (error) {
        console.error('Error loading item:', error);
        alert('Failed to load item: ' + (error.response?.data?.detail || error.message));
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadItem();
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

  const handleCoverUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      const response = await uploadToS3(file, 'images/VTD');
      const s3Url = response.url || response;
      setFormData(prev => ({ ...prev, cover_image_url: s3Url }));
      setCoverPreview(s3Url);
    } catch (error) {
      console.error('Error uploading cover:', error);
      alert('Failed to upload cover image');
    } finally {
      setLoading(false);
    }
  };

  const handlePdfUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      const response = await uploadToS3(file, 'pdfs/vtd');
      const s3Url = response.url || response;
      setFormData(prev => ({ ...prev, pdf_url: s3Url }));
      alert('PDF uploaded successfully');
    } catch (error) {
      console.error('Error uploading PDF:', error);
      alert('Failed to upload PDF');
    } finally {
      setLoading(false);
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

  const setAsCover = (imageUrl) => {
    setFormData(prev => ({ ...prev, cover_image_url: imageUrl }));
    setCoverPreview(imageUrl);
  };

  const handleSaveDraft = async () => {
    await saveItem(false);
  };

  const handlePublish = async () => {
    await saveItem(true);
  };

  const saveItem = async (publish = true) => {
    if (!formData.title.trim()) {
      alert('Please enter a title');
      return;
    }

    try {
      setLoading(true);
      
      const itemData = {
        title: formData.title.trim(),
        subtitle: formData.subtitle?.trim() || '',
        quote: formData.quote?.trim() || '',
        category: formData.category.toLowerCase(),
        pdf_url: formData.pdf_url?.trim() || '',
        cover_image_url: formData.cover_image_url?.trim() || '',
        images: uploadedImages,
        order: parseInt(formData.order) || 0,
        is_active: publish,
      };

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
      <div className="blog-editor-loading">
        <i className="fas fa-spinner fa-spin fa-3x"></i>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="blog-editor-container">
      <div className="blog-editor-header">
        <div className="header-left">
          <button className="btn-back" onClick={handleCancel}>
            <i className="fas fa-arrow-left"></i> Back to Dashboard
          </button>
          <h1>{id ? 'Edit VTD Item' : 'Create New VTD Item'}</h1>
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
              {formData.cover_image_url && (
                <img src={formData.cover_image_url} alt={formData.title} className="preview-featured-image" />
              )}
              <span className="preview-category">{formData.category}</span>
              <h1 className="preview-title">{formData.title || 'Untitled Resource'}</h1>
              {formData.subtitle && (
                <h2 className="preview-subtitle">{formData.subtitle}</h2>
              )}
            </div>
            {formData.quote && (
              <div className="preview-excerpt">{formData.quote}</div>
            )}
            {formData.pdf_url && (
              <div className="preview-pdf">
                <a href={formData.pdf_url} target="_blank" rel="noopener noreferrer" className="pdf-link">
                  <i className="fas fa-file-pdf"></i> View PDF Document
                </a>
              </div>
            )}
            {uploadedImages.length > 0 && (
              <div className="preview-gallery">
                <h3>Gallery Images ({uploadedImages.length})</h3>
                <div className="preview-images-grid">
                  {uploadedImages.map((img, idx) => (
                    <img key={idx} src={img} alt={`Gallery ${idx + 1}`} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="blog-editor-content">
          <div className="editor-main">
            <div className="form-group">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter resource title..."
                className="title-input"
              />
            </div>

            <div className="form-group">
              <label>Subtitle</label>
              <input
                type="text"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleInputChange}
                placeholder="Optional subtitle..."
                className="subtitle-input"
              />
            </div>

            <div className="form-group">
              <label>Description / Quote</label>
              <textarea
                name="quote"
                value={formData.quote}
                onChange={handleInputChange}
                placeholder="Brief description or motivational quote..."
                rows="4"
              />
            </div>

            <div className="form-group">
              <label>Cover Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverUpload}
                className="file-input"
              />
              {coverPreview && (
                <div className="image-preview">
                  <img src={coverPreview} alt="Cover preview" />
                </div>
              )}
            </div>

            <div className="form-group">
              <label>PDF Document</label>
              <input
                type="file"
                accept=".pdf"
                onChange={handlePdfUpload}
                className="file-input"
              />
              {formData.pdf_url && (
                <a href={formData.pdf_url} target="_blank" rel="noopener noreferrer" className="pdf-preview-link">
                  <i className="fas fa-file-pdf"></i> View uploaded PDF
                </a>
              )}
            </div>

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
              
              <div className="custom-category-actions">
                <button
                  type="button"
                  className="btn-add-category"
                  onClick={() => setShowCustomCategory(!showCustomCategory)}
                >
                  <i className="fas fa-plus"></i> Add Custom Category
                </button>
                
                {customCategories.length > 0 && (
                  <div className="category-list">
                    {customCategories.map(cat => (
                      <span key={cat} className="category-tag">
                        {cat}
                        <button onClick={() => handleRemoveCustomCategory(cat)} className="remove-btn">
                          <i className="fas fa-times"></i>
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {showCustomCategory && (
                <div className="custom-category-form">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Enter custom category name"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCustomCategory())}
                  />
                  <button type="button" onClick={handleAddCustomCategory} className="btn-add">
                    Add
                  </button>
                  <button type="button" onClick={() => setShowCustomCategory(false)} className="btn-cancel">
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Gallery Images</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="file-input"
              />
              
              {uploadedImages.length > 0 && (
                <>
                  <div className="image-actions">
                    <button type="button" onClick={selectAllImages} className="btn-select-all">
                      {selectedImages.length === uploadedImages.length ? 'Deselect All' : 'Select All'}
                    </button>
                    {selectedImages.length > 0 && (
                      <button type="button" onClick={deleteSelectedImages} className="btn-delete-selected">
                        Delete Selected ({selectedImages.length})
                      </button>
                    )}
                  </div>
                  
                  <div className="images-grid">
                    {uploadedImages.map((img, idx) => (
                      <div
                        key={idx}
                        className={`image-item ${selectedImages.includes(idx) ? 'selected' : ''}`}
                        onClick={() => toggleImageSelection(idx)}
                      >
                        <img src={img} alt={`Upload ${idx + 1}`} />
                        {selectedImages.includes(idx) && (
                          <div className="selection-overlay">
                            <i className="fas fa-check-circle"></i>
                          </div>
                        )}
                        <button
                          type="button"
                          className="btn-set-cover"
                          onClick={(e) => {
                            e.stopPropagation();
                            setAsCover(img);
                          }}
                        >
                          Set as Cover
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleInputChange}
                />
                <span>Active (visible on frontend)</span>
              </label>
            </div>

            <div className="form-group">
              <label>Display Order</label>
              <input
                type="number"
                name="order"
                value={formData.order}
                onChange={handleInputChange}
                placeholder="0"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VtdEditor;
