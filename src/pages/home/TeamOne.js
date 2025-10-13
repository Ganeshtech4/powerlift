"use client"; // Ensures the component runs on the client side

import { useState } from "react";
import { Link } from 'react-router-dom';
import teamImg1 from '../../assets/images/team/team-1-1.jpg';
import teamImg2 from '../../assets/images/team/team-1-2.jpg';
import teamImg3 from '../../assets/images/team/team-1-3.jpg';

export default function TeamOne() {
  // State for dynamic content
  const [teamContent] = useState({
    tagline: "Committee Members",
    title: "WPC–Telangana Leadership & Officials",
    members: [
      {
        id: 1,
        name: "[President Name]",
        role: "President",
        image: teamImg1,
        hoverText:
          "Leading WPC–Telangana with vision and dedication to promote powerlifting across all districts in Telangana state under WPC regulations.",
        link: "/team-details",
      },
      {
        id: 2,
        name: "[General Secretary Name]",
        role: "General Secretary",
        image: teamImg2,
        hoverText:
          "Managing day-to-day operations, organizing championships, and coordinating with WPC–India for state-level powerlifting activities.",
        link: "/team-details",
      },
      {
        id: 3,
        name: "[Technical Head Name]",
        role: "Technical Head",
        image: teamImg3,
        hoverText:
          "Overseeing technical aspects of powerlifting events, referee training, and ensuring compliance with WPC international standards.",
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
            {teamContent.members.map((member, index) => (
              <div
                key={member.id}
                className={`col-xl-4 col-lg-6 wow fadeIn${
                  index === 0 ? "Left" : index === 1 ? "Up" : "Right"
                }`}
                data-wow-delay={`${(index + 1) * 100}ms`}
              >
                <div className="team-one__single">
                  <div className="team-one__img-box">
                    <div className="team-one__img">
                      <img src={member.image} alt={member.name} />
                      <div className="team-one__content">
                        <h4 className="team-one__name">
                          <Link to={member.link}>{member.name}</Link>
                        </h4>
                        <p className="team-one__sub-title">{member.role}</p>
                      </div>
                      <div className="team-one__content-hover">
                        <h4 className="team-one__name-hover">
                          <Link to={member.link}>{member.name}</Link>
                        </h4>
                        <p className="team-one__sub-title-hover">{member.role}</p>
                        <p className="team-one__text-hover">{member.hoverText}</p>
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
