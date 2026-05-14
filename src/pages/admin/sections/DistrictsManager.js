import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../../config/axiosConfig';
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
        certificate_url: '',
        display_order: 999,
        is_available: true
    });
    const [uploading, setUploading] = useState(false);
    const [uploadingCert, setUploadingCert] = useState(false);

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
            certificate_url: district.certificate_url || '',
            display_order: district.display_order ?? 999,
            is_available: district.is_available
        });
        setShowModal(true);
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setUploading(true);
            const result = await uploadToS3(file, 'districts');
            const imageUrl = result.url || result;
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

    const handleCertificateUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setUploadingCert(true);
            const result = await uploadToS3(file, 'districts/certificates');
            const certUrl = result.url || result;
            setFormData({ ...formData, certificate_url: certUrl });
            alert('Certificate uploaded successfully!');
        } catch (error) {
            console.error('Error uploading certificate:', error);
            alert('Failed to upload certificate');
        } finally {
            setUploadingCert(false);
        }
    };

    const handleRemoveCertificate = () => {
        setFormData({ ...formData, certificate_url: '' });
    };

    const handleClearPresident = async () => {
        if (!window.confirm('Are you sure you want to clear this president assignment? This will make the district available again.')) {
            return;
        }
        try {
            const updateData = {
                president_name: null,
                president_phone: null,
                president_email: null,
                president_photo_url: null,
                description: null,
                is_available: true
            };
            await axiosInstance.put(`/districts/${editingDistrict.id}`, updateData);
            setShowModal(false);
            setEditingDistrict(null);
            fetchDistricts();
            resetForm();
            alert('President assignment cleared successfully!');
        } catch (error) {
            console.error('Error clearing president:', error);
            alert('Failed to clear president details');
        }
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
                if (formData.certificate_url) updateData.certificate_url = formData.certificate_url;
                updateData.display_order = Number(formData.display_order ?? 999);
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
            certificate_url: '',
            display_order: 999,
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
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                                    {district.president_name ? (
                                        <span className="status-badge assigned">
                                            <i className="fas fa-check-circle"></i> Assigned
                                        </span>
                                    ) : (
                                        <span className="status-badge available">
                                            <i className="fas fa-clock"></i> Available
                                        </span>
                                    )}
                                    {district.certificate_url && (
                                        <span className="status-badge" style={{ background: '#7c3aed', border: 'none' }}>
                                            <i className="fas fa-certificate"></i> Certificate
                                        </span>
                                    )}
                                    {district.display_order !== undefined && district.display_order !== 999 && (
                                        <span className="status-badge" style={{ background: '#f59e0b', border: 'none' }}>
                                            <i className="fas fa-sort-numeric-down"></i> Order: {district.display_order}
                                        </span>
                                    )}
                                </div>
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
                    <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '650px', background: '#fff', borderRadius: '16px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
                        <button className="modal-close" onClick={() => setShowModal(false)} style={{ background: '#f3f4f6', border: 'none', color: '#6b7280' }}>
                            <i className="fas fa-times"></i>
                        </button>

                        <div style={{ marginBottom: '2rem', paddingRight: '2rem' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)', padding: '0.75rem 1.25rem', borderRadius: '12px', marginBottom: '1rem' }}>
                                <i className="fas fa-map-marker-alt" style={{ fontSize: '1.25rem', color: '#3b82f6' }}></i>
                                <span style={{ fontWeight: '600', color: '#1e40af', fontSize: '0.9rem' }}>{formData.name}</span>
                            </div>
                            <h3 style={{ fontSize: '1.875rem', margin: '0 0 0.5rem', color: '#111827', fontWeight: '700', letterSpacing: '-0.025em' }}>
                                {editingDistrict?.president_name ? 'Edit District President' : 'Assign District President'}
                            </h3>
                            <p style={{ margin: 0, color: '#6b7280', fontSize: '0.95rem' }}>Manage president details and district information</p>
                        </div>

                        <form onSubmit={handleSubmit} className="district-form" style={{ display: 'grid', gap: '1.25rem' }}>
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
                            </div>                            <div className="form-group">
                                <label>District Certificate (PDF)</label>
                                {formData.certificate_url ? (
                                    <div className="image-preview">
                                        <div style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <i className="fas fa-file-pdf" style={{ fontSize: '2rem', color: '#d32f2f' }}></i>
                                            <div style={{ flex: 1 }}>
                                                <a href={formData.certificate_url} target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2', textDecoration: 'none' }}>
                                                    View Certificate <i className="fas fa-external-link-alt"></i>
                                                </a>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            className="btn-remove-image"
                                            onClick={handleRemoveCertificate}
                                            style={{ marginTop: '0.5rem' }}
                                        >
                                            <i className="fas fa-times"></i> Remove Certificate
                                        </button>
                                    </div>
                                ) : (
                                    <div className="upload-area-small">
                                        <input
                                            type="file"
                                            accept="application/pdf"
                                            onChange={handleCertificateUpload}
                                            id="district-cert-upload"
                                            style={{ display: 'none' }}
                                            disabled={uploadingCert}
                                        />
                                        <label htmlFor="district-cert-upload" className="btn-upload-small">
                                            {uploadingCert ? (
                                                <><i className="fas fa-spinner fa-spin"></i> Uploading...</>
                                            ) : (
                                                <><i className="fas fa-upload"></i> Upload Certificate</>
                                            )}
                                        </label>
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <label>Display Order</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={formData.display_order}
                                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 999 })}
                                    placeholder="Lower number = appears first (default: 999)"
                                />
                                <small style={{ color: '#666', fontSize: '0.85rem', marginTop: '0.25rem', display: 'block' }}>
                                    Lower numbers appear first. Districts with same order are sorted alphabetically.
                                </small>
                            </div>                            <div className="form-group checkbox-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={formData.is_available}
                                        onChange={(e) => setFormData({ ...formData, is_available: e.target.checked })}
                                    />
                                    <span>District is available</span>
                                </label>
                            </div>
                            <div className="form-actions" style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e5e7eb' }}>
                                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '0.75rem 1.5rem', background: '#f3f4f6', color: '#374151', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}>
                                    Cancel
                                </button>
                                {editingDistrict?.president_name && (
                                    <button 
                                        type="button" 
                                        onClick={handleClearPresident}
                                        style={{ flex: 1, padding: '0.75rem 1.5rem', background: 'linear-gradient(135deg, #fca5a5 0%, #ef4444 100%)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                                    >
                                        <i className="fas fa-user-times"></i>
                                        Clear Assignment
                                    </button>
                                )}
                                <button type="submit" className="btn-submit" style={{ flex: 1, padding: '0.75rem 1.5rem', background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
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
