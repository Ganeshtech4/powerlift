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
  const [imagesToDisplay, setImagesToDisplay] = useState(25); // Start with 25 images
  const [imageUrls, setImageUrls] = useState({});
  const [lightboxImage, setLightboxImage] = useState(null);
  const IMAGES_PER_LOAD = 25; // Load 25 images at a time

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
        const API_URL = process.env.REACT_APP_API_URL || '/api/v1';
        
        // Fetch blog from API
        const response = await fetch(`${API_URL}/blogs/${id}`);
        if (response.ok) {
          const blogData = await response.json();
          
          // Populate blogImages from images array in blog data (direct S3 URLs)
          if (blogData.images && blogData.images.length > 0) {
            blogData.blogImages = blogData.images.map((url, index) => ({ url, name: `image-${index}` }));
          } else if (blogData.image_count > 0) {
            // Fallback: try S3 folder listing
            try {
              const imagesResponse = await fetch(`${API_URL}/images/${id}/list`);
              if (imagesResponse.ok) {
                const imagesData = await imagesResponse.json();
                blogData.blogImages = imagesData.images
                  .filter(url => !url.endsWith('/thumbnail.jpg'))
                  .map((url, index) => ({ url, name: `image-${index}` }));
              } else {
                blogData.blogImages = [];
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

  const imagesToShow = blog.blogImages?.slice(0, imagesToDisplay) || [];
  const hasMoreImages = blog.blogImages && blog.blogImages.length > imagesToDisplay;
  const remainingImages = blog.blogImages ? blog.blogImages.length - imagesToDisplay : 0;

  const loadMoreImages = () => {
    setImagesToDisplay(prev => prev + IMAGES_PER_LOAD);
  };

  const showLessImages = () => {
    setImagesToDisplay(IMAGES_PER_LOAD);
    // Scroll to gallery section
    window.scrollTo({ top: document.querySelector('.event-details__img-box')?.offsetTop - 100 || 0, behavior: 'smooth' });
  };

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
                      {/* Location and Date */}
                      <ul className="event-details__meta list-unstyled">
                        <li>
                          <p>
                            <span className="icon-pin"></span>
                            {blog.location || 'Hyderabad, Telangana, India'}
                          </p>
                        </li>
                        {(blog.event_date || blog.created_at) && (
                          <li>
                            <p>
                              <span className="icon-clock"></span>
                              {formatDate(blog.event_date || blog.created_at)}
                            </p>
                          </li>
                        )}
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
                                    {imageUrls[`img${index}`] ? (
                                      <img 
                                        src={imageUrls[`img${index}`]} 
                                        alt={`Blog Image ${index + 1}`}
                                        style={{width: '100%', height: 'auto'}}
                                      />
                                    ) : (
                                      <div style={{padding: '20px', textAlign: 'center'}}>Loading...</div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Load More / Show Less Buttons */}
                          <div style={{textAlign: 'center', marginTop: '30px', marginBottom: '30px'}}>
                            {hasMoreImages && (
                              <button 
                                onClick={loadMoreImages}
                                className="thm-btn"
                                style={{marginRight: '15px'}}
                              >
                                Load {remainingImages > IMAGES_PER_LOAD ? IMAGES_PER_LOAD : remainingImages} More Images
                                <span className="icon-arrow-down"></span>
                              </button>
                            )}
                            {imagesToDisplay > IMAGES_PER_LOAD && (
                              <button 
                                onClick={showLessImages}
                                className="thm-btn"
                                style={{backgroundColor: '#6c757d'}}
                              >
                                Show Less
                                <span className="icon-arrow-up"></span>
                              </button>
                            )}
                            {!hasMoreImages && blog.blogImages && blog.blogImages.length > IMAGES_PER_LOAD && (
                              <p style={{color: '#666', marginTop: '15px', fontSize: '14px'}}>
                                Showing all {blog.blogImages.length} images
                              </p>
                            )}
                          </div>
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
