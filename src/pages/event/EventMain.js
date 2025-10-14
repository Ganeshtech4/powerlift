'use client'
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import EventImg1 from '../../assets/images/resources/schedule-one-1-1.jpg'
import EventImg2 from '../../assets/images/resources/schedule-one-1-2.jpg'
import EventImg3 from '../../assets/images/resources/event-details-img-box-img-5.jpg'
import EventImg4 from '../../assets/images/resources/schedule-one-1-4.jpg'
import EventImg5 from '../../assets/images/resources/schedule-one-1-5.jpg'
import EventImg6 from '../../assets/images/resources/schedule-one-1-6.jpg'
import EventImg7 from '../../assets/images/resources/schedule-one-1-7.jpg'
import EventImg8 from '../../assets/images/resources/schedule-one-1-8.jpg'
import EventImg9 from '../../assets/images/resources/schedule-one-1-10.jpg'


const EventMain = () => {

  const [activeTab, setActiveTab] = useState("1st-day");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <React.Fragment>
      {/* Service Details Start */}
      <section className="event-page">
        <div className="container">
          <div className="schedule-one__inner">
            <div className="section-title text-left">
              <div className="section-title__tagline-box">
                <span className="section-title__tagline">
                  Event Schedule
                </span>
              </div>
              <h2 className="section-title__title">
                Follow event schedule
              </h2>
            </div>


            <div className="schedule-one__main-tab-box tabs-box ">
              <ul className="tab-buttons flex justify-center items-center gap-6 list-unstyled">
                <li
                  className={`tab-btn cursor-pointer flex justify-center items-center px-6 py-4 rounded-lg ${activeTab === "1st-day" ? "active-btn" : ""
                    }`}
                  onClick={() => handleTabClick("1st-day")}
                >
                  <h3 className="text-center font-semibold">List 01</h3>
                </li>
                <li
                  className={`tab-btn cursor-pointer flex justify-center items-center px-6 py-4 rounded-lg ${activeTab === "2nd-day" ? "active-btn" : ""
                    }`}
                  onClick={() => handleTabClick("2nd-day")}
                >
                  <h3 className="text-center font-semibold">List 02</h3>
                </li>
                <li
                  className={`tab-btn cursor-pointer flex justify-center items-center px-6 py-4 rounded-lg ${activeTab === "3rd-day" ? "active-btn" : ""
                    }`}
                  onClick={() => handleTabClick("3rd-day")}
                >
                  <h3 className="text-center font-semibold">List 03</h3>
                </li>
              </ul>


              <div className="tabs-content">
                <div
                  className={`tab ${activeTab === "1st-day" ? "active-tab" : ""
                    }`}
                  id="1st-day"
                >
                  <div className="schedule-one__tab-content-box">
                    <div className="schedule-one__single">
                      <div className="schedule-one__left">
                        <h3 className="schedule-one__title">
                          <Link to="/event-details/year-1">
                            State championship <br />
                          </Link>
                        </h3>
                        <p className="schedule-one__text">
                          Top lifters from districts compete for the state title.{" "}
                          <br />                             </p>
                      </div>
                      <div className="schedule-one__img">
                        <img
                          src={EventImg1}
                          alt=""
                        />
                      </div>
                      <div className="schedule-one__address-and-btn-box">
                        <ul className="list-unstyled schedule-one__address">
                          <li>
                            <div className="icon">
                              <span className="icon-clock"></span>
                            </div>
                            <div className="text">
                              <p>
                                10 AM to 8 PM   <br /> 12 May 2023
                              </p>
                            </div>
                          </li>
                          <li>
                            <div className="icon">
                              <span className="icon-pin"></span>
                            </div>
                            <div className="text">
                              <p>
                                Hyderabad <br /> Telangana, india
                              </p>
                            </div>
                          </li>
                        </ul>
                        <div className="schedule-one__btn-box">
                          <Link
                            to="/event-details/year-1"
                            className="schedule-one__btn thm-btn"
                          >
                            View Event{" "}
                            <span className="icon-arrow-right"></span>
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* <div className="schedule-one__single">
                          <div className="schedule-one__left">
                            <h3 className="schedule-one__title">
                              <Link to="/event-details/year-2">
                               District championship <br />
                              </Link>
                            </h3>
                            <p className="schedule-one__text">
                                   These events are  Held annually across all Telangana districts.{" "}
                              <br />
                            </p>
                          </div>
                          <div className="schedule-one__img">
                            <img
                              src= {EventImg8}
                              alt=""
                            />
                          </div>
                          <div className="schedule-one__address-and-btn-box">
                            <ul className="list-unstyled schedule-one__address">
                              <li>
                                <div className="icon">
                                  <span className="icon-clock"></span>
                                </div>
                                <div className="text">
                                  <p>
                                    9 Am To 6 Pm <br />  8 March 2020
                                  </p>
                                </div>
                              </li>
                              <li>
                                <div className="icon">
                                  <span className="icon-pin"></span>
                                </div>
                                <div className="text">
                                  <p>
                                    Hyderabad <br /> Telangana, india
                                  </p>
                                </div>
                              </li>
                            </ul>
                            <div className="schedule-one__btn-box">
                              <Link
                                to="/event-details/year-2"
                                className="schedule-one__btn thm-btn"
                              >
                                View Event{" "}
                                <span className="icon-arrow-right"></span>
                              </Link>
                            </div>
                          </div>
                        </div> */}

                    <div className="schedule-one__single">
                      <div className="schedule-one__left">
                        <h3 className="schedule-one__title">
                          <Link to="/event-details/year-3">
                            Gym point championship<br />
                          </Link>
                        </h3>
                        <p className="schedule-one__text">
                          Benchpress & Deadlift events open to all strength <br /> athletes{" "}
                          <br />
                        </p>
                      </div>
                      <div className="schedule-one__img">
                        <img
                          src={EventImg3}
                          alt=""
                        />
                      </div>
                      <div className="schedule-one__address-and-btn-box">
                        <ul className="list-unstyled schedule-one__address">
                          <li>
                            <div className="icon">
                              <span className="icon-clock"></span>
                            </div>
                            <div className="text">
                              <p>
                                10 Am To 7 Pm <br /> 10 April 2023
                              </p>
                            </div>
                          </li>
                          <li>
                            <div className="icon">
                              <span className="icon-pin"></span>
                            </div>
                            <div className="text">
                              <p>
                                Hyderabad <br /> Telangana, india
                              </p>
                            </div>
                          </li>
                        </ul>
                        <div className="schedule-one__btn-box">
                          <Link
                            to="/event-details/year-3"
                            className="schedule-one__btn thm-btn"
                          >
                            View Event{" "}
                            <span className="icon-arrow-right"></span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="schedule-one__single">
                    <div className="schedule-one__left">
                      <h3 className="schedule-one__title">
                        <Link to="/event-details/year-4">
                          Origin championship<br />
                        </Link>
                      </h3>
                      <p className="schedule-one__text">
                        Athlete development, coaching, and referee training.{" "}
                        <br />
                      </p>
                    </div>
                    <div className="schedule-one__img">
                      <img
                        src={EventImg4}
                        alt=""
                      />
                    </div>
                    <div className="schedule-one__address-and-btn-box">
                      <ul className="list-unstyled schedule-one__address">
                        <li>
                          <div className="icon">
                            <span className="icon-clock"></span>
                          </div>
                          <div className="text">
                            <p>
                              9 Am To 8 Pm <br /> 18 June 2023
                            </p>
                          </div>
                        </li>
                        <li>
                          <div className="icon">
                            <span className="icon-pin"></span>
                          </div>
                          <div className="text">
                            <p>
                              Hyderabad <br /> Telangana, india
                            </p>
                          </div>
                        </li>
                      </ul>
                      <div className="schedule-one__btn-box">
                        <Link
                          to="/event-details/year-4"
                          className="schedule-one__btn thm-btn"
                        >
                          View Event{" "}
                          <span className="icon-arrow-right"></span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`tab ${activeTab === "2nd-day" ? "active-tab" : ""
                    }`}
                  id="2nd-day"
                >
                  <div className="schedule-one__tab-content-box">
                    <div className="schedule-one__single">
                      <div className="schedule-one__left">
                        <h3 className="schedule-one__title">
                          <Link to="/event-details/year-5">
                            Ozzie championship <br />
                          </Link>
                        </h3>
                        <p className="schedule-one__text">
                          The Ozzie Championship celebrated athletic  {" "}
                          <br />diversity, inviting competitors from <br />across India to challenge their limits.
                        </p>
                      </div>
                      <div className="schedule-one__img">
                        <img
                          src={EventImg5}
                          alt=""
                        />
                      </div>
                      <div className="schedule-one__address-and-btn-box">
                        <ul className="list-unstyled schedule-one__address">
                          <li>
                            <div className="icon">
                              <span className="icon-clock"></span>
                            </div>
                            <div className="text">
                              <p>
                                10 Am To 9 Pm <br /> 23 July 2023
                              </p>
                            </div>
                          </li>
                          <li>
                            <div className="icon">
                              <span className="icon-pin"></span>
                            </div>
                            <div className="text">
                              <p>
                                Hyderabad <br /> Telangana, india
                              </p>
                            </div>
                          </li>
                        </ul>
                        <div className="schedule-one__btn-box">
                          <Link
                            to="/event-details/year-5"
                            className="schedule-one__btn thm-btn"
                          >
                            View Event{" "}
                            <span className="icon-arrow-right"></span>
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="schedule-one__single">
                      <div className="schedule-one__left">
                        <h3 className="schedule-one__title">
                          <Link to="/event-details/year-6">
                            Potens championship <br />
                          </Link>
                        </h3>
                        <p className="schedule-one__text">
                          Potens Championship was designed to identify  {" "}
                          <br /> the most promising athletes of the <br /> year. With an electrifying audience
                        </p>
                      </div>
                      <div className="schedule-one__img">
                        <img
                          src={EventImg6}
                          alt=""
                        />
                      </div>
                      <div className="schedule-one__address-and-btn-box">
                        <ul className="list-unstyled schedule-one__address">
                          <li>
                            <div className="icon">
                              <span className="icon-clock"></span>
                            </div>
                            <div className="text">
                              <p>
                                9 Am To 7 Pm <br /> 15 April 2023
                              </p>
                            </div>
                          </li>
                          <li>
                            <div className="icon">
                              <span className="icon-pin"></span>
                            </div>
                            <div className="text">
                              <p>
                                Hyderabad <br /> Telangana, india
                              </p>
                            </div>
                          </li>
                        </ul>
                        <div className="schedule-one__btn-box">
                          <Link
                            to="/event-details/year-6"
                            className="schedule-one__btn thm-btn"
                          >
                            View Event {" "}
                            <span className="icon-arrow-right"></span>
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="schedule-one__single">
                      <div className="schedule-one__left">
                        <h3 className="schedule-one__title">
                          <Link to="/event-details/year-7">
                            second state championship <br />
                          </Link>
                        </h3>
                        <p className="schedule-one__text">
                          Following the success of the first edition,{" "}
                          <br />the Second State Championship returned <br />with enhanced facilities,<br /> larger participation, and international-level
                        </p>
                      </div>
                      <div className="schedule-one__img">
                        <img
                          src={EventImg7}
                          alt=""
                        />
                      </div>
                      <div className="schedule-one__address-and-btn-box">
                        <ul className="list-unstyled schedule-one__address">
                          <li>
                            <div className="icon">
                              <span className="icon-clock"></span>
                            </div>
                            <div className="text">
                              <p>
                                10 Am To 9 Pm <br /> 10 March 2025
                              </p>
                            </div>
                          </li>
                          <li>
                            <div className="icon">
                              <span className="icon-pin"></span>
                            </div>
                            <div className="text">
                              <p>
                                Hyderabad <br /> Telangana, india
                              </p>
                            </div>
                          </li>
                        </ul>
                        <div className="schedule-one__btn-box">
                          <Link
                            to="/event-details/year-7"
                            className="schedule-one__btn thm-btn"
                          >
                            View Event{" "}
                            <span className="icon-arrow-right"></span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`tab ${activeTab === "3rd-day" ? "active-tab" : ""
                    }`}
                  id="3rd-day"
                >
                  <div className="schedule-one__tab-content-box">
                    <div className="schedule-one__single">
                      <div className="schedule-one__left">
                        <h3 className="schedule-one__title">
                          <Link to="/event-details/year-8">
                            Telangana First State <br /> Championship<br />
                          </Link>
                        </h3>
                        <p className="schedule-one__text">
                          A knowledge-focused event featuring industry{" "}
                          <br />  professionals,trainers, and athletes <br />who shared insights on nutrition, recovery,
                        </p>
                      </div>
                      <div className="schedule-one__img">
                        <img
                          src={EventImg9}
                          alt=""
                        />
                      </div>
                      <div className="schedule-one__address-and-btn-box">
                        <ul className="list-unstyled schedule-one__address">
                          <li>
                            <div className="icon">
                              <span className="icon-clock"></span>
                            </div>
                            <div className="text">
                              <p>
                                9 Am To 5 Pm <br /> 25 June 2023
                              </p>
                            </div>
                          </li>
                          <li>
                            <div className="icon">
                              <span className="icon-pin"></span>
                            </div>
                            <div className="text">
                              <p>
                                Hyderabad <br /> Telangana, india
                              </p>
                            </div>
                          </li>
                        </ul>
                        <div className="schedule-one__btn-box">
                          <Link
                            to="/event-details/year-8"
                            className="schedule-one__btn thm-btn"
                          >
                            View Event{" "}
                            <span className="icon-arrow-right"></span>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="schedule-one__single">
                      <div className="schedule-one__left">
                        <h3 className="schedule-one__title">
                          <Link to="/event-details/year-9">
                            FSG Independence day<br />
                          </Link>
                        </h3>
                        <p className="schedule-one__text">
                          A personal portfolio is a curated collection of{" "}
                          <br /> an individual's professional work
                        </p>
                      </div>
                      <div className="schedule-one__img">
                        <img
                          src={EventImg2}
                          alt=""
                        />
                      </div>
                      <div className="schedule-one__address-and-btn-box">
                        <ul className="list-unstyled schedule-one__address">
                          <li>
                            <div className="icon">
                              <span className="icon-clock"></span>
                            </div>
                            <div className="text">
                              <p>
                                10 Am To 10 Pm <br /> 20 April 2023
                              </p>
                            </div>
                          </li>
                          <li>
                            <div className="icon">
                              <span className="icon-pin"></span>
                            </div>
                            <div className="text">
                              <p>
                                Hyderabad <br /> Telangana, india
                              </p>
                            </div>
                          </li>
                        </ul>
                        <div className="schedule-one__btn-box">
                          <Link
                            to="/event-details"
                            className="schedule-one__btn thm-btn"
                          >
                            View Event{" "}
                            <span className="icon-arrow-right"></span>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="schedule-one__single">
                      <div className="schedule-one__left">
                        <h3 className="schedule-one__title">
                          <Link to="/event-details/year-10">
                            AF championship  <br />
                          </Link>
                        </h3>
                        <p className="schedule-one__text">
                          The AF Championship marked the culmination  {" "}
                          <br /> of a decade of athletic growth. It <br /> featured elite competitors, inte
                        </p>
                      </div>
                      <div className="schedule-one__img">
                        <img
                          src={EventImg8}
                          alt=""
                        />
                      </div>
                      <div className="schedule-one__address-and-btn-box">
                        <ul className="list-unstyled schedule-one__address">
                          <li>
                            <div className="icon">
                              <span className="icon-clock"></span>
                            </div>
                            <div className="text">
                              <p>
                                9 Am To 8 Pm <br /> 10 August 2023
                              </p>
                            </div>
                          </li>
                          <li>
                            <div className="icon">
                              <span className="icon-pin"></span>
                            </div>
                            <div className="text">
                              <p>
                                Hyderabad <br /> Telangana, india
                              </p>
                            </div>
                          </li>
                        </ul>
                        <div className="schedule-one__btn-box">
                          <Link
                            to="/event-details/year-10"
                            className="schedule-one__btn thm-btn"
                          >
                            View Event{" "}
                            <span className="icon-arrow-right"></span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Service Details End */}
    </React.Fragment>
  );
};

export default EventMain;
