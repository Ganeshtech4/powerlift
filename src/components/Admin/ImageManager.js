import React, { useState, useEffect, useRef } from 'react';
import './ImageManager.css';

const ImageManager = () => {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const dropAreaRef = useRef(null);

  const MAX_IMAGES = 100;
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

  useEffect(() => {
    // Load images from localStorage
    const savedImages = localStorage.getItem('wpc_uploaded_images');
    if (savedImages) {
      setImages(JSON.parse(savedImages));
    }
  }, []);

  useEffect(() => {
    // Save images to localStorage whenever images change
    localStorage.setItem('wpc_uploaded_images', JSON.stringify(images));
  }, [images]);

  const validateFile = (file) => {
    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Please select only image files.');
      return false;
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      alert(`File size must be less than 5MB. Current size: ${(file.size / 1024 / 1024).toFixed(2)}MB`);
      return false;
    }

    // Check total image count
    if (images.length >= MAX_IMAGES) {
      alert(`Maximum ${MAX_IMAGES} images allowed. Please delete some images first.`);
      return false;
    }

    return true;
  };

  const handleFileUpload = async (files) => {
    const fileArray = Array.from(files);
    
    // Validate each file
    const validFiles = fileArray.filter(validateFile);
    
    if (validFiles.length === 0) return;

    setUploading(true);

    try {
      const newImages = await Promise.all(
        validFiles.map(file => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
              resolve({
                id: Date.now() + Math.random(),
                name: file.name,
                size: file.size,
                type: file.type,
                url: e.target.result,
                uploadDate: new Date().toISOString()
              });
            };
            reader.readAsDataURL(file);
          });
        })
      );

      setImages(prev => [...prev, ...newImages]);
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Error uploading images. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (e) => {
    handleFileUpload(e.target.files);
    e.target.value = ''; // Reset input
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDeleteImage = (imageId) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      setImages(prev => prev.filter(img => img.id !== imageId));
    }
  };

  const copyImageUrl = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      alert('Image URL copied to clipboard!');
    }).catch(() => {
      alert('Failed to copy URL. Please copy it manually.');
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="image-manager">
      <div className="image-manager-header">
        <h2>
          <i className="fa fa-image"></i>
          Image Gallery
        </h2>
        <div className="image-stats">
          <span>{images.length} / {MAX_IMAGES} images</span>
        </div>
      </div>

      <div className="upload-section">
        <div 
          ref={dropAreaRef}
          className={`drop-area ${dragActive ? 'active' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
          
          {uploading ? (
            <div className="uploading">
              <i className="fa fa-spinner fa-spin fa-2x"></i>
              <p>Uploading images...</p>
            </div>
          ) : (
            <div className="drop-content">
              <i className="fa fa-cloud-upload fa-3x"></i>
              <h3>Drop images here or click to browse</h3>
              <p>Maximum 5MB per image • {MAX_IMAGES - images.length} slots remaining</p>
              <button className="browse-btn">
                <i className="fa fa-folder-open"></i>
                Browse Files
              </button>
            </div>
          )}
        </div>
      </div>

      {images.length > 0 && (
        <div className="image-gallery">
          <h3>Uploaded Images ({images.length})</h3>
          
          <div className="image-grid">
            {images.map(image => (
              <div key={image.id} className="image-card">
                <div className="image-preview">
                  <img src={image.url} alt={image.name} />
                  <div className="image-overlay">
                    <button 
                      className="copy-url-btn"
                      onClick={() => copyImageUrl(image.url)}
                      title="Copy URL"
                    >
                      <i className="fa fa-copy"></i>
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeleteImage(image.id)}
                      title="Delete Image"
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </div>
                </div>
                
                <div className="image-info">
                  <h4 title={image.name}>{image.name}</h4>
                  <div className="image-meta">
                    <span className="file-size">{formatFileSize(image.size)}</span>
                    <span className="upload-date">
                      {new Date(image.uploadDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {images.length === 0 && !uploading && (
        <div className="no-images">
          <i className="fa fa-image fa-3x"></i>
          <h3>No images uploaded yet</h3>
          <p>Upload images to use as featured images in your blogs</p>
        </div>
      )}
    </div>
  );
};

export default ImageManager;