"use client"; 
import { Link } from 'react-router-dom'; // Import the Link component from React Router
import React, { useState } from 'react';
import SchedulImg1 from '../..//assets/images/resources/schedule-two-1-1.jpg';
import SchedulImg2 from '../..//assets/images/resources/schedule-two-1-2.jpg';
import SchedulImg3 from '../..//assets/images/resources/schedule-two-1-3.jpg';
import SchedulImg4 from '../..//assets/images/resources/schedule-two-1-4.jpg';
import SchedulImg5 from '../..//assets/images/resources/schedule-two-1-5.jpg';
import SchedulImg6 from '../..//assets/images/resources/schedule-two-1-6.jpg';
import SchedulImg7 from '../..//assets/images/resources/schedule-two-1-7.jpg';
import SchedulImg8 from '../..//assets/images/resources/schedule-two-1-8.jpg';
import SchedulImg9 from '../..//assets/images/resources/schedule-two-1-9.jpg';

const ScheduleTwo = () => {
    const [activeTab, setActiveTab] = useState('1st-day');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <section id="th-event" className="schedule-two">
            <div className="container">
                <div className="schedule-one__inner">
                    <div className="section-title text-left">
                        <div className="section-title__tagline-box">
                            <span className="section-title__tagline">Event Schedule</span>
                        </div>
                        <h2 className="section-title__title section-title__title--two">Music Event Schedule</h2>
                    </div>
                    <div className="schedule-two__main-tab-box tabs-box">
                        <ul className="tab-buttons clearfix list-unstyled">
                            <li
                                className={`tab-btn ${activeTab === '1st-day' ? 'active-btn' : ''}`}
                                onClick={() => handleTabClick('1st-day')}
                            >
                                <h3>Day 01</h3>
                                <p>16 April 2024</p>
                            </li>
                            <li
                                className={`tab-btn ${activeTab === '2nd-day' ? 'active-btn' : ''}`}
                                onClick={() => handleTabClick('2nd-day')}
                            >
                                <h3>Day 02</h3>
                                <p>18 April 2024</p>
                            </li>
                            <li
                                className={`tab-btn ${activeTab === '3rd-day' ? 'active-btn' : ''}`}
                                onClick={() => handleTabClick('3rd-day')}
                            >
                                <h3>Day 03</h3>
                                <p>24 April 2024</p>
                            </li>
                        </ul>
                        <div className="tabs-content">
                            <div className={`tab ${activeTab === '1st-day' ? 'active-tab' : ''}`} id="1st-day">
                                <div className="schedule-two__tab-content-box">
                                    <div className="schedule-two__sinlge">
                                        <div className="row">
                                        <div className="col-xl-4 col-lg-4">
                                            <div className="schedule-two__img">
                                            <img src={SchedulImg1} alt="" />
                                            </div>
                                        </div>
                                        <div className="col-xl-8 col-lg-8">
                                            <div className="schedule-two__right">
                                            <div className="schedule-two__right-content">
                                                <h4 className="schedule-two__title">
                                                <Link to="/event-details">
                                                    Events That Leave a Impression
                                                </Link>
                                                </h4>
                                                <p className="schedule-two__text">
                                                A personal portfolio is a curated collection of <br /> an individual's professional work
                                                </p>
                                                <Link to="/event-details" className="schedule-two__btn">
                                                    Read More <span className="icon-arrow-right"></span>
                                                </Link>
                                            </div>
                                            <ul className="list-unstyled schedule-two__address">
                                                <li>
                                                <div className="icon">
                                                    <span className="icon-clock"></span>
                                                </div>
                                                <div className="text">
                                                    <p>
                                                    Mirpur 01 Road N 12 Dhaka <br /> Bangladesh
                                                    </p>
                                                </div>
                                                </li>
                                                <li>
                                                <div className="icon">
                                                    <span className="icon-pin"></span>
                                                </div>
                                                <div className="text">
                                                    <p>
                                                    10 Am To 10 Pm <br /> 20 April 2024
                                                    </p>
                                                </div>
                                                </li>
                                            </ul>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="schedule-two__sinlge">
                                        <div className="row">
                                        <div className="col-xl-4 col-lg-4">
                                            <div className="schedule-two__img">
                                            <img src={SchedulImg2} alt="" />
                                            </div>
                                        </div>
                                        <div className="col-xl-8 col-lg-8">
                                            <div className="schedule-two__right">
                                            <div className="schedule-two__right-content">
                                                <h4 className="schedule-two__title">
                                                <Link to="/event-details">
                                                    Sparkle & Shine on Celebrations
                                                </Link>
                                                </h4>
                                                <p className="schedule-two__text">
                                                A personal portfolio is a curated collection of <br /> an individual's professional work
                                                </p>
                                                <Link to="/event-details" className="schedule-two__btn">
                                                    Read More <span className="icon-arrow-right"></span>
                                                </Link>
                                            </div>
                                            <ul className="list-unstyled schedule-two__address">
                                                <li>
                                                <div className="icon">
                                                    <span className="icon-clock"></span>
                                                </div>
                                                <div className="text">
                                                    <p>
                                                    Mirpur 01 Road N 12 Dhaka <br /> Bangladesh
                                                    </p>
                                                </div>
                                                </li>
                                                <li>
                                                <div className="icon">
                                                    <span className="icon-pin"></span>
                                                </div>
                                                <div className="text">
                                                    <p>
                                                    10 Am To 10 Pm <br /> 20 April 2024
                                                    </p>
                                                </div>
                                                </li>
                                            </ul>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="schedule-two__sinlge">
                                        <div className="row">
                                        <div className="col-xl-4 col-lg-4">
                                            <div className="schedule-two__img">
                                            <img src={SchedulImg3} alt="" />
                                            </div>
                                        </div>
                                        <div className="col-xl-8 col-lg-8">
                                            <div className="schedule-two__right">
                                            <div className="schedule-two__right-content">
                                                <h4 className="schedule-two__title">
                                                <Link to="/event-details">
                                                    Sparkle & Shine Events
                                                </Link>
                                                </h4>
                                                <p className="schedule-two__text">
                                                A personal portfolio is a curated collection of <br /> an individual's professional work
                                                </p>
                                                <Link to="/event-details" className="schedule-two__btn">
                                                    Read More <span className="icon-arrow-right"></span>
                                                </Link>
                                            </div>
                                            <ul className="list-unstyled schedule-two__address">
                                                <li>
                                                <div className="icon">
                                                    <span className="icon-clock"></span>
                                                </div>
                                                <div className="text">
                                                    <p>
                                                    Mirpur 01 Road N 12 Dhaka <br /> Bangladesh
                                                    </p>
                                                </div>
                                                </li>
                                                <li>
                                                <div className="icon">
                                                    <span className="icon-pin"></span>
                                                </div>
                                                <div className="text">
                                                    <p>
                                                    10 Am To 10 Pm <br /> 20 April 2024
                                                    </p>
                                                </div>
                                                </li>
                                            </ul>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={`tab ${activeTab === '2nd-day' ? 'active-tab' : ''}`} id="2nd-day">
                                <div className="schedule-two__tab-content-box">
                                    <div className="schedule-two__sinlge">
                                        <div className="row">
                                        <div className="col-xl-4 col-lg-4">
                                            <div className="schedule-two__img">
                                            <img src={SchedulImg4} alt="" />
                                            </div>
                                        </div>
                                        <div className="col-xl-8 col-lg-8">
                                            <div className="schedule-two__right">
                                            <div className="schedule-two__right-content">
                                                <h4 className="schedule-two__title">
                                                <Link to="/event-details">
                                                    Events That Leave a Impression
                                                </Link>
                                                </h4>
                                                <p className="schedule-two__text">
                                                A personal portfolio is a curated collection of <br /> an individual's professional work
                                                </p>
                                                <Link to="/event-details" className="schedule-two__btn">
                                                    Read More <span className="icon-arrow-right"></span>
                                                </Link>
                                            </div>
                                            <ul className="list-unstyled schedule-two__address">
                                                <li>
                                                <div className="icon">
                                                    <span className="icon-clock"></span>
                                                </div>
                                                <div className="text">
                                                    <p>
                                                    Mirpur 01 Road N 12 Dhaka <br /> Bangladesh
                                                    </p>
                                                </div>
                                                </li>
                                                <li>
                                                <div className="icon">
                                                    <span className="icon-pin"></span>
                                                </div>
                                                <div className="text">
                                                    <p>
                                                    10 Am To 10 Pm <br /> 20 April 2024
                                                    </p>
                                                </div>
                                                </li>
                                            </ul>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="schedule-two__sinlge">
                                        <div className="row">
                                        <div className="col-xl-4 col-lg-4">
                                            <div className="schedule-two__img">
                                            <img src={SchedulImg5} alt="" />
                                            </div>
                                        </div>
                                        <div className="col-xl-8 col-lg-8">
                                            <div className="schedule-two__right">
                                            <div className="schedule-two__right-content">
                                                <h4 className="schedule-two__title">
                                                <Link to="/event-details">
                                                   Sparkle & Shine on Celebrations
                                                </Link>
                                                </h4>
                                                <p className="schedule-two__text">
                                                A personal portfolio is a curated collection of <br /> an individual's professional work
                                                </p>
                                                <Link to="/event-details" className="schedule-two__btn">
                                                    Read More <span className="icon-arrow-right"></span>
                                                </Link>
                                            </div>
                                            <ul className="list-unstyled schedule-two__address">
                                                <li>
                                                <div className="icon">
                                                    <span className="icon-clock"></span>
                                                </div>
                                                <div className="text">
                                                    <p>
                                                    Mirpur 01 Road N 12 Dhaka <br /> Bangladesh
                                                    </p>
                                                </div>
                                                </li>
                                                <li>
                                                <div className="icon">
                                                    <span className="icon-pin"></span>
                                                </div>
                                                <div className="text">
                                                    <p>
                                                    10 Am To 10 Pm <br /> 20 April 2024
                                                    </p>
                                                </div>
                                                </li>
                                            </ul>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="schedule-two__sinlge">
                                        <div className="row">
                                        <div className="col-xl-4 col-lg-4">
                                            <div className="schedule-two__img">
                                            <img src={SchedulImg6} alt="" />
                                            </div>
                                        </div>
                                        <div className="col-xl-8 col-lg-8">
                                            <div className="schedule-two__right">
                                            <div className="schedule-two__right-content">
                                                <h4 className="schedule-two__title">
                                                <Link to="/event-details">
                                                    Sparkle & Shine Events
                                                </Link>
                                                </h4>
                                                <p className="schedule-two__text">
                                                A personal portfolio is a curated collection of <br /> an individual's professional work
                                                </p>
                                                <Link to="/event-details" className="schedule-two__btn">
                                                    Read More <span className="icon-arrow-right"></span>
                                                </Link>
                                            </div>
                                            <ul className="list-unstyled schedule-two__address">
                                                <li>
                                                <div className="icon">
                                                    <span className="icon-clock"></span>
                                                </div>
                                                <div className="text">
                                                    <p>
                                                    Mirpur 01 Road N 12 Dhaka <br /> Bangladesh
                                                    </p>
                                                </div>
                                                </li>
                                                <li>
                                                <div className="icon">
                                                    <span className="icon-pin"></span>
                                                </div>
                                                <div className="text">
                                                    <p>
                                                    10 Am To 10 Pm <br /> 20 April 2024
                                                    </p>
                                                </div>
                                                </li>
                                            </ul>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={`tab ${activeTab === '3rd-day' ? 'active-tab' : ''}`} id="3rd-day">
                                <div className="schedule-two__tab-content-box">
                                    <div className="schedule-two__sinlge">
                                        <div className="row">
                                        <div className="col-xl-4 col-lg-4">
                                            <div className="schedule-two__img">
                                            <img src={SchedulImg7} alt="" />
                                            </div>
                                        </div>
                                        <div className="col-xl-8 col-lg-8">
                                            <div className="schedule-two__right">
                                            <div className="schedule-two__right-content">
                                                <h4 className="schedule-two__title">
                                                <Link to="/event-details">
                                                    Events That Leave a Impression
                                                </Link>
                                                </h4>
                                                <p className="schedule-two__text">
                                                A personal portfolio is a curated collection of <br /> an individual's professional work
                                                </p>
                                                <Link to="/event-details" className="schedule-two__btn">
                                                    Read More <span className="icon-arrow-right"></span>
                                                </Link>
                                            </div>
                                            <ul className="list-unstyled schedule-two__address">
                                                <li>
                                                <div className="icon">
                                                    <span className="icon-clock"></span>
                                                </div>
                                                <div className="text">
                                                    <p>
                                                    Mirpur 01 Road N 12 Dhaka <br /> Bangladesh
                                                    </p>
                                                </div>
                                                </li>
                                                <li>
                                                <div className="icon">
                                                    <span className="icon-pin"></span>
                                                </div>
                                                <div className="text">
                                                    <p>
                                                    10 Am To 10 Pm <br /> 20 April 2024
                                                    </p>
                                                </div>
                                                </li>
                                            </ul>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="schedule-two__sinlge">
                                        <div className="row">
                                        <div className="col-xl-4 col-lg-4">
                                            <div className="schedule-two__img">
                                            <img src={SchedulImg8} alt="" />
                                            </div>
                                        </div>
                                        <div className="col-xl-8 col-lg-8">
                                            <div className="schedule-two__right">
                                            <div className="schedule-two__right-content">
                                                <h4 className="schedule-two__title">
                                                <Link to="/event-details">
                                                    Sparkle & Shine on Celebrations
                                                </Link>
                                                </h4>
                                                <p className="schedule-two__text">
                                                A personal portfolio is a curated collection of <br /> an individual's professional work
                                                </p>
                                                <Link to="/event-details" className="schedule-two__btn">
                                                    Read More <span className="icon-arrow-right"></span>
                                                </Link>
                                            </div>
                                            <ul className="list-unstyled schedule-two__address">
                                                <li>
                                                <div className="icon">
                                                    <span className="icon-clock"></span>
                                                </div>
                                                <div className="text">
                                                    <p>
                                                    Mirpur 01 Road N 12 Dhaka <br /> Bangladesh
                                                    </p>
                                                </div>
                                                </li>
                                                <li>
                                                <div className="icon">
                                                    <span className="icon-pin"></span>
                                                </div>
                                                <div className="text">
                                                    <p>
                                                    10 Am To 10 Pm <br /> 20 April 2024
                                                    </p>
                                                </div>
                                                </li>
                                            </ul>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div className="schedule-two__sinlge">
                                        <div className="row">
                                        <div className="col-xl-4 col-lg-4">
                                            <div className="schedule-two__img">
                                            <img src={SchedulImg9} alt="" />
                                            </div>
                                        </div>
                                        <div className="col-xl-8 col-lg-8">
                                            <div className="schedule-two__right">
                                            <div className="schedule-two__right-content">
                                                <h4 className="schedule-two__title">
                                                <Link to="/event-details">
                                                    Sparkle & Shine Events
                                                </Link>
                                                </h4>
                                                <p className="schedule-two__text">
                                                A personal portfolio is a curated collection of <br /> an individual's professional work
                                                </p>
                                                <Link to="/event-details" className="schedule-two__btn">
                                                    Read More <span className="icon-arrow-right"></span>
                                                </Link>
                                            </div>
                                            <ul className="list-unstyled schedule-two__address">
                                                <li>
                                                <div className="icon">
                                                    <span className="icon-clock"></span>
                                                </div>
                                                <div className="text">
                                                    <p>
                                                    Mirpur 01 Road N 12 Dhaka <br /> Bangladesh
                                                    </p>
                                                </div>
                                                </li>
                                                <li>
                                                <div className="icon">
                                                    <span className="icon-pin"></span>
                                                </div>
                                                <div className="text">
                                                    <p>
                                                    10 Am To 10 Pm <br /> 20 April 2024
                                                    </p>
                                                </div>
                                                </li>
                                            </ul>
                                            </div>
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
    );
};

export default ScheduleTwo;
