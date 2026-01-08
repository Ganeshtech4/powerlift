import React from 'react';

const DistrictsManager = () => {
    return (
        <div className="manager-section">
            <div className="section-header">
                <h2><i className="fas fa-map-marked-alt"></i> Districts Manager</h2>
                <button className="btn-primary">
                    <i className="fas fa-edit"></i> Edit District
                </button>
            </div>

            <div className="manager-content">
                <p className="info-text">
                    <i className="fas fa-info-circle"></i>
                    Manage all 33 Telangana districts and assign presidents
                </p>

                <div className="stats-row">
                    <div className="mini-stat">
                        <span className="stat-number">33</span>
                        <span className="stat-label">Total Districts</span>
                    </div>
                    <div className="mini-stat">
                        <span className="stat-number available">15</span>
                        <span className="stat-label">Available</span>
                    </div>
                    <div className="mini-stat">
                        <span className="stat-number assigned">18</span>
                        <span className="stat-label">Assigned</span>
                    </div>
                </div>

                <div className="placeholder-content">
                    <i className="fas fa-map-marked-alt fa-5x"></i>
                    <h3>Districts Management</h3>
                    <p>All 33 Telangana districts are initialized and can be managed via API.</p>
                    <p>Use the Districts API to update president information, contact details, and availability status.</p>
                </div>
            </div>
        </div>
    );
};

export default DistrictsManager;
