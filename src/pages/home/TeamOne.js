"use client";

import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

import { fetchTeamMembers } from '../../utils/teamApi';
import '../team/team-experience.css';

const teamPlaceholder = (name) =>
  `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="640" height="720" viewBox="0 0 640 720"%3E%3Crect width="640" height="720" fill="%23efe5d8"/%3E%3Ccircle cx="320" cy="240" r="92" fill="%23c4b29d"/%3E%3Cpath d="M176 560c20-104 92-156 144-156s124 52 144 156" fill="%23c4b29d"/%3E%3Ctext x="50%25" y="655" text-anchor="middle" fill="%235b4636" font-family="Georgia, serif" font-size="28" letter-spacing="2"%3E${encodeURIComponent(name || 'Team Member')}%3C/text%3E%3C/svg%3E`;

const getSafePhotoUrl = (url, name) => (url ? encodeURI(url) : teamPlaceholder(name));

const handleTeamImageError = (event, name) => {
  if (event.currentTarget.dataset.fallbackApplied === 'true') {
    return;
  }

  event.currentTarget.dataset.fallbackApplied = 'true';
  event.currentTarget.src = teamPlaceholder(name);
};

export default function TeamOne({ variant = 'home' }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadMembers = async () => {
      try {
        setLoading(true);
        const teamMembers = await fetchTeamMembers();
        if (isMounted) {
          setMembers(teamMembers.filter((member) => member.isActive));
          setError('');
        }
      } catch (loadError) {
        if (isMounted) {
          setError('Team members are not available right now.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadMembers();
    return () => {
      isMounted = false;
    };
  }, []);

  const visibleMembers = variant === 'home' ? members.slice(0, 6) : members;
  const sectionClassName = variant === 'home' ? 'team-showcase' : 'team-directory';

  return (
    <section className={sectionClassName}>
      <div className="container">
        <div className={`${sectionClassName}__header`}>
          <span className={`${sectionClassName}__eyebrow`}>
            {variant === 'home' ? 'Leadership' : 'Executive Committee'}
          </span>
          <h2 className={`${sectionClassName}__title`}>
            {variant === 'home' ? 'The people shaping WPC Telangana.' : 'Built to lead. Chosen to represent.'}
          </h2>
          <p className={`${sectionClassName}__summary`}>
            {variant === 'home'
              ? 'Every profile below is now managed from the admin panel, so the public team experience stays aligned with the federation’s latest structure.'
              : 'This directory is fully powered by the admin-managed team profiles. Add portraits, highlights, long-form details, and achievement bullets from the dashboard.'}
          </p>
        </div>

        {loading ? (
          <div className="team-loading">
            <i className="fas fa-spinner fa-spin"></i>
            <span>Loading team members...</span>
          </div>
        ) : error ? (
          <div className={`${sectionClassName}__empty`}>
            <p>{error}</p>
          </div>
        ) : visibleMembers.length === 0 ? (
          <div className={`${sectionClassName}__empty`}>
            <p>No team members have been published yet.</p>
          </div>
        ) : (
          <div className={`${sectionClassName}__grid`}>
            {visibleMembers.map((member) => (
              <article
                key={member.id}
                className={`team-card${member.isFeatured ? ' team-card--featured' : ''}`}
              >
                <div className="team-card__media">
                  {member.photoUrl ? (
                    <img
                      src={getSafePhotoUrl(member.photoUrl, member.name)}
                      alt={member.name}
                      onError={(event) => handleTeamImageError(event, member.name)}
                    />
                  ) : (
                    <div className="team-card__placeholder">
                      <i className="fas fa-user"></i>
                    </div>
                  )}
                  {(member.highlight || member.isFeatured) && (
                    <div className="team-card__chip-group">
                      {member.isFeatured && <span className="team-card__chip team-card__chip--featured">Featured</span>}
                      {member.highlight && <span className="team-card__chip">{member.highlight}</span>}
                    </div>
                  )}
                </div>

                <div className="team-card__body">
                  <h3 className="team-card__name">
                    <Link to={`/team-details/${member.id}`}>{member.name}</Link>
                  </h3>
                  <p className="team-card__role">{member.role}</p>
                  <p className="team-card__text">
                    {member.description || 'Profile details can be maintained from the admin panel.'}
                  </p>

                  {(member.phone || member.email) && (
                    <div className="team-card__meta">
                      {member.phone && (
                        <span className="team-card__meta-item">
                          <i className="fas fa-phone"></i>
                          {member.phone}
                        </span>
                      )}
                      {member.email && (
                        <span className="team-card__meta-item">
                          <i className="fas fa-envelope"></i>
                          {member.email}
                        </span>
                      )}
                    </div>
                  )}

                  <Link to={`/team-details/${member.id}`} className="team-card__cta">
                    View profile
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
