import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../../config/axiosConfig';
import './DistrictEnquiriesManager.css';

const DistrictEnquiriesManager = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedEnquiry, setSelectedEnquiry] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    useEffect(() => {
        fetchEnquiries();
    }, []);

    const fetchEnquiries = async () => {
        try {
            const response = await axiosInstance.get('/districts/enquiries');
            setEnquiries(response.data);
        } catch (error) {
            console.error('Error fetching enquiries:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (enquiryId, newStatus) => {
        try {
            await axiosInstance.patch(`/districts/enquiries/${enquiryId}/status`, {
                status: newStatus
            });
            fetchEnquiries();
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status');
        }
    };

    const handleDelete = async (enquiryId) => {
        if (!window.confirm('Are you sure you want to delete this enquiry?')) return;
        
        try {
            await axiosInstance.delete(`/districts/enquiries/${enquiryId}`);
            fetchEnquiries();
        } catch (error) {
            console.error('Error deleting enquiry:', error);
            alert('Failed to delete enquiry');
        }
    };

    const handleViewDetails = (enquiry) => {
        setSelectedEnquiry(enquiry);
        setShowDetailsModal(true);
        
        // Mark as read if unread
        if (enquiry.status === 'unread') {
            handleStatusChange(enquiry.id, 'read');
        }
    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'unread': return 'badge-unread';
            case 'read': return 'badge-read';
            case 'replied': return 'badge-replied';
            default: return '';
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const filteredEnquiries = enquiries.filter(enquiry => {
        if (filterStatus === 'all') return true;
        return enquiry.status === filterStatus;
    });

    if (loading) {
        return (
            <div className="enquiries-manager">
                <div className="loading">Loading enquiries...</div>
            </div>
        );
    }

    return (
        <div className="enquiries-manager">
            <div className="enquiries-header">
                <div>
                    <h2>District Enquiries</h2>
                    <p>Manage enquiries from website visitors about district positions</p>
                </div>
                <div className="enquiries-stats">
                    <div className="stat-card">
                        <span className="stat-label">Total</span>
                        <span className="stat-value">{enquiries.length}</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-label">Unread</span>
                        <span className="stat-value unread">
                            {enquiries.filter(e => e.status === 'unread').length}
                        </span>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="enquiries-filters">
                <div className="filter-group">
                    <label>Filter by Status:</label>
                    <select 
                        value={filterStatus} 
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="all">All Enquiries</option>
                        <option value="unread">Unread</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                    </select>
                </div>
            </div>

            {/* Enquiries Table */}
            {filteredEnquiries.length === 0 ? (
                <div className="no-enquiries">
                    <p>No enquiries found.</p>
                </div>
            ) : (
                <div className="enquiries-table-container">
                    <table className="enquiries-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>District</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEnquiries.map(enquiry => (
                                <tr key={enquiry.id} className={enquiry.status === 'unread' ? 'unread-row' : ''}>
                                    <td>{formatDate(enquiry.created_at)}</td>
                                    <td><strong>{enquiry.district_name}</strong></td>
                                    <td>{enquiry.name}</td>
                                    <td>
                                        <a href={`mailto:${enquiry.email}`}>{enquiry.email}</a>
                                    </td>
                                    <td>
                                        <a href={`tel:${enquiry.phone}`}>{enquiry.phone}</a>
                                    </td>
                                    <td>
                                        <select
                                            value={enquiry.status}
                                            onChange={(e) => handleStatusChange(enquiry.id, e.target.value)}
                                            className={`status-select ${getStatusBadgeClass(enquiry.status)}`}
                                        >
                                            <option value="unread">Unread</option>
                                            <option value="read">Read</option>
                                            <option value="replied">Replied</option>
                                        </select>
                                    </td>
                                    <td className="actions-cell">
                                        <button 
                                            className="btn-view"
                                            onClick={() => handleViewDetails(enquiry)}
                                            title="View Details"
                                        >
                                            <i className="fas fa-eye"></i>
                                        </button>
                                        <button 
                                            className="btn-delete"
                                            onClick={() => handleDelete(enquiry.id)}
                                            title="Delete"
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Details Modal */}
            {showDetailsModal && selectedEnquiry && (
                <div className="modal-overlay" onClick={() => setShowDetailsModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setShowDetailsModal(false)}>×</button>
                        
                        <h2>Enquiry Details</h2>
                        
                        <div className="enquiry-details">
                            <div className="detail-row">
                                <span className="detail-label">District:</span>
                                <span className="detail-value">{selectedEnquiry.district_name}</span>
                            </div>
                            
                            <div className="detail-row">
                                <span className="detail-label">Date:</span>
                                <span className="detail-value">{formatDate(selectedEnquiry.created_at)}</span>
                            </div>
                            
                            <div className="detail-row">
                                <span className="detail-label">Name:</span>
                                <span className="detail-value">{selectedEnquiry.name}</span>
                            </div>
                            
                            <div className="detail-row">
                                <span className="detail-label">Email:</span>
                                <span className="detail-value">
                                    <a href={`mailto:${selectedEnquiry.email}`}>{selectedEnquiry.email}</a>
                                </span>
                            </div>
                            
                            <div className="detail-row">
                                <span className="detail-label">Phone:</span>
                                <span className="detail-value">
                                    <a href={`tel:${selectedEnquiry.phone}`}>{selectedEnquiry.phone}</a>
                                </span>
                            </div>
                            
                            <div className="detail-row">
                                <span className="detail-label">Status:</span>
                                <span className="detail-value">
                                    <span className={`badge ${getStatusBadgeClass(selectedEnquiry.status)}`}>
                                        {selectedEnquiry.status}
                                    </span>
                                </span>
                            </div>
                            
                            <div className="detail-message">
                                <span className="detail-label">Message:</span>
                                <div className="message-content">
                                    {selectedEnquiry.message}
                                </div>
                            </div>
                        </div>
                        
                        <div className="modal-actions">
                            <a 
                                href={`mailto:${selectedEnquiry.email}?subject=Re: District Enquiry - ${selectedEnquiry.district_name}`}
                                className="btn-reply"
                                onClick={() => handleStatusChange(selectedEnquiry.id, 'replied')}
                            >
                                <i className="fas fa-reply"></i> Reply via Email
                            </a>
                            <button 
                                className="btn-close"
                                onClick={() => setShowDetailsModal(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DistrictEnquiriesManager;
