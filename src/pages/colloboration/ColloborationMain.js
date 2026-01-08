

"use client";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import TestimonialsImg1 from '../../assets/images/testimonial/testimonial-one-client-1-1.jpg';
import TestimonialsImg2 from '../../assets/images/testimonial/testimonial-one-client-1-2.jpg';
import TestimonialsImg3 from '../../assets/images/testimonial/testimonial-one-client-1-3.jpg';
import TestimonialsImg4 from '../../assets/images/testimonial/testimonial-one-client-1-4.jpg';
import TestimonialsImg5 from '../../assets/images/testimonial/testimonial-one-client-1-5.jpg';
import TestimonialsImg6 from '../../assets/images/testimonial/testimonial-one-client-1-6.jpg';
import collabimg1 from '../../assets/images/collaboration/img1.png';
import collabimg2 from '../../assets/images/collaboration/img2.jpg';

// CSS Overrides for Blue Testimonial Cards
const injectColloborationTestimonialStyles = () => {
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = `
    .blue-testimonial-card-collab {
      background: linear-gradient(135deg, #1e88e5, #42a5f5) !important;
      border-radius: 20px !important;
      padding: 0 !important;
      box-shadow: 0 20px 40px rgba(30, 136, 229, 0.3) !important;
      overflow: hidden !important;
      position: relative !important;
      height: 450px !important;
      transition: all 0.3s ease !important;
    }

    .blue-testimonial-card-collab:hover {
      transform: translateY(-10px) !important;
      box-shadow: 0 30px 60px rgba(30, 136, 229, 0.4) !important;
    }

    .blue-testimonial-card-collab * {
      box-sizing: border-box !important;
    }

    @media (max-width: 768px) {
      .blue-testimonial-card-collab {
        height: auto !important;
        min-height: 400px !important;
      }
    }

    .collaboration-testimonials .section-title__title {
      font-size: 36px !important;
      font-weight: 700 !important;
      color: #333 !important;
      margin-bottom: 20px !important;
    }

    .collaboration-testimonials .section-title__text {
      font-size: 18px !important;
      color: #666 !important;
    }
  `;
  document.head.appendChild(style);
};

// Inject styles when component mounts
if (typeof window !== 'undefined') {
  injectColloborationTestimonialStyles();
}





// Collaboration images
const cards = [
  {
    id: 1,
    title: "Partner Gym Benefits",
    items: [
      "₹250 per athlete referred for WPC registration",
      "State-level recognition and promotion",
      "Social media and poster marketing",
      "Priority hosting for local events",
    ],
    image: collabimg1,
  },
  {
    id: 2,
    title: "Achievements",
    items: [
      "10+ State Champions selected for Nationals",
      "State-level recognition and promotion",
      "3 International Medalists from Telangana",
      "Multiple National Record Holders",
    ],
    image: collabimg2,
  },
];

// Testimonials images and data

const testimonials = [
  {
    clientName: "Rajesh Kumar",
    role: "National Powerlifter",
    clientImage: TestimonialsImg1,
    text: "Being part of WPC Telangana has completely changed my approach to training. The competitions are well organized and the community is truly supportive.",
    rating: 5,
  },
  {
    clientName: "Sharma",
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
    clientName: "Patel",
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
    clientName: "Raju Singh",
    role: "Participant",
    clientImage: TestimonialsImg6,
    text: "From registration to award ceremonies, everything was perfectly organized. WPC really sets a high standard for powerlifting events in India.",
    rating: 4,
  },
];

