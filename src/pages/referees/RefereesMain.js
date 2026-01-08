import React from "react";
import { Link } from "react-router-dom";
import inspireimg1 from '../../assets/images/team/Adobe Express - file.jpg';
import inspireimg2 from '../../assets/images/team/team-1-3.jpg';
import inspireimg3 from '../../assets/images/team/Adobe Express - file (1).jpg';






const InspireMain = () => {
  const stories = [
    {
      id: 1,
      name: "Inturi Rekha",
      role: "International Referee",
      image: inspireimg1,
      quote:
        "PRESIDENT, WPC TELANGANA & FIRST FEMALE INTERNATIONAL REFEREE.",
    },
    {
      id: 2,
      name: "HA Pradeep kumar",
      role: "National Referee",
      image: inspireimg2,
      quote:
        " Vice President  of WPC Telangana, where he plays a key role in guiding strategy.",
    },
    {
      id: 3,
      name: "Manthena Sai Teja",
      role: "National Referee",
      image: inspireimg3,
      quote:
        "National Referee of WPC Telangana, a certified personal trainer.",
    },
    
    // {
    //   id: 5,
    //   name: "Deepa Kumar",
    //   role: "Senior Powerlifting Trainer",
    //   image: inspireimg5,
    //   quote:
    //     "Guiding young athletes under WPC Telangana has been an inspiring journey. Strength comes from unity and purpose.",
    // },
    // {
    //   id: 6,
    //   name: "Vikram Singh",
    //   role: "State Powerlifting Champion",
    //   image:
    //     "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=900&q=80",
    //   quote:
    //     "Joining WPC Telangana helped me transform my training and mindset. Now, I compete with confidence at state and national levels.",
    // },
    // {
    //   id: 7,
    //   name: "Anjali Mehra",
    //   role: "Women’s Fitness Ambassador",
    //   image:
    //     "https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=900&q=80",
    //   quote:
    //     "Being part of WPC Telangana motivates women to take strength training seriously and empowers them to achieve their fitness goals.",
    // },
    // {
    //   id: 8,
    //   name: "Raghav Varma",
    //   role: "Junior Gold Medalist",
    //   image:
    //     "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    //   quote:
    //     "I learned that patience and perseverance are key. WPC Telangana coaches pushed me to my best and prepared me for national competitions.",
    // },
    // {
    //   id: 9,
    //   name: "Priya Nair",
    //   role: "Athlete & Motivational Speaker",
    //   image:
    //     "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
    //   quote:
    //     "Sharing my journey at WPC Telangana inspires upcoming athletes to believe in themselves and chase their dreams without fear.",
    // },
    // {
    //   id: 10,
    //   name: "Suresh Reddy",
    //   role: "Powerlifting Mentor & Trainer",
    //   image:
    //     "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    //   quote:
    //     "Mentoring young lifters and watching their progress is the most rewarding part of being with WPC Telangana. Strength is cultivated here with care.",
    // },
    // {
    //   id: 11,
    //   name: "Kavya Sharma",
    //   role: "Regional Powerlifting Champion",
    //   image:
    //     "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    //   quote:
    //     "Training with WPC Telangana strengthened both my body and mind. Achieving medals is just part of my journey here.",
    // },
    // {
    //   id: 12,
    //   name: "Arjun Reddy",
    //   role: "National Bench Press Record Holder",
    //   image:
    //     "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?auto=format&fit=crop&w=800&q=80",
    //   quote:
    //     "I broke my limits thanks to the guidance and encouragement from WPC Telangana.persistence and dedication.",
    // },
  ];

  return (
    <section className="blog-page collaboration-page" style={{ background: "#ffffff" }}>
     
      <div className="container">
        <div className="section-title text-center mb-5">
          <h2 className="section-title__title" style={{ color: "#000000" }}>
            Inspiring Strength Stories
          </h2>
          <p className="section-title__text" style={{ color: "#333333" }}>
            Meet the powerlifters who embody strength, discipline, and determination under WPC Telangana. These athletes remind us that dedication builds champions.
          </p>
        </div>

        <div className="row justify-content-center">
          {stories.map((athlete, index) => (
            <div key={athlete.id} className="col-xl-4 col-lg-4 col-md-6 mb-4">
              <div className={`inspire-card inspire-card-${index + 1}`}>
                <div className="inspire-card__img">
                  <img src={athlete.image} alt={athlete.name} />
                  <div className="inspire-card__overlay"></div>
                </div>
                <div className="inspire-card__content text-center">
                  <h3 className="inspire-card__name">{athlete.name}</h3>
                  <p className="inspire-card__role">{athlete.role}</p>
                  <p className="inspire-card__quote">{athlete.quote}</p>
                  <Link to={`/inspire-details/${athlete.id}`} className="inspire-card__btn">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .inspire-card {
          background: rgba(255, 255, 255, 0.98);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          transition: all 0.4s ease;
          border: 1px solid rgba(0,0,0,0.08);
          max-width: 400px;
          margin: 0 auto;
        }
        
        /* Default hover effect */
        .inspire-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 40px rgba(0,0,0,0.2);
        }
        
        /* Card 1 - Light Red Hover */
        .inspire-card-1:hover {
          background: linear-gradient(135deg, rgba(255, 182, 193, 0.9) 0%, rgba(255, 160, 160, 0.9) 100%);
          border-color: #ffb6c1;
          box-shadow: 0 15px 40px rgba(255, 105, 135, 0.3);
        }
        
        /* Card 2 - Light Blue Hover */
        .inspire-card-2:hover {
          background: linear-gradient(135deg, rgba(173, 216, 230, 0.9) 0%, rgba(135, 206, 235, 0.9) 100%);
          border-color: #add8e6;
          box-shadow: 0 15px 40px rgba(100, 149, 237, 0.3);
        }
        
        /* Card 3 - Light Red Hover */
        .inspire-card-3:hover {
          background: linear-gradient(135deg, rgba(255, 192, 203, 0.9) 0%, rgba(255, 182, 193, 0.9) 100%);
          border-color: #ffc0cb;
          box-shadow: 0 15px 40px rgba(255, 105, 135, 0.3);
        }
        
        /* Card 4 - Light Blue Hover */
        .inspire-card-4:hover {
          background: linear-gradient(135deg, rgba(176, 224, 230, 0.9) 0%, rgba(173, 216, 230, 0.9) 100%);
          border-color: #b0e0e6;
          box-shadow: 0 15px 40px rgba(100, 149, 237, 0.3);
        }
        
        .inspire-card__img {
          position: relative;
          overflow: hidden;
          border-radius: 20px 20px 0 0;
          background: #f8f9fa;
        }
        .inspire-card__img img {
          width: 100%;
          height: 400px;
          object-fit: cover;
          display: block;
          border-radius: 15px 15px 0 0;
          transition: all 0.3s ease;
          filter: brightness(1.1) contrast(1.1) saturate(1.2);
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
        }
        
        .inspire-card:hover .inspire-card__img img {
          filter: brightness(1.2) contrast(1.2) saturate(1.3);
          transform: scale(1.02);
        }
        .inspire-card__overlay {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: rgba(0,0,0,0.2);
          transition: all 0.3s ease;
          border-radius: 15px 15px 0 0;
        }
        
        .inspire-card:hover .inspire-card__overlay {
          background: rgba(0,0,0,0.1);
        }
        .inspire-card__content {
          padding: 20px;
          color: #000000;
        }
        .inspire-card__name {
          font-size: 20px;
          color: #000000;
          margin-bottom: 5px;
          font-weight: 600;
        }
        .inspire-card__role {
          font-weight: 600;
          color: #666666;
          margin-bottom: 10px;
        }
        .inspire-card__quote {
          color: #444444;
          font-size: 14px;
          margin-bottom: 10px;
          line-height: 1.5;
        }
        .inspire-card__id {
          font-weight: bold;
          color: #000000;
          margin-bottom: 15px;
        }
        .inspire-card__btn {
          display: inline-block;
          padding: 8px 15px;
          background: #007bff;
          color: #fff;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
          transition: background 0.3s;
        }
        .inspire-card__btn:hover {
          background: #0056b3;
          color: #ffffff;
        }
        
        /* Hover effects for button based on card type */
        .inspire-card-1:hover .inspire-card__btn,
        .inspire-card-3:hover .inspire-card__btn {
          background: #dc3545;
          color: #ffffff;
        }
        
        .inspire-card-2:hover .inspire-card__btn,
        .inspire-card-4:hover .inspire-card__btn {
          background: #007bff;
          color: #ffffff;
        }
      `}</style>
    </section>
  );
};

export default InspireMain;
