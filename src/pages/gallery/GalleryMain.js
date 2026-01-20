"use client";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Gallery.css';

export default function HomePage() {
  const [blogs, setBlogs] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';
        const response = await fetch(`${API_URL}/blogs/?published_only=true`);
        if (response.ok) {
          const blogsData = await response.json();
          console.log('Loaded blogs from API:', blogsData);
          setBlogs(blogsData);
        } else {
          console.error('Failed to fetch blogs:', response.status);
          setBlogs([]);
        }
      } catch (error) {
        console.error('Error loading blogs:', error);
        setBlogs([]);
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
        {/* Header Section */}
        <div className="gallery-header">
          <div className="section-title-wrapper">
            <h2 className="gallery-title">
              Powerlifting Gallery
            </h2>
          </div>

          {/* Search & Filter */}
          <div className="gallery-controls">
            <div className="search-box">
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="filter-buttons">
              {categories.map(category => (
                <button
                  key={category}
                  className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
                  onClick={() => setActiveFilter(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        {filteredBlogs.length > 0 ? (
          <div className="gallery-grid">
            {filteredBlogs.map((blog, index) => (
              <div key={blog.id} className="gallery-card" data-aos="fade-up" data-aos-delay={index * 50}>
                <div className="card-inner">
                  {blog.thumbnail_url && (
                    <div className="card-image">
                      <img src={blog.thumbnail_url} alt={blog.title} />
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
                  )}
                  
                  <div className="card-content">
                    <div className="card-meta">
                      {blog.category && (
                        <span className="category-badge">{blog.category}</span>
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
                      {blog.excerpt || (blog.content ? blog.content.substring(0, 120) + '...' : '')}
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
            <h3>No posts found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </section>
  );
}
