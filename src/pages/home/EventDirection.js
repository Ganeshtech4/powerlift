"use client"; // Ensures the component runs on the client side

import { useState } from "react";
import CountUp from "react-countup";
import directionIcon from '../../assets/images/icon/event-direction-chat-icon.png';

export default function EventDirection() {
  // State for dynamic content
  const [eventContent] = useState({
    tagline: "WPC-Telangana Leadership",
    title: "Building Strength <br> Across Telangana",
    text: "The World Powerlifting Congress Telangana chapter is dedicated to promoting powerlifting excellence <br> throughout the state with professional guidance and championship opportunities.",
    phone: "7330778111",
    callText: "Contact President",
    callNumber: "Inturi Rekha (+91 73307 78111)",
    email: "powerliftingassociationofts@gmail.com",
    iconSrc: directionIcon,
  });

  return (
    <>
      {/* Event Direction Start */}
      <section className="event-direction">
        <div className="container">
          <div className="event-direction__inner">
            <div className="row">
              <div className="col-xl-7 wow fadeInLeft" data-wow-delay="100ms">
                <div className="event-direction__left">
                  <div className="section-title text-left">
                    <div className="section-title__tagline-box">
                      <span className="section-title__tagline">{eventContent.tagline}</span>
                    </div>
                    <h2 className="section-title__title" dangerouslySetInnerHTML={{ __html: eventContent.title }}></h2>
                  </div>
                  <p className="event-direction__text" dangerouslySetInnerHTML={{ __html: eventContent.text }}></p>
                  <div className="event-direction__call">
                    <div className="event-direction__call-icon">
                      <img src={eventContent.iconSrc} alt="Contact Icon" />
                    </div>
                    <div className="event-direction__call-content">
                      <p>{eventContent.callText}</p>
                      <h4><a href={`tel:${eventContent.phone}`}>{eventContent.callNumber}</a></h4>
                      <p style={{marginTop: "10px", fontSize: "14px"}}>
                        Email: <a href={`mailto:${eventContent.email}`} style={{color: "#ff6b35"}}>{eventContent.email}</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-5 wow fadeInRight" data-wow-delay="300ms">
                <div className="event-direction__right">
                <ul className="event-direction__counter list-unstyled">
                    <li>
                      <div className="event-direction__counter-single">
                        <div className="event-direction__counter-box">
                          <h3 className="odometer">
                            <CountUp start={0} end={150} duration={2} />
                          </h3>
                          <span className="event-direction__counter-plus">
                            +
                          </span>
                        </div>
                        <p className="event-direction__counter-text">
                          Registered Athletes
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="event-direction__counter-single">
                        <div className="event-direction__counter-box">
                          <h3 className="odometer">
                            <CountUp start={0} end={25} duration={2} />
                          </h3>
                          <span className="event-direction__counter-plus">
                            +
                          </span>
                        </div>
                        <p className="event-direction__counter-text">
                          Championships Held
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="event-direction__counter-single">
                        <div className="event-direction__counter-box">
                          <h3 className="odometer">
                            <CountUp start={0} end={15} duration={2} />
                          </h3>
                          <span className="event-direction__counter-plus">
                            +
                          </span>
                        </div>
                        <p className="event-direction__counter-text">
                          Certified Coaches
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="event-direction__counter-single">
                        <div className="event-direction__counter-box">
                          <h3 className="odometer">
                            <CountUp start={0} end={8} duration={2} />
                          </h3>
                          <span className="event-direction__counter-plus">
                            +
                          </span>
                        </div>
                        <p className="event-direction__counter-text">
                          District Chapters
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Event Direction End */}
    </>
  );
}
