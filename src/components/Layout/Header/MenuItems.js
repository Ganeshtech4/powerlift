import React from 'react';
import { Link } from 'react-router-dom';

const MenuItems = ({ parentMenu, secondParentMenu, activeMenu }) => {
  return (
    <ul className="main-menu__list">
      <li className={parentMenu === 'Home' ? 'dropdown current-menu-item' : 'dropdown'}>
        <Link to="#">Home</Link>
        <ul className="sub-menu">
          <li>
            <Link to="/" className={activeMenu === '/' ? 'active-menu' : ''}>
              Home One
            </Link>
          </li>
          <li>
            <Link to="/home-2" className={activeMenu === '/home-2' ? 'active-menu' : ''}>
              Home Two
            </Link>
          </li>
          <li>
            <Link to="/home-3" className={activeMenu === '/home-3' ? 'active-menu' : ''}>
              Home Three
            </Link>
          </li>
          <li className={secondParentMenu === 'Header Styles' ? 'dropdown current-menu-item' : 'dropdown'}>
            <Link to="#">Header Styles</Link>
            <ul className="sub-menu">
              <li>
                <Link to="/" className={activeMenu === '/' ? 'active-menu' : ''}>
                  Header One
                </Link>
              </li>
              <li>
                <Link to="/home-2" className={activeMenu === '/home-2' ? 'active-menu' : ''}>
                  Header Two
                </Link>
              </li>
              <li>
                <Link to="/home-3" className={activeMenu === '/home-3' ? 'active-menu' : ''}>
                  Header Three
                </Link>
              </li>
            </ul>
          </li>
          <li className={secondParentMenu === 'One Page Styles' ? 'dropdown current-menu-item' : 'dropdown'}>
            <Link to="#">One Page Styles</Link>
            <ul className="sub-menu">
              <li>
                <Link to="/one-page-style-one" className={activeMenu === '/one-page-style-one' ? 'active-menu' : ''}>
                  One Page Styles One
                </Link>
              </li>
              <li>
                <Link to="/one-page-style-two" className={activeMenu === '/one-page-style-two' ? 'active-menu' : ''}>
                  One Page Styles Two
                </Link>
              </li>
              <li>
                <Link to="/one-page-style-three" className={activeMenu === '/one-page-style-three' ? 'active-menu' : ''}>
                  One Page Styles Three
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li className={parentMenu === 'Pages' ? 'dropdown current-menu-item' : 'dropdown'}>
        <Link to="#">Pages</Link>
        <ul className="sub-menu">
          <li>
            <Link to="/about" className={activeMenu === '/about' ? 'active-menu' : ''}>
              About Us
            </Link>
          </li>
          <li>
            <Link to="/team" className={activeMenu === '/team' ? 'active-menu' : ''}>
              Committee Members
            </Link>
          </li>
          <li>
            <Link to="/team-details" className={activeMenu === '/team-details' ? 'active-menu' : ''}>
              Referees
            </Link>
          </li>
          <li>
            <Link to="/testimonials" className={activeMenu === '/testimonials' ? 'active-menu' : ''}>
              Testimonials
            </Link>
          </li>
          <li>
            <Link to="/pricing" className={activeMenu === '/pricing' ? 'active-menu' : ''}>
              Results
            </Link>
          </li>
          <li>
            <Link to="/gallery" className={activeMenu === '/gallery' ? 'active-menu' : ''}>
              Gallery
            </Link>
          </li>
          <li>
            <Link to="/gallery-details" className={activeMenu === '/gallery-details' ? 'active-menu' : ''}>
              Gallery Details
            </Link>
          </li>
          <li>
            <Link to="/faq" className={activeMenu === '/faq' ? 'active-menu' : ''}>
              FAQ
            </Link>
          </li>
          <li>
            <Link to="/404" className={activeMenu === '/404' ? 'active-menu' : ''}>
              404 Error
            </Link>
          </li>
        </ul>
      </li>
      <li className={parentMenu === 'Championships' ? 'dropdown current-menu-item' : 'dropdown'}>
        <Link to="#">Championships</Link>
        <ul className="sub-menu">
          <li>
            <Link to="/services" className={activeMenu === '/services' ? 'active-menu' : ''}>
              District Championships
            </Link>
          </li>
          <li>
            <Link to="/event-prodigy" className={activeMenu === '/event-prodigy' ? 'active-menu' : ''}>
              State Championships
            </Link>
          </li>
          <li>
            <Link to="/stellar-events-co" className={activeMenu === '/stellar-events-co' ? 'active-menu' : ''}>
              Open Meets
            </Link>
          </li>
          <li>
            <Link to="/elite-event-management" className={activeMenu === '/elite-event-management' ? 'active-menu' : ''}>
              Benchpress Events
            </Link>
          </li>
          <li>
            <Link to="/infinite-occasions" className={activeMenu === '/infinite-occasions' ? 'active-menu' : ''}>
              Deadlift Events
            </Link>
          </li>
          <li>
            <Link to="/dream-event-planners" className={activeMenu === '/dream-event-planners' ? 'active-menu' : ''}>
              Powerlifting Events
            </Link>
          </li>
        </ul>
      </li>
      <li className={parentMenu === 'Membership' ? 'dropdown current-menu-item' : 'dropdown'}>
        <Link to="#">Membership</Link>
        <ul className="sub-menu">
          <li>
            <Link to="/event" className={activeMenu === '/event' ? 'active-menu' : ''}>
              How to Join
            </Link>
          </li>
          <li>
            <Link to="/event-details" className={activeMenu === '/event-details' ? 'active-menu' : ''}>
              Benefits & Rules
            </Link>
          </li>
        </ul>
      </li>
      <li className={parentMenu === 'Blog' ? 'dropdown current-menu-item' : 'dropdown'}>
        <Link to="#">Blog</Link>
        <ul className="sub-menu">
          <li>
            <Link to="/blog" className={activeMenu === '/blog' ? 'active-menu' : ''}>
              Blog
            </Link>
          </li>
          <li>
            <Link to="/blog-list" className={activeMenu === '/blog-list' ? 'active-menu' : ''}>
              Blog List
            </Link>
          </li>
          <li>
            <Link to="/blog-details" className={activeMenu === '/blog-details' ? 'active-menu' : ''}>
              Blog Details
            </Link>
          </li>
        </ul>
      </li>
      <li className={parentMenu === 'Contact' ? 'current-menu-item' : ''}>
        <Link to="/contact" className={activeMenu === '/contact' ? 'active-menu' : ''}>
          Contact
        </Link>
      </li>
    </ul>
  );
};

export default MenuItems;
