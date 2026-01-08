"use client";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

// Layout and components
import BackToTop from '../../components/elements/BackToTop';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import SiteBreadcrumb from '../../components/Common/Breadcumb';
import CtaTwo from '../../components/Common/CtaSection/CtaTwo';

// Assets
const navImg1 = `${process.env.PUBLIC_URL}/images/logo wpc.png`;
const bannerbg = `${process.env.PUBLIC_URL}/images/backgrounds/page10-header-bg.jpg`.replace("../assets/images", "images").replace("../../assets/images", "images").replace("../../../assets/images", "images");

// Team images
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

// ----------------------------------------------
// Team Member Data
// ----------------------------------------------
const teamDetails = [
  {
    id: "rekha",
    name: "Inturi Rekha",
    role: "President, WPC Telangana",
    img: TeamImg1,
    description:
      "Leads the WPC Telangana team with vision and determination. Advocates for inclusivity and equal opportunities for women in powerlifting.",
    achievements: [
      "Established multiple district-level training programs for women athletes.",
      "Promotes fitness and empowerment through strength sports."
    ],
    leadership:
      "Encourages grassroots participation and ensures transparency in team operations.",
    philosophy:
      "Believes that strength is not just physical, but also mental and emotional.",
  },
  {
    id: "kumari",
    name: "Inturi Kumari",
    role: "Chairman, WPC Telangana",
    img: TeamImg2,
    description:
      "A strong advocate for youth sports development and discipline through powerlifting.",
    achievements: [
      "Mentored over 100 young lifters across Telangana.",
      "Implemented athlete wellness programs for underprivileged sports enthusiasts."
    ],
    leadership:
      "Leads with compassion and fosters an environment of growth and learning.",
    philosophy:
      "Every athlete deserves a fair chance to shine with dedication and focus.",
  },
  {
    id: "pradeep",
    name: "Dr. H.A. Pradeep Kumar",
    role: "Vice Chairman, WPC Telangana",
    img: TeamImg3,
    description:
      "Vice President with over 30 years of international business experience. Medalist in Asian Powerlifting Championship.",
    achievements: [
      "Asian Powerlifting Medalist (2010, Mongolia)",
      "Karnataka Krista Rathna Award (2013)"
    ],
    leadership:
      "Guides strategy, builds athlete support systems, and promotes grassroots participation.",
    philosophy:
      "Uses sports to teach discipline, teamwork, and long-term success.",
  },
  {
    id: "guru",
    name: "Mr. Guru Parminder Singh",
    role: "State Secretary, WPC Telangana",
    img: TeamImg6,
    description:
      "Dynamic leader with a strong background in sports administration and event coordination.",
    achievements: [
      "Organized multiple inter-state powerlifting championships.",
      "Promotes youth development and fair play."
    ],
    leadership:
      "Manages organizational operations and ensures compliance with federation standards.",
    philosophy:
      "Teamwork and consistency build champions.",
  },
  {
    id: "moneess",
    name: "Mr. Moneess Pulelu",
    role: "Secretary - Rangareddy, WPC Telangana",
    img: TeamImg4,
    description:
      "Dedicated to athlete welfare and district-level growth in powerlifting.",
    achievements: [
      "Developed local training hubs in Rangareddy district.",
      "Initiated community-level strength awareness programs."
    ],
    leadership:
      "Ensures coordination between local clubs and state federation.",
    philosophy:
      "Hard work, honesty, and humility define a true athlete.",
  },
  {
    id: "abdul",
    name: "Mr. Abdul Ateeq",
    role: "Secretary - Hyderabad, WPC Telangana",
    img: TeamImg5,
    description:
      "Experienced sports coordinator focused on promoting urban powerlifting events.",
    achievements: [
      "Organized Hyderabad district championships since 2018.",
      "Supports athlete sponsorship and exposure."
    ],
    leadership:
      "Empowers young lifters and builds district-level unity.",
    philosophy:
      "Discipline and passion are the backbone of success.",
  },
  {
    id: "vijay",
    name: "Mr. G. Vijay",
    role: "Treasurer, WPC Telangana",
    img: TeamImg7,
    description:
      "Handles financial management with integrity and ensures smooth functioning of federation funds.",
    achievements: [
      "Streamlined fund allocation for athlete welfare.",
      "Implemented financial transparency system."
    ],
    leadership:
      "Balances administration with accountability.",
    philosophy:
      "Strong finances build a strong foundation for sports.",
  },
  {
    id: "mazhar",
    name: "Mr. Mir Mazhar Ali Khan",
    role: "President - Hyderabad District, WPC Telangana",
    img: TeamImg10,
    description:
      "A dedicated promoter of powerlifting at district level with focus on inclusivity.",
    achievements: [
      "Brought Hyderabad district teams to top 3 positions in state meets.",
      "Championed equal opportunities for men and women athletes."
    ],
    leadership:
      "Drives district-level programs and athlete motivation.",
    philosophy:
      "Encourages lifters to focus on consistency over competition.",
  },
  {
    id: "abhilash",
    name: "Mr. Abhilash Babde",
    role: "President - Rangareddy, WPC Telangana",
    img: TeamImg9,
    description:
      "Energetic leader managing Rangareddy district’s athlete development programs.",
    achievements: [
      "Increased membership and athlete participation by 40%.",
      "Promotes local tournaments and scouting initiatives."
    ],
    leadership:
      "Encourages inter-district collaboration for stronger competition.",
    philosophy:
      "Unity and passion make powerlifting thrive.",
  },
  {
    id: "manoj",
    name: "Mr. Deeti Manoj Kumar",
    role: "State Media Coordinator, WPC Telangana",
    img: TeamImg8,
    description:
      "Responsible for promoting federation activities and athlete stories through media.",
    achievements: [
      "Developed digital campaigns for WPC Telangana.",
      "Increased media reach and social engagement by 200%."
    ],
    leadership:
      "Uses storytelling to inspire athletes and fans alike.",
    philosophy:
      "Media is the mirror that reflects the strength of sports.",
  },
  {
    id: "sukanya",
    name: "Ms. Sukanya Chowdary",
    role: "State Media Coordinator, WPC Telangana",
    img: TeamImg11,
    description:
      "A communication specialist who empowers athletes by sharing their journeys.",
    achievements: [
      "Produced state-level sports documentaries.",
      "Supports awareness campaigns for women in sports."
    ],
    leadership:
      "Ensures representation and outreach for women powerlifters.",
    philosophy:
      "Empowerment through visibility and storytelling.",
  },
  {
    id: "kiran",
    name: "Mr. Kiran Kumar",
    role: "President - Medchal, WPC Telangana",
    img: TeamImg12,
    description:
      "Dedicated district president known for promoting local talent and organizing events.",
    achievements: [
      "Initiated annual Medchal Powerlifting Cup.",
      "Trains young athletes to represent Telangana at national level."
    ],
    leadership:
      "Focuses on grassroots-level athlete nurturing.",
    philosophy:
      "Strength begins with commitment and community.",
  },
];

