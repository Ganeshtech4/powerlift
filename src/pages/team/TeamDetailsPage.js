"use client";

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import BackToTop from '../../components/elements/BackToTop';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import SiteBreadcrumb from '../../components/Common/Breadcumb';
import CtaTwo from '../../components/Common/CtaSection/CtaTwo';
import { fetchTeamMember } from '../../utils/teamApi';
import './team-experience.css';

const navImg1 = `${process.env.PUBLIC_URL}/images/logo wpc.png`;
const bannerbg = `${process.env.PUBLIC_URL}/images/backgrounds/coverpagepic.jpg`;

const teamPlaceholder = (name) =>
  `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="960" viewBox="0 0 800 960"%3E%3Crect width="800" height="960" fill="%23efe5d8"/%3E%3Ccircle cx="400" cy="300" r="120" fill="%23c4b29d"/%3E%3Cpath d="M220 720c34-140 116-210 180-210s146 70 180 210" fill="%23c4b29d"/%3E%3Ctext x="50%25" y="862" text-anchor="middle" fill="%235b4636" font-family="Georgia, serif" font-size="34" letter-spacing="2"%3E${encodeURIComponent(name || 'Profile')}%3C/text%3E%3C/svg%3E`;

const getSafePhotoUrl = (url, name) => (url || teamPlaceholder(name));

const handleTeamImageError = (event, name) => {
  if (event.currentTarget.dataset.fallbackApplied === 'true') {
    return;
  }

  event.currentTarget.dataset.fallbackApplied = 'true';
  event.currentTarget.src = teamPlaceholder(name);
};

const TeamDetailsPage = () => {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadMember = async () => {
      try {
        setLoading(true);
        const data = await fetchTeamMember(id);
        if (isMounted) {
          setMember(data);
          setNotFound(false);
        }
      } catch (error) {
        if (isMounted) {
          setNotFound(true);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadMember();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const renderState = (title, copy) => (
    <section className="team-profile">
      <div className="container">
        <div className="team-profile__state">
          <h2 className="team-profile__name">{title}</h2>
          <p className="team-profile__summary">{copy}</p>
          <Link to="/team" className="team-profile__back">Back to team</Link>
        </div>
      </div>
    </section>
  );

  return (
    <React.Fragment>
      <Header navImg={navImg1} parentMenu='team' activeMenu="/team" />

      <SiteBreadcrumb
        pageTitle={member?.name || 'Team Profile'}
        pageName="Team Details"
        breadcrumbsImg={bannerbg}
      />

      {loading ? renderState('Loading profile', 'Fetching the latest team information from the admin-managed directory.') : null}
      {!loading && notFound ? renderState('Profile unavailable', 'This team member could not be found. It may have been removed or renamed from the admin dashboard.') : null}
      {!loading && !notFound && member ? (
        <section className="team-profile">
          <div className="container">
            <div className="team-profile__panel">
              <div className="team-profile__top">
                <div className="team-profile__portrait">
                  {member.photoUrl ? (
                    <img
                      src={getSafePhotoUrl(member.photoUrl, member.name)}
                      alt={member.name}
                      onError={(event) => handleTeamImageError(event, member.name)}
                    />
                  ) : (
                    <div className="team-profile__placeholder">
                      <i className="fas fa-user"></i>
                    </div>
                  )}
                  {(member.highlight || member.isFeatured) && (
                    <div className="team-profile__chip-group">
                      {member.isFeatured && <span className="team-profile__chip team-profile__chip--featured">Featured</span>}
                      {member.highlight && <span className="team-profile__chip">{member.highlight}</span>}
                    </div>
                  )}
                </div>

                <div>
                  <span className="team-profile__eyebrow">Leadership profile</span>
                  <h2 className="team-profile__name">{member.name}</h2>
                  <p className="team-profile__role">{member.role}</p>
                  <p className="team-profile__lede">
                    {member.description || 'This profile can be completed from the admin dashboard with a summary, bullet points, and long-form notes.'}
                  </p>

                  {(member.phone || member.email) && (
                    <div className="team-profile__meta">
                      {member.phone && (
                        <span className="team-profile__meta-item">
                          <i className="fas fa-phone"></i>
                          {member.phone}
                        </span>
                      )}
                      {member.email && (
                        <span className="team-profile__meta-item">
                          <i className="fas fa-envelope"></i>
                          {member.email}
                        </span>
                      )}
                    </div>
                  )}

                  <Link to="/team" className="team-profile__back">Back to team</Link>
                </div>
              </div>

              <div className="team-profile__grid">
                {member.achievements.length > 0 && (
                  <div className="team-profile__section team-profile__section--half">
                    <h3 className="team-profile__section-title">Achievements</h3>
                    <ul className="team-profile__list">
                      {member.achievements.map((achievement, index) => (
                        <li key={`${member.id}-achievement-${index}`}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {member.leadership && (
                  <div className="team-profile__section team-profile__section--half">
                    <h3 className="team-profile__section-title">Leadership</h3>
                    <p>{member.leadership}</p>
                  </div>
                )}

                {member.philosophy && (
                  <div className="team-profile__section">
                    <h3 className="team-profile__section-title">Philosophy</h3>
                    <p>{member.philosophy}</p>
                  </div>
                )}

                {member.certificateUrls.length > 0 && (
                  <div className="team-profile__section">
                    <h3 className="team-profile__section-title">Certificates</h3>
                    <div className="team-profile__certificates">
                      {member.certificateUrls.map((certificateUrl, index) => (
                        <a
                          key={`${member.id}-certificate-${index}`}
                          className="team-profile__certificate"
                          href={certificateUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img src={encodeURI(certificateUrl)} alt={`${member.name} certificate ${index + 1}`} />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {!member.achievements.length && !member.leadership && !member.philosophy && !member.certificateUrls.length && (
                  <div className="team-profile__section">
                    <h3 className="team-profile__section-title">Profile notes</h3>
                    <p>
                      Use the admin dashboard to add highlight notes, achievement bullet points, and extended profile content for this member.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <CtaTwo />
      <Footer />
      <BackToTop scroll={isVisible} />
    </React.Fragment>
  );
};

export default TeamDetailsPage;
