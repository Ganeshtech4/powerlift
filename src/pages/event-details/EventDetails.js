"use client";
import React, { useState } from "react"; // Add useState here
import { Link } from 'react-router-dom'; // Use react-router-dom for routing.
import EventDetailsImg1 from '../../assets/images/resources/event-details-img-box-img-1.jpg'
import EventDetailsImg2 from '../../assets/images/resources/event-details-img-box-img-2.jpg'
import EventDetailsImg3 from '../../assets/images/resources/event-details-img-1.jpg'
export default function Home() {
  const [activeTab, setActiveTab] = useState("year-1");

  const tabs = [
    {
      id: "year-1",
      year: "2019",
      content: (
        <div className="event-details__tab-content-box">
          <ul className="event-details__meta list-unstyled">
            <li>
              <p>
                <span className="icon-clock"></span>
                Mirpur 01 Road N 12 Dhaka Bangladesh
              </p>
            </li>
            <li>
              <p>
                <span className="icon-pin"></span>
                10 AM To 10 PM 20 April 2019
              </p>
            </li>
          </ul>
          <h3 className="event-details__title-1">
            UI/UX Designer Meet Up 2019
          </h3>
          <p className="event-details__text-1">
            Events are special occasions where people gather together to
            celebrate an Events are special occasions where people gather
            together to eommemorate vents are special occasions where people
            gather
          </p>
          <p className="event-details__text-2">
            Real estate is a lucrative industry that involves the buying selling
            and renting properties It encompasses residential commercial and
            industrial designsin properties. Real estate agents play a crucial
          </p>
          <div className="event-details__img-box">
            <div className="row">
              <div className="col-xl-6">
                <div className="event-details__img-box-img">
                  <img
                    src={EventDetailsImg1}
                    alt=""
                  />
                </div>
              </div>
              <div className="col-xl-6">
                <div className="event-details__img-box-img">
                  <img
                    src={EventDetailsImg2}
                    alt=""
                  />
                </div>
              </div>
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
          <p className="event-details__text-3">
            Real estate is a lucrative industry that involves the buying selling
            and renting properties It encompasses residential commercial and
            industrial designsin properties. Real estate agents play a crucial
          </p>
          <p className="event-details__text-4">
            Events are special occasions where people gather together to
            celebrate an Events are special occasions where people gather
            together to eommemorate vents are special occasions where people
            gather
          </p>
        </div>
      ),
    },
    {
      id: "year-2",
      year: "2018",
      content: (
        <div className="event-details__tab-content-box">
          <ul className="event-details__meta list-unstyled">
            <li>
              <p>
                <span className="icon-clock"></span>
                Mirpur 01 Road N 12 Dhaka Bangladesh
              </p>
            </li>
            <li>
              <p>
                <span className="icon-pin"></span>
                10 AM To 10 PM 20 April 2018
              </p>
            </li>
          </ul>
          <h3 className="event-details__title-1">
            UI/UX Designer Meet Up 2018
          </h3>
          <p className="event-details__text-1">
            Events are special occasions where people gather together to
            celebrate an Events are special occasions where people gather
            together to eommemorate vents are special occasions where people
            gather
          </p>
          <p className="event-details__text-2">
            Real estate is a lucrative industry that involves the buying selling
            and renting properties It encompasses residential commercial and
            industrial designsin properties. Real estate agents play a crucial
          </p>
          <div className="event-details__img-box">
            <div className="row">
              <div className="col-xl-6">
                <div className="event-details__img-box-img">
                  <img
                    src={EventDetailsImg1}
                    alt=""
                  />
                </div>
              </div>
              <div className="col-xl-6">
                <div className="event-details__img-box-img">
                  <img
                    src={EventDetailsImg2}
                    alt=""
                  />
                </div>
              </div>
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
          <p className="event-details__text-3">
            Real estate is a lucrative industry that involves the buying selling
            and renting properties It encompasses residential commercial and
            industrial designsin properties. Real estate agents play a crucial
          </p>
          <p className="event-details__text-4">
            Events are special occasions where people gather together to
            celebrate an Events are special occasions where people gather
            together to eommemorate vents are special occasions where people
            gather
          </p>
        </div>
      ),
    },
    {
      id: "year-3",
      year: "2020",
      content: (
        <div className="event-details__tab-content-box">
          <ul className="event-details__meta list-unstyled">
            <li>
              <p>
                <span className="icon-clock"></span>
                Mirpur 01 Road N 12 Dhaka Bangladesh
              </p>
            </li>
            <li>
              <p>
                <span className="icon-pin"></span>
                10 AM To 10 PM 20 April 2020
              </p>
            </li>
          </ul>
          <h3 className="event-details__title-1">
            UI/UX Designer Meet Up 2020
          </h3>
          <p className="event-details__text-1">
            Events are special occasions where people gather together to
            celebrate an Events are special occasions where people gather
            together to eommemorate vents are special occasions where people
            gather
          </p>
          <p className="event-details__text-2">
            Real estate is a lucrative industry that involves the buying selling
            and renting properties It encompasses residential commercial and
            industrial designsin properties. Real estate agents play a crucial
          </p>
          <div className="event-details__img-box">
            <div className="row">
              <div className="col-xl-6">
                <div className="event-details__img-box-img">
                  <img
                    src={EventDetailsImg1}
                    alt=""
                  />
                </div>
              </div>
              <div className="col-xl-6">
                <div className="event-details__img-box-img">
                  <img
                    src={EventDetailsImg2}
                    alt=""
                  />
                </div>
              </div>
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
          <p className="event-details__text-3">
            Real estate is a lucrative industry that involves the buying selling
            and renting properties It encompasses residential commercial and
            industrial designsin properties. Real estate agents play a crucial
          </p>
          <p className="event-details__text-4">
            Events are special occasions where people gather together to
            celebrate an Events are special occasions where people gather
            together to eommemorate vents are special occasions where people
            gather
          </p>
        </div>
      ),
    },
    {
      id: "year-4",
      year: "2022",
      content: (
        <div className="event-details__tab-content-box">
          <ul className="event-details__meta list-unstyled">
            <li>
              <p>
                <span className="icon-clock"></span>
                Mirpur 01 Road N 12 Dhaka Bangladesh
              </p>
            </li>
            <li>
              <p>
                <span className="icon-pin"></span>
                10 AM To 10 PM 20 April 2022
              </p>
            </li>
          </ul>
          <h3 className="event-details__title-1">
            UI/UX Designer Meet Up 2022
          </h3>
          <p className="event-details__text-1">
            Events are special occasions where people gather together to
            celebrate an Events are special occasions where people gather
            together to eommemorate vents are special occasions where people
            gather
          </p>
          <p className="event-details__text-2">
            Real estate is a lucrative industry that involves the buying selling
            and renting properties It encompasses residential commercial and
            industrial designsin properties. Real estate agents play a crucial
          </p>
          <div className="event-details__img-box">
            <div className="row">
              <div className="col-xl-6">
                <div className="event-details__img-box-img">
                  <img
                    src={EventDetailsImg1}
                    alt=""
                  />
                </div>
              </div>
              <div className="col-xl-6">
                <div className="event-details__img-box-img">
                  <img
                    src={EventDetailsImg2}
                    alt=""
                  />
                </div>
              </div>
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
          <p className="event-details__text-3">
            Real estate is a lucrative industry that involves the buying selling
            and renting properties It encompasses residential commercial and
            industrial designsin properties. Real estate agents play a crucial
          </p>
          <p className="event-details__text-4">
            Events are special occasions where people gather together to
            celebrate an Events are special occasions where people gather
            together to eommemorate vents are special occasions where people
            gather
          </p>
        </div>
      ),
    },
    {
      id: "year-5",
      year: "2024",
      content: (
        <div className="event-details__tab-content-box">
          <ul className="event-details__meta list-unstyled">
            <li>
              <p>
                <span className="icon-clock"></span>
                Mirpur 01 Road N 12 Dhaka Bangladesh
              </p>
            </li>
            <li>
              <p>
                <span className="icon-pin"></span>
                10 AM To 10 PM 20 April 2024
              </p>
            </li>
          </ul>
          <h3 className="event-details__title-1">
            UI/UX Designer Meet Up 2024
          </h3>
          <p className="event-details__text-1">
            Events are special occasions where people gather together to
            celebrate an Events are special occasions where people gather
            together to eommemorate vents are special occasions where people
            gather
          </p>
          <p className="event-details__text-2">
            Real estate is a lucrative industry that involves the buying selling
            and renting properties It encompasses residential commercial and
            industrial designsin properties. Real estate agents play a crucial
          </p>
          <div className="event-details__img-box">
            <div className="row">
              <div className="col-xl-6">
                <div className="event-details__img-box-img">
                  <img
                    src={EventDetailsImg1}
                    alt=""
                  />
                </div>
              </div>
              <div className="col-xl-6">
                <div className="event-details__img-box-img">
                  <img
                    src={EventDetailsImg2}
                    alt=""
                  />
                </div>
              </div>
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
          <p className="event-details__text-3">
            Real estate is a lucrative industry that involves the buying selling
            and renting properties It encompasses residential commercial and
            industrial designsin properties. Real estate agents play a crucial
          </p>
          <p className="event-details__text-4">
            Events are special occasions where people gather together to
            celebrate an Events are special occasions where people gather
            together to eommemorate vents are special occasions where people
            gather
          </p>
        </div>
      ),
    },
  ];

  return (
    <>
      
        {/*Blog Details Start*/}
        <section className="event-details">
          <div className="container">
            <div className="row">
              <div className="col-xl-8 col-lg-7">
                <div className="event-details__left">
                  <div className="event-details__img">
                    <img
                      src={EventDetailsImg3}
                      alt=""
                    />
                  </div>
                  <div className="event-details__main-tab-box tabs-box">
                    <ul className="tab-buttons clearfix list-unstyled">
                      {tabs.map((tab) => (
                        <li
                          key={tab.id}
                          data-tab={`#${tab.id}`}
                          className={`tab-btn ${
                            activeTab === tab.id ? "active-btn" : ""
                          }`}
                          onClick={() => setActiveTab(tab.id)}
                        >
                          <p>{tab.year}</p>
                        </li>
                      ))}
                    </ul>
                    <div className="tabs-content">
                      {tabs.map((tab) => (
                        <div
                          key={tab.id}
                          className={`tab ${
                            activeTab === tab.id ? "active-tab" : ""
                          }`}
                          id={tab.id}
                        >
                          {tab.content}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-5">
                <div className="event-details__right">
                  <div className="event-details__speakers">
                    <h3 className="event-details__speakers-title">Speakers</h3>
                    <p className="event-details__speakers-sub-title">
                      10 Speakers
                    </p>
                    <p className="event-details__speakers-text">
                      Events are special occasions where people gather together
                      to celebrate...
                    </p>
                  </div>
                  <div className="event-details__ticket">
                    <h3 className="event-details__ticket-title">
                      Don’t have a ticket?
                    </h3>
                    <p className="event-details__ticket-sub-title">
                      Call Us Now
                    </p>
                    <div className="event-details__ticket-icon">
                      <span className="icon-call"></span>
                    </div>
                    <p className="event-details__ticket-sub-title-2">
                      For fast service
                    </p>
                    <h3 className="event-details__ticket-number">
                      <Link to="tel:0173456765">0173 456 765</Link>
                    </h3>
                  </div>
                  <div className="event-details__ticket-two">
                    <h3 className="event-details__ticket-two-title">
                      Don’t have a ticket?
                    </h3>
                    <p className="event-details__ticket-two-text">
                      Events are special occasions where people gather together
                      to celebrate...
                    </p>
                    <div className="event-details__ticket-two-btn-box">
                      <Link
                        to="#"
                        className="event-details__ticket-two-btn thm-btn"
                      >
                        Buy Ticket <span className="icon-arrow-right"></span>
                      </Link>
                    </div>
                  </div>
                  <div className="event-details__follow-us">
                    <h3 className="event-details__follow-us-title">
                      Follow Us
                    </h3>
                    <div className="event-details__follow-us-social">
                      <Link to="#">
                        <span className="icon-instagram"></span>
                      </Link>
                      <Link to="#">
                        <span className="icon-facebook"></span>
                      </Link>
                      <Link to="#">
                        <span className="icon-fi"></span>
                      </Link>
                      <Link to="#">
                        <span className="icon-linkedin-in"></span>
                      </Link>
                    </div>
                  </div>
                  <div className="event-details__location">
                    <h3 className="event-details__location-title">Location</h3>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4562.753041141002!2d-118.80123790098536!3d34.152323469614075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80e82469c2162619%3A0xba03efb7998eef6d!2sCostco+Wholesale!5e0!3m2!1sbn!2sbd!4v1562518641290!5m2!1sbn!2sbd"
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
        {/*Blog Details End*/}
    </>
  );
}
