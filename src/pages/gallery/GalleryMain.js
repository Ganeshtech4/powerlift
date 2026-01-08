"use client";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// ================= Gallery Images =================
import GalleryImg1 from '../../assets/images/resources/schedule-one-1-1.jpg'
import GalleryImg2 from '../../assets/images/resources/schedule-one-1-8.jpg'
import GalleryImg3 from '../../assets/images/resources/schedule-one-1-10.jpg'
import GalleryImg4 from '../../assets/images/resources/schedule-one-1-4.jpg'
import GalleryImg5 from '../../assets/images/resources/schedule-one-1-5.jpg'
import GalleryImg6 from '../../assets/images/resources/schedule-one-1-6.jpg'
import GalleryImg7 from '../../assets/images/resources/schedule-one-1-2.jpg'
import GalleryImg8 from '../../assets/images/resources/schedule-one-1-7.jpg'

import TeamImg1 from '../../assets/images/team/team-1-1.jpg'
import TeamImg2 from '../../assets/images/team/team-1-2.jpg'
import TeamImg3 from '../../assets/images/team/team-1-3.jpg'
import TeamImg4 from '../../assets/images/team/team-1-4.jpg'
import TeamImg5 from '../../assets/images/team/team-1-5.jpg'
import TeamImg6 from '../../assets/images/team/team-1-6.jpg'
import TeamImg7 from '../../assets/images/team/team-1-7.jpg'
import TeamImg8 from '../../assets/images/team/team-1-8.jpg'
import TeamImg9 from '../../assets/images/team/team-1-9.jpg'
import TeamImg10 from '../../assets/images/team/team-1-10.jpg'
import TeamImg11 from '../../assets/images/team/team-1-11.jpg'
import TeamImg12 from '../../assets/images/team/team-1-12.jpg'

const galleryItems = [
  { src: GalleryImg1, alt: "Gallery 1", title: "Dream Makers Event Planning", subtitle: "Gala Affairs", href: "/gallery-details" },
  { src: GalleryImg2, alt: "Gallery 2", title: "Dream Makers Event Planning", subtitle: "Gala Affairs", href: "/gallery-details" },
  { src: GalleryImg3, alt: "Gallery 3", title: "Dream Makers Event Planning", subtitle: "Gala Affairs", href: "/gallery-details" },
  { src: GalleryImg4, alt: "Gallery 4", title: "Dream Makers Event Planning", subtitle: "Gala Affairs", href: "/gallery-details" },
  { src: GalleryImg5, alt: "Gallery 5", title: "Dream Makers Event Planning", subtitle: "Gala Affairs", href: "/gallery-details" },
  { src: GalleryImg6, alt: "Gallery 6", title: "Dream Makers Event Planning", subtitle: "Gala Affairs", href: "/gallery-details" },
  { src: GalleryImg7, alt: "Gallery 7", title: "Dream Makers Event Planning", subtitle: "Gala Affairs", href: "/gallery-details" },
  { src: GalleryImg8, alt: "Gallery 8", title: "Dream Makers Event Planning", subtitle: "Gala Affairs", href: "/gallery-details" },
];

// ================= Events Data =================
const eventsData = [
  {
    id: "year-1",
    title: "State Championship",
    category: "Championship",
    description: "Top lifters from districts compete for the state title.",
    image: GalleryImg1,
    date: "12 May 2023",
    time: "10 AM to 8 PM",
    location: "Hyderabad, Telangana",
    href: "/event-details/year-1"
  },
  {
    id: "year-3",
    title: "Gym Point Championship",
    category: "Competition",
    description: "Benchpress & Deadlift events open to all strength athletes.",
    image: GalleryImg3,
    date: "10 April 2023",
    time: "10 AM to 7 PM",
    location: "Hyderabad, Telangana",
    href: "/event-details/year-3"
  },
  {
    id: "year-4",
    title: "Origin Championship",
    category: "Training",
    description: "Athlete development, coaching, and referee training.",
    image: GalleryImg4,
    date: "18 June 2023",
    time: "9 AM to 8 PM",
    location: "Hyderabad, Telangana",
    href: "/event-details/year-4"
  },
  {
    id: "year-5",
    title: "Ozzie Championship",
    category: "Championship",
    description: "The Ozzie Championship celebrated athletic diversity, inviting competitors from across India to challenge their limits.",
    image: GalleryImg5,
    date: "23 July 2023",
    time: "10 AM to 9 PM",
    location: "Hyderabad, Telangana",
    href: "/event-details/year-5"
  },
  {
    id: "year-6",
    title: "Potens Championship",
    category: "Competition",
    description: "Potens Championship was designed to identify the most promising athletes of the year with an electrifying audience.",
    image: GalleryImg6,
    date: "15 April 2023",
    time: "9 AM to 7 PM",
    location: "Hyderabad, Telangana",
    href: "/event-details/year-6"
  },
  {
    id: "year-7",
    title: "Second State Championship",
    category: "Championship",
    description: "Following the success of the first edition, the Second State Championship returned with enhanced facilities and larger participation.",
    image: GalleryImg7,
    date: "10 March 2025",
    time: "10 AM to 9 PM",
    location: "Hyderabad, Telangana",
    href: "/event-details/year-7"
  },
  {
    id: "year-8",
    title: "Telangana First State Championship",
    category: "Championship",
    description: "A knowledge-focused event featuring industry professionals, trainers, and athletes sharing insights on nutrition and recovery.",
    image: GalleryImg2,
    date: "25 June 2023",
    time: "9 AM to 5 PM",
    location: "Hyderabad, Telangana",
    href: "/event-details/year-8"
  },
  {
    id: "year-9",
    title: "FSG Independence Day",
    category: "Special Event",
    description: "A special Independence Day event celebrating powerlifting and national pride.",
    image: GalleryImg8,
    date: "20 April 2023",
    time: "10 AM to 10 PM",
    location: "Hyderabad, Telangana",
    href: "/event-details/year-9"
  },
  {
    id: "year-10",
    title: "AF Championship",
    category: "Championship",
    description: "The AF Championship marked the culmination of a decade of athletic growth featuring elite competitors.",
    image: GalleryImg1,
    date: "10 August 2023",
    time: "9 AM to 8 PM",
    location: "Hyderabad, Telangana",
    href: "/event-details/year-10"
  }
];

