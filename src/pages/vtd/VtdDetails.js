import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import BackToTop from "../../components/elements/BackToTop";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import SiteBreadcrumb from "../../components/Common/Breadcumb";
import CtaTwo from "../../components/Common/CtaSection/CtaTwo";
import "../blog/BlogDetails.css";
import "../gallery/Gallery.css";

const navImg1 = `${process.env.PUBLIC_URL}/logowhitebg.png`;
const bannerbg = `${process.env.PUBLIC_URL}/images/backgrounds/coverpagepic.jpg`;

const formatCategory = (category) => {
  if (!category) return 'Uncategorized';
  return category
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

export default function VtdDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);

  const handleScroll = () => {
    setIsVisible(window.scrollY > 300);
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        const API_URL = process.env.REACT_APP_API_URL || '/api/v1';
        const response = await fetch(`${API_URL}/vtd-books/${id}`);
        if (response.ok) {
          const data = await response.json();
          setItem(data);
          setError('');
        } else {
          console.error('Failed to fetch VTD item details:', response.status);
          setError('Resource not found or unavailable.');
        }
      } catch (err) {
        console.error('Error fetching VTD item:', err);
        setError('Failed to load VTD resource details.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchItem();
    }
  }, [id]);

  const mainImage = item?.thumbnail_url || (Array.isArray(item?.images) ? item.images[0] : null);
  const galleryImages = Array.isArray(item?.images) ? item.images.filter(Boolean) : [];

  return (
    <>
      <Header navImg={navImg1} parentMenu="Resources" activeMenu="/vtd" />
      <SiteBreadcrumb
        pageTitle={item ? item.title : "VTD Details"}
        pageName="VTD Details"
        breadcrumbsImg={bannerbg}
      />

      <section className="event-details py-5">
        <div className="container">
          {loading ? (
            <div className="no-results text-center py-5">
              <i className="fas fa-spinner fa-spin fa-3x text-danger mb-3"></i>
              <h3>Loading resource details...</h3>
              <p>Please wait while we fetch the content.</p>
            </div>
          ) : error || !item ? (
            <div className="no-results text-center py-5">
              <i className="fas fa-exclamation-triangle fa-3x text-warning mb-3"></i>
              <h3>Resource Not Found</h3>
              <p>{error || "The requested VTD resource could not be found."}</p>
              <Link to="/vtd" className="thm-btn mt-4">
                <i className="fas fa-arrow-left me-2"></i> Back to VTD Resources
              </Link>
            </div>
          ) : (
            <div className="row">
              <div className="col-xl-12 col-lg-12">
                <div className="event-details__left">
                  {/* Hero / Main Image */}
                  {mainImage && (
                    <div 
                      className="event-details__img" 
                      onClick={() => setLightboxImage(mainImage)}
                      style={{ cursor: 'pointer', overflow: 'hidden', borderRadius: '12px' }}
                    >
                      <img 
                        src={mainImage} 
                        alt={item.title} 
                        style={{ width: '100%', maxHeight: '550px', objectFit: 'cover' }}
                      />
                    </div>
                  )}

                  <div className="event-details__main-tab-box tabs-box mt-4">
                    <div className="tabs-content">
                      <div className="event-details__tab-content-box">
                        {/* Meta Badge Bar */}
                        <ul className="event-details__meta list-unstyled d-flex flex-wrap gap-3 align-items-center mb-4">
                          {item.category && (
                            <li>
                              <p className="mb-0">
                                <span className="icon-folder me-2"></span>
                                <strong>Category:</strong> {formatCategory(item.category)}
                              </p>
                            </li>
                          )}
                          {(item.created_at || item.published_date) && (
                            <li>
                              <p className="mb-0">
                                <span className="icon-clock me-2"></span>
                                <strong>Published:</strong> {formatDate(item.published_date || item.created_at)}
                              </p>
                            </li>
                          )}
                          {item.author && (
                            <li>
                              <p className="mb-0">
                                <span className="icon-user me-2"></span>
                                <strong>Author:</strong> {item.author}
                              </p>
                            </li>
                          )}
                        </ul>

                        {/* Resource Title */}
                        <h2 className="event-details__title-1 mb-3">{item.title}</h2>

                        {/* Description / Content */}
                        <div className="event-details__text-1 mb-5" style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#4a5568' }}>
                          {item.content || item.description || (
                            <p className="fst-italic text-muted">No detailed description provided for this resource.</p>
                          )}
                        </div>

                        {/* Additional Gallery Images */}
                        {galleryImages.length > 0 && (
                          <div className="event-details__img-box mb-5">
                            <h3 className="mb-4" style={{ fontSize: '1.4rem', fontWeight: '700' }}>
                              Resource Media Gallery ({galleryImages.length} {galleryImages.length === 1 ? 'photo' : 'photos'})
                            </h3>
                            <div className="row g-3">
                              {galleryImages.map((imgUrl, index) => (
                                <div className="col-xl-4 col-lg-4 col-md-6" key={index}>
                                  <div 
                                    className="event-details__img-box-img shadow-sm" 
                                    onClick={() => setLightboxImage(imgUrl)}
                                    style={{ cursor: 'pointer', borderRadius: '8px', overflow: 'hidden', height: '240px' }}
                                  >
                                    <img 
                                      src={imgUrl} 
                                      alt={`${item.title} - ${index + 1}`}
                                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Navigation Back Link */}
                        <div className="pt-4 border-top">
                          <Link to="/vtd" className="thm-btn">
                            <i className="fas fa-arrow-left me-2"></i> Back to VTD Resources
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
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
    </>
  );
}
