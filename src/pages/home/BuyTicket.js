"use client"; // Ensures the component runs on the client side

import { useState } from "react";
import { Link } from 'react-router-dom';
import ticketImg from '../../assets/images/resources/schedule-one-1-1.jpg';

export default function BuyTicket() {
  // State for dynamic content
  const [ticketContent] = useState({
    address: "WPC–Telangana Headquarters, Hyderabad, Telangana, India",
    timing: "Email: info@wpctelangana.in | Phone: +91 XXXXX XXXXX",
    title: "Join WPC–Telangana Membership Today",
    description:
      "Become part of the official state federation under WPC–India. Get your official ID card, access to certified coaches, and compete in district, state, and national championships.",
    buttons: [
      { id: 1, text: "Apply for Membership", link: "/contact", class: "buy-ticket__btn-1" },
      { id: 2, text: "Contact Us", link: "/contact", class: "buy-ticket__btn-2" },
    ],
  });

  return (
    <>
      {/* Buy Ticket Start */}
      <section className="buy-ticket">
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <div
                className="buy-ticket__left wow fadeInLeft"
                data-wow-delay="100ms"
              >
                <ul className="buy-ticket__address list-unstyled">
                  <li>
                    <div className="icon">
                      <span className="icon-clock"></span>
                    </div>
                    <div className="text">
                      <p>{ticketContent.address}</p>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <span className="icon-pin"></span>
                    </div>
                    <div className="text">
                      <p>{ticketContent.timing}</p>
                    </div>
                  </li>
                </ul>
                <h3 className="buy-ticket__title">{ticketContent.title}</h3>
                <p className="buy-ticket__text">{ticketContent.description}</p>
                <div className="buy-ticket__btn-box">
                  {ticketContent.buttons.map((button) => (
                    <Link
                      key={button.id}
                      to={button.link}
                      className={`${button.class} thm-btn`}
                    >
                      {button.text}
                      <span className="icon-arrow-right"></span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div
                className="buy-ticket__right wow fadeInRight"
                data-wow-delay="300ms"
              >
                <div className="buy-ticket__img">
                  <img src={ticketImg} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Buy Ticket End */}
    </>
  );
}
