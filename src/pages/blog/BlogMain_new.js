import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BlogMain.css';

const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5000';

const BlogMain = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [imageUrls, setImageUrls] = useState({});

  const categories = ['all', 'General', 'Competition', 'Training', 'News', 'Events', 'Athletes'];

  useEffect(() => {
    // Load blogs from MongoDB API
    const loadBlogs = async () => {
      try {
        const response = await fetch('/blog-api/api/v1/blogs/?published_only=true');
        if (response.ok) {
          const publishedBlogs = await response.json();
          setBlogs(publishedBlogs);
          setFilteredBlogs(publishedBlogs);
          
          // Load images from S3
          await loadImagesFromS3(publishedBlogs);
        } else {
          console.error('Failed to fetch blogs:', response.status);
          setBlogs([]);
          setFilteredBlogs([]);
        }
      } catch (error) {
        console.error('Error loading blogs:', error);
        setBlogs([]);
        setFilteredBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadBlogs();
  }, []);

  const loadImagesFromS3 = async (blogsData) => {
    const urls = {};
    
    for (const blog of blogsData) {
      // Load featured image or first blog image
      if (blog.featuredImage && !blog.featuredImage.startsWith('data:')) {
        try {
          const presignedUrl = await getPresignedUrl(blog.featuredImage);
          urls[`main_${blog.id}`] = presignedUrl;
        } catch (error) {
          console.error('Error loading featured image:', error);
          urls[`main_${blog.id}`] = blog.featuredImage;
        }
      } else if (blog.blogImages && blog.blogImages.length > 0 && !blog.blogImages[0].url.startsWith('data:')) {
        try {
          const presignedUrl = await getPresignedUrl(blog.blogImages[0].url);
          urls[`main_${blog.id}`] = presignedUrl;
        } catch (error) {
          console.error('Error loading blog image:', error);
          urls[`main_${blog.id}`] = blog.blogImages[0].url;
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
    // Filter blogs based on category
    if (activeTab === "all") {
      setFilteredBlogs(blogs);
    } else {
      setFilteredBlogs(blogs.filter(blog => blog.category === activeTab));
    }
  }, [blogs, activeTab]);

  const formatTime = (startTime, endTime) => {
    if (!startTime || !endTime) return '';
    return `${convertTo12Hour(startTime)} to ${convertTo12Hour(endTime)}`;
  };

  const convertTo12Hour = (time24) => {
    if (!time24) return '';
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getDisplayImage = (blog) => {
    if (imageUrls[`main_${blog.id}`]) {
      return imageUrls[`main_${blog.id}`];
    }
    if (blog.featuredImage) {
      return blog.featuredImage;
    }
    if (blog.blogImages && blog.blogImages.length > 0) {
      return blog.blogImages[0].url;
    }
    return null;
  };

  if (loading) {
    return (
      <section className="event-page">
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
      <section className="event-page">
        <div className="container">
          <div className="schedule-one__inner">
            <div className="section-title text-left">
              <div className="section-title__tagline-box">
                <span className="section-title__tagline">
                  Latest Updates
                </span>
              </div>
              <h2 className="section-title__title">
                Stay updated with our latest powerlifting news and events
              </h2>
            </div>

            <div className="schedule-one__main-tab-box tabs-box">
              <ul className="tab-buttons flex justify-center items-center gap-6 list-unstyled">
                {categories.map((category) => (
                  <li
                    key={category}
                    className={`tab-btn cursor-pointer flex justify-center items-center px-6 py-4 rounded-lg ${
                      activeTab === category ? "active-btn" : ""
                    }`}
                    onClick={() => setActiveTab(category)}
                  >
                    <h3 className="text-center font-semibold">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </h3>
                  </li>
                ))}
              </ul>

              <div className="tabs-content">
                <div className="tab active-tab">
                  <div className="schedule-one__tab-content-box">
                    {filteredBlogs.length === 0 ? (
                      <div className="no-blogs-found">
                        <i className="fa fa-search fa-3x"></i>
                        <h3>No blogs found</h3>
                        <p>No blogs have been published in this category yet.</p>
                      </div>
                    ) : (
                      filteredBlogs.map((blog) => {
                        const displayImage = getDisplayImage(blog);
                        
                        return (
                          <div key={blog.id} className="schedule-one__single">
                            <div className="schedule-one__left">
                              <h3 className="schedule-one__title">
                                <Link to={`/blog-details/${blog.id}`}>
                                  {blog.title}
                                </Link>
                              </h3>
                              <p className="schedule-one__text">
                                {blog.excerpt || blog.content.substring(0, 150) + '...'}
                              </p>
                            </div>
                            {displayImage && (
                              <div className="schedule-one__img">
                                <img src={displayImage} alt={blog.title} />
                              </div>
                            )}
                            <div className="schedule-one__address-and-btn-box">
                              <ul className="list-unstyled schedule-one__address">
                                <li>
                                  <div className="icon">
                                    <span className="icon-clock"></span>
                                  </div>
                                  <div className="text">
                                    <p>
                                      {formatTime(blog.startTime, blog.endTime)} <br />
                                      {formatDate(blog.eventDate)}
                                    </p>
                                  </div>
                                </li>
                                <li>
                                  <div className="icon">
                                    <span className="icon-pin"></span>
                                  </div>
                                  <div className="text">
                                    <p>
                                      {blog.location || 'Hyderabad, Telangana'}
                                    </p>
                                  </div>
                                </li>
                              </ul>
                              <div className="schedule-one__btn-box">
                                <Link
                                  to={`/blog-details/${blog.id}`}
                                  className="schedule-one__btn thm-btn"
                                >
                                  View Event
                                  <span className="icon-arrow-right"></span>
                                </Link>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default BlogMain;
