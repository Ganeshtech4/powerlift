import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import BackToTop from "../../components/elements/BackToTop";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import SiteBreadcrumb from "../../components/Common/Breadcumb";
import CtaTwo from "../../components/Common/CtaSection/CtaTwo";

const navImg1 = `${process.env.PUBLIC_URL}/images/logo wpc.png`;
const bannerbg = `${process.env.PUBLIC_URL}/images/backgrounds/page6-header-bg.jpg`.replace("../assets/images", "images").replace("../../assets/images", "images").replace("../../../assets/images", "images");
const inspireimg1 = `${process.env.PUBLIC_URL}/images/team/Adobe Express - file.jpg`.replace("../assets/images", "images").replace("../../assets/images", "images").replace("../../../assets/images", "images");
const inspireimg2 = `${process.env.PUBLIC_URL}/images/team/team-1-3.jpg`.replace("../assets/images", "images").replace("../../assets/images", "images").replace("../../../assets/images", "images");
const inspireimg3 = `${process.env.PUBLIC_URL}/images/team/Adobe Express - file (1).jpg`.replace("../assets/images", "images").replace("../../assets/images", "images").replace("../../../assets/images", "images");


const InspireDetails = () => {
  const { id } = useParams();
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => setIsVisible(window.scrollY > 300);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  const stories = [
    {
      id: 1,
      name: "Inturi Rekha",
      role: "International Referee",
      image: inspireimg1,
      quote: "A visionary leader and champion powerlifter driving excellence in sports and leadership.",
      achievements: [
        "World Powerlifting Champion (2023): Secured the Gold Medal in the 75 kg Open Class.",
        "World Cup Best Lifter (2023, Kyrgyzstan): Recognized for her outstanding performance and dominance in international competition.",
        "Strong Woman of India: Honored for her exceptional achievements and contributions to the sport.",
        "First Female International Referee: Made history as the first woman to officiate at international powerlifting events, breaking barriers and setting new standards."
      ],
    },
    {
      id: 2,
      name: "HA Pradeep kumar",
      role: "National Referee",
      image: inspireimg2,
      quote: "Empowering athletes through strength, strategy, and service.",
      achievements: [
        "International Powerlifter and Medalist at the 2010 Asian Powerlifting Championship in Mongolia.",
        "State-level Boxer and Athlete with a strong background in competitive sports.",
        "NCC Republic Day Parade Representative (1983).",
        "Recipient of the Karnataka Krista Rathna Award (2013) for his outstanding contributions to society."
        

      ],
    },
    {
      id: 3,
      name: "Manthena Sai Teja",
      role: "National Referee",
      image: inspireimg3,
      quote: "WPC Telangana inspires every young athlete to stay consistent and confident. Hard work truly pays off here.",
      achievements: [
        "State Referee, WPC Telangana: Plays a key role in maintaining competition standards and officiating events with integrity.",
        "Certified Personal Trainer: Recognized for his expertise in fitness and strength coaching.",
        "Olympic-Level Trainer (Clean and Jerk Specialist): Brings advanced technical training methods to powerlifting and strength development.",
        
      ],
    },
   
  ];

  const athlete = stories.find((story) => story.id === parseInt(id));

  return (
    <>
      <Header navImg={navImg1} parentMenu="Inspire" activeMenu="/inspire" />

      <SiteBreadcrumb
        pageTitle="Inspire Details"
        pageName="Inspire"
        breadcrumbsImg={bannerbg}
      />

      <section className="blog-page inspire-details-page py-5">
        <div className="container">
          {!athlete ? (
            <div className="text-center my-5">
              <h3>Story not found</h3>
              <Link to="/referees" className="thm-btn">
                Back to Referees Page
              </Link>
            </div>
          ) : (
            <div className="row align-items-center">
              <div className="col-md-5">
                <img
                  src={athlete.image}
                  alt={athlete.name}
                  className="img-fluid rounded shadow"
                />
              </div>
              <div className="col-md-7">
                <h2 className="mb-3">{athlete.name}</h2>
                <h5 className="text-primary mb-3">{athlete.role}</h5>
                <p className="lead mb-4">“{athlete.quote}”</p>
                <h4>Achievements</h4>
                <ul>
                  {athlete.achievements.map((ach, index) => (
                    <li key={index}>🏅 {ach}</li>
                  ))}
                </ul>
                <Link to="/referees" className="thm-btn mt-4">
                  ← Back to Referees Page
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <CtaTwo />
      <BackToTop scroll={isVisible} />
      <Footer />

     <style>{`
  .inspire-details-page { animation: fadeIn 0.6s ease-in-out; }
  ul { list-style: none; padding: 0; }
  ul li { font-size: 16px; margin-bottom: 8px; }

  /* Updated button color to dark pink */
  .thm-btn {
    display: inline-block; 
    padding: 10px 20px;
    background: #ff1493; 
    color: #fff;
    border-radius: 8px; 
    font-weight: 600;
    text-decoration: none; 
    transition: background 0.3s;
  }
  .thm-btn:hover { background: #e0137a; }

  /* Optional: change role color to dark pink too */
  .text-primary { color: #ff1493 !important; }

  @keyframes fadeIn { 
    from { opacity: 0; transform: translateY(20px); } 
    to { opacity: 1; transform: translateY(0); } 
  }
`}</style>

    </>
  );
};

export default InspireDetails;
