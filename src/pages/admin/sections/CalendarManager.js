import React from 'react';

const CalendarManager = () => {
    return (
        <div className="manager-section">
            <div className="section-header">
                <h2><i className="fas fa-calendar"></i> Events Calendar Manager</h2>
                <button className="btn-primary">
                    <i className="fas fa-plus-circle"></i> Create Event
                </button>
            </div>

            <div className="manager-content">
                <p className="info-text">
                    <i className="fas fa-info-circle"></i>
                    Create and manage powerlifting competitions and events
                </p>

                <div className="event-categories">
                    <div className="category-chip district">
                        <i className="fas fa-map-marker-alt"></i> District
                    </div>
                    <div className="category-chip state">
                        <i className="fas fa-flag"></i> State
                    </div>
                    <div className="category-chip nationals">
                        <i className="fas fa-medal"></i> Nationals
                    </div>
                    <div className="category-chip internationals">
                        <i className="fas fa-globe"></i> Internationals
                    </div>
                </div>

                <div className="placeholder-content">
                    <i className="fas fa-calendar-alt fa-5x"></i>
                    <h3>Calendar Management</h3>
                    <p>Create events with dates, locations, and registration links.</p>
                    <p>Events automatically appear in Upcoming/Past sections based on dates.</p>
                    <p>Use the Events API to create and manage calendar entries.</p>
                </div>
            </div>
        </div>
    );
};

export default CalendarManager;