// ----------------------------------------------
// Component
// ----------------------------------------------
const TeamDetailsPage = () => {
  const { id } = useParams();
  const member = teamDetails.find((m) => m.id === id);
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setIsVisible(scrollTop > 300);
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  if (!member) {
    return (
      <div className="container text-center py-5">
        <h2>Member not found</h2>
        <Link to="/team" className="btn btn-primary mt-3">Back to Team</Link>
      </div>
    );
  }

  return (
    <React.Fragment>
      {/* Header */}
      <Header navImg={navImg1} parentMenu='team' activeMenu="/team" />

      {/* Breadcrumb */}
      <SiteBreadcrumb
        pageTitle={member.name}
        pageName="Team Details"
        breadcrumbsImg={bannerbg}
      />

      {/* Member Details */}
      <section className="team-details py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 text-center mb-4 mb-lg-0">
              <img
                src={member.img}
                alt={member.name}
                className="img-fluid rounded shadow-lg"
                style={{ borderRadius: "20px", maxWidth: "100%" }}
              />
            </div>
            <div className="col-lg-7">
              <h2 className="mb-2">{member.name}</h2>
              <h5 className="text-primary mb-3">{member.role}</h5>
              <p className="mb-3">{member.description}</p>

              <h6 className="mt-4">Achievements</h6>
              <ul>
                {member.achievements.map((ach, i) => (
                  <li key={i}>{ach}</li>
                ))}
              </ul>

              <h6 className="mt-4">Leadership</h6>
              <p>{member.leadership}</p>

              <h6 className="mt-4">Philosophy</h6>
              <p>{member.philosophy}</p>

              {/* Back to Team Button */}
              <Link to="/team" className="btn mt-3 back-to-team-btn">← Back to Team</Link>

            </div>
          </div>
        </div>
      </section>

      {/* CTA + Footer */}
      <CtaTwo />
      <Footer />
      <BackToTop scroll={isVisible} />

      {/* Inline CSS for button hover */}
      <style jsx="true">{`
      .back-to-team-btn {
        background-color: #c2185b; /* dark pink */
         color: #fff;
         border: none;
         padding: 10px 20px;
         border-radius: 8px;
         transition: all 0.3s ease;
         font-weight: 500;
}

.back-to-team-btn:hover {
   background-color: rgba(194, 24, 91, 0.8); /* slightly transparent dark pink */
    transform: translateY(-2px);
     box-shadow: 0 4px 10px rgba(194, 24, 91, 0.4);
     color: #fff;
}

      `}</style>
    </React.Fragment>
  );
};

export default TeamDetailsPage;
