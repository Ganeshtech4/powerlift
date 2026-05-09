import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../../config/axiosConfig';
import './InkspireManager.css';

const VtdManager = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/vtd-books/');
      setBooks(res.data || []);
    } catch (err) {
      console.error('Error fetching VTD books:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    navigate('/admin/vtd-books/new');
  };

  const handleEdit = (book) => {
    navigate(`/admin/vtd-books/edit/${book.id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this VTD book?')) return;
    try {
      await axiosInstance.delete(`/vtd-books/${id}`);
      fetchBooks();
    } catch (err) {
      alert('Failed to delete VTD book');
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
          <h2><i className="fas fa-book"></i> VTD Books</h2>
          <p className="subtitle">Manage VTD educational books, resources, PDFs, and cover art for the public VTD page.</p>
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
            placeholder="Search by title, subtitle, or description..."
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
                  <div className="logo-placeholder"><i className="fas fa-book"></i></div>
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
              <i className="fas fa-book"></i>
              <p>No VTD books found.</p>
              <button className="btn-primary" onClick={handleAdd}>Add First Book</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VtdManager;