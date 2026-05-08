import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance, API_URL } from '../../../config/axiosConfig';
import './ResultsManager.css';

const ResultsManager = () => {
    const navigate = useNavigate();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedType, setSelectedType] = useState('all');

    useEffect(() => {
        fetchResults();
    }, []);

    const fetchResults = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/results/');
            setResults(response.data);
        } catch (error) {
            console.error('Error fetching results:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateResult = () => {
        navigate('/admin/results/new');
    };

    const handleEdit = (result) => {
        navigate(`/admin/results/edit/${result.id}`);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this result?')) return;

        try {
            await axiosInstance.delete(`/results/${id}`);
            fetchResults();
            alert('Deleted successfully!');
        } catch (error) {
            console.error('Error deleting result:', error);
            alert('Failed to delete result');
        }
    };

    const filteredResults = results.filter(r => {
        const matchesCategory = selectedCategory === 'all' || r.category === selectedCategory;
        const matchesType = selectedType === 'all' || r.type === selectedType;
        return matchesCategory && matchesType;
    });

    const stats = {
        total: results.length,
    };

    return (
        <div className="results-manager">
            <div className="manager-header">
                <div>
                    <h2><i className="fas fa-trophy"></i> Results Manager</h2>
                    <p className="subtitle">Manage competition results</p>
                </div>
                <div className="header-buttons">
                    <button className="btn-create" onClick={handleCreateResult}>
                        <i className="fas fa-trophy"></i>
                        Upload Result
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon">
                        <i className="fas fa-trophy"></i>
                    </div>
                    <div className="stat-content">
                        <h3>{stats.total}</h3>
                        <p>Total Entries</p>
                    </div>
                </div>
            </div>

            {/* Category & Type Filters */}
            <div className="filters-container">
                <div className="filter-group">
                    <label>Filter by Level:</label>
                    <div className="category-filters">
                        <button
                            className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                            onClick={() => setSelectedCategory('all')}
                        >
                            All
                        </button>
                        <button
                            className={`filter-btn ${selectedCategory === 'district' ? 'active' : ''}`}
                            onClick={() => setSelectedCategory('district')}
                        >
                            District
                        </button>
                        <button
                            className={`filter-btn ${selectedCategory === 'state' ? 'active' : ''}`}
                            onClick={() => setSelectedCategory('state')}
                        >
                            State
                        </button>
                        <button
                            className={`filter-btn ${selectedCategory === 'nationals' ? 'active' : ''}`}
                            onClick={() => setSelectedCategory('nationals')}
                        >
                            Nationals
                        </button>
                        <button
                            className={`filter-btn ${selectedCategory === 'internationals' ? 'active' : ''}`}
                            onClick={() => setSelectedCategory('internationals')}
                        >
                            Internationals
                        </button>
                    </div>
                </div>
                <div className="filter-group">
                    <label>Filter by Type:</label>
                    <div className="category-filters">
                        <button
                            className={`filter-btn ${selectedType === 'all' ? 'active' : ''}`}
                            onClick={() => setSelectedType('all')}
                        >
                            All
                        </button>
                        <button
                            className={`filter-btn ${selectedType === 'championship' ? 'active' : ''}`}
                            onClick={() => setSelectedType('championship')}
                        >
                            Championship
                        </button>
                        <button
                            className={`filter-btn ${selectedType === 'records' ? 'active' : ''}`}
                            onClick={() => setSelectedType('records')}
                        >
                            Records
                        </button>
                        <button
                            className={`filter-btn ${selectedType === 'results' ? 'active' : ''}`}
                            onClick={() => setSelectedType('results')}
                        >
                            Results
                        </button>
                    </div>
                </div>
            </div>

            {/* Results Grid */}
            {loading ? (
                <div className="loading-state">
                    <i className="fas fa-spinner fa-spin fa-3x"></i>
                    <p>Loading results...</p>
                </div>
            ) : filteredResults.length === 0 ? (
                <div className="empty-state">
                    <i className="fas fa-trophy fa-5x"></i>
                    <h3>No Results Found</h3>
                    <p>Upload your first competition result</p>
                    <div className="empty-state-actions">
                        <button className="btn-create" onClick={handleCreateResult}>
                            <i className="fas fa-trophy"></i>
                            Upload Result
                        </button>
                    </div>
                </div>
            ) : (
                <div className="results-grid">
                    {filteredResults.map(result => (
                        <div key={result.id} className="result-card">
                            <div className="result-image">
                                {result.images && result.images.length > 0 ? (
                                    <img src={result.images[0]} alt={result.title} />
                                ) : (
                                    <div className="no-image">
                                        <i className="fas fa-image"></i>
                                    </div>
                                )}
                                <span className="type-badge">
                                    {result.type === 'championship' ? (
                                        <><i className="fas fa-award"></i> Championship</>
                                    ) : result.type === 'records' ? (
                                        <><i className="fas fa-certificate"></i> Records</>
                                    ) : (
                                        <><i className="fas fa-file-alt"></i> Results</>
                                    )}
                                </span>
                                <span className="category-badge">{result.category}</span>
                                {result.images && result.images.length > 1 && (
                                    <span className="image-count">
                                        <i className="fas fa-images"></i> {result.images.length}
                                    </span>
                                )}
                            </div>
                            <div className="result-content">
                                <h3>{result.title}</h3>
                                {result.description && <p className="description">{result.description}</p>}
                                <div className="result-meta">
                                    {result.event_date && (
                                        <span>
                                            <i className="fas fa-calendar"></i>
                                            {new Date(result.event_date).toLocaleDateString()}
                                        </span>
                                    )}
                                    {result.location && (
                                        <span>
                                            <i className="fas fa-map-marker-alt"></i>
                                            {result.location}
                                        </span>
                                    )}
                                </div>
                                <div className="result-actions">
                                    <button
                                        className="btn-edit"
                                        onClick={() => handleEdit(result)}
                                    >
                                        <i className="fas fa-edit"></i>
                                        Edit
                                    </button>
                                    <button
                                        className="btn-delete"
                                        onClick={() => handleDelete(result.id)}
                                    >
                                        <i className="fas fa-trash"></i>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ResultsManager;
