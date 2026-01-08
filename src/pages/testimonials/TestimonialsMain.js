"use client";
import React from "react";

import { Link } from 'react-router-dom';

const TestimonialsImg1 = `${process.env.PUBLIC_URL}/images/testimonial/testimonial-one-client-1-1.jpg`;
const TestimonialsImg2 = `${process.env.PUBLIC_URL}/images/testimonial/testimonial-one-client-1-2.jpg`;
const TestimonialsImg3 = `${process.env.PUBLIC_URL}/images/testimonial/testimonial-one-client-1-3.jpg`;
const TestimonialsImg4 = `${process.env.PUBLIC_URL}/images/testimonial/testimonial-one-client-1-4.jpg`;
const TestimonialsImg5 = `${process.env.PUBLIC_URL}/images/testimonial/testimonial-one-client-1-5.jpg`;
const TestimonialsImg6 = `${process.env.PUBLIC_URL}/images/testimonial/testimonial-one-client-1-6.jpg`;


const testimonials = [
  {
    clientName: "Rajesh Kumar",
    role: "Powerlifter",
    clientImage: TestimonialsImg1,
    text: "Being part of WPC Telangana has completely changed my approach to training. The competitions are well organized and the community is truly supportive.",
    rating: 5,
  },
  {
    clientName: "Priya Sharma",
    role: "Athlete & Coach",
    clientImage: TestimonialsImg2,
    text: "I’m amazed by the professional standards of the events. The WPC team ensures everything runs smoothly and gives athletes the best experience.",
    rating: 5,
  },
  {
    clientName: "Anil Reddy",
    role: "Event Volunteer",
    clientImage: TestimonialsImg3,
    text: "Volunteering with WPC has been one of my most rewarding experiences. The passion and discipline of the athletes are truly inspiring.",
    rating: 4,
  },
  {
    clientName: "Sneha Patel",
    role: "Fitness Trainer",
    clientImage: TestimonialsImg4,
    text: "The WPC events have helped me connect with so many talented athletes. The level of motivation and energy is unmatched!",
    rating: 5,
  },
  {
    clientName: "Rahul Verma",
    role: "Champion Lifter",
    clientImage: TestimonialsImg5,
    text: "Every event feels like a festival of strength! I’m proud to represent WPC Telangana and be part of such a dedicated community.",
    rating: 5,
  },
  {
    clientName: "Divya Singh",
    role: "Participant",
    clientImage: TestimonialsImg6,
    text: "From registration to award ceremonies, everything was perfectly organized. WPC really sets a high standard for powerlifting events in India.",
    rating: 4,
  },
];

