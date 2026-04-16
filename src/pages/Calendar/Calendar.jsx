import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackToTop from '../../components/elements/BackToTop';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import SiteBreadcrumb from '../../components/Common/Breadcumb';
import CtaTwo from '../../components/Common/CtaSection/CtaTwo';
import './Calendar.css';

const navImg1 = `${process.env.PUBLIC_URL}/images/logo wpc.png`;
const bannerbg = `${process.env.PUBLIC_URL}/images/backgrounds/page-header-bg.jpg`;
const API_URL = process.env.REACT_APP_API_URL || '/api/v1';

const Calendar = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('all');
    const [isVisible, setIsVisible] = useState(false);

    const categories = [
        { id: 'all', label: 'All Events', icon: 'calendar' },
        { id: 'district', label: 'District', icon: 'map-marker-alt' },
        { id: 'state', label: 'State', icon: 'flag' },
        { id: 'nationals', label: 'Nationals', icon: 'medal' },
        { id: 'internationals', label: 'Internationals', icon: 'globe' },
    ];

    const handleScroll = () => {
        const scrollTop = window.scrollY;
        setIsVisible(scrollTop > 300);
    };

    useEffect(() => {
        document.addEventListener("scroll", handleScroll);
        fetchEvents();
        return () => document.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        filterEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeFilter, events]);

    const fetchEvents = async () => {
        try {
            const response = await axios.get(`${API_URL}/events/`);
            setEvents(response.data);
            setFilteredEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    const filterEvents = () => {
        if (activeFilter === 'all') {
            setFilteredEvents(events.filter(e => e.is_active));
        } else {
            setFilteredEvents(events.filter(e => e.category === activeFilter && e.is_active));
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const isUpcoming = (dateString) => {
        return new Date(dateString) >= new Date();
    };

    const isPast = (dateString) => {
        return new Date(dateString) < new Date();
    };

    const upcomingEvents = filteredEvents.filter(e => isUpcoming(e.event_date));
    const pastEvents = filteredEvents.filter(e => isPast(e.event_date));

    if (loading) {
        return (
            <React.Fragment>
                <Header navImg={navImg1} parentMenu='Register' activeMenu="/calendar" />
                <div className="calendar-loading">
                    <div className="loading-spinner"></div>
                    <p>Loading events...</p>
                </div>
                <Footer />
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <Header navImg={navImg1} parentMenu='Register' activeMenu="/calendar" />

            <SiteBreadcrumb
                pageTitle="Events Calendar"
                pageName="Calendar"
                breadcrumbsImg={bannerbg}
            />

            <div className="calendar-section section-padding">
                <div className="container">
                    <div className="section-title text-center mb-60">
                        <h2 className="title">Competition Calendar</h2>
                        <p className="desc">
                            Stay updated with upcoming powerlifting competitions and events
                        </p>
                    </div>

                    {/* Category Filters */}
                    <div className="calendar-filters">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                className={`filter-button ${activeFilter === cat.id ? 'active' : ''}`}
                                onClick={() => setActiveFilter(cat.id)}
                            >
                                <i className={`fas fa-${cat.icon}`}></i>
                                <span>{cat.label}</span>
                                {cat.id !== 'all' && (
                                    <span className="count">
                                        {events.filter(e => e.category === cat.id && e.is_active).length}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Upcoming Events */}
                    {upcomingEvents.length > 0 && (
                        <div className="events-section">
                            <h3 className="section-subtitle">
                                <i className="fas fa-calendar-star"></i> Upcoming Events
                            </h3>
                            <div className="events-grid">
                                {upcomingEvents.map(event => (
                                    <div key={event.id} className="event-card upcoming">
                                        <div className="event-date-badge">
                                            <div className="date-month">{new Date(event.event_date).toLocaleDateString('en', { month: 'short' })}</div>
                                            <div className="date-day">{new Date(event.event_date).getDate()}</div>
                                            <div className="date-year">{new Date(event.event_date).getFullYear()}</div>
                                        </div>
                                        <div className="event-content">
                                            <div className="event-category-badge badge-{event.category}">
                                                {event.category}
                                            </div>
                                            <h4 className="event-title">{event.title}</h4>
                                            {event.location && (
                                                <p className="event-location">
                                                    <i className="fas fa-map-marker-alt"></i> {event.location}
                                                </p>
                                            )}
                                            {event.description && (
                                                <p className="event-description">{event.description}</p>
                                            )}
                                            {event.end_date && (
                                                <p className="event-duration">
                                                    <i className="fas fa-clock"></i>
                                                    {formatDate(event.event_date)} - {formatDate(event.end_date)}
                                                </p>
                                            )}
                                            {event.registration_link && (
                                                <a
                                                    href={event.registration_link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn-register"
                                                >
                                                    <i className="fas fa-user-plus"></i> Register Now
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Past Events */}
                    {pastEvents.length > 0 && (
                        <div className="events-section past-section">
                            <h3 className="section-subtitle">
                                <i className="fas fa-history"></i> Past Events
                            </h3>
                            <div className="events-list">
                                {pastEvents.map(event => (
                                    <div key={event.id} className="event-list-item">
                                        <div className="event-list-date">
                                            <span className="date-day">{new Date(event.event_date).getDate()}</span>
                                            <span className="date-month">{new Date(event.event_date).toLocaleDateString('en', { month: 'short' })}</span>
                                            <span className="date-year">{new Date(event.event_date).getFullYear()}</span>
                                        </div>
                                        <div className="event-list-content">
                                            <span className={`category-tag tag-${event.category}`}>{event.category}</span>
                                            <h5>{event.title}</h5>
                                            {event.location && <p><i className="fas fa-map-marker-alt"></i> {event.location}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* No Events */}
                    {filteredEvents.length === 0 && (
                        <div className="no-events">
                            <i className="fas fa-calendar-times fa-4x"></i>
                            <h3>No Events Found</h3>
                            <p>No events scheduled for this category yet.</p>
                        </div>
                    )}
                </div>
            </div>

            <CtaTwo />
            <BackToTop scroll={isVisible} />
            <Footer />
        </React.Fragment>
    );
};

export default Calendar;
