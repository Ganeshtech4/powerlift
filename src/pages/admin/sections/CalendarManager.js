import React, { useState, useEffect } from 'react';
import { axiosInstance, API_URL } from '../../../config/axiosConfig';
import './CalendarManager.css';

const CalendarManager = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [viewMode, setViewMode] = useState('all'); // all, upcoming, past
    const [formData, setFormData] = useState({
        title: '',
        event_type: 'district',
        event_date: '',
        location: '',
        description: '',
        registration_link: '',
        contact_person: '',
        contact_number: ''
    });

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/events/');
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingEvent) {
                await axiosInstance.put(`/events/${editingEvent.id}`, formData);
            } else {
                await axiosInstance.post('/events/', formData);
            }
            setShowModal(false);
            setEditingEvent(null);
            resetForm();
            fetchEvents();
        } catch (error) {
            console.error('Error saving event:', error);
            alert('Failed to save event');
        }
    };

    const handleEdit = (event) => {
        setEditingEvent(event);
        setFormData({
            title: event.title,
            event_type: event.event_type,
            event_date: event.event_date,
            location: event.location || '',
            description: event.description || '',
            registration_link: event.registration_link || '',
            contact_person: event.contact_person || '',
            contact_number: event.contact_number || ''
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this event?')) return;

        try {
            await axiosInstance.delete(`/events/${id}`);
            fetchEvents();
        } catch (error) {
            console.error('Error deleting event:', error);
            alert('Failed to delete event');
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            event_type: 'district',
            event_date: '',
            location: '',
            description: '',
            registration_link: '',
            contact_person: '',
            contact_number: ''
        });
    };

    const isUpcoming = (date) => {
        return new Date(date) >= new Date();
    };

    const filteredEvents = events.filter(event => {
        const categoryMatch = selectedCategory === 'all' || event.event_type === selectedCategory;
        const viewMatch = viewMode === 'all' ||
            (viewMode === 'upcoming' && isUpcoming(event.event_date)) ||
            (viewMode === 'past' && !isUpcoming(event.event_date));
        return categoryMatch && viewMatch;
    });

    const stats = {
        total: events.length,
        upcoming: events.filter(e => isUpcoming(e.event_date)).length,
        past: events.filter(e => !isUpcoming(e.event_date)).length
    };

    return (
        <div className="calendar-manager">
            <div className="manager-header">
                <div>
                    <h2><i className="fas fa-calendar-alt"></i> Events Calendar Manager</h2>
                    <p className="subtitle">Create and manage powerlifting events</p>
                </div>
                <button className="btn-create" onClick={() => setShowModal(true)}>
                    <i className="fas fa-plus-circle"></i>
                    Create Event
                </button>
            </div>

            {/* Stats */}
            <div className="stats-grid">
                <div className="stat-card total">
                    <div className="stat-icon">
                        <i className="fas fa-calendar"></i>
                    </div>
                    <div className="stat-content">
                        <h3>{stats.total}</h3>
                        <p>Total Events</p>
                    </div>
                </div>
                <div className="stat-card upcoming">
                    <div className="stat-icon">
                        <i className="fas fa-clock"></i>
                    </div>
                    <div className="stat-content">
                        <h3>{stats.upcoming}</h3>
                        <p>Upcoming Events</p>
                    </div>
                </div>
                <div className="stat-card past">
                    <div className="stat-icon">
                        <i className="fas fa-check-circle"></i>
                    </div>
                    <div className="stat-content">
                        <h3>{stats.past}</h3>
                        <p>Past Events</p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="filters-section">
                <div className="view-toggle">
                    <button
                        className={`toggle-btn ${viewMode === 'all' ? 'active' : ''}`}
                        onClick={() => setViewMode('all')}
                    >
                        All Events
                    </button>
                    <button
                        className={`toggle-btn ${viewMode === 'upcoming' ? 'active' : ''}`}
                        onClick={() => setViewMode('upcoming')}
                    >
                        Upcoming
                    </button>
                    <button
                        className={`toggle-btn ${viewMode === 'past' ? 'active' : ''}`}
                        onClick={() => setViewMode('past')}
                    >
                        Past
                    </button>
                </div>
                <div className="category-filters">
                    <button
                        className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                        onClick={() => setSelectedCategory('all')}
                    >
                        All Categories
                    </button>
                    <button
                        className={`filter-btn district ${selectedCategory === 'district' ? 'active' : ''}`}
                        onClick={() => setSelectedCategory('district')}
                    >
                        <i className="fas fa-map-marker-alt"></i> District
                    </button>
                    <button
                        className={`filter-btn state ${selectedCategory === 'state' ? 'active' : ''}`}
                        onClick={() => setSelectedCategory('state')}
                    >
                        <i className="fas fa-flag"></i> State
                    </button>
                    <button
                        className={`filter-btn national ${selectedCategory === 'national' ? 'active' : ''}`}
                        onClick={() => setSelectedCategory('national')}
                    >
                        <i className="fas fa-medal"></i> National
                    </button>
                    <button
                        className={`filter-btn international ${selectedCategory === 'international' ? 'active' : ''}`}
                        onClick={() => setSelectedCategory('international')}
                    >
                        <i className="fas fa-globe"></i> International
                    </button>
                </div>
            </div>

            {/* Events List */}
            {loading ? (
                <div className="loading-state">
                    <i className="fas fa-spinner fa-spin fa-3x"></i>
                    <p>Loading events...</p>
                </div>
            ) : filteredEvents.length === 0 ? (
                <div className="empty-state">
                    <i className="fas fa-calendar-plus fa-5x"></i>
                    <h3>No Events Found</h3>
                    <p>Create your first powerlifting event</p>
                    <button className="btn-create" onClick={() => setShowModal(true)}>
                        <i className="fas fa-plus-circle"></i>
                        Create Event
                    </button>
                </div>
            ) : (
                <div className="events-list">
                    {filteredEvents.map(event => (
                        <div key={event.id} className={`event-card ${!isUpcoming(event.event_date) ? 'past' : ''}`}>
                            <div className="event-date-badge">
                                <div className="month">{new Date(event.event_date).toLocaleDateString('en-US', { month: 'short' })}</div>
                                <div className="day">{new Date(event.event_date).getDate()}</div>
                                <div className="year">{new Date(event.event_date).getFullYear()}</div>
                            </div>
                            <div className="event-content">
                                <div className="event-header">
                                    <div>
                                        <h3>{event.title}</h3>
                                        <span className={`type-badge ${event.event_type}`}>
                                            {event.event_type === 'district' && <i className="fas fa-map-marker-alt"></i>}
                                            {event.event_type === 'state' && <i className="fas fa-flag"></i>}
                                            {event.event_type === 'national' && <i className="fas fa-medal"></i>}
                                            {event.event_type === 'international' && <i className="fas fa-globe"></i>}
                                            {event.event_type}
                                        </span>
                                    </div>
                                    {!isUpcoming(event.event_date) && (
                                        <span className="past-badge">
                                            <i className="fas fa-check"></i> Completed
                                        </span>
                                    )}
                                </div>
                                {event.description && <p className="description">{event.description}</p>}
                                <div className="event-details">
                                    {event.location && (
                                        <div className="detail-item">
                                            <i className="fas fa-map-marker-alt"></i>
                                            <span>{event.location}</span>
                                        </div>
                                    )}
                                    {event.contact_person && (
                                        <div className="detail-item">
                                            <i className="fas fa-user"></i>
                                            <span>{event.contact_person}</span>
                                        </div>
                                    )}
                                    {event.contact_number && (
                                        <div className="detail-item">
                                            <i className="fas fa-phone"></i>
                                            <span>{event.contact_number}</span>
                                        </div>
                                    )}
                                    {event.registration_link && (
                                        <div className="detail-item">
                                            <i className="fas fa-link"></i>
                                            <a href={event.registration_link} target="_blank" rel="noopener noreferrer">
                                                Registration Link
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="event-actions">
                                <button className="btn-edit" onClick={() => handleEdit(event)}>
                                    <i className="fas fa-edit"></i>
                                    Edit
                                </button>
                                <button className="btn-delete" onClick={() => handleDelete(event.id)}>
                                    <i className="fas fa-trash"></i>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Create/Edit Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>
                                <i className="fas fa-calendar-plus"></i>
                                {editingEvent ? 'Edit Event' : 'Create New Event'}
                            </h3>
                            <button className="modal-close" onClick={() => setShowModal(false)}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="event-form">
                            <div className="form-group">
                                <label>Event Title *</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="e.g., District Championship 2025"
                                    required
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Event Type *</label>
                                    <select
                                        value={formData.event_type}
                                        onChange={(e) => setFormData({ ...formData, event_type: e.target.value })}
                                        required
                                    >
                                        <option value="district">District</option>
                                        <option value="state">State</option>
                                        <option value="national">National</option>
                                        <option value="international">International</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Event Date *</label>
                                    <input
                                        type="date"
                                        value={formData.event_date}
                                        onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Location</label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    placeholder="e.g., Hyderabad"
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Enter event description..."
                                    rows="3"
                                />
                            </div>
                            <div className="form-group">
                                <label>Registration Link</label>
                                <input
                                    type="url"
                                    value={formData.registration_link}
                                    onChange={(e) => setFormData({ ...formData, registration_link: e.target.value })}
                                    placeholder="https://..."
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Contact Person</label>
                                    <input
                                        type="text"
                                        value={formData.contact_person}
                                        onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })}
                                        placeholder="Contact person name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Contact Number</label>
                                    <input
                                        type="tel"
                                        value={formData.contact_number}
                                        onChange={(e) => setFormData({ ...formData, contact_number: e.target.value })}
                                        placeholder="Phone number"
                                    />
                                </div>
                            </div>
                            <div className="form-actions">
                                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn-submit">
                                    <i className="fas fa-save"></i>
                                    {editingEvent ? 'Update Event' : 'Create Event'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CalendarManager;
