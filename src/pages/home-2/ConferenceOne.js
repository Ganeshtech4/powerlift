// components/ConferenceOne.js
"use client"; // Enable client-side hooks
import ConferencImg1 from '../../assets/images/resources/conference-one-img-1.jpg';
import ConferencImg2 from '../../assets/images/resources/conference-one-img-2.jpg';
import ConferencImg3 from '../../assets/images/resources/conference-one-img-3.jpg';
import ConferencImg4 from '../../assets/images/resources/conference-one-img-4.jpg';
import ConferencImg5 from '../../assets/images/resources/conference-one-img-5.jpg';

import { useState } from 'react';
// data/conferenceData.js
export const conferenceData = [
    {
      year: '2016',
      title: 'Ui/Ux designer Meet Up 2019',
      address: 'Mirpur 01 Road N 12 Dhaka Bangladesh',
      date: '10 Am To 10 Pm 20 April 2024',
      description: 'Events are special occasions where people gather together to celebrate.',
      image: ConferencImg1,
    },
    {
      year: '2018',
      title: 'Ui/Ux designer Meet Up 2018',
      address: 'Mirpur 01 Road N 12 Dhaka Bangladesh',
      date: '10 Am To 10 Pm 20 April 2024',
      description: 'Events are special occasions where people gather together to celebrate.',
      image: ConferencImg2,
    },
    {
      year: '2020',
      title: 'Ui/Ux designer Meet Up 2020',
      address: 'Mirpur 01 Road N 12 Dhaka Bangladesh',
      date: '10 Am To 10 Pm 20 April 2024',
      description: 'Events are special occasions where people gather together to celebrate.',
      image: ConferencImg3,
    },
    {
      year: '2022',
      title: 'Ui/Ux designer Meet Up 2022',
      address: 'Mirpur 01 Road N 12 Dhaka Bangladesh',
      date: '10 Am To 10 Pm 20 April 2024',
      description: 'Events are special occasions where people gather together to celebrate.',
      image: ConferencImg4,
    },
    {
      year: '2024',
      title: 'Ui/Ux designer Meet Up 2024',
      address: 'Mirpur 01 Road N 12 Dhaka Bangladesh',
      date: '10 Am To 10 Pm 20 April 2024',
      description: 'Events are special occasions where people gather together to celebrate.',
      image: ConferencImg5,
    },
  ];
  

export default function ConferenceOne() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <section className="conference-one">
      <div className="container">
        <div className="section-title text-center">
          <div className="section-title__tagline-box">
            <span className="section-title__tagline">CONFERENCES ORGANIZER</span>
          </div>
          <h2 className="section-title__title section-title__title--two">
            Grab Your Seat Wow Or You <br /> May Regret It Once
          </h2>
        </div>
        <div className="conference-one__main-tab-box tabs-box">
          <ul className="tab-buttons clearfix list-unstyled">
            {conferenceData.map((conference, index) => (
              <li
                key={index}
                data-tab={`#year-${index + 1}`}
                className={`tab-btn ${activeTab === index ? 'active-btn' : ''}`}
                onClick={() => handleTabClick(index)}
              >
                <p>{conference.year}</p>
              </li>
            ))}
          </ul>
          <div className="tabs-content">
            {conferenceData.map((conference, index) => (
              <div key={index} className={`tab ${activeTab === index ? 'active-tab' : ''}`} id={`year-${index + 1}`}>
                <div className="conference-one__tab-content-box">
                  <div className="conference-one__img">
                    <img src={conference.image} alt="" />
                  </div>
                  <div className="conference-one__tab-content-bottom">
                    <div className="row">
                      <div className="col-xl-6 col-lg-6">
                        <div className="conference-one__tab-content-bottom-left">
                          <h4 className="conference-one__tab-content-title">{conference.title}</h4>
                          <ul className="list-unstyled conference-one__address">
                            <li>
                              <div className="icon">
                                <span className="icon-clock"></span>
                              </div>
                              <div className="text">
                                <p>{conference.address}</p>
                              </div>
                            </li>
                            <li>
                              <div className="icon">
                                <span className="icon-pin"></span>
                              </div>
                              <div className="text">
                                <p>{conference.date}</p>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6">
                        <div className="conference-one__tab-content-text">
                          <p>{conference.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
