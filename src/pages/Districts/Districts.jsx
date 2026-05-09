import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackToTop from '../../components/elements/BackToTop';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import SiteBreadcrumb from '../../components/Common/Breadcumb';
import CtaTwo from '../../components/Common/CtaSection/CtaTwo';
import './Districts.css';

const navImg1 = `${process.env.PUBLIC_URL}/images/logo wpc.png`;
const bannerbg = `${process.env.PUBLIC_URL}/images/backgrounds/coverpagepic.jpg`;
const API_URL = process.env.REACT_APP_API_URL || '/api/v1';

const Districts = () => {
    const [districts, setDistricts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [showEnquiryModal, setShowEnquiryModal] = useState(false);
    const [enquiryForm, setEnquiryForm] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        const scrollTop = window.scrollY;
        if (scrollTop > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener("scroll", handleScroll);
        fetchDistricts();
        return () => document.removeEventListener("scroll", handleScroll);
    }, []);

    const fetchDistricts = async () => {
        try {
            const response = await axios.get(`${API_URL}/districts/`);
            setDistricts(Array.isArray(response.data) ? response.data : []);
            setError('');
        } catch (error) {
            console.error('Error fetching districts:', error);
            setError('Unable to load district information right now. Please try again in a moment.');
        } finally {
            setLoading(false);
        }
    };

    const handleEnquiry = (district) => {
        setSelectedDistrict(district);
        setShowEnquiryModal(true);
    };

    const handleSubmitEnquiry = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            await axios.post(`${API_URL}/districts/enquiry`, {
                district_id: selectedDistrict.id,
                district_name: selectedDistrict.name,
                ...enquiryForm
            });

            alert('Enquiry sent successfully!');
            setShowEnquiryModal(false);
            setEnquiryForm({ name: '', email: '', phone: '', message: '' });
            setSelectedDistrict(null);
        } catch (error) {
            console.error('Error sending enquiry:', error);
            alert('Failed to send enquiry. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const sortedDistricts = [...districts].sort((a, b) => {
        // First sort by display_order (lower numbers first)
        const orderA = a.display_order ?? 999;
        const orderB = b.display_order ?? 999;
        if (orderA !== orderB) return orderA - orderB;
        
        // Then prioritize assigned districts (is_available = false)
        if (!a.is_available && b.is_available) return -1;
        if (a.is_available && !b.is_available) return 1;
        
        // Finally sort alphabetically by name
        return a.name.localeCompare(b.name);
    });
    const assignedDistricts = sortedDistricts.filter((district) => !district.is_available).length;
    const availableDistricts = sortedDistricts.filter((district) => district.is_available).length;

    if (loading) {
        return (
            <React.Fragment>
                <Header navImg={navImg1} parentMenu='About' activeMenu="/districts" />
                <div className="districts-loading">
                    <div className="loading-spinner"></div>
                    <p>Loading district directory...</p>
                </div>
                <Footer />
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <Header navImg={navImg1} parentMenu='About' activeMenu="/districts" />

            {/* Breadcrumb */}
            <SiteBreadcrumb
                pageTitle="Telangana Districts"
                pageName="Districts"
                breadcrumbsImg={bannerbg}
            />

            {/* Districts Section */}
            <div className="districts-section section-padding">
                <div className="container">
                    <section className="districts-overview">
                        <div className="districts-overview__copy">
                            <span className="districts-overview__eyebrow">District network</span>
                            <h2 className="districts-overview__title">Leadership across Telangana, presented as a clear working directory.</h2>
                            <p className="districts-overview__desc">
                                Browse district presidents, reach out directly where leadership is assigned, and send enquiries for districts that are still open for representation.
                            </p>
                        </div>
                        <div className="districts-overview__stats">
                            <div className="districts-stat-card">
                                <span className="districts-stat-card__label">Total districts</span>
                                <strong>{sortedDistricts.length}</strong>
                            </div>
                            <div className="districts-stat-card">
                                <span className="districts-stat-card__label">Assigned presidents</span>
                                <strong>{assignedDistricts}</strong>
                            </div>
                            <div className="districts-stat-card">
                                <span className="districts-stat-card__label">Open positions</span>
                                <strong>{availableDistricts}</strong>
                            </div>
                        </div>
                    </section>

                    <div className="districts-directory-header">
                        <div>
                            <span className="districts-directory-header__eyebrow">Directory</span>
                            <h3 className="districts-directory-header__title">District presidents and enquiries</h3>
                        </div>
                        <p className="districts-directory-header__text">
                            Each district card keeps contact details, representation status, and enquiry access in one place.
                        </p>
                    </div>

                    <div className="districts-grid">
                        {error ? (
                            <div className="districts-state-card">
                                <i className="fas fa-circle-exclamation"></i>
                                <h3>District directory unavailable</h3>
                                <p>{error}</p>
                                <button className="btn-enquiry btn-enquiry--compact" onClick={fetchDistricts}>
                                    <i className="fas fa-rotate-right"></i>
                                    Try again
                                </button>
                            </div>
                        ) : sortedDistricts.length === 0 ? (
                            <div className="districts-state-card">
                                <i className="fas fa-map-marked-alt"></i>
                                <h3>No districts published yet</h3>
                                <p>The district directory is currently empty. Please check back after the admin team publishes district records.</p>
                            </div>
                        ) : (
                            sortedDistricts.map((district) => (
                                <div key={district.id} className={`district-card ${district.is_available ? 'available' : 'assigned'}`}>
                                    <div className="district-header">
                                        <div>
                                            <span className="district-kicker">Telangana district</span>
                                            <h3 className="district-name">{district.name}</h3>
                                        </div>
                                        {district.is_available ? (
                                            <span className="status-badge available">
                                                <i className="fas fa-user-plus"></i> Open position
                                            </span>
                                        ) : (
                                            <span className="status-badge assigned">
                                                <i className="fas fa-check-circle"></i> President assigned
                                            </span>
                                        )}
                                    </div>

                                    <div className="district-body">
                                        {district.is_available ? (
                                            <div className="available-info">
                                                <div className="available-icon">
                                                    <i className="fas fa-flag"></i>
                                                </div>
                                                <p className="available-text">
                                                    This district does not have an assigned president yet. If you want to lead local powerlifting activity here, send your interest to the federation team.
                                                </p>
                                                <button
                                                    className="btn-enquiry"
                                                    onClick={() => handleEnquiry(district)}
                                                >
                                                    <i className="fas fa-paper-plane"></i>
                                                    Apply for District Lead
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="president-info">
                                                {district.president_photo_url && (
                                                    <div className="president-photo">
                                                        <img src={district.president_photo_url} alt={district.president_name} />
                                                    </div>
                                                )}
                                                {!district.president_photo_url && (
                                                    <div className="president-photo placeholder">
                                                        <i className="fas fa-user"></i>
                                                    </div>
                                                )}

                                                <h4 className="president-name">{district.president_name}</h4>
                                                <p className="president-label">District president</p>

                                                {district.certificate_url && (
                                                    <div style={{ margin: '1rem 0' }}>
                                                        <a 
                                                            href={district.certificate_url} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            className="certificate-link"
                                                            style={{
                                                                display: 'inline-flex',
                                                                alignItems: 'center',
                                                                gap: '0.5rem',
                                                                padding: '0.5rem 1rem',
                                                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                                color: '#fff',
                                                                borderRadius: '8px',
                                                                textDecoration: 'none',
                                                                fontSize: '0.9rem',
                                                                fontWeight: '600',
                                                                transition: 'all 0.3s ease',
                                                                boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)'
                                                            }}
                                                            onMouseOver={(e) => {
                                                                e.currentTarget.style.transform = 'translateY(-2px)';
                                                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
                                                            }}
                                                            onMouseOut={(e) => {
                                                                e.currentTarget.style.transform = 'translateY(0)';
                                                                e.currentTarget.style.boxShadow = '0 2px 8px rgba(102, 126, 234, 0.3)';
                                                            }}
                                                        >
                                                            <i className="fas fa-certificate"></i>
                                                            View Certificate
                                                        </a>
                                                    </div>
                                                )}

                                                {district.description && (
                                                    <p className="president-description">{district.description}</p>
                                                )}

                                                <div className="contact-info">
                                                    {district.president_email && (
                                                        <a href={`mailto:${district.president_email}`} className="contact-link">
                                                            <i className="fas fa-envelope"></i>
                                                            <span>{district.president_email}</span>
                                                        </a>
                                                    )}
                                                    {district.president_phone && (
                                                        <a href={`tel:${district.president_phone}`} className="contact-link">
                                                            <i className="fas fa-phone-alt"></i>
                                                            <span>{district.president_phone}</span>
                                                        </a>
                                                    )}
                                                </div>

                                                <button
                                                    className="btn-enquiry"
                                                    onClick={() => handleEnquiry(district)}
                                                >
                                                    <i className="fas fa-comments"></i>
                                                    Send Enquiry
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <CtaTwo />

            {/* Enquiry Modal */}
            {showEnquiryModal && (
                <div className="modal-overlay" onClick={() => setShowEnquiryModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setShowEnquiryModal(false)}>
                            <i className="fas fa-times"></i>
                        </button>

                        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                            <div style={{ 
                                width: '60px', 
                                height: '60px', 
                                background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)', 
                                borderRadius: '50%', 
                                display: 'inline-flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                marginBottom: '1rem'
                            }}>
                                <i className="fas fa-paper-plane" style={{ fontSize: '1.5rem', color: '#3b82f6' }}></i>
                            </div>
                            <h3 className="modal-title">Send Enquiry</h3>
                            <p className="modal-subtitle">{selectedDistrict?.name} District - We'll get back to you shortly</p>
                        </div>

                        <form onSubmit={handleSubmitEnquiry} className="enquiry-form">
                            <div className="form-group">
                                <label>Your Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={enquiryForm.name}
                                    onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                                    placeholder="John Doe"
                                    className="form-control"
                                />
                            </div>

                            <div className="form-group">
                                <label>Email Address *</label>
                                <input
                                    type="email"
                                    required
                                    value={enquiryForm.email}
                                    onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                                    placeholder="john@example.com"
                                    className="form-control"
                                />
                            </div>

                            <div className="form-group">
                                <label>Phone Number *</label>
                                <input
                                    type="tel"
                                    required
                                    value={enquiryForm.phone}
                                    onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                                    placeholder="+91 98765 43210"
                                    className="form-control"
                                />
                            </div>

                            <div className="form-group">
                                <label>Your Message *</label>
                                <textarea
                                    required
                                    rows="5"
                                    value={enquiryForm.message}
                                    onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                                    placeholder="Tell us about your interest in this district..."
                                    className="form-control"
                                ></textarea>
                            </div>

                            <button type="submit" className="btn-submit" disabled={submitting}>
                                {submitting ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin"></i> Sending...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-paper-plane"></i> Send Enquiry
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <BackToTop scroll={isVisible} />
            <Footer />
        </React.Fragment>
    );
};

export default Districts;
