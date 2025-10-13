import { Link } from 'react-router-dom';
import React from 'react';

const ticketsData = [
  {
    title: 'Day Pass',
    price: '$35.99',
    points: [
      'Conference Tickets',
      'Free Lunch And Coffee',
      'Certificate',
      'Easy Access',
      'Free Contacts',
    ],
    animationClass: 'fadeInLeft',
    delay: 100,
  },
  {
    title: 'Full Pass',
    price: '$99.99',
    points: [
      'Conference Tickets',
      'Free Lunch And Coffee',
      'Certificate',
      'Easy Access',
      'Free Contacts',
    ],
    animationClass: 'fadeInUp',
    delay: 200,
  },
  {
    title: 'Group Pass',
    price: '$119.99',
    points: [
      'Conference Tickets',
      'Free Lunch And Coffee',
      'Certificate',
      'Easy Access',
      'Free Contacts',
    ],
    animationClass: 'fadeInRight',
    delay: 300,
  },
];

export default function TicketOne({ tickets = ticketsData }) {
  return (
    <section id="th-pricing" className="ticket-one">
      <div className="container">
        <div className="section-title text-center">
          <div className="section-title__tagline-box">
            <span className="section-title__tagline">GET TICKET</span>
          </div>
          <h2 className="section-title__title">Choose a Ticket</h2>
        </div>
        <div className="row">
          {tickets.map((ticket, index) => (
            <div
              key={index}
              className={`col-xl-4 col-lg-4 wow ${ticket.animationClass}`}
              data-wow-delay={`${ticket.delay}ms`}
            >
              <div className="ticket-one__single">
                <div className="ticket-one__title-box">
                  <div className="ticket-one__title-icon">
                    <i className="fas fa-ticket-alt"></i>
                  </div>
                  <h5 className="ticket-one__title">{ticket.title}</h5>
                </div>
                <div className="ticket-one__price-box">
                  <h3>{ticket.price}</h3>
                </div>
                <ul className="list-unstyled ticket-one__points">
                  {ticket.points.map((point, idx) => (
                    <li key={idx}>
                      <div className="icon">
                        <i className="fas fa-check"></i>
                      </div>
                      <div className="text">
                        <p>{point}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="ticket-one__btn-box">
                  <Link to="pricing" className="ticket-one__btn thm-btn">
                    Buy Ticket<span className="icon-arrow-right"></span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
