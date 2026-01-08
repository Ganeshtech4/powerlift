import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackToTop from '../../components/elements/BackToTop';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import SiteBreadcrumb from '../../components/Common/Breadcumb';
import CtaTwo from '../../components/Common/CtaSection/CtaTwo';
import './Results.css';

const navImg1 = `${process.env.PUBLIC_URL}/images/logo wpc.png`;
const bannerbg = `${process.env.PUBLIC_URL}/images/backgrounds/page-header-bg.jpg`;
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

const Results = () => {
    const [results, setResults] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('all');
    const [selectedImage, setSelectedImage] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    const tabs = [
        { id: 'all', label: 'All Results', icon: 'trophy' },
        { id: 'district', label: 'District', icon: 'map-marker-alt' },
        { id: 'state', label: 'State', icon: 'flag' },
        { id: 'nationals', label: 'Nationals', icon: 'medal' },
        { id: 'id_card', label: 'ID Cards', icon: 'id-card' },
        { id: 'result_image', label: 'Results', icon: 'file-alt' },
    ];

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
        fetchResults();
        return () => document.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        filterResults();
    }, [activeTab, results]);

    const fetchResults = async () => {
        try {
            const response = await axios.get(`${API_URL}/results/`);
            setResults(response.data);
            setFilteredResults(response.data);
        } catch (error) {
            console.error('Error fetching results:', error);
        } finally {
            setLoading(false);
        }
    };

    const filterResults = () => {
        if (activeTab === 'all') {
            setFilteredResults(results);
        } else if (['district', 'state', 'nationals'].includes(activeTab)) {
            setFilteredResults(results.filter(r => r.category === activeTab));
        } else {
            setFilteredResults(results.filter(r => r.result_type === activeTab));
        }
    };

    const openLightbox = (image) => {
        setSelectedImage(image);
    };

    const closeLightbox = () => {
        setSelectedImage(null);
    };

    if (loading) {
        return (
            <React.Fragment>
                <Header navImg={navImg1} parentMenu='Results' activeMenu="/results" />
                <div className="results-loading">
                    <div className="loading-spinner"></div>
                    <p>Loading results...</p>
                </div>
                <Footer />
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <Header navImg={navImg1} parentMenu='Results' activeMenu="/results" />

            <SiteBreadcrumb
                pageTitle="Competition Results"
                pageName="Results"
                breadcrumbsImg={bannerbg}
            />

            <div className="results-section section-padding">
                <div className="container">
                    <div className="section-title text-center mb-60">
                        <h2 className="title">Competition Results & Achievements</h2>
                        <p className="desc">
                            Browse through our competition results, achievements, and member ID cards
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="results-tabs">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                <i className={`fas fa-${tab.icon}`}></i>
                                <span>{tab.label}</span>
                                {tab.id !== 'all' && (
                                    <span className="count">
                                        {tab.id === 'district' || tab.id === 'state' || tab.id === 'nationals'
                                            ? results.filter(r => r.category === tab.id).length
                                            : results.filter(r => r.result_type === tab.id).length
                                        }
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Results Grid */}
                    {filteredResults.length === 0 ? (
                        <div className="no-results">
                            <i className="fas fa-inbox fa-4x"></i>
                            <h3>No Results Found</h3>
                            <p>No results available for this category yet.</p>
                        </div>
                    ) : (
                        <div className="results-grid">
                            {filteredResults.map(result => (
                                <div key={result.id} className="result-card" onClick={() => openLightbox(result)}>
                                    <div className="result-image">
                                        <img src={result.image_url} alt={result.title} />
                                        <div className="result-overlay">
                                            <i className="fas fa-search-plus"></i>
                                        </div>
                                    </div>
                                    <div className="result-info">
                                        <h4>{result.title}</h4>
                                        {result.athlete_name && (
                                            <p className="athlete-name">
                                                <i className="fas fa-user"></i> {result.athlete_name}
                                            </p>
                                        )}
                                        {result.event_name && (
                                            <p className="event-name">
                                                <i className="fas fa-trophy"></i> {result.event_name}
                                            </p>
                                        )}
                                        {result.event_date && (
                                            <p className="event-date">
                                                <i className="fas fa-calendar"></i> {result.event_date}
                                            </p>
                                        )}
                                        <div className="result-badges">
                                            <span className={`badge badge-${result.category}`}>
                                                {result.category}
                                            </span>
                                            <span className="badge badge-type">
                                                {result.result_type === 'id_card' ? 'ID Card' : 'Result'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Lightbox */}
            {selectedImage && (
                <div className="lightbox-overlay" onClick={closeLightbox}>
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <button className="lightbox-close" onClick={closeLightbox}>
                            <i className="fas fa-times"></i>
                        </button>
                        <img src={selectedImage.image_url} alt={selectedImage.title} />
                        <div className="lightbox-info">
                            <h3>{selectedImage.title}</h3>
                            {selectedImage.description && <p>{selectedImage.description}</p>}
                            {selectedImage.athlete_name && (
                                <p><strong>Athlete:</strong> {selectedImage.athlete_name}</p>
                            )}
                            {selectedImage.event_name && (
                                <p><strong>Event:</strong> {selectedImage.event_name}</p>
                            )}
                            {selectedImage.event_date && (
                                <p><strong>Date:</strong> {selectedImage.event_date}</p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <CtaTwo />
            <BackToTop scroll={isVisible} />
            <Footer />
        </React.Fragment>
    );
};

export default Results;
