// "use client";
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

// ✅ Import all event-related images
import EventDetailsImg1 from "../../assets/images/resources/event-details-img-box-img-1.jpg";
import EventDetailsImg2 from "../../assets/images/resources/event-details-img-box-img-2.jpg";
import EventDetailsImg3 from "../../assets/images/resources/event-details-img-1.jpg";
import EventDetailsImg4 from "../../assets/images/resources/event-details-img-box-img-3.jpg";
import EventDetailsImg5 from "../../assets/images/resources/event-details-img-box-img-4.jpg";
import EventDetailsImg6 from "../../assets/images/resources/event-details-img-2.jpg";
import EventDetailsImg7 from "../../assets/images/resources/schedule-one-1-3.jpg";
import EventDetailsImg8 from "../../assets/images/resources/event-details-img-box-img-6.jpg";
import EventDetailsImg9 from "../../assets/images/resources/event-details-img-3.jpg";
import EventDetailsImg10 from "../../assets/images/resources/event-details-img-box-img-7.jpg";
import EventDetailsImg11 from "../../assets/images/resources/event-details-img-box-img-8.jpg";
import EventDetailsImg12 from "../../assets/images/resources/event-details-img-4.jpg";
import EventDetailsImg13 from "../../assets/images/resources/event-details-img-box-img-9.jpg";
import EventDetailsImg14 from "../../assets/images/resources/event-details-img-box-img-10.jpg";
import EventDetailsImg15 from "../../assets/images/resources/event-details-img-5.jpg";
import EventDetailsImg16 from "../../assets/images/resources/event-details-img-box-img-11.jpg";
import EventDetailsImg17 from "../../assets/images/resources/event-details-img-box-img-12.jpg";
import EventDetailsImg18 from "../../assets/images/resources/event-details-img-6.jpg";
import EventDetailsImg19 from "../../assets/images/resources/event-details-img-box-img-13.jpg";
import EventDetailsImg20 from "../../assets/images/resources/event-details-img-box-img-14.jpg";
import EventDetailsImg21 from "../../assets/images/resources/event-details-img-7.jpg";
import EventDetailsImg22 from "../../assets/images/resources/event-details-img-box-img-15.jpg";
import EventDetailsImg23 from "../../assets/images/resources/event-details-img-box-img-16.jpg";
import EventDetailsImg24 from "../../assets/images/resources/event-details-img-8.jpg";
import EventDetailsImg25 from "../../assets/images/resources/event-details-img-box-img-17.jpg";
import EventDetailsImg26 from "../../assets/images/resources/event-details-img-box-img-18.jpg";
import EventDetailsImg27 from "../../assets/images/resources/event-details-img-9.jpg";

