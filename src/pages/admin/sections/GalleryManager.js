import React from 'react';

const GalleryManager = () => {
    return (
        <div className="manager-section">
            <div className="section-header">
                <h2><i className="fas fa-images"></i> Gallery Posts Manager</h2>
                <button className="btn-primary">
                    <i className="fas fa-plus"></i> New Post
                </button>
            </div>

            <div className="manager-content">
                <p className="info-text">
                    <i className="fas fa-info-circle"></i>
                    Manage gallery posts categorized as District, State, Nationals, or Internationals
                </p>

                <div className="category-tabs">
                    <button className="tab active">All</button>
                    <button className="tab">District</button>
                    <button className="tab">State</button>
                    <button className="tab">Nationals</button>
                    <button className="tab">Internationals</button>
                </div>

                <div className="placeholder-content">
                    <i className="fas fa-images fa-5x"></i>
                    <h3>Gallery Management</h3>
                    <p>Use the existing blog creation system to create new gallery posts.</p>
                    <p>Posts are automatically displayed on the Gallery page based on their category.</p>
                </div>
            </div>
        </div>
    );
};

export default GalleryManager;
