import React, { useEffect, useState } from 'react';
import { fetchPartnerships } from '../../utils/partnershipApi';
import './ColloborationMain.css';

const ColloborationMain = () => {
  const [partnerships, setPartnerships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadPartnerships = async () => {
      try {
        setLoading(true);
        const data = await fetchPartnerships();
        if (isMounted) {
          setPartnerships(data);
          setError('');
        }
      } catch (loadError) {
        if (isMounted) {
          setPartnerships([]);
          setError('Unable to load partnerships right now.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadPartnerships();

    return () => {
      isMounted = false;
    };
  }, []);

  // Filter partnerships
  const filteredPartnerships = partnerships.filter((partnership) => {
    let matchesFilter = true;
    
    if (activeFilter !== 'all') {
      const [level, type] = activeFilter.split('-'); // e.g., "District-Partner"
      matchesFilter = partnership.level === level && partnership.type === type;
    }
    
    const matchesSearch = !searchTerm || 
      partnership.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (partnership.ownerName && partnership.ownerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (partnership.location && partnership.location.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });

  // Count by type and level combinations
  const counts = {
    districtPartners: partnerships.filter(p => p.level === 'District' && p.type === 'Partner').length,
    districtSponsors: partnerships.filter(p => p.level === 'District' && p.type === 'Sponsor').length,
    statePartners: partnerships.filter(p => p.level === 'State' && p.type === 'Partner').length,
    stateSponsors: partnerships.filter(p => p.level === 'State' && p.type === 'Sponsor').length,
    nationalPartners: partnerships.filter(p => p.level === 'National' && p.type === 'Partner').length,
    nationalSponsors: partnerships.filter(p => p.level === 'National' && p.type === 'Sponsor').length,
    internationalPartners: partnerships.filter(p => p.level === 'International' && p.type === 'Partner').length,
    internationalSponsors: partnerships.filter(p => p.level === 'International' && p.type === 'Sponsor').length,
  };

  return (
    <section className="partnership-directory">
      <div className="container">
        <div className="partnership-directory__hero">
          <div>
            <span className="partnership-directory__eyebrow">Alliance Desk</span>
            <h2 className="partnership-directory__title">Gym Partners & Sponsors</h2>
            <p className="partnership-directory__summary">
              Explore our partnerships and sponsorships across District, State, National, and International levels.
            </p>
          </div>
        </div>

        <div className="partnership-layout">
          {/* Sidebar */}
          <aside className="partnership-sidebar">
            <div className="partnership-sidebar-card">
              {/* Search */}
              <div className="partnership-search-box">
                <i className="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Search partnerships..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button onClick={() => setSearchTerm('')} className="partnership-search-clear">
                    <i className="fas fa-times"></i>
                  </button>
                )}
              </div>

              {/* Filter Buttons */}
              <div className="partnership-filter-section">
                <h3>Filter by Type & Level</h3>
                <div className="partnership-filter-buttons">
                  <button
                    className={activeFilter === 'all' ? 'active' : ''}
                    onClick={() => setActiveFilter('all')}
                  >
                    All ({partnerships.length})
                  </button>
                  <button
                    className={activeFilter === 'District-Partner' ? 'active' : ''}
                    onClick={() => setActiveFilter('District-Partner')}
                  >
                    District Partners ({counts.districtPartners})
                  </button>
                  <button
                    className={activeFilter === 'District-Sponsor' ? 'active' : ''}
                    onClick={() => setActiveFilter('District-Sponsor')}
                  >
                    District Sponsors ({counts.districtSponsors})
                  </button>
                  <button
                    className={activeFilter === 'State-Partner' ? 'active' : ''}
                    onClick={() => setActiveFilter('State-Partner')}
                  >
                    State Partners ({counts.statePartners})
                  </button>
                  <button
                    className={activeFilter === 'State-Sponsor' ? 'active' : ''}
                    onClick={() => setActiveFilter('State-Sponsor')}
                  >
                    State Sponsors ({counts.stateSponsors})
                  </button>
                  <button
                    className={activeFilter === 'National-Partner' ? 'active' : ''}
                    onClick={() => setActiveFilter('National-Partner')}
                  >
                    National Partners ({counts.nationalPartners})
                  </button>
                  <button
                    className={activeFilter === 'National-Sponsor' ? 'active' : ''}
                    onClick={() => setActiveFilter('National-Sponsor')}
                  >
                    National Sponsors ({counts.nationalSponsors})
                  </button>
                  <button
                    className={activeFilter === 'International-Partner' ? 'active' : ''}
                    onClick={() => setActiveFilter('International-Partner')}
                  >
                    International Partners ({counts.internationalPartners})
                  </button>
                  <button
                    className={activeFilter === 'International-Sponsor' ? 'active' : ''}
                    onClick={() => setActiveFilter('International-Sponsor')}
                  >
                    International Sponsors ({counts.internationalSponsors})
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="partnership-stats">
                <div className="partnership-stat">
                  <strong>{filteredPartnerships.length}</strong>
                  <span>Showing</span>
                </div>
                <div className="partnership-stat">
                  <strong>{partnerships.length}</strong>
                  <span>Total</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="partnership-content">
            {loading ? (
              <div className="partnership-directory__state">
                <i className="fas fa-spinner fa-spin"></i>
                <p>Loading partnerships...</p>
              </div>
            ) : error ? (
              <div className="partnership-directory__state">
                <i className="fas fa-circle-exclamation"></i>
                <p>{error}</p>
              </div>
            ) : filteredPartnerships.length === 0 ? (
              <div className="partnership-directory__state">
                <i className="fas fa-handshake"></i>
                <p>{searchTerm || activeFilter !== 'all' 
                  ? 'No partnerships match your filters.' 
                  : 'No partnership cards have been published yet.'}</p>
              </div>
            ) : (
              <div className="partnership-directory__grid">
                {filteredPartnerships.map((partnership) => (
                  <article key={partnership.id} className="partnership-card">
                    <div className="partnership-card__media">
                      {partnership.logoUrl ? (
                        <img src={partnership.logoUrl} alt={partnership.title} />
                      ) : (
                        <div className="partnership-card__placeholder">
                          <i className="fas fa-handshake"></i>
                        </div>
                      )}
                    </div>

                    <div className="partnership-card__body">
                      <div className="partnership-card__header">
                        <h3>{partnership.title}</h3>
                        {partnership.ownerName && <p>{partnership.ownerName}</p>}
                        <div className="partnership-card__badges">
                          <span className="partnership-badge partnership-badge--type">{partnership.type}</span>
                          <span className="partnership-badge partnership-badge--level">{partnership.level}</span>
                        </div>
                      </div>

                      {partnership.description && (
                        <p className="partnership-card__description">{partnership.description}</p>
                      )}

                      {partnership.highlights.length > 0 && (
                        <ul className="partnership-card__list">
                          {partnership.highlights.map((highlight, index) => (
                            <li key={`${partnership.id}-${index}`}>
                              <i className="fas fa-check-circle"></i>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {(partnership.location || partnership.phone || partnership.email) && (
                        <div className="partnership-card__meta">
                          {partnership.location && (
                            <span><i className="fas fa-map-marker-alt"></i>{partnership.location}</span>
                          )}
                          {partnership.phone && (
                            <span><i className="fas fa-phone"></i>{partnership.phone}</span>
                          )}
                          {partnership.email && (
                            <span><i className="fas fa-envelope"></i>{partnership.email}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ColloborationMain;
