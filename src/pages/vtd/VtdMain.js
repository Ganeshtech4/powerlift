"use client";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../gallery/Gallery.css';

const formatCategory = (category) => {
  if (!category) {
    return 'Uncategorized';
  }

  return category
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
};

const getVtdExcerpt = (item) => {
  if (item.quote) {
    return item.quote;
  }

  if (item.subtitle) {
    return item.subtitle;
  }

  return 'No description available for this resource.';
};

export default function VtdMain() {
  const [items, setItems] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const resolveItemImage = (item) => item.cover_image_url || (Array.isArray(item.images) ? item.images.find(Boolean) : '') || '';

  useEffect(() => {
    const loadItems = async () => {
      try {
        setLoading(true);
        const API_URL = process.env.REACT_APP_API_URL || '/api/v1';
        const response = await fetch(`${API_URL}/vtd-books/`);
        if (response.ok) {
          const itemsData = await response.json();
          const activeItems = Array.isArray(itemsData) ? itemsData.filter(item => item.is_active) : [];
          setItems(activeItems);
          setError('');
        } else {
          console.error('Failed to fetch VTD items:', response.status);
          setItems([]);
          setError('Unable to load VTD resources right now.');
        }
      } catch (error) {
        console.error('Error loading VTD items:', error);
        setItems([]);
        setError('Unable to load VTD resources right now.');
      } finally {
        setLoading(false);
      }
    };
    
    loadItems();
  }, []);

  // Get unique categories
  const categories = ['all', ...new Set(items.map(item => item.category).filter(Boolean))];

  // Filter items
  const filteredItems = items.filter(item => {
    const matchesCategory = activeFilter === 'all' || item.category === activeFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.subtitle && item.subtitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (item.quote && item.quote.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="gallery-section">
      <div className="container">
        <div className="gallery-layout">
          <aside className="gallery-sidebar">
            <div className="gallery-sidebar-card">
              <div className="gallery-sidebar-copy">
                <span className="gallery-kicker">Discover</span>
                <h2 className="gallery-title">VTD Resources</h2>
                <p>Educational materials, training PDFs, and reference resources from the WPC Telangana federation.</p>
              </div>

              <div className="search-box">
                <i className="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="gallery-filter-stack">
                {categories.map((category) => {
                  const count = category === 'all'
                    ? items.length
                    : items.filter((item) => item.category === category).length;

                  return (
                    <button
                      key={category}
                      className={`gallery-filter-btn ${activeFilter === category ? 'active' : ''}`}
                      onClick={() => setActiveFilter(category)}
                    >
                      <span className="gallery-filter-label">{category === 'all' ? 'All Resources' : formatCategory(category)}</span>
                      <span className="gallery-filter-count">{count}</span>
                    </button>
                  );
                })}
              </div>

              <div className="gallery-sidebar-stats">
                <div>
                  <span>Published resources</span>
                  <strong>{items.length}</strong>
                </div>
                <div>
                  <span>Visible now</span>
                  <strong>{filteredItems.length}</strong>
                </div>
              </div>
            </div>
          </aside>

          <div className="gallery-content">
            <div className="gallery-header">
              <div className="gallery-overview">
                <span className="gallery-overview-kicker">Archive View</span>
                <h3>Educational resources and training materials</h3>
                <p>Explore the latest VTD resources with search and category browsing.</p>
              </div>

              <div className="gallery-summary-cards">
                <div className="gallery-summary-card">
                  <span>Showing</span>
                  <strong>{filteredItems.length}</strong>
                  <small>{activeFilter === 'all' ? 'all categories' : formatCategory(activeFilter)}</small>
                </div>
                <div className="gallery-summary-card">
                  <span>Total images</span>
                  <strong>{filteredItems.reduce((sum, item) => sum + (Array.isArray(item.images) ? item.images.length : 0), 0)}</strong>
                  <small>inside visible items</small>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="no-results">
                <i className="fas fa-spinner fa-spin"></i>
                <h3>Loading VTD resources</h3>
                <p>Please wait while the latest resources are fetched.</p>
              </div>
            ) : error ? (
              <div className="no-results">
                <i className="fas fa-circle-exclamation"></i>
                <h3>VTD unavailable</h3>
                <p>{error}</p>
              </div>
            ) : filteredItems.length > 0 ? (
              <div className="gallery-grid">
                {filteredItems.map((item, index) => (
                  <div key={item.id} className="gallery-card" data-aos="fade-up" data-aos-delay={index * 50}>
                    <div className="card-inner">
                      {resolveItemImage(item) ? (
                        <div className="card-image">
                          <img src={resolveItemImage(item)} alt={item.title} />
                          {item.pdf_url && (
                            <div className="image-overlay">
                              <a href={item.pdf_url} target="_blank" rel="noopener noreferrer" className="overlay-link">
                                <i className="fas fa-file-pdf"></i>
                              </a>
                            </div>
                          )}
                          {item.images && item.images.length > 0 && (
                            <div className="image-count-badge">
                              <i className="fas fa-images"></i>
                              <span>{item.images.length} {item.images.length === 1 ? 'photo' : 'photos'}</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="card-image card-image--empty">
                          <i className="fas fa-file-pdf"></i>
                        </div>
                      )}

                      <div className="card-content">
                        <div className="card-meta">
                          {item.category && (
                            <span className="category-badge">{formatCategory(item.category)}</span>
                          )}
                        </div>

                        <h3 className="card-title">{item.title}</h3>

                        {item.subtitle && (
                          <p className="card-subtitle">{item.subtitle}</p>
                        )}

                        <p className="card-excerpt">{getVtdExcerpt(item)}</p>

                        {item.pdf_url && (
                          <a href={item.pdf_url} target="_blank" rel="noopener noreferrer" className="card-link">
                            <i className="fas fa-file-pdf"></i> Read PDF
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <i className="fas fa-search"></i>
                <h3>No resources found</h3>
                <p>Try adjusting your search or filter to find what you're looking for.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
