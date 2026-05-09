import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '../../../config/axiosConfig';
import { uploadToS3 } from '../../../utils/s3Upload';
import './InkspireManager.css';

const emptyForm = {
  title: '',
  subtitle: '',
  quote: '',
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
