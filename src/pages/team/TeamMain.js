"use client";
import React from "react"; // Add useState here
import { Link } from 'react-router-dom'; // Use react-router-dom for routing.
const TeamImg1 = `${process.env.PUBLIC_URL}/images/team/team-1-1.jpg`.replace("../assets/images", "images").replace("../../assets/images", "images").replace("../../../assets/images", "images");
const TeamImg2 = `${process.env.PUBLIC_URL}/images/team/team-1-2.jpg`.replace("../assets/images", "images").replace("../../assets/images", "images").replace("../../../assets/images", "images");
const TeamImg3 = `${process.env.PUBLIC_URL}/images/team/team-1-3.jpg`.replace("../assets/images", "images").replace("../../assets/images", "images").replace("../../../assets/images", "images");
const TeamImg4 = `${process.env.PUBLIC_URL}/images/team/team-1-4.jpg`.replace("../assets/images", "images").replace("../../assets/images", "images").replace("../../../assets/images", "images");
const TeamImg5 = `${process.env.PUBLIC_URL}/images/team/team-1-5.jpg`.replace("../assets/images", "images").replace("../../assets/images", "images").replace("../../../assets/images", "images");
const TeamImg6 = `${process.env.PUBLIC_URL}/images/team/team-1-6.jpg`.replace("../assets/images", "images").replace("../../assets/images", "images").replace("../../../assets/images", "images");
const TeamImg7 = `${process.env.PUBLIC_URL}/images/team/team-1-7.jpg`.replace("../assets/images", "images").replace("../../assets/images", "images").replace("../../../assets/images", "images");
const TeamImg8 = `${process.env.PUBLIC_URL}/images/team/team-1-8.jpg`.replace("../assets/images", "images").replace("../../assets/images", "images").replace("../../../assets/images", "images");
const TeamImg9 = `${process.env.PUBLIC_URL}/images/team/team-1-9.jpg`.replace("../assets/images", "images").replace("../../assets/images", "images").replace("../../../assets/images", "images");
const TeamImg10 = `${process.env.PUBLIC_URL}/images/team/team-1-10.jpg`.replace("../assets/images", "images").replace("../../assets/images", "images").replace("../../../assets/images", "images");
const TeamImg11 = `${process.env.PUBLIC_URL}/images/team/team-1-11.jpg`.replace("../assets/images", "images").replace("../../assets/images", "images").replace("../../../assets/images", "images");
const TeamImg12 = `${process.env.PUBLIC_URL}/images/team/team-1-12.jpg`.replace("../assets/images", "images").replace("../../assets/images", "images").replace("../../../assets/images", "images");

const teamMembers = [
  {
    id: "rekha",
    name: "Inturi Rekha",
    role: "President,WPC Telangana",
    img: TeamImg1,
    description:
      "",
  },
  {
    id: "kumari",
    name: "Inturi Kumari",
    role: "Chairman,WPC Telangana",
    img: TeamImg2,
    description:
      "",
  },
  {
    id: "pradeep",
    name: "Dr.H.A.Pradeep Kumar",
    role: "Vice Chairman,WPC Telangana",
    img: TeamImg3,
    description:
      "",
  },
  {
    id: "guru",
    name: "Mr.Guru Parminder Singh",
    role: "State Secretary,WPC Telangana",
    img: TeamImg6,
    description:
      "",
  },
  {
    id: "moneess",
    name: "Mr.Moneess Pulelu",
    role: "Secretary-Rangareddy,WPC Telangana",
    img: TeamImg4,
    description:
      "",
  },
  {
    id: "abdul",
    name: "Mr.Abdul Ateeq",
    role: "Secretary-hyderabad,WPC Telangana",
    img: TeamImg5,
    description:
      "",
  },
  {
    id: "vijay",
    name: "Mr.G.VijaY",
    role: "Treasurer,WPC Telangana",
    img: TeamImg7,
    description:
      "",
  },
   {
  id: "kiran",
  name: "Mr.Kiran Kumar",
  role: "President-Medchal,WPC Telangana",
  img: TeamImg12,
  description: "",
},
  {
    id: "mazhar",
    name: "Mr.Mir Mazhar Ali khan",
    role: " President-Hyderabad District,WPC Telangana",
    img: TeamImg10,
    description:
      "",
  },
  {
    id: "abhilash",
    name: "Mr.Abhilash babde",
    role: "President-Rangareddy,WPC Telangana",
    img: TeamImg9,
    description:
      "",
  },
  {
   id: "manoj",
   name: "Mr.Deeti manoj Kumar",
   role: "State Media Coordinator,WPC Telangana",
   img: TeamImg8,
    description:
      "",
  },
  {
   id: "sukanya",
   name: "Ms.Sukanya Chowdary",
   role: "State Media Coordinator,WPC Telangana",
   img: TeamImg11,
    description:
      "",
  },
 
];
export default function Home() {
  return (

          <section className="team-page">
            <div className="container">
              <div className="row">
                {teamMembers.map((member, index) => (
                  <div
                    key={index}
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
                              {member.description}
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
  );
}
