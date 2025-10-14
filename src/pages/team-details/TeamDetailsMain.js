"use client";
import React from "react";
import { useParams } from 'react-router-dom';
import TeamDetailsImg2 from '../../assets/images/shapes/team-details-client-shape-1.png';
import teamMembers from '../../data/teamMembers';

export default function TeamDetailsMain() {
  const { id } = useParams();
  const member = teamMembers.find(m => m.id === id);
  if (!member) {
    return <div>Team member not found.</div>;
  }
  return (
    <div>
      {/*Team Details Info Start*/}
      <section className="team-details">
        <div className="container">
          <div className="row">
            <div className="col-xl-4 col-lg-5">
              <div className="team-details__left">
                <div className="team-details__client-shape-1">
                  <img src={TeamDetailsImg2} alt="" />
                </div>
                <div className="team-details__img-box">
                  <div className="team-details__client-img">
                    <img src={member.img} alt={member.name} />
                  </div>
                  <div className="team-details__img-content">
                    <h3 className="team-details__client-name">{member.name}</h3>
                    <p className="team-details__sub-title">{member.role}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-8 col-lg-7">
              <div className="team-details__right">
                <h3 className="team-details__title-1">Biography</h3>
                <p className="team-details__text-1">{member.description}</p>
                {member.achievements && (
                  <>
                    <h3 className="team-details__title-1">Achievements</h3>
                    <ul className="team-details__achievements">
                      {member.achievements.map((ach, idx) => (
                        <li key={idx}>{ach}</li>
                      ))}
                    </ul>
                  </>
                )}
                {member.leadership && (
                  <>
                    <h3 className="team-details__title-1">Leadership & Advocacy</h3>
                    <p className="team-details__text-1">{member.leadership}</p>
                  </>
                )}
                {member.philosophy && (
                  <>
                    <h3 className="team-details__title-1">Personal Philosophy</h3>
                    <p className="team-details__text-1">{member.philosophy}</p>
                  </>
                )}
                {member.contact && (
                  <>
                    <h3 className="team-details__title-1">Contact Information</h3>
                    <p className="team-details__text-1">Phone: <a href={`tel:${member.contact.phone}`}>{member.contact.phone}</a></p>
                    <p className="team-details__text-1">Email: <a href={`mailto:${member.contact.email}`}>{member.contact.email}</a></p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*Team Details Info End*/}
    </div>
  );
}
const services = [
  {
    title: "Inturi Rekha",
    description:
      "Events bring people together for a shared experience and from weddings.",
      
    icon: "icon-camera",
    detailsLink: "/service-details",
    readMoreLink: "#",
  },
  {
    title: "Stellar Events Co",
    description:
      "Events bring people together for a shared experience and from weddings.",
    icon: "icon-skewer",
    detailsLink: "/service-details",
    readMoreLink: "#",
  },
  {
    title: "Elite Event Management",
    description:
      "Events bring people together for a shared experience and from weddings.",
    icon: "icon-dinner-table",
    detailsLink: "/service-details",
    readMoreLink: "#",
  },
];
// ...existing code...
