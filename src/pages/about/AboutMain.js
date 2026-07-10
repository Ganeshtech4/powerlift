import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CountUp from "react-countup";
import BrandSlider1 from '../../components/Slider/BrandSlider1';
import eventImg from '../../assets/images/about/Adobe Express - file (2).jpg';
import EventOne from '../../components/Common/EventOne';
import './About.css';

// WPC-Telangana data
const points = [
    {
      icon: "icon-trophy",
      heading: "Official Recognition",
      description:
        "WPC–Telangana is the officially recognized state body of World Powerlifting Congress (WPC–India).",
    },
    {
      icon: "icon-medal",
      heading: "International Standards",
      description:
        "We organize and regulate championships under international WPC standards with fair competition.",
    },
];

const activities = [
  {
    icon: "icon-dumbbell",
    title: "Powerlifting",
    description: "State and District Championships, training workshops"
  },
  {
    icon: "icon-weight",
    title: "Bench Press", 
    description: "Open meets and age-group competitions"
  },
  {
    icon: "icon-fitness",
    title: "Deadlift",
    description: "Technique coaching and competitions"
  },
  {
    icon: "icon-whistle",
    title: "Referee & Coaching",
    description: "Seminars, certified officials, athlete development"
  }
];

const timeline = [
  {
    year: "2023",
    event: "Registered with WPC–India",
    description: "Official recognition as Telangana state body"
  },
  {
    year: "2024", 
    event: "First State Championship",
    description: "Successful championship held in Hyderabad"
  },
  {
    year: "2025",
    event: "National Qualifiers",
    description: "Hosted national qualifying competitions"
  }
];

const faqData = [
  {
    question: "Who can participate in WPC-Telangana competitions?",
    answer: "Any athlete above 14 years can participate. We have different age categories and weight classes for fair competition."
  },
  {
    question: "What are the weight classes?",
    answer: "We follow international WPC weight classes for both men and women, ranging from 52kg to 140kg+ categories."
  },
  {
    question: "Do I need my own equipment?",
    answer: "Basic equipment like belts and wraps are allowed. Competition equipment like bars and plates are provided by the organization."
  },
  {
    question: "How do I become a certified referee?",
    answer: "Attend our referee seminars and pass the certification exam. We conduct regular training programs throughout the year."
  }
];


