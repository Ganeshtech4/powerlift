"use client";
import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from "react";
import MobileLogo from '../../..//assets/images/plat2.png'

const MobileMenu = ({ isSidebar, handleMobileMenu, handleSidebar }) => {
  const [isActive, setIsActive] = useState({
    status: false,
    key: "",
    subMenuKey: "",
  });

  const handleToggle = (key, subMenuKey = "") => {
    if (isActive.key === key && isActive.subMenuKey === subMenuKey) {
      setIsActive({
        status: false,
        key: "",
        subMenuKey: "",
      });
    } else {
      setIsActive({
        status: true,
        key,
        subMenuKey,
      });
    }
  };
  return (
    <>
      {/*End Mobile Menu */}
      <div className="mobile-nav__wrapper">
        <div
          className="mobile-nav__overlay mobile-nav__toggler"
          onClick={handleMobileMenu}
        />
        {/* /.mobile-nav__overlay */}
        <div className="mobile-nav__content">
          <span
            className="mobile-nav__close mobile-nav__toggler"
            onClick={handleMobileMenu}
          >
            <i className="fa fa-times" />
          </span>
          <div className="logo-box">
            <Link to="/" aria-label="logo image">
            <img src={MobileLogo} alt="Logo" />
            </Link>
          </div>
          {/* /.logo-box */}
          <div className="mobile-nav__container">
          <ul className="main-menu__list">
  <li>
    <Link to="/" onClick={handleMobileMenu}>
      Home
    </Link>
  </li>

  <li className={isActive.key === 2 ? "dropdown current" : "dropdown"}>
    <Link to="#" onClick={handleMobileMenu}>
      Pages
    </Link>
    <ul style={{ display: `${isActive.key === 2 ? "block" : "none"}` }}>
      <li>
        <Link to="/about" onClick={handleMobileMenu}>
          About WPC–Telangana
        </Link>
      </li>
      <li>
        <Link to="/team" onClick={handleMobileMenu}>
          Committee Members
        </Link>
      </li>
      <li>
        <Link to="/team-details" onClick={handleMobileMenu}>
          Referees
        </Link>
      </li>
      <li>
        <Link to="/testimonials" onClick={handleMobileMenu}>
          Testimonials
        </Link>
      </li>
      <li>
        <Link to="/pricing" onClick={handleMobileMenu}>
          Results
        </Link>
      </li>
      <li>
        <Link to="/gallery" onClick={handleMobileMenu}>
          Gallery
        </Link>
      </li>
      <li>
        <Link to="/gallery-details" onClick={handleMobileMenu}>
          Gallery Details
        </Link>
      </li>
      <li>
        <Link to="/faq" onClick={handleMobileMenu}>
          FAQ
        </Link>
      </li>
      <li>
        <Link to="/404" onClick={handleMobileMenu}>
          404 Error
        </Link>
      </li>
    </ul>
    <div
      className={isActive.key === 2 ? "dropdown-btn open" : "dropdown-btn"}
      onClick={() => handleToggle(2)}
    >
      <span className="fa fa-angle-right" />
    </div>
  </li>

  <li className={isActive.key === 3 ? "dropdown current" : "dropdown"}>
    <Link to="#" onClick={handleMobileMenu}>
      Championships
    </Link>
    <ul style={{ display: `${isActive.key === 3 ? "block" : "none"}` }}>
      <li>
        <Link to="/services" onClick={handleMobileMenu}>
          District Championships
        </Link>
      </li>
      <li>
        <Link to="/event-prodigy" onClick={handleMobileMenu}>
          State Championships
        </Link>
      </li>
      <li>
        <Link to="/stellar-events-co" onClick={handleMobileMenu}>
          Open Meets
        </Link>
      </li>
      <li>
        <Link to="/elite-event-management" onClick={handleMobileMenu}>
          Benchpress Events
        </Link>
      </li>
      <li>
        <Link to="/infinite-occasions" onClick={handleMobileMenu}>
          Deadlift Events
        </Link>
      </li>
      <li>
        <Link to="/dream-event-planners" onClick={handleMobileMenu}>
          Powerlifting Events
        </Link>
      </li>
    </ul>
    <div
      className={isActive.key === 3 ? "dropdown-btn open" : "dropdown-btn"}
      onClick={() => handleToggle(3)}
    >
      <span className="fa fa-angle-right" />
    </div>
  </li>

  <li className={isActive.key === 4 ? "dropdown current" : "dropdown"}>
    <Link to="#" onClick={handleMobileMenu}>
      Membership
    </Link>
    <ul style={{ display: `${isActive.key === 4 ? "block" : "none"}` }}>
      <li>
        <Link to="/event" onClick={handleMobileMenu}>
          How to Join
        </Link>
      </li>
      <li>
        <Link to="/event-details" onClick={handleMobileMenu}>
          Benefits & Rules
        </Link>
      </li>
    </ul>
    <div
      className={isActive.key === 4 ? "dropdown-btn open" : "dropdown-btn"}
      onClick={() => handleToggle(4)}
    >
      <span className="fa fa-angle-right" />
    </div>
  </li>

  <li className={isActive.key === 5 ? "dropdown current" : "dropdown"}>
    <Link to="#" onClick={handleMobileMenu}>
      News & Updates
    </Link>
    <ul style={{ display: `${isActive.key === 5 ? "block" : "none"}` }}>
      <li>
        <Link to="/blog" onClick={handleMobileMenu}>
          Latest News
        </Link>
      </li>
      <li>
        <Link to="/blog-list" onClick={handleMobileMenu}>
          All Updates
        </Link>
      </li>
      <li>
        <Link to="/blog-details" onClick={handleMobileMenu}>
          News Details
        </Link>
      </li>
    </ul>
    <div
      className={isActive.key === 5 ? "dropdown-btn open" : "dropdown-btn"}
      onClick={() => handleToggle(5)}
    >
      <span className="fa fa-angle-right" />
    </div>
  </li>

  <li>
    <Link to="/contact" onClick={handleMobileMenu}>
      Contact
    </Link>
  </li>
</ul>
          </div>
          <ul className="mobile-nav__contact list-unstyled">
            <li>
              <i className="fa fa-envelope" />
              <a href="mailto:info@wpctelangana.in">
                info@wpctelangana.in
              </a>
            </li>
            <li>
              <i className="fa fa-phone-alt" />
              <a href="tel:+91XXXXXXXXXXX">+91 XXXXX XXXXX</a>
            </li>
          </ul>
          {/* /.mobile-nav__contact */}
          <div className="mobile-nav__top">
            <div className="mobile-nav__social">
              <Link to="#" className="fab fa-twitter" />
              <Link to="#" className="fab fa-facebook-square" />
              <Link to="#" className="fab fa-pinterest-p" />
              <Link to="#" className="fab fa-instagram" />
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
