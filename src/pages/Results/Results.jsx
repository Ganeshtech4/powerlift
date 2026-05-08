import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BackToTop from '../../components/elements/BackToTop';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import CtaTwo from '../../components/Common/CtaSection/CtaTwo';
import { formatResultLabel, normalizeResult } from './resultUtils';
import './Results.css';

const navImg1 = `${process.env.PUBLIC_URL}/images/logo-wpc.png`;
const API_URL = process.env.REACT_APP_API_URL || '/api/v1';

const Results = () => {
    const navigate = useNavigate();
    const [results, setResults] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const tabs = [
        { id: 'all', label: 'All Results', icon: 'trophy' },
        { id: 'district-championship', label: 'District Championship', icon: 'award', level: 'district', type: 'championship' },
        { id: 'district-records', label: 'District Records', icon: 'certificate', level: 'district', type: 'records' },
        { id: 'district-results', label: 'District Results', icon: 'file-alt', level: 'district', type: 'results' },
        { id: 'state-championship', label: 'State Championship', icon: 'award', level: 'state', type: 'championship' },
        { id: 'state-records', label: 'State Records', icon: 'certificate', level: 'state', type: 'records' },
        { id: 'state-results', label: 'State Results', icon: 'file-alt', level: 'state', type: 'results' },
        { id: 'nationals-championship', label: 'National Championship', icon: 'award', level: 'nationals', type: 'championship' },
        { id: 'nationals-records', label: 'National Records', icon: 'certificate', level: 'nationals', type: 'records' },
        { id: 'nationals-results', label: 'National Results', icon: 'file-alt', level: 'nationals', type: 'results' },
        { id: 'internationals-championship', label: 'International Championship', icon: 'award', level: 'internationals', type: 'championship' },
        { id: 'internationals-records', label: 'International Records', icon: 'certificate', level: 'internationals', type: 'records' },
        { id: 'internationals-results', label: 'International Results', icon: 'file-alt', level: 'internationals', type: 'results' },
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab, results, searchQuery]);

    const fetchResults = async () => {
        try {
            const response = await axios.get(`${API_URL}/results/`);
            const normalizedResults = (response.data || []).map(normalizeResult);
            setResults(normalizedResults);
            setFilteredResults(normalizedResults);
        } catch (error) {
            console.error('Error fetching results:', error);
        } finally {
            setLoading(false);
        }
    };

    const filterResults = () => {
        let nextResults = results;

        if (activeTab !== 'all') {
            const selectedTab = tabs.find(tab => tab.id === activeTab);
            if (selectedTab && selectedTab.level && selectedTab.type) {
                nextResults = nextResults.filter((result) => 
                    result.category === selectedTab.level && result.type === selectedTab.type
                );
            }
        }

        const normalizedQuery = searchQuery.trim().toLowerCase();
        if (normalizedQuery) {
            nextResults = nextResults.filter((result) => {
                const haystack = [
                    result.title,
                    result.athlete_name,
                    result.event_name,
                    result.location,
                    result.description,
                    result.category,
                    result.type,
                ]
                    .filter(Boolean)
                    .join(' ')
                    .toLowerCase();

                return haystack.includes(normalizedQuery);
            });
        }

        setFilteredResults(nextResults);
    };

    const openResult = (resultId) => {
        navigate(`/results/${resultId}`);
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

            <div className="results-section section-padding">
                <div className="container">
                    <div className="results-shell">
                        <aside className="results-sidebar">
                            <div className="results-filter-card">
                                <div className="results-filter-heading">
                                    <span className="results-filter-kicker">Browse</span>
                                    <h2>Results Archive</h2>
                                    <p>Filter competition levels, official cards, and published result records from one sidebar.</p>
                                </div>

                                <div className="results-filter-search">
                                    <label htmlFor="results-search" className="results-filter-search__label">Search archive</label>
                                    <div className="results-filter-search__box">
                                        <i className="fas fa-search"></i>
                                        <input
                                            id="results-search"
                                            type="search"
                                            value={searchQuery}
                                            onChange={(event) => setSearchQuery(event.target.value)}
                                            placeholder="Search title, athlete, event, or location"
                                        />
                                    </div>
                                </div>

                                <div className="results-filter-list">
                                    {tabs.map(tab => {
                                        const count = tab.id === 'all'
                                            ? results.length
                                            : results.filter((result) => 
                                                result.category === tab.level && result.type === tab.type
                                              ).length;

                                        return (
                                            <button
                                                key={tab.id}
                                                className={`results-filter-button ${activeTab === tab.id ? 'active' : ''}`}
                                                onClick={() => setActiveTab(tab.id)}
                                            >
                                                <span className="results-filter-icon">
                                                    <i className={`fas fa-${tab.icon}`}></i>
                                                </span>
                                                <span className="results-filter-copy">
                                                    <strong>{tab.label}</strong>
                                                </span>
                                                <span className="results-filter-count">{count}</span>
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="results-sidebar-summary">
                                    <div>
                                        <span>Total records</span>
                                        <strong>{results.length}</strong>
                                    </div>
                                    <div>
                                        <span>Visible now</span>
                                        <strong>{filteredResults.length}</strong>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        <div className="results-content">
                            <div className="results-hero mb-60">
                                <div>
                                    <span className="results-kicker">Competition Desk</span>
                                    <h2 className="title">Competition Results & Achievements</h2>
                                    <p className="desc">
                                        Browse sanctioned meet records, athlete cards, and published result images in a cleaner archive view.
                                    </p>
                                </div>

                                <div className="results-hero-meta">
                                    <div className="results-stat-card">
                                        <span>Showing</span>
                                        <strong>{filteredResults.length}</strong>
                                        <small>{activeTab === 'all' ? 'all entries' : formatResultLabel(activeTab)}</small>
                                    </div>
                                    <div className="results-stat-card">
                                        <span>With images</span>
                                        <strong>{filteredResults.filter((result) => result.images.length > 0).length}</strong>
                                        <small>preview-ready cards</small>
                                    </div>
                                </div>
                            </div>

                            {filteredResults.length === 0 ? (
                                <div className="no-results">
                                    <i className="fas fa-inbox fa-4x"></i>
                                    <h3>No Results Found</h3>
                                    <p>No results match the current filter and search.</p>
                                </div>
                            ) : (
                                <div className="results-grid">
                                    {filteredResults.map(result => (
                                        <div
                                            key={result.id}
                                            className="result-card"
                                            onClick={() => openResult(result.id)}
                                            onKeyDown={(event) => {
                                                if (event.key === 'Enter' || event.key === ' ') {
                                                    event.preventDefault();
                                                    openResult(result.id);
                                                }
                                            }}
                                            role="link"
                                            tabIndex={0}
                                        >
                                            <div className="result-image">
                                                {result.primaryImage ? (
                                                    <img src={result.primaryImage} alt={result.title} />
                                                ) : (
                                                    <div className="result-image__placeholder">
                                                        <i className="fas fa-image"></i>
                                                    </div>
                                                )}
                                                <div className="result-overlay">
                                                    <i className="fas fa-arrow-right"></i>
                                                </div>
                                                {result.images.length > 1 && (
                                                    <div className="result-image-count">
                                                        <i className="fas fa-images"></i>
                                                        <span>{result.images.length}</span>
                                                    </div>
                                                )}
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
                                                {result.location && (
                                                    <p className="event-date">
                                                        <i className="fas fa-map-marker-alt"></i> {result.location}
                                                    </p>
                                                )}
                                                <div className="result-badges">
                                                    <span className={`badge badge-${result.category}`}>
                                                        {result.category}
                                                    </span>
                                                    <span className="badge badge-type">
                                                        {result.type === 'id_card' ? 'ID Card' : 'Result'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <CtaTwo />
            <BackToTop scroll={isVisible} />
            <Footer />
        </React.Fragment>
    );
};

export default Results;
