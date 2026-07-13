"use client";
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const MobileLogo = `${process.env.PUBLIC_URL}/logowhitebg.png`;

const getSafeImageUrl = (url) => encodeURI(url || MobileLogo);

const handleLogoError = (event) => {
  if (event.currentTarget.dataset.fallbackApplied === 'true') {
    return;
  }

  event.currentTarget.dataset.fallbackApplied = 'true';
  event.currentTarget.src = getSafeImageUrl(MobileLogo);
};

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
          >
            <i className="fa fa-times" />
          </span>
          <div className="logo-box">
            <Link to="/" onClick={() => handleLinkClick('/')} aria-label="Rekha WPC Telangana home" className="logo-link mobile-logo-link">
              <img
                src={getSafeImageUrl(MobileLogo)}
                alt="Rekha WPC Telangana"
                className="logo-img mobile-logo-img"
                onError={handleLogoError}
              />
              <div className="logo-text mobile-logo-text">
                <span className="logo-title">Rekha</span>
                <span className="logo-subtitle">WPC Telangana</span>
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
                <Link to="/news" onClick={(e) => { e.preventDefault(); handleLinkClick('/news'); }}>
                  News
                </Link>
              </li>

              <li>
                <Link to="/results" onClick={(e) => { e.preventDefault(); handleLinkClick('/results'); }}>
                  Results
                </Link>
              </li>

              <li className={`dropdown ${openSubmenu === 'resources' ? 'active' : ''}`}>
                <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                  <span style={{ flex: 1, padding: '10px 0' }}>
                    Resources
                  </span>
                  <button
                    className={`dropdown-btn ${openSubmenu === 'resources' ? 'open' : ''}`}
                    onClick={(e) => { e.preventDefault(); toggleSubmenu('resources'); }}
                  >
                    <i className="fa fa-angle-down" />
                  </button>
                </div>
                <ul className="sub-menu" style={{ display: openSubmenu === 'resources' ? 'block' : 'none' }}>
                  <li>
                    <Link to="/vtd" onClick={(e) => { e.preventDefault(); handleLinkClick('/vtd'); }}>
                      VTD
                    </Link>
                  </li>
                  <li>
                    <Link to="/inkspire" onClick={(e) => { e.preventDefault(); handleLinkClick('/inkspire'); }}>
                      Inkspire
                    </Link>
                  </li>
                </ul>
              </li>

              <li className={`dropdown ${openSubmenu === 'register' ? 'active' : ''}`}>
                <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                  <Link
                    to="/registration"
                    onClick={(e) => { e.preventDefault(); handleLinkClick('/registration'); }}
                    style={{ flex: 1 }}
                  >
                    Register
                  </Link>
                  <button
                    className={`dropdown-btn ${openSubmenu === 'register' ? 'open' : ''}`}
                    onClick={(e) => { e.preventDefault(); toggleSubmenu('register'); }}
                  >
                    <i className="fa fa-angle-down" />
                  </button>
                </div>
                <ul className="sub-menu" style={{ display: openSubmenu === 'register' ? 'block' : 'none' }}>
                  <li>
                    <Link to="/registration" onClick={(e) => { e.preventDefault(); handleLinkClick('/registration'); }}>
                      Registration
                    </Link>
                  </li>
                  <li>
                    <Link to="/calendar" onClick={(e) => { e.preventDefault(); handleLinkClick('/calendar'); }}>
                      Calendar
                    </Link>
                  </li>
                </ul>
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
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="fab fa-facebook-square"></i>
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
                <i className="fab fa-pinterest-p"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
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
