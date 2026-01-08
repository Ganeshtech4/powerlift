import React, { useState, useEffect, useRef } from 'react';
import './BlogManager.css';

// Use relative URL to work with Nginx proxy - will use same protocol (HTTP/HTTPS) as the page
const SERVER_URL = process.env.REACT_APP_SERVER_URL || '';
const BLOG_API_URL = '/blog-api/api/v1/blogs/';

// Helper to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  };
};

const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [showEditor, setShowEditor] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  const [blogImages, setBlogImages] = useState([]);
  const [showImageGallery, setShowImageGallery] = useState(false);
  const [imageUrls, setImageUrls] = useState({});
  const fileInputRef = useRef(null);
  const blogImagesInputRef = useRef(null);
  const contentTextareaRef = useRef(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    featuredImage: '',
    category: 'General',
    tags: '',
    author: 'WPC Telangana Admin',
    published: true,
    publishDate: new Date().toISOString().slice(0, 16),
    scheduledDate: '',
    // Event-like fields
    location: 'Hyderabad, Telangana, India',
    startTime: '09:00',
    endTime: '18:00',
    eventDate: new Date().toISOString().slice(0, 10)
  });

  // Load blogs from MongoDB via API on component mount
  useEffect(() => {
    loadBlogsFromAPI();
  }, []);

  const loadBlogsFromAPI = async () => {
    try {
      console.log('Loading blogs from:', `${BLOG_API_URL}?published_only=false`);
      const response = await fetch(`${BLOG_API_URL}?published_only=false`);
      console.log('Response status:', response.status);
      if (response.ok) {
        const blogsData = await response.json();
        console.log('Loaded blogs:', blogsData);
        setBlogs(blogsData);
        // Load images from S3 for admin panel display
        loadImagesFromS3(blogsData);
      } else {
        console.error('Failed to load blogs from API, status:', response.status);
      }
    } catch (error) {
      console.error('Error loading blogs:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Upload file to S3
  const uploadToS3 = async (file, blogId, fileName) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', `blogs/${blogId}`);
    formData.append('forceName', fileName);

    const response = await fetch(`${SERVER_URL}/api/s3/upload`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Failed to upload to S3');
    }

    const result = await response.json();
    return result.key; // Returns the S3 key like "blogs/{blogId}/filename.jpg"
  };

  // Load images from S3 for display
  const loadImagesFromS3 = async (blogsData) => {
    const urls = {};
    
    for (const blog of blogsData) {
      // Load featured image
      if (blog.featuredImage && !blog.featuredImage.startsWith('data:')) {
        try {
          const presignedUrl = await getPresignedUrl(blog.featuredImage);
          urls[`featured_${blog.id}`] = presignedUrl;
        } catch (error) {
          console.error('Error loading featured image:', error);
          urls[`featured_${blog.id}`] = blog.featuredImage;
        }
      } else {
        urls[`featured_${blog.id}`] = blog.featuredImage;
      }
    }
    
    setImageUrls(urls);
  };

  const getPresignedUrl = async (s3Key) => {
    try {
      const response = await fetch(`${SERVER_URL}/api/s3/presigned-url/${encodeURIComponent(s3Key)}?expiresIn=3600`);
      if (!response.ok) throw new Error('Failed to get presigned URL');
      const result = await response.json();
      return result.url;
    } catch (error) {
      console.error('Error getting presigned URL:', error);
      return s3Key;
    }
  };

  // Delete blog folder from S3
  const deleteBlogFolderFromS3 = async (blogId) => {
    try {
      // List all files in the blog folder
      const response = await fetch(`${SERVER_URL}/api/s3/list?prefix=blogs/${blogId}/`);
      if (!response.ok) {
        throw new Error('Failed to list blog files');
      }

      const result = await response.json();
      if (result.success && result.files && result.files.length > 0) {
        // Delete each file
        const deletePromises = result.files.map(file => 
          fetch(`${SERVER_URL}/api/s3/delete/${file.Key}`, {
            method: 'DELETE'
          })
        );
        await Promise.all(deletePromises);
        console.log(`Deleted ${result.files.length} files from blogs/${blogId}/`);
      }
    } catch (error) {
      console.error('Error deleting blog folder from S3:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setUploading(true);
    setUploadProgress('Creating blog...');

    try {
      // Step 1: Create/Update the blog first
      const blogData = {
        title: formData.title,
        content: formData.content,
        excerpt: formData.excerpt,
        category: formData.category,
        tags: formData.tags,
        is_published: formData.published  // Backend expects is_published, not published
      };

      let savedBlog;
      if (editingBlog) {
        // Update existing blog via API
        const response = await fetch(`${BLOG_API_URL}${editingBlog.id}`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify(blogData)
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to update blog: ${errorText}`);
        }
        savedBlog = await response.json();
      } else {
        // Create new blog via API
        const response = await fetch(BLOG_API_URL, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(blogData)
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to create blog: ${errorText}`);
        }
        savedBlog = await response.json();
      }

      console.log('Blog saved:', savedBlog);

      // Step 2: Upload thumbnail image if provided
      if (formData.featuredImage && formData.featuredImage.startsWith('data:')) {
        setUploadProgress('Uploading thumbnail image...');
        try {
          const blob = await fetch(formData.featuredImage).then(r => r.blob());
          const file = new File([blob], 'thumbnail.jpg', { type: 'image/jpeg' });
          
          const formDataUpload = new FormData();
          formDataUpload.append('file', file);
          formDataUpload.append('is_thumbnail', 'true');
          
          const uploadResponse = await fetch(`/blog-api/api/v1/images/${savedBlog.id}/upload`, {
            method: 'POST',
            headers: {
              'Authorization': getAuthHeaders().Authorization
            },
            body: formDataUpload
          });
          
          if (uploadResponse.ok) {
            const uploadResult = await uploadResponse.json();
            console.log('Thumbnail uploaded:', uploadResult);
          } else {
            console.error('Failed to upload thumbnail:', await uploadResponse.text());
          }
        } catch (error) {
          console.error('Error uploading thumbnail:', error);
        }
      }

      // Step 3: Upload blog images if provided
      if (blogImages.length > 0) {
        setUploadProgress(`Uploading ${blogImages.length} blog images...`);
        for (let i = 0; i < blogImages.length; i++) {
          const img = blogImages[i];
          if (img.url.startsWith('data:')) {
            try {
              const blob = await fetch(img.url).then(r => r.blob());
              const file = new File([blob], img.name || `image-${i}.jpg`, { type: 'image/jpeg' });
              
              const formDataUpload = new FormData();
              formDataUpload.append('file', file);
              formDataUpload.append('is_thumbnail', 'false');
              
              const uploadResponse = await fetch(`/blog-api/api/v1/images/${savedBlog.id}/upload`, {
                method: 'POST',
                headers: {
                  'Authorization': getAuthHeaders().Authorization
                },
                body: formDataUpload
              });
              
              if (uploadResponse.ok) {
                const uploadResult = await uploadResponse.json();
                console.log(`Image ${i + 1} uploaded:`, uploadResult);
              } else {
                console.error(`Failed to upload image ${i + 1}:`, await uploadResponse.text());
              }
            } catch (error) {
              console.error(`Error uploading image ${i + 1}:`, error);
            }
          }
        }
      }

      // Reload blogs from API
      await loadBlogsFromAPI();

      // Reset form
      setFormData({
        title: '',
        content: '',
        excerpt: '',
        featuredImage: '',
        category: 'General',
        tags: '',
        author: 'WPC Telangana Admin',
        published: true,
        publishDate: new Date().toISOString().slice(0, 16),
        scheduledDate: '',
        location: 'Hyderabad, Telangana, India',
        startTime: '09:00',
        endTime: '18:00',
        eventDate: new Date().toISOString().slice(0, 10)
      });
      setBlogImages([]);
      setShowImageGallery(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      if (blogImagesInputRef.current) {
        blogImagesInputRef.current.value = '';
      }
      setEditingBlog(null);
      setShowEditor(false);
      setUploadProgress('');
      alert('Blog saved successfully!');
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('Error saving blog: ' + error.message);
    } finally {
      setUploading(false);
      setUploadProgress('');
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt,
      featuredImage: blog.featuredImage,
      category: blog.category,
      tags: blog.tags,
      author: blog.author || 'WPC Telangana Admin',
      published: blog.published,
      publishDate: blog.publishDate || new Date().toISOString().slice(0, 16),
      scheduledDate: blog.scheduledDate || '',
      location: blog.location || 'Hyderabad, Telangana, India',
      startTime: blog.startTime || '09:00',
      endTime: blog.endTime || '18:00',
      eventDate: blog.eventDate || new Date().toISOString().slice(0, 10)
    });
    setBlogImages(blog.blogImages || []);
    setShowImageGallery(false);
    setShowEditor(true);
  };

  const handleDelete = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog? This will also delete all associated images from S3.')) {
      setUploading(true);
      setUploadProgress('Deleting blog and images...');
      try {
        // Find the blog to get its folder name
        const blog = blogs.find(b => b.id === blogId);
        const folderToDelete = blog?.folderName || blogId;
        
        // Delete all images from S3
        await deleteBlogFolderFromS3(folderToDelete);
        
        // Delete from database via API
        const response = await fetch(`${BLOG_API_URL}/${blogId}`, {
          method: 'DELETE',
          headers: getAuthHeaders()
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete blog from server');
        }
        
        // Reload blogs from API
        await loadBlogsFromAPI();
        alert('Blog and all associated images deleted successfully!');
      } catch (error) {
        console.error('Error deleting blog:', error);
        alert('Error deleting blog: ' + error.message);
      } finally {
        setUploading(false);
        setUploadProgress('');
      }
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file
    if (!file.type.startsWith('image/')) {
      alert('Please select only image files.');
      return;
    }

    if (file.size > 20 * 1024 * 1024) { // 20MB limit
      alert('File size must be less than 20MB.');
      return;
    }

    setUploading(true);

    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          featuredImage: event.target.result
        }));
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
      setUploading(false);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      featuredImage: ''
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleBlogImagesUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    // Check total image limit
    if (blogImages.length + files.length > 100) {
      alert(`Maximum 100 images allowed per blog. Current: ${blogImages.length}, Trying to add: ${files.length}`);
      return;
    }

    setUploading(true);

    try {
      const newImages = await Promise.all(
        files.map((file, index) => {
          return new Promise((resolve, reject) => {
            // Validate file
            if (!file.type.startsWith('image/')) {
              reject(new Error(`${file.name} is not an image file`));
              return;
            }

            if (file.size > 20 * 1024 * 1024) { // 20MB limit
              reject(new Error(`${file.name} exceeds 20MB size limit`));
              return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
              resolve({
                id: Date.now() + index,
                name: file.name,
                url: event.target.result,
                size: file.size
              });
            };
            reader.onerror = () => reject(new Error(`Failed to read ${file.name}`));
            reader.readAsDataURL(file);
          });
        })
      );

      setBlogImages(prev => [...prev, ...newImages]);
    } catch (error) {
      alert(`Error uploading images: ${error.message}`);
    } finally {
      setUploading(false);
      if (blogImagesInputRef.current) {
        blogImagesInputRef.current.value = '';
      }
    }
  };

  const removeBlogImage = (imageId) => {
    setBlogImages(prev => prev.filter(img => img.id !== imageId));
  };

  const insertImageIntoContent = (imageUrl) => {
    const textarea = contentTextareaRef.current;
    if (!textarea) return;

    const cursorPosition = textarea.selectionStart;
    const textBefore = formData.content.substring(0, cursorPosition);
    const textAfter = formData.content.substring(cursorPosition);
    
    const imageMarkdown = `\n![Image](${imageUrl})\n`;
    const newContent = textBefore + imageMarkdown + textAfter;
    
    setFormData(prev => ({
      ...prev,
      content: newContent
    }));

    // Set cursor position after the inserted image
    setTimeout(() => {
      const newPosition = cursorPosition + imageMarkdown.length;
      textarea.setSelectionRange(newPosition, newPosition);
      textarea.focus();
    }, 10);
  };

  const categories = ['General', 'Competition', 'Training', 'News', 'Events', 'Athletes'];

  return (
    <div className="blog-manager">
      <div className="blog-manager-header">
        <h2>
          <i className="fa fa-file-text"></i>
          Blog Management
        </h2>
        <button 
          className="add-blog-btn"
          onClick={() => {
            setShowEditor(true);
            setEditingBlog(null);
            setFormData({
              title: '',
              content: '',
              excerpt: '',
              featuredImage: '',
              category: 'General',
              tags: '',
              author: 'WPC Telangana Admin',
              published: true,
              publishDate: new Date().toISOString().slice(0, 16),
              scheduledDate: '',
              location: 'Hyderabad, Telangana, India',
              startTime: '09:00',
              endTime: '18:00',
              eventDate: new Date().toISOString().slice(0, 10)
            });
            setBlogImages([]);
            setShowImageGallery(false);
            if (fileInputRef.current) {
              fileInputRef.current.value = '';
            }
            if (blogImagesInputRef.current) {
              blogImagesInputRef.current.value = '';
            }
          }}
        >
          <i className="fa fa-plus"></i>
          Add New Gallery
        </button>
      </div>

      {showEditor && (
        <div className="blog-editor">
          <div className="editor-header">
            <h3>{editingBlog ? 'Edit Gallery' : 'Create New Gallery'}</h3>
            <button 
              className="close-editor-btn"
              onClick={() => setShowEditor(false)}
            >
              <i className="fa fa-times"></i>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="blog-form">
            {uploading && (
              <div className="upload-progress-overlay">
                <div className="upload-progress-content">
                  <i className="fa fa-spinner fa-spin fa-3x"></i>
                  <p>{uploadProgress}</p>
                </div>
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="title">Blog Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter blog title"
                  required
                  disabled={uploading}
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  disabled={uploading}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="author">Author</label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  placeholder="Author name"
                  disabled={uploading}
                />
              </div>
              <div className="form-group">
                <label htmlFor="publishDate">Publish Date & Time</label>
                <input
                  type="datetime-local"
                  id="publishDate"
                  name="publishDate"
                  value={formData.publishDate}
                  onChange={handleInputChange}
                  disabled={uploading}
                />
              </div>
            </div>

            <div className="form-section-header">
              <i className="fa fa-map-marker"></i> Event Details (Location & Time)
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="location">Location *</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., Hyderabad, Telangana, India"
                  required
                  disabled={uploading}
                />
              </div>
              <div className="form-group">
                <label htmlFor="eventDate">Event Date *</label>
                <input
                  type="date"
                  id="eventDate"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleInputChange}
                  required
                  disabled={uploading}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="startTime">Start Time *</label>
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  required
                  disabled={uploading}
                />
              </div>
              <div className="form-group">
                <label htmlFor="endTime">End Time *</label>
                <input
                  type="time"
                  id="endTime"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  required
                  disabled={uploading}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="excerpt">Excerpt *</label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                placeholder="Brief description (shown in blog list)"
                rows="3"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="content">Content *</label>
              <div className="content-editor-container">
                <div className="content-toolbar">
                  <button 
                    type="button"
                    className="toolbar-btn"
                    onClick={() => setShowImageGallery(!showImageGallery)}
                  >
                    <i className="fa fa-image"></i>
                    Images ({blogImages.length}/100)
                  </button>
                  <small className="content-help">
                    Tip: You can insert images from the gallery below into your content
                  </small>
                </div>
                <textarea
                  ref={contentTextareaRef}
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Write your blog content here... You can insert images using the gallery below."
                  rows="12"
                  required
                />
              </div>
            </div>

            {/* Blog Images Gallery */}
            {showImageGallery && (
              <div className="blog-images-section">
                <div className="blog-images-header">
                  <h4>
                    <i className="fa fa-images"></i>
                    Blog Images ({blogImages.length}/100)
                  </h4>
                  <div className="blog-images-actions">
                    <input
                      ref={blogImagesInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleBlogImagesUpload}
                      style={{ display: 'none' }}
                    />
                    <button 
                      type="button"
                      className="upload-images-btn"
                      onClick={() => blogImagesInputRef.current?.click()}
                      disabled={blogImages.length >= 100}
                    >
                      <i className="fa fa-plus"></i>
                      Add Images
                    </button>
                  </div>
                </div>

                {blogImages.length === 0 ? (
                  <div className="no-blog-images">
                    <i className="fa fa-image fa-3x"></i>
                    <p>No images uploaded yet</p>
                    <small>Upload images to insert them into your blog content</small>
                  </div>
                ) : (
                  <div className="blog-images-grid">
                    {blogImages.map(image => (
                      <div key={image.id} className="blog-image-item">
                        <div className="blog-image-preview">
                          <img src={image.url} alt={image.name} />
                          <div className="blog-image-overlay">
                            <button
                              type="button"
                              className="insert-image-btn"
                              onClick={() => insertImageIntoContent(image.url)}
                              title="Insert into content"
                            >
                              <i className="fa fa-plus"></i>
                            </button>
                            <button
                              type="button"
                              className="delete-image-btn"
                              onClick={() => removeBlogImage(image.id)}
                              title="Delete image"
                            >
                              <i className="fa fa-trash"></i>
                            </button>
                          </div>
                        </div>
                        <div className="blog-image-info">
                          <span className="image-name" title={image.name}>
                            {image.name.length > 20 ? image.name.substring(0, 20) + '...' : image.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="featuredImage">Featured Image</label>
                <div className="image-upload-container">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                  
                  {!formData.featuredImage ? (
                    <div 
                      className="image-upload-placeholder"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {uploading ? (
                        <div className="uploading-indicator">
                          <i className="fa fa-spinner fa-spin"></i>
                          <span>Uploading...</span>
                        </div>
                      ) : (
                        <div className="upload-prompt">
                          <i className="fa fa-cloud-upload fa-2x"></i>
                          <p>Click to upload image</p>
                          <small>Max 20MB, JPG/PNG/GIF</small>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="image-preview-container">
                      <img src={formData.featuredImage} alt="Preview" className="image-preview" />
                      <div className="image-actions">
                        <button 
                          type="button"
                          className="change-image-btn"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <i className="fa fa-edit"></i>
                          Change
                        </button>
                        <button 
                          type="button"
                          className="remove-image-btn"
                          onClick={removeImage}
                        >
                          <i className="fa fa-trash"></i>
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="tags">Tags</label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="powerlifting, competition, training (comma separated)"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="published"
                  checked={formData.published}
                  onChange={handleInputChange}
                />
                <span className="checkmark"></span>
                Publish immediately
              </label>
            </div>

            <div className="form-actions">
              <button type="submit" className="save-btn">
                <i className="fa fa-save"></i>
                {editingBlog ? 'Update Gallery' : 'Create Gallery'}
              </button>
              <button 
                type="button" 
                className="cancel-btn"
                onClick={() => setShowEditor(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="blog-list">
        <h3>Existing Gallery Posts ({blogs.length})</h3>
        
        {blogs.length === 0 ? (
          <div className="no-blogs">
            <i className="fa fa-file-text-o"></i>
            <p>No gallery posts created yet. Click "Add New Gallery" to get started!</p>
          </div>
        ) : (
          <div className="blog-grid">
            {blogs.map(blog => (
              <div key={blog.id} className="blog-card">
                {blog.featuredImage && (
                  <div className="blog-card-image">
                    <img src={imageUrls[`featured_${blog.id}`] || blog.featuredImage} alt={blog.title} />
                  </div>
                )}
                <div className="blog-card-content">
                  <div className="blog-meta">
                    <span className="category">{blog.category}</span>
                    <span className={`status ${blog.published ? 'published' : 'draft'}`}>
                      {blog.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <h4>{blog.title}</h4>
                  <p>{blog.excerpt || blog.content.substring(0, 100) + '...'}</p>
                  <div className="blog-actions">
                    <button 
                      className="edit-btn"
                      onClick={() => handleEdit(blog)}
                    >
                      <i className="fa fa-edit"></i>
                      Edit
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDelete(blog.id)}
                    >
                      <i className="fa fa-trash"></i>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogManager;