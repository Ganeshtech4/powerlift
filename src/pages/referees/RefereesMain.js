import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchReferees } from '../../utils/refereeApi';
import './referees-experience.css';

const RefereesMain = () => {
  const [referees, setReferees] = useState([]);
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

  const grouped = referees.reduce((accumulator, referee) => {
    const key = referee.level || 'Other';
    accumulator[key] = accumulator[key] || [];
    accumulator[key].push(referee);
    return accumulator;
  }, {});

  const levels = ['International', 'National', 'State', 'District'];

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

        {!loading && !error && referees.length > 0 ? (
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
    </section>
  );
};

export default RefereesMain;