// ================= Team Images & Members =================


const teamMembers = [
  { id: "rekha", name: "Inturi Rekha", role: "President,WPC Telangana", img: TeamImg1, description: "" },
  { id: "kumari", name: "Inturi Kumari", role: "Chairman,WPC Telangana", img: TeamImg2, description: "" },
  { id: "pradeep", name: "Dr.H.A.Pradeep Kumar", role: "Vice Chairman,WPC Telangana", img: TeamImg3, description: "" },
  { id: "guru", name: "Mr.Guru Parminder Singh", role: "State Secretary,WPC Telangana", img: TeamImg6, description: "" },
  { id: "moneess", name: "Mr.Moneess Pulelu", role: "Secretary-Rangareddy,WPC Telangana", img: TeamImg4, description: "" },
  { id: "abdul", name: "Mr.Abdul Ateeq", role: "Secretary-hyderabad,WPC Telangana", img: TeamImg5, description: "" },
  { id: "vijay", name: "Mr.G.VijaY", role: "Treasurer,WPC Telangana", img: TeamImg7, description: "" },
   { id: "kiran", name: "Mr.Kiran Kumar", role: "President-Medchal,WPC Telangana", img: TeamImg12, description: "" },
  { id: "mazhar", name: "Mr.Mir Mazhar Ali khan", role: " President-Hyderabad District,WPC Telangana", img: TeamImg10, description: "" },
  { id: "abhilash", name: "Mr.Abhilash babde", role: "President-Rangareddy,WPC Telangana", img: TeamImg9, description: "" },
  { id: "manoj", name: "Mr.Deeti manoj Kumar", role: "State Media Coordinator,WPC Telangana", img: TeamImg8, description: "" },
  { id: "sukanya", name: "Ms.Sukanya Chowdary", role: "State Media Coordinator,WPC Telangana", img: TeamImg11, description: "" },
];

