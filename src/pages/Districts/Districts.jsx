import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackToTop from '../../components/elements/BackToTop';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import SiteBreadcrumb from '../../components/Common/Breadcumb';
import CtaTwo from '../../components/Common/CtaSection/CtaTwo';
import './Districts.css';

const navImg1 = `${process.env.PUBLIC_URL}/images/logo wpc.png`;
const bannerbg = `${process.env.PUBLIC_URL}/images/backgrounds/page-header-bg.jpg`;
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

const Districts = () => {
    const [districts, setDistricts] = useState([]);
    const [loading, setLoading] = useState(true);
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
            console.log('Fetching districts from:', `${API_URL}/districts/`);
            const response = await axios.get(`${API_URL}/districts/`);
            console.log('Districts response:', response.data);
            console.log('Total districts fetched:', response.data.length);
            setDistricts(response.data);
        } catch (error) {
            console.error('Error fetching districts:', error);
            console.error('API URL:', API_URL);
            if (error.response) {
                console.error('Response status:', error.response.status);
                console.error('Response data:', error.response.data);
            }
            // Show error message to user
            alert('Failed to load districts. Please check if the backend is running on port 8000.');
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

    if (loading) {
        return (
            <React.Fragment>
                <Header navImg={navImg1} parentMenu='About' activeMenu="/districts" />
                <div className="districts-loading">
                    <div className="loading-spinner"></div>
                    <p>Loading districts...</p>
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
                    <div className="section-title text-center mb-60">
                        <h2 className="title">33 Districts of Telangana</h2>
                        <p className="desc">
                            Connect with district representatives and powerlifting presidents across Telangana
                        </p>
                    </div>

                    <div className="districts-grid">
                        {districts.length === 0 ? (
                            <div className="no-districts-message" style={{
                                gridColumn: '1 / -1',
                                textAlign: 'center',
                                padding: '4rem 2rem',
                                background: '#fff',
                                borderRadius: '16px',
                                boxShadow: '0 5px 20px rgba(0,0,0,0.08)'
                            }}>
                                <i className="fas fa-info-circle" style={{ fontSize: '4rem', color: '#e74c3c', marginBottom: '1rem' }}></i>
                                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>No Districts Found</h3>
                                <p style={{ color: '#666', marginBottom: '1rem' }}>
                                    Unable to load districts. Please make sure the backend API is running.
                                </p>
                                <p style={{ color: '#999', fontSize: '0.9rem' }}>
                                    Backend URL: {API_URL}<br />
                                    Check browser console (F12) for details.
                                </p>
                            </div>
                        ) : (
                            districts.map((district) => (
                                <div key={district.id} className={`district-card ${district.is_available ? 'available' : 'assigned'}`}>
                                    <div className="district-header">
                                        <h3 className="district-name">{district.name}</h3>
                                        {district.is_available ? (
                                            <span className="status-badge available">
                                                <i className="fas fa-user-plus"></i> Position Available
                                            </span>
                                        ) : (
                                            <span className="status-badge assigned">
                                                <i className="fas fa-check-circle"></i> President Assigned
                                            </span>
                                        )}
                                    </div>

                                    <div className="district-body">
                                        {district.is_available ? (
                                            <div className="available-info">
                                                <div className="available-icon">
                                                    <i className="fas fa-users"></i>
                                                </div>
                                                <p className="available-text">
                                                    We are looking for a passionate powerlifter to represent this district
                                                </p>
                                                <button
                                                    className="btn-enquiry"
                                                    onClick={() => handleEnquiry(district)}
                                                >
                                                    <i className="fas fa-paper-plane"></i>
                                                    Express Interest
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

                        <h3 className="modal-title">Send Enquiry - {selectedDistrict?.name}</h3>

                        <form onSubmit={handleSubmitEnquiry} className="enquiry-form">
                            <div className="form-group">
                                <label>Your Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={enquiryForm.name}
                                    onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                                    placeholder="Enter your name"
                                    className="form-control"
                                />
                            </div>

                            <div className="form-group">
                                <label>Email *</label>
                                <input
                                    type="email"
                                    required
                                    value={enquiryForm.email}
                                    onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                                    placeholder="your.email@example.com"
                                    className="form-control"
                                />
                            </div>

                            <div className="form-group">
                                <label>Phone *</label>
                                <input
                                    type="tel"
                                    required
                                    value={enquiryForm.phone}
                                    onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                                    placeholder="+91 9876543210"
                                    className="form-control"
                                />
                            </div>

                            <div className="form-group">
                                <label>Message *</label>
                                <textarea
                                    required
                                    rows="5"
                                    value={enquiryForm.message}
                                    onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                                    placeholder="Write your message here..."
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
