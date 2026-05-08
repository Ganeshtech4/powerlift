import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BackToTop from '../../components/elements/BackToTop';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import SiteBreadcrumb from '../../components/Common/Breadcumb';
import CtaTwo from '../../components/Common/CtaSection/CtaTwo';
import { fetchReferee } from '../../utils/refereeApi';
import './referees-experience.css';

const navImg1 = `${process.env.PUBLIC_URL}/images/logo wpc.png`;
const bannerbg = `${process.env.PUBLIC_URL}/images/backgrounds/page-header-bg.jpg`;

const RefereeDetailsPage = () => {
  const { id } = useParams();
  const [referee, setReferee] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 300);
    document.addEventListener('scroll', handleScroll);
    return () => document.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadReferee = async () => {
      try {
        setLoading(true);
        const data = await fetchReferee(id);
        if (isMounted) {
          setReferee(data);
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

    loadReferee();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const renderState = (title, copy) => (
    <section className="referee-profile">
      <div className="container">
        <div className="referee-profile__state">
          <h2 className="referee-profile__name">{title}</h2>
          <p className="referee-profile__summary">{copy}</p>
          <Link to="/referees" className="referee-profile__back">Back to referees</Link>
        </div>
      </div>
    </section>
  );

  return (
    <React.Fragment>
      <Header navImg={navImg1} parentMenu="referees" activeMenu="/referees" />
      <SiteBreadcrumb
        pageTitle={referee?.name || 'Referee Profile'}
        pageName="Referee Details"
        breadcrumbsImg={bannerbg}
      />

      {loading ? renderState('Loading profile', 'Fetching the latest referee profile from the admin-managed directory.') : null}
      {!loading && notFound ? renderState('Profile unavailable', 'This referee profile could not be found. It may have been removed or unpublished from the admin dashboard.') : null}
      {!loading && !notFound && referee ? (
        <section className="referee-profile">
          <div className="container">
            <div className="referee-profile__panel">
              <div className="referee-profile__top">
                <div className="referee-profile__portrait">
                  {referee.photoUrl && (referee.photoUrl.startsWith('http') || referee.photoUrl.startsWith('/')) ? (
                    <img src={decodeURIComponent(referee.photoUrl)} alt={referee.name} />
                  ) : (
                    <div className="referee-profile__placeholder">
                      <i className="fas fa-user"></i>
                    </div>
                  )}
                  <div className="referee-profile__chip-group">
                    <span className="referee-profile__chip">{referee.level}</span>
                  </div>
                </div>

                <div>
                  <span className="referee-profile__eyebrow">Referee profile</span>
                  <h2 className="referee-profile__name">{referee.name}</h2>
                  <p className="referee-profile__role">{referee.level} Referee</p>
                  <p className="referee-profile__lede">
                    {referee.description || 'Profile details can be completed from the admin dashboard with biography, certification year, and contact information.'}
                  </p>

                  <div className="referee-profile__meta">
                    {referee.certificationYear ? (
                      <span className="referee-profile__meta-item"><i className="fas fa-award"></i>Certified {referee.certificationYear}</span>
                    ) : null}
                    {referee.phone ? (
                      <span className="referee-profile__meta-item"><i className="fas fa-phone"></i>{referee.phone}</span>
                    ) : null}
                    {referee.email ? (
                      <span className="referee-profile__meta-item"><i className="fas fa-envelope"></i>{referee.email}</span>
                    ) : null}
                  </div>

                  {referee.certificates && referee.certificates.length > 0 && (
                    <div className="referee-profile__certificates">
                      <h3 className="referee-profile__certificates-title">Certificates</h3>
                      <div className="referee-profile__certificates-grid">
                        {referee.certificates.map((certUrl, index) => (
                          <a
                            key={index}
                            href={certUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="referee-profile__certificate-card"
                          >
                            {certUrl.toLowerCase().endsWith('.pdf') ? (
                              <div className="referee-profile__certificate-pdf">
                                <i className="fas fa-file-pdf"></i>
                                <span>Certificate {index + 1}</span>
                                <small>View PDF</small>
                              </div>
                            ) : (
                              <img src={certUrl} alt={`Certificate ${index + 1}`} />
                            )}
                            <div className="referee-profile__certificate-overlay">
                              <i className="fas fa-search-plus"></i>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  <Link to="/referees" className="referee-profile__back">Back to referees</Link>
                </div>
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

export default RefereeDetailsPage;