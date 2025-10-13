// TeamTwo.js
"use client"; // Mark this component as a client component
import { Link } from 'react-router-dom';
import TeamImg1 from '../../assets/images/team/team-2-1.jpg';
import TeamImg2 from '../../assets/images/team/team-2-2.jpg';
import TeamImg3 from '../../assets/images/team/team-2-3.jpg';

export default function TeamTwo() {
  const teamMembers = [
    {
      name: "Sakib Al Hasan",
      role: "Web Development",
      imgSrc: TeamImg1,
      description: "Events are special occasions where people gather together to celebrate commemorate participate.",
      socialLinks: [
        { platform: "Instagram", link: "#" },
        { platform: "Facebook", link: "#" },
        { platform: "FI", link: "#" },
        { platform: "LinkedIn", link: "#" },
      ],
    },
    {
      name: "Devid Bekham",
      role: "UI/UX DESIGN",
      imgSrc: TeamImg2,
      description: "Events are special occasions where people gather together to celebrate commemorate participate.",
      socialLinks: [
        { platform: "Instagram", link: "#" },
        { platform: "Facebook", link: "#" },
        { platform: "FI", link: "#" },
        { platform: "LinkedIn", link: "#" },
      ],
    },
    {
      name: "Andre Rusell",
      role: "Web Development",
      imgSrc: TeamImg3,
      description: "Events are special occasions where people gather together to celebrate commemorate participate.",
      socialLinks: [
        { platform: "Instagram", link: "#" },
        { platform: "Facebook", link: "#" },
        { platform: "FI", link: "#" },
        { platform: "LinkedIn", link: "#" },
      ],
    },
  ];

  return (
    <section className="team-two">
      <div className="container">
        <div className="section-title text-center">
          <div className="section-title__tagline-box">
            <span className="section-title__tagline">Our Team Member</span>
          </div>
          <h2 className="section-title__title section-title__title--two">
            Where Every Event Shines <br /> Bright Celebrate Life
          </h2>
        </div>
        <div className="row">
          {teamMembers.map((member, index) => (
            <div key={index} className={`col-xl-4 col-lg-4 col-md-6 wow ${index % 2 === 0 ? 'fadeInLeft' : (index % 2 === 1 ? 'fadeInUp' : 'fadeInRight')}`} data-wow-delay={`${(index + 1) * 100}ms`}>
              <div className="team-two__single">
                <div className="team-two__img">
                  <img src={member.imgSrc} alt={member.name} />
                </div>
                <div className="team-two__content-box">
                  <div className="team-two__sub-title-box">
                    <h5>{member.role}</h5>
                  </div>
                  <div className="team-two__content">
                    <h3 className="team-two__name"><Link to="/team-details">{member.name}</Link></h3>
                    <p className="team-two__text">{member.description}</p>
                    <div className="team-two__social">
                      {member.socialLinks.map((link, idx) => (
                        <a key={idx} href={link.link}><span className={`icon-${link.platform.toLowerCase()}`}></span></a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};