"use client"; // Ensures the component runs on the client side

import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import teamMembers from '../../data/teamMembers';

export default function TeamOne() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      {/* Team One Start */}
      <section className="team-page" style={isMobile ? { padding: '30px 0', background: '#fff' } : undefined}>
        <div className="section-title text-center">
          <div className="section-title__tagline-box">
            <span 
              className="section-title__tagline" 
              style={isMobile ? { fontSize: 14, marginBottom: 8, display: 'inline-block', color: '#666' } : undefined}
            >
              Our Team Member
            </span>
          </div>
          <h2 
            className="section-title__title" 
            style={isMobile ? { fontSize: 24, lineHeight: 1.3, marginBottom: 20, fontWeight: 700 } : undefined}
          >
            {isMobile ? (
              <>
                Our Amazing<br />Team Members
              </>
            ) : (
              <>
                Our Amazing <br /> <span>Team Members</span>
              </>
            )}
          </h2>
        </div>

        <div className="container">
          <div 
            className="row" 
            style={isMobile ? { 
              margin: '0 -8px',
              display: 'flex',
              flexWrap: 'wrap'
            } : undefined}
          >
            {teamMembers.map((member, index) => {
              const isPrimary = member.id === 'rekha' || member.id === 'kumari';
              
              return (
                <div
                  key={member.id}
                  className={`col-xl-4 col-lg-6 col-md-6 wow fadeIn${index % 2 === 0 ? "Left" : "Right"}`}
                  data-wow-delay={`${(index + 1) * 100}ms`}
                  style={isMobile ? {
                    width: '50%',
                    maxWidth: '50%',
                    flex: '0 0 50%',
                    padding: '0 8px',
                    marginBottom: '20px',
                    order: isPrimary ? -1 : 0
                  } : undefined}
                >
                  <div 
                    className={isMobile ? '' : `team-one__single ${isPrimary ? 'team-one__single--primary' : ''}`}
                    style={isMobile ? {
                      position: 'relative',
                      background: '#fff',
                      borderRadius: '12px',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                      overflow: 'hidden',
                      border: isPrimary ? '3px solid #FFD700' : '1px solid #e0e0e0',
                      pointerEvents: 'none',
                      ...(isPrimary && {
                        boxShadow: '0 8px 25px rgba(255, 215, 0, 0.3)'
                      })
                    } : undefined}
                  >
                    <div className={isMobile ? '' : 'team-one__img-box'}>
                      <div 
                        className={isMobile ? '' : 'team-one__img'} 
                        style={isMobile ? { 
                          position: 'relative',
                          height: '180px',
                          overflow: 'hidden'
                        } : undefined}
                      >
                        <img
                          src={member.img}
                          alt={member.name}
                          style={isMobile ? {
                            width: '100%',
                            height: '200px',
                            objectFit: 'cover',
                            borderRadius: '12px 12px 0 0',
                            display: 'block'
                          } : undefined}
                        />
                      </div>
                    </div>

                    <div 
                      className={isMobile ? '' : 'team-one__content'}
                      style={isMobile ? {
                        padding: '12px 15px 15px',
                        textAlign: 'center'
                      } : undefined}
                    >
                      <h4 
                        className={isMobile ? '' : 'team-one__name'}
                        style={isMobile ? {
                          fontSize: isPrimary ? '14px' : '13px',
                          fontWeight: isPrimary ? 700 : 600,
                          marginBottom: '4px',
                          lineHeight: 1.3,
                          color: isPrimary ? '#FFD700' : '#333'
                        } : undefined}
                      >
                        <Link 
                          to={`/team-details/${member.id}`}
                          style={isMobile ? { 
                            pointerEvents: 'auto',
                            color: 'inherit',
                            textDecoration: 'none'
                          } : undefined}
                        >
                          {member.name}
                        </Link>
                      </h4>
                      <p 
                        className={isMobile ? '' : 'team-one__sub-title'}
                        style={isMobile ? {
                          fontSize: isPrimary ? '11px' : '10px',
                          lineHeight: 1.4,
                          marginBottom: 0,
                          color: '#666',
                          fontWeight: 400
                        } : undefined}
                      >
                        {member.role}
                      </p>
                    </div>

                    <div 
                      className="team-one__content-hover" 
                      style={isMobile ? { display: 'none' } : undefined}
                    >
                      <h4 
                        className="team-one__name-hover"
                        style={{ color: '#333 !important' }}
                      >
                        <Link 
                          to={`/team-details/${member.id}`}
                          style={{ color: '#333 !important' }}
                        >
                          {member.name}
                        </Link>
                      </h4>
                      <p 
                        className="team-one__sub-title-hover"
                        style={{ color: '#666 !important' }}
                      >
                        {member.role}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Team One End */}
    </>
  );
}
