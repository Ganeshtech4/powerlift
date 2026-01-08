import React from 'react';

const ResultsManager = () => {
    return (
        <div className="manager-section">
            <div className="section-header">
                <h2><i className="fas fa-trophy"></i> Results & ID Cards Manager</h2>
                <button className="btn-primary">
                    <i className="fas fa-upload"></i> Upload Result
                </button>
            </div>

            <div className="manager-content">
                <p className="info-text">
                    <i className="fas fa-info-circle"></i>
                    Upload and manage competition results and member ID cards
                </p>

                <div className="upload-types">
                    <div className="upload-card">
                        <i className="fas fa-trophy"></i>
                        <h4>Competition Results</h4>
                        <p>Upload result images from District, State, or National competitions</p>
                        <button className="btn-upload">Upload Results</button>
                    </div>
                    <div className="upload-card">
                        <i className="fas fa-id-card"></i>
                        <h4>Member ID Cards</h4>
                        <p>Upload scanned ID cards for registered members</p>
                        <button className="btn-upload">Upload ID Card</button>
                    </div>
                </div>

                <div className="placeholder-content">
                    <i className="fas fa-trophy fa-5x"></i>
                    <h3>Results Management</h3>
                    <p>Results are categorized by competition level and type.</p>
                    <p>Use the Results API to upload images and manage result data.</p>
                </div>
            </div>
        </div>
    );
};

export default ResultsManager;
