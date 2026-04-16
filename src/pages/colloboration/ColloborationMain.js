import React, { useEffect, useState } from 'react';
import { fetchPartnerships } from '../../utils/partnershipApi';
import './ColloborationMain.css';

const ColloborationMain = () => {
  const [partnerships, setPartnerships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  return (
    <section className="partnership-directory">
      <div className="container">
        <div className="partnership-directory__hero">
          <div>
            <span className="partnership-directory__eyebrow">Alliance Desk</span>
            <h2 className="partnership-directory__title">Partnerships, benefits, and federation collaborations.</h2>
            <p className="partnership-directory__summary">
              This page is now fully controlled from the admin dashboard, so partnership cards, benefit blocks, and collaboration notes can be added or removed without editing code.
            </p>
          </div>
          <div className="partnership-directory__stats">
            <div className="partnership-directory__stat-card">
              <span>Published cards</span>
              <strong>{partnerships.length}</strong>
            </div>
            <div className="partnership-directory__stat-card">
              <span>Highlight points</span>
              <strong>{partnerships.reduce((count, item) => count + item.highlights.length, 0)}</strong>
            </div>
          </div>
        </div>

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
        ) : partnerships.length === 0 ? (
          <div className="partnership-directory__state">
            <i className="fas fa-handshake"></i>
            <p>No partnership cards have been published yet.</p>
          </div>
        ) : (
          <div className="partnership-directory__grid">
            {partnerships.map((partnership) => (
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
    </section>
  );
};

export default ColloborationMain;
