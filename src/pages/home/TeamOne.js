"use client"; // Ensures the component runs on the client side

import { useState } from "react";
import { Link } from 'react-router-dom';
import teamImg1 from '../../assets/images/team/team-1-1.jpg';
import teamImg2 from '../../assets/images/team/team-1-2.jpg';
import teamImg3 from '../../assets/images/team/team-1-3.jpg';
import teamMembers from '../../data/teamMembers';

export default function TeamOne() {
  
  // State for dynamic content
  const [teamContent] = useState({
    tagline: "Our Team Member",
    title: "Our Amazing & Learned Event Speakers",
    members: [
      {
        id: 1,
        name: "Inturi Rekha",
        role: "President, WPC Telangana | First Female International Referee",
        image: teamImg1,
        hoverText:
          "",
        link: "/team-details",
      },
      {
        id: 2,
        name: "Inturi Kumari",
        role: "Chairman, WPC Telangana",
        image: teamImg2,
        hoverText:
          "",
        link: "/team-details",
      },
      {
        id: 3,
        name: "Dr.H.A.Pradeep Kumar",
        role: "Vice Chairman, WPC Telangana",
        image: teamImg3,
        hoverText:
          "",
        link: "/team-details",
      },
    ],
  });

  return (
    <>
      {/* Team One Start */}
      <section id="th-team" className="team-one">
        <div className="container">
          <div className="section-title text-center">
            <div className="section-title__tagline-box">
              <span className="section-title__tagline">{teamContent.tagline}</span>
            </div>
            <h2 className="section-title__title">
              {teamContent.title.split(" & ").map((text, index) => (
                <span key={index}>
                  {text}
                  <br />
                </span>
              ))}
            </h2>
          </div>
          <div className="row">
            {teamMembers.slice(0, 3).map((member, index) => (
              <div
                key={member.id}
                className={`col-xl-4 col-lg-6 col-md-6 wow fadeIn${
                  index % 2 === 0 ? "Left" : "Right"
                }`}
                data-wow-delay={`${(index + 1) * 100}ms`}
              >
                <div className="team-one__single">
                  <div className="team-one__img-box">
                    <div className="team-one__img">
                      <img src={member.img} alt={member.name} />
                      <div className="team-one__content">
                        <h4 className="team-one__name">
                          <Link to={`/team-details/${member.id}`}>{member.name}</Link>
                        </h4>
                        <p className="team-one__sub-title">{member.role}</p>
                      </div>
                      <div className="team-one__content-hover">
                        <h4 className="team-one__name-hover">
                          <Link to={`/team-details/${member.id}`}>{member.name}</Link>
                        </h4>
                        <p className="team-one__sub-title-hover">
                          {member.role}
                        </p>
                        <p className="team-one__text-hover">
                          {member.description.slice(0, 100)}...
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Team One End */}
    </>
  );
}
