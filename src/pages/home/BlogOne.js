import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function BlogOne() {
  const [blogs, setBlogs] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        // Fetch recent 3 published blogs from MongoDB - MUST have trailing slash for FastAPI
        const response = await fetch('/blog-api/api/v1/blogs/?published_only=true&limit=3');
        if (response.ok) {
          const blogsData = await response.json();
          console.log('Home page loaded blogs:', blogsData);
          setBlogs(blogsData);
          
          // Load thumbnail images from S3
          await loadImagesFromS3(blogsData);
        } else {
          console.error('Failed to load blogs:', response.status);
        }
      } catch (error) {
        console.error('Error loading blogs:', error);
      }
      setLoading(false);
    };
    
    loadBlogs();
  }, []);

  const loadImagesFromS3 = async (blogsData) => {
    const urls = {};
    
    for (const blog of blogsData) {
      // Use thumbnail_url directly from API (already contains public S3 URL)
      if (blog.thumbnail_url) {
        urls[`thumbnail_${blog.id}`] = blog.thumbnail_url;
      }
    }
    
    setImageUrls(urls);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDisplayImage = (blog) => {
    // Use thumbnail_url from API response
    if (imageUrls[`thumbnail_${blog.id}`]) {
      return imageUrls[`thumbnail_${blog.id}`];
    }
    if (blog.thumbnail_url) {
      return blog.thumbnail_url;
    }
    return null;
  };

  const animationClasses = ['fadeInLeft', 'fadeInUp', 'fadeInRight'];
  const animationDelays = ['100ms', '200ms', '300ms'];
  if (loading) {
    return (
      <section id='th-blog' className="blog-one">
        <div className="container">
          <div className="blog-one__top">
            <div className="section-title text-left">
              <div className="section-title__tagline-box">
                <span className="section-title__tagline">Latest Gallery Posts</span>
              </div>
              <h2 className="section-title__title">Recent Updates</h2>
            </div>
          </div>
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <i className="fa fa-spinner fa-spin fa-2x"></i>
            <p>Loading blogs...</p>
          </div>
        </div>
      </section>
    );
  }

  if (blogs.length === 0) {
    return (
      <section id='th-blog' className="blog-one">
        <div className="container">
          <div className="blog-one__top">
            <div className="section-title text-left">
              <div className="section-title__tagline-box">
                <span className="section-title__tagline">Latest Gallery Posts</span>
              </div>
              <h2 className="section-title__title">Recent Updates</h2>
            </div>
          </div>
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <p>No blogs available yet.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id='th-blog' className="blog-one">
      <div className="container">
        <div className="blog-one__top">
          <div className="section-title text-left">
            <div className="section-title__tagline-box">
              <span className="section-title__tagline">Latest Gallery Posts</span>
            </div>
            <h2 className="section-title__title">Recent Updates</h2>
          </div>
          <div className="blog-one__btn-box">
            <Link to="/gallery-blog" className="blog-one__btn thm-btn">
              View All Gallery<span className="icon-arrow-right"></span>
            </Link>
          </div>
        </div>
        <div className="blog-one__bottom">
          <div className="row">
            {blogs.map((blog, index) => {
              const displayImage = getDisplayImage(blog);
              return (
              <div
                key={blog.id}
                className={`col-xl-4 col-lg-4 col-md-6 wow ${animationClasses[index] || 'fadeInUp'}`}
                data-wow-delay={animationDelays[index] || '100ms'}
              >
                <div className="blog-one__single">
                  {displayImage && (
                    <div className="blog-one__img">
                      <img
                        src={displayImage}
                        alt={blog.title}
                      />
                      <div className="blog-one__hover">
                        <Link to={`/gallery-blog-details/${blog.id}`}>
                          <span className="blog-one__hover-icon-1">
                            <span className="blog-one__hover-icon-2"></span>
                          </span>
                        </Link>
                      </div>
                    </div>
                  )}
                  <div className="blog-one__content">
                    <ul className="blog-one__meta list-unstyled">
                      <li>
                        <span className="icon-user"></span>By {blog.author || 'Admin'}
                      </li>
                      <li>
                        <span className="icon-calendar"></span>{formatDate(blog.published_at || blog.created_at)}
                      </li>
                    </ul>
                    <h3 className="blog-one__title">
                      <Link to={`/gallery-blog-details/${blog.id}`}>
                        {blog.title}
                      </Link>
                    </h3>
                    <div className="blog-one__btn-box-two">
                      <Link to={`/gallery-blog-details/${blog.id}`} className="blog-one__btn thm-btn">
                        Read More<span className="icon-arrow-right"></span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
