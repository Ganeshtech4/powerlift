import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import BackToTop from '../../components/elements/BackToTop';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import SiteBreadcrumb from '../../components/Common/Breadcumb';
import CtaTwo from '../../components/Common/CtaSection/CtaTwo';
import { formatResultLabel, normalizeResult } from './resultUtils';
import './Results.css';

const navImg1 = `${process.env.PUBLIC_URL}/logowhitebg.png`;
const bannerbg = `${process.env.PUBLIC_URL}/images/backgrounds/coverpagepic.jpg`;
const API_URL = process.env.REACT_APP_API_URL || '/api/v1';

const ResultDetailsPage = () => {
    const { id } = useParams();
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 300);
        };

        document.addEventListener('scroll', handleScroll);
        return () => document.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const fetchResult = async () => {
            try {
                const response = await axios.get(`${API_URL}/results/${id}`);
                setResult(normalizeResult(response.data));
            } catch (error) {
                console.error('Error fetching result:', error);
                setResult(null);
            } finally {
                setLoading(false);
            }
        };

        fetchResult();
    }, [id]);

    if (loading) {
        return (
            <React.Fragment>
                <Header navImg={navImg1} parentMenu='Results' activeMenu="/results" />
                <div className="results-loading">
                    <div className="loading-spinner"></div>
                    <p>Loading result details...</p>
                </div>
                <Footer />
            </React.Fragment>
        );
    }

    if (!result) {
        return (
            <React.Fragment>
                <Header navImg={navImg1} parentMenu='Results' activeMenu="/results" />
                <SiteBreadcrumb
                    pageTitle="Result Not Found"
                    pageName="Results"
                    breadcrumbsImg={bannerbg}
                />
                <section className="results-section section-padding">
                    <div className="container">
                        <div className="no-results result-details-empty-state">
                            <i className="fas fa-inbox fa-4x"></i>
                            <h3>Result not found</h3>
                            <p>The result you are looking for does not exist or has been removed.</p>
                            <Link to="/results" className="result-back-link">
                                <i className="fas fa-arrow-left"></i>
                                Back to Results
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
            <Header navImg={navImg1} parentMenu='Results' activeMenu="/results" />

            <SiteBreadcrumb
                pageTitle={result.title}
                pageName="Results"
                breadcrumbsImg={bannerbg}
            />

            <section className="results-section section-padding">
                <div className="container">
                    <div className="result-details-shell">
                        <div className="result-details-topbar">
                            <Link to="/results" className="result-back-link">
                                <i className="fas fa-arrow-left"></i>
                                Back to Results
                            </Link>
                        </div>

                        <div className="result-details-layout">
                            <div className="result-details-media">
                                {result.primaryImage ? (
                                    <div className="result-details-main-image">
                                        <img src={result.primaryImage} alt={result.title} />
                                    </div>
                                ) : (
                                    <div className="result-image__placeholder result-details-placeholder">
                                        <i className="fas fa-image"></i>
                                        <p>No preview image available for this result.</p>
                                    </div>
                                )}

                                {result.images.length > 1 && (
                                    <div className="result-details-gallery">
                                        {result.images.map((image, index) => (
                                            <div key={`${result.id}-${index}`} className="result-details-thumb">
                                                <img src={image} alt={`${result.title} ${index + 1}`} />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="result-details-content">
                                <div className="result-details-heading">
                                    <div className="result-badges result-details-badges">
                                        <span className={`badge badge-${result.category}`}>
                                            {result.category}
                                        </span>
                                        <span className="badge badge-type">
                                            {result.type === 'id_card' ? 'ID Card' : formatResultLabel(result.type)}
                                        </span>
                                    </div>
                                    <h1>{result.title}</h1>
                                    {result.description && <p>{result.description}</p>}
                                </div>

                                <div className="result-details-meta-grid">
                                    {result.athlete_name && (
                                        <div className="result-details-meta-card">
                                            <span>Athlete</span>
                                            <strong>{result.athlete_name}</strong>
                                        </div>
                                    )}
                                    {result.event_name && (
                                        <div className="result-details-meta-card">
                                            <span>Event</span>
                                            <strong>{result.event_name}</strong>
                                        </div>
                                    )}
                                    {result.event_date && (
                                        <div className="result-details-meta-card">
                                            <span>Date</span>
                                            <strong>{result.event_date}</strong>
                                        </div>
                                    )}
                                    {result.location && (
                                        <div className="result-details-meta-card">
                                            <span>Location</span>
                                            <strong>{result.location}</strong>
                                        </div>
                                    )}
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

export default ResultDetailsPage;