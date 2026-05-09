import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../config/axiosConfig';
import './RegistrationMain.css';

const RegistrationMain = () => {
    const [forms, setForms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = [
        { value: 'all', label: 'All Categories', icon: 'globe' },
        { value: 'state', label: 'State Level', icon: 'map-marker-alt' },
        { value: 'district', label: 'District Level', icon: 'city' },
        { value: 'national', label: 'National Level', icon: 'flag' },
        { value: 'international', label: 'International Level', icon: 'globe-asia' }
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

    const filteredForms = selectedCategory === 'all' 
        ? forms 
        : forms.filter(form => form.category === selectedCategory);

    const groupedForms = {
        registration: filteredForms.filter(f => f.form_type === 'registration'),
        id_card: filteredForms.filter(f => f.form_type === 'id_card')
    };

    const getCategoryLabel = (category) => {
        return categories.find(c => c.value === category)?.label || category;
    };

    const handleDownload = (form) => {
        const link = document.createElement('a');
        link.href = form.file_url;
        link.download = form.file_name;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) {
        return (
            <section className="registration-one">
                <div className="container">
                    <p className="text-center">Loading forms...</p>
                </div>
            </section>
        );
    }

    return (
        <section className="registration-one">
            <div className="container">
                <div className="section-title text-center">
                    <div className="section-title__tagline-box">
                        <span className="section-title__tagline">WPC Telangana Documents</span>
                    </div>
                    <h2 className="section-title__title">Registration & ID Card Forms</h2>
                    <p className="section-title__text">
                        Download official registration forms and ID card applications for WPC Telangana powerlifting competitions across all levels.
                    </p>
                </div>
                
                {/* Category Filter */}
                <div className="row justify-content-center mb-5">
                    <div className="col-xl-10">
                        <div className="category-filter">
                            {categories.map(cat => (
                                <button
                                    key={cat.value}
                                    className={`category-btn ${selectedCategory === cat.value ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(cat.value)}
                                >
                                    <i className={`fas fa-${cat.icon}`}></i>
                                    <span>{cat.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {forms.length === 0 ? (
                    <div className="row justify-content-center">
                        <div className="col-xl-8 text-center">
                            <p style={{ padding: '3rem', background: '#f8f9fa', borderRadius: '12px', color: '#6c757d' }}>
                                No forms available at the moment. Please check back later.
                            </p>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Registration Forms */}
                        {groupedForms.registration.length > 0 && (
                            <div className="row">
                                <div className="col-12">
                                    <h3 className="forms-section-title">
                                        <i className="fas fa-clipboard-list"></i> Registration Forms
                                    </h3>
                                </div>
                                {groupedForms.registration.map((form) => (
                                    <div key={form.id} className="col-xl-6 col-lg-6 col-md-12">
                                        <div className="document-card">
                                            <div className="document-card__header">
                                                <span className="category-badge">{getCategoryLabel(form.category)}</span>
                                            </div>
                                            <div className="document-card__icon">
                                                <i className="fas fa-file-pdf"></i>
                                            </div>
                                            <div className="document-card__content">
                                                <h4 className="document-card__title">{form.title}</h4>
                                                {form.description && (
                                                    <p className="document-card__description">{form.description}</p>
                                                )}
                                                <button 
                                                    className="document-card__btn"
                                                    onClick={() => handleDownload(form)}
                                                >
                                                    <i className="fas fa-download"></i> Download PDF
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* ID Card Forms */}
                        {groupedForms.id_card.length > 0 && (
                            <div className="row mt-5">
                                <div className="col-12">
                                    <h3 className="forms-section-title">
                                        <i className="fas fa-id-card"></i> ID Card Forms
                                    </h3>
                                </div>
                                {groupedForms.id_card.map((form) => (
                                    <div key={form.id} className="col-xl-6 col-lg-6 col-md-12">
                                        <div className="document-card">
                                            <div className="document-card__header">
                                                <span className="category-badge">{getCategoryLabel(form.category)}</span>
                                            </div>
                                            <div className="document-card__icon">
                                                <i className="fas fa-file-pdf"></i>
                                            </div>
                                            <div className="document-card__content">
                                                <h4 className="document-card__title">{form.title}</h4>
                                                {form.description && (
                                                    <p className="document-card__description">{form.description}</p>
                                                )}
                                                <button 
                                                    className="document-card__btn"
                                                    onClick={() => handleDownload(form)}
                                                >
                                                    <i className="fas fa-download"></i> Download PDF
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {filteredForms.length === 0 && (
                            <div className="row justify-content-center">
                                <div className="col-xl-8 text-center">
                                    <p style={{ padding: '3rem', background: '#f8f9fa', borderRadius: '12px', color: '#6c757d' }}>
                                        No forms available for {selectedCategory === 'all' ? 'any category' : getCategoryLabel(selectedCategory)}.
                                    </p>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default RegistrationMain;
