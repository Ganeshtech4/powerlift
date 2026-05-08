import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchReferees } from '../../utils/refereeApi';
import './referees-experience.css';

const RefereesMain = () => {
  const [referees, setReferees] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadReferees = async () => {
      try {
        setLoading(true);
        const data = await fetchReferees();
        if (isMounted) {
          setReferees(data);
          setError('');
        }
      } catch (loadError) {
        if (isMounted) {
          setReferees([]);
          setError('Unable to load referees right now.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadReferees();

    return () => {
      isMounted = false;
    };
  }, []);

  // Filter levels in the order specified
  const levels = ['International', 'National', 'State', 'District'];
  
  // Get counts for each level
  const levelCounts = referees.reduce((acc, referee) => {
    const level = referee.level || 'Other';
    acc[level] = (acc[level] || 0) + 1;
    return acc;
  }, {});

  // Filter referees based on active filter and search term
  const filteredReferees = referees.filter(referee => {
    const matchesFilter = activeFilter === 'all' || referee.level === activeFilter;
    const matchesSearch = referee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (referee.description && referee.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (referee.email && referee.email.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  // Group filtered referees by level
  const grouped = filteredReferees.reduce((accumulator, referee) => {
    const key = referee.level || 'Other';
    accumulator[key] = accumulator[key] || [];
    accumulator[key].push(referee);
    return accumulator;
  }, {});

  return (
    <section className="referee-directory">
      <div className="container">
        <div className="referee-directory__header">
          <span className="referee-directory__eyebrow">Officials Directory</span>
          <h2 className="referee-directory__title">Certified Referees</h2>
          <p className="referee-directory__summary">
            Meet the officials entrusted with standards, judging discipline, and competitive integrity across WPC Telangana events.
          </p>
        </div>

        <div className="referee-layout">
          <aside className="referee-sidebar">
            <div className="referee-sidebar-card">
              <div className="referee-search-box">
                <i className="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Search referees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="referee-filter-stack">
                <button
                  className={`referee-filter-btn ${activeFilter === 'International' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('International')}
                >
                  <span className="referee-filter-label">International Referees</span>
                  <span className="referee-filter-count">{levelCounts['International'] || 0}</span>
                </button>

                <button
                  className={`referee-filter-btn ${activeFilter === 'National' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('National')}
                >
                  <span className="referee-filter-label">National Referees</span>
                  <span className="referee-filter-count">{levelCounts['National'] || 0}</span>
                </button>

                <button
                  className={`referee-filter-btn ${activeFilter === 'State' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('State')}
                >
                  <span className="referee-filter-label">State Referees</span>
                  <span className="referee-filter-count">{levelCounts['State'] || 0}</span>
                </button>

                <button
                  className={`referee-filter-btn ${activeFilter === 'District' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('District')}
                >
                  <span className="referee-filter-label">District Referees</span>
                  <span className="referee-filter-count">{levelCounts['District'] || 0}</span>
                </button>

                <button
                  className={`referee-filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('all')}
                >
                  <span className="referee-filter-label">All Referees</span>
                  <span className="referee-filter-count">{referees.length}</span>
                </button>
              </div>

              <div className="referee-sidebar-stats">
                <div>
                  <span>Total Referees</span>
                  <strong>{referees.length}</strong>
                </div>
                <div>
                  <span>Showing</span>
                  <strong>{filteredReferees.length}</strong>
                </div>
              </div>
            </div>
          </aside>

          <div className="referee-content">
            {loading ? (
              <div className="referee-loading">
                <i className="fas fa-spinner fa-spin"></i>
                <span>Loading referees...</span>
              </div>
            ) : null}

            {!loading && error ? (
              <div className="referee-directory__empty">
                <h3>Directory unavailable</h3>
                <p>{error}</p>
              </div>
            ) : null}

            {!loading && !error && referees.length === 0 ? (
              <div className="referee-directory__empty">
                <h3>No referees published</h3>
                <p>Add active referees from the admin dashboard to publish this directory.</p>
              </div>
            ) : null}

            {!loading && !error && filteredReferees.length === 0 && referees.length > 0 ? (
              <div className="referee-directory__empty">
                <h3>No referees match your search</h3>
                <p>Try adjusting your filter or search term.</p>
              </div>
            ) : null}

            {!loading && !error && filteredReferees.length > 0 ? (
              <div className="referee-directory__sections">
                {levels.filter((level) => grouped[level]?.length).map((level) => (
                  <section key={level} className="referee-directory__level-block">
                    <div className="referee-directory__level-header">
                      <span className="referee-level-chip">{level}</span>
                      <strong>{grouped[level].length}</strong>
                    </div>

                    <div className="referee-directory__grid">
                      {grouped[level].map((referee) => {
                        const photoUrl = referee.photoUrl && (referee.photoUrl.startsWith('http') || referee.photoUrl.startsWith('/')) 
                          ? decodeURIComponent(referee.photoUrl) 
                          : null;
                        return (
                        <article key={referee.id} className="referee-card">
                          <div className="referee-card__media">
                            {photoUrl ? (
                              <img src={photoUrl} alt={referee.name} />
                            ) : (
                              <div className="referee-card__placeholder">
                                <i className="fas fa-user"></i>
                              </div>
                            )}
                            <span className="referee-card__chip">{referee.level}</span>
                          </div>

                          <div className="referee-card__body">
                            <h3 className="referee-card__name">
                              <Link to={`/referees/${referee.id}`}>{referee.name}</Link>
                            </h3>
                            {referee.certificationYear ? (
                              <p className="referee-card__meta-line">Certified {referee.certificationYear}</p>
                            ) : null}
                            <p className="referee-card__text">
                              {referee.description || 'Profile details can be expanded from the admin panel with biography and contact information.'}
                            </p>

                            {(referee.phone || referee.email) ? (
                              <div className="referee-card__meta">
                                {referee.phone ? (
                                  <span className="referee-card__meta-item"><i className="fas fa-phone"></i>{referee.phone}</span>
                                ) : null}
                                {referee.email ? (
                                  <span className="referee-card__meta-item"><i className="fas fa-envelope"></i>{referee.email}</span>
                                ) : null}
                              </div>
                            ) : null}

                            <Link className="referee-card__cta" to={`/referees/${referee.id}`}>View profile</Link>
                          </div>
                        </article>
                      )})}
                    </div>
                  </section>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RefereesMain;
