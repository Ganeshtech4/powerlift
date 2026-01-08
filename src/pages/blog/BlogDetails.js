import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import BackToTop from '../../components/elements/BackToTop';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import SiteBreadcrumb from '../../components/Common/Breadcumb';
import CtaTwo from '../../components/Common/CtaSection/CtaTwo';
import './BlogDetails.css';

const navImg1 = `${process.env.PUBLIC_URL}/images/logo wpc.png`;
const bannerbg = `${process.env.PUBLIC_URL}/images/backgrounds/page-header-bg.jpg`;
const SERVER_URL = process.env.REACT_APP_SERVER_URL || '';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [showAllImages, setShowAllImages] = useState(false);
  const [imageUrls, setImageUrls] = useState({});
  const [lightboxImage, setLightboxImage] = useState(null);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setIsVisible(scrollTop > 300);
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const loadBlog = async () => {
      try {
        // Fetch blog from API
        const response = await fetch(`/blog-api/api/v1/blogs/${id}`);
        if (response.ok) {
          const blogData = await response.json();
          
          // Fetch blog images from S3
          if (blogData.image_count > 0) {
            try {
              const imagesResponse = await fetch(`/blog-api/api/v1/images/${id}/list`);
              if (imagesResponse.ok) {
                const imagesData = await imagesResponse.json();
                // Filter out thumbnail and add images to blog data
                blogData.blogImages = imagesData.images
                  .filter(url => !url.endsWith('/thumbnail.jpg'))
                  .map((url, index) => ({ url, name: `image-${index}` }));
              }
            } catch (error) {
              console.error('Error loading images:', error);
              blogData.blogImages = [];
            }
          } else {
            blogData.blogImages = [];
          }
          
          setBlog(blogData);
          await loadImagesFromS3(blogData);
        } else {
          console.error('Blog not found');
        }
      } catch (error) {
        console.error('Error loading blog:', error);
      }
      setLoading(false);
    };
    
    loadBlog();
  }, [id]);

  const loadImagesFromS3 = async (blogData) => {
    const urls = {};
    
    // Use thumbnail_url as main image
    if (blogData.thumbnail_url) {
      urls.mainImg = blogData.thumbnail_url;
    } else if (blogData.blogImages && blogData.blogImages.length > 0) {
      urls.mainImg = blogData.blogImages[0].url;
    }

    // All blog images are already S3 public URLs, no need for presigned URLs
    if (blogData.blogImages && blogData.blogImages.length > 0) {
      blogData.blogImages.forEach((img, index) => {
        urls[`img${index}`] = img.url;
      });
    }

    setImageUrls(urls);
  };

  const getPresignedUrl = async (s3Key) => {
    try {
      const response = await fetch(`${SERVER_URL}/api/s3/presigned-url/${encodeURIComponent(s3Key)}?expiresIn=3600`);
      if (!response.ok) throw new Error('Failed to get presigned URL');
      const result = await response.json();
      return result.url;
    } catch (error) {
      console.error('Error getting presigned URL:', error);
      return s3Key;
    }
  };

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

  if (loading) {
    return (
      <React.Fragment>
        <Header navImg={navImg1} parentMenu='blog' activeMenu="/blog" />
        <SiteBreadcrumb pageTitle="Loading..." pageName="Blog Details" breadcrumbsImg={bannerbg} />
        <section className="event-details">
          <div className="container">
            <div className="loading-content" style={{textAlign: 'center', padding: '100px 0'}}>
              <i className="fa fa-spinner fa-spin fa-3x"></i>
              <p>Loading blog post...</p>
            </div>
          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  }

  if (!blog) {
    return (
      <React.Fragment>
        <Header navImg={navImg1} parentMenu='blog' activeMenu="/blog" />
        <SiteBreadcrumb pageTitle="Not Found" pageName="Blog Details" breadcrumbsImg={bannerbg} />
        <section className="event-details">
          <div className="container">
            <div className="not-found-content" style={{textAlign: 'center', padding: '100px 0'}}>
              <i className="fa fa-exclamation-triangle fa-5x"></i>
              <h2>Gallery Post Not Found</h2>
              <p>The gallery post you're looking for doesn't exist or has been removed.</p>
              <Link to="/gallery-blog" className="thm-btn" style={{marginTop: '20px'}}>
                <span className="icon-arrow-left"></span> Back to Gallery
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  }

  const imagesToShow = showAllImages ? blog.blogImages : blog.blogImages?.slice(0, 6);

  return (
    <React.Fragment>
      <Header navImg={navImg1} parentMenu='gallery' activeMenu="/gallery-blog" />
      <SiteBreadcrumb pageTitle={blog.title} pageName="Gallery Details" breadcrumbsImg={bannerbg} />

      <section className="event-details">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12">
              <div className="event-details__left">
                {/* Main Image */}
                {imageUrls.mainImg && (
                  <div className="event-details__img" onClick={() => setLightboxImage(imageUrls.mainImg)}>
                    <img src={imageUrls.mainImg} alt={blog.title} />
                  </div>
                )}

                <div className="event-details__main-tab-box tabs-box">
                  <div className="tabs-content">
                    <div className="event-details__tab-content-box">
                      {/* Location and Time */}
                      <ul className="event-details__meta list-unstyled">
                        <li>
                          <p>
                            <span className="icon-clock"></span>
                            {blog.location || 'Hyderabad, Telangana, India'}
                          </p>
                        </li>
                        <li>
                          <p>
                            <span className="icon-pin"></span>
                            {formatTime(blog.startTime, blog.endTime)} | {formatDate(blog.eventDate)}
                          </p>
                        </li>
                      </ul>

                      {/* Title */}
                      <h3 className="event-details__title-1">{blog.title}</h3>

                      {/* Content */}
                      <p className="event-details__text-1">{blog.content}</p>

                      {/* All Blog Images Grid */}
                      {blog.blogImages && blog.blogImages.length > 0 && (
                        <>
                          <div className="event-details__img-box">
                            <div className="row">
                              {imagesToShow.map((img, index) => (
                                <div className="col-xl-4 col-lg-4 col-md-6" key={img.id || index} style={{marginBottom: '20px'}}>
                                  <div 
                                    className="event-details__img-box-img" 
                                    onClick={() => setLightboxImage(imageUrls[`img${index}`] || img.url)}
                                    style={{cursor: 'pointer'}}
                                  >
                                    <img
                                      src={imageUrls[`img${index}`] || img.url}
                                      alt={img.name || `Image ${index + 1}`}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* View All / Show Less Button */}
                          {blog.blogImages.length > 6 && (
                            <div style={{textAlign: 'center', marginTop: '20px', marginBottom: '30px'}}>
                              <button 
                                onClick={() => setShowAllImages(!showAllImages)}
                                className="thm-btn"
                              >
                                {showAllImages ? (
                                  <>
                                    Show Less
                                    <span className="icon-arrow-up"></span>
                                  </>
                                ) : (
                                  <>
                                    View All {blog.blogImages.length} Images
                                    <span className="icon-arrow-right"></span>
                                  </>
                                )}
                              </button>
                            </div>
                          )}
                        </>
                      )}

                      {/* Blog Information Section */}
                      <div className="event-details__points-box" style={{marginTop: '40px'}}>
                        <h3 className="event-details__title-1" style={{fontSize: '1.5rem', marginBottom: '20px'}}>
                          Blog Information
                        </h3>
                        <ul className="event-details__points list-unstyled">
                          <li>
                            <div className="icon">
                              <span className="icon-user"></span>
                            </div>
                            <p><strong>Author:</strong> {blog.author}</p>
                          </li>
                          <li>
                            <div className="icon">
                              <span className="icon-calendar"></span>
                            </div>
                            <p><strong>Published:</strong> {formatDate(blog.publishDate || blog.createdAt)}</p>
                          </li>
                        </ul>
                        <ul className="event-details__points list-unstyled">
                          <li>
                            <div className="icon">
                              <span className="icon-folder"></span>
                            </div>
                            <p><strong>Category:</strong> {blog.category}</p>
                          </li>
                          {blog.blogImages && blog.blogImages.length > 0 && (
                            <li>
                              <div className="icon">
                                <span className="icon-image"></span>
                              </div>
                              <p><strong>Total Images:</strong> {blog.blogImages.length}</p>
                            </li>
                          )}
                        </ul>
                      </div>

                      {/* Back Link */}
                      <div style={{marginTop: '40px'}}>
                        <Link to="/blog" className="thm-btn">
                          <span className="icon-arrow-left"></span> Back to All Blogs
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaTwo />
      <BackToTop scroll={isVisible} />
      <Footer />

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          className="lightbox-overlay" 
          onClick={() => setLightboxImage(null)}
        >
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="lightbox-close" 
              onClick={() => setLightboxImage(null)}
            >
              ×
            </button>
            <img src={lightboxImage} alt="Enlarged view" />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default BlogDetails;
