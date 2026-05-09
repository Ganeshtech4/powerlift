import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import BackToTop from '../../components/elements/BackToTop';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import SiteBreadcrumb from '../../components/Common/Breadcumb';
import CtaTwo from '../../components/Common/CtaSection/CtaTwo';
import './BlogDetails.css';

const navImg1 = `${process.env.PUBLIC_URL}/images/resources/logo-1.png`;
const bannerbg = `${process.env.PUBLIC_URL}/images/backgrounds/coverpagepic.jpg`;
const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5000';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [imageUrls, setImageUrls] = useState({});

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setIsVisible(scrollTop > 300);
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Load blog from MongoDB API
    const loadBlog = async () => {
      try {
        const response = await fetch(`/blog-api/api/v1/blogs/${id}`);
        if (response.ok) {
          const foundBlog = await response.json();
          setBlog(foundBlog);
          await loadImagesFromS3(foundBlog);
        } else {
          console.error('Failed to fetch blog:', response.status);
          setBlog(null);
        }
      } catch (error) {
        console.error('Error loading blog:', error);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };
    
    loadBlog();
  }, [id]);

  const loadImagesFromS3 = async (blogData) => {
    const urls = {};
    
    // Load main display image (featured or first blog image)
    if (blogData.featuredImage && !blogData.featuredImage.startsWith('data:')) {
      try {
        urls.mainImg = await getPresignedUrl(blogData.featuredImage);
      } catch (error) {
        urls.mainImg = blogData.featuredImage;
      }
    } else if (blogData.blogImages && blogData.blogImages.length > 0 && !blogData.blogImages[0].url.startsWith('data:')) {
      try {
        urls.mainImg = await getPresignedUrl(blogData.blogImages[0].url);
      } catch (error) {
        urls.mainImg = blogData.blogImages[0].url;
      }
    }

    // Load additional images (up to 2 for the grid)
    if (blogData.blogImages && blogData.blogImages.length > 0) {
      const imagePromises = blogData.blogImages.slice(0, 2).map(async (img, index) => {
        if (img.url && !img.url.startsWith('data:')) {
          try {
            return { index, url: await getPresignedUrl(img.url) };
          } catch (error) {
            return { index, url: img.url };
          }
        }
        return { index, url: img.url };
      });

      const loadedImages = await Promise.all(imagePromises);
      loadedImages.forEach(({ index, url }) => {
        urls[`img${index}`] = url;
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
            <div className="loading-content">
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
            <div className="not-found-content">
              <i className="fa fa-exclamation-triangle fa-5x"></i>
              <h2>Blog Post Not Found</h2>
              <p>The blog post you're looking for doesn't exist or has been removed.</p>
              <Link to="/blog" className="back-to-blog-btn thm-btn">
                <i className="fa fa-arrow-left"></i> Back to Blog
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Header navImg={navImg1} parentMenu='blog' activeMenu="/blog" />
      <SiteBreadcrumb pageTitle={blog.title} pageName="Blog Details" breadcrumbsImg={bannerbg} />

      <section className="event-details">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12">
              <div className="event-details__left">
                {/* Main Image */}
                {imageUrls.mainImg && (
                  <div className="event-details__img">
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

                      {/* Additional Images Grid */}
                      {blog.blogImages && blog.blogImages.length > 0 && (
                        <div className="event-details__img-box">
                          <div className="row">
                            {blog.blogImages.slice(0, 2).map((img, index) => (
                              <div className="col-xl-6" key={img.id || index}>
                                <div className="event-details__img-box-img">
                                  <img
                                    src={imageUrls[`img${index}`] || img.url}
                                    alt={img.name || `Image ${index + 1}`}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Key Points */}
                      <div className="event-details__points-box">
                        <ul className="event-details__points list-unstyled">
                          <li>
                            <div className="icon">
                              <span className="icon-double-angle"></span>
                            </div>
                            <p>Creating Memories, One Event at a Time</p>
                          </li>
                          <li>
                            <div className="icon">
                              <span className="icon-double-angle"></span>
                            </div>
                            <p>Celebrate in Style, Celebrate with Class</p>
                          </li>
                        </ul>
                        <ul className="event-details__points list-unstyled">
                          <li>
                            <div className="icon">
                              <span className="icon-double-angle"></span>
                            </div>
                            <p>Where Events Come to Life</p>
                          </li>
                          <li>
                            <div className="icon">
                              <span className="icon-double-angle"></span>
                            </div>
                            <p>Making Your Event Dreams Come True</p>
                          </li>
                        </ul>
                      </div>

                      {/* Back Link */}
                      <div className="event-details__back-link" style={{marginTop: '30px'}}>
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
    </React.Fragment>
  );
};

export default BlogDetails;
