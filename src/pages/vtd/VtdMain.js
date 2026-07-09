import React from "react";
import { Link } from "react-router-dom";
import { fetchVtdBooks } from "../../utils/vtdApi";
import '../gallery/Gallery.css';

const fallbackCardImage = (title) =>
  `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23667eea"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="20"%3E${encodeURIComponent(title)}%3C/text%3E%3C/svg%3E`;

const formatCategory = (category) => {
  if (!category) return 'Uncategorized';
  return category
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
};

const VtdMain = () => {
  const [books, setBooks] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState("all");
  const [searchTerm, setSearchTerm] = React.useState("");

  React.useEffect(() => {
    let isMounted = true;

    const loadBooks = async () => {
      try {
        setLoading(true);
        const items = await fetchVtdBooks();

        if (isMounted) {
          setBooks(items.filter((book) => book.isActive));
          setError("");
        }
      } catch (loadError) {
        if (isMounted) {
          setError("VTD books are not available right now.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadBooks();

    return () => {
      isMounted = false;
    };
  }, []);

  // Get unique categories dynamically from data
  const categories = ['all', ...new Set(books.map(book => book.category).filter(Boolean))];

  // Filter books
  const filteredBooks = books.filter(book => {
    const matchesCategory = activeCategory === 'all' || book.category === activeCategory;
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (book.subtitle && book.subtitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (book.quote && book.quote.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="gallery-section">
      <div className="container">
        <div className="gallery-layout">
          <aside className="gallery-sidebar">
            <div className="gallery-sidebar-card">
              <div className="gallery-sidebar-copy">
                <span className="gallery-kicker">Resources</span>
                <h2 className="gallery-title">VTD Books</h2>
                <p>Educational books, training PDFs, and reference materials from the WPC Telangana community.</p>
              </div>

              <div className="search-box">
                <i className="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Search books..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: '#64748b',
                      cursor: 'pointer',
                      fontSize: '1.2rem',
                      padding: '4px'
                    }}
                  >
                    ×
                  </button>
                )}
              </div>

              <div className="gallery-filter-stack">
                {categories.map((category) => {
                  const count = category === 'all' 
                    ? books.length 
                    : books.filter(b => b.category === category).length;
                  
                  return (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`gallery-filter-btn ${activeCategory === category ? 'active' : ''}`}
                    >
                      <span className="filter-label">{formatCategory(category)}</span>
                      <span className="filter-count">{count}</span>
                    </button>
                  );
                })}
              </div>

              <div className="gallery-stats">
                <div className="stat-item">
                  <i className="fas fa-book"></i>
                  <div>
                    <strong>{books.length}</strong>
                    <span>Total Books</span>
                  </div>
                </div>
                <div className="stat-item">
                  <i className="fas fa-eye"></i>
                  <div>
                    <strong>{filteredBooks.length}</strong>
                    <span>Showing</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <main className="gallery-content">{loading ? (
          <div className="loading-state">
            <i className="fas fa-spinner fa-spin"></i> Loading VTD books...
          </div>
        ) : error ? (
          <div className="empty-state">
            <p>{error}</p>
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-book-open" style={{ fontSize: "48px", color: "#cbd5e0", marginBottom: "16px" }}></i>
            <p>No VTD books match your search.</p>
          </div>
        ) : (
          <div className="row">
            {filteredBooks.map((book, index) => (
              <div key={book.id} className="col-xl-4 col-lg-4 col-md-6 mb-4">
                <div className="blog-one__single" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div className="blog-one__image">
                    <img
                      src={book.coverImageUrl || (Array.isArray(book.images) && book.images.length > 0 ? book.images[0] : fallbackCardImage(book.title))}
                      alt={book.title}
                      onError={(event) => { event.target.src = fallbackCardImage(book.title); }}
                      style={{ width: '100%', height: '250px', objectFit: 'cover' }}
                    />
                    {book.category && (
                      <div style={{
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: '#fff',
                        padding: '6px 14px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        letterSpacing: '0.5px',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
                      }}>
                        {formatCategory(book.category)}
                      </div>
                    )}
                  </div>
                  <div className="blog-one__content" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 className="blog-one__title">
                      {book.title}
                    </h3>
                    {book.subtitle && (
                      <p style={{ 
                        fontSize: '0.9rem', 
                        color: '#667eea', 
                        fontWeight: '600', 
                        marginBottom: '10px' 
                      }}>
                        {book.subtitle}
                      </p>
                    )}
                    <p className="blog-one__text" style={{ fontSize: '14px', color: '#64748b', flex: 1 }}>
                      {book.quote || "Open the book PDF to read more."}
                    </p>
                    {book.pdfUrl && (
                      <a
                        href={book.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="thm-btn"
                        style={{
                          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          marginTop: '15px',
                          padding: '12px 24px',
                          fontSize: '14px',
                          fontWeight: '600',
                          border: 'none'
                        }}
                      >
                        <i className="fas fa-file-pdf"></i>
                        <span>Read PDF</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
          </main>
        </div>
      </div>
    </section>
  );
};

export default VtdMain;