export default function TestimonialsPage() {
  return (
    <div>
      {/* Custom CSS Override */}
      <style>{`
        /* Reset and Override Previous Styles */
        .testimonial-page * {
          box-sizing: border-box;
        }
        
        .testimonial-page {
          background: #f0f2f5 !important;
          padding: 100px 0 !important;
          position: relative;
        }
        
        .testimonial-page .container {
          max-width: 1200px;
        }
        
        /* Blue Card Design - Complete Override */
        .blue-testimonial-card {
          background: linear-gradient(135deg, #1e88e5, #42a5f5) !important;
          border-radius: 20px !important;
          padding: 0 !important;
          margin: 0 0 40px 0 !important;
          box-shadow: 0 20px 40px rgba(30, 136, 229, 0.3) !important;
          overflow: hidden !important;
          position: relative !important;
          height: 450px !important;
          transition: all 0.3s ease !important;
          border: none !important;
          transform: translateY(0) !important;
        }
        
        .blue-testimonial-card:hover {
          transform: translateY(-10px) scale(1.02) !important;
          box-shadow: 0 30px 60px rgba(30, 136, 229, 0.4) !important;
        }
        
        /* Quote Marks */
        .quote-left {
          position: absolute !important;
          top: 20px !important;
          left: 20px !important;
          font-size: 60px !important;
          color: rgba(255,255,255,0.3) !important;
          font-family: serif !important;
          line-height: 1 !important;
          font-weight: bold !important;
          z-index: 1 !important;
        }
        
        .quote-right {
          position: absolute !important;
          bottom: 140px !important;
          right: 20px !important;
          font-size: 60px !important;
          color: rgba(255,255,255,0.3) !important;
          font-family: serif !important;
          line-height: 1 !important;
          font-weight: bold !important;
          transform: rotate(180deg) !important;
          z-index: 1 !important;
        }
        
        /* Card Content Container */
        .card-content {
          padding: 40px 30px 0 !important;
          height: 100% !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: space-between !important;
          position: relative !important;
          z-index: 2 !important;
        }
        
        /* Title Section */
        .testimonial-title {
          text-align: center !important;
          margin-bottom: 30px !important;
        }
        
        .testimonial-title h3 {
          color: white !important;
          font-size: 28px !important;
          font-weight: 600 !important;
          font-style: italic !important;
          margin: 0 !important;
          text-shadow: none !important;
        }
        
        /* Text Section */
        .testimonial-text-section {
          flex: 1 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          text-align: center !important;
          padding: 0 10px !important;
        }
        
        .testimonial-text-section p {
          color: white !important;
          font-size: 16px !important;
          line-height: 1.6 !important;
          margin: 0 !important;
          font-weight: 400 !important;
          text-shadow: none !important;
        }
        
        /* Bottom White Section */
        .bottom-section {
          background: rgba(255,255,255,0.95) !important;
          margin: 30px -30px 0 !important;
          padding: 25px 30px !important;
          border-radius: 0 0 20px 20px !important;
          text-align: center !important;
        }
        
        /* Profile Image */
        .profile-image {
          margin-bottom: 15px !important;
        }
        
        .profile-image img {
          width: 70px !important;
          height: 70px !important;
          border-radius: 50% !important;
          object-fit: cover !important;
          border: 4px solid white !important;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1) !important;
          transition: all 0.3s ease !important;
        }
        
        .profile-image img:hover {
          transform: scale(1.1) !important;
        }
        
        /* Rating Stars */
        .rating-stars {
          margin-bottom: 10px !important;
          display: flex !important;
          justify-content: center !important;
          gap: 3px !important;
        }
        
        .star-filled {
          color: #ffa726 !important;
          font-size: 20px !important;
          font-family: Arial, sans-serif !important;
        }
        
        .star-empty {
          color: #e0e0e0 !important;
          font-size: 20px !important;
          font-family: Arial, sans-serif !important;
        }
        
        /* Client Info */
        .client-name {
          color: #333 !important;
          font-size: 18px !important;
          font-weight: 600 !important;
          margin: 0 0 5px 0 !important;
          text-decoration: none !important;
        }
        
        .client-role {
          color: #666 !important;
          font-size: 14px !important;
          font-style: italic !important;
          margin: 0 !important;
        }
        
        /* Animation */
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .blue-testimonial-card {
          animation: slideInUp 0.6s ease-out !important;
          animation-fill-mode: both !important;
        }
        
        .blue-testimonial-card:nth-child(1) { animation-delay: 0.1s !important; }
        .blue-testimonial-card:nth-child(2) { animation-delay: 0.2s !important; }
        .blue-testimonial-card:nth-child(3) { animation-delay: 0.3s !important; }
        .blue-testimonial-card:nth-child(4) { animation-delay: 0.4s !important; }
        .blue-testimonial-card:nth-child(5) { animation-delay: 0.5s !important; }
        .blue-testimonial-card:nth-child(6) { animation-delay: 0.6s !important; }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .blue-testimonial-card {
            height: auto !important;
            margin-bottom: 30px !important;
          }
          
          .quote-left,
          .quote-right {
            font-size: 40px !important;
          }
          
          .testimonial-title h3 {
            font-size: 24px !important;
          }
          
          .testimonial-text-section p {
            font-size: 14px !important;
          }
        }
        
        /* Override any existing testimonial styles */
        .testimonial-one__single,
        .testimonial-one__client-info-and-review,
        .testimonial-one__client-info,
        .testimonial-one__client-img,
        .testimonial-one__client-content,
        .testimonial-one__client-name,
        .testimonial-one__sub-title,
        .testimonial-one__review,
        .testimonial-one__text,
        .testimonial-one__quote {
          display: none !important;
        }
      `}</style>

      {/* Page Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1e88e5, #42a5f5)',
        padding: '100px 0 80px',
        color: 'white',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div className="container">
          <h1 style={{
            fontSize: '48px',
            fontWeight: '700',
            marginBottom: '20px',
            fontStyle: 'italic'
          }}>
            Testimonials
          </h1>
          <p style={{
            fontSize: '20px',
            opacity: 0.9
          }}>
            What our powerlifting community says about WPC Telangana
          </p>
        </div>
      </div>

      {/* Testimonials Section */}
      <section className="testimonial-page">
        <div className="container">
          <div className="row justify-content-center">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="col-xl-4 col-lg-6 col-md-6">
                <div className="blue-testimonial-card">
                  {/* Quote Marks */}
                  <div className="quote-left">"</div>
                  <div className="quote-right">"</div>
                  
                  {/* Card Content */}
                  <div className="card-content">
                    {/* Title */}
                    <div className="testimonial-title">
                      <h3>Testimonial</h3>
                    </div>

                    {/* Testimonial Text */}
                    <div className="testimonial-text-section">
                      <p>{testimonial.text}</p>
                    </div>

                    {/* Bottom Section */}
                    <div className="bottom-section">
                      {/* Profile Image */}
                      <div className="profile-image">
                        <img
                          src={testimonial.clientImage}
                          alt={testimonial.clientName}
                        />
                      </div>

                      {/* Rating Stars */}
                      <div className="rating-stars">
                        {Array.from({ length: testimonial.rating }, (_, i) => (
                          <span key={i} className="star-filled">★</span>
                        ))}
                        {Array.from({ length: 5 - testimonial.rating }, (_, i) => (
                          <span key={i + testimonial.rating} className="star-empty">★</span>
                        ))}
                      </div>

                      {/* Client Name and Role */}
                      <h5 className="client-name">{testimonial.clientName}</h5>
                      <p className="client-role">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section style={{
        background: 'white',
        padding: '80px 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8">
              <h2 style={{
                fontSize: '36px',
                color: '#333',
                marginBottom: '20px',
                fontWeight: '700'
              }}>
                Join Our Powerlifting Community
              </h2>
              <p style={{
                fontSize: '18px',
                color: '#666',
                marginBottom: '40px'
              }}>
                Experience the strength, support, and success that our athletes enjoy
              </p>
              <div style={{
                display: 'flex',
                gap: '20px',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                <Link to="/registration" style={{
                  background: 'linear-gradient(135deg, #1e88e5, #42a5f5)',
                  color: 'white',
                  padding: '15px 40px',
                  borderRadius: '30px',
                  textDecoration: 'none',
                  fontSize: '18px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 25px rgba(30, 136, 229, 0.3)'
                }}>
                  Register Now
                </Link>
                <Link to="/contact" style={{
                  border: '2px solid #1e88e5',
                  color: '#1e88e5',
                  padding: '13px 40px',
                  borderRadius: '30px',
                  textDecoration: 'none',
                  fontSize: '18px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}>
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
