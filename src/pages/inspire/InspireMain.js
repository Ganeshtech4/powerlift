import React from "react";
import { Link } from "react-router-dom";
const inspireimg1 = `${process.env.PUBLIC_URL}/images/Inspire/img1.jpg`.replace("../assets/images", "images").replace("../../assets/images", "images").replace("../../../assets/images", "images");
const inspireimg2 = `${process.env.PUBLIC_URL}/images/Inspire/img2.jpg`.replace("../assets/images", "images").replace("../../assets/images", "images").replace("../../../assets/images", "images");
const inspireimg3 = `${process.env.PUBLIC_URL}/images/Inspire/img3.jpeg`.replace("../assets/images", "images").replace("../../assets/images", "images").replace("../../../assets/images", "images");
const inspireimg4 = `${process.env.PUBLIC_URL}/images/Inspire/img4.jpeg`.replace("../assets/images", "images").replace("../../assets/images", "images").replace("../../../assets/images", "images");
const inspireimg5 = `${process.env.PUBLIC_URL}/images/Inspire/img5.jpeg`.replace("../assets/images", "images").replace("../../assets/images", "images").replace("../../../assets/images", "images");

// S3 bucket URL for PDFs and images
const S3_PDF_BASE_URL = "https://rekhawpc.s3.ap-south-2.amazonaws.com/pdfs/";
const S3_IMAGE_BASE_URL = "https://rekhawpc.s3.ap-south-2.amazonaws.com/images/Inspire/";

// Helper function to get PDF URL
const getPdfUrl = (pdfName) => {
  if (!pdfName) return null;
  return `${S3_PDF_BASE_URL}${encodeURIComponent(pdfName)}`;
};

// Helper function to get image from S3 (PDF first page)
const getImageUrl = (pdfName) => {
  if (!pdfName) return null;
  // Use PDF first page image from S3
  const baseName = pdfName.replace('.pdf', '_page-0001.jpg');
  return `${S3_IMAGE_BASE_URL}${encodeURIComponent(baseName)}`;
};

