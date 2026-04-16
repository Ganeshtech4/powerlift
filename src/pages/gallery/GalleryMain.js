"use client";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Gallery.css';

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

const getBlogExcerpt = (blog) => {
  if (blog.excerpt) {
    return blog.excerpt;
  }

  if (!blog.content) {
    return 'No description available for this gallery post yet.';
  }

  return blog.content.length > 120 ? `${blog.content.substring(0, 120)}...` : blog.content;
};

export default function HomePage() {
  const [blogs, setBlogs] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const resolveBlogImage = (blog) => blog.thumbnail_url || (Array.isArray(blog.images) ? blog.images.find(Boolean) : '') || '';

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setLoading(true);
        const API_URL = process.env.REACT_APP_API_URL || '/api/v1';
        const response = await fetch(`${API_URL}/blogs/?published_only=true`);
        if (response.ok) {
          const blogsData = await response.json();
          setBlogs(Array.isArray(blogsData) ? blogsData : []);
          setError('');
        } else {
          console.error('Failed to fetch blogs:', response.status);
          setBlogs([]);
          setError('Unable to load gallery posts right now.');
        }
      } catch (error) {
        console.error('Error loading blogs:', error);
        setBlogs([]);
        setError('Unable to load gallery posts right now.');
      } finally {
        setLoading(false);
      }
    };
    
    loadBlogs();
  }, []);

  // Get unique categories
  const categories = ['all', ...new Set(blogs.map(blog => blog.category).filter(Boolean))];

  // Filter blogs
  const filteredBlogs = blogs.filter(blog => {
    const matchesCategory = activeFilter === 'all' || blog.category === activeFilter;
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (blog.content && blog.content.toLowerCase().includes(searchTerm.toLowerCase()));
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
                <h2 className="gallery-title">Powerlifting Gallery</h2>
                <p>Find meet photography, national moments, and published visual reports from the federation archive.</p>
              </div>

              <div className="search-box">
                <i className="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="gallery-filter-stack">
                {categories.map((category) => {
                  const count = category === 'all'
                    ? blogs.length
                    : blogs.filter((blog) => blog.category === category).length;

                  return (
                    <button
                      key={category}
                      className={`gallery-filter-btn ${activeFilter === category ? 'active' : ''}`}
                      onClick={() => setActiveFilter(category)}
                    >
                      <span className="gallery-filter-label">{category === 'all' ? 'All Posts' : formatCategory(category)}</span>
                      <span className="gallery-filter-count">{count}</span>
                    </button>
                  );
                })}
              </div>

              <div className="gallery-sidebar-stats">
                <div>
                  <span>Published posts</span>
                  <strong>{blogs.length}</strong>
                </div>
                <div>
                  <span>Visible now</span>
                  <strong>{filteredBlogs.length}</strong>
                </div>
              </div>
            </div>
          </aside>

          <div className="gallery-content">
            <div className="gallery-header">
              <div className="gallery-overview">
                <span className="gallery-overview-kicker">Archive View</span>
                <h3>Published photo stories and event albums</h3>
                <p>Explore the latest gallery posts in a cleaner archive layout with search and category browsing kept within reach.</p>
              </div>

              <div className="gallery-summary-cards">
                <div className="gallery-summary-card">
                  <span>Showing</span>
                  <strong>{filteredBlogs.length}</strong>
                  <small>{activeFilter === 'all' ? 'all categories' : formatCategory(activeFilter)}</small>
                </div>
                <div className="gallery-summary-card">
                  <span>Total images</span>
                  <strong>{filteredBlogs.reduce((sum, blog) => sum + (Array.isArray(blog.images) ? blog.images.length : 0), 0)}</strong>
                  <small>inside visible posts</small>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="no-results">
                <i className="fas fa-spinner fa-spin"></i>
                <h3>Loading gallery posts</h3>
                <p>Please wait while the latest posts are fetched.</p>
              </div>
            ) : error ? (
              <div className="no-results">
                <i className="fas fa-circle-exclamation"></i>
                <h3>Gallery unavailable</h3>
                <p>{error}</p>
              </div>
            ) : filteredBlogs.length > 0 ? (
              <div className="gallery-grid">
                {filteredBlogs.map((blog, index) => (
                  <div key={blog.id} className="gallery-card" data-aos="fade-up" data-aos-delay={index * 50}>
                    <div className="card-inner">
                      {resolveBlogImage(blog) ? (
                        <div className="card-image">
                          <img src={resolveBlogImage(blog)} alt={blog.title} />
                          <div className="image-overlay">
                            <Link to={`/gallery-blog-details/${blog.id}`} className="overlay-link">
                              <i className="fas fa-expand"></i>
                            </Link>
                          </div>
                          {blog.images && blog.images.length > 0 && (
                            <div className="image-count-badge">
                              <i className="fas fa-images"></i>
                              <span>{blog.images.length} {blog.images.length === 1 ? 'photo' : 'photos'}</span>
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
                          {blog.category && (
                            <span className="category-badge">{formatCategory(blog.category)}</span>
                          )}
                          <span className="date-badge">
                            <i className="far fa-calendar"></i>
                            {new Date(blog.created_at).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>

                        <h3 className="card-title">
                          <Link to={`/gallery-blog-details/${blog.id}`}>
                            {blog.title}
                          </Link>
                        </h3>

                        <p className="card-excerpt">
                          {getBlogExcerpt(blog)}
                        </p>

                        <div className="card-footer">
                          <Link to={`/gallery-blog-details/${blog.id}`} className="read-more-btn">
                            View Gallery
                            <i className="fas fa-arrow-right"></i>
                          </Link>
                          {blog.author && (
                            <div className="author-info">
                              <i className="fas fa-user-circle"></i>
                              <span>{blog.author}</span>
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
                <h3>{blogs.length === 0 ? 'No gallery posts published' : 'No posts found'}</h3>
                <p>{blogs.length === 0 ? 'Publish gallery posts from the admin panel to show them here.' : 'Try adjusting your search or filter criteria.'}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