// ================= Merged Component =================
export default function HomePage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load blogs from MongoDB via API
  useEffect(() => {
    const loadBlogs = async () => {
      try {
        // Fetch published blogs from MongoDB
        const response = await fetch('/blog-api/api/v1/blogs/?published_only=true');
        if (response.ok) {
          const blogsData = await response.json();
          console.log('Loaded blogs from API:', blogsData);
          setBlogs(blogsData);
        } else {
          console.error('Failed to fetch blogs:', response.status);
          setBlogs([]);
        }
      } catch (error) {
        console.error('Error loading blogs:', error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadBlogs();
  }, []);

  return (
    <>
      {/* ================= Gallery Section ================= */}
      {/* <section className="gallery-one">
        <div className="container">
          <div className="row masonary-layout">
            {galleryItems.map((item, index) => (
              <div key={index} className="col-xl-3 col-lg-6 col-md-6 mb-4">
                <div className="gallery-one__single">
                  <div className="gallery-one__img position-relative">
                    <img src={item.src} alt={item.alt} className="w-100" />
                    <div className="gallery-one__content position-absolute bottom-0 start-0 w-100 p-3 text-white" style={{ background: "rgba(0,0,0,0.5)" }}>
                      <div className="gallery-one__sub-title-box">
                        <div className="gallery-one__sub-title-shape"></div>
                        <p className="gallery-one__sub-title">{item.subtitle}</p>
                      </div>
                      <h4 className="gallery-one__title">
                        <Link to={item.href} className="text-white">{item.title}</Link>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ================= Blog Posts Section ================= */}
      {blogs.length > 0 && (
        <section className="blog-gallery-section py-5" style={{ background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)" }}>
          <div className="container">
            <div className="section-title text-center mb-5">
              <h2 style={{ 
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontSize: "2.5rem",
                fontWeight: "700",
                marginBottom: "1rem"
              }}>
                <i className="fa fa-newspaper-o" style={{ marginRight: "15px" }}></i>
                Latest Blog Posts
              </h2>
              <p style={{ color: "#6c757d", fontSize: "1.1rem" }}>
                Stay updated with our latest powerlifting news and events
              </p>
            </div>
            
            <div className="row">
              {blogs.slice(0, 6).map((blog, index) => (
                <div key={blog.id} className="col-xl-4 col-lg-6 col-md-6 mb-4">
                  <div className="blog-gallery-card" style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.3s ease",
                    border: "1px solid rgba(255,255,255,0.2)",
                    height: "100%"
                  }}>
                    {blog.thumbnail_url && (
                      <div className="blog-gallery-image" style={{ height: "200px", overflow: "hidden" }}>
                        <img 
                          src={blog.thumbnail_url} 
                          alt={blog.title} 
                          style={{ 
                            width: "100%", 
                            height: "100%", 
                            objectFit: "cover",
                            transition: "transform 0.3s ease"
                          }}
                          onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
                          onMouseOut={(e) => e.target.style.transform = "scale(1)"}
                        />
                      </div>
                    )}
                    
                    <div className="blog-gallery-content p-4">
                      <div className="blog-meta mb-3">
                        <span style={{
                          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          color: "white",
                          padding: "4px 12px",
                          borderRadius: "15px",
                          fontSize: "0.8rem",
                          fontWeight: "600",
                          marginRight: "10px"
                        }}>
                          {blog.category}
                        </span>
                        <span style={{ color: "#6c757d", fontSize: "0.9rem" }}>
                          {new Date(blog.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <h4 style={{ 
                        color: "#333", 
                        marginBottom: "15px",
                        fontSize: "1.2rem",
                        fontWeight: "600",
                        lineHeight: "1.4",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "2",
                        WebkitBoxOrient: "vertical"
                      }}>
                        {blog.title}
                      </h4>
                      
                      <p style={{ 
                        color: "#6c757d", 
                        marginBottom: "20px",
                        lineHeight: "1.5",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "3",
                        WebkitBoxOrient: "vertical"
                      }}>
                        {blog.excerpt || blog.content.substring(0, 120) + '...'}
                      </p>
                      
                      <Link 
                        to={`/blog-details/${blog.id}`}
                        style={{
                          background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                          color: "white",
                          padding: "10px 20px",
                          borderRadius: "25px",
                          textDecoration: "none",
                          fontWeight: "600",
                          fontSize: "0.9rem",
                          display: "inline-block",
                          transition: "all 0.3s ease",
                          boxShadow: "0 4px 15px rgba(79, 172, 254, 0.3)"
                        }}
                        onMouseOver={(e) => {
                          e.target.style.transform = "translateY(-2px)";
                          e.target.style.boxShadow = "0 6px 20px rgba(79, 172, 254, 0.4)";
                        }}
                        onMouseOut={(e) => {
                          e.target.style.transform = "translateY(0)";
                          e.target.style.boxShadow = "0 4px 15px rgba(79, 172, 254, 0.3)";
                        }}
                      >
                        Read More <i className="fa fa-arrow-right" style={{ marginLeft: "8px" }}></i>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {blogs.length > 6 && (
              <div className="text-center mt-4">
                <Link 
                  to="/blog"
                  style={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    padding: "15px 30px",
                    borderRadius: "30px",
                    textDecoration: "none",
                    fontWeight: "600",
                    fontSize: "1rem",
                    display: "inline-block",
                    transition: "all 0.3s ease",
                    boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)"
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = "translateY(-3px)";
                    e.target.style.boxShadow = "0 12px 35px rgba(102, 126, 234, 0.4)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 8px 25px rgba(102, 126, 234, 0.3)";
                  }}
                >
                  View All Blog Posts <i className="fa fa-newspaper-o" style={{ marginLeft: "10px" }}></i>
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ================= Team Section ================= */}
      {/* <section className="team-page py-5">
        <div className="container">
          <div className="row">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className={`col-xl-4 col-lg-6 col-md-6 wow fadeIn${index % 2 === 0 ? "Left" : "Right"}`}
                data-wow-delay={`${(index + 1) * 100}ms`}
              >
                <div className="team-one__single">
                  <div className="team-one__img-box position-relative">
                    <div className="team-one__img">
                      <img src={member.img} alt={member.name} className="w-100" />
                      <div className="team-one__content">
                        <h4 className="team-one__name">
                          <Link to={`/team-details/${member.id}`}>{member.name}</Link>
                        </h4>
                        <p className="team-one__sub-title">{member.role}</p>
                      </div>
                      <div className="team-one__content-hover">
                        <h4 className="team-one__name-hover">
                          <Link to={`/team-details/${member.id}`}>{member.name}</Link>
                        </h4>
                        <p className="team-one__sub-title-hover">{member.role}</p>
                        <p className="team-one__text-hover">{member.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}
    </>
  );
}
