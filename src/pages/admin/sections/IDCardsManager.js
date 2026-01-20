import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../../config/axiosConfig';
import { uploadToS3 } from '../../../utils/s3Upload';
import './IDCardsManager.css';

const IDCardsManager = () => {
  const [idCards, setIdCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    fetchIDCards();
  }, []);

  const fetchIDCards = async () => {
    try {
      setLoading(true);
      // Fetch the ID cards result entry (type: 'id_card')
      const response = await axiosInstance.get('/results');
      const idCardEntry = response.data.find(r => r.type === 'id_card');
      
      if (idCardEntry && idCardEntry.images) {
        setIdCards(idCardEntry.images);
      } else {
        setIdCards([]);
      }
    } catch (error) {
      console.error('Error fetching ID cards:', error);
      alert('Failed to load ID cards');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    await uploadIDCards(files);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length === 0) return;

    await uploadIDCards(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const uploadIDCards = async (files) => {
    try {
      setUploading(true);
      setUploadProgress(0);

      // Upload images to S3
      const uploadedUrls = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const s3Url = await uploadToS3(file, 'id-cards');
        uploadedUrls.push(s3Url);
        setUploadProgress(Math.round(((i + 1) / files.length) * 100));
      }

      // Get existing ID card entry or create new one
      const response = await axiosInstance.get('/results');
      let idCardEntry = response.data.find(r => r.type === 'id_card');

      if (idCardEntry) {
        // Update existing entry - add new images
        const updatedImages = [...(idCardEntry.images || []), ...uploadedUrls];
        await axiosInstance.put(`/results/${idCardEntry.id}`, {
          ...idCardEntry,
          images: updatedImages
        });
      } else {
        // Create new entry
        await axiosInstance.post('/results', {
          title: 'ID Cards',
          description: 'Official ID Cards',
          content: 'Collection of all official ID cards',
          category: 'district',
          type: 'id_card',
          images: uploadedUrls,
          thumbnail: uploadedUrls[0] || null,
          is_published: true
        });
      }

      alert(`Successfully uploaded ${files.length} ID card(s)`);
      fetchIDCards();
    } catch (error) {
      console.error('Error uploading ID cards:', error);
      alert('Failed to upload ID cards');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDeleteIDCard = async (imageUrl) => {
    if (!window.confirm('Are you sure you want to delete this ID card?')) {
      return;
    }

    try {
      // Get the ID card entry
      const response = await axiosInstance.get('/results');
      const idCardEntry = response.data.find(r => r.type === 'id_card');

      if (!idCardEntry) {
        alert('ID card entry not found');
        return;
      }

      // Remove the image from the array
      const updatedImages = idCardEntry.images.filter(img => img !== imageUrl);

      // Update the entry
      await axiosInstance.put(`/results/${idCardEntry.id}`, {
        ...idCardEntry,
        images: updatedImages,
        thumbnail: updatedImages.length > 0 ? updatedImages[0] : null
      });

      alert('ID card deleted successfully');
      fetchIDCards();
    } catch (error) {
      console.error('Error deleting ID card:', error);
      alert('Failed to delete ID card');
    }
  };

  return (
    <div className="idcards-manager">
      <div className="manager-header">
        <div>
          <h2>
            <i className="fas fa-id-card"></i>
            ID Cards Management
          </h2>
          <p className="subtitle">Manage all official ID cards in one place</p>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-id-card"></i>
          </div>
          <div className="stat-content">
            <h3>{idCards.length}</h3>
            <p>Total ID Cards</p>
          </div>
        </div>
      </div>

      {/* Upload Area */}
      <div 
        className="upload-section"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="upload-area">
          <i className="fas fa-cloud-upload-alt"></i>
          <h3>Upload ID Cards</h3>
          <p>Drag and drop ID card images here, or click to browse</p>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            id="idcard-upload"
            style={{ display: 'none' }}
          />
          <label htmlFor="idcard-upload" className="btn-upload">
            <i className="fas fa-plus"></i> Select Files
          </label>
        </div>

        {uploading && (
          <div className="upload-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p>Uploading... {uploadProgress}%</p>
          </div>
        )}
      </div>

      {/* ID Cards Grid */}
      {loading ? (
        <div className="loading-state">
          <i className="fas fa-spinner fa-spin fa-3x"></i>
          <p>Loading ID cards...</p>
        </div>
      ) : idCards.length === 0 ? (
        <div className="empty-state">
          <i className="fas fa-id-card fa-4x"></i>
          <h3>No ID Cards Yet</h3>
          <p>Upload your first ID card to get started</p>
        </div>
      ) : (
        <div className="idcards-grid">
          {idCards.map((imageUrl, index) => (
            <div key={index} className="idcard-item">
              <div className="idcard-image">
                <img src={imageUrl} alt={`ID Card ${index + 1}`} />
                <div className="idcard-overlay">
                  <button
                    className="btn-delete-card"
                    onClick={() => handleDeleteIDCard(imageUrl)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                  <a 
                    href={imageUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-view-card"
                  >
                    <i className="fas fa-eye"></i>
                  </a>
                </div>
              </div>
              <div className="idcard-number">ID Card #{index + 1}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IDCardsManager;
