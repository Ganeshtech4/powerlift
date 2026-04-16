import React, { useEffect, useState } from 'react';
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

const InkspireManager = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/inkspire-books/');
      setBooks(res.data || []);
    } catch (err) {
      console.error('Error fetching Inkspire books:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingBook(null);
    setFormData(emptyForm);
    setShowModal(true);
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setFormData({
      title: book.title || '',
      subtitle: book.subtitle || '',
      quote: book.quote || '',
      pdf_url: book.pdf_url || '',
      cover_image_url: book.cover_image_url || '',
      order: book.order ?? 0,
      is_active: book.is_active ?? true,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this Inkspire book?')) return;
    try {
      await axiosInstance.delete(`/inkspire-books/${id}`);
      fetchBooks();
    } catch (err) {
      alert('Failed to delete Inkspire book');
    }
  };

  const handleCoverUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploadingCover(true);
      const response = await uploadToS3(file, 'images/Inspire');
      setFormData((current) => ({ ...current, cover_image_url: response.url }));
    } catch (err) {
      alert('Failed to upload cover image');
    } finally {
      setUploadingCover(false);
    }
  };

  const handlePdfUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploadingPdf(true);
      const response = await uploadToS3(file, 'pdfs');
      setFormData((current) => ({ ...current, pdf_url: response.url }));
    } catch (err) {
      alert('Failed to upload PDF');
    } finally {
      setUploadingPdf(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setSaving(true);
      const payload = {
        ...formData,
        order: Number(formData.order || 0),
      };

      if (editingBook) {
        await axiosInstance.put(`/inkspire-books/${editingBook.id}`, payload);
      } else {
        await axiosInstance.post('/inkspire-books/', payload);
      }

      setShowModal(false);
      fetchBooks();
    } catch (err) {
      console.error('Error saving Inkspire book:', err);
      alert('Failed to save Inkspire book');
    } finally {
      setSaving(false);
    }
  };

  const filtered = books.filter((book) =>
    (book.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (book.subtitle || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (book.quote || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="inkspire-manager">
      <div className="manager-header">
        <div>
          <h2><i className="fas fa-book-open"></i> Inkspire Books</h2>
          <p className="subtitle">Manage inspirational story books, PDFs, and cover art for the public Inkspire page.</p>
        </div>
        <button className="btn-primary" onClick={handleAdd}>
          <i className="fas fa-plus"></i> Add Book
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-icon"><i className="fas fa-book"></i></div>
          <div className="stat-content"><h3>{books.length}</h3><p>Total Books</p></div>
        </div>
        <div className="stat-card assigned">
          <div className="stat-icon"><i className="fas fa-eye"></i></div>
          <div className="stat-content"><h3>{books.filter((book) => book.is_active).length}</h3><p>Visible</p></div>
        </div>
        <div className="stat-card available">
          <div className="stat-icon"><i className="fas fa-file-pdf"></i></div>
          <div className="stat-content"><h3>{books.filter((book) => book.pdf_url).length}</h3><p>PDF Ready</p></div>
        </div>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search by title, subtitle, or quote..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="loading-state"><i className="fas fa-spinner fa-spin"></i> Loading...</div>
      ) : (
        <div className="books-grid">
          {filtered.map((book) => (
            <div key={book.id} className={`book-card ${!book.is_active ? 'inactive' : ''}`}>
              <div className="book-cover">
                {book.cover_image_url ? (
                  <img src={book.cover_image_url} alt={book.title} />
                ) : (
                  <div className="logo-placeholder"><i className="fas fa-book-open"></i></div>
                )}
                <span className={`status-badge ${book.is_active ? 'active' : 'inactive'}`}>
                  {book.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="book-info">
                <h3>{book.title}</h3>
                {book.subtitle && <p><i className="fas fa-tag"></i> {book.subtitle}</p>}
                {book.pdf_url && <p><i className="fas fa-file-pdf"></i> PDF linked</p>}
                {book.quote && <p className="book-desc">{book.quote}</p>}
              </div>
              <div className="book-actions">
                <button className="btn-edit" onClick={() => handleEdit(book)}>
                  <i className="fas fa-edit"></i> Edit
                </button>
                <button className="btn-delete" onClick={() => handleDelete(book.id)}>
                  <i className="fas fa-trash"></i> Delete
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="empty-state">
              <i className="fas fa-book-open"></i>
              <p>No Inkspire books found.</p>
              <button className="btn-primary" onClick={handleAdd}>Add First Book</button>
            </div>
          )}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(event) => event.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingBook ? 'Edit Inkspire Book' : 'Add Inkspire Book'}</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Title *</label>
                  <input type="text" required value={formData.title} onChange={(event) => setFormData((current) => ({ ...current, title: event.target.value }))} />
                </div>
                <div className="form-group">
                  <label>Subtitle</label>
                  <input type="text" value={formData.subtitle} onChange={(event) => setFormData((current) => ({ ...current, subtitle: event.target.value }))} />
                </div>
              </div>

              <div className="form-group">
                <label>Quote</label>
                <textarea rows="4" value={formData.quote} onChange={(event) => setFormData((current) => ({ ...current, quote: event.target.value }))} />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Display Order</label>
                  <input type="number" min="0" value={formData.order} onChange={(event) => setFormData((current) => ({ ...current, order: parseInt(event.target.value, 10) || 0 }))} />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select value={formData.is_active} onChange={(event) => setFormData((current) => ({ ...current, is_active: event.target.value === 'true' }))}>
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>PDF URL</label>
                <input type="url" value={formData.pdf_url} onChange={(event) => setFormData((current) => ({ ...current, pdf_url: event.target.value }))} placeholder="https://..." />
                <input type="file" accept="application/pdf" onChange={handlePdfUpload} disabled={uploadingPdf} />
                {uploadingPdf && <span className="upload-status"><i className="fas fa-spinner fa-spin"></i> Uploading PDF...</span>}
              </div>

              <div className="form-group">
                <label>Cover Image URL</label>
                <input type="url" value={formData.cover_image_url} onChange={(event) => setFormData((current) => ({ ...current, cover_image_url: event.target.value }))} placeholder="https://..." />
                {formData.cover_image_url && (
                  <div className="photo-preview">
                    <img src={formData.cover_image_url} alt="cover preview" />
                  </div>
                )}
                <input type="file" accept="image/*" onChange={handleCoverUpload} disabled={uploadingCover} />
                {uploadingCover && <span className="upload-status"><i className="fas fa-spinner fa-spin"></i> Uploading cover...</span>}
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={saving || uploadingCover || uploadingPdf}>
                  {saving ? <><i className="fas fa-spinner fa-spin"></i> Saving...</> : (editingBook ? 'Update Book' : 'Add Book')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InkspireManager;