export default function EventDetails() {
  const { eventId } = useParams();
  const [activeTab, setActiveTab] = useState("");

  // Set active tab based on URL or default to first
  useEffect(() => {
    setActiveTab(eventId || "year-1");
  }, [eventId]);

  // ✅ Events data
  const tabs = [
    {
      id: "year-1",
      // year: "2019",
      location: "Hyderabad, Telangana, India",
      time: "10 AM - 8 PM | 12 May 2023",
      title: "State Championship",
      contentText:
        "The State Championship brought together top fitness and powerlifting athletes from across the region. Participants showcased their strength and endurance through intense rounds of competition, setting new state records and celebrating the spirit of sportsmanship.",
      mainImg: EventDetailsImg24,
      imgs: [EventDetailsImg22, EventDetailsImg23],
    },
    {
      id: "year-3",
      // year: "2021",
      location: "Hyderabad, Telangana, India",
      time: "10 AM - 7 PM | 10 April 2023",
      title: "Gym Point Championship",
      contentText:
        "The Gym Point Championship featured a mix of professional and amateur lifters, highlighting technical precision, consistency, and community engagement. It encouraged new lifters to step onto the professional stage and gain valuable experience.",
      mainImg: EventDetailsImg7,
      imgs: [EventDetailsImg8, EventDetailsImg9],
    },
    {
      id: "year-4",
      // year: "2022",
      location: "Hyderabad, Telangana, India",
      time: "9 AM - 8 PM | 18 June 2023",
      title: "Origin Championship",
      contentText:
        "The Origin Championship was a landmark event focusing on raw power and natural lifting techniques. With strict adherence to professional standards, it aimed to promote drug-free, strength-based competition and inspire upcoming athletes.",
      mainImg: EventDetailsImg12,
      imgs: [EventDetailsImg10, EventDetailsImg11],
    },
    {
      id: "year-5",
      // year: "2022",
      location: "Hyderabad, Telangana, India",
      time: "10 AM - 9 PM | 23 July 2023",
      title: "Ozzie Championship",
      contentText:
        "The Ozzie Championship celebrated athletic diversity, inviting competitors from across India to challenge their limits. The event featured team relays, endurance tests, and expert-led workshops on strength training and nutrition.",
      mainImg: EventDetailsImg15,
      imgs: [EventDetailsImg13, EventDetailsImg14],
    },
    {
      id: "year-6",
      // year: "2023",
      location: "Hyderabad, Telangana, India",
      time: "9 AM - 7 PM | 15 April 2023",
      title: "Potens Championship",
      contentText:
        "Potens Championship was designed to identify the most promising athletes of the year. With an electrifying audience and world-class judging standards, it showcased powerlifting excellence and inspired fitness enthusiasts nationwide.",
      mainImg: EventDetailsImg18,
      imgs: [EventDetailsImg16, EventDetailsImg17],
    },
    {
      id: "year-7",
      // year: "2024",
      location: "Hyderabad, Telangana, India",
      time: "10 AM - 9 PM | 10 March 2025",
      title: "Second State Championship",
      contentText:
        "Following the success of the first edition, the Second State Championship returned with enhanced facilities, larger participation, and international-level judging. The event was a true celebration of strength, determination, and unity among athletes.",
      mainImg: EventDetailsImg21,
      imgs: [EventDetailsImg19, EventDetailsImg20],
    },
    {
      id: "year-8",
      // year: "2024",
      location: "Hyderabad, Telangana, India",
      time: "9 AM - 5 PM | 25 June 2023",
      title: "Telangana First State Championship",
      contentText:
        "A knowledge-focused event featuring industry professionals, trainers, and athletes who shared insights on nutrition, recovery, injury prevention, and mental fitness. Attendees gained valuable hands-on experience through interactive sessions.",
      mainImg: EventDetailsImg6,
      imgs: [EventDetailsImg4, EventDetailsImg5],
    },
    {
      id: "year-9",
      // year: "2025",
      location: "Hyderabad, Telangana, India",
      time: "10 AM - 10 PM | 20 April 2023",
      title: "FSG Independence Day",
      contentText:
        "A personal portfolio is a curated collection of an individual's professional work.",
      mainImg: EventDetailsImg27,
      imgs: [EventDetailsImg25, EventDetailsImg26],
    },
    {
      id: "year-10",
      // year: "2025",
      location: "Hyderabad, Telangana, India",
      time: "9 AM - 8 PM | 10 August 2023",
      title: "AF Championship",
      contentText:
        "The AF Championship marked the culmination of a decade of athletic growth. It featured elite competitors, international guests, and live demonstrations, embodying excellence in fitness, strength, and community spirit.",
      mainImg: EventDetailsImg3,
      imgs: [EventDetailsImg1, EventDetailsImg2],
    },
  ];

  const selectedTab = tabs.find((tab) => tab.id === activeTab) || tabs[0];

  return (
    <section className="event-details">
      <div className="container">
        <div className="row">
          {/* Left side */}
          <div className="col-xl-8 col-lg-7">
            <div className="event-details__left">
              {/* ✅ Main Image */}
              <div className="event-details__img">
                <img src={selectedTab.mainImg} alt={selectedTab.title} />
              </div>

              <div className="event-details__main-tab-box tabs-box">
                {/* ✅ Tabs */}
                {/* <ul className="tab-buttons clearfix list-unstyled">
                  {tabs.map((tab) => (
                    <li
                      key={tab.id}
                      className={`tab-btn ${activeTab === tab.id ? "active-btn" : ""
                        }`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <p>{tab.year}</p>
                    </li>
                  ))}
                </ul> */}

                {/* ✅ Tab Content */}
                <div className="tabs-content">
                  <div className="event-details__tab-content-box">
                    <ul className="event-details__meta list-unstyled">
                      <li>
                        <p>
                          <span className="icon-clock"></span>
                          {selectedTab.location}
                        </p>
                      </li>
                      <li>
                        <p>
                          <span className="icon-pin"></span>
                          {selectedTab.time}
                        </p>
                      </li>
                    </ul>

                    <h3 className="event-details__title-1">
                      {selectedTab.title}
                    </h3>
                    <p className="event-details__text-1">
                      {selectedTab.contentText}
                    </p>

                    {/* ✅ Dynamic Images */}
                    <div className="event-details__img-box">
                      <div className="row">
                        {selectedTab.imgs &&
                          selectedTab.imgs.map((img, index) => (
                            <div className="col-xl-6" key={index}>
                              <div className="event-details__img-box-img">
                                <img
                                  src={img}
                                  alt={`Event ${selectedTab.year} image ${index + 1
                                    }`}
                                />
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="event-details__points-box">
                      <ul className="event-details__points list-unstyled">
                        <li>
                          <div className="icon">
                            <span className="icon-double-angle"></span>
                          </div>
                          <p>Creating Memories, One Event at a Time</p>
                        </li>
                        <li>
                          <div className="icon">
                            <span className="icon-double-angle"></span>
                          </div>
                          <p>Celebrate in Style, Celebrate with Class</p>
                        </li>
                      </ul>
                      <ul className="event-details__points list-unstyled">
                        <li>
                          <div className="icon">
                            <span className="icon-double-angle"></span>
                          </div>
                          <p>Where Events Come to Life</p>
                        </li>
                        <li>
                          <div className="icon">
                            <span className="icon-double-angle"></span>
                          </div>
                          <p>Making Your Event Dreams Come True</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="col-xl-4 col-lg-5">
            <div className="event-details__right">
              <div className="event-details__speakers">
                <h3 className="event-details__speakers-title">Speakers</h3>
                <p className="event-details__speakers-sub-title">
                  10 Speakers
                </p>
                <p className="event-details__speakers-text">
                  Join industry-leading experts sharing insights, design trends,
                  and innovation stories.
                </p>
              </div>

              <div className="event-details__ticket">
                <h3 className="event-details__ticket-title">
                  Are you Interested??
                </h3>
                <p className="event-details__ticket-sub-title">Call Us Now</p>
                <div className="event-details__ticket-icon">
                  <span className="icon-call"></span>
                </div>
                <p className="event-details__ticket-sub-title-2">
                  For fast service
                </p>
                <h3 className="event-details__ticket-number">
                  <Link to="tel:+91-7330778111">+91-7330778111</Link>
                </h3>
              </div>

              <div className="event-details__ticket-two">
                <h3 className="event-details__ticket-two-title">
                  Want to join this event?
                </h3>
                <p className="event-details__ticket-two-text">
                  Just connect us through our social media platforms,we will eroll u 
                </p>
                <div className="event-details__ticket-two-btn-box">
                  <Link
                    to="#"
                    className="event-details__ticket-two-btn thm-btn"
                  >
                    Membership <span className="icon-arrow-right"></span>
                  </Link>
                </div>
              </div>

              <div className="event-details__location">
                <h3 className="event-details__location-title">Location</h3>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31785.123456!2d78.2820!3d17.5206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb…somehash…!2sVandanapuri%20Colony%20Hyderabad!5e0!3m2!1sen!2sin!4v169xxx"
                  className="google-map__one"
                  allowFullScreen
                  title="Event Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
