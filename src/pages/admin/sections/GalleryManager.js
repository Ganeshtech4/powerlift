import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance, API_URL } from '../../../config/axiosConfig';
import './GalleryManager.css';

const GalleryManager = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDetailView, setShowDetailView] = useState(false);
    const [viewingBlog, setViewingBlog] = useState(null);
    const [activeCategory, setActiveCategory] = useState('all');

    const categories = ['all', 'District', 'State', 'Nationals', 'Internationals'];

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/blogs/');
            setBlogs(response.data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
            alert('Failed to load blog posts');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (blog) => {
        navigate(`/admin/blog-editor/${blog.id}`);
    };

    const handleCreateNew = () => {
        navigate('/admin/blog-editor');
    };

    const handleViewDetails = (blog) => {
        setViewingBlog(blog);
        setShowDetailView(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this post?')) return;

        try {
            await axiosInstance.delete(`/blogs/${id}`);
            alert('Post deleted successfully!');
            fetchBlogs();
        } catch (error) {
            console.error('Error deleting blog:', error);
            alert('Failed to delete post');
        }
    };

    const handleTogglePublish = async (blog, e) => {
        e.stopPropagation();
        const newStatus = !blog.is_published;
        
        try {
            // Only send the is_published field to avoid validation errors
            await axiosInstance.put(`/blogs/${blog.id}`, {
                is_published: newStatus
            });
            alert(newStatus ? 'Post published successfully!' : 'Post unpublished successfully!');
            fetchBlogs();
        } catch (error) {
            console.error('Error updating publish status:', error);
            console.error('Error details:', error.response?.data);
            alert('Failed to update publish status');
        }
    };

    const filteredBlogs = activeCategory === 'all' 
        ? blogs 
        : blogs.filter(blog => blog.category === activeCategory);

    return (
        <div className="gallery-manager">
            <div className="manager-header">
                <h2><i className="fas fa-images"></i> Gallery Posts Manager</h2>
                <button className="btn-create" onClick={handleCreateNew}>
                    <i className="fas fa-plus"></i> Create New Post
                </button>
            </div>

            <div className="category-filters">
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                        onClick={() => setActiveCategory(cat)}
                    >
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="loading-state">
                    <i className="fas fa-spinner fa-spin fa-3x"></i>
                    <p>Loading posts...</p>
                </div>
            ) : filteredBlogs.length === 0 ? (
                <div className="empty-state">
                    <i className="fas fa-images fa-5x"></i>
                    <h3>No posts yet</h3>
                    <p>Create your first gallery post to get started</p>
                </div>
            ) : (
                <div className="posts-grid">
                    {filteredBlogs.map(blog => (
                        <div 
                            key={blog.id} 
                            className="post-card"
                            onClick={() => handleViewDetails(blog)}
                        >
                            {blog.thumbnail_url && (
                                <div className="post-image">
                                    <img src={blog.thumbnail_url} alt={blog.title} />
                                    <span className="category-badge">{blog.category}</span>
                                    <span className={`publish-badge ${blog.is_published ? 'published' : 'draft'}`}>
                                        {blog.is_published ? 'Published' : 'Draft'}
                                    </span>
                                </div>
                            )}
                            <div className="post-content">
                                <h3>{blog.title}</h3>
                                <p className="post-excerpt">{blog.excerpt || blog.content?.substring(0, 100)}...</p>
                                <div className="post-meta">
                                    <span><i className="far fa-calendar"></i> {new Date(blog.created_at).toLocaleDateString()}</span>
                                    <span><i className="fas fa-user"></i> {blog.author}</span>
                                </div>
                                <div className="post-actions" onClick={(e) => e.stopPropagation()}>
                                    <button 
                                        className={`btn-toggle-publish ${blog.is_published ? 'unpublish' : 'publish'}`}
                                        onClick={(e) => handleTogglePublish(blog, e)}
                                        title={blog.is_published ? 'Unpublish' : 'Publish'}
                                    >
                                        <i className={`fas ${blog.is_published ? 'fa-eye-slash' : 'fa-check-circle'}`}></i>
                                        {blog.is_published ? 'Unpublish' : 'Publish'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Post Detail View */}
            {showDetailView && viewingBlog && (
                <div className="modal-overlay" onClick={() => setShowDetailView(false)}>
                    <div className="modal-content detail-view" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>{viewingBlog.title}</h3>
                            <button className="modal-close" onClick={() => setShowDetailView(false)}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        
                        <div className="detail-content">
                            <div className="detail-meta">
                                <span className="detail-category">{viewingBlog.category}</span>
                                <span><i className="far fa-calendar"></i> {new Date(viewingBlog.created_at).toLocaleDateString()}</span>
                                <span><i className="fas fa-user"></i> {viewingBlog.author}</span>
                                <span><i className="fas fa-eye"></i> {viewingBlog.views || 0} views</span>
                            </div>

                            <div className="detail-excerpt">
                                {viewingBlog.excerpt}
                            </div>

                            <div className="detail-text">
                                <p>{viewingBlog.content}</p>
                            </div>

                            <div className="detail-actions">
                                <button 
                                    className={`btn-toggle-publish ${viewingBlog.is_published ? 'unpublish' : 'publish'}`}
                                    onClick={(e) => { handleTogglePublish(viewingBlog, e); setShowDetailView(false); }}
                                >
                                    <i className={`fas ${viewingBlog.is_published ? 'fa-eye-slash' : 'fa-check-circle'}`}></i>
                                    {viewingBlog.is_published ? 'Unpublish' : 'Publish'}
                                </button>
                                <button className="btn-edit" onClick={() => handleEdit(viewingBlog)}>
                                    <i className="fas fa-edit"></i> Edit Post
                                </button>
                                <button className="btn-delete" onClick={() => { setShowDetailView(false); handleDelete(viewingBlog.id); }}>
                                    <i className="fas fa-trash"></i> Delete Post
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GalleryManager;
