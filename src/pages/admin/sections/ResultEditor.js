import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '../../../config/axiosConfig';
import { uploadToS3 } from '../../../utils/s3Upload';
import './ResultEditor.css';

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

  useEffect(() => {
    if (id) {
      loadResult();
    }
  }, [id]);

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
              <label>Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="district">District</option>
                <option value="state">State</option>
                <option value="nationals">Nationals</option>
                <option value="internationals">Internationals</option>
              </select>
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