const AboutMain = () => {
    const [activeAccordion, setActiveAccordion] = useState(null);

    const toggleAccordion = (index) => {
        setActiveAccordion(activeAccordion === index ? null : index);
    };
    
    return (
        <React.Fragment>
        {/* Hero Section - EventOne Component */}
        <EventOne
            tagline="About WPC–Telangana"
            title="World Powerlifting Congress Telangana"
            buttonText="Join Our Community"
            buttonLink="/contact"
            points={points}
            imageUrl={eventImg}
        />

        {/* Intro Card / Why We Exist */}
        <section className="intro-card-section" style={{padding: '80px 0', background: '#f8f9fa'}}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-10">
                        <div className="intro-card" style={{
                            background: 'white',
                            borderRadius: '20px',
                            padding: '50px',
                            boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
                            textAlign: 'center'
                        }}>
                            <h3 style={{color: '#333', marginBottom: '30px', fontSize: '32px'}}>
                                Who We Are
                            </h3>
                            <p style={{fontSize: '18px', lineHeight: '1.6', color: '#666', marginBottom: '30px'}}>
                                WPC–Telangana organizes and regulates Powerlifting, Bench Press, and Deadlift championships under international WPC standards. 
                                We empower Telangana athletes with fair competition, structured training, and pathways to national and international contests.
                            </p>
                            <div className="cta-buttons" style={{marginTop: '40px'}}>
                                <Link to="/registration" className="thm-btn" style={{
                                    background: 'linear-gradient(45deg, #6f42c1, #17a2b8)',
                                    color: 'white',
                                    padding: '15px 30px',
                                    borderRadius: '25px',
                                    textDecoration: 'none',
                                    marginRight: '20px'
                                }}>
                                    Become a Member
                                </Link>
                                <Link to="/event" className="thm-btn-outline" style={{
                                    border: '2px solid #6f42c1',
                                    color: '#6f42c1',
                                    padding: '13px 30px',
                                    borderRadius: '25px',
                                    textDecoration: 'none'
                                }}>
                                    View Events
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Mission & Vision Split */}
        <section className="mission-vision-section" style={{padding: '80px 0'}}>
            <div className="container">
                <div className="row">
                    <div className="col-xl-6">
                        <div className="mission-box" style={{
                            background: 'linear-gradient(135deg, rgba(111,66,193,0.1) 0%, rgba(255,255,255,0.9) 100%)',
                            padding: '40px',
                            borderRadius: '15px',
                            borderLeft: '4px solid #6f42c1',
                            height: '100%'
                        }}>
                            <div style={{display: 'flex', alignItems: 'center', marginBottom: '20px'}}>
                                <span className="icon-target" style={{fontSize: '30px', color: '#6f42c1', marginRight: '15px'}}></span>
                                <h4 style={{color: '#6f42c1', fontSize: '24px', margin: 0}}>Mission</h4>
                            </div>
                            <ul style={{listStyle: 'none', padding: 0}}>
                                <li style={{marginBottom: '15px', color: '#333'}}>• Empower athletes with fair, drug-tested competitions</li>
                                <li style={{marginBottom: '15px', color: '#333'}}>• Promote strength sports at grassroots and elite levels</li>
                                <li style={{marginBottom: '15px', color: '#333'}}>• Facilitate access to national/international platforms under WPC rules</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <div className="vision-box" style={{
                            background: 'linear-gradient(135deg, rgba(23,162,184,0.1) 0%, rgba(255,255,255,0.9) 100%)',
                            padding: '40px',
                            borderRadius: '15px',
                            borderLeft: '4px solid #17a2b8',
                            height: '100%'
                        }}>
                            <div style={{display: 'flex', alignItems: 'center', marginBottom: '20px'}}>
                                <span className="icon-eye" style={{fontSize: '30px', color: '#17a2b8', marginRight: '15px'}}></span>
                                <h4 style={{color: '#17a2b8', fontSize: '24px', margin: 0}}>Vision</h4>
                            </div>
                            <p style={{fontSize: '18px', lineHeight: '1.6', color: '#333'}}>
                                To be the recognized center of excellence for strength sports in Telangana and 
                                a trusted gateway to international competition.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* What We Do / Activities */}
        <section className="activities-section" style={{padding: '80px 0', background: '#f8f9fa'}}>
            <div className="container">
                <div className="text-center" style={{marginBottom: '60px'}}>
                    <h2 style={{fontSize: '36px', color: '#333', marginBottom: '20px'}}>What We Do</h2>
                    <p style={{fontSize: '18px', color: '#666'}}>Our comprehensive programs and activities</p>
                </div>
                <div className="row">
                    {activities.map((activity, index) => (
                        <div key={index} className="col-xl-3 col-md-6" style={{marginBottom: '30px'}}>
                            <div className="activity-card" style={{
                                background: 'white',
                                padding: '30px',
                                borderRadius: '15px',
                                textAlign: 'center',
                                boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                                transition: 'transform 0.3s ease',
                                height: '100%'
                            }}>
                                <div className="icon-circle" style={{
                                    background: 'linear-gradient(45deg, #6f42c1, #17a2b8)',
                                    width: '70px',
                                    height: '70px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 20px'
                                }}>
                                    <span className={activity.icon} style={{fontSize: '30px', color: 'white'}}></span>
                                </div>
                                <h5 style={{color: '#333', marginBottom: '15px'}}>{activity.title}</h5>
                                <p style={{color: '#666', fontSize: '14px'}}>{activity.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Impact / Stats Strip */}
        <section className="stats-section" style={{padding: '80px 0'}}>
            <div className="container">
                <div className="row">
                    <div className="col-xl-3 col-md-6" style={{marginBottom: '30px'}}>
                        <div className="stat-card" style={{
                            textAlign: 'center',
                            background: 'white',
                            padding: '40px 30px',
                            borderRadius: '20px',
                            boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
                            height: '220px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            transition: 'all 0.3s ease'
                        }}>
                            <div className="stat-number" style={{
                                background: 'linear-gradient(45deg, #6f42c1, #17a2b8)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontSize: '60px',
                                fontWeight: 'bold',
                                marginBottom: '15px',
                                lineHeight: '1'
                            }}>
                                <CountUp start={0} end={150} duration={2} />+
                            </div>
                            <p style={{color: '#333', fontWeight: '600', fontSize: '18px', margin: 0}}>Athletes Certified</p>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6" style={{marginBottom: '30px'}}>
                        <div className="stat-card" style={{
                            textAlign: 'center',
                            background: 'white',
                            padding: '40px 30px',
                            borderRadius: '20px',
                            boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
                            height: '220px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            transition: 'all 0.3s ease'
                        }}>
                            <div className="stat-number" style={{
                                background: 'linear-gradient(45deg, #6f42c1, #17a2b8)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontSize: '60px',
                                fontWeight: 'bold',
                                marginBottom: '15px',
                                lineHeight: '1'
                            }}>
                                <CountUp start={0} end={75} duration={2} />+
                            </div>
                            <p style={{color: '#333', fontWeight: '600', fontSize: '18px', margin: 0}}>Competitions Held</p>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6" style={{marginBottom: '30px'}}>
                        <div className="stat-card" style={{
                            textAlign: 'center',
                            background: 'white',
                            padding: '40px 30px',
                            borderRadius: '20px',
                            boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
                            height: '220px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            transition: 'all 0.3s ease'
                        }}>
                            <div className="stat-number" style={{
                                background: 'linear-gradient(45deg, #6f42c1, #17a2b8)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontSize: '60px',
                                fontWeight: 'bold',
                                marginBottom: '15px',
                                lineHeight: '1'
                            }}>
                                <CountUp start={0} end={15} duration={2} />+
                            </div>
                            <p style={{color: '#333', fontWeight: '600', fontSize: '18px', margin: 0}}>Districts Represented</p>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6" style={{marginBottom: '30px'}}>
                        <div className="stat-card" style={{
                            textAlign: 'center',
                            background: 'white',
                            padding: '40px 30px',
                            borderRadius: '20px',
                            boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
                            height: '220px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            transition: 'all 0.3s ease'
                        }}>
                            <div className="stat-number" style={{
                                background: 'linear-gradient(45deg, #6f42c1, #17a2b8)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontSize: '60px',
                                fontWeight: 'bold',
                                marginBottom: '15px',
                                lineHeight: '1'
                            }}>
                                <CountUp start={0} end={5} duration={2} />+
                            </div>
                            <p style={{color: '#333', fontWeight: '600', fontSize: '18px', margin: 0}}>Years Active</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Timeline / History */}
        <section className="timeline-section" style={{padding: '80px 0', background: '#f8f9fa'}}>
            <div className="container">
                <div className="text-center" style={{marginBottom: '60px'}}>
                    <h2 style={{fontSize: '36px', color: '#333', marginBottom: '20px'}}>Our Journey</h2>
                    <p style={{fontSize: '18px', color: '#666'}}>Key milestones in our development</p>
                </div>
                <div className="row">
                    {timeline.map((item, index) => (
                        <div key={index} className="col-xl-4" style={{marginBottom: '30px'}}>
                            <div className="timeline-card" style={{
                                background: 'white',
                                padding: '30px',
                                borderRadius: '15px',
                                boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                                textAlign: 'center',
                                height: '100%'
                            }}>
                                <div className="year" style={{
                                    background: 'linear-gradient(45deg, #6f42c1, #17a2b8)',
                                    color: 'white',
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 20px',
                                    fontSize: '18px',
                                    fontWeight: 'bold'
                                }}>
                                    {item.year}
                                </div>
                                <h5 style={{color: '#333', marginBottom: '15px'}}>{item.event}</h5>
                                <p style={{color: '#666', fontSize: '14px'}}>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* How to Join / Membership CTA */}
        <section className="join-section" style={{padding: '80px 0'}}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-8 text-center">
                        <h2 style={{fontSize: '36px', color: '#333', marginBottom: '20px'}}>Ready to Join Us?</h2>
                        <p style={{fontSize: '18px', color: '#666', marginBottom: '40px'}}>
                            Become a member — register for competitions, attend training, and gain access to certified events.
                        </p>
                        <div className="join-steps" style={{marginBottom: '40px'}}>
                            <div className="row">
                                <div className="col-md-4" style={{marginBottom: '20px'}}>
                                    <div className="step">
                                        <div className="step-number" style={{
                                            background: '#6f42c1',
                                            color: 'white',
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            margin: '0 auto 15px',
                                            fontWeight: 'bold'
                                        }}>1</div>
                                        <h6>Register</h6>
                                        <p style={{fontSize: '14px', color: '#666'}}>Fill out membership form</p>
                                    </div>
                                </div>
                                <div className="col-md-4" style={{marginBottom: '20px'}}>
                                    <div className="step">
                                        <div className="step-number" style={{
                                            background: '#17a2b8',
                                            color: 'white',
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            margin: '0 auto 15px',
                                            fontWeight: 'bold'
                                        }}>2</div>
                                        <h6>Pay Fees</h6>
                                        <p style={{fontSize: '14px', color: '#666'}}>Complete membership payment</p>
                                    </div>
                                </div>
                                <div className="col-md-4" style={{marginBottom: '20px'}}>
                                    <div className="step">
                                        <div className="step-number" style={{
                                            background: '#28a745',
                                            color: 'white',
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            margin: '0 auto 15px',
                                            fontWeight: 'bold'
                                        }}>3</div>
                                        <h6>Start Training</h6>
                                        <p style={{fontSize: '14px', color: '#666'}}>Begin your powerlifting journey</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Link to="/registration" className="thm-btn" style={{
                            background: 'linear-gradient(45deg, #6f42c1, #17a2b8)',
                            color: 'white',
                            padding: '15px 40px',
                            borderRadius: '25px',
                            textDecoration: 'none',
                            fontSize: '18px',
                            fontWeight: '600'
                        }}>
                            Apply for Membership
                        </Link>
                    </div>
                </div>
            </div>
        </section>

        {/* FAQ Accordion */}
        <section className="faq-section" style={{padding: '80px 0', background: '#f8f9fa'}}>
            <div className="container">
                <div className="text-center" style={{marginBottom: '60px'}}>
                    <h2 style={{fontSize: '36px', color: '#333', marginBottom: '20px'}}>Frequently Asked Questions</h2>
                    <p style={{fontSize: '18px', color: '#666'}}>Everything you need to know about WPC-Telangana</p>
                </div>
                <div className="row justify-content-center">
                    <div className="col-xl-8">
                        {faqData.map((faq, index) => (
                            <div key={index} className="faq-item" style={{
                                background: 'white',
                                marginBottom: '15px',
                                borderRadius: '10px',
                                overflow: 'hidden',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                            }}>
                                <button 
                                    className="faq-question"
                                    onClick={() => toggleAccordion(index)}
                                    style={{
                                        width: '100%',
                                        padding: '20px',
                                        background: 'none',
                                        border: 'none',
                                        textAlign: 'left',
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        color: '#333',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}
                                >
                                    {faq.question}
                                    <span style={{fontSize: '20px'}}>{activeAccordion === index ? '−' : '+'}</span>
                                </button>
                                {activeAccordion === index && (
                                    <div className="faq-answer" style={{
                                        padding: '0 20px 20px',
                                        color: '#666',
                                        lineHeight: '1.6'
                                    }}>
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        {/* Contact & Newsletter */}
        <section className="contact-section" style={{padding: '80px 0'}}>
            <div className="container">
                <div className="row">
                    <div className="col-xl-6">
                        <h3 style={{color: '#333', marginBottom: '30px'}}>Get in Touch</h3>
                        <div className="contact-info">
                            <div className="contact-item" style={{display: 'flex', marginBottom: '20px'}}>
                                <span className="icon-phone" style={{color: '#6f42c1', fontSize: '20px', marginRight: '15px'}}></span>
                                <div>
                                    <strong>Phone:</strong>
                                    <p style={{margin: 0, color: '#666'}}>
                                       +91 7330778111</p>
                                </div>
                            </div>
                            <div className="contact-item" style={{display: 'flex', marginBottom: '20px'}}>
                                <span className="icon-email" style={{color: '#6f42c1', fontSize: '20px', marginRight: '15px'}}></span>
                                <div>
                                    <strong>Email:</strong>
                                    <p style={{margin: 0, color: '#666'}}>info@wpctelangana.com</p>
                                </div>
                            </div>
                            <div className="contact-item" style={{display: 'flex', marginBottom: '20px'}}>
                                <span className="icon-pin" style={{color: '#6f42c1', fontSize: '20px', marginRight: '15px'}}></span>
                                <div>
                                    <strong>Location:</strong>
                                    <p style={{margin: 0, color: '#666'}}>#15-104/1, Vandanapuri Colony, Beeramguda,
                                     Sangareddy–502032,Telangana, India</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6">
                        <h3 style={{color: '#333', marginBottom: '30px'}}>Newsletter</h3>
                        <p style={{color: '#666', marginBottom: '30px'}}>
                            Stay updated with our latest competitions, training programs, and announcements.
                        </p>
                        <div className="newsletter-form" style={{display: 'flex'}}>
                            <input 
                                type="email" 
                                placeholder="Enter your email"
                                style={{
                                    flex: 1,
                                    padding: '12px 15px',
                                    border: '2px solid #dee2e6',
                                    borderRadius: '25px 0 0 25px',
                                    outline: 'none'
                                }}
                            />
                            <button style={{
                                background: 'linear-gradient(45deg, #6f42c1, #17a2b8)',
                                color: 'white',
                                border: 'none',
                                padding: '12px 25px',
                                borderRadius: '0 25px 25px 0',
                                cursor: 'pointer'
                            }}>
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Brand Slider */}
        <section className="brand-one">
            <div className="container">
                <BrandSlider1 />
            </div>
        </section>
        </React.Fragment>
    );
};

export default AboutMain;
