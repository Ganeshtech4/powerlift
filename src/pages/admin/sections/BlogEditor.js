import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '../../../config/axiosConfig';
import { uploadToS3 } from '../../../utils/s3Upload';
import './BlogEditor.css';

const BlogEditor = () => {
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
    images: []
  });
  const [uploadedImages, setUploadedImages] = useState([]);
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [uploadProgress, setUploadProgress] = useState({});

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/blogs/${id}`);
        const post = response.data;
        
        // Load images if they exist in post
        let postImages = post.images || [];
        
        // If no images in post but slug exists, try to fetch from images endpoint
        if ((!postImages || postImages.length === 0) && post.slug) {
          try {
            const imagesResponse = await axiosInstance.get(`/images/${id}/list`);
            if (imagesResponse.data && imagesResponse.data.images) {
              postImages = imagesResponse.data.images;
            }
          } catch (imgError) {
            console.log('No images found or error loading images:', imgError);
          }
        }
        
        setFormData({
          title: post.title || '',
          excerpt: post.excerpt || '',
          content: post.content || '',
          category: post.category || 'district',
          tags: post.tags || '',
          author: post.author || 'Admin',
          is_published: post.is_published || false,
          thumbnail_url: post.thumbnail_url || '',
          images: postImages
        });
        setUploadedImages(postImages);
        setThumbnailPreview(post.thumbnail_url || '');
      } catch (error) {
        console.error('Error loading post:', error);
        alert('Failed to load post: ' + (error.response?.data?.detail || error.message));
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadPost();
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
    if (files.length + uploadedImages.length > 500) {
      alert('Maximum 500 images allowed');
      return;
    }

    for (const file of files) {
      try {
        const imageId = Date.now() + Math.random();
        setUploadProgress(prev => ({ ...prev, [imageId]: 0 }));

        const response = await uploadToS3(file, 'blog-images');
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
      const response = await uploadToS3(file, 'blog-images');
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

  const handleSaveDraft = async () => {
    await savePost(false);
  };

  const handlePublish = async () => {
    await savePost(true);
  };

  const savePost = async (publish = false) => {
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
      const postData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        is_published: publish,
        images: uploadedImages,
        category: formData.category.toLowerCase()
      };

      // Only add optional fields if they have values
      if (formData.excerpt && formData.excerpt.trim()) {
        postData.excerpt = formData.excerpt.trim();
      }
      
      if (formData.tags && formData.tags.trim()) {
        postData.tags = formData.tags.trim();
      }
      
      if (formData.thumbnail_url && formData.thumbnail_url.trim()) {
        postData.thumbnail_url = formData.thumbnail_url.trim();
      }
      
      if (formData.author && formData.author.trim()) {
        postData.author = formData.author.trim();
      }

      if (id) {
        await axiosInstance.put(`/blogs/${id}`, postData);
        alert(publish ? 'Post published successfully!' : 'Draft saved successfully!');
      } else {
        await axiosInstance.post('/blogs/', postData);
        alert(publish ? 'Post published successfully!' : 'Draft saved successfully!');
      }
      navigate('/admin/dashboard?section=gallery');
    } catch (error) {
      console.error('Error saving post:', error);
      console.error('Error details:', error.response?.data);
      
      let errorMessage = 'Failed to save post';
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
      navigate('/admin/dashboard?section=gallery');
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
          <h1>{id ? 'Edit Post' : 'Create New Post'}</h1>
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
              <h1 className="preview-title">{formData.title || 'Untitled Post'}</h1>
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
              <div className="preview-gallery">
                <h3>Gallery Images ({uploadedImages.length})</h3>
                <div className="preview-images-grid">
                  {uploadedImages.map((img, idx) => (
                    <img key={idx} src={img} alt={`Gallery ${idx + 1}`} />
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
        <div className="blog-editor-content">
          <div className="editor-main">
            <div className="form-group">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter post title..."
                className="title-input"
              />
            </div>

            <div className="form-group">
              <label>Excerpt (Short Description)</label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                placeholder="Brief description of your post..."
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
                placeholder="Write your post content here..."
                rows="15"
                className="content-input"
              />
            </div>

            <div className="form-group">
              <label>Gallery Images ({uploadedImages.length}/500)</label>
              <div className="image-upload-area">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  id="gallery-images"
                  className="file-input"
                />
                <label htmlFor="gallery-images" className="upload-label">
                  <i className="fas fa-cloud-upload-alt"></i>
                  <span>Click to upload images (or drag and drop)</span>
                  <small>Maximum 500 images, any size</small>
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
                    <div key={idx} className="image-item">
                      <img src={img} alt={`Upload ${idx + 1}`} />
                      <div className="image-actions">
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
              <h3>Category</h3>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="category-select"
              >
                <option value="district">District</option>
                <option value="state">State</option>
                <option value="nationals">Nationals</option>
                <option value="internationals">Internationals</option>
              </select>
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
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogEditor;
