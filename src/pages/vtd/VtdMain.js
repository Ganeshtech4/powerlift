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
  if (item.excerpt) {
    return item.excerpt;
  }

  if (!item.content) {
    return 'No description available for this VTD resource yet.';
  }

  return item.content.length > 120 ? `${item.content.substring(0, 120)}...` : item.content;
};

export default function VtdMain() {
  const [items, setItems] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const resolveItemImage = (item) => item.thumbnail_url || (Array.isArray(item.images) ? item.images.find(Boolean) : '') || '';

  useEffect(() => {
    const loadItems = async () => {
      try {
        setLoading(true);
        const API_URL = process.env.REACT_APP_API_URL || '/api/v1';
        const response = await fetch(`${API_URL}/vtd-books/?published_only=true`);
        if (response.ok) {
          const itemsData = await response.json();
          setItems(Array.isArray(itemsData) ? itemsData : []);
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
                         (item.content && item.content.toLowerCase().includes(searchTerm.toLowerCase()));
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
                <p>Educational materials, training resources, and reference content from the WPC Telangana federation.</p>
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
                <p>Explore the latest VTD resources in a cleaner archive layout with search and category browsing kept within reach.</p>
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
                          <div className="image-overlay">
                            <Link to={`/vtd-details/${item.id}`} className="overlay-link">
                              <i className="fas fa-expand"></i>
                            </Link>
                          </div>
                          {item.images && item.images.length > 0 && (
                            <div className="image-count-badge">
                              <i className="fas fa-images"></i>
                              <span>{item.images.length} {item.images.length === 1 ? 'photo' : 'photos'}</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="card-image card-image--empty">
                          <i className="fas fa-images"></i>
                        </div>
                      )}

                      <div className="card-content">
                        <div className="card-meta">
                          {item.category && (
                            <span className="category-badge">{formatCategory(item.category)}</span>
                          )}
                          <span className="date-badge">
                            <i className="far fa-calendar"></i>
                            {new Date(item.created_at).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>

                        <h3 className="card-title">
                          <Link to={`/vtd-details/${item.id}`}>
                            {item.title}
                          </Link>
                        </h3>

                        <p className="card-excerpt">
                          {getVtdExcerpt(item)}
                        </p>

                        <div className="card-footer">
                          <Link to={`/vtd-details/${item.id}`} className="read-more-btn">
                            View Resource
                            <i className="fas fa-arrow-right"></i>
                          </Link>
                          {item.author && (
                            <div className="author-info">
                              <i className="fas fa-user-circle"></i>
                              <span>{item.author}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <i className="fas fa-search"></i>
                <h3>{items.length === 0 ? 'No VTD resources published' : 'No resources found'}</h3>
                <p>{items.length === 0 ? 'Publish VTD resources from the admin panel to show them here.' : 'Try adjusting your search or filter criteria.'}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
