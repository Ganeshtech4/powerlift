"use client";
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const MobileLogo = `${process.env.PUBLIC_URL}/images/logo wpc.png`;

const MobileMenu = ({ isSidebar, handleMobileMenu, handleSidebar }) => {
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const navigate = useNavigate();

  const toggleSubmenu = (menu) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  const handleLinkClick = (path) => {
    handleMobileMenu(); // Close menu
    navigate(path); // Navigate to path
  };

  return (
    <>
      {/*End Mobile Menu */}
      <div className="mobile-nav__wrapper">
        <div
          className="mobile-nav__overlay mobile-nav__toggler"
          onClick={handleMobileMenu}
          role="button"
          aria-label="Close mobile menu overlay"
        />
        {/* /.mobile-nav__overlay */}
        <div className="mobile-nav__content">
          <span
            className="mobile-nav__close mobile-nav__toggler"
            onClick={handleMobileMenu}
            role="button"
            aria-label="Close mobile menu"
            style={{
              cursor: 'pointer',
              zIndex: 10001,
              touchAction: 'manipulation'
            }}
          >
            <i className="fa fa-times" />
          </span>
          <div className="logo-box">
            <Link to="/" onClick={() => handleLinkClick('/')} aria-label="logo image" className="logo-link" style={{ display: 'flex', alignItems: 'center' }}>
              <img src={MobileLogo} alt="Logo" className="logo-img" style={{ maxHeight: '60px', width: 'auto' }} />
              <div className="logo-text" style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '10px', lineHeight: '1.2' }}>
                <span className="logo-title" style={{ display: 'block', fontSize: '18px', fontWeight: 'bold', color: '#333', marginBottom: '2px' }}>Rekha</span>
                <span className="logo-subtitle" style={{ display: 'block', fontSize: '12px', color: '#666', marginTop: '0' }}>WPC Telangana</span>
              </div>
            </Link>
          </div>
          {/* /.logo-box */}
          <div className="mobile-nav__container">
            <ul className="main-menu__list">
              <li>
                <Link to="/" onClick={(e) => { e.preventDefault(); handleLinkClick('/'); }}>
                  Home
                </Link>
              </li>

              <li className={`dropdown ${openSubmenu === 'about' ? 'active' : ''}`}>
                <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                  <Link
                    to="/about"
                    onClick={(e) => { e.preventDefault(); handleLinkClick('/about'); }}
                    style={{ flex: 1 }}
                  >
                    About
                  </Link>
                  <button
                    className={`dropdown-btn ${openSubmenu === 'about' ? 'open' : ''}`}
                    onClick={(e) => { e.preventDefault(); toggleSubmenu('about'); }}
                  >
                    <i className="fa fa-angle-down" />
                  </button>
                </div>
                <ul className="sub-menu" style={{ display: openSubmenu === 'about' ? 'block' : 'none' }}>
                  <li>
                    <Link to="/team" onClick={(e) => { e.preventDefault(); handleLinkClick('/team'); }}>
                      Committee Members
                    </Link>
                  </li>
                  <li>
                    <Link to="/districts" onClick={(e) => { e.preventDefault(); handleLinkClick('/districts'); }}>
                      Districts
                    </Link>
                  </li>
                  <li>
                    <Link to="/referees" onClick={(e) => { e.preventDefault(); handleLinkClick('/referees'); }}>
                      Referees
                    </Link>
                  </li>
                  <li>
                    <Link to="/colloboration" onClick={(e) => { e.preventDefault(); handleLinkClick('/colloboration'); }}>
                      Partnerships
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <Link to="/gallery" onClick={(e) => { e.preventDefault(); handleLinkClick('/gallery'); }}>
                  Gallery
                </Link>
              </li>

              <li>
                <Link to="/results" onClick={(e) => { e.preventDefault(); handleLinkClick('/results'); }}>
                  Results
                </Link>
              </li>

              <li>
                <Link to="/inspire" onClick={(e) => { e.preventDefault(); handleLinkClick('/inspire'); }}>
                  Inkspire
                </Link>
              </li>

              <li>
                <Link to="/registration" onClick={(e) => { e.preventDefault(); handleLinkClick('/registration'); }}>
                  Register
                </Link>
              </li>

              <li>
                <Link to="/calendar" onClick={(e) => { e.preventDefault(); handleLinkClick('/calendar'); }}>
                  Calendar
                </Link>
              </li>

              <li>
                <Link to="/contact" onClick={(e) => { e.preventDefault(); handleLinkClick('/contact'); }}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          {/* /.mobile-nav__container */}

          {/* /.mobile-nav__contact */}
          <div className="mobile-nav__top">
            <div className="mobile-nav__social">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="fab fa-twitter" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="fab fa-facebook-square" aria-label="Facebook">
                <i className="fab fa-facebook-square"></i>
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="fab fa-pinterest-p" aria-label="Pinterest">
                <i className="fab fa-pinterest-p"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="fab fa-instagram" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
            {/* /.mobile-nav__social */}
          </div>
          {/* /.mobile-nav__top */}
        </div>
        {/* /.mobile-nav__content */}
      </div>

      <div
        className="nav-overlay"
        style={{ display: `${isSidebar ? "block" : "none"}` }}
        onClick={handleSidebar}
      />
    </>
  );
};
export default MobileMenu;
