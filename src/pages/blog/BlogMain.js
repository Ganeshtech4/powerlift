import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BlogMain.css';

const SERVER_URL = process.env.REACT_APP_SERVER_URL || '';

const BlogMain = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [imageUrls, setImageUrls] = useState({});

  const categories = ['All', 'District', 'State', 'Nationals', 'Internationals'];

  useEffect(() => {
    const loadBlogsAndImages = async () => {
      try {
        // Fetch published blogs from API
        const response = await fetch('/blog-api/api/v1/blogs?published_only=true');
        if (response.ok) {
          const blogsData = await response.json();
          setBlogs(blogsData);
          setFilteredBlogs(blogsData);

          // Load images from S3
          await loadImagesFromS3(blogsData);
        } else {
          console.error('Failed to load blogs from API');
        }
      } catch (error) {
        console.error('Error loading blogs:', error);
      }
      setLoading(false);
    };

    loadBlogsAndImages();
  }, []);

  const loadImagesFromS3 = async (blogsData) => {
    const urls = {};

    for (const blog of blogsData) {
      // Load featured image
      if (blog.featuredImage && !blog.featuredImage.startsWith('data:')) {
        try {
          const presignedUrl = await getPresignedUrl(blog.featuredImage);
          urls[`featured_${blog.id}`] = presignedUrl;
        } catch (error) {
          console.error('Error loading featured image:', error);
          urls[`featured_${blog.id}`] = blog.featuredImage;
        }
      } else {
        urls[`featured_${blog.id}`] = blog.featuredImage;
      }

      // Load first two blog images for preview
      if (blog.blogImages && blog.blogImages.length > 0) {
        for (let i = 0; i < Math.min(2, blog.blogImages.length); i++) {
          const img = blog.blogImages[i];
          if (img.url && !img.url.startsWith('data:')) {
            try {
              const presignedUrl = await getPresignedUrl(img.url);
              urls[`blog_${blog.id}_img_${i}`] = presignedUrl;
            } catch (error) {
              console.error('Error loading blog image:', error);
              urls[`blog_${blog.id}_img_${i}`] = img.url;
            }
          } else {
            urls[`blog_${blog.id}_img_${i}`] = img.url;
          }
        }
      }
    }

    setImageUrls(urls);
  };

  const getPresignedUrl = async (s3Key) => {
    try {
      const response = await fetch(`${SERVER_URL}/api/s3/presigned-url/${encodeURIComponent(s3Key)}?expiresIn=3600`);
      if (!response.ok) {
        throw new Error('Failed to get presigned URL');
      }
      const result = await response.json();
      return result.url;
    } catch (error) {
      console.error('Error getting presigned URL:', error);
      return s3Key; // Fallback to original key
    }
  };

  useEffect(() => {
    // Filter blogs based on search term and category
    let filtered = blogs;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(blog => blog.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.tags.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredBlogs(filtered);
  }, [blogs, searchTerm, selectedCategory]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDisplayImage = (blog) => {
    // First try loaded presigned URL for featured image
    if (imageUrls[`featured_${blog.id}`]) {
      return imageUrls[`featured_${blog.id}`];
    }
    // Then try first blog image presigned URL
    if (imageUrls[`blog_${blog.id}_img_0`]) {
      return imageUrls[`blog_${blog.id}_img_0`];
    }
    // If featured image is base64, use it directly
    if (blog.featuredImage && blog.featuredImage.startsWith('data:')) {
      return blog.featuredImage;
    }
    // If we have first blog image as base64, use it
    if (blog.blogImages && blog.blogImages.length > 0 && blog.blogImages[0].url.startsWith('data:')) {
      return blog.blogImages[0].url;
    }
    // Don't return S3 keys directly as they won't load
    return null;
  };

  const truncateText = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <section className="blog-page">
        <div className="container">
          <div className="blog-loading">
            <i className="fa fa-spinner fa-spin fa-2x"></i>
            <p>Loading blogs...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <React.Fragment>
      <section className="blog-page">
        <div className="container">
          {/* Search and Filter Section */}
          <div className="blog-controls">
            <div className="search-container">
              <div className="search-box">
                <i className="fa fa-search"></i>
                <input
                  type="text"
                  placeholder="Search blogs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="filter-container">
              <label>Filter by Category:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="results-count">
              <span>{filteredBlogs.length} blog(s) found</span>
            </div>
          </div>

          {/* Blogs Grid */}
          {filteredBlogs.length === 0 ? (
            <div className="no-blogs-found">
              <i className="fa fa-search fa-3x"></i>
              <h3>No blogs found</h3>
              <p>
                {searchTerm || selectedCategory !== 'All'
                  ? 'Try adjusting your search criteria'
                  : 'No blogs have been published yet'}
              </p>
            </div>
          ) : (
            <div className="row">
              {filteredBlogs.map((blog, index) => {
                const displayImage = getDisplayImage(blog);
                const hasImages = blog.blogImages && blog.blogImages.length > 0;
                const imageCount = hasImages ? blog.blogImages.length : 0;

                return (
                  <div
                    key={blog.id}
                    className={`col-xl-4 col-lg-4 col-md-6 wow fadeIn${index % 3 === 0 ? "Left" : index % 3 === 1 ? "Up" : "Right"
                      }`}
                    data-wow-delay={`${(index + 1) * 100}ms`}
                  >
                    <div className="blog-one__single modern-blog-card">
                      {displayImage && (
                        <div className="blog-one__img">
                          <img src={displayImage} alt={blog.title} />
                          <div className="blog-one__hover">
                            <Link to={`/gallery-blog-details/${blog.id}`}>
                              <div className="blog-one__hover-icon-1">
                                <span className="blog-one__hover-icon-2"></span>
                              </div>
                            </Link>
                          </div>
                          <div className="blog-category-badge">
                            {blog.category}
                          </div>
                          {imageCount > 0 && (
                            <div className="blog-image-count">
                              <i className="fa fa-images"></i> {imageCount}
                            </div>
                          )}
                        </div>
                      )}

                      <div className="blog-one__content">
                        <ul className="blog-one__meta list-unstyled">
                          <li>
                            <span className="icon-user"></span>
                            By {blog.author || 'WPC Admin'}
                          </li>
                          <li>
                            <span className="icon-calendar"></span>
                            {formatDate(blog.publishDate || blog.createdAt)}
                          </li>
                        </ul>

                        <h3 className="blog-one__title">
                          <Link to={`/gallery-blog-details/${blog.id}`}>{blog.title}</Link>
                        </h3>

                        <p className="blog-excerpt">
                          {truncateText(blog.excerpt || blog.content)}
                        </p>

                        {blog.tags && (
                          <div className="blog-tags">
                            {blog.tags.split(',').slice(0, 3).map((tag, i) => (
                              <span key={i} className="tag">
                                {tag.trim()}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="blog-one__btn-box-two">
                          <Link
                            to={`/gallery-blog-details/${blog.id}`}
                            className="blog-one__btn-2 thm-btn"
                          >
                            Read More
                            <span className="icon-arrow-right"></span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </React.Fragment>
  );
};

export default BlogMain;
