import React, { useState, useEffect } from 'react';
import { axiosInstance, API_URL } from '../../../config/axiosConfig';
import { uploadToS3 } from '../../../utils/s3Upload';
import './DistrictsManager.css';

const DistrictsManager = () => {
    const [districts, setDistricts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingDistrict, setEditingDistrict] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [formData, setFormData] = useState({
        name: '',
        president_name: '',
        president_phone: '',
        president_email: '',
        president_photo_url: '',
        description: '',
        is_available: true
    });
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchDistricts();
    }, []);

    const fetchDistricts = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/districts/');
            setDistricts(response.data);
        } catch (error) {
            console.error('Error fetching districts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (district) => {
        setEditingDistrict(district);
        setFormData({
            name: district.name,
            president_name: district.president_name || '',
            president_phone: district.president_phone || '',
            president_email: district.president_email || '',
            president_photo_url: district.president_photo_url || '',
            description: district.description || '',
            is_available: district.is_available
        });
        setShowModal(true);
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setUploading(true);
            const imageUrl = await uploadToS3(file, 'districts');
            setFormData({ ...formData, president_photo_url: imageUrl });
            alert('Image uploaded successfully!');
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const handleRemoveImage = () => {
        setFormData({ ...formData, president_photo_url: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingDistrict) {
                // Only send non-empty fields to avoid validation errors
                const updateData = {};
                if (formData.name) updateData.name = formData.name;
                if (formData.president_name) updateData.president_name = formData.president_name;
                if (formData.president_phone) updateData.president_phone = formData.president_phone;
                if (formData.president_email) updateData.president_email = formData.president_email;
                if (formData.president_photo_url) updateData.president_photo_url = formData.president_photo_url;
                if (formData.description) updateData.description = formData.description;
                updateData.is_available = formData.is_available;
                
                await axiosInstance.put(`/districts/${editingDistrict.id}`, updateData);
            }
            setShowModal(false);
            setEditingDistrict(null);
            fetchDistricts();
            resetForm();
        } catch (error) {
            console.error('Error updating district:', error);
            alert('Failed to update district');
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            president_name: '',
            president_phone: '',
            president_email: '',
            president_photo_url: '',
            description: '',
            is_available: true
        });
    };

    const filteredDistricts = districts.filter(district => {
        const matchesSearch = district.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (district.president_name && district.president_name.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesFilter = filterStatus === 'all' ||
            (filterStatus === 'available' && district.is_available) ||
            (filterStatus === 'assigned' && !district.is_available);
        return matchesSearch && matchesFilter;
    });

    const stats = {
        total: districts.length,
        assigned: districts.filter(d => d.president_name && d.president_name.trim()).length,
        available: districts.filter(d => !d.president_name || !d.president_name.trim()).length
    };

    return (
        <div className="districts-manager">
            <div className="manager-header">
                <div>
                    <h2><i className="fas fa-map-marked-alt"></i> Districts Manager</h2>
                    <p className="subtitle">Manage all 33 Telangana districts</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid">
                <div className="stat-card total">
                    <div className="stat-icon">
                        <i className="fas fa-map"></i>
                    </div>
                    <div className="stat-content">
                        <h3>{stats.total}</h3>
                        <p>Total Districts</p>
                    </div>
                </div>
                <div className="stat-card assigned">
                    <div className="stat-icon">
                        <i className="fas fa-user-check"></i>
                    </div>
                    <div className="stat-content">
                        <h3>{stats.assigned}</h3>
                        <p>Presidents Assigned</p>
                    </div>
                </div>
                <div className="stat-card available">
                    <div className="stat-icon">
                        <i className="fas fa-user-plus"></i>
                    </div>
                    <div className="stat-content">
                        <h3>{stats.available}</h3>
                        <p>Pending Assignment</p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="filters-section">
                <div className="search-box">
                    <i className="fas fa-search"></i>
                    <input
                        type="text"
                        placeholder="Search districts or presidents..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="filter-buttons">
                    <button
                        className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
                        onClick={() => setFilterStatus('all')}
                    >
                        All Districts
                    </button>
                    <button
                        className={`filter-btn ${filterStatus === 'assigned' ? 'active' : ''}`}
                        onClick={() => setFilterStatus('assigned')}
                    >
                        Assigned
                    </button>
                    <button
                        className={`filter-btn ${filterStatus === 'available' ? 'active' : ''}`}
                        onClick={() => setFilterStatus('available')}
                    >
                        Available
                    </button>
                </div>
            </div>

            {/* Districts Grid */}
            {loading ? (
                <div className="loading-state">
                    <i className="fas fa-spinner fa-spin fa-3x"></i>
                    <p>Loading districts...</p>
                </div>
            ) : (
                <div className="districts-grid">
                    {filteredDistricts.map(district => (
                        <div key={district.id} className="district-card">
                            {district.president_photo_url && (
                                <div className="district-image">
                                    <img src={district.president_photo_url} alt={district.name} />
                                </div>
                            )}
                            <div className="district-header">
                                <h3>{district.name}</h3>
                                {district.president_name ? (
                                    <span className="status-badge assigned">
                                        <i className="fas fa-check-circle"></i> Assigned
                                    </span>
                                ) : (
                                    <span className="status-badge available">
                                        <i className="fas fa-clock"></i> Available
                                    </span>
                                )}
                            </div>
                            <div className="district-info">
                                {district.president_name ? (
                                    <>
                                        <div className="info-row">
                                            <i className="fas fa-user"></i>
                                            <span>{district.president_name}</span>
                                        </div>
                                        {district.president_phone && (
                                            <div className="info-row">
                                                <i className="fas fa-phone"></i>
                                                <span>{district.president_phone}</span>
                                            </div>
                                        )}
                                        {district.president_email && (
                                            <div className="info-row">
                                                <i className="fas fa-envelope"></i>
                                                <span>{district.president_email}</span>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="no-president">
                                        <i className="fas fa-user-slash"></i>
                                        <p>No president assigned</p>
                                    </div>
                                )}
                            </div>
                            <button
                                className="btn-edit-district"
                                onClick={() => handleEdit(district)}
                            >
                                <i className="fas fa-edit"></i>
                                {district.president_name ? 'Edit Details' : 'Assign President'}
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Edit Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>
                                <i className="fas fa-edit"></i>
                                Edit District: {formData.name}
                            </h3>
                            <button className="modal-close" onClick={() => setShowModal(false)}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="district-form">
                            <div className="form-group">
                                <label>District Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    disabled
                                    className="disabled-input"
                                />
                            </div>
                            <div className="form-group">
                                <label>President Name</label>
                                <input
                                    type="text"
                                    value={formData.president_name}
                                    onChange={(e) => setFormData({ ...formData, president_name: e.target.value })}
                                    placeholder="Enter president name"
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Enter district or president description"
                                    rows="3"
                                />
                            </div>
                            <div className="form-group">
                                <label>Contact Number</label>
                                <input
                                    type="tel"
                                    value={formData.president_phone}
                                    onChange={(e) => setFormData({ ...formData, president_phone: e.target.value })}
                                    placeholder="Enter contact number"
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={formData.president_email}
                                    onChange={(e) => setFormData({ ...formData, president_email: e.target.value })}
                                    placeholder="Enter email address"
                                />
                            </div>
                            <div className="form-group">
                                <label>District Image</label>
                                {formData.president_photo_url ? (
                                    <div className="image-preview">
                                        <img src={formData.president_photo_url} alt="District" />
                                        <button
                                            type="button"
                                            className="btn-remove-image"
                                            onClick={handleRemoveImage}
                                        >
                                            <i className="fas fa-times"></i> Remove Image
                                        </button>
                                    </div>
                                ) : (
                                    <div className="upload-area-small">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            id="district-image-upload"
                                            style={{ display: 'none' }}
                                            disabled={uploading}
                                        />
                                        <label htmlFor="district-image-upload" className="btn-upload-small">
                                            {uploading ? (
                                                <><i className="fas fa-spinner fa-spin"></i> Uploading...</>
                                            ) : (
                                                <><i className="fas fa-upload"></i> Upload Image</>
                                            )}
                                        </label>
                                    </div>
                                )}
                            </div>
                            <div className="form-group checkbox-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={formData.is_available}
                                        onChange={(e) => setFormData({ ...formData, is_available: e.target.checked })}
                                    />
                                    <span>District is available</span>
                                </label>
                            </div>
                            <div className="form-actions">
                                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn-submit">
                                    <i className="fas fa-save"></i>
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DistrictsManager;
