import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ResultsList.css";

const resultsCategories = [
  { name: "AF FITNESS STUDIO", icon: "💪", color: "#FF6B6B" },
  { name: "DISTRICT COMBINED RESULTS", icon: "🏅", color: "#4ECDC4" },
  { name: "FITNESS SECRET", icon: "🔥", color: "#FFD93D" },
  { name: "Gym point", icon: "🎯", color: "#95E1D3" },
  { name: "NATIONAL SELECTED PLAYERS", icon: "🏆", color: "#F38181" },
  { name: "Origin Fitness", icon: "⚡", color: "#AA96DA" },
  { name: "Ozzie FITNESS CENTER", icon: "💯", color: "#FCBAD3" },
  { name: "Pottens FITNESS", icon: "🎖️", color: "#A8E6CF" },
  { name: "SD Fitness", icon: "🔱", color: "#FFD3B6" },
  { name: "STATE SELECTED PLAYERS LIST", icon: "👑", color: "#FFAAA5" },
];

const ResultsList = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="results-section" style={{ padding: isMobile ? '40px 0' : '80px 0', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '0 20px' : '0 40px' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '30px' : '60px' }}>
          <div style={{ display: 'inline-block', padding: '8px 20px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '50px', marginBottom: '20px' }}>
            <span style={{ color: '#fff', fontSize: isMobile ? '12px' : '14px', fontWeight: '600', letterSpacing: '1px' }}>COMPETITION RESULTS</span>
          </div>
          <h2 style={{ fontSize: isMobile ? '28px' : '48px', fontWeight: '800', color: '#2d3748', marginBottom: '15px', lineHeight: 1.2 }}>
            🏆 Powerlifting Results
          </h2>
          <p style={{ fontSize: isMobile ? '14px' : '18px', color: '#718096', maxWidth: '600px', margin: '0 auto' }}>
            Browse through our comprehensive collection of competition results and achievements
          </p>
        </div>

        {/* Results Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: isMobile ? '20px' : '30px' 
        }}>
          {resultsCategories.map((category, index) => (
            <Link 
              key={index} 
              to={`/results/${encodeURIComponent(category.name)}`}
              style={{ textDecoration: 'none' }}
            >
              <div 
                className="result-card-premium"
                style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  padding: isMobile ? '25px 20px' : '35px 30px',
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  border: '2px solid transparent',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                {/* Decorative gradient background */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '6px',
                  background: `linear-gradient(90deg, ${category.color}, ${category.color}88)`,
                  opacity: 0.8
                }} />

                {/* Icon */}
                <div style={{
                  fontSize: isMobile ? '40px' : '50px',
                  marginBottom: '15px',
                  transition: 'transform 0.4s ease',
                  display: 'inline-block'
                }} className="result-icon">
                  {category.icon}
                </div>

                {/* Category Name */}
                <h3 style={{
                  fontSize: isMobile ? '16px' : '18px',
                  fontWeight: '700',
                  color: '#2d3748',
                  marginBottom: '10px',
                  textAlign: 'center',
                  lineHeight: 1.4,
                  transition: 'color 0.3s ease'
                }} className="result-title">
                  {category.name}
                </h3>

                {/* View Results Button */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: isMobile ? '13px' : '14px',
                  color: category.color,
                  fontWeight: '600',
                  marginTop: '10px',
                  transition: 'gap 0.3s ease'
                }} className="result-link">
                  <span>View Results</span>
                  <span style={{ transition: 'transform 0.3s ease' }} className="result-arrow">→</span>
                </div>

                {/* Decorative corner element */}
                <div style={{
                  position: 'absolute',
                  bottom: '-20px',
                  right: '-20px',
                  width: '80px',
                  height: '80px',
                  background: `${category.color}15`,
                  borderRadius: '50%',
                  transition: 'transform 0.4s ease'
                }} className="result-decoration" />
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: isMobile ? '40px' : '60px',
          padding: isMobile ? '30px 20px' : '40px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(102, 126, 234, 0.4)'
        }}>
          <h3 style={{ color: '#fff', fontSize: isMobile ? '20px' : '28px', fontWeight: '700', marginBottom: '15px' }}>
            Can't find what you're looking for?
          </h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: isMobile ? '14px' : '16px', marginBottom: '20px' }}>
            Contact us for historical results or specific competition queries
          </p>
          <Link to="/contact" style={{ textDecoration: 'none' }}>
            <button style={{
              padding: isMobile ? '12px 30px' : '15px 40px',
              background: '#fff',
              color: '#667eea',
              border: 'none',
              borderRadius: '50px',
              fontSize: isMobile ? '14px' : '16px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.3s ease'
            }} className="cta-button">
              Contact Us
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ResultsList;