export default function CollaborationPage() {
  return (
    <>
      {/* Collaboration Cards Section */}
      <section className="blog-page collaboration-page py-5">
        <div className="container">
          <div className="section-title text-center mb-5">
            <h2 className="section-title__title">
              Collaborations & Achievements
            </h2>
            <p className="section-title__text">
              WPC Telangana actively partners with fitness centers, academies,
              and gyms to build strength awareness and athlete participation.
            </p>
          </div>

          <div className="row justify-content-center">
            {cards.map((card, index) => (
              <div
                key={card.id}
                className={`col-xl-5 col-lg-6 col-md-8 mb-4 wow fadeIn${
                  index % 2 === 0 ? "Left" : "Right"
                }`}
                data-wow-delay={`${(index + 1) * 100}ms`}
              >
                <div className="collab-card">
                  <div className="collab-card__img">
                    <img src={card.image} alt={card.title} />
                    <div className="collab-card__overlay">
                      <h4>{card.title}</h4>
                    </div>
                  </div>
                  <div className="collab-card__content">
                    <h3>{card.title}</h3>
                    <ul>
                      {card.items.map((item, idx) => (
                        <li key={idx}>
                          <FaCheckCircle className="me-2 text-success" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Blue Card Design */}
      <section className="collaboration-testimonials" style={{ 
        background: "#f0f2f5", 
        padding: "100px 0",
        position: "relative"
      }}>
        <div className="container">
          <div className="section-title text-center mb-5">
            <h2 className="section-title__title" style={{
              fontSize: "36px",
              fontWeight: "700",
              color: "#333",
              marginBottom: "20px"
            }}>
              What Our Community Says
            </h2>
            <p className="section-title__text" style={{
              fontSize: "18px",
              color: "#666"
            }}>
              Hear from our athletes, volunteers, and partners about their WPC Telangana experience
            </p>
          </div>

          <div className="row justify-content-center">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="col-xl-4 col-lg-6 col-md-6" style={{marginBottom: "40px"}}>
                <div className="blue-testimonial-card-collab" style={{
                  background: "linear-gradient(200deg, #1e88e5, #42a5f5)",
                  borderRadius: "20px",
                  padding: "0",
                  boxShadow: "0 20px 40px rgba(30, 136, 229, 0.3)",
                  overflow: "hidden",
                  position: "relative",
                  height: "450px",
                  transition: "all 0.3s ease"
                }}>
                  {/* Large Quote Mark - Top Left */}
                  <div style={{
                    position: "absolute",
                    top: "20px",
                    left: "20px",
                    fontSize: "60px",
                    color: "rgba(255,255,255,0.3)",
                    fontFamily: "serif",
                    lineHeight: "1",
                    fontWeight: "bold",
                    zIndex: 1
                  }}>
                    "
                  </div>

                  {/* Large Quote Mark - Bottom Right */}
                  <div style={{
                    position: "absolute",
                    bottom: "140px",
                    right: "20px",
                    fontSize: "60px",
                    color: "rgba(255,255,255,0.3)",
                    fontFamily: "serif",
                    lineHeight: "1",
                    fontWeight: "bold",
                    transform: "rotate(180deg)",
                    zIndex: 1
                  }}>
                    "
                  </div>

                  {/* Card Content */}
                  <div style={{
                    padding: "40px 30px 0",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    position: "relative",
                    zIndex: 2
                  }}>
                    {/* Title */}
                    <div style={{
                      textAlign: "center",
                      marginBottom: "30px"
                    }}>
                      <h3 style={{
                        color: "white",
                        fontSize: "28px",
                        fontWeight: "600",
                        fontStyle: "italic",
                        margin: 0
                      }}>
                        Testimonial
                      </h3>
                    </div>

                    {/* Testimonial Text */}
                    <div style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      padding: "0 10px"
                    }}>
                      <p style={{
                        color: "white",
                        fontSize: "16px",
                        lineHeight: "1.6",
                        margin: 0,
                        fontWeight: "400"
                      }}>
                        {testimonial.text}
                      </p>
                    </div>

                    {/* Bottom Section */}
                    <div style={{
                      background: "rgba(255,255,255,0.95)",
                      margin: "30px -30px 0",
                      padding: "25px 30px",
                      borderRadius: "0 0 20px 20px",
                      textAlign: "center"
                    }}>
                      {/* Profile Image */}
                      <div style={{
                        marginBottom: "15px"
                      }}>
                        <img
                          src={testimonial.clientImage}
                          alt={testimonial.clientName}
                          style={{
                            width: "70px",
                            height: "70px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            border: "4px solid white",
                            boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
                          }}
                        />
                      </div>

                      {/* Rating Stars */}
                      <div style={{
                        marginBottom: "10px",
                        display: "flex",
                        justifyContent: "center",
                        gap: "3px"
                      }}>
                        {Array.from({ length: testimonial.rating }, (_, i) => (
                          <span key={i} style={{
                            color: "#ffa726",
                            fontSize: "20px"
                          }}>★</span>
                        ))}
                        {Array.from({ length: 5 - testimonial.rating }, (_, i) => (
                          <span key={i + testimonial.rating} style={{
                            color: "#e0e0e0",
                            fontSize: "20px"
                          }}>★</span>
                        ))}
                      </div>

                      {/* Client Name and Role */}
                      <h5 style={{
                        color: "#333",
                        fontSize: "18px",
                        fontWeight: "600",
                        margin: "0 0 5px 0"
                      }}>
                        {testimonial.clientName}
                      </h5>
                      <p style={{
                        color: "#666",
                        fontSize: "14px",
                        fontStyle: "italic",
                        margin: 0
                      }}>
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Styles */}
      <style>{`
        /* Collaboration Cards */
        .collab-card {
          background: #fff;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          transition: all 0.4s ease;
        }
        .collab-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        .collab-card__img {
          position: relative;
          overflow: hidden;
        }
        .collab-card__img img {
          width: 100%;
          height: 280px;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .collab-card:hover .collab-card__img img {
          transform: scale(1.08);
        }
        .collab-card__overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(0,0,0,0.5);
          color: #fff;
          padding: 12px 20px;
          text-align: center;
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .collab-card:hover .collab-card__overlay {
          opacity: 1;
        }
        .collab-card__content {
          padding: 20px;
          text-align: left;
        }
        .collab-card__content h3 {
          font-size: 1.4rem;
          font-weight: 600;
          margin-bottom: 15px;
          color: #111;
        }
        .collab-card__content ul {
          list-style: none;
          padding: 0;
        }
        .collab-card__content ul li {
          margin-bottom: 10px;
          font-size: 1rem;
          color: #333;
          display: flex;
          align-items: center;
        }

        /* Testimonials */
        .testimonial-one__single {
          border-radius: 12px;
        }
        .testimonial-one__client-name a {
          color: #111;
          text-decoration: none;
          font-weight: 600;
        }
        .testimonial-one__sub-title {
          font-size: 0.9rem;
          color: #555;
        }
        .icon-star {
          font-size: 1rem;
        }
        .testimonial-one__text {
          font-size: 0.95rem;
          color: #333;
          margin-top: 10px;
        }
      `}</style>
    </>
  );
}
