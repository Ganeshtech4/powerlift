import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../../config/axiosConfig';
import { uploadToS3 } from '../../../utils/s3Upload';
import './FormsManager.css';

const FormsManager = () => {
    const [forms, setForms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingForm, setEditingForm] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [filterCategory, setFilterCategory] = useState('all');
    const [filterType, setFilterType] = useState('all');

    const [formData, setFormData] = useState({
        category: 'state',
        form_type: 'registration',
        title: '',
        description: '',
        file_url: '',
        file_name: '',
        display_order: 999
    });

    const categories = [
        { value: 'state', label: 'State Level' },
        { value: 'district', label: 'District Level' },
        { value: 'national', label: 'National Level' },
        { value: 'international', label: 'International Level' }
    ];

    const formTypes = [
        { value: 'registration', label: 'Registration Form' },
        { value: 'id_card', label: 'ID Card Form' }
    ];

    useEffect(() => {
        fetchForms();
    }, []);

    const fetchForms = async () => {
        try {
            const response = await axiosInstance.get('/forms/');
            setForms(response.data);
        } catch (error) {
            console.error('Error fetching forms:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = () => {
        setEditingForm(null);
        resetForm();
        setShowModal(true);
    };

    const handleEdit = (form) => {
        setEditingForm(form);
        setFormData({
            category: form.category,
            form_type: form.form_type,
            title: form.title,
            description: form.description || '',
            file_url: form.file_url,
            file_name: form.file_name,
            display_order: form.display_order
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this form?')) return;
        
        try {
            await axiosInstance.delete(`/forms/${id}`);
            fetchForms();
        } catch (error) {
            console.error('Error deleting form:', error);
            alert('Failed to delete form');
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.name.toLowerCase().endsWith('.pdf')) {
            alert('Only PDF files are allowed');
            return;
        }

        // Validate file size (max 10MB)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            alert('File size must be less than 10MB');
            return;
        }

        try {
            setUploading(true);
            const result = await uploadToS3(file, 'forms');
            setFormData({ 
                ...formData, 
                file_url: result.url,
                file_name: file.name
            });
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Failed to upload file: ' + (error.message || 'Unknown error'));
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.file_url) {
            alert('Please upload a PDF file');
            return;
        }

        if (!formData.title.trim()) {
            alert('Please enter a form title');
            return;
        }

        try {
            if (editingForm) {
                await axiosInstance.put(`/forms/${editingForm.id}`, formData);
            } else {
                await axiosInstance.post('/forms/', formData);
            }
            setShowModal(false);
            fetchForms();
            resetForm();
            alert(editingForm ? 'Form updated successfully!' : 'Form created successfully!');
        } catch (error) {
            console.error('Error saving form:', error);
            const errorMsg = error.response?.data?.detail || error.message || 'Unknown error';
            alert('Failed to save form: ' + errorMsg);
        }
    };

    const resetForm = () => {
        setFormData({
            category: 'state',
            form_type: 'registration',
            title: '',
            description: '',
            file_url: '',
            file_name: '',
            display_order: 999
        });
    };

    const filteredForms = forms.filter(form => {
        if (filterCategory !== 'all' && form.category !== filterCategory) return false;
        if (filterType !== 'all' && form.form_type !== filterType) return false;
        return true;
    });

    const getCategoryLabel = (category) => {
        return categories.find(c => c.value === category)?.label || category;
    };

    const getTypeLabel = (type) => {
        return formTypes.find(t => t.value === type)?.label || type;
    };

    if (loading) {
        return <div className="forms-manager"><p>Loading...</p></div>;
    }

    return (
        <div className="forms-manager">
            <div className="forms-manager__header">
                <div>
                    <h2>Registration Forms Manager</h2>
                    <p>Manage downloadable registration and ID card forms for all competition levels</p>
                </div>
                <button className="btn-add" onClick={handleAdd}>
                    <i className="fas fa-plus"></i> Add New Form
                </button>
            </div>

            {/* Filters */}
            <div className="forms-filters">
                <div className="filter-group">
                    <label>Category:</label>
                    <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                        <option value="all">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                        ))}
                    </select>
                </div>
                <div className="filter-group">
                    <label>Form Type:</label>
                    <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                        <option value="all">All Types</option>
                        {formTypes.map(type => (
                            <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Forms Grid */}
            <div className="forms-grid">
                {filteredForms.length === 0 ? (
                    <p className="no-forms">No forms found. Click "Add New Form" to create one.</p>
                ) : (
                    filteredForms.map(form => (
                        <div key={form.id} className="form-card">
                            <div className="form-card__header">
                                <div className="form-card__badges">
                                    <span className={`badge badge-category badge-${form.category}`}>
                                        {getCategoryLabel(form.category)}
                                    </span>
                                    <span className={`badge badge-type badge-${form.form_type}`}>
                                        {getTypeLabel(form.form_type)}
                                    </span>
                                </div>
                                <div className="form-card__actions">
                                    <button className="btn-icon" onClick={() => handleEdit(form)} title="Edit">
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button className="btn-icon btn-delete" onClick={() => handleDelete(form.id)} title="Delete">
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="form-card__content">
                                <h3>{form.title}</h3>
                                {form.description && <p className="description">{form.description}</p>}
                                <div className="form-card__file">
                                    <i className="fas fa-file-pdf"></i>
                                    <span>{form.file_name}</span>
                                </div>
                                <a 
                                    href={form.file_url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="btn-preview"
                                >
                                    <i className="fas fa-eye"></i> Preview PDF
                                </a>
                            </div>
                            <div className="form-card__footer">
                                <small>Order: {form.display_order}</small>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
                        <h2>{editingForm ? 'Edit Form' : 'Add New Form'}</h2>
                        
                        <form onSubmit={handleSubmit} className="form-editor">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Category *</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        required
                                    >
                                        {categories.map(cat => (
                                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Form Type *</label>
                                    <select
                                        value={formData.form_type}
                                        onChange={(e) => setFormData({ ...formData, form_type: e.target.value })}
                                        required
                                    >
                                        {formTypes.map(type => (
                                            <option key={type.value} value={type.value}>{type.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Title *</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="e.g., State Championship Registration Form"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Brief description of this form"
                                    rows="3"
                                />
                            </div>

                            <div className="form-group">
                                <label>PDF File *</label>
                                {formData.file_url ? (
                                    <div className="file-uploaded">
                                        <div className="file-info">
                                            <i className="fas fa-file-pdf"></i>
                                            <span>{formData.file_name}</span>
                                            <a href={formData.file_url} target="_blank" rel="noopener noreferrer">
                                                Preview
                                            </a>
                                        </div>
                                        <button 
                                            type="button" 
                                            onClick={() => setFormData({ ...formData, file_url: '', file_name: '' })}
                                            className="btn-remove"
                                        >
                                            Change File
                                        </button>
                                    </div>
                                ) : (
                                    <div className="file-upload">
                                        <input
                                            type="file"
                                            accept=".pdf"
                                            onChange={handleFileUpload}
                                            id="form-file-upload"
                                            disabled={uploading}
                                        />
                                        <label htmlFor="form-file-upload" className="file-upload-label">
                                            {uploading ? (
                                                <><i className="fas fa-spinner fa-spin"></i> Uploading...</>
                                            ) : (
                                                <><i className="fas fa-upload"></i> Choose PDF File</>
                                            )}
                                        </label>
                                    </div>
                                )}
                            </div>

                            <div className="form-group">
                                <label>Display Order</label>
                                <input
                                    type="number"
                                    value={formData.display_order}
                                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 999 })}
                                    placeholder="999"
                                    min="0"
                                />
                                <small>Lower numbers appear first</small>
                            </div>

                            <div className="form-actions">
                                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn-submit">
                                    <i className="fas fa-save"></i> {editingForm ? 'Update Form' : 'Create Form'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FormsManager;
