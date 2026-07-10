import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../../config/axiosConfig';
import './GalleryManager.css';

const getVtdCategory = (vtd) => (vtd?.category || 'uncategorized').toLowerCase();

const formatCategoryLabel = (category) => {
    if (!category) {
        return 'Uncategorized';
    }

    return category
        .split(/[-_\s]+/)
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
};

const resolveVtdImage = (vtd) => {
    if (vtd?.thumbnail_url) {
        return vtd.thumbnail_url;
    }

    if (Array.isArray(vtd?.images) && vtd.images.length > 0) {
        return vtd.images[0];
    }

    return null;
};

const getVtdExcerpt = (vtd) => {
    const excerpt = vtd?.excerpt?.trim();
    if (excerpt) {
        return excerpt;
    }

    const content = vtd?.content?.trim();
    if (!content) {
        return 'No summary available for this item yet.';
    }

    return content.length > 100 ? `${content.substring(0, 100)}...` : content;
};

const VtdManager = () => {
    const navigate = useNavigate();
    const [vtds, setVtds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDetailView, setShowDetailView] = useState(false);
    const [viewingVtd, setViewingVtd] = useState(null);
    const [activeCategory, setActiveCategory] = useState('all');

    useEffect(() => {
        fetchVtds();
    }, []);

    const fetchVtds = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/vtd-books/');
            setVtds(response.data);
        } catch (error) {
            console.error('Error fetching VTD items:', error);
            alert('Failed to load VTD items');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (vtd) => {
        navigate(`/admin/vtd-books/edit/${vtd.id}`);
    };

    const handleCreateNew = () => {
        navigate('/admin/vtd-books/new');
    };

    const handleViewDetails = (vtd) => {
        setViewingVtd(vtd);
        setShowDetailView(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;

        try {
            await axiosInstance.delete(`/vtd-books/${id}`);
            alert('Item deleted successfully!');
            fetchVtds();
        } catch (error) {
            console.error('Error deleting VTD item:', error);
            alert('Failed to delete item');
        }
    };

    const handleTogglePublish = async (vtd, e) => {
        e.stopPropagation();
        const newStatus = !vtd.is_published;
        
        try {
            // Only send the is_published field to avoid validation errors
            await axiosInstance.put(`/vtd-books/${vtd.id}`, {
                is_published: newStatus
            });
            alert(newStatus ? 'Item published successfully!' : 'Item unpublished successfully!');
            fetchVtds();
        } catch (error) {
            console.error('Error updating publish status:', error);
            console.error('Error details:', error.response?.data);
            alert('Failed to update publish status');
        }
    };

    const categories = ['all', ...new Set(vtds.map((vtd) => getVtdCategory(vtd)))];

    const filteredVtds = activeCategory === 'all' 
        ? vtds 
        : vtds.filter(vtd => getVtdCategory(vtd) === activeCategory);

    return (
        <div className="gallery-manager">
            <div className="manager-header">
                <h2><i className="fas fa-images"></i> VTD Resources Manager</h2>
                <button className="btn-create" onClick={handleCreateNew}>
                    <i className="fas fa-plus"></i> Create New Item
                </button>
            </div>

            <div className="category-filters">
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                        onClick={() => setActiveCategory(cat)}
                    >
                        {cat === 'all' ? 'All' : formatCategoryLabel(cat)}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="loading-state">
                    <i className="fas fa-spinner fa-spin fa-3x"></i>
                    <p>Loading VTD items...</p>
                </div>
            ) : filteredVtds.length === 0 ? (
                <div className="empty-state">
                    <i className="fas fa-images fa-5x"></i>
                    <h3>No VTD items yet</h3>
                    <p>Create your first VTD item to get started</p>
                </div>
            ) : (
                <div className="posts-grid">
                    {filteredVtds.map(vtd => {
                        const previewImage = resolveVtdImage(vtd);

                        return (
                        <div 
                            key={vtd.id} 
                            className="post-card"
                            onClick={() => handleViewDetails(vtd)}
                        >
                            <div className="post-image">
                                {previewImage ? (
                                    <img src={previewImage} alt={vtd.title} />
                                ) : (
                                    <div className="post-image-placeholder">
                                        <i className="fas fa-image"></i>
                                        <span>No image uploaded</span>
                                    </div>
                                )}
                                    <span className="category-badge">{vtd.category}</span>
                                    <span className={`publish-badge ${vtd.is_published ? 'published' : 'draft'}`}>
                                        {vtd.is_published ? 'Published' : 'Draft'}
                                    </span>
                            </div>
                            <div className="post-content">
                                <h3>{vtd.title}</h3>
                                <p className="post-excerpt">{getVtdExcerpt(vtd)}</p>
                                <div className="post-meta">
                                    <span><i className="far fa-calendar"></i> {new Date(vtd.created_at).toLocaleDateString()}</span>
                                    <span><i className="fas fa-user"></i> {vtd.author}</span>
                                    <span><i className="fas fa-images"></i> {Array.isArray(vtd.images) ? vtd.images.length : 0}</span>
                                </div>
                                <div className="post-actions" onClick={(e) => e.stopPropagation()}>
                                    <button 
                                        className={`btn-toggle-publish ${vtd.is_published ? 'unpublish' : 'publish'}`}
                                        onClick={(e) => handleTogglePublish(vtd, e)}
                                        title={vtd.is_published ? 'Unpublish' : 'Publish'}
                                    >
                                        <i className={`fas ${vtd.is_published ? 'fa-eye-slash' : 'fa-check-circle'}`}></i>
                                        {vtd.is_published ? 'Unpublish' : 'Publish'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );})}
                </div>
            )}

            {/* Item Detail View */}
            {showDetailView && viewingVtd && (
                <div className="modal-overlay" onClick={() => setShowDetailView(false)}>
                    <div className="modal-content detail-view" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>{viewingVtd.title}</h3>
                            <button className="modal-close" onClick={() => setShowDetailView(false)}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        
                        <div className="detail-content">
                            <div className="detail-meta">
                                <span className="detail-category">{viewingVtd.category}</span>
                                <span><i className="far fa-calendar"></i> {new Date(viewingVtd.created_at).toLocaleDateString()}</span>
                                <span><i className="fas fa-user"></i> {viewingVtd.author}</span>
                                <span><i className="fas fa-eye"></i> {viewingVtd.views || 0} views</span>
                            </div>

                            <div className="detail-excerpt">
                                {viewingVtd.excerpt}
                            </div>

                            <div className="detail-text">
                                <p>{viewingVtd.content}</p>
                            </div>

                            <div className="detail-actions">
                                <button 
                                    className={`btn-toggle-publish ${viewingVtd.is_published ? 'unpublish' : 'publish'}`}
                                    onClick={(e) => { handleTogglePublish(viewingVtd, e); setShowDetailView(false); }}
                                >
                                    <i className={`fas ${viewingVtd.is_published ? 'fa-eye-slash' : 'fa-check-circle'}`}></i>
                                    {viewingVtd.is_published ? 'Unpublish' : 'Publish'}
                                </button>
                                <button className="btn-edit" onClick={() => handleEdit(viewingVtd)}>
                                    <i className="fas fa-edit"></i> Edit Item
                                </button>
                                <button className="btn-delete" onClick={() => { setShowDetailView(false); handleDelete(viewingVtd.id); }}>
                                    <i className="fas fa-trash"></i> Delete Item
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VtdManager;