const InspireMain = () => {
  const stories = [
    {
      id: 1,
      name: "Aashritha",
      role: "Powerlifting Athlete",
      quote:
        "Powerlifting taught me discipline and resilience. WPC Telangana gave me the platform to prove my strength at the national level.",
      pdfName: "Aashritha.pdf"
    },
    {
      id: 2,
      name: "Diza",
      role: "Women's Powerlifting Champion",
      quote:
        "I started as a beginner at a local gym. Today, I proudly represent Telangana in national events thanks to WPC's support and guidance.",
      pdfName: "Diza.pdf"
    },
    {
      id: 3,
      name: "Karan",
      role: "Youth Category Gold Medalist",
      quote:
        "WPC Telangana inspires every young athlete to stay consistent and confident. Hard work truly pays off here.",
      pdfName: "Karan.pdf"
    },
    {
      id: 4,
      name: "Manoj Kumar",
      role: "Media Coordinator",
      quote:
        "The goal is not just lifting weights, but lifting others with your story. WPC Telangana builds a strong, supportive community.",
      pdfName: "Manoj Kumar.pdf"
    },
    {
      id: 5,
      name: "Pranay",
      role: "State Powerlifting Champion",
      quote:
        "Guiding young athletes under WPC Telangana has been an inspiring journey. Strength comes from unity and purpose.",
      pdfName: "Pranay.pdf"
    },
    {
      id: 6,
      name: "Rishikesh Reddy",
      role: "State Powerlifting Champion",
      quote:
        "Joining WPC Telangana helped me transform my training and mindset. Now, I compete with confidence at state and national levels.",
      pdfName: "Rishikesh Reddy.pdf"
    },
    {
      id: 7,
      name: "Sai Teja Manthena",
      role: "National Powerlifter",
      quote:
        "Being part of WPC Telangana motivates me to push my limits and compete at higher levels with confidence.",
      pdfName: "Sai Teja Manthena.pdf"
    },
    {
      id: 8,
      name: "Tapasya",
      role: "Women's Powerlifting Athlete",
      quote:
        "I learned that patience and perseverance are key. WPC Telangana coaches pushed me to my best and prepared me for national competitions.",
      pdfName: "Tapasya.pdf"
    },
    {
      id: 9,
      name: "Thirupathi Rao",
      role: "Powerlifting Mentor & Trainer",
      quote:
        "Sharing my journey at WPC Telangana inspires upcoming athletes to believe in themselves and chase their dreams without fear.",
      pdfName: "Thirupathi Rao.pdf"
    },
  ];

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="blog-page collaboration-page" style={{ 
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      padding: isMobile ? "40px 0" : "80px 0"
    }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-title text-center" style={{ marginBottom: isMobile ? "30px" : "60px" }}>
          <div style={{ 
            display: 'inline-block', 
            padding: '8px 20px', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
            borderRadius: '50px', 
            marginBottom: '20px' 
          }}>
            <span style={{ 
              color: '#fff', 
              fontSize: isMobile ? '12px' : '14px', 
              fontWeight: '600', 
              letterSpacing: '1px' 
            }}>
              SUCCESS STORIES
            </span>
          </div>
          <h2 className="section-title__title" style={{ 
            fontSize: isMobile ? "28px" : "48px", 
            fontWeight: "800", 
            color: "#2d3748", 
            marginBottom: "15px", 
            lineHeight: 1.2 
          }}>
            💪 Inspiring Strength Stories
          </h2>
          <p className="section-title__text" style={{ 
            fontSize: isMobile ? "14px" : "18px", 
            color: "#718096", 
            maxWidth: "700px", 
            margin: "0 auto",
            lineHeight: 1.6
          }}>
            Meet the powerlifters who embody strength, discipline, and determination under WPC Telangana. These athletes remind us that dedication builds champions.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="row">
          {stories.filter(athlete => athlete.pdfName).map((athlete, index) => (
            <div key={athlete.id} className="col-xl-3 col-lg-4 col-md-6 mb-4">
              <div className="inspire-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="inspire-card__img">
                  <img 
                    src={getImageUrl(athlete.pdfName)} 
                    alt={athlete.name}
                    onError={(e) => {
                      // Fallback to a placeholder if image doesn't load
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23667eea"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="20"%3E' + encodeURIComponent(athlete.name) + '%3C/text%3E%3C/svg%3E';
                    }}
                  />
                  <div className="inspire-card__badge">
                    <span style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: '#fff',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: isMobile ? '10px' : '12px',
                      fontWeight: '600',
                      letterSpacing: '0.5px'
                    }}>
                      {athlete.role}
                    </span>
                  </div>
                </div>
                <div className="inspire-card__content">
                  <h3 className="inspire-card__name" style={{
                    fontSize: isMobile ? "18px" : "20px"
                  }}>
                    {athlete.name}
                  </h3>
                  <p className="inspire-card__quote" style={{
                    fontSize: isMobile ? "13px" : "14px"
                  }}>
                    "{athlete.quote}"
                  </p>
                  <a 
                    href={getPdfUrl(athlete.pdfName)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inspire-card__btn inspire-card__btn--pdf"
                    style={{
                      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                      width: '100%',
                      justifyContent: 'center',
                      marginTop: 'auto'
                    }}
                  >
                    <span>📄 Read PDF</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: isMobile ? "40px" : "60px",
          padding: isMobile ? "30px 20px" : "40px",
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(102, 126, 234, 0.4)'
        }}>
          <h3 style={{ 
            color: '#fff', 
            fontSize: isMobile ? "20px" : "28px", 
            fontWeight: '700', 
            marginBottom: '15px' 
          }}>
            Have Your Own Success Story?
          </h3>
          <p style={{ 
            color: 'rgba(255, 255, 255, 0.9)', 
            fontSize: isMobile ? "14px" : "16px", 
            marginBottom: '20px' 
          }}>
            Share your journey and inspire others in the powerlifting community
          </p>
          <Link to="/contact" style={{ textDecoration: 'none' }}>
            <button style={{
              padding: isMobile ? "12px 30px" : "15px 40px",
              background: '#fff',
              color: '#667eea',
              border: 'none',
              borderRadius: '50px',
              fontSize: isMobile ? "14px" : "16px",
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.3s ease'
            }} className="inspire-cta-btn">
              Share Your Story
            </button>
          </Link>
        </div>
      </div>

      <style>{`
        .inspire-card {
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0,0,0,0.08);
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          height: 100%;
          display: flex;
          flex-direction: column;
          animation: slideUp 0.6s ease-out forwards;
          opacity: 0;
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .inspire-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
        }
        
        .inspire-card__img {
          position: relative;
          overflow: hidden;
          height: 280px;
        }
        
        .inspire-card__img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }
        
        .inspire-card:hover .inspire-card__img img {
          transform: scale(1.1);
        }
        
        .inspire-card__badge {
          position: absolute;
          top: 15px;
          left: 15px;
          z-index: 2;
        }
        
        .inspire-card__content {
          padding: 25px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        .inspire-card__name {
          font-size: 20px;
          color: #2d3748;
          font-weight: 700;
          margin-bottom: 12px;
          line-height: 1.3;
        }
        
        .inspire-card__quote {
          color: #718096;
          font-size: 14px;
          line-height: 1.6;
          margin-bottom: 20px;
          flex: 1;
          font-style: italic;
        }
        
        .inspire-card__btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #fff;
          border-radius: 50px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 14px;
          border: none;
          cursor: pointer;
        }
        
        .inspire-card__btn:hover {
          gap: 12px;
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
          transform: translateY(-2px);
          color: #fff;
        }
        
        .inspire-card__btn--pdf:hover {
          box-shadow: 0 10px 25px rgba(245, 87, 108, 0.4);
        }
        
        .inspire-card__arrow {
          transition: transform 0.3s ease;
          display: inline-block;
        }
        
        .inspire-card__btn:hover .inspire-card__arrow {
          transform: translateX(5px);
        }
        
        .inspire-cta-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3) !important;
          background: #f7fafc !important;
        }
        
        @media (max-width: 767px) {
          .inspire-card__img {
            height: 220px;
          }
          .inspire-card__content {
            padding: 20px;
          }
        }
      `}</style>
    </section>
  );
};

export default InspireMain;
